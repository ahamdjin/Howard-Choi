import type { SiteLocale } from "@/data/injurySite";

// Existing GTM name retained for compatibility: this measures browser submission,
// not confirmed HighLevel receipt or workflow completion. External Tracking owns
// CRM delivery; this helper never sends contact or case data.
export async function trackExternalFormSubmission(locale: SiteLocale, formId = "website_inquiry") {
  const analytics = window as Window & { dataLayer?: Record<string, unknown>[] };
  analytics.dataLayer = analytics.dataLayer || [];
  const captureGrace = new Promise<void>((resolve) => globalThis.setTimeout(resolve, 1600));
  const analyticsReady = new Promise<void>((resolve) => {
    const timeout = globalThis.setTimeout(resolve, 1800);
    analytics.dataLayer!.push({
      event: "lead_submission_success", form_id: formId, form_language: locale,
      eventTimeout: 1500,
      eventCallback: () => { globalThis.clearTimeout(timeout); resolve(); },
    });
  });
  await Promise.all([captureGrace, analyticsReady]);
}
