import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SpanishInquiryForm = () => {
  const [formData, setFormData] = useState({ full_name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    window.setTimeout(() => window.location.assign("/es/thank-you"), 1500);
  };

  return (
    <form id="website-inquiry-form-es" name="Website Inquiry Spanish" data-form-name="Website Inquiry Spanish" data-external-form="highlevel" onSubmit={handleSubmit} className="mt-8 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input name="full_name" value={formData.full_name} onChange={handleChange} required autoComplete="name" placeholder="Nombre completo" aria-label="Nombre completo" className="h-12 rounded-[2px] border-foreground/10 bg-background/70 px-4 text-[13px] shadow-none" />
        <Input name="email" type="email" value={formData.email} onChange={handleChange} required autoComplete="email" placeholder="Correo electrónico" aria-label="Correo electrónico" className="h-12 rounded-[2px] border-foreground/10 bg-background/70 px-4 text-[13px] shadow-none" />
      </div>
      <Input name="subject" value={formData.subject} onChange={handleChange} required placeholder="Asunto" aria-label="Asunto" className="h-12 rounded-[2px] border-foreground/10 bg-background/70 px-4 text-[13px] shadow-none" />
      <Textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Cuéntenos brevemente qué ocurrió" aria-label="Resumen del asunto" rows={7} className="resize-none rounded-[2px] border-foreground/10 bg-background/70 p-4 text-[13px] leading-6 shadow-none" />
      <button type="submit" disabled={isSubmitting} className="liquid-cta mt-2 inline-flex rounded-full px-6 py-3 text-[12px] font-medium disabled:cursor-wait disabled:opacity-70"><span className="relative z-10">{isSubmitting ? "Enviando..." : "Enviar consulta"}</span></button>
      <p className="max-w-[520px] pt-2 text-[10px] leading-5 text-foreground/42">Al enviar este formulario, reconoce nuestra <a href="/es/privacy-policy" className="underline underline-offset-2 hover:text-foreground">Política de privacidad</a> y nuestros <a href="/es/terms" className="underline underline-offset-2 hover:text-foreground">Términos de uso</a>.</p>
    </form>
  );
};

export default SpanishInquiryForm;
