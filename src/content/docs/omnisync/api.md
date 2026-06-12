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

All endpoints require a `shopId` query parameter (or body field) for authentication.

## Authentication

API requests are authenticated via Shopify session tokens. The middleware validates the `shopId` against registered shops.

## Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/products` | List all synced products |
| `GET` | `/products/:id` | Get product details with channel data |
| `POST` | `/products/sync` | Trigger manual sync |

### Channels

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/channels` | List configured channels |
| `POST` | `/channels` | Add a new channel |
| `PATCH` | `/channels/:id` | Update channel settings |
| `DELETE` | `/channels/:id` | Disconnect a channel |

### Pricing

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/pricing/rules` | List price rules |
| `POST` | `/pricing/rules` | Create a price rule |
| `POST` | `/pricing/protect` | Apply price protection to a product |

### Sync Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/sync/jobs` | List sync jobs |
| `POST` | `/sync/jobs` | Create a new sync job |
| `GET` | `/sync/jobs/:id/logs` | Get logs for a specific job |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/orders` | List orders from all channels |
| `GET` | `/orders/:id` | Get order details |
| `PATCH` | `/orders/:id/status` | Update order status |

## Rate Limits

- **Free Trial**: 60 requests/minute
- **Starter**: 120 requests/minute
- **Growth**: 300 requests/minute
- **Pro**: 600 requests/minute
- **Enterprise**: Unlimited

## Error Format

```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Retry after 60 seconds.",
    "status": 429
  }
}
```
