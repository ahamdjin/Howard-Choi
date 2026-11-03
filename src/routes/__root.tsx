import { createRootRoute, Outlet } from "@tanstack/react-router";
import AppProviders from "@/components/app/AppProviders";
import SiteDocument from "@/components/app/SiteDocument";
import NotFound from "@/pages/NotFound";
import { attorneyJsonLd, legalServiceJsonLd, webSiteJsonLd } from "@/lib/seo";
import appCss from "@/index.css?url";
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
  shellComponent: SiteDocument,
});

function RootComponent() {
  return <AppProviders><Outlet /></AppProviders>;
}
