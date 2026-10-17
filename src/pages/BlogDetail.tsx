import { responsiveImageProps } from "@/lib/responsive-images";
import { m as motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts, getBlogBySlug } from "@/data/blogs";
import brandLogo from "@/assets/law-firm/howard-choi-logo.png";

type ArticleSupport = {
  relatedHref: string;
  relatedLabel: string;
  relatedBody: string;
  sources: Array<{ label: string; href: string }>;
};

const articleSupport: Record<string, ArticleSupport> = {
  "how-long-car-accident-settlement-takes-california": {
    relatedHref: "/practice-areas/car-accidents",
    relatedLabel: "Buena Park car accident lawyer",
    relatedBody: "Learn how responsibility, insurer coverage, medical documentation and evidence preservation fit into an accident claim.",
    sources: [
      { label: "California Department of Insurance · So You've Had an Accident, What's Next?", href: "https://www.insurance.ca.gov/01-consumers/105-type/95-guides/01-auto/hadaccident.cfm" },
      { label: "California Department of Insurance · Fair Claims Settlement Practices Regulations", href: "https://www.insurance.ca.gov/01-consumers/130-laws-regs-hearings/05-CCR/fair-claims-regs.cfm" },
      { label: "California Courts · Personal injury claims, evidence and damages", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury" },
      { label: "California Courts · Steps to sue someone", href: "https://selfhelp.courts.ca.gov/fil/node/1531" },
      { label: "California Courts · Discovery in civil cases", href: "https://www.selfhelp.courts.ca.gov/discovery-civil" },
      { label: "California Courts · Government claim deadlines", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/government-claim" },
      { label: "California DMV · Report of Traffic Accident (SR-1)", href: "https://www.dmv.ca.gov/portal/dmv-virtual-office/accident-reporting/" },
      { label: "California DHCS · Personal Injury Program", href: "https://www.dhcs.ca.gov/services/personal-injury-program/" },
      { label: "California DHCS · Medi-Cal injury lien process", href: "https://www.dhcs.ca.gov/services/the-personal-injury-lien-process/" },
    ],
  },
  "traumatic-brain-injury-evidence-after-california-accident": {
    relatedHref: "/practice-areas/serious-injuries",
    relatedLabel: "Brain and catastrophic injury claims in Buena Park",
    relatedBody: "Understand how serious-injury claims address the underlying accident, medical evaluation, future care and long-term function.",
    sources: [
      { label: "CDC · Mild TBI: symptoms and emergency danger signs", href: "https://www.cdc.gov/traumatic-brain-injury/signs-symptoms/index.html" },
      { label: "CDC · Diagnosis and evaluation of mild TBI", href: "https://www.cdc.gov/traumatic-brain-injury/about/index.html" },
      { label: "CDC · Recovery from moderate or severe TBI", href: "https://www.cdc.gov/traumatic-brain-injury/response/moderate-severe-tbi.html" },
      { label: "California Courts · Personal injury and evidence", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury" },
      { label: "California Courts · Statutes of limitations", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations" },
    ],
  },
  "california-bicycle-accident-evidence-and-insurance": {
    relatedHref: "/practice-areas",
    relatedLabel: "Explore Buena Park injury practice areas",
    relatedBody: "Review the practice areas actually offered by the firm. Bicycle claims require separate confirmation before this draft can be published.",
    sources: [
      { label: "California Vehicle Code · Bicycle operating rules (sections 21200–21214.7)", href: "https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?article=4.&chapter=1.&division=11.&lawCode=VEH" },
      { label: "Caltrans · Codes and bicycle road-use laws", href: "https://dot.ca.gov/programs/local-assistance/fed-and-state-programs/bike-program/codes-laws-and-regulations" },
      { label: "CHP · Request a traffic crash report", href: "https://www.chp.ca.gov/traffic/request-a-crash-report/" },
      { label: "California DMV · SR-1 reporting requirements", href: "https://www.dmv.ca.gov/portal/dmv-virtual-office/accident-reporting/" },
      { label: "California Courts · Personal injury cases", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury" },
    ],
  },
  "california-uninsured-driver-hit-and-run-injury-claims": {
    relatedHref: "/practice-areas/car-accidents",
    relatedLabel: "Buena Park car accident claims",
    relatedBody: "Explore how collision evidence, disputed fault, uninsured drivers and possible injury compensation are considered.",
    sources: [
      { label: "California Department of Insurance · Automobile insurance and UM/UIM coverage", href: "https://www.insurance.ca.gov/01-consumers/105-type/95-guides/01-auto/auto101.cfm" },
      { label: "California Department of Insurance · After an accident", href: "https://www.insurance.ca.gov/01-consumers/105-type/95-guides/01-auto/hadaccident.cfm" },
      { label: "California DMV · SR-1 reporting requirements", href: "https://www.dmv.ca.gov/portal/dmv-virtual-office/accident-reporting/" },
      { label: "California Courts · Personal injury lawsuits", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury" },
      { label: "California Courts · Statutes of limitations", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations" },
    ],
  },
  "what-to-do-after-a-car-accident-in-california": {
    relatedHref: "/practice-areas/car-accidents",
    relatedLabel: "Buena Park car accident lawyers",
    relatedBody: "See the evidence, insurance, damages, deadlines, and common questions that can matter in a California car-accident claim.",
    sources: [
      { label: "California DMV · Report of Traffic Accident (SR-1)", href: "https://www.dmv.ca.gov/portal/dmv-virtual-office/accident-reporting/" },
      { label: "California Courts · Personal injury lawsuits", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury" },
    ],
  },
  "california-comparative-fault-personal-injury": {
    relatedHref: "/practice-areas/car-accidents",
    relatedLabel: "Car accident claims and disputed fault",
    relatedBody: "See how fault evidence, insurance, medical losses, and comparative-responsibility questions fit into a broader accident claim.",
    sources: [
      { label: "Judicial Council of California · Civil jury instructions", href: "https://courts.ca.gov/partners/california-jury-instructions/civil-jury-instructions-resource-center/civil-jury-instructions" },
      { label: "California Courts · Personal injury lawsuits", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury" },
    ],
  },
  "california-personal-injury-deadlines": {
    relatedHref: "/practice-areas",
    relatedLabel: "Personal injury practice areas",
    relatedBody: "Different accidents raise different evidence and insurance issues. Start with the guide that matches the type of claim you are dealing with.",
    sources: [
      { label: "California Courts · Statutes of limitations", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations" },
      { label: "California Courts · Personal injury lawsuits", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury" },
    ],
  },
  "how-much-is-my-personal-injury-case-worth-california": {
    relatedHref: "/case-value-calculator",
    relatedLabel: "California case-value calculator",
    relatedBody: "Use the educational estimator to see how medical costs, wage loss, treatment, future losses, severity, and comparative fault can change a rough range.",
    sources: [
      { label: "Judicial Council of California · Civil jury instructions", href: "https://courts.ca.gov/partners/california-jury-instructions/civil-jury-instructions-resource-center/civil-jury-instructions" },
      { label: "California Courts · Personal injury lawsuits", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury" },
    ],
  },
  "truck-accident-evidence-eld-records-california": {
    relatedHref: "/practice-areas/truck-accidents",
    relatedLabel: "Buena Park truck accident lawyers",
    relatedBody: "See how commercial-driver records, carrier responsibility, insurance, serious injuries, and evidence preservation fit together in a truck claim.",
    sources: [
      { label: "FMCSA · Electronic logging device fact sheet", href: "https://www.fmcsa.dot.gov/hours-service/elds/eld-fact-sheet-english-version" },
      { label: "California Courts · Personal injury lawsuits", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury" },
    ],
  },
  "uber-lyft-accident-insurance-california": {
    relatedHref: "/practice-areas/rideshare-accidents",
    relatedLabel: "Buena Park Uber & Lyft accident lawyers",
    relatedBody: "See why app status, trip records, overlapping insurance, and ordinary collision evidence all matter in a rideshare injury claim.",
    sources: [
      { label: "California Public Utilities Commission · TNC insurance requirements", href: "https://www.cpuc.ca.gov/regulatory-services/licensing/transportation-licensing-and-analysis-branch/transportation-network-companies/tnc-insurance-requirements" },
      { label: "California Courts · Personal injury lawsuits", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury" },
    ],
  },
};

const BlogDetail = () => {
  const { slug } = useParams();
  const post = slug ? getBlogBySlug(slug) : undefined;
  const articleRef = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({ target: articleRef, offset: ["start start", "end end"] });
  const imageY = useTransform(scrollY, [0, 1000], [0, 130]);
  const imageScale = useTransform(scrollY, [0, 1000], [1, 1.025]);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center"><div className="editorial-serif text-4xl">Article not found.</div><Link to="/blogs" className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to insights</Link></div>
      </div>
    );
  }

  const related = blogPosts.find((item) => item.slug !== post.slug);
  const support = articleSupport[post.slug];

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Navigation />
      <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-[#8b7864]" style={{ scaleX: scrollYProgress }} />

      <article ref={articleRef} className="legal-blog-article relative">
        <header className="relative flex min-h-[460px] items-end overflow-hidden bg-[#17130f] text-[#f3eee5] md:sticky md:top-0 md:h-[66svh] md:min-h-[540px]">
          <motion.img {...responsiveImageProps(post.image)} src={post.image} alt={post.alt} style={{ y: imageY, scale: imageScale }} fetchPriority="high" decoding="async" className="absolute inset-0 h-[118%] w-full object-cover" />
          <div className="absolute inset-0 bg-[#17130f]/64" /><div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/88 via-[#17130f]/10 to-[#17130f]/18" /><div className="hero-bottom-readability" />
          <div className="site-shell relative z-10 pb-9 pt-28 md:pb-16 md:pt-0">
            <Link to="/blogs" className="mb-7 inline-flex items-center gap-2 text-[12px] text-[#f3eee5]/62 transition-colors hover:text-[#f3eee5]"><ArrowLeft className="h-3.5 w-3.5" /> Back to journal</Link>
            <div className="max-w-[860px]">
              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-[#f3eee5]/60"><span>{post.category}</span><span>·</span><span>{post.date}</span><span>·</span><span>{post.readingTime}</span></div>
              <PageBreadcrumb locale="en" title={post.title} /><h1 className="editorial-serif text-[clamp(2.85rem,4.8vw,5rem)] leading-[0.93] tracking-[-0.026em]">{post.title}</h1>
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
                    <div><div className="text-foreground/38">Practice</div><div className="mt-1 text-foreground/76">{post.category}</div></div>
                    <div><div className="text-foreground/38">Published</div><div className="mt-1 text-foreground/76">{post.date}</div></div>
                    {post.updatedAt !== post.publishedAt && <div><div className="text-foreground/38">Updated</div><div className="mt-1 text-foreground/76">{new Date(`${post.updatedAt}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</div></div>}
                    <div><div className="text-foreground/38">Publisher</div><div className="mt-1 text-foreground/76">Buena Park Injury Lawyer</div></div>
                    <div><div className="text-foreground/38">Reading time</div><div className="mt-1 text-foreground/76">{post.readingTime}</div></div>
                  </div>
                  <div className="pt-6">
                    <div className="mb-4 text-[10px] uppercase tracking-[0.15em] text-foreground/38">In this article</div>
                    <nav className="space-y-3">{post.sections.map((section, index) => <a key={section.heading} href={`#article-section-${index + 1}`} className="group flex gap-3 text-[12px] leading-5 text-foreground/48 transition-colors hover:text-foreground"><span className="text-foreground/26">0{index + 1}</span><span>{section.heading}</span></a>)}</nav>
                  </div>
                </div>
              </aside>

              <div className="min-w-0">
                <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-foreground/12 pb-5 text-[12px] leading-5 text-foreground/65">
                  <span>Published by Buena Park Injury Lawyer</span>
                  <Link to="/attorney" className="font-medium text-foreground underline underline-offset-4">Meet attorney Howard Choi</Link>
                  <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Verify California State Bar No. 284364</a>
                </div>
                <details className="mb-8 border-y border-foreground/12 py-3 lg:hidden">
                  <summary className="cursor-pointer py-2 text-[15px] font-semibold text-foreground">Browse sections in this guide</summary>
                  <nav aria-label="Article sections" className="grid gap-2 pb-3 pt-4">
                    {post.sections.map((section, index) => (
                      <a key={section.heading} href={`#article-section-${index + 1}`} className="flex min-h-11 items-start gap-3 border-b border-foreground/10 px-1 py-2 text-[14px] leading-6 text-foreground/80">
                        <span className="w-7 shrink-0 tabular-nums text-foreground/45">{String(index + 1).padStart(2, "0")}</span>
                        <span>{section.heading}</span>
                      </a>
                    ))}
                  </nav>
                </details>
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.68 }}>
                  <div className="mb-5 flex items-center gap-3 text-[11px] text-foreground/42 lg:hidden"><span>{post.category}</span><span>·</span><span>{post.readingTime}</span></div>
                  <p className="editorial-serif text-[clamp(1.62rem,2.2vw,2.18rem)] leading-[1.17] tracking-[-0.014em] text-foreground/94">{post.intro}</p>
                </motion.div>

                {post.leadParagraphs.length > 0 && (
                  <div className="mt-8 max-w-[730px] space-y-5 text-[17px] leading-[1.75] text-foreground/84 md:text-[18px]">
                    {post.leadParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                  </div>
                )}

                <motion.blockquote initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.62 }} className="my-10 rounded-[3px] bg-[#1a1714] px-7 py-8 text-[#f3eee5] md:my-12 md:px-9 md:py-10">
                  <div className="mb-5 text-[10px] uppercase tracking-[0.16em] text-[#f3eee5]/38">Key point</div>
                  <p className="editorial-serif max-w-[680px] text-[clamp(1.8rem,2.65vw,2.65rem)] leading-[1.04] tracking-[-0.018em]">“{post.takeaway}”</p>
                </motion.blockquote>

                <div className="border-t border-foreground/12">
                  {post.sections.map((section, index) => (
                    <motion.section id={`article-section-${index + 1}`} key={section.heading} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.62 }} className="scroll-mt-28 border-b border-foreground/10 py-10 last:border-b-0 md:py-12">
                      <div className="mb-4 flex items-center gap-3"><span className="text-[11px] tracking-[0.12em] text-foreground/34">0{index + 1}</span><span className="h-px w-8 bg-foreground/12" /></div>
                      <h2 className="editorial-serif max-w-[700px] text-[clamp(2.05rem,3vw,3.15rem)] leading-[0.98] tracking-[-0.022em] text-foreground">{section.heading}</h2>
                      <div className="article-reading-width mt-6 max-w-[730px] space-y-6 text-[17px] leading-[1.75] text-foreground/84 md:text-[18px]">
                        {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraph} className={index === 0 && paragraphIndex === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-serif first-letter:text-[4.1rem] first-letter:leading-[0.72] first-letter:text-foreground" : undefined}>{paragraph}</p>)}
                      </div>
                    </motion.section>
                  ))}
                </div>

                {support && (
                  <div className="mt-10 grid gap-5 md:grid-cols-2">
                    <div className="rounded-[3px] bg-[#e9e6e1] p-7 md:p-8">
                      <div className="text-[10px] uppercase tracking-[0.15em] text-foreground/38">Related legal help</div>
                      <h2 className="editorial-serif mt-5 text-[1.8rem] leading-[1.02]">{support.relatedLabel}</h2>
                      <p className="mt-4 text-[13px] leading-6 text-foreground/58">{support.relatedBody}</p>
                      <Link to={support.relatedHref} className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium">Explore this guide <ArrowRight className="h-4 w-4" /></Link>
                    </div>
                    <div className="rounded-[3px] border border-foreground/10 p-7 md:p-8">
                      <div className="text-[10px] uppercase tracking-[0.15em] text-foreground/38">Primary sources</div>
                      <div className="mt-5 border-t border-foreground/10">
                        {support.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 border-b border-foreground/10 py-4 text-[12px] leading-5"><span>{source.label}</span><ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" /></a>)}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-10 rounded-[3px] bg-[#e9e6e1] p-7 md:p-8">
                  <div className="flex items-start gap-4">
                    <img {...responsiveImageProps(brandLogo, "28px")} src={brandLogo} alt="" width={42} height={42} loading="lazy" decoding="async" className="h-10 w-10 shrink-0 object-contain" />
                    <div><div className="text-[12px] font-medium text-foreground">Buena Park Injury Lawyer</div><div className="mt-1 text-[12px] text-foreground/46">California accident &amp; injury legal information</div><p className="mt-4 max-w-[590px] text-[13px] leading-6 text-foreground/58">Practical legal guidance for people navigating accident claims, insurance, evidence, deadlines, medical documentation, and recovery in California. Attorney licensing information is available on the <Link to="/attorney" className="underline underline-offset-2">attorneys page</Link>.</p></div>
                  </div>
                </div>

                <div className="mt-8 border-t border-foreground/12 pt-6 text-[12px] leading-5 text-foreground/46">This article is general information only and is not legal advice. Specific matters depend on their own facts, deadlines, defendants, insurance, and applicable law.</div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {related && (
        <section className="relative z-10 border-t border-foreground/10 bg-[#e9e6e1] py-14 md:py-18">
          <div className="site-shell"><span className="text-[11px] text-foreground/44">Read next</span><Link to={`/blogs/${related.slug}`} className="group mt-4 grid gap-7 lg:grid-cols-[1fr_0.7fr] lg:items-end"><h2 className="editorial-serif max-w-[760px] text-[clamp(2.25rem,3.5vw,3.8rem)] leading-[0.96] tracking-[-0.023em]">{related.title}</h2><div className="flex items-center justify-between border-t border-foreground/15 pt-4 text-[12px] text-foreground/64"><span>{related.category}</span><span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">Read article <ArrowRight className="h-4 w-4" /></span></div></Link></div>
        </section>
      )}

      <div className="relative z-10"><Footer /></div>
    </div>
  );
};

export default BlogDetail;
