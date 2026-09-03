import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts, getBlogBySlug } from "@/data/blogs";

const BlogDetail = () => {
  const { slug } = useParams();
  const post = slug ? getBlogBySlug(slug) : undefined;
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 800], [0, 110]);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="editorial-serif text-4xl">Article not found.</div>
          <Link to="/blogs" className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to insights
          </Link>
        </div>
      </div>
    );
  }

  const related = blogPosts.find((item) => item.slug !== post.slug);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Navigation />

      <article>
        <header className="relative flex h-[70svh] min-h-[560px] items-end overflow-hidden bg-[#17130f] text-[#f3eee5]">
          <motion.img
            src={post.image}
            alt={post.alt}
            style={{ y: imageY }}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-[115%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#17130f]/62" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/86 via-[#17130f]/12 to-[#17130f]/18" />

          <div className="site-shell relative z-10 pb-14 md:pb-16 lg:pb-20">
            <Link to="/blogs" className="mb-8 inline-flex items-center gap-2 text-[12px] text-[#f3eee5]/64 transition-colors hover:text-[#f3eee5]">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to insights
            </Link>
            <div className="max-w-[900px]">
              <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#f3eee5]/62">
                <span>{post.category}</span>
                <span>{post.date}</span>
                <span>{post.readingTime}</span>
              </div>
              <h1 className="editorial-serif text-[clamp(3.2rem,5.5vw,6rem)] leading-[0.91] tracking-[-0.028em]">
                {post.title}
              </h1>
            </div>
          </div>
        </header>

        <div className="site-shell py-20 md:py-24 lg:py-28">
          <div className="mx-auto max-w-[820px]">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="editorial-serif border-b border-foreground/10 pb-12 text-[clamp(1.8rem,2.8vw,2.8rem)] leading-[1.1] tracking-[-0.018em] text-foreground/82"
            >
              {post.intro}
            </motion.p>

            <div className="space-y-14 py-14 md:py-16">
              {post.sections.map((section, index) => (
                <motion.section
                  key={section.heading}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, delay: index * 0.04 }}
                  className="grid gap-5 md:grid-cols-[0.32fr_1fr] md:gap-10"
                >
                  <div className="text-[11px] tracking-[0.12em] text-muted-foreground">0{index + 1}</div>
                  <div>
                    <h2 className="editorial-serif text-[clamp(2rem,3vw,3rem)] leading-[0.98] tracking-[-0.02em]">
                      {section.heading}
                    </h2>
                    <div className="mt-6 space-y-5 text-[15px] leading-7 text-foreground/68 md:text-[16px]">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </motion.section>
              ))}
            </div>

            <div className="border-y border-foreground/10 py-8 text-[12px] leading-5 text-muted-foreground">
              This article is general information only and is not legal advice. Specific matters depend on their own facts and applicable law.
            </div>
          </div>
        </div>
      </article>

      {related && (
        <section className="border-t border-foreground/10 bg-[#e9e6e1] py-16 md:py-20">
          <div className="site-shell">
            <span className="text-[12px] text-foreground/48">Read next</span>
            <Link to={`/blogs/${related.slug}`} className="group mt-5 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <h2 className="editorial-serif max-w-[820px] text-[clamp(2.5rem,4vw,4.6rem)] leading-[0.94] tracking-[-0.025em]">
                {related.title}
              </h2>
              <div className="flex items-center justify-between border-t border-foreground/15 pt-5 text-[13px] text-foreground/68">
                <span>{related.category}</span>
                <span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                  Read article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogDetail;
