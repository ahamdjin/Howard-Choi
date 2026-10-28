# Enquiry delivery and content parity — local review

Branch: improve/lead-tracking-content-parity-2026-10-28. Based on main fcaf150.

## Enquiry capture: HighLevel External Tracking

Per user direction, the additional inbound webhook route, server helper and environment requirement were removed. Existing external-tracking.js and its tracking ID are restored. HighLevel handles contact creation/update, captured submissions and workflow enrollment; no second delivery path is installed.

Official documentation: https://help.gohighlevel.com/support/solutions/articles/155000006092 and https://help.gohighlevel.com/support/solutions/articles/155000009476-field-mapping-and-iframe-form-tracking-in-external-tracking . External Tracking supports standard DOM forms with named inputs and email, and requires domain-level Form submissions plus the form Track switch. Review subject/message mapping and calculator summary capture in the existing HighLevel setup: current documentation says hidden fields are excluded, so calculator hidden subject/summary must not be assumed captured. This has not been verified by submitting a form.

The submit handler preserves event propagation and allows 1.6 seconds before navigation, matching the existing approach. That grace period is not a delivery acknowledgement. No forms or live CRM writes were performed for this change.

## GTM contract

Custom event trigger: lead_submission_success.
GA4 event: generate_lead. Measurement ID: G-RSB7JTQG1Z.
Data-layer parameters: form_id (website_inquiry or case_value_review), form_language (en, ko, es). No contact information, message, calculator amount or medical detail belongs in analytics. Mark generate_lead as a GA4 key event.

Release test: preview each locale, submit one authorized synthetic enquiry, confirm one actual HighLevel record with its enquiry text, one success data-layer event, correct localized thank-you and GA4 DebugView event. Browser validation must reject invalid submissions. The existing event name measures client submission only; it cannot detect HighLevel network failures. Phone-click testing must not be represented as completed-call measurement.

## Content policy

Keep existing URLs and full English source content. The homepage explains the first conversation; eight service pages add distinct investigation questions; eight published blogs add topic-specific practical sections. No new keyword landing pages, invented outcomes or attorney-experience claims are added.

English remains the factual master. Expanded translations are stored in src/data/blog-translations, retaining section order, paragraph counts, citations and explicit numbers. `npm run content:check` verifies publication coverage, freshness hashes, structural coverage and source URLs/numbers. It does not prove legal or linguistic equivalence. Translation drafts and new legal copy require attorney/qualified language review before publication. Existing Spanish indexing gates remain in place. No attorney review date is fabricated.

The local Qwen model generated translation drafts without a paid API. Review against the English masters remains necessary; a structure check must never be called professional translation approval.

## Maintaining translations

Run `python3 scripts/translate-blogs-local.py` explicitly with the installed local Ollama model available, then review the changed translations and run `npm run content:check`. Matching hashes skip unchanged masters. This is draft generation, not an approval step. English source edits invalidate the translation's source hash even when section counts happen to stay equal.

The shared homepage now supplies all three language routes, avoiding a separate shorter Korean page. New Korean article URLs for the previously untranslated uninsured-driver and settlement-timing guides remain noindex and outside sitemap/hreflang until review; Spanish indexing restrictions are preserved. The homepage review carousel now uses the same approval/reference requirement as ClientProof.

No further form submissions or delivery tests may be run until the user confirms their connection is ready (user instruction during this task).

## Local verification

Production build and modified-source lint passed. All 16 localized articles returned HTTP 200 in the local preview, with all 724 expected paragraphs present. The build also verified 121 prerendered HTML files contain no NUL bytes; a server response filter removes stray NUL bytes from HTML streams while preserving UTF-8 byte boundaries. HTML-filter unit tests passed. Client analytics tests prohibit network requests. No live external-tracking delivery has been verified.

The full TypeScript check still reports existing NavLinkProps compatibility and router strictNullChecks configuration errors. Build success does not resolve those wider type-check issues.

The eight existing English article bodies were preserved, with 1,136 words of additional topic-specific guidance. Changes remain local and require content/legal-language review before release.

## Published GTM check before GitHub push

On 2026-10-28, the publicly served GTM-5V5GSC7B container included the Google tag for G-RSB7JTQG1Z and phone_click, but did not include a lead_submission_success predicate or generate_lead event tag in its resource configuration. The repository emits the event from both form types, but GA4 delivery requires publishing the pending GTM configuration.

GTM setup: Custom Event trigger `lead_submission_success`; GA4 Event tag using G-RSB7JTQG1Z with event name `generate_lead`; optional Data Layer Variables `form_id` and `form_language` as matching event parameters. Publish the container. Do not add a second generic form trigger for the same GA4 lead event. No actual form submission or GA4 lead was generated for this verification.
