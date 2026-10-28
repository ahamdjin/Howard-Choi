import { useEffect, type ReactNode } from "react";
import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { LazyMotion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import DeferredIntegrations from "@/components/DeferredIntegrations";
import NotFound from "@/pages/NotFound";
import { attorneyJsonLd, legalServiceJsonLd, webSiteJsonLd } from "@/lib/seo";
import appCss from "@/index.css?url";
import brandFavicon from "@/assets/law-firm/howard-choi-favicon.png";
import heroJusticeLibrary from "@/assets/law-firm/hero-justice-library.webp";
import { mobileHeroSource } from "@/lib/responsive-images";

const loadMotionFeatures = () => import('@/lib/motion-features').then((module) => module.default);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: "Buena Park Injury Lawyer" },
      { name: "author", content: "Howard Choi" },
      { name: "theme-color", content: "#17130f" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: brandFavicon },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(attorneyJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(legalServiceJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(webSiteJsonLd) },
    ],
  }),
  notFoundComponent: NotFound,
  component: RootComponent,
});

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
        <ScrollToTop />
        <LazyMotion features={loadMotionFeatures}>{children}</LazyMotion>
    </>
  );
}

function RootComponent() {
  return <RootDocument><AppProviders><Outlet /></AppProviders></RootDocument>;
}

function RootDocument({ children }: { children: ReactNode }) {
  useEffect(() => {
    const loadAnalytics = () => {
      if (document.getElementById('site-gtm')) return;
      const analyticsWindow = window as Window & { dataLayer?: unknown[] };
      analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
      analyticsWindow.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      const script = document.createElement('script');
      script.id = 'site-gtm';
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-5V5GSC7B';
      document.head.appendChild(script);
    };
    // Start after hydration and the initial load so GTM cannot mutate the
    // server-rendered head before React hydrates it.
    if (document.readyState === 'complete') loadAnalytics();
    else window.addEventListener('load', loadAnalytics, { once: true });
    return () => window.removeEventListener('load', loadAnalytics);
  }, []);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const lang = pathname === "/ko" || pathname.startsWith("/ko/") ? "ko" : pathname === "/es" || pathname.startsWith("/es/") ? "es-US" : "en";
  const isHomepage = pathname === "/" || pathname === "/ko" || pathname === "/es";
  const innerSitePage = /^\/(?:(?:ko|es)\/)?(?:practice-areas|locations|attorney|results|about)(?:\/|$)/.test(pathname);
  const attorneyPage = /^\/(?:(?:ko|es)\/)?attorney(?:\/|$)/.test(pathname);
  // Pages that may need HighLevel embed support. Managed enquiry forms submit
  // through HighLevel External Tracking; no duplicate webhook delivery is used.
  const externalFormPage = [
    "/",
    "/ko",
    "/contact",
    "/ko/contact",
    "/case-value-calculator",
    "/ko/case-value-calculator",
    "/es",
    "/es/contact",
    "/es/case-value-calculator",
    "/review",
  ].includes(pathname);
  const bodyClassName = [
    "site-typography",
    innerSitePage ? "inner-site-page" : "",
    attorneyPage ? "attorney-page" : "",
  ].filter(Boolean).join(" ");

  return (
    <html lang={lang}>
      <head>
        <HeadContent />
        {/* Only homepages preload a mobile-sized hero. Desktop will not fetch
            this preload, and the same srcSet is used by the static mobile img. */}
        {isHomepage && (
          <link
            rel="preload"
            as="image"
            media="(max-width: 767px)"
            imageSrcSet={mobileHeroSource(heroJusticeLibrary)}
            imageSizes="100vw"
            fetchPriority="high"
          />
        )}
        {/* Vercel Speed Insights (official script-tag integration).
            Enable Speed Insights for this Vercel project in its dashboard. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };",
          }}
        />
        <script defer src="/_vercel/speed-insights/script.js" />
        {/* Inter and Newsreader are now locally bundled into appCss, with the
            same font-family names. Only Korean-specific glyph families still
            need Google's subset API, and only while visiting Korean pages. */}
        {lang === "ko" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400..600&family=Noto+Serif+KR:wght@400..600&display=swap"
            />
          </>
        )}
      </head>
      <body className={bodyClassName}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5V5GSC7B"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <div className={pathname === "/review" ? "min-h-screen bg-background p-0" : "min-h-screen bg-background px-[7px] pb-[7px]"}>
          {children}
        </div>
        <DeferredIntegrations externalFormPage={externalFormPage} disableChat={pathname === "/review"} />
        <Scripts />
      </body>
    </html>
  );
}
