import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import brandLogo from "@/assets/law-firm/howard-choi-logo.png";
import { brand, practiceAreas, serviceLocations } from "@/data/injurySite";
import { esPracticeContent } from "@/data/esPracticeContent";

const SpanishFooter = () => (
  <footer className="bg-background py-24 text-foreground md:py-28 lg:py-32">
    <div className="site-shell">
      <div className="grid gap-12 border-b border-black/10 pb-16 md:grid-cols-2 lg:grid-cols-5 lg:gap-10">
        <div>
          <div className="mb-5 flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-[2px]"><img src={brandLogo} alt="" width={28} height={28} loading="lazy" decoding="async" className="h-full w-full object-contain" /></span>
            <span className="text-[14px] font-medium tracking-[-0.02em]">{brand.name}</span>
          </div>
          <p className="max-w-[280px] text-[13px] leading-6 text-muted-foreground">Información y representación en lesiones personales para accidentes en Buena Park y comunidades cercanas de Orange y Los Angeles County.</p>
        </div>

        <div>
          <div className="mb-5 text-[12px] text-muted-foreground">Áreas de práctica</div>
          <div className="space-y-3 text-[13px]">
            {practiceAreas.slice(0, 5).map((practice) => <Link key={practice.slug} to={`/es/practice-areas/${practice.slug}`} className="block hover:opacity-60">{esPracticeContent[practice.slug]?.shortTitle || practice.title}</Link>)}
            <Link to="/es/practice-areas" className="block text-muted-foreground hover:text-foreground">Ver todas →</Link>
          </div>
        </div>

        <div>
          <div className="mb-5 text-[12px] text-muted-foreground">Zonas de servicio</div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-[13px] md:grid-cols-1">
            {serviceLocations.map((location) => <Link key={location.slug} to={`/es/locations/${location.slug}`} className="block hover:opacity-60">{location.name}</Link>)}
          </div>
        </div>

        <div>
          <div className="mb-5 text-[12px] text-muted-foreground">Firma</div>
          <div className="space-y-3 text-[13px]">
            <Link to="/es/attorney" className="block hover:opacity-60">Abogado</Link>
            <Link to="/es/results" className="block hover:opacity-60">Resultados</Link>
            <Link to="/es/case-value-calculator" className="block hover:opacity-60">Calculadora del caso</Link>
            <Link to="/es/blogs" className="block hover:opacity-60">Guías legales</Link>
            <Link to="/es/about" className="block hover:opacity-60">La firma</Link>
            <Link to="/es/contact" className="block hover:opacity-60">Contacto</Link>
          </div>
        </div>

        <div>
          <div className="mb-5 text-[12px] text-muted-foreground">Contacto</div>
          <a href={brand.mapsHref} target="_blank" rel="noreferrer" className="group flex gap-2.5 text-[13px] leading-6 hover:opacity-60"><MapPin className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" /><span>{brand.address}<span className="mt-1 block text-[11px] text-muted-foreground underline underline-offset-4">Ver en Google Maps</span></span></a>
          <a href={brand.phoneHref} className="mt-4 flex items-center gap-2.5 text-[13px] font-medium hover:opacity-60"><Phone className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />{brand.phoneDisplay}</a>
          <a href={brand.emailHref} className="mt-2.5 flex items-center gap-2.5 text-[13px] hover:opacity-60"><Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />{brand.email}</a>
        </div>
      </div>

      <div className="grid gap-5 pt-8 text-[11px] text-muted-foreground lg:grid-cols-[auto_1fr_auto] lg:items-center">
        <span>© 2026 {brand.name}</span>
        <div className="flex flex-wrap gap-x-4 gap-y-2 lg:justify-center">
          <Link to="/es/privacy-policy" className="hover:text-foreground">Privacidad</Link>
          <Link to="/es/terms" className="hover:text-foreground">Términos de uso</Link>
          <Link to="/es/disclaimer" className="hover:text-foreground">Aviso legal</Link>
          <Link to="/es/accessibility" className="hover:text-foreground">Accesibilidad</Link>
        </div>
        <span className="max-w-[430px] lg:text-right">Publicidad de abogado · Información general solamente · Los resultados anteriores no garantizan un resultado similar</span>
      </div>
    </div>
  </footer>
);

export default SpanishFooter;
