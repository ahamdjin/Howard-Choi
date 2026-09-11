import Navigation from "@/components/Navigation";
import KoreanNavigation from "@/components/KoreanNavigation";
import Footer from "@/components/Footer";
import KoreanFooter from "@/components/KoreanFooter";
import { brand } from "@/data/injurySite";

export type LegalDocumentType = "privacy" | "terms" | "disclaimer" | "accessibility";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalDocument = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

const englishDocs: Record<LegalDocumentType, LegalDocument> = {
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro: "This policy explains the types of information Buena Park Injury Lawyer may collect through this website, how that information may be used, and the choices available to you.",
    updated: "Last updated September 11, 2026",
    sections: [
      {
        title: "Information we may collect",
        bullets: [
          "Contact information you choose to provide, such as your name, email address, phone number, and mailing address.",
          "Information you include in an inquiry, consultation request, appointment note, or other communication with the firm.",
          "Scheduling information, including the date and time you request for a consultation.",
          "Basic technical and usage information, such as browser type, device information, pages viewed, referring pages, and similar website activity where enabled by our hosting, security, or analytics providers.",
        ],
      },
      {
        title: "How we may use information",
        bullets: [
          "To respond to your inquiry, evaluate whether the firm can assist, and communicate with you.",
          "To schedule, confirm, change, or follow up regarding a consultation.",
          "To operate, secure, maintain, and improve the website and related services.",
          "To comply with applicable legal, professional, recordkeeping, and security obligations.",
        ],
      },
      {
        title: "Service providers and third parties",
        paragraphs: [
          "We may use service providers for website hosting, scheduling, customer relationship management, communications, security, analytics, and similar business functions. Those providers may process information on our behalf as reasonably necessary to provide their services.",
          "We do not knowingly sell personal information for monetary consideration. Mobile information and text-message opt-in data are not shared with third parties or affiliates for their own marketing or promotional purposes. We may disclose information when required by law, to protect rights or safety, or in connection with professional services reasonably necessary to operate the firm.",
        ],
      },
      {
        title: "Cookies and similar technologies",
        paragraphs: [
          "The website and its service providers may use cookies or similar technologies for essential site functions, security, preferences, performance measurement, or analytics. If advertising or additional tracking technologies are introduced, this policy should be updated and any legally required choices should be provided.",
        ],
      },
      {
        title: "Text messages and communications",
        paragraphs: [
          "If you voluntarily provide a mobile number and consent to receive appointment-related text messages, message frequency may vary and message and data rates may apply. You may reply STOP to opt out of text messages and HELP for help. Consent to receive texts is not a condition of hiring the firm.",
        ],
      },
      {
        title: "Retention and security",
        paragraphs: [
          "Information may be retained for as long as reasonably necessary for the purpose for which it was collected, to maintain business and professional records, resolve disputes, enforce agreements, and meet legal or professional obligations. We use reasonable administrative and technical measures intended to protect information, but no internet transmission or storage system can be guaranteed to be completely secure.",
        ],
      },
      {
        title: "California privacy rights",
        paragraphs: [
          "Depending on the circumstances and applicable law, California residents may have rights to request access to, correction of, or deletion of certain personal information, and to receive information about how personal information is used or disclosed. Some information may be exempt because of legal, professional, evidentiary, security, or other obligations.",
          "To make a privacy request, contact the firm through the Contact page or by phone. We may need to verify your identity before completing a request.",
        ],
      },
      {
        title: "Children and external services",
        paragraphs: [
          "This website is intended for adults seeking legal information or services and is not directed to children under 13. The site may link to third-party websites or services. Their privacy practices are governed by their own policies.",
        ],
      },
      {
        title: "Contact",
        paragraphs: [
          `Questions about this policy may be directed to ${brand.name}, ${brand.address}, or by phone at ${brand.phoneDisplay}. You may also use the website Contact page.`,
        ],
      },
    ],
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms of Use",
    intro: "These Terms of Use apply to your use of the Buena Park Injury Lawyer website. By using the site, you agree to these terms.",
    updated: "Last updated September 11, 2026",
    sections: [
      {
        title: "General information only",
        paragraphs: [
          "The materials on this website are provided for general informational purposes only. They are not legal advice and should not be relied on as a substitute for advice from a lawyer who has reviewed the specific facts and deadlines that may apply to your matter.",
        ],
      },
      {
        title: "No attorney-client relationship",
        paragraphs: [
          "Visiting this website, submitting a form, scheduling a consultation, sending an email, calling the office, or otherwise contacting the firm does not by itself create an attorney-client relationship. An attorney-client relationship is formed only after the firm has agreed to representation and any required engagement agreement has been completed.",
          "Do not send confidential or highly sensitive information until the firm has confirmed that it represents you and has instructed you how to provide that information.",
        ],
      },
      {
        title: "No guarantee of results",
        paragraphs: [
          "Every legal matter is different. Any discussion of prior matters, results, settlements, verdicts, or examples is not a promise or guarantee of a particular outcome. Results depend on the facts, law, evidence, parties, insurance, venue, and other circumstances of each matter.",
        ],
      },
      {
        title: "Appointments, communications, and text messages",
        paragraphs: [
          "Appointment availability displayed on the site may change. A booking is subject to the information submitted and the firm's ability to accept the consultation. If you opt in to appointment-related calls, texts, or emails, message frequency may vary and message and data rates may apply. Reply STOP to opt out of text messages and HELP for help. Consent is not a condition of hiring the firm.",
        ],
      },
      {
        title: "Deadlines and emergencies",
        paragraphs: [
          "Do not use this website as the sole method of communicating a legal deadline, emergency, court date, statute-of-limitations issue, or other time-sensitive matter. If immediate assistance is required, contact the appropriate emergency service, court, agency, or attorney directly.",
        ],
      },
      {
        title: "Third-party links and services",
        paragraphs: [
          "The website may link to or use third-party services, including mapping, scheduling, communication, hosting, and other technology providers. The firm does not control and is not responsible for third-party content, availability, terms, or privacy practices.",
        ],
      },
      {
        title: "Intellectual property and permitted use",
        paragraphs: [
          "Unless otherwise indicated, the website design, text, graphics, branding, and original materials are owned by or licensed to the firm. You may view and use the site for personal, noncommercial informational purposes. You may not copy, republish, scrape, sell, or exploit substantial portions of the site in a misleading or unlawful manner.",
        ],
      },
      {
        title: "Website availability and changes",
        paragraphs: [
          "We may update, suspend, remove, or change website content or functionality without notice. While we try to keep information accurate and useful, the website is provided on an as-available basis and may contain errors, omissions, or outdated information.",
        ],
      },
      {
        title: "Changes to these terms",
        paragraphs: [
          "We may revise these Terms of Use from time to time. The date above indicates the most recent update. Continued use of the website after an update constitutes acceptance of the revised terms.",
        ],
      },
      {
        title: "Contact",
        paragraphs: [
          `Questions about these terms may be directed to ${brand.name}, ${brand.address}, or by phone at ${brand.phoneDisplay}.`,
        ],
      },
    ],
  },
  disclaimer: {
    eyebrow: "Legal",
    title: "Legal Disclaimer",
    intro: "Important information about the legal content, attorney advertising, communications, and results presented on this website.",
    updated: "Last updated September 11, 2026",
    sections: [
      {
        title: "Attorney advertising",
        paragraphs: [
          "This website may constitute attorney advertising. It is designed to provide general information about Buena Park Injury Lawyer, Howard Choi, and the types of matters the firm may handle.",
        ],
      },
      {
        title: "Not legal advice",
        paragraphs: [
          "Website content is general information and is not legal advice. Laws, deadlines, procedures, and outcomes vary by jurisdiction and by the facts of each matter. You should consult a qualified attorney about your specific situation.",
        ],
      },
      {
        title: "No attorney-client relationship",
        paragraphs: [
          "Viewing the website or contacting the firm does not create an attorney-client relationship. The firm must first confirm that it can accept the matter and enter into any required engagement agreement.",
        ],
      },
      {
        title: "Past results and testimonials",
        paragraphs: [
          "Past results do not guarantee or predict a similar result in any future matter. Any testimonial, review, example, or description of a prior matter reflects the circumstances of that individual matter and should not be understood as a promise of a particular outcome.",
        ],
      },
      {
        title: "Jurisdictions and professional responsibility",
        paragraphs: [
          "The website is not intended to represent that the firm or any attorney can practice law in every jurisdiction. Representation is subject to professional-responsibility rules, conflicts checks, applicable licensing requirements, and the firm's acceptance of the matter.",
        ],
      },
      {
        title: "Time-sensitive matters",
        paragraphs: [
          "Do not rely on a website form or appointment request to preserve a claim, satisfy a filing deadline, or respond to an emergency. Legal deadlines can expire even while a consultation is pending.",
        ],
      },
    ],
  },
  accessibility: {
    eyebrow: "Information",
    title: "Accessibility Statement",
    intro: "Buena Park Injury Lawyer aims to make this website usable by as many people as reasonably possible, including people who use assistive technologies.",
    updated: "Last updated September 11, 2026",
    sections: [
      {
        title: "Our approach",
        paragraphs: [
          "We aim to maintain readable text, keyboard-accessible navigation, meaningful labels, sufficient structure, and responsive layouts across common devices and browsers. Accessibility is an ongoing process, and website content and third-party integrations may change over time.",
        ],
      },
      {
        title: "Third-party content",
        paragraphs: [
          "Some website functions may rely on third-party services, such as maps, scheduling, communications, or embedded media. We may not control every aspect of the accessibility of those external services, but we will try to provide a practical alternative when an issue is brought to our attention.",
        ],
      },
      {
        title: "Need assistance?",
        paragraphs: [
          `If you have difficulty using this website or need information in another format, please contact the firm through the Contact page or call ${brand.phoneDisplay}. When possible, describe the page and the accessibility problem so we can respond more effectively.`,
        ],
      },
    ],
  },
};

const koreanDocs: Record<LegalDocumentType, LegalDocument> = {
  privacy: {
    eyebrow: "법적 고지",
    title: "개인정보 처리방침",
    intro: "본 방침은 Buena Park Injury Lawyer 웹사이트를 통해 수집될 수 있는 정보, 그 이용 목적 및 이용자가 가질 수 있는 선택권을 설명합니다.",
    updated: "최종 업데이트: 2026년 9월 11일",
    sections: [
      { title: "수집될 수 있는 정보", bullets: ["이름, 이메일, 전화번호, 주소 등 이용자가 직접 제공하는 연락처 정보.", "문의, 상담 요청, 예약 메모 또는 기타 커뮤니케이션에 포함한 정보.", "요청한 상담 날짜와 시간을 포함한 예약 정보.", "호스팅, 보안 또는 분석 서비스가 활성화된 경우 브라우저, 기기, 방문 페이지, 유입 경로 등 기본적인 기술 및 이용 정보."] },
      { title: "정보 이용 목적", bullets: ["문의에 응답하고 사건 수임 가능성을 검토하며 이용자와 연락하기 위해.", "상담을 예약·확인·변경하거나 후속 안내를 제공하기 위해.", "웹사이트와 관련 서비스를 운영, 보호, 유지 및 개선하기 위해.", "적용되는 법률, 전문직 윤리, 기록보관 및 보안 의무를 준수하기 위해."] },
      { title: "서비스 제공업체 및 제3자", paragraphs: ["웹사이트 호스팅, 예약, 고객관계관리, 커뮤니케이션, 보안, 분석 등 업무 기능을 위해 서비스 제공업체를 이용할 수 있으며, 이들은 필요한 범위에서 당사를 대신해 정보를 처리할 수 있습니다.", "당사는 개인정보를 금전적 대가를 받고 판매하는 것을 의도하지 않습니다. 휴대전화 정보 및 문자메시지 수신 동의 정보는 제3자나 계열사의 자체 마케팅·홍보 목적으로 공유하지 않습니다. 법률상 요구되거나 권리·안전을 보호하기 위해 필요한 경우에는 정보가 공개될 수 있습니다."] },
      { title: "쿠키 및 유사 기술", paragraphs: ["웹사이트와 서비스 제공업체는 필수 기능, 보안, 환경설정, 성능 측정 또는 분석을 위해 쿠키나 유사 기술을 사용할 수 있습니다. 광고 또는 추가 추적 기술을 도입하는 경우 필요한 고지와 선택권을 제공하도록 본 방침을 업데이트해야 합니다."] },
      { title: "문자 및 커뮤니케이션", paragraphs: ["휴대전화 번호를 제공하고 상담 관련 문자 수신에 동의한 경우 메시지 빈도는 달라질 수 있으며 통신요금이 부과될 수 있습니다. STOP이라고 회신하여 문자 수신을 중단할 수 있고 HELP로 도움을 요청할 수 있습니다. 문자 수신 동의는 변호사 선임 조건이 아닙니다."] },
      { title: "보관 및 보안", paragraphs: ["정보는 수집 목적, 업무·전문직 기록, 분쟁 해결, 계약 집행 및 법적 의무를 위해 합리적으로 필요한 기간 동안 보관될 수 있습니다. 합리적인 보호조치를 사용하지만 인터넷 전송 또는 저장 시스템의 완전한 보안을 보장할 수는 없습니다."] },
      { title: "캘리포니아 개인정보 권리", paragraphs: ["적용되는 법률과 상황에 따라 캘리포니아 거주자는 특정 개인정보에 대한 접근, 정정, 삭제 또는 이용·공개 방식에 관한 정보를 요청할 권리가 있을 수 있습니다. 법률, 전문직 의무, 증거 보존, 보안 등의 이유로 일부 정보는 예외가 될 수 있습니다.", "개인정보 요청은 문의 페이지 또는 전화로 할 수 있으며, 요청 처리 전에 본인 확인이 필요할 수 있습니다."] },
      { title: "아동 및 외부 서비스", paragraphs: ["본 웹사이트는 법률 정보 또는 서비스를 찾는 성인을 대상으로 하며 13세 미만 아동을 대상으로 하지 않습니다. 제3자 사이트나 서비스로 연결되는 경우 해당 서비스의 개인정보 처리방침이 적용됩니다."] },
      { title: "문의", paragraphs: [`본 방침 관련 문의는 ${brand.name}, ${brand.address}, 전화 ${brand.phoneDisplay} 또는 웹사이트 문의 페이지를 통해 하실 수 있습니다.`] },
    ],
  },
  terms: {
    eyebrow: "법적 고지",
    title: "이용약관",
    intro: "본 이용약관은 Buena Park Injury Lawyer 웹사이트 이용에 적용됩니다. 웹사이트를 이용하면 본 약관에 동의하는 것으로 간주됩니다.",
    updated: "최종 업데이트: 2026년 9월 11일",
    sections: [
      { title: "일반 정보 제공 목적", paragraphs: ["웹사이트의 자료는 일반적인 정보 제공만을 위한 것이며 법률 자문이 아닙니다. 구체적인 사실과 기한을 검토한 변호사의 조언을 대신할 수 없습니다."] },
      { title: "변호사-의뢰인 관계의 부재", paragraphs: ["웹사이트 방문, 문의 양식 제출, 상담 예약, 이메일 전송 또는 전화만으로 변호사-의뢰인 관계가 성립하지 않습니다. 법률사무소가 수임을 명확히 동의하고 필요한 위임계약이 완료된 후에만 관계가 형성됩니다.", "법률사무소가 대리관계를 확인하고 안전한 제공 방법을 안내하기 전에는 기밀 또는 매우 민감한 정보를 보내지 마십시오."] },
      { title: "결과 보장 없음", paragraphs: ["모든 사건은 다릅니다. 과거 사건, 합의, 판결 또는 사례에 관한 설명은 특정 결과를 약속하거나 보장하지 않습니다."] },
      { title: "예약, 연락 및 문자", paragraphs: ["웹사이트에 표시된 예약 가능 시간은 변경될 수 있습니다. 상담 예약은 제출된 정보와 법률사무소의 상담 수락 가능 여부에 따라 달라질 수 있습니다. 상담 관련 전화, 문자 또는 이메일 수신에 동의한 경우 메시지 빈도는 달라질 수 있으며 통신요금이 부과될 수 있습니다. STOP으로 문자 수신을 중단하고 HELP로 도움을 요청할 수 있습니다."] },
      { title: "기한 및 긴급 상황", paragraphs: ["법적 기한, 긴급상황, 법원기일, 소멸시효 또는 기타 시간에 민감한 문제를 웹사이트만으로 전달하지 마십시오. 즉각적인 도움이 필요한 경우 적절한 응급서비스, 법원, 기관 또는 변호사에게 직접 연락하십시오."] },
      { title: "제3자 링크 및 서비스", paragraphs: ["웹사이트는 지도, 예약, 커뮤니케이션, 호스팅 등 제3자 서비스를 이용하거나 링크할 수 있습니다. 당사는 제3자 콘텐츠, 가용성, 약관 또는 개인정보 처리방침을 통제하지 않습니다."] },
      { title: "지식재산권 및 허용된 이용", paragraphs: ["별도 표시가 없는 한 웹사이트 디자인, 텍스트, 그래픽, 브랜드 및 원본 자료는 법률사무소가 소유하거나 사용권을 보유합니다. 개인적이고 비상업적인 정보 확인 목적으로 이용할 수 있습니다."] },
      { title: "웹사이트 변경", paragraphs: ["당사는 사전 통지 없이 웹사이트 콘텐츠나 기능을 변경, 중단 또는 삭제할 수 있습니다. 정보의 정확성을 위해 노력하지만 오류, 누락 또는 오래된 정보가 포함될 수 있습니다."] },
      { title: "약관 변경", paragraphs: ["본 이용약관은 필요에 따라 수정될 수 있습니다. 상단 날짜는 최신 수정일을 나타냅니다."] },
      { title: "문의", paragraphs: [`본 약관 관련 문의는 ${brand.name}, ${brand.address} 또는 전화 ${brand.phoneDisplay}로 하실 수 있습니다.`] },
    ],
  },
  disclaimer: {
    eyebrow: "법적 고지",
    title: "법률 고지",
    intro: "웹사이트의 법률 정보, 변호사 광고, 커뮤니케이션 및 결과 표시에 관한 중요 안내입니다.",
    updated: "최종 업데이트: 2026년 9월 11일",
    sections: [
      { title: "변호사 광고", paragraphs: ["본 웹사이트는 변호사 광고에 해당할 수 있으며 Buena Park Injury Lawyer, Howard Choi 변호사 및 취급 가능한 사건 유형에 대한 일반 정보를 제공하기 위한 것입니다."] },
      { title: "법률 자문 아님", paragraphs: ["웹사이트 내용은 일반 정보이며 법률 자문이 아닙니다. 법률, 기한, 절차 및 결과는 관할지역과 사건 사실에 따라 달라질 수 있습니다."] },
      { title: "변호사-의뢰인 관계의 부재", paragraphs: ["웹사이트를 보거나 법률사무소에 연락하는 것만으로 변호사-의뢰인 관계가 성립하지 않습니다. 법률사무소가 사건을 수임할 수 있음을 확인하고 필요한 위임계약을 체결해야 합니다."] },
      { title: "과거 결과 및 후기", paragraphs: ["과거 결과는 향후 사건에서 동일하거나 유사한 결과를 보장하거나 예측하지 않습니다. 후기, 리뷰 또는 과거 사건 설명은 해당 사건의 개별 상황을 반영합니다."] },
      { title: "관할지역 및 전문직 의무", paragraphs: ["본 웹사이트는 법률사무소나 변호사가 모든 관할지역에서 업무를 수행할 수 있음을 의미하지 않습니다. 수임은 전문직 윤리, 이해충돌 확인, 자격 요건 및 법률사무소의 사건 수락에 따릅니다."] },
      { title: "시간에 민감한 문제", paragraphs: ["웹사이트 양식이나 상담 요청만으로 청구권, 제출기한 또는 긴급한 법적 권리를 보호할 수 있다고 의존하지 마십시오. 상담이 진행 중인 동안에도 법적 기한은 만료될 수 있습니다."] },
    ],
  },
  accessibility: {
    eyebrow: "안내",
    title: "접근성 안내",
    intro: "Buena Park Injury Lawyer는 보조기술을 사용하는 이용자를 포함해 가능한 많은 사람이 웹사이트를 이용할 수 있도록 노력합니다.",
    updated: "최종 업데이트: 2026년 9월 11일",
    sections: [
      { title: "접근 방식", paragraphs: ["읽기 쉬운 텍스트, 키보드 탐색, 의미 있는 레이블, 명확한 구조 및 다양한 화면 크기에 대응하는 레이아웃을 유지하도록 노력합니다. 접근성은 지속적인 개선 과정입니다."] },
      { title: "제3자 콘텐츠", paragraphs: ["지도, 예약, 커뮤니케이션 또는 외부 미디어 등 일부 기능은 제3자 서비스에 의존할 수 있습니다. 모든 제3자 서비스의 접근성을 직접 통제할 수는 없지만 문제가 알려지면 실용적인 대안을 제공하도록 노력합니다."] },
      { title: "도움이 필요하신가요?", paragraphs: [`웹사이트 이용에 어려움이 있거나 다른 형식의 정보가 필요한 경우 문의 페이지를 이용하거나 ${brand.phoneDisplay}로 전화해 주세요. 가능하면 문제가 발생한 페이지와 내용을 알려주시면 더 효과적으로 대응할 수 있습니다.`] },
    ],
  },
};

export const LegalPage = ({ type, locale = "en" }: { type: LegalDocumentType; locale?: "en" | "ko" }) => {
  const ko = locale === "ko";
  const doc = ko ? koreanDocs[type] : englishDocs[type];
  const Nav = ko ? KoreanNavigation : Navigation;
  const SiteFooter = ko ? KoreanFooter : Footer;

  return (
    <div className="min-h-screen bg-background text-foreground" style={ko ? { fontFamily: '"Noto Sans KR", sans-serif' } : undefined}>
      <Nav />
      <main>
        <section className="border-b border-foreground/10 pb-14 pt-36 md:pb-18 md:pt-44">
          <div className="site-shell">
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{doc.eyebrow}</span>
            <h1 className={`${ko ? "" : "editorial-serif"} mt-5 max-w-[860px] text-[clamp(2.8rem,5vw,5.4rem)] leading-[0.96] tracking-[-0.035em]`} style={ko ? { fontFamily: '"Noto Serif KR", serif' } : undefined}>{doc.title}</h1>
            <p className="mt-6 max-w-[720px] text-[15px] leading-7 text-muted-foreground">{doc.intro}</p>
            <p className="mt-5 text-[11px] text-muted-foreground/75">{doc.updated}</p>
          </div>
        </section>

        <section className="site-shell py-14 md:py-20 lg:py-24">
          <div className="mx-auto max-w-[900px] divide-y divide-foreground/10 border-y border-foreground/10">
            {doc.sections.map((section) => (
              <section key={section.title} className="grid gap-5 py-9 md:grid-cols-[0.34fr_0.66fr] md:gap-10 md:py-11">
                <h2 className={`${ko ? "" : "editorial-serif"} text-[1.35rem] leading-tight tracking-[-0.02em]`} style={ko ? { fontFamily: '"Noto Serif KR", serif' } : undefined}>{section.title}</h2>
                <div className="space-y-4 text-[13px] leading-6 text-foreground/68 md:text-[14px] md:leading-7">
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets ? <ul className="space-y-3">{section.bullets.map((item) => <li key={item} className="flex gap-3"><span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-foreground/45" /><span>{item}</span></li>)}</ul> : null}
                </div>
              </section>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-[900px] rounded-[3px] bg-[#e9e6e1] p-6 text-[12px] leading-6 text-foreground/60 md:p-8">
            {ko ? "본 페이지는 웹사이트 운영을 위한 일반적인 정책 및 고지입니다. 법률사무소의 구체적인 업무 관행 또는 규제 의무가 변경되는 경우 내용도 그에 맞게 검토·수정되어야 합니다." : "These website policies are intended as general operational notices. They should be reviewed and updated if the firm's actual data practices, technology providers, advertising practices, or regulatory obligations change."}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};
