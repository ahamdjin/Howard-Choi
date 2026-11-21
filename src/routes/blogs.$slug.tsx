import { guidePhotography } from "@/data/guidePhotography";
import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogDetail from "@/pages/BlogDetail";
import { getBlogBySlug } from "@/data/blogs";
import { articleJsonLd, breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => { const post = getBlogBySlug(params.slug); if (!post) throw notFound(); return post; },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const path = `/blogs/${loaderData.slug}`;
    const cover = loaderData.slug === "car-accidents-what-is-a-skid-and-how-can-you-avoid-them" ? guidePhotography.skidHero : { src: loaderData.image, alt: loaderData.alt };
    const seo = buildSeo({ title: loaderData.metaTitle || `${loaderData.title} | Buena Park Injury Lawyer`, description: loaderData.metaDescription || loaderData.excerpt, path, locale: "en-US", type: "article", image: cover.src, imageAlt: cover.alt });
    return {
      ...seo,
      meta: [...seo.meta, { property: "article:published_time", content: loaderData.publishedAt }, { property: "article:modified_time", content: loaderData.updatedAt }, { property: "article:section", content: loaderData.category }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(articleJsonLd({ title: loaderData.title, description: loaderData.excerpt, path, image: cover.src, publishedAt: loaderData.publishedAt, updatedAt: loaderData.updatedAt, locale: "en-US" })) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blogs", path: "/blogs" }, { name: loaderData.title, path }])) },
      ],
    };
  },
  component: BlogDetail,
});
