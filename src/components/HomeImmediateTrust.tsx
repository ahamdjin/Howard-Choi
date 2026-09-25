import { BadgeCheck, Clock, Languages, Scale } from "lucide-react";
import type { SiteLocale } from "@/data/injurySite";

// Slot 2: client-facing trust promises. Institutional credentials live in
// TrustBadges (slot 3), the full attorney bio in DirectAccess (slot 8).
// Root is <aside>, not <section>: .home-page section is forced to
// min-height:calc(100svh - 60px) under 768px in index.css.
const promises = [
  { icon: Scale, label: "Free consultation", detail: "No cost to ask", koLabel: "무료 상담", koDetail: "문의에는 비용이 들지 않습니다" },
  { icon: BadgeCheck, label: "No attorney fee unless there is a recovery", detail: "Contingency fee", koLabel: "배상을 받지 못하면 수임료가 없습니다", koDetail: "성공보수제" },
  { icon: Languages, label: "English, Korean & Spanish", detail: "Supported by our staff", koLabel: "영어 · 한국어 · 스페인어", koDetail: "직원들이 상담을 지원합니다" },
  { icon: Clock, label: "Deadlines matter", detail: "Two years in most CA injury cases", koLabel: "기한이 중요합니다", koDetail: "캘리포니아 상해 소송은 보통 2년" },
] as const;

const HomeImmediateTrust = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  return (
  <aside aria-label={ko ? "이 로펌을 신뢰할 수 있는 이유" : "Why clients can trust this firm"} className="bg-[#f7f6f3] text-foreground">
    <div className="site-shell py-8 md:py-10">
      <div className="grid gap-px border-y border-foreground/12 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
        {promises.map(({ icon: Icon, label, detail, koLabel, koDetail }) => (
          <div key={label} className="flex items-start gap-3.5 bg-[#f7f6f3] px-5 py-6">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-foreground/45" strokeWidth={1.6} />
            <div>
              <div className="text-[13px] font-medium leading-5 tracking-[-0.01em] text-foreground">{ko ? koLabel : label}</div>
              <div className="mt-1 text-[11px] leading-4 text-foreground/45">{ko ? koDetail : detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </aside>
  );
};

export default HomeImmediateTrust;
