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
  const Nav = Spanish ? SpanishNavigation : Navigation;
  const SiteFooter = Spanish ? SpanishFooter : Footer;

  return (
    <div className="home-page min-h-[100svh] overflow-x-clip bg-background">
      <Nav />
      <div className="relative">
        <div className="sticky top-0 z-0 h-[100svh] w-full"><Hero locale={locale} /></div>
        <div className="relative z-10 w-full bg-background">
          <HomeImmediateTrust locale={locale} />
          <TrustBadges locale={locale} />
          <FirmSnapshot locale={locale} />
          <Locations locale={locale} />
        </div>
      </div>
      <div className="relative z-20 bg-background">
        <Experience locale={locale} />
        <SelectedResult locale={locale} />
        <DirectAccess locale={locale} />
        <ClientSuccessFeature locale={locale} />
        <HomeServiceAreas locale={locale} />
        <FAQ locale={locale} />
        <Booking locale={locale} />
        <SiteFooter />
      </div>
    </div>
  );
};

export default Index;
