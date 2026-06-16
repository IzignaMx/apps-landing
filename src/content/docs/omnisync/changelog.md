---
title: Changelog
description: OmniSync release notes and version history.
app: omnisync
section: changelog
order: 5
updated: 2026-06-15
---

## v1.2.0 — June 2026

Production hardening, channel webhook receivers, and comprehensive codebase audit.

### Incoming Channel Webhooks

Real-time event reception from all 4 supported channels:

- **Mercado Libre** — `orders_v2`, `items` (price/stock changes), `questions` notifications via HMAC-SHA256 verified POST
- **WhatsApp Business** — Message and order events via Meta's `X-Hub-Signature-256` verification (GET challenge + POST)
- **Instagram Shopping** — Comments and mentions via Meta Graph webhook pattern (GET challenge + POST)
- **Amazon** — SNS `SubscriptionConfirmation` + `Notification` for `AnyOfferChanged`, `OrderStatusChange`, `FeedProcessingFinished`
- Central processor creates orders, triggers syncs, and notifies merchants automatically

### Security Hardening

- **AES-256-GCM credential encryption** — all OAuth tokens (ML, Meta, Amazon) encrypted at rest; production fails fast if `CREDENTIALS_ENCRYPTION_KEY` is not set
- **SSRF protection** — DNS resolution checks block requests to private IP ranges
- **Zod input validation** — 15+ schemas enforce structured validation on all API request bodies via `validateBody()`
- **IDOR fix** — all API routes authenticate via `x-shop-id` header instead of request body/query parameter
- **CSP headers** — removed `unsafe-eval`, restricted `connect-src` and `img-src` to known domains

### API Consistency

- All 133 error responses across 45 route files standardized to `{ success: false, error: "message" }`
- `apiError()` and `apiSuccess()` helpers ensure uniform response envelopes
- `errorMessage` field added to `SyncLog` model — sync errors now persisted to audit trail

### Codebase Audit

- **0 ESLint warnings** (was 130), **0 TypeScript errors**
- 12 raw `JSON.parse()` calls on stored DB data replaced with crash-safe `safeJsonParse()`
- 8 duplicated `safeJsonParse` implementations consolidated into shared utility
- 30 `console.log` → `console.warn`/`console.error` in production code paths
- Net reduction of 552 lines of dead code

### Docker & Deployment

- **Worker image** now uses production-only dependencies (was shipping ESLint, TypeScript, etc.)
- CI/CD pipeline validates standalone Docker build (`DOCKER_BUILD=1`)
- Prisma schema uses `env("DATABASE_URL")` (was hardcoded path)
- Bun version pinned to 1.3 in CI (was `latest`)
- Hardcoded OAuth URLs extracted to configurable constants

### Stats

- **70+ API endpoints** across 21 groups
- **585 automated tests** with 1395 assertions across 23 files
- **15 data models** (SyncLog now includes `errorMessage`)

---

## v1.1.0 — June 2026

Webhooks, rate limiting, and platform hardening.

### Outgoing Webhooks

- **7 event types**: `sync.started`, `sync.completed`, `sync.failed`, `price.updated`, `price.locked`, `order.created`, `order.status_changed`
- **HMAC-SHA256 signatures** on every delivery for payload integrity verification
- **Delivery log**: full history of every webhook sent — status code, response time, error messages
- **Auto-retry**: exponential backoff (10 s / 60 s / 300 s) via BullMQ, up to 3 attempts
- **Auto-disable**: subscriptions are deactivated after 10 consecutive failures
- **Management API**: `POST /api/webhooks/config` (create), `GET` (list), `DELETE`; `POST /api/webhooks/test` (send test event); `POST /api/webhooks/redeliver` (re-send failed delivery)

### Per-plan API Rate Limiting

- Free Trial: 60 req/min
- Starter: 120 req/min
- Growth: 300 req/min
- Pro: 600 req/min
- Enterprise: unlimited
- Returns `429 Too Many Requests` with `Retry-After` header when exceeded

### Platform

- **57 API endpoints** — full REST API for programmatic access
- **579+ automated tests** across 23 test files
- **15 data models** — Shop, ChannelConfig, Product, ChannelProduct, ChannelPrice, SyncJob, SyncLog, Subscription, ChannelOrder, WebhookSubscription, WebhookDelivery, PriceHistory, AnalyticsSnapshot, Notification, ImportJob
- Background job processing via **BullMQ + Redis**

---

## v1.0.0 — June 2026

Initial release.

### Features

- **Multi-channel sync**: Connect Mercado Libre, WhatsApp Business, Amazon, and Instagram
- **Price protection engine**: Per-channel price locks with 8 rule types
- **AI-powered suggestions**: Price recommendations based on market data (Pro / Enterprise)
- **Real-time dashboard**: Monitor sync status, pricing, and inventory across all channels via SSE

### Price Rule Types

- Manual
- Formula-based
- Margin-based
- Competitor-based
- Cost-plus
- Multi-currency
- Price floor / ceiling
- Scheduled

### Supported Channels

- Mercado Libre
- WhatsApp Business
- Amazon
- Instagram Shopping

### Sync Types

- Full sync — complete catalog refresh
- Incremental sync — only changed products
- Price-only sync — update prices without touching inventory
- Stock-only sync — update inventory without touching prices

### API Coverage

| Area | Endpoints |
|------|-----------|
| Products | CRUD, per-channel pricing, price lock/unlock |
| Channels | Connect, disconnect, configure metadata |
| Sync | Trigger, status, job history, real-time events (SSE) |
| Orders | List, detail, status transitions, tracking, refunds |
| Pricing | Advanced rules (Pro+), price history |
| Analytics | Revenue, sync health, order trends, inventory, price elasticity |
| Import | Discover, execute, history, status |
| Notifications | List, unread count, mark read |
| Billing | Plans, subscribe, status, Shopify callback |
| Exchange rates | Get rates, refresh |
| Webhooks | Subscribe, test, redeliver |
