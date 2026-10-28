# Multilingual parity and duplicate-template remediation

PR #39: `seo/translation-parity-and-template-cleanup-2026-10-28`

## Master content principle
English is the editorial source of truth. Translations must retain the same *substantive* facts, warnings, section order, legal citations, source URLs, FAQs and relevant internal links. Natural language and sentence length may differ. Before indexing a new translation, a qualified reviewer should compare it against the English master, including dates, numbers and exceptions.

## Implemented
- Eight English practice-area case-specific supplements now appear on the corresponding Korean and Spanish pages, with the same four topic headings/points per service, rather than being silently omitted.
- Eight Korean practice pages now have translations of the four English evidence-item categories and independently localized issue-focus paragraphs and section headings.
- Location templates retain the same overview, OTS data, police/court sources, practice links, evidence, deadlines, three FAQ entries and nearby-city sections in all three languages.
- Korean OTS text explicitly reproduces the English victims-by-type values (motorcycle, pedestrian, bicyclist). City-practice examples now exist in all languages instead of only English.
- City and practice detail pages no longer each repeat the same generic three-step process photography, full attorney promo and unapproved Google-review prompt. Contact CTA, attorney navigation, legal disclaimers, evidence sections and unique page copy remain.
- Practice-area related links retain four relevant service destinations but remove repetitive generic card copy. Long, ten-city lists now show six selected cities per practice area plus the full locations directory, preserving coverage through hub navigation.

## Measured overlap: five-word sequence Jaccard on server-rendered <main>
These are **not** plagiarism scores, Google penalties, or official Google duplicate-content thresholds.
- English city pages before cleanup: 20.96% average pairwise; highest pair 24.03%.
- English practice pages before cleanup: approximately 20–23% among compared pairs.
- First verified preview (commit `73d6b61`): cities 12.22% average; practices 14.08% average.
- A further practice-area directory simplification was committed after the verified preview; final overlap is **not measured** and cannot be claimed to meet 10%.

## Open parity and release gates
- **Blogs are still not complete mirrors.** Six Korean and Spanish localized long-form legal blogs have approximately five to six translated sections each, while their current English master articles have 15–18 headings/sections. They need full, professional, paragraph-by-paragraph translation and accuracy review before claiming website-wide parity. Do not represent them as complete copies.
- The three-language city guides share topic structure and primary agency/legal facts; a line-by-line translation QA by professionals is still outstanding.
- Attorney approval required on new legal explanations, Korean legal nuance and Spanish legal nuance.
- Keep Spanish city and practice URLs `noindex` until language review and deliberate SEO indexing decision.
- Retain accurate official source links and already implemented EN/KO self-canonicals/hreflang.
- Avoid stripping important legal warnings, contact information, navigation, internal links or sourced guidance merely to achieve a duplicate-checker percentage.
- Last preview `dpl_9X1M1BXQ9iKv5ptkoKq2vKtCwVhB` reported READY for commit `73d6b61`.
- Vercel API subsequently returned **402 api-deployments-free-per-day** on a newer commit. Original ignored-preview-build setting was restored. Do not merge solely based on an old successful preview.

## Measurement follow-up
Rebuild the latest PR commit when deployment quota resets. Fetch rendered HTML for 10 city and 8 service URLs plus their Korean/Spanish equivalents; extract only visible main content, remove scripts/metadata, and measure pairwise 5-word Jaccard. Compare with current baseline; inspect user-supplied duplicate tool highlighted matches to determine internal versus external copying. Check mobile layout, schema, canonical/hreflang and conversion CTAs.

**Success criterion:** meaningfully differentiated factual content and faithful translations. An external tool showing exactly <=10% is a *desired diagnostic*, not a guarantee or a search ranking criterion.
