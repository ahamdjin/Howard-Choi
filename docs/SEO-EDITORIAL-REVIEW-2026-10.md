# SEO & English Legal Editorial Review — October 2026

**Status: Draft PR for attorney and owner review. Nothing in this branch is approved for publication.**

## Baseline and approach

The Search Console ZIP dated October 17 recorded 2,904 chart impressions and 4 clicks; its page export showed 2,634 homepage impressions (4 clicks) and very little visibility for dedicated service pages. Query clusters highlighted car, rideshare, truck, motorcycle, pedestrian, bicycle, and brain/catastrophic injury searches. The ZIP did **not** join each query to its page, so ownership of specific queries is an SEO target rather than verified attribution.

The homepage and car-accident title/description changes were already made on main October 17. This PR intentionally **does not rework those tags again**, so a future before/after measurement is interpretable. This PR focuses on missing service-page specificity, conversion/navigation quality, one strong injury search-intent gap and author-reviewed editorial expansion.

## Follow-up responsive and content work (owner feedback)

The first PR iteration only made relatively small textual improvements. A second pass has now added **visible, matter-specific content and mobile design changes**:

- **`src/data/englishPracticeGuides.ts`**: eight separate four-part evidence/liability/insurance/damages guides (no fictitious case studies).
- **`src/pages/editorial/PracticePages.tsx`**: visibly renders those four-part guides within a dedicated, linked `Case-specific guidance` reading section; new consultation action.
- **`src/index.css`**: increases body text on narrow screens from 15.5px to 17px, improves leading and title wrapping, and removes unnecessary screen-height minimums from individual practice sections to avoid large blank areas.
- **`src/components/SiteNavigation.tsx`**: stacked, 16px service/location links on narrow phones; more comfortable tap targets.
- **`src/pages/BlogDetail.tsx`** and **`src/pages/Blogs.tsx`**: tighter mobile hero height, improved article-list typography, expandable mobile table of contents, and visible substantive update dates.
- **Existing six English blog Markdown files**: each receives four additional explanatory sections with practical evidence procedures, differentiated insurance issues, illustrative but clearly hypothetical scenarios, and legal deadline caveats. Original legal statements must still be reviewed by Howard. Reading time is computed dynamically.
- **`src/data/blogs.ts`, `src/lib/seo.ts`, routes and sitemap**: preserve original `datePublished` while accurately supplying `dateModified` for substantive October 17 editorial updates.

**Why this matters:** Google's people-first content guidance asks whether a page has original evidence, helpful depth and trust signals; there is no SEO-safe target word count. These drafts and expanded guides require a licensed attorney's accuracy review and, ideally, verified original matter-specific insights before release. Do not represent AI-assisted drafts as firsthand attorney experiences. See https://developers.google.com/search/docs/fundamentals/creating-helpful-content.

**Direct branch file links for review:** https://github.com/ahamdjin/Howard-Choi/blob/seo/money-pages-mobile-and-editorial-drafts-2026-10/src/data/englishPracticeGuides.ts and https://github.com/ahamdjin/Howard-Choi/blob/seo/money-pages-mobile-and-editorial-drafts-2026-10/src/index.css.

## Code included in this PR

- All eight English injury-service routes now have differentiated, intent-specific titles and descriptions; the car-accident route retains the recently improved title.
- The Serious Injuries page targets traumatic brain injury and catastrophic injury in its H1, title and relevant content **without changing its existing URL**.
- Each English practice page has a distinct factual explanation of evidence/insurance/damages, rather than replicated SEO boilerplate.
- Related-practice cards use a topical map rather than first-four service order.
- La Habra's page snippet emphasizes real representation from Buena Park; **do not imply a second La Habra office**.
- Site navigation: independently scrolling fixed mobile panel; removes parent clipping, supports Escape to close and return focus, and releases scroll lock on desktop resize. A real-device QA pass is still needed.
- Blog publishing infrastructure now supports English articles without falsely listing untranslated Korean counterparts in alternates and sitemaps.
- Three detailed English-only draft articles, each around 2,000 words, have `published:false`, so they do not enter the blog index, navigation, or sitemap.

## Focused fourth English article: California car-accident settlement timeline

File: `content/blog/how-long-car-accident-settlement-takes-california.md`  
Status: **`published:false`, legal review required.** ~4,200 words, 23 sections and nine official primary sources. A six-step visual process summary is rendered on this article only.

**Search intent:** `how long does a car accident settlement take in California`, settlement process, insurer response timing, injury valuation, Medi-Cal liens, settlement release, payment after offer. This is a separate informational intent from the existing accident-day action guide and the existing insurance coverage guide; canonical article path stays `/blogs/how-long-car-accident-settlement-takes-california` after approval.

**Authoritative evidence researched:** California Department of Insurance claim-handling guidance and Fair Claims Settlement Practices Regulations; California Courts on personal injury, discovery and claims against government entities; California DMV SR-1 reporting; DHCS Personal Injury Program and lien process. Linked in `src/pages/BlogDetail.tsx` article support.

**Value beyond generic SEO copy:** six-stage settlement model; clarification of 15-day/40-day insurer requirements versus actual injury settlement; three **fictional, explicitly labeled** examples showing different evidence/coverage obstacles; insurer status questions; practical document worksheet; distinctions between signing a release, insurer payout, lien resolution and net client receipt; common FAQs.

**Attorney review required:** confirm the exact regulatory nuance of 10 CCR §§ 2695.5/2695.7 in first- versus third-party claims, insurer payment provisions and exceptions; wording around claimant vs attorney obligations and timing; DHCS 30-day notice and settlement/reimbursement processes; California public entity rules and case deadlines. No numerical case duration or settlement amount is promised or implied. Check the 2026 law and firm policy before publication. Remove the pending-review sentence from the final section **only after actual approval**; update `publishedAt` to the actual publication date and flip `published:true` in a separate approved publication PR.

**Site linking after approval:** related-service card points to `/practice-areas/car-accidents`; once live, add an editorially relevant text link from that practice page's insurance/damages material, and link the article selectively from the blog index. Never link to an unpublished URL.

## Editorial drafts — approval gates

### 1. Traumatic brain injury after a California accident
File: `content/blog/traumatic-brain-injury-evidence-after-california-accident.md`

Target: informational searches around brain injury, symptom documentation, medical evaluation, future care, earnings and accident causation. Supports `/practice-areas/serious-injuries`.

Primary research: CDC guidance on mild TBI symptoms and danger signs, TBI diagnosis and rehabilitation, California Courts on evidence, claims and deadlines.

Howard Choi must verify: all medical-legal characterizations; whether all described care categories are appropriate; the line between clinical and legal conclusions; coverage and damages explanations; avoid implying that specific outcomes are typical.

### 2. California bicycle accident evidence and insurance
File: `content/blog/california-bicycle-accident-evidence-and-insurance.md`

**DO NOT PUBLISH until Howard expressly confirms the firm accepts bicycle injury cases.** Search demand alone is not evidence that a service is actually provided. If the firm does not handle the cases, remove the draft instead of producing a bicycle service page.

Primary research: California Vehicle Code sections 21200, 21202, 21208–21209; Caltrans bicycle law resources; CHP report requests; DMV reporting; California Courts.

Howard Choi must verify: exact application of traffic provisions, accident/insurance examples, government-defendant timing, and service scope. Remove the internal statement explaining draft status when a later approved version is published.

### 3. California hit-and-run / uninsured motorist injury claim
File: `content/blog/california-uninsured-driver-hit-and-run-injury-claims.md`

Target: useful, high-intent coverage questions supporting the existing car accident practice page; intentionally does not compete for the core 'car accident lawyer Buena Park' service query.

Primary research: California Department of Insurance auto-coverage guide (UM/UIM), accident reporting guide, DMV SR-1 requirements, California Courts.

Howard Choi must verify: hit-and-run physical contact/notice requirements and nuanced UM/UIM policy procedures; timelines, settlement/release effects, and the difference between required and optional policies. Where statute and policy wording govern, avoid categorical legal claims.

## Important author/approval safeguard

The page's visible credit reads **'Published by Buena Park Injury Lawyer'** and links to the attorney profile and official State Bar listing; this is not a claim that Howard Choi has reviewed the article. **Only add 'Reviewed by Howard Choi' after Howard personally approves the exact final content**. The existing practice-page attorney-attributed first-person quotes in `PracticePages.tsx` were present on main before this PR; request Howard's confirmation of their authenticity, since they are attributed to him.

## Final publication procedure — after attorney approval ONLY

1. Record Howard's changes and approval in the PR or an issue.
2. Confirm bicycle work is a service the firm truly handles; remove that draft if not.
3. Correct any medical, insurance and legal citations noted by attorney.
4. Set each approved draft's `publishedAt` to the actual publication date; flip **only** the approved article to `published:true` in a separate publication PR.
5. Verify the title, byline/publisher information, crawlable source links, hero image, related practice link, canonical, and sitemap XML. For English-only articles, no Korean alternate should appear.
6. No fabrication of case outcomes, testimonials, legal experience or medical claims. Keep accurate disclaimers and no guaranteed settlements.

## Vercel Speed Insights integration

- The root TanStack Start document now includes Vercel's officially documented script-tag setup (`window.si` queue plus deferred `/_vercel/speed-insights/script.js`), on every language and page. No extra npm dependency or lockfile change is needed.
- **Owner action required:** In the **howardchoi** project on Vercel, open **Speed Insights → Enable**, then deploy the approved PR. Enabling creates the Vercel tracking routes; code alone does not start measuring.
- Confirm via browser Network that the Vercel Speed Insights script returns 200 after deployment; confirm Web Vitals requests and data are visible in the Speed Insights project dashboard after real visits. An empty dashboard immediately after setup is normal.
- Select **Mobile** and **Production** to inspect actual field performance, especially homepage and the eight practice pages. Initial sample sizes may be too low to draw conclusions.
- This is not the same thing as Google Search Console, and it cannot itself repair mobile navigation or indexing.

## Developer/mobile QA checklist

- [ ] 320px and 375px width: open menu, expand Practice Areas, scroll to the final service and phone CTA, close, reopen, and verify content remains reachable.
- [ ] 390px and 430px iPhone Safari: check body does not scroll beneath the open menu, main panel scrolls, closing restores prior scroll, and bottom content clears the browser/safe area.
- [ ] Android Chrome: test menu group expansion, final locations link, physical back navigation, and portrait/landscape.
- [ ] Resize while menu is open to >=1024px; body scrolling must recover.
- [ ] Keyboard Escape closes panel and focuses menu trigger; test screen reader labels.
- [ ] All English, Korean and Spanish shared navigation variants. English only applies to *new blog content*, not to mobile-nav maintenance.
- [ ] Confirm main CTA, forms, phone link and desktop megamenus are not regressed.
- [ ] Run `npm run build` and `npm run lint` in CI or a local checkout before merge; do not treat code inspection as an actual browser run.

## Google-controlled checks — cannot be fixed or verified from GitHub alone

Use Search Console **URL Inspection** manually, with no connector required:
- `/`
- `/practice-areas/car-accidents`
- `/practice-areas/truck-accidents`
- `/practice-areas/motorcycle-accidents`
- `/practice-areas/pedestrian-accidents`
- `/practice-areas/rideshare-accidents`
- `/practice-areas/slip-and-fall`
- `/practice-areas/wrongful-death`
- `/practice-areas/serious-injuries`
- `/locations/la-habra`

For each, record indexing status, Google-selected canonical vs user-declared canonical, last crawl, whether it is in the sitemap and whether rendered content is visible. Existing `/terms` and `/privacy-policy` contain `noindex`—verify Google has processed this, but do not optimize legal utility pages for acquisition.

After merge, compare two complete **28-day** GSC windows, including individual practice-page impressions and clicks; interpret this young site's low-count data cautiously. Get a query + page combined export if possible (the prior ZIP had separate dimensions).

## Coordination with local citations and backlinks

Use the **real, consistent** firm's listing identity and do not imply additional locations:

- Name: Buena Park Injury Lawyer
- Address: 6301 Beach Blvd, Suite 216, Buena Park, CA 90621
- Phone: (714) 844-8494
- URL: https://www.buenaparkinjurylawyer.com/
- Email: case@buenaparkinjurylawyer.com

Review name variants before submitting a citation. Prefer relevant, authentic legal/community/association references and genuinely useful editorial mentions. Avoid bulk purchased links, review gating, paid reviews, fake offices, duplicate keyword-stuffed directory listings and manufactured endorsements. Check citations/links for correct destination and disclosure; earned links should flow to useful service pages or genuinely helpful articles.

## Remaining factual decisions for the owner/attorney

- Does Howard accept bicycle injury, bicycle vs motor vehicle, e-bike and related claims?
- Confirm all firm claims about offered practice areas, languages, consultation fees and case expenses.
- Has Howard checked existing first-person quotes and permission for public attorney attribution?
- Confirm the actual attorney reviewer name/title and review workflow, if a formal byline will be introduced.
- Is Spanish intended to acquire organic traffic in the future? Currently Spanish indexing is separately restricted; not changed in this PR.
