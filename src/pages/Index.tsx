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

// Diagnostic only: minimal interactive tree to isolate the production hydration crash.
const Index = ({ locale = "en" }: { locale?: SiteLocale }) => (
  <main className="min-h-screen bg-background p-12">
    <h1>{locale === "ko" ? "부에나파크 개인상해 변호사." : locale === "es" ? "Abogado de lesiones personales en Buena Park, CA." : "Personal Injury Lawyer in Buena Park, CA."}</h1>
  </main>
);

export default Index;
