import { useState, type ReactNode } from "react";
import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";
import NotFound from "@/pages/NotFound";
import { legalServiceJsonLd, webSiteJsonLd } from "@/lib/seo";
import appCss from "@/index.css?url";
import brandMark from "@/assets/law-firm/howard-choi-mark.webp";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: "Buena Park Injury Lawyer" },
      { name: "author", content: "Buena Park Injury Lawyer" },
      { name: "theme-color", content: "#17130f" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/webp", href: brandMark },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400..600&family=Noto+Sans+KR:wght@400;500;600&family=Noto+Serif+KR:wght@400;500;600&display=swap" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(legalServiceJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(webSiteJsonLd) },
    ],
  }),
  notFoundComponent: NotFound,
  component: RootComponent,
});

function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}><TooltipProvider><Toaster /><Sonner /><SmoothScroll /><ScrollToTop />{children}</TooltipProvider></QueryClientProvider>;
}

function RootComponent() {
  return <RootDocument><AppProviders><Outlet /></AppProviders></RootDocument>;
}

function ViewportFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[110] rounded-[16px] border-[5px] border-[#f3efe7] shadow-[inset_0_0_0_1px_rgba(33,28,23,0.035)] sm:rounded-[18px] sm:border-[7px]"
    />
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const lang = pathname === "/ko" || pathname.startsWith("/ko/") ? "ko" : "en";
  return <html lang={lang}><head><HeadContent /></head><body><ViewportFrame />{children}<Scripts /><script async src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" data-widget-id="6a9841dd05dab92683f66d82" /></body></html>;
}
