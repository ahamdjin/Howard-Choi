# Research-led page-depth expansion — 2026-10-28

## Editorial objective
Improve **usefulness of the main content**, not page length or a plagiarism-checker percentage. English is the factual master; Korean and Spanish guidance carry the same legal proposition, exceptions, and sources. No claims about hypothetical lawsuits, unverified client stories, new awards, or unapproved case outcomes are introduced.

## Competitor benchmark — methods, not copied language
These are publicly accessible Orange County/nearby law-firm websites used to identify common visitor questions and content architecture, **not independently verified rankings** or proof they are #1 for any keyword.

| Firm/page | Useful practice examined | Implementation decision |
| --- | --- | --- |
| Easton & Easton, Orange County (https://www.eastonlawoffices.com/) | Clear injury-type segmentation, verifiable firm story, case result context, original safety research and prominent review/attorney pathways | Keep eight distinct practice types and city pathways; emphasize original, source-backed explanation rather than borrowing their success claims |
| Easton & Easton firm information (https://www.eastonlawoffices.com/the-firm/) | Detailed attorney identity, service positioning and historical evidence | Link Howard Choi's live California State Bar record; don't copy another firm's awards or imply unverified experience |
| Case Barnett Law (https://www.casebarnettlaw.com/practice-areas) | Practical risks by accident type, injuries, liability and evidence; reader-oriented service menu | Add substantive claim-specific evidence and responsibility questions to all eight services |
| DK Law Buena Park (https://dklaw.com/locations/ca/buena-park/) | Local office context, relevant case types, documented results and concise process questions | Add detailed agency/report pathways to each city; do not copy DK Law's client counts, photographs, awards or recovery claims |
| Kyle Scott Law Buena Park (https://kjslaw.com/buena-park-personal-injury-attorney) | Identifiable local road context and clear expectations around the consultation | Maintain service-area intent without pretending to have offices or case histories in all ten cities |
| Avant Law (https://avantlaw.com/buena-park-car-accident-lawyer/) | Attorney identity, case examples and explanation of common accident questions | Prioritize independently verifiable attorney credentials and explain that outcome numbers require proof |

## Controlling sources (read before changing legally sensitive statements)
- California DMV, **SR-1 traffic accident reporting**: https://www.dmv.ca.gov/portal/dmv-virtual-office/accident-reporting/ . A qualifying crash is generally reported within **10 days** if someone is injured, killed, or property damage is **over $1,000**. This report is separate from police, CHP or insurer communications.
- California Courts, **personal injury**: https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury . Identify real defendants, venue, medical and wage evidence, and liability.
- California Courts, **limitations**: https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations . Generally two years for personal injury; real exceptions and accrual questions require case-specific review.
- California Courts, **government claims**: https://selfhelp.courts.ca.gov/civil-lawsuit/government-claim . Potentially responsible public entities can trigger earlier administrative claims, commonly six months, with additional post-rejection deadlines.
- FMCSA, **ELD retention**: https://www.fmcsa.dot.gov/hours-service/elds/how-long-must-motor-carrier-retain-electronic-logging-device-eld-record-duty-0 . Six-month minimum for covered ELD RODS/supporting records; do **not** generalize that rule to every camera or trucking record.
- California DMV, **motorcycle lane sharing**: https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/laws-and-rules-of-the-road-cont1/ . Lane splitting and driver observation, not automatic negligence conclusions.
- CPUC, **TNC insurance**: https://www.cpuc.ca.gov/regulatory-services/licensing/transportation-licensing-and-analysis-branch/transportation-network-companies/tnc-insurance-requirements . Driver-app periods may affect applicable coverage; they do not determine fault.
- California Judicial Council, **civil jury instructions**: https://courts.ca.gov/partners/california-jury-instructions/civil-jury-instructions-resource-center/civil-jury-instructions . CACI 1003 addresses unsafe conditions, notice, repair/protection/warning; comparative fault requires evidence.
- California Legislature, **wrongful death**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=377.60.&lawCode=CCP . Eligible claimants require case-specific assessment.
- California State Bar, **attorney profile**: https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364 . Howard Choi #284364 active at review, admitted October 2 2012; public profile is the primary source and may update. Listing phone differs from the website's intake line; confirm both with the firm.
- California State Bar, **fees and written engagements**: https://www.calbar.ca.gov/public/legal-resources/working-attorney/what-expect-regarding-fees-and-billing . Contingency fee, litigation costs, net and gross amounts and written agreement must be distinguished.
- DHCS, **Medi-Cal lien/recovery**: https://www.dhcs.ca.gov/services/personal-injury-frequently-asked-questions/ . Gross recovery is distinct from deductions and distribution.
- Google Search Central, **helpful content and doorway/scaled-content policies**: https://developers.google.com/search/docs/fundamentals/creating-helpful-content and https://developers.google.com/search/docs/essentials/spam-policies .

## Site-specific coverage and depth enhancements
1. **10 location pages × EN/KO/ES:** existing researched city reporting, OTS statistics and localized FAQs retained; new `cityEvidencePaths.ts` adds two differentiated, conditional scenarios per city (police/CHP/LASD vs private property, school, transit or commercial records), written and translated side by side.
2. **8 practice areas × EN/KO/ES:** four long case-investigation topics per practice already added in PR #39; new `advancedPracticeResearch.ts` adds two primary-source-linked legal/evidence analyses per practice, not a generic shared disclaimer.
3. **Practice-area hub:** distinguishes vehicle negligence, unsafe-property claims, carrier responsibility, injury damages, with California Courts primary source.
4. **Location hub:** helps distinguish municipal police, LASD and CHP report custodians from civil venue.
5. **Homepage:** explains SR-1 reporting and public-entity claim questions instead of an extra generic sales section.
6. **Attorney:** links live State Bar credentials, explains what to verify and prepares specific consultation questions without claiming the attorney personally speaks Spanish.
7. **About:** offers practical written fee/expense and representation-terms guidance sourced to State Bar.
8. **Results:** explains gross vs net, deductions, proof and outcome limits without creating new case results.
9. **Contact EN/KO/ES:** gives initial intake and urgent deadline guidance without asking people to upload sensitive documents publicly.
10. **Blog index EN/KO/ES:** differentiates guides, services and city records; retains the existing substantive English articles.
11. **Case-value calculator EN/KO/ES:** distinguishes educational numerical estimates from medical proof and potential net recovery.
12. **CI:** `.github/workflows/site-build.yml` performs locked dependency installation and Vite production build/prerender on PRs and main; avoids coupling content QA to Vercel's free deployment quota.

## Integrity and remaining validations
- Do not call a competitor 'highest ranking' without measured local SERP rankings; these are benchmarks by editorial approach, not endorsements.
- Do not guarantee a target percentage of repeated text. Similarity checker scores depend on headers, footer, HTML, language, common legal principles and the exact comparison corpus.
- Do not add fictitious case settlements or testimonials to fill the results page. Existing numerical firm claims should be approved and documented independently.
- EN and KO canonical/hreflang and Spanish `noindex` remain unchanged.
- Historical OTS year labels remain actual years, including 2022 values where 2023 had not been independently verified.
- The original six long-form localized blogs are still condensed relative to their 15–18-section English masters; this release does **not** claim full paragraph-level translation parity on those articles. Request professional translation QA before removing any Spanish noindex or claiming the entire site is a mirror.
- New Korean and Spanish legal wording should be checked by proficient legal-language reviewers and Howard Choi before future claims-specific edits.
- Recheck live rendered pages, key links, response codes, title/canonical/hreflang, and conversion actions after merge. GitHub build success does not independently prove Google's indexing or ranking.
