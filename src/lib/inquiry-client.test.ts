import { test } from "node:test";
import assert from "node:assert/strict";
import { trackExternalFormSubmission } from "./inquiry-client.ts";

test("external capture analytics sends no contact data and makes no delivery request", async () => {
  const oldFetch = globalThis.fetch;
  const oldWindow = globalThis.window;
  const events: Record<string, unknown>[] = [];
  globalThis.window = { dataLayer: events } as unknown as Window & typeof globalThis;
  globalThis.fetch = async () => { throw new Error("Network forbidden in this test"); };
  try {
    await trackExternalFormSubmission("es", "case_value_review");
    assert.equal(events.length, 1);
    const { eventCallback, ...fields } = events[0];
    assert.equal(typeof eventCallback, "function");
    assert.deepEqual(fields, { event: "lead_submission_success", form_id: "case_value_review", form_language: "es", eventTimeout: 1500 });
  } finally {
    globalThis.fetch = oldFetch;
    globalThis.window = oldWindow;
  }
});
