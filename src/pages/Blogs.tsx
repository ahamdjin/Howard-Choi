import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogs";
import heroJusticeLibrary from "@/assets/law-firm/hero-justice-library.webp";

const resourcePaths = [
  { label: "I was just in an accident", body: "Start with immediate steps, evidence, treatment, insurance, and the records worth preserving.", href: "/blogs/what-to-do-after-a-car-accident-in-california" },
  { label: "Fault is being disputed", body: "Understand California comparative fault and why a disagreement over responsibility does not automatically end a claim.", href: "/blogs/california-comparative-fault-personal-injury" },
  { label: "I want to understand case value", body: "See the medical, financial, insurance, fault, and long-term factors that can affect an injury claim.", href: "/blogs/how-much-is-my-personal-injury-case-worth-california" },
  { label: "I am worried about deadlines", body: "Review California filing deadlines, government-claim timing, and why evidence can disappear long before a lawsuit is due.", href: "/blogs/california-personal-injury-deadlines" },
];

const Blogs = () => {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, 90]);
  const heroScale = useTransform(scrollY, [0, 900], [1, 1.018]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Navigation />
      <div className="relative">
        <div className="sticky top-0 h-[70svh] min-h-[620px] overflow-hidden bg-[#17130f] text-[#f3eee5]">
          <motion.img src={heroJusticeLibrary} alt="Law library and Lady Justice" style={{ y: imageY, scale: heroScale }} fetchPriority="high" decoding="async" className="absolute inset-0 h-[112%] w-full object-cover object-center" />
          <div className="absolute inset-0 bg-[#17130f]/58" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/90 via-[#17130f]/14 to-[#17130f]/22" />
          <div className="hero-bottom-readability" />
          <div className="site-shell relative z-10 flex h-full items-end pb-10 pt-[72px] md:pb-12 lg:pb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72 }} className="grid w-full gap-8 border-t border-white/18 pt-5 lg:grid-cols-[0.38fr_1.62fr] lg:gap-12 xl:gap-16">
              <div><span className="text-[9px] font-medium uppercase tracking-[0.17em] text-[#f3eee5]/48">Legal resources</span><div className="mt-4 hidden text-[10px] leading-5 text-[#f3eee5]/34 lg:block">California injury-law guides<br />Buena Park, California</div></div>
              <div className="max-w-[980px]"><h1 className="editorial-serif text-[clamp(2.35rem,3.45vw,3.9rem)] leading-[1] tracking-[-0.026em]">Clear answers for the questions that follow an accident.</h1><p className="mt-5 max-w-[700px] text-[14px] leading-6 text-[#f3eee5]/67 md:text-[15px] md:leading-7">Practical California information about accident claims, insurance, evidence, deadlines, injuries, and case value—supported by primary legal and agency sources inside each guide.</p></div>
            </motion.div>
          </div>
        </div>

        <main className="relative z-10 bg-background py-16 md:py-20 lg:py-24">
          <div className="site-shell">
            <section className="mb-16 border-b border-foreground/12 pb-16 md:mb-20 md:pb-20">
              <div className="grid gap-6 lg:grid-cols-[0.38fr_1.62fr] lg:gap-12 xl:gap-16">
                <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Start with your question</span>
                <div>
                  <h2 className="editorial-serif max-w-[760px] text-[clamp(1.9rem,2.6vw,2.8rem)] leading-[1.05] tracking-[-0.022em]">Find the guide that matches what you need to understand now.</h2>
                  <div className="mt-9 grid border-t border-foreground/12 sm:grid-cols-2">
                    {resourcePaths.map((item, index) => (
                      <Link key={item.href} to={item.href} className="group border-b border-foreground/12 py-6 sm:border-l sm:px-6 sm:odd:border-l-0 sm:odd:pl-0">
                        <div className="flex items-center justify-between text-[9px] text-foreground/28"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></div>
                        <h3 className="editorial-serif mt-7 text-[1.45rem] leading-tight">{item.label}</h3>
                        <p className="mt-3 max-w-[460px] text-[11px] leading-5 text-foreground/50">{item.body}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[12px]">
                    <Link to="/practice-areas" className="inline-flex items-center gap-2 hover:opacity-60">Browse personal injury practice areas <ArrowRight className="h-3.5 w-3.5" /></Link>
                    <Link to="/case-value-calculator" className="inline-flex items-center gap-2 hover:opacity-60">Use the case-value calculator <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid gap-5 border-b border-foreground/12 pb-6 lg:grid-cols-[0.38fr_1.62fr] lg:gap-12 xl:gap-16">
              <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">All guides</span>
              <div className="flex items-end justify-between gap-6"><h2 className="editorial-serif text-[clamp(1.8rem,2.35vw,2.45rem)] leading-[1.08] tracking-[-0.02em]">California injury law, explained clearly.</h2><span className="hidden text-[10px] text-muted-foreground sm:block">{blogPosts.length} articles</span></div>
            </div>

            <div className="divide-y divide-foreground/12">
              {blogPosts.map((post, index) => (
                <motion.article key={post.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.65, delay: index * 0.05 }} className="py-7 md:py-9 lg:py-10">
                  <Link to={`/blogs/${post.slug}`} className="group grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch lg:gap-10 xl:gap-14">
                    <div className="relative min-h-[280px] overflow-hidden bg-[#17130f] md:min-h-[340px]"><img src={post.image} alt={post.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.018]" /><div className="absolute inset-0 bg-[#17130f]/10 transition-colors duration-500 group-hover:bg-transparent" /></div>
                    <div className="flex min-h-[280px] flex-col justify-between py-1 md:min-h-[340px] lg:py-2">
                      <div><div className="mb-5 flex items-center gap-4 text-[10px] text-muted-foreground"><span>{String(index + 1).padStart(2, "0")}</span><span>{post.category}</span><span>·</span><span>{post.readingTime}</span></div><h2 className="editorial-serif max-w-[760px] text-[clamp(1.8rem,2.65vw,2.85rem)] leading-[1.02] tracking-[-0.022em]">{post.title}</h2><p className="mt-4 max-w-[650px] text-[13px] leading-6 text-foreground/60">{post.excerpt}</p></div>
                      <div className="mt-8 flex items-center justify-between border-t border-foreground/12 pt-4 text-[11px]"><span className="text-muted-foreground">{post.date}</span><span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">Read guide <ArrowRight className="h-3.5 w-3.5" /></span></div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;