# GEO Analysis — apps.izignamx.com

**Date:** 2026-07-10
**Tool:** Generative Engine Optimization (GEO) Assessment

---

## GEO Readiness Score: 72 / 100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Citability Score | 78 | 25% | 19.5 |
| Structural Readability | 85 | 20% | 17.0 |
| Multi-Modal Content | 30 | 15% | 4.5 |
| Authority & Brand Signals | 65 | 20% | 13.0 |
| Technical Accessibility | 90 | 20% | 18.0 |
| **Total** | | **100%** | **72** |

### What limits the score
- **Multi-modal content** (30/100): No images, diagrams, or video in documentation. The landing page uses only one decorative icon.
- **Authority & brand signals** (65/100): No Wikipedia presence, no Reddit/YouTube/LinkedIn brand mentions found. No author bios with credentials.
- **Citability** (78/100): Only one optimized passage ("What is OmniSync?") hits the 134-167 word ideal range. Other docs need similar self-contained answer blocks.

---

## Platform Breakdown

### Google AI Overviews (Estimated)
| Signal | Status |
|--------|--------|
| Top-10 ranking pages | Not measured (no GSC access) |
| Question-based H2 headings | ✅ Added across all 6 docs |
| Self-contained answer blocks | ⚠️ Partial (only getting-started optimized) |
| Tables for comparative data | ✅ Pricing + API tables present |
| Structured data | ✅ JSON-LD Organization + ItemList + TechArticle |

### ChatGPT Web Search
| Signal | Status |
|--------|--------|
| Wikipedia presence | ❌ No IzignaMx or OmniSync Wikipedia page |
| Reddit mentions | ❌ Not found |
| Author attribution | ✅ Added "Made by IzignaMx" + dates to docs |
| Specific stats in content | ✅ 585+ tests, 54+ endpoints, AES-256-GCM, etc. |

### Perplexity
| Signal | Status |
|--------|--------|
| Reddit mentions | ❌ Not found |
| Wikipedia presence | ❌ Not found |
| Community validation | ❌ No reviews, testimonials, or social proof |

---

## AI Crawler Access Status

| Crawler | Current | Recommended | Status |
|---------|---------|-------------|--------|
| GPTBot | ✅ Allowed | Allow | ✅ |
| OAI-SearchBot | ✅ Allowed | Allow | ✅ |
| ClaudeBot | ✅ Allowed | Allow | ✅ |
| PerplexityBot | ✅ Allowed | Allow | ✅ |
| Google-Extended | ❌ Blocked | Allow | ⚠️ Consider allowing |
| CCBot | ❌ Blocked | Block | ✅ |
| anthropic-ai | ❌ Blocked | Block | ✅ |

AI crawler rules configured in `public/robots.txt` (deployed via Cloudflare).

---

## llms.txt Status

| Check | Status |
|-------|--------|
| File exists at `/llms.txt` | ✅ |
| Site title + description | ✅ |
| Key app references | ✅ |
| Documentation links | ✅ |
| Key facts section | ✅ |

---

## Brand Mention Analysis

| Platform | Presence | Notes |
|----------|----------|-------|
| Wikipedia | ❌ | No page for IzignaMx or OmniSync |
| Reddit | ❌ | Not searched (no accounts found) |
| YouTube | ❌ | No IzignaMx channel found |
| LinkedIn | ⚠️ | IzignaMx likely exists but not linked from site |
| GitHub | ❌ | Not referenced from site |

**Critical insight:** Brand mentions correlate 3× more strongly with AI visibility than backlinks (Ahrefs Dec 2025). Building Reddit/YouTube/LinkedIn presence would have outsized impact.

---

## Passage-Level Citability

### Optimized Passages (134-167 words)

**1. "What is OmniSync?"** — `getting-started.md` (~152 words)
> OmniSync is a multi-channel inventory sync and price protection app for Shopify merchants. It synchronizes products, stock levels, prices, and orders across four sales channels — Mercado Libre, WhatsApp Business, Amazon, and Instagram Shopping — from a single dashboard. The app prevents accidental price overwrites with per-channel price locks and supports eight price rule types: manual, formula, margin, competitor-based, cost-plus, multi-currency, floor/ceiling, and scheduled. Built with 585+ automated tests and 54+ REST API endpoints across 21 groups, OmniSync handles real-time sync events via SSE streams and secures all credentials with AES-256-GCM encryption...

✅ Direct definition in first 60 words
✅ Specific statistics (585+ tests, 54+ endpoints)
✅ Self-contained answer block
✅ Security details (AES-256-GCM, HMAC-SHA256)

### Passages Needing Optimization

| Doc | Issue | Recommended Fix |
|-----|-------|-----------------|
| `api.md` | No definition passage | Add "What is the OmniSync API?" block in first 60 words |
| `pricing.md` | Adequate | Already has comparative table |
| `faq.md` | Well-structured | Already question-based format |
| `guides.md` | No definition passage | Add overview block |
| `changelog.md` | N/A | Already structured for direct extraction |

---

## Server-Side Rendering Check

| Check | Status |
|-------|--------|
| SSG (fully pre-rendered) | ✅ Astro SSG — all content is static HTML |
| JavaScript required for content | ❌ No — all content server-rendered |
| AI crawler content access | ✅ Full HTML content on every page |
| Pagefind search | ⚠️ JS-only (search results not crawlable — acceptable for search feature) |

---

## Top 5 Highest-Impact Changes

| # | Change | Expected Impact | Effort |
|---|--------|----------------|--------|
| 1 | **Add product screenshots and diagrams** to docs and landing page | +15 pts (Multi-modal) | Medium |
| 2 | **Build Reddit/YouTube presence** — post guides, comparison content | +10 pts (Authority) | High |
| 3 | **Create author bios with credentials** for IzignaMx team | +8 pts (Authority) | Low |
| 4 | **Add more self-contained definition passages** to api.md, guides.md | +5 pts (Citability) | Low |
| 5 | **Link to LinkedIn/GitHub** profiles from site | +5 pts (Authority) | Low |

---

## Schema Recommendations

| Schema Type | Current | Recommended |
|-------------|---------|-------------|
| Organization | ✅ Present | Add `sameAs` links (LinkedIn, GitHub, Twitter) |
| SoftwareApplication | ✅ Present in ItemList | Add `screenshot` and `applicationCategory` per item |
| TechArticle | ✅ Present for docs | Add `author` Person schema with name + url |
| FAQPage | ❌ Missing | Add if FAQ section grows beyond 5 questions |
| BreadcrumbList | ❌ Missing | Add for docs pages (improves rich snippets) |

---

## Content Reformatting Suggestions

### High Priority
1. Add "What is the OmniSync REST API?" definition block (134-167 words) at top of `api.md`
2. Add "What are OmniSync guides?" overview block at top of `guides.md`

### Medium Priority
3. Add `sameAs` links to Organization JSON-LD (LinkedIn, GitHub)
4. Add Person schema for content authors
5. Convert pricing FAQ into FAQPage structured data

### Low Priority
6. Add video embed (demo or walkthrough) to getting-started page
7. Add comparison table vs competing apps to pricing page
8. Link to IzignaMx LinkedIn page from Footer/TrustSection

---

## Summary

The site has a solid GEO foundation — SSG architecture, good structural readability, and proper AI crawler access. The biggest gaps are **multi-modal content** (no images anywhere in docs), **external brand presence** (no Wikipedia, Reddit, or YouTube signals), and **limited self-contained answer blocks** (only one doc fully optimized). Addressing these would move the score from 72 to the mid-80s range.
