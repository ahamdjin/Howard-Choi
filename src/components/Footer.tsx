import { Link } from "react-router-dom";
import brandLogo from "@/assets/law-firm/howard-choi-mark.webp";
import { brand, practiceAreas, serviceLocations } from "@/data/injurySite";

const Footer = () => {
  return (
    <footer className="bg-background py-24 text-foreground md:py-28 lg:py-32">
      <div className="site-shell">
        <div className="grid gap-12 border-b border-black/10 pb-16 md:grid-cols-4 lg:gap-14">
          <div>
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-[2px]"><img src={brandLogo} alt="" width={28} height={28} loading="lazy" decoding="async" className="h-full w-full object-cover invert" /></span>
              <span className="text-[14px] font-medium tracking-[-0.02em]">{brand.name}</span>
            </div>
            <p className="max-w-[270px] text-[13px] leading-6 text-muted-foreground">Accident and personal-injury counsel centered on Buena Park and nearby communities.</p>
            <a href={brand.phoneHref} className="mt-5 block text-[13px] font-medium hover:opacity-60">{brand.phoneDisplay}</a>
          </div>

          <div>
            <div className="mb-5 text-[12px] text-muted-foreground">Practice Areas</div>
            <div className="space-y-3 text-[13px]">
              {practiceAreas.slice(0, 5).map((practice) => <Link key={practice.slug} to={`/practice-areas/${practice.slug}`} className="block hover:opacity-60">{practice.title}</Link>)}
              <Link to="/practice-areas" className="block text-muted-foreground hover:text-foreground">View all →</Link>
            </div>
          </div>

          <div>
            <div className="mb-5 text-[12px] text-muted-foreground">Locations</div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-[13px] md:grid-cols-1">
              {serviceLocations.map((location) => <Link key={location.slug} to={`/locations/${location.slug}`} className="block hover:opacity-60">{location.name}</Link>)}
            </div>
          </div>

          <div>
            <div className="mb-5 text-[12px] text-muted-foreground">Firm</div>
            <div className="space-y-3 text-[13px]">
              <Link to="/attorney" className="block hover:opacity-60">Howard Choi</Link>
              <Link to="/results" className="block hover:opacity-60">Results</Link>
              <Link to="/blogs" className="block hover:opacity-60">Law Blog</Link>
              <Link to="/about" className="block hover:opacity-60">About</Link>
              <Link to="/contact" className="block hover:opacity-60">Contact</Link>
            </div>
            <div className="mt-7 text-[12px] leading-5 text-muted-foreground">{brand.address}</div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 {brand.name}</span>
          <span>Attorney advertising · General information only · Prior results do not guarantee a similar outcome</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
