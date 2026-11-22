import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { ChecklistCard } from "@/components/editorial/EditorialCards";
import "@/styles/home-editorial.css";
import deskPhoto from "@/assets/law-firm/responsive/signing-medical-form-960.webp";
import { MotionConfig } from "framer-motion";
import readingNotes from "../../content/learning/page-reading-notes/site.json";
import KoreanNavigation from "@/components/KoreanNavigation";
import KoreanFooter from "@/components/KoreanFooter";
import HomeConsultationQuestions from "@/components/HomeConsultationQuestions";
import SiteDepthSection from "@/components/SiteDepthSection";
import Navigation from "@/components/Navigation";
import SpanishNavigation from "@/components/SpanishNavigation";
import Hero from "@/components/Hero";
import HomeImmediateTrust from "@/components/HomeImmediateTrust";
import HomeInjuryClaimHelp from "@/components/HomeInjuryClaimHelp";
import TrustBadges from "@/components/TrustBadges";
import FirmSnapshot from "@/components/FirmSnapshot";
import Locations from "@/components/Locations";
import Experience from "@/components/Experience";
import SelectedResult from "@/components/SelectedResult";
import DirectAccess from "@/components/DirectAccess";
import ClientSuccessFeature from "@/components/ClientSuccessFeature";
import HomeServiceAreas from "@/components/HomeServiceAreas";
import FAQ from "@/components/FAQ";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import SpanishFooter from "@/components/SpanishFooter";
import { localizedContentHref } from "@/lib/localized-path";
import type { SiteLocale } from "@/data/injurySite";

const Index = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const tr = (en: string, es: string, ko: string) => ({ en, es, ko })[locale];
  const href = (path: string) => localizedContentHref(path, locale);
  const notes = readingNotes["/"];
  const notesLink = tr(notes.linkLabel, "Qué esperar después de llamar", "전화 후 어떤 일이 진행되는지 알아보기");
  const Spanish = locale === "es";
  const Nav = locale === "ko" ? KoreanNavigation : Spanish ? SpanishNavigation : Navigation;
  const SiteFooter = locale === "ko" ? KoreanFooter : Spanish ? SpanishFooter : Footer;

  return (
    <div className="home-page min-h-[100svh] overflow-x-clip bg-background" style={locale === "ko" ? { fontFamily: '"Noto Sans KR", sans-serif' } : undefined}>
      <a className="home-skip-link" href="#home-main">{locale === "ko" ? "본문으로 건너뛰기" : Spanish ? "Saltar al contenido" : "Skip to main content"}</a>
      <Nav />
      <MotionConfig reducedMotion="user">
      <main id="home-main" tabIndex={-1}>
      <div className="relative">
        <div className="md:sticky md:top-0 z-0 w-full"><Hero locale={locale} /></div>
        <div className="relative z-10 w-full bg-background">
          <nav className="home-shortcuts md:hidden" aria-label={locale === "ko" ? "페이지 내 이동" : Spanish ? "En esta página" : "On this page"}>
            <div className="site-shell">
              <ButtonLink href="#practice">{locale === "ko" ? "업무 분야" : Spanish ? "Áreas de práctica" : "Practice areas"}</ButtonLink>
              <ButtonLink href="#reviews">{locale === "ko" ? "의뢰인 후기" : Spanish ? "Testimonios" : "Client reviews"}</ButtonLink>
              <ButtonLink href="#faq">{locale === "ko" ? "자주 묻는 질문" : Spanish ? "Preguntas" : "FAQs"}</ButtonLink>
            </div>
          </nav>
          <HomeImmediateTrust locale={locale} />
          <HomeInjuryClaimHelp locale={locale} />
          <DirectAccess locale={locale} />
          <TrustBadges locale={locale} />
          <SelectedResult locale={locale} />
          <ClientSuccessFeature locale={locale} />
          <Locations locale={locale} />
        </div>
      </div>
      <div className="relative z-20 bg-background">
        <FirmSnapshot locale={locale} />
        <Experience locale={locale} />
        <SiteDepthSection locale={locale} topic="home" />
        <section id="prepare-for-consultation" className="home-preparation">
          <div className="site-shell home-preparation__layout"><div>
          <img src={deskPhoto} width="960" height="1440" loading="lazy" decoding="async" alt="" />
          <h2 className="editorial-serif text-4xl">{tr("Start with a conversation about your injury", "Empecemos por hablar de su lesión", "어떤 부상을 입었는지부터 이야기해 보세요")}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7">{tr("Before you call, set aside the paperwork you already have and write down the question you most want answered. These three prompts can help you prepare.", "Antes de llamar, reúna los documentos que ya tiene y anote la pregunta que más le interesa resolver. Estos tres puntos pueden ayudarle a prepararse.", "전화하기 전에 갖고 있는 서류를 모아 두고 가장 궁금한 점을 적어 보세요. 다음 세 가지를 참고해 준비할 수 있습니다.")}</p>
          </div><div><ChecklistCard items={[
            <><strong className="block">{tr("Tell us what happened", "Cuéntenos qué ocurrió", "어떤 일이 있었는지 알려 주세요")}</strong>{tr("Share where you were hurt and what is most urgent for you now.", "Díganos dónde se lesionó y qué necesita atender con más urgencia.", "어디에서 다쳤는지, 지금 가장 시급한 일이 무엇인지 알려 주세요.")}</>,
            <><strong className="block">{tr("Bring what you have", "Traiga lo que tenga", "가지고 있는 자료를 준비하세요")}</strong>{tr("A report number, photos or an insurance letter can help explain what needs attention.", "Un número de informe, fotos o una carta de la aseguradora pueden ayudar a entender qué requiere atención.", "사고 보고서 번호, 사진이나 보험사 서신이 있으면 어떤 문제를 살펴봐야 하는지 파악하는 데 도움이 됩니다.")}</>,
            <><strong className="block">{tr("Ask how you’ll stay informed", "Pregunte cómo le mantendrán al tanto", "진행 상황을 어떻게 안내받는지 물어보세요")}</strong>{tr("If you’re weighing your options after talking with another firm, ask who will update you and who will walk you through an insurance offer.", "Si está valorando sus opciones después de hablar con otro bufete, pregunte quién le informará de los avances y le explicará cualquier oferta de la aseguradora.", "다른 법률사무소와 상담한 뒤 선택지를 살펴보고 있다면, 누가 진행 상황을 알려 주고 보험사의 제안을 설명해 주는지 물어보세요.")}</>,
          ]} />
          <details className="home-topic mt-3 md:hidden">
            <summary>{tr("What if I’m juggling medical care and car repairs?", "¿Y si tengo que atender mi tratamiento médico y la reparación del auto a la vez?", "치료와 차량 수리를 동시에 챙겨야 한다면 어떻게 하나요?")}</summary>
            <p>{tr("Write down your next appointment, the tow yard’s contact information, and who needs a response. If someone calls on your behalf, ask them to note who they spoke with and what was requested.", "Anote su próxima cita, los datos del depósito de vehículos y a quién debe responder. Si alguien llama por usted, pídale que anote con quién habló y qué le pidieron.", "다음 진료 일정, 견인 차량 보관소 연락처, 답변해야 할 상대를 적어 두세요. 누군가 대신 전화한다면, 누구와 통화했고 어떤 요청을 받았는지 기록해 달라고 하세요.")}</p>
            <ButtonLink href={href(notes.href)}>{notesLink}</ButtonLink>
          </details>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 md:mt-6 md:gap-6">
            <ArrowLink direction="right" variant="ink" href="#booking">{tr("Request a free consultation", "Solicitar una consulta gratuita", "무료 상담 요청하기")}</ArrowLink>
            <ButtonLink variant="editorial" href={href("/about/what-to-expect")}>{tr("What to expect", "Qué esperar", "상담 과정 알아보기")}</ButtonLink>
            <ButtonLink variant="editorial" href={href("/blogs/what-to-do-after-a-car-accident-in-california")}>{tr("What to do after a car accident", "Qué hacer después de un accidente de auto", "교통사고 후 해야 할 일")}</ButtonLink>
          </div>
          </div></div>
        </section>
        <HomeServiceAreas locale={locale} />
        <FAQ locale={locale} />
        <HomeConsultationQuestions locale={locale} />
        <aside className="call-notes hidden md:block" aria-labelledby="page-reading-note">
          <div className="site-shell call-notes__layout">
            <div>
              <h2 id="page-reading-note" className="editorial-serif">{tr(notes.title, "Cuando dos asuntos requieren atención a la vez", "두 가지 일을 동시에 처리해야 할 때")}</h2>
              <p>{tr("Your car is at the tow yard and your next medical appointment is tomorrow. A short list helps Howard see which call or deadline needs attention first.", "Su auto está en el depósito y su próxima cita médica es mañana. Una lista breve ayuda a Howard a identificar qué llamada o plazo requiere atención primero.", "차량은 견인 보관소에 있고 다음 진료는 내일입니다. 짧게 목록을 작성하면 Howard 변호사가 어떤 연락이나 기한을 먼저 챙겨야 할지 파악하는 데 도움이 됩니다.")}</p>
              <ButtonLink variant="editorial" href={href(notes.href)}>{notesLink}</ButtonLink>
            </div>
            <dl>
              <div><dt>{tr("Your next appointment", "Su próxima cita", "다음 진료 일정")}</dt><dd>{tr("Write down the date, time and provider.", "Anote la fecha, la hora y el nombre del profesional o centro que le atiende.", "날짜, 시간, 의료기관이나 담당 의료진의 이름을 적으세요.")}</dd></div>
              <div><dt>{tr("Where your car is", "Dónde está su auto", "차량 보관 위치")}</dt><dd>{tr("Keep the tow yard’s name, phone number and any paperwork together.", "Guarde juntos el nombre y el teléfono del depósito y los documentos relacionados.", "견인 차량 보관소 이름, 전화번호와 관련 서류를 한곳에 모아 두세요.")}</dd></div>
              <div><dt>{tr("Who needs a response", "A quién debe responder", "답변해야 할 상대")}</dt><dd>{tr("List who called, what they asked for and any date on the letter. If family members make calls for you, ask them to add their notes here.", "Anote quién llamó, qué pidió y cualquier fecha que figure en la carta. Si un familiar llama por usted, pídale que añada aquí sus notas.", "누가 전화했는지, 무엇을 요청했는지, 서신에 어떤 날짜가 나오는지 적으세요. 가족이 대신 전화한다면 통화 내용을 여기에 덧붙여 달라고 하세요.")}</dd></div>
            </dl>
          </div>
        </aside>
        <Booking locale={locale} />
      </div>
      </main>
      </MotionConfig>
      <SiteFooter />
    </div>
  );
};

export default Index;
