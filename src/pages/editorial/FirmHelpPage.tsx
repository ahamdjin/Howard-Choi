import { ArrowRight, ChevronDown, Check, Phone } from "lucide-react";
import { EditorialFrame } from "./shared";
import { injuryQuestions } from "@/data/anaheimLanding";
import { brand } from "@/data/injurySite";
import "../locations/anaheim-landing.css";

export default function FirmHelpPage({ fees = false }: { fees?: boolean }) {
  return <EditorialFrame locale="en"><main className="anaheim-landing">
    <section className="al-section al-shell">
      <nav aria-label="Breadcrumb" className="al-breadcrumb"><a href="/">Home</a><span>/</span><a href="/about">About</a><span>/</span><span aria-current="page">{fees ? "Zero Fee Guarantee" : "FAQs"}</span></nav>
      <span className="al-eyebrow">Buena Park Injury Lawyer</span>
      <h1 className="editorial-serif max-w-3xl text-5xl leading-tight md:text-7xl">{fees ? "No fee unless there is a recovery." : "Answers before your first call."}</h1>
      <p className="mt-6 max-w-2xl">{fees ? "Our Zero Fee Guarantee means Howard’s attorney fee depends on recovering compensation for your case. Start with a free consultation to understand your options." : "Learn about the first consultation, fees, the claim process and the questions to bring to Howard Choi."}</p>
    </section>
    {fees ? <section className="al-section al-warm"><div className="al-shell">
      <div className="al-support">
        {[["Free consultation","Tell us what happened and ask your questions before deciding whether to hire the firm."],["No recovery, no attorney fee","You do not owe an attorney fee if your case does not recover compensation."],["Understand the agreement","Review the written fee arrangement before representation begins. Ask the office to explain anything that is unclear."],["Your decision","A consultation lets you understand the next steps and decide whether the firm is the right fit."]].map(([title,text])=><div key={title}><Check size={26}/><h2 className="!text-3xl">{title}</h2><p>{text}</p></div>)}
      </div><a className="al-text-link" href="/about/faqs">More questions about working with us <ArrowRight size={17}/></a>
    </div></section> : <section className="al-section al-warm"><div className="al-shell al-faq-grid"><div><h2>Start with the<br/>question on your mind.</h2><p>For city-specific reports and evidence, visit your <a href="/locations" className="underline">local injury guide</a>. For the steps of a claim, see <a href="/about/what-to-expect" className="underline">What to Expect</a>.</p></div><div className="al-faqs">{injuryQuestions.map(([q,a])=><details key={q}><summary>{q}<ChevronDown size={18} aria-hidden="true"/></summary><p>{a}</p></details>)}</div></div></section>}
    <section className="al-final"><div className="al-shell"><h2>Let’s talk about your case.</h2><div className="al-actions"><a href="/contact" className="al-button al-button-light">Free consultation <ArrowRight size={17}/></a><a href={brand.phoneHref} className="al-phone"><Phone size={17}/>{brand.phoneDisplay}</a></div></div></section>
  </main></EditorialFrame>;
}
