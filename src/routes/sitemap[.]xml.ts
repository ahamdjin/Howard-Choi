import { createFileRoute } from "@tanstack/react-router";
import { blogPosts } from "@/data/blogs";
import { absoluteUrl } from "@/lib/seo";

const xmlEscape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const renderUrl = (path: string, englishPath: string, koreanPath: string, lastmod: string) => `
  <url>
    <loc>${xmlEscape(absoluteUrl(path))}</loc>
    <lastmod>${lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="en-US" href="${xmlEscape(absoluteUrl(englishPath))}" />
    <xhtml:link rel="alternate" hreflang="ko-US" href="${xmlEscape(absoluteUrl(koreanPath))}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(absoluteUrl(englishPath))}" />
  </url>`;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPairs = [
          { en: "/", ko: "/ko", lastmod: "2026-09-10" },
          { en: "/blogs", ko: "/ko/blogs", lastmod: "2026-09-10" },
          { en: "/contact", ko: "/ko/contact", lastmod: "2026-09-10" },
        ];

        const staticUrls = staticPairs.flatMap((pair) => [
          renderUrl(pair.en, pair.en, pair.ko, pair.lastmod),
          renderUrl(pair.ko, pair.en, pair.ko, pair.lastmod),
        ]);

        const articleUrls = blogPosts.flatMap((post) => {
          const en = `/blogs/${post.slug}`;
          const ko = `/ko/blogs/${post.slug}`;
          return [
            renderUrl(en, en, ko, post.publishedAt),
            renderUrl(ko, en, ko, post.publishedAt),
          ];
        });

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${[
          ...staticUrls,
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
