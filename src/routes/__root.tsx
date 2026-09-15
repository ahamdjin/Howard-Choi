import { useState, type ReactNode } from "react";
import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";
import DeferredIntegrations from "@/components/DeferredIntegrations";
import NotFound from "@/pages/NotFound";
import { attorneyJsonLd, legalServiceJsonLd, webSiteJsonLd } from "@/lib/seo";
import appCss from "@/index.css?url";
import innerPagesCss from "@/inner-pages.css?url";
import brandFavicon from "@/assets/law-firm/howard-choi-favicon.png";

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
      { rel: "stylesheet", href: innerPagesCss },
      { rel: "icon", type: "image/png", href: brandFavicon },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Newsreader:opsz,wght@6..72,400..600&family=Noto+Sans+KR:wght@400;500;600&family=Noto+Serif+KR:wght@400;500;600&display=swap" },
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
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SmoothScroll />
        <ScrollToTop />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function RootComponent() {
  return <RootDocument><AppProviders><Outlet /></AppProviders></RootDocument>;
}

function RootDocument({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const lang = pathname === "/ko" || pathname.startsWith("/ko/") ? "ko" : "en";
  const innerSitePage = /^\/(?:ko\/)?(?:practice-areas|locations|attorney|results|about)(?:\/|$)/.test(pathname);
  const attorneyPage = /^\/(?:ko\/)?attorney(?:\/|$)/.test(pathname);
  const externalFormPage = [
    "/contact",
    "/ko/contact",
    "/case-value-calculator",
    "/ko/case-value-calculator",
  ].includes(pathname);
  const bodyClassName = [
    "site-typography",
    innerSitePage ? "inner-site-page" : "",
    attorneyPage ? "attorney-page" : "",
  ].filter(Boolean).join(" ");

  return (
    <html lang={lang}>
      <head><HeadContent /></head>
      <body className={bodyClassName}>
        <div className="min-h-screen bg-background px-[5px] pb-[5px] sm:px-[7px] sm:pb-[7px]">
          {children}
        </div>
        <DeferredIntegrations externalFormPage={externalFormPage} />
        <Scripts />
      </body>
    </html>
  );
}
