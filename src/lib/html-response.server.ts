// TanStack serializes route-ID separators as literal NULs inside bootstrap
// JavaScript strings. Escape them for HTML without changing the restored IDs.
// Deleting them prevents the client from matching the server-rendered routes.
export function cleanHtmlResponse(response: Response): Response {
  if (!response.body || !response.headers.get("content-type")?.includes("text/html")) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("etag");
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const encodeHtml = (text: string) => encoder.encode(text.replace(/\0/g, "\\u0000"));
  const body = response.body.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      controller.enqueue(encodeHtml(decoder.decode(chunk, { stream: true })));
    },
    flush(controller) {
      const remaining = decoder.decode();
      if (remaining) controller.enqueue(encodeHtml(remaining));
    },
  }));

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
