import { faqTopics, injuryTopics, newServices } from "@/data/learningResources";
import { additionalLocations } from "@/data/additionalLocations";
import { createFileRoute } from "@tanstack/react-router";
import { blogPosts } from "@/data/blogs";
import { practiceAreas, serviceLocations } from "@/data/injurySite";
import { absoluteUrl } from "@/lib/seo";

const xmlEscape = (value: string) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&apos;");

const renderUrl = (path: string, lastmod?: string) => `
  <url>
    <loc>${xmlEscape(absoluteUrl(path))}</loc>${lastmod ? `\n    <lastmod>${xmlEscape(lastmod)}</lastmod>` : ""}
  </url>`;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticUrls = [
          renderUrl("/learning-hub"), renderUrl("/faqs"), renderUrl("/injury-types"), renderUrl("/blogs/guides"),
          ...[...faqTopics, ...injuryTopics.filter(r => r.path.startsWith("/injury-types/")), ...newServices].map(r => renderUrl(r.path)),
          ...additionalLocations.map(city => renderUrl("/locations/" + city.slug)),
          renderUrl("/practice-areas/personal-injury"),
          renderUrl("/"),
          renderUrl("/practice-areas"),
          renderUrl("/attorney"),
          renderUrl("/about"),
          renderUrl("/about/our-difference"),
          renderUrl("/about/what-to-expect"),
          renderUrl("/about/zero-fee-guarantee"),
          renderUrl("/results"),
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
          renderUrl(`/blogs/${post.slug}`, post.updatedAt),
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