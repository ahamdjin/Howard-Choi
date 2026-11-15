import { PageReadingNote } from "@/components/editorial/PageReadingNote";
import readingNotes from "../../content/learning/page-reading-notes/site.json";
import KoreanNavigation from "@/components/KoreanNavigation";
import KoreanFooter from "@/components/KoreanFooter";
import HomeConsultationQuestions from "@/components/HomeConsultationQuestions";
import SiteDepthSection from "@/components/SiteDepthSection";
import Navigation from "@/components/Navigation";
import SpanishNavigation from "@/components/SpanishNavigation";
import Hero from "@/components/Hero";
import HomeImmediateTrust from "@/components/HomeImmediateTrust";
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
import type { SiteLocale } from "@/data/injurySite";

const Index = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const Spanish = locale === "es";
  const Nav = locale === "ko" ? KoreanNavigation : Spanish ? SpanishNavigation : Navigation;
  const SiteFooter = locale === "ko" ? KoreanFooter : Spanish ? SpanishFooter : Footer;

  return (
    <div className="home-page min-h-[100svh] overflow-x-clip bg-background" style={locale === "ko" ? { fontFamily: '"Noto Sans KR", sans-serif' } : undefined}>
      <Nav />
      <div className="relative">
        <div className="sticky top-0 z-0 h-[100svh] w-full"><Hero locale={locale} /></div>
        <div className="relative z-10 w-full bg-background">
          <HomeImmediateTrust locale={locale} />
          <DirectAccess locale={locale} />
          <SelectedResult locale={locale} />
          <ClientSuccessFeature locale={locale} />
          <Locations locale={locale} />
        </div>
      </div>
      <div className="relative z-20 bg-background">
        <FirmSnapshot locale={locale} />
        <Experience locale={locale} />
        <SiteDepthSection locale={locale} topic="home" />
        <TrustBadges locale={locale} />
        {locale === "en" && (
          <section className="site-shell border-t border-foreground/15 py-12 md:py-20">
            <h2 className="editorial-serif text-4xl">Start with a conversation about your injury</h2>
            <ol className="mt-6 grid gap-6 text-sm leading-7 md:grid-cols-3">
              <li><strong className="block">1. Tell us what happened</strong>Share where you were hurt and what is most urgent for you now.</li>
              <li><strong className="block">2. Bring what you have</strong>A report number, photos or an insurance letter can help explain what needs attention.</li>
              <li><strong className="block">3. Ask how you’ll stay informed</strong>If you’re weighing your options after talking with another firm, ask who will update you and who will walk you through an insurance offer.</li>
            </ol>
            <div className="mt-6 flex flex-wrap gap-6">
              <a className="editorial-inline-link" href="/about/what-to-expect">What to expect</a>
              <a className="editorial-inline-link" href="/blogs/what-to-do-after-a-car-accident-in-california">What to do after a car accident</a>
            </div>
          </section>
        )}
        <HomeServiceAreas locale={locale} />
        <FAQ locale={locale} />
        <HomeConsultationQuestions locale={locale} />
        <PageReadingNote notes={readingNotes} />
        <Booking locale={locale} />
        <SiteFooter />
      </div>
    </div>
  );
};

export default Index;
