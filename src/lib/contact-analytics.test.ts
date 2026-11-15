import { test } from "node:test";
import assert from "node:assert/strict";
import { contactAnalyticsEvent, queueContactAnalytics, GA4_DESTINATION } from "./contact-analytics.ts";
const targets = { mapsHref: "https://www.google.com/maps/place/Office/data=business", gbpHref: "https://share.google/business", emailHref: "mailto:case@example.com" };
const page = "https://example.com/es/contact?email=private@example.com&injury=private#private";
test("tracks only known destinations and strips personal query, fragment and email body", () => {
  const event = contactAnalyticsEvent("mailto:case@example.com?subject=private&body=private", page, targets);
  assert.deepEqual(event, { name: "email_click", parameters: { contact_method: "email", page_path: "/es/contact", site_language: "es" } });
  assert.equal(JSON.stringify(event).includes("private"), false);
  assert.equal(contactAnalyticsEvent(targets.mapsHref, page, targets)?.name, "directions_click");
  assert.equal(contactAnalyticsEvent(targets.gbpHref, page, targets)?.name, "business_profile_click");
  assert.equal(contactAnalyticsEvent("/resources/buena-park-crash-checklist.txt", page, targets)?.name, "crash_checklist_open");
  for (const href of ["tel:+17148448494", "/contact", "https://elsewhere.com/resources/buena-park-crash-checklist.txt", "mailto:other@example.com", "https://www.google.com/maps/place/AnotherOffice"]) assert.equal(contactAnalyticsEvent(href, page, targets), null);
});
test("queues exactly one Google tag event without a second config or network request", () => {
  const queue = { dataLayer: [] as unknown[] };
  const event = contactAnalyticsEvent(targets.mapsHref, page, targets)!;
  queueContactAnalytics(queue, event);
  assert.equal(queue.dataLayer.length, 1);
  assert.deepEqual(Array.from(queue.dataLayer[0] as IArguments), ["event", "directions_click", { contact_method: "maps", page_path: "/es/contact", site_language: "es", send_to: GA4_DESTINATION }]);
});

test("identifies blog-to-contact intent without treating it as a submitted lead", () => {
  const event = contactAnalyticsEvent("/es/contact?message=private", "https://example.com/es/blogs/crash-records?email=private#private", targets);
  assert.deepEqual(event, { name: "blog_consultation_click", parameters: { contact_method: "consultation", page_path: "/es/blogs/crash-records", site_language: "es" } });
  assert.equal(JSON.stringify(event).includes("private"), false);
  for (const path of ["/", "/blogs", "/blogs/guides", "/practice-areas/car-accidents"]) {
    assert.equal(contactAnalyticsEvent("/contact", "https://example.com" + path, targets), null);
  }
  assert.equal(contactAnalyticsEvent("https://elsewhere.com/contact", "https://example.com/blogs/crash-records", targets), null);
});
