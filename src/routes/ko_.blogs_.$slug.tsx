import { createFileRoute, notFound } from "@tanstack/react-router";
import KoBlogDetail from "@/pages/KoBlogDetail";
import { getKoBlogBySlug } from "@/data/koBlogs";
import { articleJsonLd, breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/blogs/$slug")({
  loader: ({ params }) => {
    const post = getKoBlogBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const path = `/ko/blogs/${loaderData.slug}`;
    const seo = buildSeo({
      title: `${loaderData.title} | Howard Choi Law`,
      description: loaderData.excerpt,
      path,
      alternatePath: `/blogs/${loaderData.slug}`,
      locale: "ko-US",
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
              locale: "ko-US",
            }),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "홈", path: "/ko" },
              { name: "법률 인사이트", path: "/ko/blogs" },
              { name: loaderData.title, path },
            ]),
          ),
        },
      ],
    };
  },
  component: KoBlogDetail,
});
