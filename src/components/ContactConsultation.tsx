import { CalendarDays, Mail, Phone } from "lucide-react";
import consultationPhoto from "@/assets/law-firm/attorney-client-talking.jpg";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import WebsiteInquiryForm from "@/components/WebsiteInquiryForm";
import { brand, type SiteLocale } from "@/data/injurySite";
import { responsiveImageProps } from "@/lib/responsive-images";

const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/GpAHipyEcevlPgeso3ZO";
const copy = {
  en: {
    contact: "Contact",
    heading: "Get your free consultation",
    intro: "Talk with Howard Choi about what happened and what comes next. Call the Buena Park office, choose a consultation time, or send us a message.",
    photoAlt: "People reviewing documents together during a consultation",
    schedule: "Schedule a free consultation",
    scheduleIntro: "Choose an available date and time below.",
    openCalendar: "Open booking calendar in a new tab",
    message: "Send a message",
    messageIntro: "Briefly tell us what happened and how we can reach you. Please leave out confidential details.",
  },
  ko: {
    contact: "문의",
    heading: "무료 상담을 받아보세요",
    intro: "사고 경위와 다음 단계에 대해 Howard Choi 변호사와 이야기해 보세요. 부에나파크 사무실에 전화하거나 상담 시간을 예약하거나 메시지를 보내실 수 있습니다.",
    photoAlt: "상담 중 함께 서류를 검토하는 사람들",
    schedule: "무료 상담 예약",
    scheduleIntro: "아래에서 예약 가능한 날짜와 시간을 선택하세요.",
    openCalendar: "새 탭에서 예약 달력 열기",
    message: "메시지 보내기",
    messageIntro: "사고 경위와 연락 방법을 간단히 알려주세요. 기밀 정보는 보내지 마세요.",
  },
  es: {
    contact: "Contacto",
    heading: "Solicite su consulta gratuita",
    intro: "Hable con Howard Choi sobre lo que ocurrió y los próximos pasos. Llame a la oficina de Buena Park, reserve una consulta o envíenos un mensaje.",
    photoAlt: "Personas revisando documentos durante una consulta",
    schedule: "Reserve una consulta gratuita",
    scheduleIntro: "Elija una fecha y hora disponibles.",
    openCalendar: "Abrir el calendario de reservas en una pestaña nueva",
    message: "Envíe un mensaje",
    messageIntro: "Cuéntenos brevemente qué ocurrió y cómo podemos comunicarnos con usted. Evite incluir información confidencial.",
  },
};

export default function ContactConsultation({ locale }: { locale: SiteLocale }) {
  const labels = copy[locale];
  const headingStyle = locale === "ko" ? { fontFamily: '"Noto Serif KR", serif' } : undefined;
  const linkStyle = "underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground";

  return (
    <div className="mx-auto grid max-w-7xl rounded-3xl border border-foreground/15 bg-[#fdfbf7] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <section aria-labelledby="contact-heading" className="min-w-0 px-5 py-7 sm:p-8 lg:p-10 xl:p-12">
        <PageBreadcrumb locale={locale} title={labels.contact} />
        <h1 id="contact-heading" style={headingStyle} className="editorial-serif text-balance text-[clamp(2.6rem,4.6vw,4.8rem)] leading-[1.04]">
          {labels.heading}
        </h1>
        <p className="mt-5 max-w-md text-pretty text-base leading-7 text-foreground/75">{labels.intro}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href={brand.phoneHref} className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#2b241e] px-5 text-sm font-semibold text-[#f9f4eb] hover:bg-[#47382c]">
            <Phone aria-hidden="true" className="size-4" />
            {brand.phoneDisplay}
          </a>
          <a href="#message" className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-[#2b241e]/30 bg-white px-5 text-sm font-semibold text-[#2b241e] hover:border-[#2b241e]/60 hover:bg-[#efe9df] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2b241e]">
            <Mail aria-hidden="true" className="size-4" />
            {labels.message}
          </a>
        </div>
        <div className="mt-7 hidden sm:block">
          <img
            {...responsiveImageProps(consultationPhoto, "(min-width: 1024px) 420px, 720px")}
            src={consultationPhoto}
            alt={labels.photoAlt}
            className="aspect-[3/2] w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <div className="min-w-0 rounded-b-3xl border-t border-foreground/15 bg-white/60 px-4 py-7 sm:p-8 lg:rounded-bl-none lg:rounded-r-3xl lg:border-l lg:border-t-0 lg:p-8 xl:p-10">
        <section id="calendar" aria-labelledby="calendar-heading" className="scroll-mt-28">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#efe9df] text-[#2b241e]">
              <CalendarDays aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h2 id="calendar-heading" style={headingStyle} className="editorial-serif text-balance text-3xl leading-tight">{labels.schedule}</h2>
              <p className="mt-1 text-sm leading-6 text-foreground/70">{labels.scheduleIntro}</p>
            </div>
          </div>
          {/* Keep the inline booking frame in the column while the vendor script controls its height. */}
          <iframe
            id="GpAHipyEcevlPgeso3ZO_1794624865778"
            src={bookingUrl}
            title={labels.schedule}
            allow="payment"
            height={760}
            scrolling="no"
            className="!pointer-events-auto !visible !relative !left-auto mt-5 block !opacity-100"
            style={{ width: "100%", border: 0, overflow: "hidden" }}
          />
          <a href={bookingUrl} target="_blank" rel="noreferrer" className={`mt-3 inline-block text-sm ${linkStyle}`}>
            {labels.openCalendar}
          </a>
        </section>

        <section id="message" aria-labelledby="message-heading" tabIndex={-1} className="mt-8 scroll-mt-32 rounded-2xl border border-[#2b241e]/15 bg-[#f1ece3] p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#2b241e]">
              <Mail aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h2 id="message-heading" style={headingStyle} className="editorial-serif text-balance text-3xl leading-tight">{labels.message}</h2>
              <p className="mt-1 max-w-xl text-pretty text-sm leading-6 text-foreground/75">{labels.messageIntro}</p>
            </div>
          </div>
          <WebsiteInquiryForm locale={locale} prominentSubmit />
        </section>
      </div>
    </div>
  );
}
