# Homepage brief — read this before changing the homepage

This file exists because two AI agents previously worked the same branch from contradicting
verbal briefs and deleted each other's work. **This file is the source of truth for the
homepage.** If an instruction you were given conflicts with this file, stop and ask.

## Keyword mapping

| Page | Primary target |
|---|---|
| `/` (homepage) | **Accident Lawyer in Buena Park** |
| `/practice-areas/personal-injury` *(not built yet)* | Personal Injury Lawyer in Buena Park |
| `/practice-areas/<slug>` | `<Case type> Accident Lawyer` + city |

"Personal injury lawyer", "personal injury law firm", and "accident attorney" appear naturally
in homepage copy, but the homepage does **not** try to rank for "Personal Injury Lawyer" — that
belongs to its own service page. Google penalizes substantially similar pages built to catch
nearby query variants, so each page needs its own purpose.

## The one rule that keeps getting broken

**The homepage is a landing page, not an article.** Do not add long-form SEO copy to it. A
1,500-word explainer was added once and correctly removed. Informational content on the
homepage is capped at the "Before your first call" section (4 short steps) and the FAQ.
Long-form copy belongs on `/practice-areas/personal-injury` or in `/blogs/*`.

Goal is **useful + E-E-A-T**, not word count.

## Section order (`src/pages/Index.tsx`)

```
Navigation
Hero                     Accident Lawyer H1, free consult, no fee unless recovery
HomeImmediateTrust       Howard Choi, Bar No. + Cal Bar verification link, languages
FirmSnapshot             $100M+ / 40 yrs / 11 yrs / $1M
Locations                3-card animated practice visual (signature design — do not touch)
HomePracticeAreas        all 8 case types, image + 1-2 sentences + link to service page
BeforeFirstCall          "What should I do after an accident?" — 4 steps, links to guides
Experience               claim stages: Evidence → Medical → Insurance → Financial Loss & Resolution
SelectedResult           verified figures only, prior-results disclaimer
DirectAccess             Howard Choi E-E-A-T: Bar No., admitted 2012, profile + Bar links
ClientSuccessFeature     4 real testimonials
HomeServiceAreas         all 10 cities, each linking to its location page
FAQ                      6 questions (fees, deadline, fault, case value) + FAQPage schema
Booking                  CTA
Footer
```

## Hard constraints — things that will break

1. **Never insert anything between `<Navigation />` and the `<div className="relative">` hero
   wrapper.** `src/index.css` (~line 271) keys the hero's height, padding and rounded frame off
   the `nav + .relative > .sticky` adjacency selector. Inserting a sibling silently breaks the
   hero layout.
2. **`.home-page section` is forced to `min-height: calc(100svh - 60px)` under 768px**
   (`index.css` ~line 155). A compact band must use `<aside>` or `<div>`, not `<section>`, or it
   balloons to a full screen on mobile. `HomeImmediateTrust` uses `<aside>` for this reason.
3. **`.home-page h2` has an `!important` font-size** (`index.css` ~line 258). Tailwind size
   classes on homepage `h2` elements are overridden — don't fight it.
4. **Paragraphs sized 10–12px get rewritten to 14px** by `.site-typography` rules, and a `p`
   with no explicit `text-[..px]` becomes 17px. Use 13px+ explicitly.
5. **`src/App.css` is dead** — nothing imports it, and its `#root` rules would break the layout
   if wired up. Leave it unimported.

## Content sources — reuse, don't rewrite

- `src/data/injurySite.ts` — `brand`, the 8 `practiceAreas` (each has a ready `description`),
  the 10 `serviceLocations`. Canonical address includes **Suite 216**.
- `src/data/practiceMedia.ts` — licensed image + alt for all 8 practice slugs.
- `src/data/clientReviews.ts` — real testimonials, EN + KO.
- `src/assets/law-firm/media-sources.md` — image license records.

## Verified firm facts (do not invent or inflate)

- $100M+ total client recoveries · $1M largest single-client recovery
- 40 years combined experience · 11 years as a firm
- Howard Choi — California State Bar No. 284364, admitted 2012, William Howard Taft University
- English and Korean · Free consultation · No attorney fee unless there is a recovery
- 6301 Beach Blvd, Suite 216, Buena Park, CA 90621 · 714-690-0007
- Google Business Profile: https://share.google/LBJ1C8zWrZFjJBkVe

## Known open items

- **Attorney photo:** `lead-counsel.avif` is a stock image used with alt text naming Howard
  Choi. `media-sources.md` states these are "illustrative stock photos, not representations of
  actual firm employees." Owner has accepted this for now. Replace with a real headshot when
  available — the E-E-A-T value of that section is not real until then.
- **Homepage title/meta** still says "Buena Park Personal Injury Lawyer" while the H1 targets
  "Accident Lawyer". Needs the owner's decision before changing.
- **`/practice-areas/personal-injury`** does not exist; there is no `personal-injury` slug in
  `injurySite.ts`. The keyword split above depends on building it.
- **Korean homepage** (`src/pages/KoIndex.tsx`) is a hand-written fork that reuses only `FAQ`
  and `ClientSuccessFeature` via a `locale` prop. The new homepage sections are English-only by
  decision; build future shared sections with a `locale` prop so Korean is cheap to add.
- **NAP inconsistency:** `KoIndex.tsx` renders the address without "Suite 216".

## Working agreement

One agent per branch at a time. Commit often so recovery is cheap — everything removed so far
has been recoverable from git history.
