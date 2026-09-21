import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FirmSnapshot from "@/components/FirmSnapshot";
import Locations from "@/components/Locations";
import Experience from "@/components/Experience";
import SelectedResult from "@/components/SelectedResult";
import DirectAccess from "@/components/DirectAccess";
import ClientSuccessFeature from "@/components/ClientSuccessFeature";
import FAQ from "@/components/FAQ";
import Booking from "@/components/Booking";
import AccidentLawyerGuide from "@/components/AccidentLawyerGuide";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="home-page min-h-[100svh] overflow-x-clip bg-background">
    <Navigation />
    <div className="relative">
      <div className="sticky top-0 z-0 h-[100svh] w-full"><Hero /></div>
      <div className="relative z-10 w-full bg-background">
        <FirmSnapshot />
        <Locations />
      </div>
    </div>
    <div className="relative z-20 bg-background">
      <Experience />
      <SelectedResult />
      <DirectAccess />
      <ClientSuccessFeature />
      <FAQ />
      <AccidentLawyerGuide />
      <Booking />
      <Footer />
    </div>
  </div>
);

export default Index;
