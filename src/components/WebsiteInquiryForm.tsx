import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type WebsiteInquiryFormProps = {
  locale?: "en" | "ko";
};

const WebsiteInquiryForm = ({ locale = "en" }: WebsiteInquiryFormProps) => {
  const [formData, setFormData] = useState({ full_name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isKorean = locale === "ko";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    // HighLevel External Tracking listens to the native submit event and reads the
    // visible DOM fields. Keep the values in place briefly, then move to thank-you.
    window.setTimeout(() => {
      window.location.assign(isKorean ? "/ko/thank-you" : "/thank-you");
    }, 900);
  };

  return (
    <form
      id="website-form"
      name="website form"
      data-form-name="website form"
      onSubmit={handleSubmit}
      className="mt-8 space-y-3"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
          autoComplete="name"
          placeholder={isKorean ? "성명" : "Full name"}
          aria-label={isKorean ? "성명" : "Full name"}
          className="h-12 rounded-[2px] border-foreground/10 bg-background/70 px-4 text-[13px] shadow-none"
        />
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          placeholder={isKorean ? "이메일" : "Email"}
          aria-label={isKorean ? "이메일" : "Email"}
          className="h-12 rounded-[2px] border-foreground/10 bg-background/70 px-4 text-[13px] shadow-none"
        />
      </div>
      <Input
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        required
        placeholder={isKorean ? "문의 제목" : "Subject"}
        aria-label={isKorean ? "문의 제목" : "Subject"}
        className="h-12 rounded-[2px] border-foreground/10 bg-background/70 px-4 text-[13px] shadow-none"
      />
      <Textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        placeholder={isKorean ? "사안의 간단한 개요" : "A brief outline of the matter"}
        aria-label={isKorean ? "사안의 간단한 개요" : "A brief outline of the matter"}
        rows={7}
        className="resize-none rounded-[2px] border-foreground/10 bg-background/70 p-4 text-[13px] leading-6 shadow-none"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="liquid-cta mt-2 inline-flex rounded-full px-6 py-3 text-[12px] font-medium disabled:cursor-wait disabled:opacity-70"
      >
        <span className="relative z-10">
          {isSubmitting
            ? isKorean ? "전송 중..." : "Sending..."
            : isKorean ? "문의 보내기" : "Send inquiry"}
        </span>
      </button>
    </form>
  );
};

export default WebsiteInquiryForm;
