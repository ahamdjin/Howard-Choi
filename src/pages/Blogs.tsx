import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogs";
import heroJusticeLibrary from "@/assets/law-firm/hero-justice-library.webp";

const Blogs = () => {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, 115]);
  const heroScale = useTransform(scrollY, [0, 900], [1, 1.025]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Navigation />

      <div className="relative">
        <div className="sticky top-0 h-[58svh] min-h-[500px] overflow-hidden bg-[#17130f] text-[#f3eee5]">
          <motion.img
            src={heroJusticeLibrary}
            alt="Law library and Lady Justice"
            style={{ y: imageY, scale: heroScale }}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-[116%] w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#17130f]/62" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/80 via-[#17130f]/12 to-[#17130f]/16" />

          <div className="site-shell relative z-10 flex h-full items-end pb-14 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72 }}
              className="max-w-[720px]"
            >
              <span className="mb-4 block text-[12px] text-[#f3eee5]/62">Journal</span>
              <h1 className="editorial-serif text-[clamp(2.9rem,4.4vw,4.6rem)] leading-[0.94] tracking-[-0.024em]">
                Notes for decisions that deserve more thought.
              </h1>
              <p className="mt-5 max-w-[540px] text-[15px] leading-6 text-[#f3eee5]/70">
                Practical perspectives on business law, disputes, contracts, and risk — written to make the next decision clearer.
              </p>
            </motion.div>
          </div>
        </div>

        <main className="relative z-10 bg-background py-16 md:py-20 lg:py-24">
          <div className="site-shell">
            <div className="mb-10 flex items-end justify-between border-b border-foreground/12 pb-5">
              <div>
                <span className="text-[11px] text-muted-foreground">Latest thinking</span>
                <h2 className="editorial-serif mt-2 text-[clamp(2rem,2.8vw,3rem)] leading-none tracking-[-0.02em]">
                  Selected notes
                </h2>
              </div>
              <span className="hidden text-[11px] text-muted-foreground sm:block">{blogPosts.length} articles</span>
            </div>

            <div className="divide-y divide-foreground/12">
              {blogPosts.map((post, index) => {
                const reverse = index % 2 === 1;

                return (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ duration: 0.68, delay: index * 0.06 }}
                    className="py-8 md:py-10 lg:py-12"
                  >
                    <Link
                      to={`/blogs/${post.slug}`}
                      className={`group grid gap-7 lg:grid-cols-2 lg:items-stretch lg:gap-10 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
                    >
                      <div className="relative min-h-[310px] overflow-hidden rounded-[3px] bg-[#17130f] md:min-h-[390px]">
                        <img
                          src={post.image}
                          alt={post.alt}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-[#17130f]/10 transition-colors duration-500 group-hover:bg-transparent" />
                      </div>

                      <div className="flex min-h-[310px] flex-col justify-between py-1 md:min-h-[390px] lg:py-3">
                        <div>
                          <div className="mb-6 flex items-center gap-4 text-[11px] text-muted-foreground">
                            <span>{post.category}</span>
                            <span>·</span>
                            <span>{post.readingTime}</span>
                          </div>

                          <h2 className="editorial-serif max-w-[590px] text-[clamp(2.25rem,3.6vw,4rem)] leading-[0.95] tracking-[-0.025em]">
                            {post.title}
                          </h2>
                          <p className="mt-5 max-w-[540px] text-[15px] leading-6 text-foreground/66">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="mt-10 flex items-center justify-between border-t border-foreground/12 pt-5 text-[12px]">
                          <span className="text-muted-foreground">{post.date}</span>
                          <span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                            Read article <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Blogs;
