import { test } from "node:test";
import assert from "node:assert/strict";
import { legacyRouteRedirect } from "./legacy-route-redirect.ts";

test("historical route IDs permanently redirect to their real pages", () => {
  const response = legacyRouteRedirect(new Request("https://example.com/ko_/attorney/?source=google"));
  assert.equal(response?.status, 308);
  assert.equal(response.headers.get("location"), "/ko/attorney?source=google");
  const head = legacyRouteRedirect(new Request("https://example.com/about_/faqs", { method: "HEAD" }));
  assert.equal(head?.headers.get("location"), "/faqs");
});

test("valid pages, unknown routes, templates and submissions are not redirected", () => {
  for (const path of ["/ko/attorney", "/practice-areas_/$slug", "/practice-areas_/%24slug", "/ko_/unknown"]) {
    assert.equal(legacyRouteRedirect(new Request("https://example.com" + path)), undefined);
  }
  assert.equal(legacyRouteRedirect(new Request("https://example.com/ko_/attorney", { method: "POST" })), undefined);
});

test("the retired FAQ entry redirects directly to the full library", () => {
  for (const path of ["/about/faqs", "/about/faqs/"]) {
    const response = legacyRouteRedirect(new Request("https://example.com" + path + "?from=fees"));
    assert.equal(response?.status, 308);
    assert.equal(response.headers.get("location"), "/faqs?from=fees");
  }
});
