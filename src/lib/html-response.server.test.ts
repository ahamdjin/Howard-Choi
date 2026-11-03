import { test } from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { cleanHtmlResponse } from "./html-response.server.ts";

test("HTML escaping preserves bootstrap route IDs and split multilingual UTF-8", async () => {
  const script = 'globalThis.matches = ["__root__\0", "\0\0", "/ko\0"];';
  const bytes = new TextEncoder().encode(`<p>Español · 한국어</p><script>${script}</script>`);
  const split = bytes.indexOf(0xc3) + 1;
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(bytes.slice(0, split));
      controller.enqueue(bytes.slice(split));
      controller.close();
    },
  });
  const response = cleanHtmlResponse(new Response(body, {
    headers: { "content-type": "text/html", "content-length": "999", etag: "old", "x-test": "retained" },
  }));
  const html = await response.text();
  assert.ok(html.includes("<p>Español · 한국어</p>"));
  assert.ok(!html.includes("\0"));
  const context: { matches?: string[] } = {};
  runInNewContext(html.match(/<script>([\s\S]*)<\/script>/)![1], context);
  assert.equal(JSON.stringify(context.matches), JSON.stringify(["__root__\0", "\0\0", "/ko\0"]));
  assert.equal(response.headers.get("content-length"), null);
  assert.equal(response.headers.get("etag"), null);
  assert.equal(response.headers.get("x-test"), "retained");
});

test("leaves API responses untouched", () => {
  const response = Response.json({ ok: true });
  assert.equal(cleanHtmlResponse(response), response);
});
