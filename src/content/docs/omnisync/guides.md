---
title: Guides
description: Advanced workflows, best practices, and integration guides for OmniSync.
app: omnisync
section: guides
order: 6
---

## Price Protection Best Practices

### Setting Up Price Locks

Price locks prevent accidental overwrites when multiple channels share the same product. Configure locks per channel:

1. Navigate to **Channels** > select your channel > **Price Protection**
2. Enable **Lock prices** for that channel
3. Set your preferred rule type (Manual, Formula, Margin, etc.)

### Formula-Based Pricing

Use formulas to dynamically calculate channel prices based on cost, base price, or competitor data:

```
channel_price = base_price * 1.15 + shipping_cost
```

Supported variables:
- `base_price` — the Shopify price
- `cost` — the product cost (if set)
- `shipping_cost` — a per-channel fixed value
- `competitor_avg` — average competitor price (requires Competitor-based rule)

### Multi-Currency Setup

1. Create a **Multi-currency** price rule
2. Set the exchange rate source (manual or automatic)
3. Configure a margin percentage for each currency
4. Apply to specific channels

## Channel Integration Guides

### Mercado Libre

- Authenticate via OAuth in the channel setup wizard
- Map your Shopify categories to Mercado Libre categories
- Configure publication type (classic or premium) — *coming soon*
- Set stock sync direction (bidirectional or Shopify → ML only) — *coming soon*

### WhatsApp Business

- Connect via the WhatsApp Business API
- Configure your product catalog for WhatsApp
- Set up automated pricing messages — *coming soon*
- Enable order notifications — *coming soon*

### Amazon

- Connect via Amazon SP-API
- Configure ASIN matching strategy — *coming soon*
- Set fulfillment mode (FBM or FBA) — *coming soon*
- Map Shopify variants to Amazon variations

### Instagram Shopping

- Connect via Meta Business Suite
- Ensure your product catalog meets Instagram requirements
- Configure tagging behavior — *coming soon*
- Set up shoppable posts sync — *coming soon*

## Webhook Integration

OmniSync can send outgoing webhooks when key events occur. Configure subscriptions via the **Webhooks** API or the in-app settings panel.

### Payload Format

```json
{
  "event": "sync.completed",
  "shopId": "shop_abc123",
  "data": {
    "jobId": "job_xyz789",
    "type": "INCREMENTAL",
    "productsSynced": 42,
    "errors": 0
  },
  "timestamp": "2026-06-01T12:00:00Z"
}
```

### Signature Verification

Every delivery includes an `X-OmniSync-Signature` header containing an HMAC-SHA256 hash of the payload, signed with your webhook secret. Verify on receipt:

```javascript
const crypto = require('crypto');
const expected = crypto
  .createHmac('sha256', WEBHOOK_SECRET)
  .update(rawBody)
  .digest('hex');
if (expected !== receivedSignature) {
  return res.status(401).send('Invalid signature');
}
```

### Available Events

- `sync.started`
- `sync.completed`
- `sync.failed`
- `price.updated`
- `price.locked`
- `order.created`
- `order.status_changed`

### Retry Policy

Failed deliveries are retried with exponential backoff: 10 seconds, 60 seconds, 300 seconds (up to 3 attempts). Subscriptions are automatically deactivated after 10 consecutive failures.

### Management API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/webhooks/config` | Create a webhook subscription |
| `GET` | `/api/webhooks/config` | List your subscriptions |
| `DELETE` | `/api/webhooks/config` | Delete a subscription |
| `POST` | `/api/webhooks/test` | Send a test event to verify your endpoint |
| `POST` | `/api/webhooks/redeliver` | Re-send a specific failed delivery |
