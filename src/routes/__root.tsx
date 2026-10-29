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

// TEMP diagnostic: smallest valid TanStack Start document.
function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}
