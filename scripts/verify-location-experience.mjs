import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const origin = process.env.SMOKE_ORIGIN || "http://127.0.0.1:3132";
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
  "--remote-debugging-port=9247",
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
  for (let attempt = 0; attempt < 60; attempt++) {
    if (chrome.exitCode !== null) throw new Error("Chrome exited before opening DevTools.");
    try {
      const response = await fetch("http://127.0.0.1:9247/json/list");
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
    } else if (message.method === "Runtime.consoleAPICalled" && ["error", "warning", "warn"].includes(message.params.type)) {
      consoleCalls.push({ path: activePath, text: message.params.args.map((arg) => arg.value || arg.description || "").join(" ").slice(0, 2500) });
    } else if (message.method === "Log.entryAdded" && message.params.entry.level === "error") {
      errors.push({ path: activePath, text: message.params.entry.text });
    }
  });
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Log.enable");


  const args = process.argv.slice(2);
  const locales = (args.find(arg => arg.startsWith("--locales="))?.split("=")[1] ?? "en").split(",");
  const slugs = args.filter(arg => !arg.startsWith("--"));
  if (!slugs.length) throw new Error("Pass one or more reviewed city slugs.");
  const output = "output/location-experience/screenshots";
  mkdirSync(output, { recursive: true });
  const evaluate = async expression => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result.value;
  for (const slug of slugs) for (const locale of locales) for (const width of [1440, 390]) {
    const prefix = locale === "en" ? "" : `/${locale}`;
    activePath = `${prefix}/locations/${slug}`;
    await send("Emulation.setDeviceMetricsOverride", {width,height:1000,deviceScaleFactor:1,mobile:false});
    await send("Page.navigate", {url:origin+activePath});
    await pause(1800);
    await evaluate("document.fonts.ready.then(()=>true)");
    await evaluate("Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>null)})).then(()=>true)");
    const state = await evaluate(`(() => {
      const nav=document.querySelector('nav.fixed');
      const visible=el=>el && el.getBoundingClientRect().width>0 && el.getBoundingClientRect().height>0;
      const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
      const rail=document.querySelector('.editorial-reading-rail');
      const cases=document.getElementById('cases');
      return {robots:document.querySelector('meta[name=robots]')?.content,htmlLang:document.documentElement.lang,h1:document.querySelector('h1')?.innerText,h1Count:document.querySelectorAll('h1').length,
        width:innerWidth,scroll:document.documentElement.scrollWidth,
        phone:[...nav.querySelectorAll('a[href^="tel:"]')].some(visible),
        contact:[...nav.querySelectorAll('a[href="${prefix}/contact"]')].some(visible),
        brokenImages:[...document.images].filter(i=>i.naturalWidth===0).map(i=>i.src),
        duplicateIds:ids.filter((id,i)=>ids.indexOf(id)!==i),
        stories:document.querySelectorAll('.case-story').length,
        storyFont:getComputedStyle(document.querySelector('.case-story h3')).fontSize,
        bodyFont:getComputedStyle(document.querySelector('.case-story p')).fontFamily,
        guideAfterCases:rail && cases ? rail.getBoundingClientRect().top>=cases.getBoundingClientRect().bottom : false};
    })()`);
    console.log(slug, locale, width, JSON.stringify(state));
    if(state.h1Count!==1||state.scroll>width+1||!state.phone||!state.contact||state.brokenImages.length||state.duplicateIds.length||!state.stories||!state.guideAfterCases) throw new Error('Page verification failed');
    if(locale !== 'en' && (!state.robots?.includes('noindex') || !state.htmlLang?.startsWith(locale))) throw new Error('Locale/robots check failed');
    const masterPath = `src/data/locations/${slug}.${locale}.json`;
    if (existsSync(masterPath)) {
      const source = JSON.parse(readFileSync(masterPath, 'utf8'));
      const city = source.content ?? source;
      const paragraphs = city.sections.flatMap(section => [...section.paragraphs, ...(section.items ?? []).map(item => item.text)]);
      const missing = await evaluate(`(() => { const compact=s=>s.replace(/\\s/g,''); const rendered=compact(document.querySelector('main').textContent);return ${JSON.stringify(paragraphs)}.filter(p=>!rendered.includes(compact(p))); })()`);
      if (missing.length) throw new Error(`Source paragraphs missing from rendered page: ${JSON.stringify(missing)}`);
      console.log(`${slug}: all ${paragraphs.length} source paragraphs rendered (${paragraphs.join(' ').split(/\s+/).length} source words).`);
    }
    for (const [name,selector] of [['hero','main'],['hero-image','.detail-hero--split figure'],['intro','#local'],['process','#process'],['feature','.experience-feature'],['cases','.case-story'],['second-case','.case-story:nth-child(2)'],['data','#data'],['guide','#records']]) {
      if (!await evaluate(`Boolean(document.querySelector(${JSON.stringify(selector)}))`)) continue;
      await evaluate(`document.querySelector(${JSON.stringify(selector)})?.scrollIntoView({behavior:'instant',block:'start'})`);
      await pause(450);
      const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
      writeFileSync(`${output}/${slug}-${locale}-${width}-${name}.png`,Buffer.from(shot.data,'base64'));
    }
    const faq=await evaluate(`(() => { const d=document.querySelector('[data-location-faq] details, #questions details, #faq details'); if(!d)return false;d.querySelector('summary').click();return d.open; })()`);
    if(!faq) throw new Error('FAQ failed');
    const target=await evaluate("document.querySelector('.editorial-reading-rail a[href^=\"#\"]')?.getAttribute('href')");
    if(target) {
      await evaluate(`document.querySelector('.editorial-reading-rail a[href="${target}"]').click()`);
      let reached = false;
      for (let attempt=0; attempt<25; attempt++) {
        await pause(100);
        reached = await evaluate(`document.querySelector('.editorial-reading-rail a[href="${target}"]').getAttribute('aria-current')==='location' && Math.abs(document.querySelector('${target}').getBoundingClientRect().top-110)<100`);
        if(reached) break;
      }
      if(!reached) {
        const position = await evaluate(`({top:document.querySelector('${target}').getBoundingClientRect().top,current:document.querySelector('.editorial-reading-rail [aria-current]')?.getAttribute('href'),hash:location.hash,scroll:window.scrollY})`);
        throw new Error('Reading navigation failed for '+target+': '+JSON.stringify(position));
      }
    }
    if (locales.length > 1) {
      const nextLocale = locales[(locales.indexOf(locale) + 1) % locales.length];
      const nextPath = `${nextLocale === "en" ? "" : `/${nextLocale}`}/locations/${slug}`;
      const clicked = await evaluate(`(() => { const link=document.querySelector('a[hreflang][href^="${nextPath}"]'); if(!link) return false; link.click(); return true; })()`);
      if (!clicked) throw new Error('Equivalent language link missing');
      await pause(1800);
      const switched = await evaluate(`location.pathname===${JSON.stringify(nextPath)} && document.documentElement.lang.startsWith(${JSON.stringify(nextLocale)}) && document.querySelectorAll('.case-story').length>0`);
      if (!switched) throw new Error('Equivalent language navigation failed');
    }

  }
  if(exceptions.length) throw new Error(JSON.stringify(exceptions));
  console.log("Desktop/mobile layout, loaded images, guide placement, reading navigation and FAQ controls passed.");

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
