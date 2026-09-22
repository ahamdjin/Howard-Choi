import { ArrowRight, CalendarDays, Check, FileText, MapPin, MessageCircle, Phone, Scale } from "lucide-react";
import { brand, practiceAreas, type SiteLocale } from "@/data/injurySite";
import { practiceMedia } from "@/data/practiceMedia";
import reviewingDocuments from "@/assets/law-firm/reviewing-documents.jpg";

export default function AttorneyContent({ locale }: { locale: SiteLocale }) {
  const ko = locale === "ko";
  const prefix = ko ? "/ko" : "";
  const links = [
    ["profile", ko ? "프로필" : "Profile"],
    ["how-we-help", ko ? "진행 방식" : "How we help"],
    ["attorney-practice", ko ? "업무 분야" : "Practice areas"],
    ["consultation", ko ? "상담 준비" : "Your consultation"],
  ];
  const steps = [
    { Icon: MessageCircle, title: ko ? "사고 경위 듣기" : "Talk through the accident", text: ko ? "사고 경위와 현재 가장 궁금한 점부터 이야기하세요." : "Start with what happened and the questions on your mind." },
    { Icon: FileText, title: ko ? "기록 살펴보기" : "Review the information", text: ko ? "사진, 치료 기록과 보험 관련 서류를 함께 살펴봅니다." : "Look at the photos, treatment records, and insurance correspondence." },
    { Icon: Scale, title: ko ? "다음 단계 확인" : "Discuss the next step", text: ko ? "어떤 정보가 더 필요한지와 가능한 진행 방향을 확인합니다." : "Identify what needs a closer look and discuss possible ways forward." },
  ];
  return <div className="attorney-content">
    <nav aria-label={ko ? "변호사 페이지 안내" : "Attorney page sections"} className="border-b border-[#211c17]/10 bg-[#f3eee5]">
      <div className="attorney-content-shell flex flex-wrap justify-center gap-x-8 gap-y-1 py-3">{links.map(([id, label]) => <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline">{label}</a>)}</div>
    </nav>

    <section id="profile" className="scroll-mt-24 py-16 md:py-24">
      <div className="attorney-content-shell grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <p className="attorney-label">{ko ? "변호사 프로필" : "Attorney profile"}</p>
          <h2 className="mt-4">Howard Choi</h2>
          <p className="mt-5 max-w-[560px] leading-7 text-[#57514b]">{ko ? "부에나파크에서 사고와 개인상해 사건을 상담합니다. 사고 경위, 치료 상황과 궁금한 점을 알려주세요." : "Personal injury counsel in Buena Park. Discuss your accident, where treatment stands, and the questions you need answered."}</p>
          <div className="mt-6 flex items-center gap-3 text-sm text-[#57514b]"><MapPin aria-hidden="true" className="h-5 w-5 text-[#7b5b3e]" />Buena Park, California</div>
          <a href={`${prefix}/contact`} className="attorney-button mt-8">{ko ? "상담 요청" : "Request a consultation"}<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
        </div>
        <div className="rounded-md bg-[#eee8df] p-6 md:p-8">
          <h3 className="mb-5">{ko ? "등록 정보" : "Professional details"}</h3>
          {/* Every field below is taken from the official State Bar of California
              licensee record for #284364. Do not add a detail here that the Bar
              record does not show — the "View State Bar profile" link invites
              readers to check it line by line. */}
          <dl className="divide-y divide-[#211c17]/10">{[
            [ko ? "이름" : "Full name", "Howard Jong-yol Choi"],
            [ko ? "캘리포니아 변호사 번호" : "California Bar number", "284364"],
            [ko ? "면허 상태" : "License status", ko ? "활동 중 (Active)" : "Active"],
            [ko ? "등록일" : "Admitted in California", ko ? "2012년 10월 2일" : "October 2, 2012"],
            [ko ? "로스쿨" : "Law school", "William Howard Taft University, Santa Ana, CA"],
            [ko ? "등록 사무소" : "Firm of record", "Law Offices of Howard Choi, PC"],
            [ko ? "사용 언어" : "Languages spoken", ko ? "영어 · 한국어" : "English · Korean"],
          ].map(([label, value]) => <div key={label} className="py-4"><dt className="text-xs text-[#675f55]">{label}</dt><dd className="mt-1 text-base font-medium">{value}</dd></div>)}</dl>
          <p className="mt-4 text-[12px] leading-5 text-[#675f55]">{ko ? "위 정보는 캘리포니아 주 변호사 협회(State Bar of California)의 공식 등록 기록을 기준으로 합니다." : "The details above are as published on the official State Bar of California licensee record."}</p>
          <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-3 text-sm font-medium underline underline-offset-4">{ko ? "주 변호사 협회 프로필 보기" : "View State Bar profile"}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
        </div>
      </div>
    </section>

    <section id="how-we-help" className="scroll-mt-24 bg-[#eee8df] py-16 md:py-24">
      <div className="attorney-content-shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <img src={reviewingDocuments} alt={ko ? "서류와 기록을 함께 검토하는 모습" : "Reviewing accident documents and records together"} width={900} height={1000} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-md object-cover lg:aspect-[4/5] lg:max-h-[580px]" />
        <div><p className="attorney-label">{ko ? "진행 방식" : "How we help"}</p><h2 className="mt-4">{ko ? "한 단계씩 알아보세요." : "Know what comes next."}</h2>
          <ol className="mt-8 space-y-7">{steps.map(({ Icon, title, text }, index) => <li key={title} className="flex gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f9f8f6] text-[#7b5b3e]"><Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} /></span><div><span className="text-xs text-[#675f55]">0{index + 1}</span><h3 className="mt-1">{title}</h3><p className="mt-2 leading-7 text-[#57514b]">{text}</p></div></li>)}</ol>
        </div>
      </div>
    </section>

    <section id="attorney-practice" className="scroll-mt-24 py-16 md:py-24">
      <div className="attorney-content-shell">
        <div className="mb-10 max-w-[640px]"><p className="attorney-label">{ko ? "업무 분야" : "Practice areas"}</p><h2 className="mt-4">{ko ? "사고 유형에 맞는 안내" : "Find the right starting point."}</h2><p className="mt-5 leading-7 text-[#57514b]">{ko ? "사고 유형을 선택하여 관련 기록, 보험과 다음 단계를 확인하세요." : "Choose an accident type for information about evidence, insurance, and next steps."}</p></div>
        <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">{practiceAreas.map(practice => <a key={practice.slug} href={`${prefix}/practice-areas/${practice.slug}`} className="group block rounded-md focus-visible:outline-offset-4">
          <div className="overflow-hidden rounded-md"><img src={practiceMedia[practice.slug].src} alt={practiceMedia[practice.slug].alt} width={600} height={400} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]" /></div>
          <div className="flex min-h-14 items-center justify-between gap-3 py-3"><h3>{ko ? practice.koTitle : practice.title}</h3><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" /></div>
        </a>)}</div>
      </div>
    </section>

    <section id="consultation" className="scroll-mt-24 bg-[#211a16] py-16 text-[#f3eee5] md:py-24">
      <div className="attorney-content-shell grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div><p className="attorney-label !text-[#d2bd9e]">{ko ? "상담 준비" : "Your consultation"}</p><h2 className="mt-4">{ko ? "질문부터 시작하세요." : "Start with your questions."}</h2><p className="mt-5 max-w-[500px] leading-7 text-white/75">{ko ? "모든 서류가 준비되어 있지 않아도 괜찮습니다. 현재 알고 있는 내용부터 알려주세요." : "You do not need every document to start. Share what you know and what you would like help understanding."}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5"><a href={`${prefix}/contact`} className="attorney-button !bg-[#f3eee5] !text-[#211a16]"><CalendarDays aria-hidden="true" className="h-4 w-4" />{ko ? "상담 예약" : "Book a consultation"}</a><a href={brand.phoneHref} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium"><Phone aria-hidden="true" className="h-4 w-4" />{brand.phoneDisplay}</a></div>
        </div>
        <div className="rounded-md border border-white/20 p-6 md:p-8"><h3>{ko ? "준비하면 도움이 되는 자료" : "Helpful to have nearby"}</h3><ul className="mt-5 space-y-4">{(ko ? ["사고 날짜, 장소와 간단한 경위", "현장 사진이나 사고 보고서", "보험사 연락 및 서류", "치료 정보와 궁금한 점"] : ["Accident date, location, and a short summary", "Scene photos or an incident report", "Insurance letters and contact details", "Treatment information and your questions"]).map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-white/80"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#d2bd9e]" />{item}</li>)}</ul><p className="mt-6 border-t border-white/15 pt-5 text-[12px] leading-6 text-white/65">{ko ? "웹사이트 정보는 일반적인 안내이며 법률 자문이 아닙니다." : "Website information is general and is not legal advice."}</p></div>
      </div>
    </section>
  </div>;
}
