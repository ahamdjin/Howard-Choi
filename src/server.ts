import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";
import type { RequestHandler } from "@tanstack/react-start/server";
import type { Register } from "@tanstack/react-router";
import { cleanHtmlResponse } from "./lib/html-response.server";
import { legacyRouteRedirect } from "./lib/legacy-route-redirect";

const handle = createStartHandler(defaultStreamHandler);
const fetch: RequestHandler<Register> = async (...args) =>
  legacyRouteRedirect(args[0]) ?? cleanHtmlResponse(await handle(...args));
export default { fetch };
