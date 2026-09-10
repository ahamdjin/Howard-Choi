import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogDetail from "@/pages/BlogDetail";
import { getBlogBySlug } from "@/data/blogs";
import { articleJsonLd, breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const post = getBlogBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const path = `/blogs/${loaderData.slug}`;
    const seo = buildSeo({
      title: `${loaderData.title} | Howard Choi Law`,
      description: loaderData.excerpt,
      path,
      alternatePath: `/ko/blogs/${loaderData.slug}`,
      locale: "en-US",
      type: "article",
      image: loaderData.image,
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
        {
          type: "application/ld+json",
          children: JSON.stringify(
            articleJsonLd({
              title: loaderData.title,
              description: loaderData.excerpt,
              path,
              image: loaderData.image,
              publishedAt: loaderData.publishedAt,
              locale: "en-US",
            }),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Legal Insights", path: "/blogs" },
              { name: loaderData.title, path },
            ]),
          ),
        },
      ],
    };
  },
  component: BlogDetail,
});
