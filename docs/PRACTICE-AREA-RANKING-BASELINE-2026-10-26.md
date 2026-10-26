# Practice-area organic search: baseline and focused priorities

Prepared 2026-10-26 for Buena Park Injury Lawyer. Site: https://www.buenaparkinjurylawyer.com/

## Scope and source limitations

Baseline: user-provided **Google Search Console Performance on Search Oct 17 2026.zip**, containing daily records 2026-09-23 through 2026-10-14, a **Top pages** tab and a separate **Top queries** tab. This is **not** the current 2026-10-26 ranking, an independent SERP tracker, or a Google URL Inspection result.

**Critical measurement caution:** The CSV does not join query to landing page. A high average position for a query cannot be attributed to the corresponding practice-area landing page unless query/page dimensions are retrieved together. The homepage captured most page-row impressions, while practice pages were barely shown. No inferences about sitewide position improvements after the October content and performance deployments are possible from this old export.

### Practice-page baseline (GSC Pages.csv)

| Practice area | URL suffix | Impressions in export | Average position (of that URL, all queries) | Priority |
|---|---|---:|---:|---|
| Car accident | `/practice-areas/car-accidents` | 3 | 96.67 | **P1**: extremely weak page-level exposure despite relevant queries |
| Uber & Lyft | `/practice-areas/rideshare-accidents` | no row | unknown | **P1**: validate indexation, page-to-query match |
| Truck accident | `/practice-areas/truck-accidents` | 3 | 13.00 | **P1**: improve page-level exposure |
| Brain / catastrophic injury | `/practice-areas/serious-injuries` | 38 | 46.29 | **P1**: improve term/page match, validate indexing |
| Pedestrian accident | `/practice-areas/pedestrian-accidents` | 36 | 31.92 | P2 |
| Slip and fall | `/practice-areas/slip-and-fall` | 32 | 24.59 | P2 |
| Motorcycle accident | `/practice-areas/motorcycle-accidents` | 3 | 90.33 | P2 (acute page-level weakness) |
| Wrongful death | `/practice-areas/wrongful-death` | 20 | 34.25 | P2 |

No clicks in the page-level rows above in the historical export.

### Query clusters (GSC Queries.csv; not tied to a particular landing page)

These values aggregate the individual rows containing the specified query topic. They are indicators of query exposure, not verified rankings for the practice URLs:

- Car accident + auto accident: **413 impressions**, weighted average position about **7.1**. `buena park car accident lawyer`: 89 impressions, avg. position **5.44**.
- Uber + Lyft + rideshare: **239 impressions**, weighted avg. pos. about **4.7**.
- Truck: **186 impressions**, weighted avg. pos. about **5.8**.
- Motorcycle: **183 impressions**, weighted avg. pos. about **9.0**.
- Brain injury + catastrophic injury: **162 impressions**, weighted avg. pos. about **7.6**.
- Pedestrian: **160 impressions**, weighted avg. pos. about **12.6**.
- Slip and fall: **156 impressions**, weighted avg. pos. about **9.2**.
- Wrongful death: **32 impressions**, weighted avg. pos. about **26.3**.

Exclude unrelated services (e.g. medical malpractice, dog bites, workers' compensation) unless the firm confirms those cases are actually accepted. Do not create new landing pages solely because these unrelated queries appear in the CSV.

## Current checks and opportunity

Existing pages already have: distinct service-specific SEO titles and descriptions; service-specific H1s; significant editorial guidance; contextual cross-links; citations to California Courts and relevant agencies; and ordinary indexable HTML with canonical URLs. **Do not rewrite all eight titles again** before collecting new evidence.

This PR improves **contextual internal linking** where the previous text was vague:
1. A restrained line of relevant truck, rideshare and brain-injury links from the first below-hero trust section on the English homepage (localized appropriately for other languages).
2. Direct car and rideshare practice links from the English blog listing to complement its broad practice-area link.
3. Replace “Explore this guide” with a descriptive practice-specific link in all English blog detail related-help boxes.

No legal text, schema, page titles, canonicals, article publication dates or source citations are changed in this PR. No new practice-area or location doorway pages are added.

## Prioritized next measurement

1. In Google Search Console, choose Search results → Search type Web → Compare last 28 days with previous 28 days, **Google organic only**, and export **Pages** and **Queries**. In the UI also filter a given exact practice-page URL and export its **Queries**, separately for Desktop and Mobile. This is necessary to prove which page ranks for which term.
2. Run URL Inspection on each of the **eight English practice pages**, recording “URL is on Google”, user-declared and Google-selected canonical, and latest crawl/indexing status. Do not infer indexing from `site:` search or sitemap presence.
3. Track an organic (non-Maps) fixed-place ranking for primary queries such as “buena park car accident lawyer”, “buena park truck accident lawyer”, “buena park uber accident lawyer”, “buena park brain injury lawyer”, and primary terms for the other four. Specify location (Buena Park, CA), device, and search type. Mobile/desktop ranks vary.
4. Check the firm Google Business Profile listing separately; local/Maps placements depend substantially on proximity, relevance and prominence, and should not be conflated with ordinary web page average position.
5. Review genuine client reviews, legal-directory citations with consistent official NAP, and authentic local/business links. No paid spam links or fabricated testimonials.

## Success criteria

- Growth in **practice-area page impressions** and clicks (independent of homepage impressions).
- Increased query impressions for each *correct* matching practice URL; fewer mismatched impressions landing on only the homepage.
- Ranking improvements measured with a fixed device and location, without cherry-picking a single GSC position.
- No regression in Lighthouse/Core Web Vitals, SEO canonical/index signals, form completion or mobile design.

Google's public guidance:
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://support.google.com/business/answer/7091

A site update does not guarantee a ranking increase or instant Google recrawl; inspect fresh GSC data before undertaking large on-page revisions.
