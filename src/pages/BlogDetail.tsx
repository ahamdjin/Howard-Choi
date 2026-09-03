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
  const imageY = useTransform(scrollY, [0, 1000], [0, 130]);
  const imageScale = useTransform(scrollY, [0, 1000], [1, 1.025]);

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

      <article className="relative">
        <header className="sticky top-0 flex h-[66svh] min-h-[540px] items-end overflow-hidden bg-[#17130f] text-[#f3eee5]">
          <motion.img
            src={post.image}
            alt={post.alt}
            style={{ y: imageY, scale: imageScale }}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-[118%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#17130f]/64" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/88 via-[#17130f]/10 to-[#17130f]/18" />

          <div className="site-shell relative z-10 pb-14 md:pb-16">
            <Link
              to="/blogs"
              className="mb-7 inline-flex items-center gap-2 text-[12px] text-[#f3eee5]/62 transition-colors hover:text-[#f3eee5]"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to journal
            </Link>

            <div className="max-w-[860px]">
              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-[#f3eee5]/60">
                <span>{post.category}</span>
                <span>·</span>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h1 className="editorial-serif text-[clamp(2.85rem,4.8vw,5rem)] leading-[0.93] tracking-[-0.026em]">
                {post.title}
              </h1>
            </div>
          </div>
        </header>

        <div className="relative z-10 bg-background">
          <div className="site-shell py-16 md:py-20 lg:py-24">
            <div className="mx-auto max-w-[790px]">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.68 }}
                className="editorial-serif border-b border-foreground/12 pb-10 text-[clamp(1.55rem,2.15vw,2.1rem)] leading-[1.18] tracking-[-0.014em] text-foreground/92"
              >
                {post.intro}
              </motion.p>

              <div className="py-12 md:py-14">
                {post.sections.map((section, index) => (
                  <motion.section
                    key={section.heading}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.16 }}
                    transition={{ duration: 0.62 }}
                    className="border-b border-foreground/10 py-10 first:pt-0 last:border-b-0 last:pb-0 md:py-12"
                  >
                    <div className="mb-4 text-[11px] tracking-[0.12em] text-foreground/38">0{index + 1}</div>
                    <h2 className="editorial-serif max-w-[700px] text-[clamp(2.15rem,3.1vw,3.25rem)] leading-[0.98] tracking-[-0.022em] text-foreground">
                      {section.heading}
                    </h2>

                    <div className="mt-6 max-w-[730px] space-y-6 text-[17px] leading-[1.72] text-foreground/82 md:text-[18px]">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </motion.section>
                ))}
              </div>

              <div className="border-y border-foreground/12 py-7 text-[13px] leading-6 text-foreground/52">
                This article is general information only and is not legal advice. Specific matters depend on their own facts and applicable law.
              </div>
            </div>
          </div>
        </div>
      </article>

      {related && (
        <section className="relative z-10 border-t border-foreground/10 bg-[#e9e6e1] py-14 md:py-18">
          <div className="site-shell">
            <span className="text-[11px] text-foreground/44">Read next</span>
            <Link to={`/blogs/${related.slug}`} className="group mt-4 grid gap-7 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <h2 className="editorial-serif max-w-[760px] text-[clamp(2.25rem,3.5vw,3.8rem)] leading-[0.96] tracking-[-0.023em]">
                {related.title}
              </h2>
              <div className="flex items-center justify-between border-t border-foreground/15 pt-4 text-[12px] text-foreground/64">
                <span>{related.category}</span>
                <span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                  Read article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default BlogDetail;
