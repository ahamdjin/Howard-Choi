# First three blog drafts: publication handoff

The OWI/DUI, Cali Lean/Carolina Squat and California window-tint articles remain unpublished. Their existing draft-to-draft links become usable when this batch is published together.

The adjacent `incoming-links.patch` contains three incoming blog links, three service-page guide entries and matching Spanish/Korean freshness updates for the affected truck article. It has been tested in an isolated preview; it is intentionally not applied to public source while the target articles are unpublished. This is a zero-context patch. Check with `git apply --unidiff-zero --check docs/maintainers/first-three-blog-publication/incoming-links.patch` and apply using `git apply --unidiff-zero` only at publication, then rerun content parity and the build.

H1s and meta descriptions match the scraped source. Meta titles match except the removed DK Law suffix on Cali Lean. The original Cali Lean description says “banned in 8 states”; verify or obtain editorial approval to adjust that claim before publication, because the revised body does not establish a verified eight-state count. The remaining state-by-state DUI penalty summaries also need current legal review. These drafts are not attorney-approved.

Isolated preview validation passed: 22 outgoing contextual links and six incoming connections. The main checkout keeps `published: false`; publication requires a separate instruction. The remaining three new drafts and unrelated files are outside this commit.
