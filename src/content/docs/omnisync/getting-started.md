---
title: Getting Started
description: Install OmniSync and configure your first channel in under 5 minutes.
app: omnisync
section: getting-started
order: 1
---

## Installation

1. Visit the [Shopify App Store](https://apps.shopify.com/) and search for **OmniSync**.
2. Click **Add app** and approve the required scopes:
   - `read_products`, `write_products`
   - `read_inventory`, `write_inventory`
   - `read_price_rules`
3. OmniSync will create a default channel configuration for your shop.

## First Channel Setup

After installation, you'll land on the dashboard. To connect your first channel:

1. Navigate to **Channels** in the sidebar.
2. Click **Add Channel** and select the platform (Mercado Libre, WhatsApp, Amazon, or Instagram).
3. Follow the OAuth flow for the chosen platform.
4. Once connected, OmniSync will begin an **incremental sync** of your catalog.

## Configuration

Each channel has its own settings:

| Setting | Description |
|---------|-------------|
| Sync interval | How often inventory is synced (default: 15 min) |
| Price protection | Enable/disable per-channel price locks |
| Stock threshold | Minimum stock before alerts are triggered |
| Auto-publish | Automatically publish new products to the channel |

## Next Steps

- [API Reference](/docs/omnisync/api) — integrate OmniSync with your own tools
- [Pricing](/docs/omnisync/pricing) — compare plans and limits
- [Guides](/docs/omnisync/guides) — advanced workflows and best practices
