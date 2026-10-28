// Literal NUL bytes observed in the current SSR stream are invalid HTML and
// interrupt readable words. Filter bytes without decoding/re-encoding chunks,
// so UTF-8 characters split across chunk boundaries remain intact.
export function cleanHtmlResponse(response: Response): Response {
  if (!response.body || !response.headers.get("content-type")?.includes("text/html")) return response;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("etag");
  const body = response.body.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      controller.enqueue(chunk.includes(0) ? chunk.filter((byte) => byte !== 0) : chunk);
    },
  }));
  return new Response(body, { status: response.status, statusText: response.statusText, headers });
}
