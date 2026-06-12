---
title: Changelog
description: OmniSync release notes and version history.
app: omnisync
section: changelog
order: 5
updated: 2026-06-12
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
