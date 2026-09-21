import { BadgeCheck, Clock, Languages, Scale } from "lucide-react";

// Slot 2: client-facing trust promises. Institutional credentials live in
// TrustBadges (slot 3), the full attorney bio in DirectAccess (slot 8).
// Root is <aside>, not <section>: .home-page section is forced to
// min-height:calc(100svh - 60px) under 768px in index.css.
const promises = [
  { icon: Scale, label: "Free consultation", detail: "No cost to ask" },
  { icon: BadgeCheck, label: "No attorney fee unless there is a recovery", detail: "Contingency fee" },
  { icon: Languages, label: "English & Korean", detail: "Spoken at the office" },
  { icon: Clock, label: "Deadlines matter", detail: "Two years in most CA injury cases" },
];

const HomeImmediateTrust = () => (
  <aside aria-label="Why clients can trust this firm" className="bg-[#f7f6f3] text-foreground">
    <div className="site-shell py-8 md:py-10">
      <div className="grid gap-px border-y border-foreground/12 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
        {promises.map(({ icon: Icon, label, detail }) => (
          <div key={label} className="flex items-start gap-3.5 bg-[#f7f6f3] px-5 py-6">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-foreground/45" strokeWidth={1.6} />
            <div>
              <div className="text-[13px] font-medium leading-5 tracking-[-0.01em] text-foreground">{label}</div>
              <div className="mt-1 text-[11px] leading-4 text-foreground/45">{detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </aside>
);

export default HomeImmediateTrust;
