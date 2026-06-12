---
title: Changelog
description: OmniSync release notes and version history.
app: omnisync
section: changelog
order: 5
updated: 2026-06-01
---

## v1.0.0 — June 2026

Initial release.

### Features

- **Multi-channel sync**: Connect Mercado Libre, WhatsApp Business, Amazon, and Instagram
- **Price protection engine**: Per-channel price locks with 8 rule types
- **AI-powered suggestions**: Price recommendations based on market data (Pro/Enterprise)
- **Real-time dashboard**: Monitor sync status, pricing, and inventory across all channels
- **54 API endpoints**: Full REST API for programmatic access
- **560+ automated tests**: Comprehensive test coverage for reliability

### Price Rule Types

- Manual
- Formula-based
- Margin-based
- Competitor-based
- Cost-plus
- Multi-currency
- Price floor/ceiling
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
