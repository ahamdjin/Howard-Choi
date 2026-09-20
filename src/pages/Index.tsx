import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HomeImmediateTrust from "@/components/HomeImmediateTrust";
import Locations from "@/components/Locations";
import HomePracticeAreasOverview from "@/components/HomePracticeAreasOverview";
import FirmSnapshot from "@/components/FirmSnapshot";
import DirectAccess from "@/components/DirectAccess";
import SelectedResult from "@/components/SelectedResult";
import ClientSuccessFeature from "@/components/ClientSuccessFeature";
import HomeServiceAreas from "@/components/HomeServiceAreas";
import HomeUsefulInfo from "@/components/HomeUsefulInfo";
import Experience from "@/components/Experience";
import FAQ from "@/components/FAQ";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="home-page min-h-[100svh] overflow-x-clip bg-background">
    <Navigation />

    <div className="relative">
      <div className="sticky top-0 z-0 h-[100svh] w-full"><Hero /></div>
      <div className="relative z-10 w-full bg-background">
        <HomeImmediateTrust />

        {/* Existing animated practice-area design stays intact for review. */}
        <Locations />

        {/* New complete practice-area section; existing design above is not removed. */}
        <HomePracticeAreasOverview />

        <FirmSnapshot />
      </div>
    </div>

    <div className="relative z-20 bg-background">
      <DirectAccess />

      {/* Existing social-proof sections stay intact. */}
      <SelectedResult />
      <ClientSuccessFeature />

      <HomeServiceAreas />
      <HomeUsefulInfo />

      {/* Existing claim-process section is retained as useful PI information. */}
      <Experience />

      <FAQ />
      <Booking />
      <Footer />
    </div>
  </div>
);

export default Index;
