# Mobile performance-only change — review checklist

Date: 2026-10-19
Branch: `perf/mobile-static-hero-global-fonts-2026-10`
Production changes: **none until the PR is merged**.

## Agreed scope

- **Mobile (under 768px)**: one static homepage hero photograph (the existing first Justice/library slide). The same layout, typography, wording, CTA, link, cropping and branding remain. The mobile picture delivers the existing 540px/810px WebP variants. It is eager/high-priority and is preloaded **only on the homepage** using the matching responsive srcset.
- **Desktop (768px and wider)**: retain all four carousel slides, interval and animation, unchanged. The DOM includes a tiny non-network transparent fallback for mobile so the browser never requests desktop slide images for the hidden carousel. After hydration the carousel is not mounted on mobile; desktop preload/slide behavior is preserved.
- **Mobile GPU paint**: remove 2px backdrop blur behind hero copy on mobile only; keep the existing dark gradient/contrast with a CSS equivalent. Do not remove the attorney photo, contact form, trust signals or lead-tracking.
- **Fonts on all devices and languages**: preserve font families (Inter, Newsreader, Noto Sans KR and Noto Serif KR). Request variable weight ranges for Inter/Noto instead of a separate static 400, 500 and 600 request. Newsreader was already variable. Google Fonts remains the serving source; `display=swap` and existing preconnect remain. Additional Korean fonts are still requested **only on /ko pages**. This is deliberately a low-risk request optimization, not a migration to self-hosted font assets or a font redesign.
- **Lead generation integrations**: no changes to HighLevel tracking, external form scripts, chat-widget deferment, GTM or Speed Insights. Their conversion behavior must be checked before merge.

## Technical reasoning and limitations

The old `Hero.tsx` used Framer Motion slideshow animation at every viewport and preloaded the next hero on mount and after each transition. A responsive mobile `<source>` made images smaller but did not stop the slideshow from loading all the images over a visit.

This PR makes that behavior desktop-only. The mobile photograph stays the same as before until the old auto-rotation would have changed it. Using a responsive preload with `media="(max-width: 767px)"` avoids downloading the mobile hero in desktop environments.

The font variable range reduces the number of potential weight-specific font files. Actual network behavior depends on Google's CSS response, browser caching, which glyphs are used and device conditions; it does not imply that all font files from all languages were previously downloaded. No score improvement is guaranteed without Lighthouse evidence.

## Test before merge

- [ ] **Mobile 320px/375px/390px/430px**: first hero image and content display at the original crop, title and CTA are readable, font doesn't unexpectedly shift, no horizontal overflow.
- [ ] On mobile, leave the homepage open 20 seconds: **no auto-rotation**; Network/DevTools should show only first hero image variants, no requests for three other hero images. Watch for duplicate LCP image requests.
- [ ] Emulate narrow viewport in DevTools with network capture including initial navigation, not only a browser window resize. Test at DPR 1/2/3.
- [ ] Desktop 1024px/1440px: four slides still rotate every five seconds; dots and progress still operate; static mobile-only image is not downloaded.
- [ ] Resize mobile ↔ desktop: no incorrect background/cached slide remains; desktop slider resumes.
- [ ] Test English `/`, Korean `/ko`, Spanish `/es`. English/Spanish font CSS must not include Noto Korean families, Korean CSS must. Fonts should show Inter and Newsreader as before.
- [ ] Confirm `/_vercel/speed-insights/script.js` still loads and the HighLevel contact form submits, phone links work, chat opens, GTM lead tracking is not broken.
- [ ] Test keyboard navigation, reduced-motion setting and layout stability.
- [ ] Run Lighthouse Mobile **at least three times on identical throttling** on live and preview homepages, record median score and LCP / TBT / CLS / transfer sizes. The previous 72 is owner-reported and was not captured with full diagnostics; use a new baseline.
- [ ] Compare local and preview page before merging; no change in homepage text, metadata or desktop layout is expected.

## Rollback

Revert the PR's Hero, root font query, and mobile-only hero CSS changes if network capture shows unexpected double image downloads, missing fonts, hydration warnings, lead form regressions or worse mobile LCP.

The site has separate SEO performance and indexing issues; this PR does not change page titles, canonical URLs, structured data, indexing rules or article copy.
