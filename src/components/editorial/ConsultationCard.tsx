import { ArrowUpRight } from "lucide-react";
import { type SiteLocale } from "@/data/injurySite";

/** One primary action. Shared by service, resource, firm and article sidebars. */
export function ConsultationCard({ locale = "en" }: { locale?: SiteLocale }) {
  const copy = locale === "ko"
    ? { title: "다음 단계를 함께 알아보세요.", body: "사고에 관한 질문을 사무실과 상담하세요.", button: "무료 상담", note: "배상금을 회수한 경우에만 변호사 수임료가 발생합니다." }
    : locale === "es"
    ? { title: "Sepa qué hacer ahora.", body: "Hable con nuestra oficina sobre su accidente y sus preguntas.", button: "Consulta gratuita", note: "No hay honorarios de abogado a menos que haya una recuperación." }
    : { title: "Let’s talk about your next step.", body: "Have questions after an accident? Start with a conversation.", button: "Free consultation", note: "No attorney fee unless there is a recovery." };
  return <div className="consultation-card"><span className="consultation-card__eyebrow">Howard Choi</span><h2>{copy.title}</h2><p>{copy.body}</p><a href={`${locale === "en" ? "" : "/" + locale}/contact`}>{copy.button}<ArrowUpRight aria-hidden="true" size={18}/></a><small>{copy.note}</small></div>;
}
