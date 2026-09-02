import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import Experience from "@/components/Experience";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navigation />

      {/* Keep the first image pinned while the light section physically scrolls
          over it, mirroring the simple layered transition used in Chambers. */}
      <div className="relative isolate">
        <div className="sticky top-0 z-0 h-screen">
          <Hero />
        </div>

        <div className="relative z-10 bg-background">
          <Locations />
        </div>
      </div>

      <div className="relative z-20 bg-background">
        <Experience />
        <Booking />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
