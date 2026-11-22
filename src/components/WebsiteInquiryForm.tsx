import { Button } from "@/components/ui/button";
import { trackExternalFormSubmission } from "@/lib/inquiry-client";
import { useEffect, useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SiteLocale } from "@/data/injurySite";
import { cn } from "@/lib/utils";

type WebsiteInquiryFormProps = {
  locale?: SiteLocale;
  prominentSubmit?: boolean;
};

const WebsiteInquiryForm = ({ locale = "en", prominentSubmit = false }: WebsiteInquiryFormProps) => {
  const [dirty, setDirty] = useState(false);
  const fieldId = useId();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isKorean = locale === "ko";
  const isSpanish = locale === "es";
  const prefix = isKorean ? "/ko" : isSpanish ? "/es" : "";
  const privacyHref = `${prefix}/privacy-policy`;
  const termsHref = `${prefix}/terms`;

  useEffect(() => {
    if (!dirty || isSubmitting) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, isSubmitting]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const feedback = event.target.validationMessage;
    if (errors[name] && errors[name] !== feedback) {
      setErrors(current => ({ ...current, [name]: feedback }));
    }
    const form = event.target.form;
    const hasInput = Boolean(value || (form && Array.from(new FormData(form).values()).some(Boolean)));
    if (dirty !== hasInput) setDirty(hasInput);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    await trackExternalFormSubmission(locale);
    window.location.assign(`${prefix}/thank-you`);
  };

  const fullName = isKorean ? "성명" : isSpanish ? "Nombre completo" : "Full name";
  const email = isKorean ? "이메일" : isSpanish ? "Correo electrónico" : "Email";
  const phone = isKorean ? "전화번호 (선택 사항)" : isSpanish ? "Teléfono (opcional)" : "Phone (optional)";
  const subject = isKorean ? "문의 제목" : isSpanish ? "Asunto" : "Subject";
  const message = isKorean ? "사안의 간단한 개요" : isSpanish ? "Breve resumen del asunto" : "A brief outline of the matter";
  const sending = isKorean ? "전송 중…" : isSpanish ? "Enviando…" : "Sending…";
  const send = isKorean ? "문의 보내기" : isSpanish ? "Enviar consulta" : "Send inquiry";

  return (
    <form
      id={isSpanish ? "website-inquiry-form-es" : "website-inquiry-form"}
      name={isSpanish ? "Website Inquiry Spanish" : "Website Inquiry"}
      data-form-name={isSpanish ? "Website Inquiry Spanish" : "Website Inquiry"}
      data-external-form="highlevel"
      onInvalid={(event) => {
        const field = event.target;
        if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
          const { name, validationMessage } = field;
          setErrors(current => ({ ...current, [name]: validationMessage }));
        }
      }}
      onSubmit={handleSubmit}
      className="mt-8 space-y-3"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium" htmlFor={fieldId + "-full_name"}>{fullName}</label>
        <Input name="full_name" onChange={handleChange} required autoComplete="name" id={fieldId + "-full_name"} aria-invalid={Boolean(errors.full_name)} aria-describedby={errors.full_name ? fieldId + "-full_name-error" : undefined} className="h-12 rounded-[2px] border-foreground/10 bg-background/70 px-4 text-[13px] shadow-none" />
        {errors.full_name && <p id={fieldId + "-full_name-error"} className="mt-1 text-sm text-red-800">{errors.full_name}</p>}
      </div>
        <div><label className="mb-1 block text-sm font-medium" htmlFor={fieldId + "-email"}>{email}</label>
        <Input name="email" type="email" inputMode="email" spellCheck={false} onChange={handleChange} required autoComplete="email" id={fieldId + "-email"} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? fieldId + "-email-error" : undefined} className="h-12 rounded-[2px] border-foreground/10 bg-background/70 px-4 text-[13px] shadow-none" />
        {errors.email && <p id={fieldId + "-email-error"} className="mt-1 text-sm text-red-800">{errors.email}</p>}
      </div>
      </div>
      <div><label className="mb-1 block text-sm font-medium" htmlFor={fieldId + "-phone"}>{phone}</label>
        <Input name="phone" type="tel" inputMode="tel" autoComplete="tel" onChange={handleChange} id={fieldId + "-phone"} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? fieldId + "-phone-error" : undefined} className="h-12 rounded-[2px] border-foreground/10 bg-background/70 px-4 text-[13px] shadow-none" />
        {errors.phone && <p id={fieldId + "-phone-error"} className="mt-1 text-sm text-red-800">{errors.phone}</p>}
      </div>
      <div><label className="mb-1 block text-sm font-medium" htmlFor={fieldId + "-subject"}>{subject}</label>
        <Input name="subject" onChange={handleChange} required id={fieldId + "-subject"} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? fieldId + "-subject-error" : undefined} className="h-12 rounded-[2px] border-foreground/10 bg-background/70 px-4 text-[13px] shadow-none" />
        {errors.subject && <p id={fieldId + "-subject-error"} className="mt-1 text-sm text-red-800">{errors.subject}</p>}
      </div>
      <div><label className="mb-1 block text-sm font-medium" htmlFor={fieldId + "-message"}>{message}</label>
        <Textarea name="message" onChange={handleChange} required id={fieldId + "-message"} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? fieldId + "-message-error" : undefined} rows={7} className="resize-y rounded-[2px] border-foreground/10 bg-background/70 p-4 text-[13px] leading-6 shadow-none" />
        {errors.message && <p id={fieldId + "-message-error"} className="mt-1 text-sm text-red-800">{errors.message}</p>}
      </div>
      <Button variant="ink"
        type="submit"
        disabled={isSubmitting}
        className={cn("mt-2 disabled:cursor-wait", prominentSubmit && "min-h-12 w-full rounded-full bg-[#2b241e] px-6 hover:bg-[#47382c] sm:w-auto")}
      >
        <span aria-live="polite" className="relative z-10">{isSubmitting ? sending : send}</span>
      </Button>
      <p className="max-w-[520px] pt-2 text-[10px] leading-5 text-foreground/70">
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
