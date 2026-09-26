import { Check, Phone } from "lucide-react";
import SpanishNavigation from "@/components/SpanishNavigation";
import SpanishFooter from "@/components/SpanishFooter";
import { brand } from "@/data/injurySite";

const EsThankYou = () => (
  <div className="min-h-screen bg-background text-foreground">
    <SpanishNavigation />
    <main className="site-shell flex min-h-[72svh] items-center py-16">
      <div className="mx-auto max-w-[720px] text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#211c17] text-[#f3eee5]"><Check className="h-5 w-5" /></div>
        <div className="mt-6 text-[10px] uppercase tracking-[0.15em] text-foreground/40">Mensaje recibido</div>
        <h1 className="editorial-serif mt-4 text-[clamp(2.8rem,5vw,5rem)] leading-[0.96] tracking-[-0.04em]">Gracias por comunicarse.</h1>
        <p className="mx-auto mt-6 max-w-[570px] text-[14px] leading-7 text-foreground/60">La información que envió fue recibida. El equipo puede revisar su mensaje y comunicarse con usted según la información proporcionada.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><a href="/es" className="inline-flex min-h-11 items-center bg-[#211c17] px-5 py-3 text-sm font-medium text-[#f3eee5]">Volver al inicio</a><a href={brand.phoneHref} className="inline-flex min-h-11 items-center gap-2 border border-foreground/15 px-5 py-3 text-sm font-medium"><Phone className="h-4 w-4" />{brand.phoneDisplay}</a></div>
      </div>
    </main>
    <SpanishFooter />
  </div>
);

export default EsThankYou;
