import { createFileRoute } from "@tanstack/react-router";
import { blogPosts } from "@/data/blogs";
import { practiceAreas, serviceLocations } from "@/data/injurySite";
import { absoluteUrl } from "@/lib/seo";

const xmlEscape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&apos;");

const renderUrl = (path: string, englishPath: string, koreanPath: string, lastmod: string) => `
  <url>
    <loc>${xmlEscape(absoluteUrl(path))}</loc>
    <lastmod>${lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="en-US" href="${xmlEscape(absoluteUrl(englishPath))}" />
    <xhtml:link rel="alternate" hreflang="ko-US" href="${xmlEscape(absoluteUrl(koreanPath))}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(absoluteUrl(englishPath))}" />
  </url>`;

const pair = (en: string, ko: string, lastmod = "2026-09-11") => [renderUrl(en, en, ko, lastmod), renderUrl(ko, en, ko, lastmod)];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticUrls = [
          ...pair("/", "/ko"),
          ...pair("/practice-areas", "/ko/practice-areas"),
          ...pair("/attorney", "/ko/attorney"),
          ...pair("/about", "/ko/about"),
          ...pair("/locations", "/ko/locations"),
          ...pair("/results", "/ko/results"),
          ...pair("/blogs", "/ko/blogs"),
          ...pair("/contact", "/ko/contact"),
          ...pair("/privacy-policy", "/ko/privacy-policy"),
          ...pair("/terms", "/ko/terms"),
          ...pair("/disclaimer", "/ko/disclaimer"),
          ...pair("/accessibility", "/ko/accessibility"),
        ];

        const practiceUrls = practiceAreas.flatMap((practice) => pair(`/practice-areas/${practice.slug}`, `/ko/practice-areas/${practice.slug}`));
        const locationUrls = serviceLocations.flatMap((location) => pair(`/locations/${location.slug}`, `/ko/locations/${location.slug}`));
        const articleUrls = blogPosts.flatMap((post) => pair(`/blogs/${post.slug}`, `/ko/blogs/${post.slug}`, post.publishedAt));

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${[
          ...staticUrls,
          ...practiceUrls,
          ...locationUrls,
          ...articleUrls,
        ].join("")}\n</urlset>\n`;

        return new Response(sitemap, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
