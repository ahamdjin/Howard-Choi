import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SiteLocale } from "@/data/injurySite";

type WebsiteInquiryFormProps = {
  locale?: SiteLocale;
};

const WebsiteInquiryForm = ({ locale = "en" }: WebsiteInquiryFormProps) => {
  const [formData, setFormData] = useState({ full_name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isKorean = locale === "ko";
  const isSpanish = locale === "es";
  const prefix = isKorean ? "/ko" : isSpanish ? "/es" : "";
  const privacyHref = `${prefix}/privacy-policy`;
  const termsHref = `${prefix}/terms`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    window.setTimeout(() => {
      window.location.assign(`${prefix}/thank-you`);
    }, 1500);
  };

  const fullName = isKorean ? "성명" : isSpanish ? "Nombre completo" : "Full name";
  const email = isKorean ? "이메일" : isSpanish ? "Correo electrónico" : "Email";
  const subject = isKorean ? "문의 제목" : isSpanish ? "Asunto" : "Subject";
  const message = isKorean ? "사안의 간단한 개요" : isSpanish ? "Breve resumen del asunto" : "A brief outline of the matter";
  const sending = isKorean ? "전송 중..." : isSpanish ? "Enviando..." : "Sending...";
  const send = isKorean ? "문의 보내기" : isSpanish ? "Enviar consulta" : "Send inquiry";

  return (
    <form
      id={isSpanish ? "website-inquiry-form-es" : "website-inquiry-form"}
      name={isSpanish ? "Website Inquiry Spanish" : "Website Inquiry"}
      data-form-name={isSpanish ? "Website Inquiry Spanish" : "Website Inquiry"}
      data-external-form="highlevel"
      onSubmit={handleSubmit}
      className="mt-8 space-y-3"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Input name="full_name" value={formData.full_name} onChange={handleChange} required autoComplete="name" placeholder={fullName} aria-label={fullName} className="h-12 rounded-[2px] border-foreground/10 bg-background/70 px-4 text-[13px] shadow-none" />
        <Input name="email" type="email" value={formData.email} onChange={handleChange} required autoComplete="email" placeholder={email} aria-label={email} className="h-12 rounded-[2px] border-foreground/10 bg-background/70 px-4 text-[13px] shadow-none" />
      </div>
      <Input name="subject" value={formData.subject} onChange={handleChange} required placeholder={subject} aria-label={subject} className="h-12 rounded-[2px] border-foreground/10 bg-background/70 px-4 text-[13px] shadow-none" />
      <Textarea name="message" value={formData.message} onChange={handleChange} required placeholder={message} aria-label={message} rows={7} className="resize-none rounded-[2px] border-foreground/10 bg-background/70 p-4 text-[13px] leading-6 shadow-none" />
      <button type="submit" disabled={isSubmitting} className="liquid-cta mt-2 inline-flex rounded-full px-6 py-3 text-[12px] font-medium disabled:cursor-wait disabled:opacity-70">
        <span className="relative z-10">{isSubmitting ? sending : send}</span>
      </button>
      <p className="max-w-[520px] pt-2 text-[10px] leading-5 text-foreground/42">
        {isKorean ? "문의를 보내면 " : isSpanish ? "Al enviar este formulario, reconoce nuestra " : "By submitting, you acknowledge our "}
        <a href={privacyHref} className="underline underline-offset-2 hover:text-foreground">{isKorean ? "개인정보 처리방침" : isSpanish ? "Política de privacidad" : "Privacy Policy"}</a>
        {isKorean ? " 및 " : isSpanish ? " y nuestros " : " and "}
        <a href={termsHref} className="underline underline-offset-2 hover:text-foreground">{isKorean ? "이용약관" : isSpanish ? "Términos de uso" : "Terms of Use"}</a>
        {isKorean ? "을 확인한 것으로 간주됩니다." : "."}
      </p>
    </form>
  );
};

export default WebsiteInquiryForm;
