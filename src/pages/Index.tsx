import Navigation from "@/components/Navigation";
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

// Section order is specified in notes/homepage-brief.md. Do not reorder without
// updating that file. Nothing may be inserted between <Navigation /> and the
// .relative hero wrapper: index.css keys the hero's height and frame off the
// `nav + .relative` adjacency selector.
const Index = () => (
  <div className="home-page min-h-[100svh] overflow-x-clip bg-background">
    <Navigation />
    <div className="relative">
      {/* 1 — Hero: attorney-forward */}
      <div className="sticky top-0 z-0 h-[100svh] w-full"><Hero /></div>
      <div className="relative z-10 w-full bg-background">
        <HomeImmediateTrust />  {/* 2 — Trust strip */}
        <TrustBadges />         {/* 3 — Credentials */}
        <FirmSnapshot />        {/* 4 — Firm metrics */}
        <Locations />           {/* 5 — Practice areas */}
      </div>
    </div>
    <div className="relative z-20 bg-background">
      <Experience />            {/* 6 — What happens after you call */}
      <SelectedResult />        {/* 7 — Results */}
      <DirectAccess />          {/* 8 — Meet Howard Choi */}
      <ClientSuccessFeature />  {/* 9 — Testimonials */}
      <HomeServiceAreas />      {/* 10 — Areas served */}
      <FAQ />                   {/* 11 — FAQ */}
      <Booking />               {/* 12 — CTA */}
      <Footer />
    </div>
  </div>
);

export default Index;
