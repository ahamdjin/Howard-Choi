import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogs";
import heroJusticeLibrary from "@/assets/law-firm/hero-justice-library.webp";

const Blogs = () => {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, 90]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Navigation />

      <section className="relative flex h-[54svh] min-h-[460px] items-end overflow-hidden bg-[#17130f] text-[#f3eee5]">
        <motion.img
          src={heroJusticeLibrary}
          alt="Law library and Lady Justice"
          style={{ y: imageY }}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-[112%] w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#17130f]/58" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/74 via-transparent to-[#17130f]/12" />

        <div className="site-shell relative z-10 pb-14 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="max-w-[760px]"
          >
            <span className="mb-5 block text-[12px] tracking-[0.08em] text-[#f3eee5]/68">Insights</span>
            <h1 className="editorial-serif text-[clamp(3.2rem,5vw,5.2rem)] leading-[0.92] tracking-[-0.025em]">
              Clear thinking for consequential decisions.
            </h1>
            <p className="mt-6 max-w-[560px] text-[15px] leading-6 text-[#f3eee5]/68 md:text-base">
              Practical notes on business law, disputes, contracts, and the decisions that become more expensive when left unclear.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="site-shell py-20 md:py-24 lg:py-28">
        <div className="mb-12 flex items-end justify-between border-b border-foreground/10 pb-6">
          <div>
            <span className="text-[12px] text-muted-foreground">Latest</span>
            <h2 className="editorial-serif mt-2 text-[clamp(2.2rem,3vw,3.4rem)] leading-none tracking-[-0.02em]">
              From the journal
            </h2>
          </div>
          <span className="hidden text-[12px] text-muted-foreground sm:block">{blogPosts.length} articles</span>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="group overflow-hidden rounded-[4px] border border-foreground/10 bg-card"
            >
              <Link to={`/blogs/${post.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#17130f]">
                  <img
                    src={post.image}
                    alt={post.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/36 to-transparent" />
                </div>

                <div className="p-7 md:p-8">
                  <div className="mb-5 flex items-center justify-between gap-4 text-[11px] text-muted-foreground">
                    <span>{post.category}</span>
                    <span>{post.readingTime}</span>
                  </div>

                  <h2 className="editorial-serif max-w-[620px] text-[clamp(2rem,3vw,3rem)] leading-[0.98] tracking-[-0.022em]">
                    {post.title}
                  </h2>
                  <p className="mt-5 max-w-[600px] text-[14px] leading-6 text-muted-foreground">{post.excerpt}</p>

                  <div className="mt-8 flex items-center justify-between border-t border-foreground/10 pt-5 text-[12px]">
                    <span className="text-muted-foreground">{post.date}</span>
                    <span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                      Read article <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blogs;
