import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  ["When should I speak with an injury lawyer after an accident?", "If you were injured, fault is disputed, an insurance company is asking for important information, or the accident is affecting your work or daily life, getting legal guidance early can help you understand the claim before key decisions are made."],
  ["What should I do first after a car accident?", "Prioritize safety and appropriate medical attention. When it is safe, preserve useful information such as photos, driver and insurance details, witness information, reports, and records of your treatment and accident-related expenses."],
  ["Should I talk to the insurance company myself?", "You may need to communicate with insurers, but it helps to know which company you are speaking with, what they are asking for, and what information you are providing. If responsibility, coverage, or injuries are disputed, legal advice can clarify your position."],
  ["What should I bring to an initial consultation?", "A simple timeline plus any photos, police or incident reports, insurance information, medical records you already have, and relevant correspondence is usually enough to begin. You do not need to have every document before asking for help."],
  ["What areas does Buena Park Injury Lawyer serve?", "The site's local focus is Buena Park, Fullerton, Anaheim, Cerritos, La Mirada, and La Habra. Whether a particular matter can be accepted also depends on its facts, jurisdiction, conflicts, and the firm's availability."],
];

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" ref={ref} className="bg-background pb-28 md:pb-36 lg:pb-44">
      <div className="site-shell">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mx-auto mb-12 max-w-xl text-center">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">After an accident</span>
          <h2 className="editorial-serif text-4xl leading-none md:text-5xl">Answers before your first call.</h2>
        </motion.div>
        <div className="mx-auto max-w-3xl divide-y divide-black/10 border-y border-black/10">
          {faqs.map(([question, answer], index) => {
            const active = open === index;
            return (
              <div key={question}>
                <button type="button" onClick={() => setOpen(active ? null : index)} className="flex w-full items-center justify-between gap-6 py-5 text-left text-sm">
                  <span>{question}</span>{active ? <Minus className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />}
                </button>
                <AnimatePresence initial={false}>{active && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="max-w-2xl pb-6 text-sm leading-6 text-muted-foreground">{answer}</p></motion.div>}</AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
