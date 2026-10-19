# Editorial research and review — six existing English injury-law guides

**Prepared:** 2026-10-19  
**Branch:** `editorial/research-six-california-guides-2026-10-19`  
**Status:** proposed substantive edits for Howard Choi's legal accuracy review; do not merge without editorial approval.

## Approach

All six existing English articles were audited against primary government and California Judicial Council sources. The changes replace some overconfident generalizations with fact-specific guidance, provide specific evidence-preservation and insurance steps, explain state/federal rules at useful granularity, and link official references from each article's existing source panel.

The article parser handles JSON frontmatter plus `##` headings and plain paragraphs, **not arbitrary Markdown tables or inline Markdown hyperlinks**. Accordingly these drafts use plain prose and link official sources via `src/pages/BlogDetail.tsx`. No unrelated SEO metadata, homepage design, GSC tracking, chat or contact forms were modified.

| Article | Key factual improvements | Government sources |
|---|---|---|
| What to do after a car accident | Correct medical-care timing absolutes; distinguish scene safety, ten-day SR-1, reporting versus insurance, current $30k/$60k/$15k standard coverage minimums, claims records and releases | DMV SR-1, California DOI auto guide, California Courts personal injury and deadlines |
| California comparative fault | Explain CACI 405 proof of negligence **and** causation; numerical examples; CACI 406 allocation involving multiple actors; how to challenge an insurer's percentage with real evidence | California Judicial Council 2026 CACI 405/406, California Courts |
| California injury deadlines | Two-year injury versus three-year property; government claims generally within six months for bodily injury, with post-rejection deadlines; separate evidence and insurer clocks; fact-based worksheet | California Courts statute-of-limitations and government claims |
| How much is my case worth? | CACI 3903A medical costs, 3903C earnings, 3903D capacity; 2025 CA insurance minimums; substantiation of future needs, separate gross versus net recovery | Judicial Council 2026 CACI, DOI insurance guide |
| Truck accident evidence | What ELD actually logs (not a video), FMCSA driving/break limits subject to exceptions, six-month ELD retention versus different maintenance retention, evidence owner list | FMCSA ELD, HOS, maintenance records |
| Uber/Lyft insurance | CPUC Period 1 $50k/$100k/$30k plus excess; Periods 2–3 primary $1M; Period 3 UM/UIM $1M; timeline, driver-versus-passenger perspective, limits versus recovery | CPUC insurance requirements, California DOI, California Courts |

### Official research links

- [California DMV — SR-1](https://www.dmv.ca.gov/portal/dmv-virtual-office/accident-reporting/)
- [California Department of Insurance — Automobile Insurance Guide](https://www.insurance.ca.gov/01-consumers/105-type/95-guides/01-auto/auto101.cfm)
- [California Courts — Statutes of limitations](https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations)
- [California Courts — Government claims](https://selfhelp.courts.ca.gov/civil-lawsuit/government-claim)
- [Judicial Council — 2026 Civil Jury Instructions (CACI)](https://courts.ca.gov/system/files/file/judicial_council_of_california_civil_jury_instructions_2026.pdf)
- [FMCSA — ELD functions](https://www.fmcsa.dot.gov/hours-service/elds/eld-functions-faqs)
- [FMCSA — Retaining ELD records](https://www.fmcsa.dot.gov/hours-service/elds/how-long-must-motor-carrier-retain-electronic-logging-device-eld-record-duty)
- [FMCSA — Hours of service](https://www.fmcsa.dot.gov/regulations/hours-service/summary-hours-service-regulations)
- [FMCSA — Maintenance record rules](https://csa.fmcsa.dot.gov/SafetyPlanner/MyFiles/SubSections.aspx?ch=22&eta=118133&sec=65&sub=147)
- [CPUC — TNC insurance requirements](https://www.cpuc.ca.gov/regulatory-services/licensing/transportation-licensing-and-analysis-branch/transportation-network-companies/tnc-insurance-requirements)

## Publication and verification gates

- [ ] Howard Choi checks all legal statements for current law and firm suitability, including limitations, government claims, rideshare coverage, comparative fault and the effects of releases.
- [ ] Independently confirm linked agency pages continue to resolve and accurately support the adjacent factual claim.
- [ ] Read each article at phone and desktop widths: natural paragraph flow, no giant opening/quote text, source links visible, typography accessible.
- [ ] Check preview build and articles: all HTTP 200, canonical, titles, dateModified 2026-10-19, normal SEO indexability, sitemap's lastmod updated.
- [ ] Verify no substantive content accidentally appears at untranslatable `/ko/blogs/<slug>` or `/es/blogs/<slug>`.
- [ ] Preserve original publication dates; treat 2026-10-19 as edited date, **not** date first published.
- [ ] Editorial review notes are not published as body copy.
- [ ] Do not automatically publish the three other unrelated English drafts (bicycle, TBI, uninsured driver).
