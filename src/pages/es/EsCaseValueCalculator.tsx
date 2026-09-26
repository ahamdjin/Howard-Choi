import { useMemo, useState } from "react";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";
import SpanishNavigation from "@/components/SpanishNavigation";
import SpanishFooter from "@/components/SpanishFooter";

type Severity = "minor" | "moderate" | "serious" | "catastrophic";
type Treatment = "minimal" | "ongoing" | "surgery";

const severityRange: Record<Severity, [number, number]> = {
  minor: [0.75, 1.5],
  moderate: [1.5, 2.75],
  serious: [2.75, 4.25],
  catastrophic: [4.25, 5.5],
};

const treatmentBoost: Record<Treatment, number> = { minimal: 0, ongoing: 0.35, surgery: 0.75 };
const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.max(0, value || 0));

const EsCaseValueCalculator = () => {
  const [severity, setSeverity] = useState<Severity | "">("");
  const [treatment, setTreatment] = useState<Treatment | "">("");
  const [medical, setMedical] = useState(0);
  const [futureMedical, setFutureMedical] = useState(0);
  const [lostWages, setLostWages] = useState(0);
  const [futureIncome, setFutureIncome] = useState(0);
  const [property, setProperty] = useState(0);
  const [fault, setFault] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [error, setError] = useState("");

  const estimate = useMemo(() => {
    if (!severity || !treatment) return null;
    const medicalBase = medical + futureMedical;
    const economic = medicalBase + lostWages + futureIncome + property;
    const [severityLow, severityHigh] = severityRange[severity];
    const boost = treatmentBoost[treatment];
    const multiplierLow = Math.min(5.5, Math.max(0.75, severityLow + boost));
    const multiplierHigh = Math.min(6.25, Math.max(1.25, severityHigh + boost));
    const nonEconomicLow = medicalBase * multiplierLow;
    const nonEconomicHigh = medicalBase * multiplierHigh;
    const faultFactor = Math.max(0, 1 - fault / 100);
    return {
      economic,
      nonEconomicLow,
      nonEconomicHigh,
      faultFactor,
      low: (economic + nonEconomicLow) * faultFactor * 0.85,
      high: (economic + nonEconomicHigh) * faultFactor * 1.15,
    };
  }, [severity, treatment, medical, futureMedical, lostWages, futureIncome, property, fault]);

  const calculate = () => {
    const financial = medical + futureMedical + lostWages + futureIncome + property;
    if (!severity || !treatment) { setError("Seleccione la gravedad de la lesión y el nivel de tratamiento."); return; }
    if (financial <= 0) { setError("Añada al menos una pérdida económica para mostrar un rango."); return; }
    setError("");
    setCalculated(true);
    window.setTimeout(() => document.getElementById("es-case-estimate")?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
  };

  const num = (value: string) => Math.max(0, Number(value.replace(/[^0-9.]/g, "")) || 0);

  return (
    <div className="min-h-screen bg-[#f7f6f3] text-[#211e1b]">
      <SpanishNavigation />
      <main className="site-shell py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
          <div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-[#211e1b]/40">Herramienta educativa</div>
            <h1 className="editorial-serif mt-5 text-[clamp(2.7rem,5vw,5rem)] leading-[0.94] tracking-[-0.04em]">Calculadora de valor de un caso de lesiones personales.</h1>
            <p className="mt-6 max-w-[590px] text-[14px] leading-7 text-[#211e1b]/62">Responda algunas preguntas para obtener un rango educativo aproximado. No es una valoración de su caso, una oferta de acuerdo ni una predicción de un veredicto.</p>
            <div className="mt-8 rounded-[3px] border border-[#211e1b]/10 bg-white/55 p-5 text-[12px] leading-6 text-[#211e1b]/58"><strong>Importante:</strong> el modelo usa una aproximación educativa para daños no económicos. California no exige un multiplicador fijo de facturas médicas.</div>
          </div>

          <div className="rounded-[4px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:p-8">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.13em] text-[#211e1b]/40"><Calculator className="h-4 w-4" /> Calcular</div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="text-sm">Gravedad de la lesión<select value={severity} onChange={(e) => { setSeverity(e.target.value as Severity | ""); setCalculated(false); }} className="mt-2 h-11 w-full border border-[#211e1b]/15 bg-[#f7f6f3] px-3 text-sm"><option value="">Seleccionar</option><option value="minor">Menor</option><option value="moderate">Moderada</option><option value="serious">Grave</option><option value="catastrophic">Catastrófica</option></select></label>
              <label className="text-sm">Tratamiento<select value={treatment} onChange={(e) => { setTreatment(e.target.value as Treatment | ""); setCalculated(false); }} className="mt-2 h-11 w-full border border-[#211e1b]/15 bg-[#f7f6f3] px-3 text-sm"><option value="">Seleccionar</option><option value="minimal">Atención limitada</option><option value="ongoing">Tratamiento continuo</option><option value="surgery">Cirugía / rehabilitación importante</option></select></label>
              <label className="text-sm">Gastos médicos<input inputMode="decimal" value={medical || ""} onChange={(e) => { setMedical(num(e.target.value)); setCalculated(false); }} placeholder="$0" className="mt-2 h-11 w-full border border-[#211e1b]/15 bg-[#f7f6f3] px-3 text-sm" /></label>
              <label className="text-sm">Salarios perdidos<input inputMode="decimal" value={lostWages || ""} onChange={(e) => { setLostWages(num(e.target.value)); setCalculated(false); }} placeholder="$0" className="mt-2 h-11 w-full border border-[#211e1b]/15 bg-[#f7f6f3] px-3 text-sm" /></label>
            </div>

            <div className="mt-6 border-t border-[#211e1b]/10 pt-5">
              <div className="flex items-center justify-between gap-4"><label htmlFor="es-fault" className="text-sm">Porcentaje estimado de su propia culpa</label><strong>{fault}%</strong></div>
              <input id="es-fault" type="range" min="0" max="100" step="5" value={fault} onChange={(e) => { setFault(Number(e.target.value)); setCalculated(false); }} className="mt-3 w-full accent-[#6E635A]" />
            </div>

            <button type="button" onClick={() => setShowAdvanced((v) => !v)} className="mt-6 text-xs font-medium underline underline-offset-4">{showAdvanced ? "Ocultar pérdidas adicionales" : "Añadir pérdidas futuras o adicionales"}</button>
            {showAdvanced && <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <label className="text-xs">Atención médica futura<input inputMode="decimal" value={futureMedical || ""} onChange={(e) => { setFutureMedical(num(e.target.value)); setCalculated(false); }} placeholder="$0" className="mt-2 h-10 w-full border border-[#211e1b]/15 bg-[#f7f6f3] px-3 text-sm" /></label>
              <label className="text-xs">Ingresos futuros perdidos<input inputMode="decimal" value={futureIncome || ""} onChange={(e) => { setFutureIncome(num(e.target.value)); setCalculated(false); }} placeholder="$0" className="mt-2 h-10 w-full border border-[#211e1b]/15 bg-[#f7f6f3] px-3 text-sm" /></label>
              <label className="text-xs">Daños a la propiedad<input inputMode="decimal" value={property || ""} onChange={(e) => { setProperty(num(e.target.value)); setCalculated(false); }} placeholder="$0" className="mt-2 h-10 w-full border border-[#211e1b]/15 bg-[#f7f6f3] px-3 text-sm" /></label>
            </div>}

            {error && <p className="mt-5 text-sm text-red-700">{error}</p>}
            <button type="button" onClick={calculate} className="mt-6 flex h-11 w-full items-center justify-between rounded-[3px] bg-[#211e1b] px-5 text-[12px] font-semibold text-white"><span>Estimar rango</span><ArrowRight className="h-4 w-4" /></button>

            <div id="es-case-estimate" className="mt-7 border-t border-[#211e1b]/10 pt-6">
              {calculated && estimate ? <>
                <div className="text-[10px] uppercase tracking-[0.13em] text-[#211e1b]/40">Rango educativo</div>
                <div className="editorial-serif mt-3 text-[clamp(2rem,4vw,3rem)] leading-none">{money(estimate.low)} – {money(estimate.high)}</div>
                <div className="mt-5 space-y-2 border-t border-[#211e1b]/10 pt-4 text-[12px]">
                  <div className="flex justify-between gap-4"><span className="text-[#211e1b]/52">Pérdidas económicas</span><strong>{money(estimate.economic)}</strong></div>
                  <div className="flex justify-between gap-4"><span className="text-[#211e1b]/52">Modelo no económico</span><strong>{money(estimate.nonEconomicLow)} – {money(estimate.nonEconomicHigh)}</strong></div>
                  <div className="flex justify-between gap-4"><span className="text-[#211e1b]/52">Ajuste por culpa</span><strong>× {estimate.faultFactor.toFixed(2)}</strong></div>
                </div>
              </> : <p className="text-[12px] leading-6 text-[#211e1b]/48">Introduzca sus datos y seleccione “Estimar rango” para ver un resultado educativo.</p>}
            </div>
          </div>
        </div>

        <section className="mt-16 border-t border-[#211e1b]/12 pt-10">
          <h2 className="editorial-serif text-[clamp(2rem,3.5vw,3.4rem)] leading-[1.02]">Qué no puede decirle una calculadora.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[["Seguro", "Los límites de póliza y la existencia de otras coberturas pueden cambiar la recuperación práctica."], ["Evidencia", "La calidad de registros médicos, video, testigos y documentación económica puede cambiar el análisis."], ["Responsabilidad", "La culpa discutida, entidades públicas, empresas y otras partes pueden hacer el caso mucho más complejo."]].map(([title, body]) => <div key={title} className="border-t border-[#211e1b]/12 pt-5"><CheckCircle2 className="h-4 w-4 text-[#7b5b3e]" /><h3 className="mt-4 text-lg">{title}</h3><p className="mt-2 text-sm leading-6 text-[#211e1b]/58">{body}</p></div>)}
          </div>
        </section>
      </main>
      <SpanishFooter />
    </div>
  );
};

export default EsCaseValueCalculator;
