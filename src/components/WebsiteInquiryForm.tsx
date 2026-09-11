import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type WebsiteInquiryFormProps = {
  locale?: "en" | "ko";
};

const WebsiteInquiryForm = ({ locale = "en" }: WebsiteInquiryFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const isKorean = locale === "ko";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    toast({
      title: isKorean ? "문의가 접수되었습니다" : "Inquiry received",
      description: isKorean
        ? "담당자가 내용을 확인한 뒤 연락드리겠습니다."
        : "Thank you. Our office will review your message and follow up.",
    });

    // Give HighLevel's external-tracking listener time to read the submitted DOM values
    // before clearing the controlled fields.
    window.setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 600);
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
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
          placeholder={isKorean ? "이름" : "Name"}
          aria-label={isKorean ? "이름" : "Name"}
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
      <button type="submit" className="liquid-cta mt-2 inline-flex rounded-full px-6 py-3 text-[12px] font-medium">
        <span className="relative z-10">{isKorean ? "문의 보내기" : "Send inquiry"}</span>
      </button>
    </form>
  );
};

export default WebsiteInquiryForm;
