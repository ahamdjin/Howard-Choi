import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const origin = process.env.SMOKE_ORIGIN || "http://127.0.0.1:3000";
const browserBinary = [
  process.env.CHROME_PATH,
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
  "--remote-debugging-port=9227",
  `--user-data-dir=${profile}`,
  "about:blank",
], { stdio: "ignore" });

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let socket;
let nextId = 0;
const pending = new Map();
let activePath = "";
const exceptions = [];
const errors = [];

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
  for (let attempt = 0; attempt < 60; attempt++) {
    if (chrome.exitCode !== null) throw new Error("Chrome exited before opening DevTools.");
    try {
      const response = await fetch("http://127.0.0.1:9227/json/list");
      if (response.ok) {
        const pages = await response.json();
        target = pages.find((item) => item.type === "page");
      }
    } catch { /* Chrome is starting. */ }
    if (target) break;
    await pause(200);
  }
  if (!target) throw new Error("Chrome DevTools page was not available.");

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
    } else if (message.method === "Log.entryAdded" && message.params.entry.level === "error") {
      errors.push({ path: activePath, text: message.params.entry.text });
    }
  });
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Log.enable");

  const checks = [
    { path: "/", expected: /Personal Injury Lawyer/i },
    { path: "/ko", expected: /변호사/ },
    { path: "/es", expected: /Abogado/i },
  ];
  for (const check of checks) {
    activePath = check.path;
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
        bodyExists: Boolean(document.body),
        headExists: Boolean(document.head),
        bodyText: document.body?.innerText?.slice(0, 18000) || "",
        readyState: document.readyState
      }))()`,
      returnByValue: true,
    });
    const state = result.result?.value;
    if (!state?.bodyExists || !state.headExists || !state.h1) {
      throw new Error(`Homepage DOM missing on ${check.path}: ${JSON.stringify(state)}; exceptions=${JSON.stringify(exceptions.slice(-8)).slice(0, 4500)}; errors=${JSON.stringify(errors.slice(-8)).slice(0, 1800)}`);
    }
    if (!check.expected.test(state.h1)) {
      throw new Error(`Unexpected H1 on ${check.path}: ${state.h1}`);
    }
    if (/Cannot read properties of null|Application Error|Unexpected Application Error/i.test(state.bodyText)) {
      throw new Error(`Browser-rendered error page on ${check.path}: ${state.bodyText.slice(0, 450)}`);
    }
    console.log(`Browser OK ${check.path}: ${state.h1}`);
  }

  const appendErrors = [...exceptions, ...errors].filter((event) => /appendChild|Cannot read properties of null/i.test(event.text));
  if (appendErrors.length) {
    throw new Error("Browser appendChild exceptions: " + JSON.stringify(appendErrors).slice(0, 2800));
  }
  console.log(`Browser hydration passed for EN/KO/ES homepages (${exceptions.length} uncaught exceptions, ${errors.length} browser error logs; no appendChild failures).`);
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
