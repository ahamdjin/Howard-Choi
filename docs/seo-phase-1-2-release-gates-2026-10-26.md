# SEO Phase 1 + 2 — Implementation and publication gates

Working branch: `seo/phase-1-2-technical-content-2026-10-26`
Base for this work: `design/detail-service-city-photo-landing-2026-10-26` (11 commits already ahead of production `main`).

## Implemented in this working branch

- Eager, high-priority loads for first-screen directory and legal-blog hero images; below-the-fold imagery remains lazy.
- JSON-LD business telephone now derives from the canonical `brand.phoneHref` instead of a second hardcoded number.
- Practice-area and locations index pages include BreadcrumbList structured data.
- OTS city copy no longer mixes victim counts with collision counts to calculate an invalid hit-and-run percentage. California OTS's ranking tables explicitly separate **victims killed/injured** from **fatal/injury collisions**.
- Ten location pages surface conditional, locally grounded evidence scenarios and place two relevant practice areas first (without claiming the law firm handled any particular crash).
- Korean FAQs now differ by practice area instead of repeating one universal set. This new legal-language copy requires attorney review below.
- Multilingual guide links and language switch avoid linking to missing translated articles; fallback is a real English article or localized blog index.
- A firmwide static `Last reviewed October 2026` notice is no longer asserted for every service/city page. An actual per-page reviewed date can still be passed once approved.
- Client testimonial display requires `approvedForPublication` and an internal `approvalReference`. Existing unverified entries remain in source data but are not rendered; users instead get a link to the public Google profile.

## Required factual and legal verification BEFORE main/production merge

1. **Official business identity, phone and Google Business Profile.** The current website uses `714-844-8494`, while the official California State Bar attorney profile for Howard Choi, Bar No. 284364, lists the Law Offices of Howard Choi, PC, at the same suite, with `714-690-0007`. Ask the firm which is the primary client-intake number and which numbers should appear on the public law-firm profiles. Do not simply replace either number or change the mailing address without confirmation. Audit Google Business Profile, website, contact page, directories and structured data as a unit. Official listing: https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364
2. **Recovery results.** `src/pages/editorial/ResultsPage.tsx` currently reports a largest single-client recovery of `$1M` and total recoveries of `$100M+`. Confirm the figures, date range, firm attribution, representative-case basis, and written advertising approval with the attorney. They were not independently validated in this code-only task; DO NOT treat this PR as substantiation for them.
3. **Recognition and badges.** Independently verify each badge in `src/components/TrustBadges.tsx` against its issuer, recipient, issue date and current designation. The media-source document already prohibits unrelated awards and contradictory recovery badges. If an award cannot be verified, remove it before releasing.
4. **Client testimonials.** Verify source quote, wording, permission/consent, initials or name, location, and translated meaning. Then and only then add `approvedForPublication: true` and a traceable *internal* `approvalReference` to each record in `src/data/clientReviews.ts`. Do not publish the reference on the public site; do not invent reviews to refill the section.
5. **First-person attorney statements.** `src/pages/editorial/PracticePages.tsx` contains direct statements attributed to Howard. Obtain written sign-off on each claim. Do not imply particular lawsuits or victories absent support.
6. **Korean legal language.** Attorney or qualified Korean legal reviewer must approve the new claim-specific FAQ text in `koPracticeFaqs` for legal accuracy, tone and California-law nuance. The Spanish content should receive the same language-law review before enabling Spanish indexing.
7. **Page review dates.** Only supply `PageReviewed.reviewedAt` after actual sign-off on that page, rather than carrying forward a universal review date. Confirm reviewer details and date.
8. **Local traffic statistics.** Figures still use the cited OTS years (2022 or 2023); this branch does not assert that these are the newest figures. Check the latest official OTS release and update all fields and the cited year together if newer, validated records are available: https://www.ots.ca.gov/media-and-research/crash-rankings/
9. **Published blog translations.** The lightweight `src/data/blogLocaleAvailability.ts` routing index must stay synchronized with published `koBlogs.ts` and `esBlogs.ts` entries whenever new translations are added.

## Technical acceptance tests before merging

- Run `npm ci`, `npm run build`, and `npm run lint`; record any preexisting lint failures separately.
- Check the latest Vercel preview for **READY** on this branch and visually inspect the practice areas, locations, every service/city detail template, blogs, and all EN/KO/ES versions.
- Inspect *server-rendered* HTML (not just the hydrated browser) for one homepage, directory, service detail, city detail and translated article. Check correct title, description, canonical, robots, hreflang, one H1, JSON-LD, and link presence.
- Check `/robots.txt` and `/sitemap.xml`; verify all intended EN/KO pages are present, ES noindex pages remain out of the sitemap, and nonexisting article-language pairs do not appear.
- Confirm `buenaparkinjurylawyer.com` redirects with 308 to `www.buenaparkinjurylawyer.com`; avoid indexing preview domains.
- Test hero image loading in browser devtools for eager behavior and LCP, while below-the-fold cards still load lazily; validate mobile image layout, copyright attribution, and no overflow.
- Verify city OTS sources and the units shown in text match the official table headers for each city.
- Validate Google Search Console index coverage, query metrics and Core Web Vitals *after publishing*, with before/after periods. Rankings, traffic and backlink gains cannot be promised from code inspection.

No production deployment or Google Business Profile / external directory changes are authorized by this checklist.
