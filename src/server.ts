import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";
import type { RequestHandler } from "@tanstack/react-start/server";
import type { Register } from "@tanstack/react-router";
import { cleanHtmlResponse } from "./lib/html-response.server";

const handle = createStartHandler(defaultStreamHandler);
const fetch: RequestHandler<Register> = async (...args) => cleanHtmlResponse(await handle(...args));
export default { fetch };
