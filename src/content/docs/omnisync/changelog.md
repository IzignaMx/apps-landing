---
title: Changelog
description: OmniSync release notes and version history.
app: omnisync
section: changelog
order: 5
lang: en
updated: 2026-07-04
---

## v1.4.0 — July 2026

Merchant readiness, safer sync simulation, and the next feature roadmap.

### Store Readiness

- **Setup readiness score** — OmniSync now computes readiness from real shop state: active channels, imported products, protected prices, completed syncs, billing state, and webhook setup.
- **Dashboard checklist** — merchants see the next incomplete setup step directly in the dashboard, with accessible progress status and action links.
- **Channel health badges** — each connected channel shows whether it is current, stale, never synced, plan-limited, or disconnected.
- **Operational warnings** — stale channels and recent sync failures are surfaced without requiring merchants to inspect technical logs.

### Sync Simulation

- **Sync all channels** — dashboard and sync actions can now target all active channels supported by the merchant's plan.
- **Dry-run mode** — merchants can preview sync impact without refreshing external tokens, consuming channel rate limits, calling external APIs, updating prices, changing `lastSyncAt`, or dispatching webhooks.
- **Price protection previews** — dry-run output still respects locked-price checks, making it useful before running a real sync.

### Roadmap Specification

A new spec-development plan documents the next six product investments:

- Setup Health Score Dashboard
- Privacy Center
- Pricing Simulator
- AI recommendations with manual approval and audit trail
- Weekly digest via email/webhook
- Partner/App Pricing sync

### Validation

- **1046 automated tests passing**
- **0 TypeScript errors**
- **0 ESLint errors**
- Production build verified with Next.js

---

## v1.3.0 — July 2026

Shopify App Store readiness, API validation hardening, and privacy-aligned exports.

### Shopify App Bridge & Billing

- **Current App Bridge loading model** — the app now renders the `shopify-api-key` meta tag required by Shopify's CDN App Bridge flow.
- **Session tokens first** — embedded admin requests prefer `window.shopify.idToken()` and keep legacy App Bridge package fallback for local/direct development.
- **Shopify App Pricing-ready** — billing can redirect to Shopify's hosted pricing page when `NEXT_PUBLIC_SHOPIFY_APP_PRICING=true`.
- **Cleaner billing UX** — removed unverified yearly-savings, uptime, rating, support, and merchant-count claims from plan cards.

### API Hardening

- Centralized Zod validation now covers pricing rules, advanced pricing, order sync, billing cancellation, webhook test/redelivery, channel metadata, import, price, and export routes.
- Advanced pricing routes verify `channelProductId` ownership against the authenticated shop before returning or mutating data.
- Pricing rules now return the frontend-consumed response shape and validate create/toggle payloads.
- Routes now derive shop identity from the trusted Shopify session/proxy context instead of accepting tenant identity from request bodies.

### Privacy & Data Export

- Data exports now validate type, format, channel, and date range filters.
- Large exports are capped for operational safety.
- Export responses use `Cache-Control: no-store`.
- Order exports are explicitly marked as containing buyer PII and show a merchant-facing warning in Settings.
- Product exports now apply the documented date filters.

### Import & Metadata

- Product import validation now preserves optional SKU, image, stock, category, currency, description, and metadata fields.
- Channel metadata updates keep a per-channel allowlist and now validate request shape before updating credentials metadata.

### Documentation

- Shopify production alignment docs now cover App Bridge CDN metadata, session-token expectations, App Pricing configuration, and privacy/export checks before App Store review.

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
