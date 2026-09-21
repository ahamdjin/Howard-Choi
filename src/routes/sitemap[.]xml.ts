import { createFileRoute } from "@tanstack/react-router";
import { blogPosts } from "@/data/blogs";
import { practiceAreas, serviceLocations } from "@/data/injurySite";
import { absoluteUrl } from "@/lib/seo";

const xmlEscape = (value: string) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\"/g, "&quot;")
  .replace(/'/g, "&apos;");

const renderUrl = (path: string, lastmod?: string) => `
  <url>
    <loc>${xmlEscape(absoluteUrl(path))}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
  </url>`;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticUrls = [
          renderUrl("/"),
          renderUrl("/practice-areas"),
          renderUrl("/attorney"),
          renderUrl("/about"),
          renderUrl("/locations"),
          renderUrl("/case-value-calculator"),
          renderUrl("/blogs"),
          renderUrl("/contact"),
        ];

        const practiceUrls = practiceAreas.map((practice) =>
          renderUrl(`/practice-areas/${practice.slug}`),
        );
        const locationUrls = serviceLocations.map((location) =>
          renderUrl(`/locations/${location.slug}`),
        );
        const articleUrls = blogPosts.map((post) =>
          renderUrl(`/blogs/${post.slug}`, post.publishedAt),
        );

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[
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