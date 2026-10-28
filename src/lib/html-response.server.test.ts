import { test } from "node:test";
import assert from "node:assert/strict";
import { cleanHtmlResponse } from "./html-response.server.ts";

test("removes only NULs and preserves UTF-8 split across streamed chunks", async () => {
  const bytes = new TextEncoder().encode("<p>Español · 한국어</p>");
  const split = bytes.indexOf(0xc3) + 1;
  const body = new ReadableStream({ start(controller) {
    controller.enqueue(bytes.slice(0, split));
    controller.enqueue(new Uint8Array([0]));
    controller.enqueue(bytes.slice(split)); controller.close();
  } });
  const response = cleanHtmlResponse(new Response(body, { headers: { "content-type": "text/html", "content-length": "999", "x-test": "retained" } }));
  assert.equal(await response.text(), "<p>Español · 한국어</p>");
  assert.equal(response.headers.get("content-length"), null);
  assert.equal(response.headers.get("x-test"), "retained");
});
test("leaves API responses untouched", () => {
  const response = Response.json({ ok: true });
  assert.equal(cleanHtmlResponse(response), response);
});
