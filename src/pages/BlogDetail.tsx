import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts, getBlogBySlug } from "@/data/blogs";
import brandMark from "@/assets/law-firm/howard-choi-mark.webp";

const BlogDetail = () => {
  const { slug } = useParams();
  const post = slug ? getBlogBySlug(slug) : undefined;
  const articleRef = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });
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

      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-[#8b7864]"
        style={{ scaleX: scrollYProgress }}
      />

      <article ref={articleRef} className="relative">
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
          <div className="site-shell py-14 md:py-18 lg:py-22">
            <div className="mx-auto grid max-w-[1080px] gap-10 lg:grid-cols-[210px_minmax(0,790px)] lg:gap-16 xl:gap-20">
              <aside className="hidden lg:block">
                <div className="sticky top-28 border-t border-foreground/14 pt-5">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-foreground/38">Article</div>
                  <div className="mt-5 space-y-4 border-b border-foreground/10 pb-6 text-[12px] leading-5">
                    <div>
                      <div className="text-foreground/38">Practice</div>
                      <div className="mt-1 text-foreground/76">{post.category}</div>
                    </div>
                    <div>
                      <div className="text-foreground/38">Published</div>
                      <div className="mt-1 text-foreground/76">{post.date}</div>
                    </div>
                    <div>
                      <div className="text-foreground/38">Reading time</div>
                      <div className="mt-1 text-foreground/76">{post.readingTime}</div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <div className="mb-4 text-[10px] uppercase tracking-[0.15em] text-foreground/38">In this article</div>
                    <nav className="space-y-3">
                      {post.sections.map((section, index) => (
                        <a
                          key={section.heading}
                          href={`#article-section-${index + 1}`}
                          className="group flex gap-3 text-[12px] leading-5 text-foreground/48 transition-colors hover:text-foreground"
                        >
                          <span className="text-foreground/26">0{index + 1}</span>
                          <span>{section.heading}</span>
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>

              <div className="min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.68 }}
                >
                  <div className="mb-5 flex items-center gap-3 text-[11px] text-foreground/42 lg:hidden">
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>

                  <p className="editorial-serif text-[clamp(1.62rem,2.2vw,2.18rem)] leading-[1.17] tracking-[-0.014em] text-foreground/94">
                    {post.intro}
                  </p>
                </motion.div>

                <motion.blockquote
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.62 }}
                  className="my-10 rounded-[3px] bg-[#1a1714] px-7 py-8 text-[#f3eee5] md:my-12 md:px-9 md:py-10"
                >
                  <div className="mb-5 text-[10px] uppercase tracking-[0.16em] text-[#f3eee5]/38">Key point</div>
                  <p className="editorial-serif max-w-[680px] text-[clamp(1.8rem,2.65vw,2.65rem)] leading-[1.04] tracking-[-0.018em]">
                    “{post.takeaway}”
                  </p>
                </motion.blockquote>

                <div className="border-t border-foreground/12">
                  {post.sections.map((section, index) => (
                    <motion.section
                      id={`article-section-${index + 1}`}
                      key={section.heading}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.16 }}
                      transition={{ duration: 0.62 }}
                      className="scroll-mt-28 border-b border-foreground/10 py-10 last:border-b-0 md:py-12"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <span className="text-[11px] tracking-[0.12em] text-foreground/34">0{index + 1}</span>
                        <span className="h-px w-8 bg-foreground/12" />
                      </div>
                      <h2 className="editorial-serif max-w-[700px] text-[clamp(2.05rem,3vw,3.15rem)] leading-[0.98] tracking-[-0.022em] text-foreground">
                        {section.heading}
                      </h2>

                      <div className="mt-6 max-w-[730px] space-y-6 text-[17px] leading-[1.75] text-foreground/84 md:text-[18px]">
                        {section.paragraphs.map((paragraph, paragraphIndex) => (
                          <p
                            key={paragraph}
                            className={index === 0 && paragraphIndex === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-serif first-letter:text-[4.1rem] first-letter:leading-[0.72] first-letter:text-foreground" : undefined}
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </motion.section>
                  ))}
                </div>

                <div className="mt-10 rounded-[3px] bg-[#e9e6e1] p-7 md:p-8">
                  <div className="flex items-start gap-4">
                    <img src={brandMark} alt="" width={42} height={42} loading="lazy" decoding="async" className="h-10 w-10 shrink-0 object-cover invert" />
                    <div>
                      <div className="text-[12px] font-medium text-foreground">Howard Choi Law</div>
                      <div className="mt-1 text-[12px] text-foreground/46">Business &amp; Litigation Counsel</div>
                      <p className="mt-4 max-w-[590px] text-[13px] leading-6 text-foreground/58">
                        Practical legal insight for founders, businesses, and private clients navigating consequential decisions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-foreground/12 pt-6 text-[12px] leading-5 text-foreground/46">
                  This article is general information only and is not legal advice. Specific matters depend on their own facts and applicable law.
                </div>
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
