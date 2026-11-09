// Historical internal route IDs discovered by Google. Redirect only addresses
// with a real equivalent; literal parameter templates must still return 404.
const legacyRoutes = new Map([
  ["/ko_/case-value-calculator", "/ko/case-value-calculator"],
  ["/ko_/attorney", "/ko/attorney"],
  ["/about_/faqs", "/about/faqs"],
  ["/about_/what-to-expect", "/about/what-to-expect"],
  ["/about_/zero-fee-guarantee", "/about/zero-fee-guarantee"],
  ["/about_/our-difference", "/about/our-difference"],
  ["/ko_/blogs", "/ko/blogs"],
  ["/es_/photo-credits", "/es/photo-credits"],
  ["/ko_/photo-credits", "/ko/photo-credits"],
]);

export function legacyRouteRedirect(request: Request): Response | undefined {
  if (request.method !== "GET" && request.method !== "HEAD") return;
  const url = new URL(request.url);
  const target = legacyRoutes.get(url.pathname.replace(/\/$/, ""));
  if (!target) return;
  return new Response(null, {
    status: 308,
    headers: { Location: target + url.search },
  });
}
