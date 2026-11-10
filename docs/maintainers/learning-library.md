# English learning library

## Requested scope and authority

On November 10, 2026 the user explicitly stated they have permission to reuse DK Law content as-is and requested the missing services, FAQs, guides under Blogs and injury explanations. No tools, deployment or Git push was requested in this pass.

The static-HTTP source snapshot covers 47 explicit URLs, all returning HTTP 200. Research navigation and source outlines are in `reference/seo/competitors/dklaw/2026-11-10/`. This does not establish complete coverage of every page on DK Law's domain.

## Information architecture

- `/practice-areas/bicycle-accidents` and `/practice-areas/dog-bites`: two new English services in the existing vehicle/personal-injury groups.
- Existing nine English service pages retain their established content. Source-specific metadata, selected additional explanations, topic FAQs, guides and injury links strengthen them.
- `/faqs`: 12 topic pages and all 75 source question headings. `/about/faqs` remains the firm's consultation/fee entry point and links to the library.
- `/blogs/guides`: 11 subject guides. Ten new Markdown guides join the existing car-accident article, rather than making a competing second car-accident URL.
- `/injury-types`: 11 topics. Ten new pages join the existing traumatic-brain-injury article, preserving that article's established URL.
- Existing drafts remain unpublished. New guides are explicitly enabled for local review and retain `needs-attorney-review`; a source import or successful build is not attorney approval.
- New content is English-only. Language switches fall back to the existing translated directory; Spanish/Korean indexing policy is unchanged.

## Editing and shared components

- `content/learning/dklaw-authorized.json`: editable FAQ answers, injury explanations and service explanations, including source URLs and separated headings/paragraphs. `source` is provenance, not rendered article copy.
- `content/blog/california-*-guide.md`: editable new guide bodies and metadata, using the existing blog parser, author registry and draft gate.
- `content/learning/catalog.json`: lightweight navigation/index summaries, not the reading-page source. Run `python3 scripts/sync-learning-catalog.py` after changing a resource title, description, headings or guide metadata.
- `src/data/learningResourceContent.ts`: full content resolver, loaded by reading routes.
- `src/data/learningResources.ts`: small catalog, group/relationship helpers and existing project imagery.
- `src/pages/learning/LearningPages.tsx`: shared resource hub, reading page, related links and next-step navigation, using existing EditorialHero/ReadingLayout components.
- `src/components/PracticeLearningResources.tsx`: service-specific source explanations and incoming links to the new guides/FAQs/injuries.
- `src/data/injuryMedicalSources.ts`: official health references checked for the injury pages. Medical content does not diagnose a visitor or replace clinical evaluation.
- Sitemap uses the same catalog for topic URLs. Guides continue through the normal published-blog sitemap.

The one-off importer under `scripts/research/` is research tooling, not the editorial source. Re-running it overwrites adaptations: import to a separate review file and compare before replacing approved content. The adapted source snapshot in the reference folder is historical research, not a second active guide source.

## Deliberate adaptations

The ordinary explanatory copy and source question headings are retained where applicable. The import excludes source navigation, forms, tool/calculator UI and global firm promotion. It adapts DK branding and contacts, removes DK-specific results, medical networks and staffing promises, uses Howard's confirmed no-attorney-fee-unless-recovery wording, and corrects identified claims about insurance reporting deadlines, legal representation of incapacitated relatives and rideshare liability versus uninsured-motorist coverage. Existing medical/legal sources support further checking; Howard should review the new legal content before a production release.

Several source-style titles/descriptions exceed the audit's advisory length thresholds. These are presentation warnings, not technical/indexability errors; titles may be truncated or rewritten by search engines. They remain visible in the audit so a later editorial pass can decide whether to shorten them.

## Verification

```
python3 scripts/sync-learning-catalog.py
python3 scripts/check-learning-content.py
npm run check
node scripts/check-lawyer-seo.mjs
# Start the built server, then:
python3 scripts/audit-seo.py --origin http://127.0.0.1:3146 --output output/seo/2026-11-10-learning-audit.json
```

Coverage checks protect all 75 original question headings, 11 guide subjects, 11 injury subjects, two new services, minimum substantive content and HEAD draft gates. Rendered SEO audit checks reachable routes, sitemap, metadata, canonical URLs, image assets, internal links and fragments. Browser evidence lives under `output/playwright/learning/`; external tracking is blocked during these checks, and no enquiries are submitted.

## November 10: complete reading pages and consolidated FAQ navigation

- The old `/about/faqs` short-answer screen is retired. Both that address and its historical malformed alias redirect directly to `/faqs`; only the library's canonical URL is in the sitemap. About, city and mobile links use that destination.
- Desktop and mobile navigation separate **About** (firm, difference, process, fee promise, lawyer and results) from **Learning Hub** (blogs, guides, FAQs and injury types). The English mobile menu uses collapsible groups instead of a flat list.
- Established service pages render every available adapted source section, instead of the previous one/two-section selection. Existing page copy remains in place. Source text and additional internal headings remain editable in the resource JSON.
- `content/learning/firm-pages.json` owns the full firm-reading pages. What to Expect follows all eight stages of DK Law's All The Way Promise; Our Difference follows its client philosophy, mission, five core values and practical support sections. Zero Fee is compiled from the same process page and DK's hiring/settlement/personal-injury FAQs; no standalone DK Zero Fee page was verified. Do not label the fee page as a verbatim reproduction of a standalone source.
- Firm-specific source staffing, results, medical networks, service response guarantees and third-party names are not transferred to Howard. Fee wording stays within the confirmed “no attorney fee unless there is a recovery” scope. Source-only does not authorize attributing another firm's operational facts to this firm.
- Source captures for the two firm pages are in the existing competitor reference folder. They are static extraction records, not the active editing source. The coverage audit records source/local headings and body counts; paragraph-only counts exclude lists and are not complete article word counts.

### Source-aligned metadata

The 45 mapped English resources now use source H1s (including guide `101` titles), source SEO wording and descriptions. DK Law's trailing title brand becomes `Injury Lawyer`; in-copy branding becomes `Buena Park Injury Lawyer`. Service descriptions use singular `lawyer` where appropriate. Bicycle/rideshare descriptions retain the confirmed attorney-fee scope instead of implying all costs are waived. The existing car and brain-injury article URLs/bodies remain intact, with their English search metadata aligned to the corresponding source guides. No draft was published. Metadata-only edits to those two existing English articles required refreshing translated source hashes; the translated body paragraphs were unchanged.

Expected source mappings and intentional exceptions: `reference/seo/competitors/dklaw/2026-11-10/metadata-alignment.json`. After building, run `python3 scripts/check-source-metadata.py` to verify the emitted title, description and exactly one H1 on each mapped page.

## Non-location depth pass

Scope confirmed by the user: the 45 DK-mapped English detail pages and firm pages first. Existing unrelated blogs and every location page are excluded. The 45 comprise 11 guides, 12 FAQ topics, 11 injury topics and 11 services; the car guide and TBI explanation use established blog URLs. Location source hashes and built main-content hashes were saved before rebuilding so the content freeze is verifiable.

- Restored service insights and omitted explanatory paragraphs/lists. Kept the prior rideshare liability-versus-UM/UIM correction and source deadline exceptions; do not reintroduce the old blanket “regardless of fault” insurance promise.
- `content/learning/source-depth-supplements.json` contains English-only additions to 12 source-mapped articles. `src/lib/english-source-depth.ts` merges them into the reading page and its contents navigation, placing car/TBI material beside the relevant existing discussion. Original Markdown bodies, existing translated bodies and publication gates remain unchanged. These additions need their own Spanish/Korean translation pass before language-parity claims are made about the enriched English reading pages. Do not simply advance translation hashes to imply that supplemental text was translated.
- Existing About/profile/results content was compared with the source firm pages. Howard's actual biography, registration, history and reported outcomes remain the source of truth. DK's multi-attorney directory, military history, client videos, private settlements and award totals are not Howard material. They are not imported to inflate word counts.
- Our Difference, What to Expect and Zero Fee now provide more client-facing detail on strategy, each process stage, agreement questions and net recovery, using the source subjects while respecting Howard's confirmed fee scope.
- `depth-coverage.json` in the competitor reference folder maps every retained source topic to its visible section. Intro/conclusion duplication and unrelated firm-specific claims have recorded reasons. `output/seo/2026-11-10-depth-final.json` records source and rendered counts; rendered counts include existing original material and related navigation, so they are not measures of unique prose.

Validation: `python3 scripts/check-nonlocation-depth.py` after building, alongside the source-metadata, learning-content and rendered-content checks. Matching coverage and word counts are editorial checks, not evidence of Google indexing or rankings.

## Contextual internal linking

The English linking pass adds reading-context paths between services, guides, FAQs, injury explanations and the firm information. Links are authored in the resource/firm JSON and English article supplement data; no runtime keyword autolinker modifies page copy. The paragraph/list link inventory excludes the header, footer, reading rails and navigation.

Injury relationships now use an explicit primary practice mapping: whiplash/internal injuries connect to car accidents, knee/shoulder injuries to slip-and-fall, road rash to motorcycle accidents, and catastrophic conditions to serious injuries. The shared RelatedLearning component consumes those relationships rather than assigning every injury to catastrophic claims.

`python3 scripts/check-contextual-links.py` verifies the curated link plan against built HTML, incoming reading-content links to all 45 source-mapped pages, descriptive nonempty anchors and absence of draft destinations. The before/after graph and edit records live in `output/seo/2026-11-10-context-links-*.json`. The complete rendered crawl separately checks destinations and fragments. These are content-navigation checks, not ranking guarantees or an ideal link-count target.

Source reference: https://developers.google.com/search/docs/crawling-indexing/links-crawlable . Existing metadata, publication states, translations and location copy are outside this linking pass.

## Source parity and editorial cohesion

The source-backed service explanations now lead the established English practice pages inside their main reading flow. Their headings appear in the same contents navigation as the retained case-specific evidence and California analysis. The resource component at the bottom contains related destinations only; it no longer restarts the whole source article there.

`content/learning/reading-plans.json` owns the English source-guide order and explicit combinations for the car/TBI articles. Original sections that cover the same topic become named subsections of one chapter; all original text remains available. `check-editorial-flow.py` verifies 1,033 original Markdown blocks, source order on nine established services, the twelve article plans and the frozen location bodies. Duplicate support chapters in dog-bite/fall content are consolidated; the duplicate-removal log identifies the repeated text.

`/learning-hub` is the central English directory for Blogs, Guides, FAQs and Injury Types. It links to existing resources rather than presenting empty video, podcast or research categories. Its language links fall back to real translated blog directories. The existing design components and imagery are reused. Location copy, location metadata, Howard's biography and reported firm outcomes are not changed in this pass.

### Reading visuals and the consultation action

`ConsultationCard` is the shared, localized single-action card used by reading rails, article sidebars and the lawyer profile. Its only action opens the existing locale-specific contact page; it does not submit an enquiry. Desktop rails keep it above a bounded, separately scrolling contents list. Mobile puts the card and collapsed contents above the reading content.

`ClaimNotes` provides a short accessible note board for source service sections and firm/process pages. Keep these summaries separate from the full source copy. `ContentPhoto` supports scene and recovery placements; archive images are stored locally in `public/editorial-images` with sources recorded in `media-sources.md` and public photo credits.

The visual layer is isolated in `src/styles/reading-visuals.css`, imported by `SiteDocument`. It retains the existing palette and typography family, reduces decorative dividers, and controls the shared CTA placement. Reverting the stylesheet import restores the preceding presentation rules but does not remove newly inserted components; remove the corresponding `ConsultationCard` and `ClaimNotes` calls when reverting those additions too.

Verified November 10: 51 English mapped/firm content pages at 1440px and 390px (102 page/viewport checks), with no document overflow, one H1, loaded images, and exactly one action per consultation card. Representative desktop/mobile screenshots and a 1280×720 sidebar check were inspected. Existing metadata, source-paragraph and contextual-link checks passed. This is local verification, not deployment.

### Topic-specific visual boards

`TopicVisual` expands the photographic evidence-board language into folder, review-note and sequence variants. Its explicit page content/photo selections live in `src/data/page-visual-plans.json`; presentation lives in `topic-visual.css`. Keep the summaries brief and tied to the surrounding topic. These boards supplement complete source paragraphs; they do not replace them. Service, injury and FAQ templates use one early board; longer English articles can add a second visual break after section six. The existing photographic evidence maps remain available. Locations are excluded from this expansion.

Visual expansion verification: 50 of the 51 mapped/firm English pages now render a new topic board; the lawyer profile retains its existing portrait-and-process presentation. All 51 were checked at 1440px and 390px (102 page/viewport states): no overflow, no broken loaded images, and one action in each consultation card. Mobile stacked injury notes and the desktop folder board were visually inspected. Complete source-paragraph, metadata and curated-link checks passed after the final build.

### Visual direction correction

The earlier shared three-note/folder composition was rejected as repetitive. `TopicVisual` now selects a subject-led composition: an activity compass, incoming-letter decision desk, staggered journey, fee-agreement slip, photo/conversation spread, truck record-source map, incident notebook, equipment inventory, clinical/everyday diptych, or annotated scene. The original `ClaimVisualStory` evidence board remains intact. Do not treat changing labels on the same three-card layout as a new visual concept. Continue tailoring compositions to the explanation and preserve the full copy and the primary consultation card.

Verified after correction: ten composition families rendered across the English mapped/firm set; 51 pages at 1440px and 390px passed overflow, loaded-image and single-action-card checks. Shoulder/insurance desktop examples and fee-agreement mobile layout were visually inspected. Build, full source paragraphs, metadata and contextual links passed. Locations were not edited.


### Explicit page plans are the current source of truth

Each of the 51 selected English content pages now owns its purpose, headline, explanatory notes, image key, composition and insertion position in `src/data/page-visual-plans.json`. `pageVisualPlans.ts` resolves this data; there is no keyword-driven default. An unmapped route receives no automatic board. The reusable rendering compositions remain shared, but a service, its FAQ topic and its guide have different editorial plans. Do not return to inferring the explanation from the slug.

`afterSection` is a zero-based position in the page’s source sections; -1 means a standalone placement on About, Results or Lawyer. If sections change, review the planned placement. Run `python3 scripts/check-page-visuals.py --origin http://127.0.0.1:3146` after a build to verify coverage, route selection, one explicit visual per page, headline uniqueness and actual insertion placement. Each figure has the stable `#page-visual` anchor for direct review. Locations, translations, drafts and original source copy are outside this visual expansion.


Final per-page verification: all 51 plans render exactly once at their chosen section with 51 distinct headlines. Desktop and mobile checks covered all 51 routes (102 states) with no overflow, broken loaded images or duplicate actions in the shared consultation card. Related bicycle FAQ, service and guide compositions were visually compared. Direct `#page-visual` links were checked; `ScrollToTop` now respects valid incoming fragments rather than resetting them. Bicycle and motorcycle plans carry explicit photo framing for their subjects.
