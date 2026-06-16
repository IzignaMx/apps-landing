---
title: API Reference
description: OmniSync REST API endpoints for inventory sync, price management, and channel configuration.
app: omnisync
section: api
order: 2
---

## Base URL

```
https://omnisync.izignamx.com/api
```

All endpoints require an `x-shop-id` header for authentication.

## Authentication

API requests are authenticated via the `x-shop-id` header. The middleware validates the shop ID against registered shops. Example:

```bash
curl -H "x-shop-id: your-shop-id" https://omnisync.izignamx.com/api/products
```

## Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/products` | List all synced products |
| `GET` | `/products/:id` | Get single product detail |
| `POST` | `/sync/trigger` | Trigger manual sync (full, incremental, price-only, or stock-only) |

### Channels

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/channels` | List configured channels |
| `GET` | `/channels/metadata` | Get channel metadata and settings |
| `PUT` | `/channels/metadata` | Update channel settings |
| `DELETE` | `/channels/:id` | Disconnect a channel |

Channels are created via platform-specific OAuth flows:

| Platform | Auth Endpoint |
|----------|--------------|
| Mercado Libre | `GET /mercadolibre/auth` → `GET /mercadolibre/auth/callback` |
| WhatsApp | `GET /whatsapp/auth` → `GET /whatsapp/auth/callback` |
| Instagram | `GET /instagram/auth` → `GET /instagram/auth/callback` |
| Amazon | `GET /amazon/auth` → `GET /amazon/auth/callback` |

### Pricing

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/prices` | List prices across channels |
| `PUT` | `/prices` | Update channel prices |
| `POST` | `/prices/lock` | Lock a price (price protection) |
| `DELETE` | `/prices/lock` | Unlock a price |
| `GET` | `/pricing/advanced` | Get advanced pricing rules (Pro+) |
| `PUT` | `/pricing/advanced` | Configure advanced pricing rules (Pro+) |

**Price rule types**: Manual, Formula, Margin, Competitor-based, Cost-plus, Multi-currency, Price floor/ceiling, Scheduled.

### Sync Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/sync/jobs` | List sync jobs |
| `POST` | `/sync/trigger` | Create a new sync job |
| `GET` | `/sync/status` | Get current sync status |
| `GET` | `/sync/events` | Real-time sync events (SSE stream) |

**Sync types**: `FULL`, `INCREMENTAL`, `PRICE_ONLY`, `STOCK_ONLY`.

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/orders` | List orders from all channels |
| `POST` | `/orders/sync` | Sync orders from channels |
| `PUT` | `/orders/:id/status` | Update order status |
| `POST` | `/orders/:id/tracking` | Add tracking info |
| `POST` | `/orders/:id/refund` | Process a refund |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/analytics/overview` | Dashboard overview metrics |
| `GET` | `/analytics/revenue` | Revenue analytics |
| `GET` | `/analytics/sync-health` | Sync success/error rates |
| `GET` | `/analytics/order-trends` | Order trends by channel |
| `GET` | `/analytics/inventory` | Inventory sync status |
| `GET` | `/analytics/price-history` | Price change history |

### AI

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/ai/suggestions` | List AI price suggestions (Enterprise) |
| `POST` | `/ai/suggest-price` | Generate AI price suggestion (Enterprise) |

### Import

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/import/discover` | Discover products from a channel (Growth+) |
| `POST` | `/import/execute` | Execute catalog import (Growth+) |
| `GET` | `/import/history` | Import job history |
| `GET` | `/import/status/:jobId` | Get import job status |

### Billing

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/billing/plans` | List available plans |
| `POST` | `/billing/subscribe` | Subscribe to a plan |
| `GET` | `/billing/status` | Current subscription status |
| `POST` | `/billing/cancel` | Cancel subscription |

### Webhooks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET/POST/DELETE` | `/webhooks/config` | Manage webhook subscriptions |
| `POST` | `/webhooks/test` | Send a test event |
| `POST` | `/webhooks/redeliver` | Re-send a failed delivery |
| `POST` | `/webhooks/shopify` | Shopify incoming webhook (public) |
| `POST` | `/webhooks/mercadolibre` | Mercado Libre incoming webhook (public) |
| `GET/POST` | `/webhooks/whatsapp` | WhatsApp incoming webhook (public) |
| `GET/POST` | `/webhooks/instagram` | Instagram incoming webhook (public) |
| `POST` | `/webhooks/amazon` | Amazon SNS incoming webhook (public) |

### Settings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/settings` | Get shop settings |
| `PUT` | `/settings` | Update shop settings |
| `POST` | `/settings/reset` | Reset settings to defaults |

### Pricing Rules

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET/POST` | `/pricing-rules` | List / create pricing rules |
| `GET/PUT/DELETE` | `/pricing-rules/:id` | Manage single pricing rule |

### Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/notifications` | List notifications |
| `GET` | `/notifications/unread-count` | Unread notification count |
| `PUT` | `/notifications/mark-all-read` | Mark all as read |
| `PUT` | `/notifications/:id/read` | Mark single as read |

### Exchange Rates

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/exchange-rates` | Current exchange rates |
| `POST` | `/exchange-rates/refresh` | Force refresh rates |

## Rate Limits

Rate limiting is applied per-channel using a token bucket algorithm:

| Channel | Burst | Sustained |
|---------|-------|-----------|
| Mercado Libre | 10 req | 2 req/s |
| WhatsApp | 10 req | 5 req/s |
| Instagram | 10 req | 5 req/s |
| Amazon | 5 req | 1 req/s |

## Error Format

All error responses follow a consistent shape:

```json
{
  "success": false,
  "error": "Too many requests. Retry after 60 seconds.",
  "details": ["field: validation message"]
}
```

The `details` array is optional and only present on validation errors (HTTP 400).
