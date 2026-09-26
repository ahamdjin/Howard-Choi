import { createFileRoute, notFound } from "@tanstack/react-router";
import EsBlogDetail from "@/pages/es/EsBlogDetail";
import { getSpanishBlogBySlug } from "@/data/esBlogs";
import { articleJsonLd, breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/blogs_/$slug")({
  loader: ({ params }) => {
    const post = getSpanishBlogBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const path = `/es/blogs/${loaderData.slug}`;
    const seo = buildSeo({
      title: `${loaderData.title} | Buena Park Injury Lawyer`,
      description: loaderData.excerpt,
      path,
      locale: "es",
      type: "article",
      image: loaderData.image,
      noindex: true,
      followWhenNoindex: true,
    });
    return {
      ...seo,
      meta: [
        ...seo.meta,
        { property: "article:published_time", content: loaderData.publishedAt },
        { property: "article:modified_time", content: loaderData.publishedAt },
        { property: "article:section", content: loaderData.category },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(articleJsonLd({ title: loaderData.title, description: loaderData.excerpt, path, image: loaderData.image, publishedAt: loaderData.publishedAt, locale: "es" })) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Inicio", path: "/es" }, { name: "Guías legales", path: "/es/blogs" }, { name: loaderData.title, path }])) },
      ],
    };
  },
  component: EsBlogDetail,
});
