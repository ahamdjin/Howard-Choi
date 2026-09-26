import { ArrowRight, CalendarDays, Check, FileText, MapPin, MessageCircle, Phone, Scale } from "lucide-react";
import { brand, practiceAreas, type SiteLocale } from "@/data/injurySite";
import { practiceMedia } from "@/data/practiceMedia";
import { esPracticeContent } from "@/data/esPracticeContent";
import reviewingDocuments from "@/assets/law-firm/reviewing-documents.jpg";

export default function AttorneyContent({ locale }: { locale: SiteLocale }) {
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  const links = [
    ["profile", ko ? "프로필" : es ? "Perfil" : "Profile"],
    ["how-we-help", ko ? "진행 방식" : es ? "Cómo ayudamos" : "How we help"],
    ["attorney-practice", ko ? "업무 분야" : es ? "Áreas de práctica" : "Practice areas"],
    ["consultation", ko ? "상담 준비" : es ? "Su consulta" : "Your consultation"],
  ];
  const steps = [
    { Icon: MessageCircle, title: ko ? "사고 경위 듣기" : es ? "Hablar sobre el accidente" : "Talk through the accident", text: ko ? "사고 경위와 현재 가장 궁금한 점부터 이야기하세요." : es ? "Empiece por lo que ocurrió y las preguntas que tiene ahora." : "Start with what happened and the questions on your mind." },
    { Icon: FileText, title: ko ? "기록 살펴보기" : es ? "Revisar la información" : "Review the information", text: ko ? "사진, 치료 기록과 보험 관련 서류를 함께 살펴봅니다." : es ? "Revise fotos, expedientes de tratamiento y comunicaciones del seguro." : "Look at the photos, treatment records, and insurance correspondence." },
    { Icon: Scale, title: ko ? "다음 단계 확인" : es ? "Hablar del siguiente paso" : "Discuss the next step", text: ko ? "어떤 정보가 더 필요한지와 가능한 진행 방향을 확인합니다." : es ? "Identifique qué necesita una revisión más cercana y las posibles formas de avanzar." : "Identify what needs a closer look and discuss possible ways forward." },
  ];
  return <div className="attorney-content">
    <nav aria-label={ko ? "변호사 페이지 안내" : es ? "Secciones de la página del abogado" : "Attorney page sections"} className="border-b border-[#211c17]/10 bg-[#f3eee5]">
      <div className="attorney-content-shell flex flex-wrap justify-center gap-x-8 gap-y-1 py-3">{links.map(([id, label]) => <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline">{label}</a>)}</div>
    </nav>

    <section id="profile" className="scroll-mt-24 py-16 md:py-24">
      <div className="attorney-content-shell grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <p className="attorney-label">{ko ? "변호사 프로필" : es ? "Perfil del abogado" : "Attorney profile"}</p>
          <h2 className="mt-4">Howard Choi</h2>
          <p className="mt-5 max-w-[560px] leading-7 text-[#57514b]">{ko ? "부에나파크에서 사고와 개인상해 사건을 상담합니다. 사고 경위, 치료 상황과 궁금한 점을 알려주세요." : es ? "Asesoría de lesiones personales en Buena Park. Hable sobre su accidente, su tratamiento actual y las preguntas que necesita resolver." : "Personal injury counsel in Buena Park. Discuss your accident, where treatment stands, and the questions you need answered."}</p>
          <div className="mt-6 flex items-center gap-3 text-sm text-[#57514b]"><MapPin aria-hidden="true" className="h-5 w-5 text-[#7b5b3e]" />Buena Park, California</div>
          <a href={`${prefix}/contact`} className="attorney-button mt-8">{ko ? "상담 요청" : es ? "Solicitar una consulta" : "Request a consultation"}<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
        </div>
        <div className="rounded-md bg-[#eee8df] p-6 md:p-8">
          <h3 className="mb-5">{ko ? "등록 정보" : es ? "Datos profesionales" : "Professional details"}</h3>
          <dl className="divide-y divide-[#211c17]/10">{[
            [ko ? "이름" : es ? "Nombre completo" : "Full name", "Howard Jong-yol Choi"],
            [ko ? "캘리포니아 변호사 번호" : es ? "Número del State Bar de California" : "California Bar number", "284364"],
            [ko ? "면허 상태" : es ? "Estado de licencia" : "License status", ko ? "활동 중 (Active)" : es ? "Activa" : "Active"],
            [ko ? "등록일" : es ? "Admitido en California" : "Admitted in California", ko ? "2012년 10월 2일" : es ? "2 de octubre de 2012" : "October 2, 2012"],
            [ko ? "로스쿨" : es ? "Facultad de derecho" : "Law school", "William Howard Taft University, Santa Ana, CA"],
            [ko ? "등록 사무소" : es ? "Firma registrada" : "Firm of record", "Law Offices of Howard Choi, PC"],
            [ko ? "사용 언어" : es ? "Idiomas hablados" : "Languages spoken", ko ? "영어 · 한국어" : es ? "Inglés · Coreano" : "English · Korean"],
          ].map(([label, value]) => <div key={label} className="py-4"><dt className="text-xs text-[#675f55]">{label}</dt><dd className="mt-1 text-base font-medium">{value}</dd></div>)}</dl>
          <p className="mt-4 text-[12px] leading-5 text-[#675f55]">{ko ? "위 정보는 캘리포니아 주 변호사 협회(State Bar of California)의 공식 등록 기록을 기준으로 합니다." : es ? "Los datos anteriores corresponden al registro oficial del State Bar of California." : "The details above are as published on the official State Bar of California licensee record."}</p>
          <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-3 text-sm font-medium underline underline-offset-4">{ko ? "주 변호사 협회 프로필 보기" : es ? "Ver perfil del State Bar" : "View State Bar profile"}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
        </div>
      </div>
    </section>

    <section id="how-we-help" className="scroll-mt-24 bg-[#eee8df] py-16 md:py-24">
      <div className="attorney-content-shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <img src={reviewingDocuments} alt={ko ? "서류와 기록을 함께 검토하는 모습" : es ? "Revisión conjunta de documentos y registros del accidente" : "Reviewing accident documents and records together"} width={900} height={1000} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-md object-cover lg:aspect-[4/5] lg:max-h-[580px]" />
        <div><p className="attorney-label">{ko ? "진행 방식" : es ? "Cómo ayudamos" : "How we help"}</p><h2 className="mt-4">{ko ? "한 단계씩 알아보세요." : es ? "Sepa qué sigue." : "Know what comes next."}</h2>
          <ol className="mt-8 space-y-7">{steps.map(({ Icon, title, text }, index) => <li key={title} className="flex gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f9f8f6] text-[#7b5b3e]"><Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} /></span><div><span className="text-xs text-[#675f55]">0{index + 1}</span><h3 className="mt-1">{title}</h3><p className="mt-2 leading-7 text-[#57514b]">{text}</p></div></li>)}</ol>
        </div>
      </div>
    </section>

    <section id="attorney-practice" className="scroll-mt-24 py-16 md:py-24">
      <div className="attorney-content-shell">
        <div className="mb-10 max-w-[640px]"><p className="attorney-label">{ko ? "업무 분야" : es ? "Áreas de práctica" : "Practice areas"}</p><h2 className="mt-4">{ko ? "사고 유형에 맞는 안내" : es ? "Encuentre el punto de partida adecuado." : "Find the right starting point."}</h2><p className="mt-5 leading-7 text-[#57514b]">{ko ? "사고 유형을 선택하여 관련 기록, 보험과 다음 단계를 확인하세요." : es ? "Elija un tipo de accidente para ver información sobre evidencia, seguro y próximos pasos." : "Choose an accident type for information about evidence, insurance, and next steps."}</p></div>
        <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">{practiceAreas.map(practice => {
          const esCopy = esPracticeContent[practice.slug];
          return <a key={practice.slug} href={`${prefix}/practice-areas/${practice.slug}`} className="group block rounded-md focus-visible:outline-offset-4">
            <div className="overflow-hidden rounded-md"><img src={practiceMedia[practice.slug].src} alt={practiceMedia[practice.slug].alt} width={600} height={400} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]" /></div>
            <div className="flex min-h-14 items-center justify-between gap-3 py-3"><h3>{ko ? practice.koTitle : es ? (esCopy?.shortTitle || practice.title) : practice.title}</h3><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" /></div>
          </a>;
        })}</div>
      </div>
    </section>

    <section id="consultation" className="scroll-mt-24 bg-[#211a16] py-16 text-[#f3eee5] md:py-24">
      <div className="attorney-content-shell grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div><p className="attorney-label !text-[#d2bd9e]">{ko ? "상담 준비" : es ? "Su consulta" : "Your consultation"}</p><h2 className="mt-4">{ko ? "질문부터 시작하세요." : es ? "Empiece con sus preguntas." : "Start with your questions."}</h2><p className="mt-5 max-w-[500px] leading-7 text-white/75">{ko ? "모든 서류가 준비되어 있지 않아도 괜찮습니다. 현재 알고 있는 내용부터 알려주세요." : es ? "No necesita tener todos los documentos para empezar. Comparta lo que sabe y lo que necesita entender." : "You do not need every document to start. Share what you know and what you would like help understanding."}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5"><a href={`${prefix}/contact`} className="attorney-button !bg-[#f3eee5] !text-[#211a16]"><CalendarDays aria-hidden="true" className="h-4 w-4" />{ko ? "상담 예약" : es ? "Programar una consulta" : "Book a consultation"}</a><a href={brand.phoneHref} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium"><Phone aria-hidden="true" className="h-4 w-4" />{brand.phoneDisplay}</a></div>
        </div>
        <div className="rounded-md border border-white/20 p-6 md:p-8"><h3>{ko ? "준비하면 도움이 되는 자료" : es ? "Útil tener a mano" : "Helpful to have nearby"}</h3><ul className="mt-5 space-y-4">{(ko ? ["사고 날짜, 장소와 간단한 경위", "현장 사진이나 사고 보고서", "보험사 연락 및 서류", "치료 정보와 궁금한 점"] : es ? ["Fecha, lugar y breve resumen del accidente", "Fotos del lugar o reporte del incidente", "Cartas del seguro y datos de contacto", "Información de tratamiento y sus preguntas"] : ["Accident date, location, and a short summary", "Scene photos or an incident report", "Insurance letters and contact details", "Treatment information and your questions"]).map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-white/80"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#d2bd9e]" />{item}</li>)}</ul><p className="mt-6 border-t border-white/15 pt-5 text-[12px] leading-6 text-white/65">{ko ? "웹사이트 정보는 일반적인 안내이며 법률 자문이 아닙니다." : es ? "La información del sitio es general y no constituye asesoría legal." : "Website information is general and is not legal advice."}</p></div>
      </div>
    </section>
  </div>;
}
