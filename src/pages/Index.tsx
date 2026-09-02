import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import Experience from "@/components/Experience";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Navigation />

      {/* Chambers-style layering:
          The hero is genuinely pinned to the viewport while the following
          opaque section remains in the normal document flow and slides over it.

          Important: do not use overflow-x-hidden on an ancestor here. It can
          create a scrolling ancestor and prevent position: sticky from sticking
          to the viewport. overflow-x-clip avoids horizontal spill without
          interfering with sticky positioning. */}
      <div className="relative">
        <div className="sticky top-0 z-0 h-screen w-full">
          <Hero />
        </div>

        <div className="relative z-10 w-full bg-background">
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
