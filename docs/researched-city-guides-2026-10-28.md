# City-page duplicate-content remediation — research and editorial decisions
Research and implementation date: 2026-10-28
Repository branch: `seo/city-guides-research-rewrite-2026-10-28`
Scope: 10 city landing pages × English, Korean and Spanish; 8 Korean practice-area pages.

## Goals and limits
- Fix *useful content duplication*, not simply increase text length or add city names.
- Prioritize actionable distinctions between reporting agencies, evidence collection, claim type, civil venue and statutory deadlines.
- Avoid fabricated localized case results, unverifiable camera availability, keyword-stuffed street names, unconfirmed specialisation, or assertions that a courthouse handles every case from its city.
- Treat the location and incident examples as conditional illustrations, **not** law-firm case histories or legal advice.
- Keep existing self-canonicals, reciprocal English/Korean hreflang, and Spanish noindex settings; do not consolidate city URLs.
- Keep eight practice-area services accessible through the directory, but feature only four evidence-relevant links on each city page.

## Verified primary research by city

| City | Topic established in official sources | Official source |
| --- | --- | --- |
| Buena Park | Police collision-report release restrictions (Vehicle Code §20012), CHP holds only crashes it investigated | https://public.powerdms.com/BUENAPPD/documents/333411 ; https://www.chp.ca.gov/traffic/request-a-crash-report/ |
| Anaheim | Police traffic-report search applies to certain reports and requires number; separate Records Bureau requests | https://pd.anaheim.net/257/Traffic-Accident-Reports ; https://pd.anaheim.net/173/Records |
| Fullerton | Online traffic crash form for eligible *non-injury* collisions; injury collisions require different contact; North Justice Center has specific case assignment | https://www.cityoffullerton.com/government/departments/police/police-services/traffic-collision-report ; https://www.occourts.org/location/north-justice-center |
| Garden Grove | Collision reports can be restricted and eligible requesters are asked to allow **at least 21 days** for review | https://ggcity.org/police/rar |
| Cypress | Official Release of Records Application, eligible requesters and identity requirement | https://www.cypressca.org/departments/police/fees-and-services/records-fee-schedule ; https://www.cypressca.org/departments/police/forms-documents |
| La Habra | Separate Records Bureau and Traffic Bureau contacts and information | https://www.lahabraca.gov/398/Contact ; https://www.lahabraca.gov/801/Fee-Schedule-for-Records-Services |
| La Mirada | Norwalk Sheriff's Station covers La Mirada; city directs report copy requests to Norwalk station; LA Superior Court uses specific filing locator | https://builder1.revize.com/revize/lamiradaca/departments/public_safety/faqs.php ; https://lasd.org/norwalk/ ; https://www.lacourt.org/division/civil/CI0014.aspx |
| Cerritos | Sheriff's Cerritos Station serves city; CHP runs a separate freeway report process | https://lasd.org/cerritos/ ; https://lasd.org/records-faq/ ; https://www.chp.ca.gov/traffic/request-a-crash-report/ |
| Norwalk | Sheriff's Norwalk Station and LASD Records and Identification Bureau; civil court locator is not the same as nearest courthouse | https://lasd.org/norwalk/ ; https://lasd.org/records-faq/ ; https://www.lacourt.org/division/civil/CI0014.aspx |
| Whittier | Police Traffic Bureau covers Whittier and Santa Fe Springs; unincorporated Whittier areas can use LASD; official Records Bureau | https://www.whittierpd.org/services/patrol-operations/traffic-bureau ; https://www.whittierpd.org/services/services-division/police-records ; https://lasd.org/norwalk/ |

Other controlling primary sources:
- California Courts, personal injury, limitations and venue: https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury and https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations
- California Courts, government claims: https://selfhelp.courts.ca.gov/civil-lawsuit/government-claim
- California OTS rankings *and importantly their units*: https://www.ots.ca.gov/media-and-research/crash-rankings/
- FMCSA commercial logging requirements: https://www.fmcsa.dot.gov/hours-service/elds/general-information-about-eld-rule
- CPUC transportation network company insurance periods: https://www.cpuc.ca.gov/tncinfo/
- Judicial Council CACI premises-liability instructions: https://courts.ca.gov/system/files/file/judicial_council_of_california_civil_jury_instructions_2026.pdf

## What was changed
1. `locationGuidesEn.ts`, `locationGuidesKo.ts`, `locationGuidesEs.ts`: each of 10 cities gets original, locally meaningful records, evidence and deadlines paragraphs, exactly three specialized FAQs and original SEO snippets. Sources are displayed directly in every city's records section, including translations.
2. `injurySite.ts`: replace 40 original English/Korean city-description and intro fields, removing unsupported case-history generalizations and inaccurate assumptions about court assignment.
3. `esLocationContent.ts`: replace 20 Spanish city-description and intro fields.
4. `locationFocus.ts`: a different group of four practice links, four adjacent/related service areas and a genuinely localized claims-intent introduction per city. The full practice directory is still linked.
5. `EditorialLocationPages.tsx`: delete the shared, city-name-swapped FAQ blocks and generic evidence/deadline/legal advice, remove duplicated all-practice-area grids and replace with source-linked, per-city content.
6. Each location route in EN/KO/ES reads city-specific title and meta description; English and Korean canonical/hreflang are unchanged and Spanish stays noindex.
7. `koPracticeSpecific.ts` + PracticePages: eight distinct Korean damages and timing discussions instead of one repeated Korean paragraph and damages list.

## Statistical cautions
- The city data currently contains OTS 2023 values for eight cities, but **2022** for Cypress and Whittier. We did **not** invent or substitute newer figures without fully checking the official tables. Display the actual source year, retain direct OTS links and upgrade only if all units, year and categories can be verified.
- OTS 'victims killed and injured' and 'fatal/injury collisions' are **not the same unit**; do not divide one by the other.
- OTS city statistics indicate population-scale city safety context, not case likelihood or expected compensation.

## Approval and verification
- Have Howard Choi or responsible California counsel review content that describes government claim deadlines, civil venue, damages, rideshare insurance and wrongful-death eligibility before making any claim-specific legal representations.
- Have an experienced Korean and Spanish legal-language reviewer proofread the new translations.
- Validate Vercel build + prerender; inspect 10 EN, 10 KO and 10 ES routes and verify no duplicated H1, metadata or FAQ blocks, plus all official source link destinations.
- Confirm Google-selected canonical and search query overlap in Search Console after publishing. **No ranking lift is guaranteed.**
- Source-content uniqueness tests are not a substitute for a rendered HTML crawl or Search Console.
