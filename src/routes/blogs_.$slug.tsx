import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogDetail from "@/pages/BlogDetail";
import { getBlogBySlug } from "@/data/blogs";
import { hasIndexableKoreanBlog } from "@/data/blogLocaleAvailability";
import { articleJsonLd, breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/blogs_/$slug")({
  loader: ({ params }) => { const post = getBlogBySlug(params.slug); if (!post) throw notFound(); return post; },
  head: ({ loaderData }) => {
    const path = `/blogs/${loaderData.slug}`;
    const seo = buildSeo({ title: `${loaderData.title} | Buena Park Injury Lawyer`, description: loaderData.excerpt, path, alternatePath: hasIndexableKoreanBlog(loaderData.slug) ? `/ko/blogs/${loaderData.slug}` : undefined, locale: "en-US", type: "article", image: loaderData.image });
    return {
      ...seo,
      meta: [...seo.meta, { property: "article:published_time", content: loaderData.publishedAt }, { property: "article:modified_time", content: loaderData.updatedAt }, { property: "article:section", content: loaderData.category }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(articleJsonLd({ title: loaderData.title, description: loaderData.excerpt, path, image: loaderData.image, publishedAt: loaderData.publishedAt, updatedAt: loaderData.updatedAt, locale: "en-US" })) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blogs", path: "/blogs" }, { name: loaderData.title, path }])) },
      ],
    };
  },
  component: BlogDetail,
});
