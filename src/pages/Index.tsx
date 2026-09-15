import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HomeSections from "@/components/HomeSections";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="home-page min-h-[100svh] overflow-x-clip bg-[#f7f6f2]">
    <Navigation />
    <main>
      <Hero />
      <HomeSections />
    </main>
    <Footer />
  </div>
);

export default Index;
