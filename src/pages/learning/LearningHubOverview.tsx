import { ArrowRight, BookOpen, HeartPulse, MessageCircle, Newspaper } from "lucide-react";
import { EditorialFrame, ConsultationCta } from "@/pages/editorial/shared";
import { guideTopics } from "@/data/learningResources";
import { ResourceCards } from "./LearningPages";

const directories = [
  { title: "Guides", href: "/blogs/guides", Icon: BookOpen, body: "Start-to-finish explanations of an accident, the evidence and the claim process." },
  { title: "FAQs", href: "/faqs", Icon: MessageCircle, body: "Focused answers about treatment, insurance, hiring a lawyer and an ongoing case." },
  { title: "Injury Types", href: "/injury-types", Icon: HeartPulse, body: "Understand an injury, its documentation and the questions it raises for a claim." },
  { title: "Blogs", href: "/blogs", Icon: Newspaper, body: "Explore individual legal questions, practical explanations and California accident topics." },
];
export default function LearningHubOverview() {
  const featured = ["ca-personal-injury-101", "ca-car-accident-101", "ca-motorcycle-accident-101"].flatMap(slug => guideTopics.filter(r => r.slug === slug));
  return <EditorialFrame locale="en"><main className="detail-guide learning-hub">
    <header className="resource-intro site-shell"><a className="resource-back" href="/">← Home</a><h1>Legal Resources To Guide You All The Way</h1><p>Get answers, clarity and confidence. Explore guides, FAQs, injury explanations and articles to understand your rights and the next step.</p></header>
    <section className="site-shell pb-12 md:pb-16" aria-labelledby="browse-resources"><h2 id="browse-resources" className="editorial-serif mb-8 text-3xl">Browse by what you need.</h2><div className="grid gap-x-10 gap-y-8 md:grid-cols-2">{directories.map(({title,href,Icon,body})=><a href={href} key={href} className="border-y border-foreground/15 py-6"><Icon size={26} aria-hidden="true" className="mb-5 text-[#755D46]"/><div className="flex items-center justify-between gap-4"><h3 className="editorial-serif text-2xl">{title}</h3><ArrowRight size={18} aria-hidden="true"/></div><p className="mt-3 max-w-xl text-sm leading-7 text-foreground/70">{body}</p></a>)}</div></section>
    <section className="site-shell border-t border-foreground/15 py-12 md:py-16"><h2 className="editorial-serif mb-3 text-3xl">Start with the bigger picture.</h2><p className="mb-9 max-w-2xl text-base leading-7 text-foreground/70">Choose the guide that matches your situation, then follow its links to a specific injury, question or practice area.</p><ResourceCards topics={featured}/></section>
    <section className="site-shell border-t border-foreground/15 py-10"><h2 className="editorial-serif text-2xl">Looking for legal help?</h2><p className="mt-4 max-w-2xl leading-8">The resources explain the subject. Our <a className="underline underline-offset-4" href="/practice-areas">practice areas</a> explain the help available. You can also read <a className="underline underline-offset-4" href="/about/what-to-expect">what to expect from a claim</a> before deciding what to do next.</p></section>
    <ConsultationCta locale="en"/>
  </main></EditorialFrame>;
}
