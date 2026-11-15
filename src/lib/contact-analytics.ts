/** Additional contact interactions. Phone and lead events already belong to GTM.
 * Reuse its Google tag queue; never load/configure another tag or send form data.
 */
export const GA4_DESTINATION = "G-RSB7JTQG1Z";
export type ContactDestinations = { mapsHref: string; gbpHref: string; emailHref: string };
export type ContactAnalyticsEvent = {
  name: "directions_click" | "email_click" | "business_profile_click" | "crash_checklist_open" | "blog_consultation_click";
  parameters: { contact_method: string; page_path: string; site_language: "en" | "es" | "ko" };
};
type AnalyticsQueue = { dataLayer?: unknown[] };

export function contactAnalyticsEvent(href: string, locationHref: string, targets: ContactDestinations): ContactAnalyticsEvent | null {
  const location = new URL(locationHref);
  const destination = new URL(href, location.origin);
  const safe = (url: URL) => `${url.protocol}//${url.host}${url.pathname}`;
  const article = /^\/(?:(?:es|ko)\/)?blogs\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/.exec(location.pathname);
  let name: ContactAnalyticsEvent["name"];
  let method: string;
  if (destination.protocol === "mailto:" && destination.pathname.toLowerCase() === new URL(targets.emailHref).pathname.toLowerCase()) {
    name = "email_click"; method = "email";
  } else if (safe(destination) === safe(new URL(targets.mapsHref))) {
    name = "directions_click"; method = "maps";
  } else if (safe(destination) === safe(new URL(targets.gbpHref))) {
    name = "business_profile_click"; method = "google_profile";
  } else if (destination.origin === location.origin && destination.pathname === "/resources/buena-park-crash-checklist.txt") {
    name = "crash_checklist_open"; method = "checklist";
  } else if (article && article[1] !== "guides" && destination.origin === location.origin && /^\/(?:(?:es|ko)\/)?contact\/?$/.test(destination.pathname)) {
    name = "blog_consultation_click"; method = "consultation";
  } else return null;
  const path = location.pathname;
  const language = /^\/(es|ko)(?:\/|$)/.exec(path)?.[1];
  return { name, parameters: { contact_method: method, page_path: path, site_language: language === "es" || language === "ko" ? language : "en" } };
}

export function queueContactAnalytics(queue: AnalyticsQueue, event: ContactAnalyticsEvent) {
  const layer = queue.dataLayer ||= [];
  // Google tag API commands use an arguments object, not a GTM custom-event
  // object. This reaches the Google tag already installed by GTM, including
  // when a click queues before that tag finishes loading.
  function command(..._args: unknown[]) {
    // Google tag's documented queue protocol requires an arguments object.
    // eslint-disable-next-line prefer-rest-params
    layer.push(arguments);
  }
  command("event", event.name, { ...event.parameters, send_to: GA4_DESTINATION });
}

export function installContactAnalytics(doc: Document, browser: Window & AnalyticsQueue, targets: ContactDestinations) {
  const click = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0) return;
    const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!(anchor instanceof HTMLAnchorElement)) return;
    const action = contactAnalyticsEvent(anchor.href, browser.location.href, targets);
    if (action) queueContactAnalytics(browser, action);
  };
  doc.addEventListener("click", click);
  return () => doc.removeEventListener("click", click);
}
