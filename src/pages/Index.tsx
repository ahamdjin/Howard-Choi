import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import Experience from "@/components/Experience";
import DirectAccess from "@/components/DirectAccess";
import Testimonial from "@/components/Testimonial";
import FAQ from "@/components/FAQ";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-[100svh] overflow-x-clip bg-background">
      <Navigation />

      <div className="relative">
        <div className="sticky top-0 z-0 h-[100svh] w-full">
          <Hero />
        </div>

        <div className="relative z-10 w-full bg-background">
          <Locations />
        </div>
      </div>

      <div className="relative z-20 bg-background">
        <Experience />
        <DirectAccess />
        <Testimonial />
        <FAQ />
        <Booking />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
