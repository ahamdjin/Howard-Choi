# Buena Park Injury Lawyer Website

Production website for **Buena Park Injury Lawyer / Howard Choi**.

- Production domain: `https://www.buenaparkinjurylawyer.com`
- Hosting: **Vercel**
- Vercel project: **howardchoi**
- Production branch: **main**
- Framework: **TanStack Start + React + TypeScript + Vite + Nitro**
- Styling: **Tailwind CSS + site CSS**
- Languages: **English, Korean, Spanish**

---

## 1. Local development

Requires **Node.js 22.12+** and npm.

```bash
git clone https://github.com/ahamdjin/Howard-Choi.git
cd Howard-Choi
npm install
cp .env.example .env
npm run dev
```

Useful commands:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

Vercel deploys the `main` branch automatically. Always confirm the production deployment is **READY** after structural changes.

---

## 2. Project map

### Routes

`src/routes/` contains the TanStack file-based routes and page SEO metadata.

Examples:

- `index.tsx` → English homepage
- `practice-areas.tsx` / `practice-areas_.$slug.tsx`
- `locations.tsx` / `locations_.$slug.tsx`
- `ko*.tsx` → Korean routes
- `es*.tsx` → Spanish routes
- `sitemap[.]xml.ts` → XML sitemap
- `robots[.]txt.ts` → robots.txt
- `__root.tsx` → global document, GTM, global providers, HighLevel script loading

### Shared inner-page design

The canonical inner-page design system lives in:

- `src/pages/editorial/shared.tsx`
- `src/pages/editorial/PracticePages.tsx`
- `src/pages/EditorialLocationPages.tsx`
- `src/pages/editorial/AboutFirmPage.tsx`
- `src/pages/editorial/AttorneyPage.tsx`
- `src/pages/editorial/ResultsPage.tsx`

**Important:** English, Korean, and Spanish inner pages should reuse these shared components through a `locale` prop.

Do **not** create a separate Spanish copy of the layout. Translate the content/data while keeping the same shared structure. This prevents the language versions from drifting apart.

### Homepages

- English: `src/pages/Index.tsx`
- Korean: `src/pages/KoIndex.tsx`
- Spanish: `src/pages/es/EsIndex.tsx` → uses the shared English homepage structure with `locale="es"`

### Blogs

English source content is stored in:

- `content/blog/*.md`

The build-time parser is:

- `src/data/blogs.ts`

Pages CMS configuration:

- `.pages.yml`

Spanish and Korean blog presentation/data:

- `src/data/esBlogs.ts`
- `src/data/koBlogs.ts`
- `src/pages/es/EsBlogs.tsx`
- `src/pages/es/EsBlogDetail.tsx`
- `src/pages/KoBlogs.tsx`
- `src/pages/KoBlogDetail.tsx`

### Core business/content data

`src/data/injurySite.ts` is the main source of truth for:

- Firm name
- Phone
- Email
- Address
- Practice areas
- Service locations
- Local OTS data
- English/Korean core copy

Spanish practice/location content lives in:

- `src/data/esPracticeContent.ts`
- `src/data/esPracticeEnhancements.ts`
- `src/data/esLocationContent.ts`

When changing NAP information, update the canonical data source first instead of hardcoding a second copy.

---

## 3. Languages and SEO status

URL structure:

- English: `/`
- Korean: `/ko/...`
- Spanish: `/es/...`

### Current indexing strategy

**English and Korean are the indexed language set.**

Spanish is currently available to users but intentionally staged as:

- `noindex, follow`
- omitted from the XML sitemap
- not yet included in the indexed hreflang cluster

This is deliberate while the newer site builds authority.

When Spanish is ready to be indexed:

1. Remove `noindex: true` / `followWhenNoindex` from the Spanish route SEO configs.
2. Extend `src/lib/seo.ts` hreflang output to include `es-US`.
3. Add Spanish equivalents to `src/routes/sitemap[.]xml.ts`.
4. Rebuild and verify canonical + hreflang tags.
5. Submit the updated sitemap in Google Search Console.

### Schema language distinction

`src/lib/seo.ts` contains the global structured data.

- `WebSite.inLanguage` describes languages the **website content exists in**: English, Korean, Spanish.
- `Person.knowsLanguage` and `LegalService.knowsLanguage` describe languages the **attorney/firm actually serves clients in**.

Howard is currently represented as **English + Korean**. Do not add Spanish to attorney/service-language schema unless the firm genuinely provides Spanish-language service.

---

## 4. SEO files

Main SEO helper:

- `src/lib/seo.ts`

It controls:

- canonical URLs
- robots directives
- Open Graph metadata
- locale metadata
- hreflang for indexed language versions
- attorney JSON-LD
- LegalService JSON-LD
- WebSite JSON-LD
- breadcrumb schema
- article schema

Other SEO files:

- `src/routes/sitemap[.]xml.ts`
- `src/routes/robots[.]txt.ts`
- `public/llms.txt`
- `src/components/PageReviewed.tsx`

The production canonical URL is controlled by `VITE_SITE_URL`, with a safe fallback to the production domain.

---

## 5. Google Tag Manager / analytics

GTM is installed globally in:

- `src/routes/__root.tsx`

Current GTM container:

- `GTM-5V5GSC7B`

Both required pieces are present:

- GTM script in `<head>`
- GTM noscript iframe immediately inside `<body>`

GA4 should be configured **inside GTM**, not by adding another hardcoded `gtag.js` implementation to the website.

When analytics changes are made, verify:

1. GTM Preview / Tag Assistant
2. Google Tag fires on all pages
3. GA4 Realtime receives page views
4. Enhanced Measurement is enabled in the intended GA4 web stream

---

## 6. HighLevel integrations

### External form tracking + chat widget

Managed in:

- `src/components/DeferredIntegrations.tsx`

Current public integration identifiers:

- External tracking ID: `tk_9bc9b1c38e8446d69a248bc862fae75a`
- Chat widget ID: `6a9841dd05dab92683f66d82`

The root route decides which pages load HighLevel form tracking in:

- `src/routes/__root.tsx`

Keep any page containing `WebsiteInquiryForm` in the `externalFormPage` list.

### Website inquiry form

- `src/components/WebsiteInquiryForm.tsx`

The form is intentionally DOM-trackable by HighLevel's external tracking script and then redirects to the matching language thank-you page.

### Appointment calendar

Main live implementation:

- `src/components/GHLCalendar.tsx`

Current configuration:

- Calendar ID: `GpAHipyEcevlPgeso3ZO`
- Location ID: `gfYUTFnb4HXoCMB4p3Xk`
- Timezone: `America/Los_Angeles`
- Website availability window: **8:00 AM–5:00 PM Pacific**

The component reads public HighLevel availability and submits bookings through HighLevel's public booking flow.

There is also a server-side helper at:

- `src/lib/ghl-calendar.ts`

It supports a private-integration-token approach if needed later. The current public calendar component does not depend on that token.

Never commit a real HighLevel private integration token.

---

## 7. Navigation and language switching

Shared navigation engine:

- `src/components/SiteNavigation.tsx`

Language wrappers:

- `src/components/Navigation.tsx`
- `src/components/KoreanNavigation.tsx`
- `src/components/SpanishNavigation.tsx`

Language switch helper:

- `src/components/LanguageSwitch.tsx`

Footers:

- `src/components/Footer.tsx`
- `src/components/KoreanFooter.tsx`
- `src/components/SpanishFooter.tsx`

All language links should preserve the equivalent page path where that translation exists.

---

## 8. Styling

Global styles:

- `src/index.css`

Inner-page/editorial styles:

- `src/inner-pages.css`

Tailwind configuration:

- `tailwind.config.ts`

### Mobile rule

Mobile typography and the 7px outer page frame are intentionally implemented as mobile overrides. Do not change desktop structure when making mobile-only typography adjustments.

---

## 9. Deployment

Vercel configuration:

- `vercel.json`
- `vite.config.ts`

The site uses TanStack Start/Nitro SSR with prerendering for suitable routes.

A production change is not considered complete until:

1. GitHub `main` contains the change.
2. Vercel's latest production deployment is **READY**.
3. The affected route returns successfully.
4. For SEO changes, inspect the rendered HTML rather than only the client UI.

---

## 10. Safe maintenance checklist

Before making a large change:

1. Identify the canonical/shared component first.
2. Avoid duplicating an English component just to translate it.
3. Keep business facts in the existing data source where possible.
4. Do not add a second analytics implementation outside GTM.
5. Do not expose private HighLevel/API secrets in client code.
6. Run `npm run build`.
7. Run `npm run lint`.
8. Check desktop and mobile.
9. Check EN / KO / ES equivalents.
10. Confirm Vercel production is **READY**.

### If a language page looks different

First check whether it is using a separate page/layout file instead of the canonical shared component. The intended architecture is:

**shared layout/component → locale-specific text/data**

not:

**English layout + duplicated Korean layout + duplicated Spanish layout**

---

## 11. Important current business details

Canonical website values currently used by the application:

- Brand: **Buena Park Injury Lawyer**
- Attorney: **Howard Choi**
- California Bar No.: **284364**
- Phone: **714-844-8494**
- Email: **case@buenaparkinjurylawyer.com**
- Address: **6301 Beach Blvd, Suite 216, Buena Park, CA 90621**

If any of these change, update the canonical data and then re-check JSON-LD, footer/contact output, sitemap/canonicals, and HighLevel configuration where relevant.
