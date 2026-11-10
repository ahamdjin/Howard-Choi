import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const origin = process.env.SMOKE_ORIGIN || "http://127.0.0.1:3000";
const browserBinary = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((candidate) => candidate && existsSync(candidate));

if (!browserBinary) {
  console.error("Chrome is required for the real-browser hydration test.");
  process.exit(1);
}

const profile = mkdtempSync(path.join(tmpdir(), "injury-home-smoke-"));
const chrome = spawn(browserBinary, [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--no-first-run",
  "--no-default-browser-check",
  "--remote-allow-origins=*",
  "--remote-debugging-address=127.0.0.1",
  "--remote-debugging-port=0",
  `--user-data-dir=${profile}`,
  "about:blank",
], { stdio: ["ignore", "ignore", "pipe"] });
// A fresh port avoids runner collisions. Retain startup diagnostics instead of
// turning every browser-launch problem into an opaque missing-page error.
let chromeStartupLog = "";
let chromeSpawnError;
chrome.stderr.on("data", chunk => { chromeStartupLog = (chromeStartupLog + chunk.toString()).slice(-8000); });
chrome.on("error", error => { chromeSpawnError = error; });

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let socket;
let nextId = 0;
const pending = new Map();
let activePath = "";
const exceptions = [];
const errors = [];
const consoleCalls = [];

const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++nextId;
  const timeout = setTimeout(() => {
    pending.delete(id);
    reject(new Error(`DevTools command timed out: ${method}`));
  }, 12000);
  pending.set(id, { resolve, reject, timeout });
  socket.send(JSON.stringify({ id, method, params }));
});

try {
  let target;
  let lastStartupError = "";
  for (let attempt = 0; attempt < 150; attempt++) {
    if (chromeSpawnError) throw chromeSpawnError;
    if (chrome.exitCode !== null) throw new Error("Chrome exited before opening DevTools: " + chromeStartupLog);
    try {
      const debugPort = Number(readFileSync(path.join(profile, "DevToolsActivePort"), "utf8").split("\n")[0]);
      if (!Number.isInteger(debugPort) || debugPort < 1) throw new Error("Chrome has not written a debugging port yet.");
      const response = await fetch(`http://127.0.0.1:${debugPort}/json/list`, { signal: AbortSignal.timeout(1000) });
      if (response.ok) {
        const pages = await response.json();
        target = pages.find((item) => item.type === "page");
      }
    } catch (error) { lastStartupError = String(error); /* Chrome is starting. */ }
    if (target) break;
    await pause(200);
  }
  if (!target) throw new Error(`Chrome DevTools page was not available. Last probe: ${lastStartupError}. Browser log: ${chromeStartupLog}`);

  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  socket.addEventListener("message", (event) => {
    let message;
    try { message = JSON.parse(String(event.data)); }
    catch { return; }
    if (typeof message.id === "number") {
      const request = pending.get(message.id);
      if (!request) return;
      clearTimeout(request.timeout);
      pending.delete(message.id);
      if (message.error) request.reject(new Error(JSON.stringify(message.error)));
      else request.resolve(message.result);
    } else if (message.method === "Runtime.exceptionThrown") {
      const detail = message.params.exceptionDetails;
      exceptions.push({ path: activePath, text: detail.exception?.description || detail.text || "" });
    } else if (message.method === "Runtime.consoleAPICalled" && ["error", "warning", "warn"].includes(message.params.type)) {
      consoleCalls.push({ path: activePath, text: message.params.args.map((arg) => arg.value || arg.description || "").join(" ").slice(0, 2500) });
    } else if (message.method === "Log.entryAdded" && message.params.entry.level === "error") {
      errors.push({ path: activePath, text: message.params.entry.text });
    }
  });
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Log.enable");

  const checks = [
    { path: "/", expected: /Buena Park Personal Injury(?: & Car Accident)? Lawyer/i },
    { path: "/ko", expected: /변호사/ },
    { path: "/es", expected: /Abogado/i },
    { path: "/practice-areas/personal-injury", expected: /^(?:Buena Park Personal Injury Lawyer|We Win Personal Injury Cases\.)$/i },
    { path: "/practice-areas/car-accidents", expected: /^(?:Buena Park Car Accident Lawyer|We Win Car Accident Cases\.)$/i },
    { path: "/locations/buena-park", expected: /Buena Park/i },
    { path: "/locations/anaheim", expected: /^Anaheim Injury and Accident Lawyer$/i },
    { path: "/about/our-difference", expected: /Our Difference/i },
    { path: "/about/what-to-expect", expected: /What to Expect From Your Injury Claim/i },
    { path: "/blogs", expected: /./ },
    { path: "/practice-areas/personal-injury", expected: /^(?:Buena Park Personal Injury Lawyer|We Win Personal Injury Cases\.)$/i, mobile: true },
    { path: "/", expected: /Buena Park Personal Injury(?: & Car Accident)? Lawyer/i, mobile: true },
    { path: "/ko", expected: /변호사/, mobile: true },
    { path: "/es", expected: /Abogado/i, mobile: true },
  ];
  for (const check of checks) {
    activePath = check.path + (check.mobile ? " (mobile)" : "");
    await send("Emulation.setDeviceMetricsOverride", {
      width: check.mobile ? 390 : 1440,
      height: check.mobile ? 844 : 1000,
      deviceScaleFactor: 1,
      mobile: Boolean(check.mobile),
    });
    const navigation = await send("Page.navigate", { url: origin + check.path });
    if (navigation.errorText) throw new Error(`Navigation ${check.path}: ${navigation.errorText}`);
    console.log("Chrome navigate:", check.path, JSON.stringify(navigation));
    // Catch both initial hydration and deferred GoHighLevel/GTM/chat behavior.
    await pause(6500);
    const result = await send("Runtime.evaluate", {
      expression: `(() => ({
        url: location.href,
        title: document.title,
        htmlExists: Boolean(document.documentElement),
        htmlStart: document.documentElement?.outerHTML?.slice(0, 350) || "",
        h1: document.querySelector("h1")?.textContent?.trim() || "",
        h1Count: document.querySelectorAll("h1").length,
        malformedLinks: [...document.querySelectorAll("a[href]")].map(a => a.getAttribute("href")).filter(href => /_[/]|[$]slug/.test(href || "")),
        bodyExists: Boolean(document.body),
        headExists: Boolean(document.head),
        bodyText: document.body?.innerText?.slice(0, 18000) || "",
        readyState: document.readyState
      }))()`,
      returnByValue: true,
    });
    const state = result.result?.value;
    if (!state?.bodyExists || !state.headExists || !state.h1 || state.h1Count !== 1 || state.malformedLinks.length) {
      throw new Error(`Homepage DOM missing on ${check.path}: ${JSON.stringify(state)}; exceptions=${JSON.stringify(exceptions.slice(-8)).slice(0, 4500)}; errors=${JSON.stringify(errors.slice(-8)).slice(0, 1800)}; console=${JSON.stringify(consoleCalls.slice(-12)).slice(0, 6500)}`);
    }
    if (!check.expected.test(state.h1)) {
      throw new Error(`Unexpected H1 on ${check.path}: ${state.h1}`);
    }
    if (/Cannot read properties of null|Application Error|Unexpected Application Error/i.test(state.bodyText)) {
      throw new Error(`Browser-rendered error page on ${check.path}: ${state.bodyText.slice(0, 450)}`);
    }
    console.log(`Browser OK ${check.path}: ${state.h1}`);
  }

  // Exercise navigation after hydration without submitting any enquiry.
  await send("Runtime.evaluate", {
    expression: `document.querySelector('a[href="/es/about"]')?.click()`,
  });
  await pause(3000);
  const navigationState = await send("Runtime.evaluate", {
    expression: `({ path: location.pathname, heading: document.querySelector('h1')?.textContent, width: document.documentElement.scrollWidth, viewport: window.innerWidth })`,
    returnByValue: true,
  });
  const finalPage = navigationState.result?.value;
  if (finalPage?.path !== "/es/about" || !finalPage.heading) {
    throw new Error("Client navigation failed: " + JSON.stringify(finalPage));
  }
  if (finalPage.width > finalPage.viewport + 1) throw new Error("Mobile horizontal overflow: " + JSON.stringify(finalPage));
  const hydrationErrors = [...exceptions, ...consoleCalls].filter((event) => /hydration|hydrating|Minified React error #(418|423|425)/i.test(event.text));
  if (hydrationErrors.length) throw new Error("Browser hydration errors: " + JSON.stringify(hydrationErrors));
  const appendErrors = [...exceptions, ...errors].filter((event) => /appendChild|Cannot read properties of null/i.test(event.text));
  if (appendErrors.length) {
    throw new Error("Browser appendChild exceptions: " + JSON.stringify(appendErrors).slice(0, 2800));
  }
  console.log(`Browser hydration passed for desktop/mobile homepages, inner pages and client navigation (${exceptions.length} uncaught exceptions, ${errors.length} browser error logs; no appendChild failures).`);
} finally {
  for (const request of pending.values()) {
    clearTimeout(request.timeout);
    request.reject(new Error("Browser is closing."));
  }
  pending.clear();
  socket?.close();
  chrome.kill("SIGTERM");
  // Chrome may still be flushing its profile files for a moment after SIGTERM.
  // Cleanup must never mask a real browser error from the smoke test.
  await pause(350);
  try { rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); }
  catch (error) { console.warn("Chrome profile cleanup warning:", error.message); }
}
