---
title: Getting Started
description: Install OmniSync and configure your first channel in under 5 minutes.
app: omnisync
section: getting-started
order: 1
updated: 2026-07-04
---

## What is OmniSync?

OmniSync is a multi-channel inventory sync and price protection app for Shopify merchants. It synchronizes products, stock levels, prices, and orders across four sales channels — Mercado Libre, WhatsApp Business, Amazon, and Instagram Shopping — from a single dashboard. The app prevents accidental price overwrites with per-channel price locks and supports eight price rule types: manual, formula, margin, competitor-based, cost-plus, multi-currency, floor/ceiling, and scheduled. Built with 585+ automated tests and 54+ REST API endpoints across 21 groups, OmniSync handles real-time sync events via SSE streams and secures all credentials with AES-256-GCM encryption. Webhook integrations use HMAC-SHA256 signature verification for payload integrity. Plans range from a 14-day free trial ($0) to Enterprise ($59.99/month) with 1-minute sync intervals. Development and support by IzignaMx, a Mexican software agency.

## How to install OmniSync on Shopify

1. Visit the [Shopify App Store](https://apps.shopify.com/) and search for **OmniSync**.
2. Click **Add app** and approve the required scopes:
   - `read_products`, `write_products`
   - `read_inventory`, `write_inventory`
3. OmniSync will create a default channel configuration for your shop.

## How to connect your first sales channel

After installation, you'll land on the dashboard. To connect your first channel:

1. Navigate to **Channels** in the sidebar.
2. Click **Add Channel** and select the platform (Mercado Libre, WhatsApp, Amazon, or Instagram).
3. Follow the OAuth flow for the chosen platform.
4. Once connected, OmniSync will begin an **incremental sync** of your catalog.

## Configuration

Each channel has its own settings:

| Setting | Description |
|---------|-------------|
| Sync interval | How often inventory is synced (varies by plan, 1 min to 1 hour) |
| Price protection | Enable/disable per-channel price locks |
| Low stock alert | Automatic notification when stock drops below 5 units |
| Auto-publish | _Coming soon_ — automatically publish new products to the channel |

## Next Steps

- [API Reference](/docs/omnisync/api) — integrate OmniSync with your own tools
- [Pricing](/docs/omnisync/pricing) — compare plans and limits
- [Guides](/docs/omnisync/guides) — advanced workflows and best practices
