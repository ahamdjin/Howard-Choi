import { ArrowUpRight } from "lucide-react";
import logo from "@/assets/law-firm/howard-choi-logo.png";
import carImage from "@/assets/law-firm/car-collision.jpg";
import courtImage from "@/assets/law-firm/hero-courthouse.webp";
import medicalImage from "@/assets/law-firm/medical-care.jpg";
import familyImage from "@/assets/law-firm/family-support.jpg";

const BeforeFirstCall = () => (
  <section className="relative mx-auto h-[98svh] min-h-[740px] max-h-[1000px] w-full overflow-hidden bg-[#181715] text-white">
    <div className="site-shell flex h-full w-full flex-col justify-center py-20">
      <div className="mx-auto mb-9 max-w-[760px] text-center">
        <img src={logo} alt="" className="mx-auto mb-5 h-auto w-[105px] brightness-0 invert opacity-80" />
        <p className="text-[8px] uppercase tracking-[0.2em] text-white/38">Before your first call</p>
        <h2 className="editorial-serif mt-3 text-[clamp(2.8rem,5vw,5.2rem)] leading-[0.9] tracking-[-0.045em]">
          Four things worth<br /><span className="text-white/38">knowing early.</span>
        </h2>
      </div>

      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-2 gap-2 md:grid-cols-4">
        {[
          [carImage, "01", "What to do after an accident", "/blogs/what-to-do-after-a-car-accident-in-california"],
          [courtImage, "02", "California injury deadlines", "/blogs/california-personal-injury-deadlines"],
          [medicalImage, "03", "Insurance & medical evidence", "/practice-areas/car-accidents"],
          [familyImage, "04", "What affects claim value", "/case-value-calculator"],
        ].map(([image, number, title, href]) => (
          <a key={number} href={href} className="group relative h-[250px] overflow-hidden rounded-[2px] md:h-[340px]">
            <img src={image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/5 to-black/8" />
            <div className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
              <div className="text-[8px] text-white/42">{number}</div>
              <h3 className="editorial-serif mt-2 text-[clamp(1.15rem,1.8vw,1.8rem)] leading-[1.02]">{title}</h3>
            </div>
            <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-white/48 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default BeforeFirstCall;
