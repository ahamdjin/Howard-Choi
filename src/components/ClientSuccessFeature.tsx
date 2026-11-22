import mobileConsultation from "@/assets/law-firm/responsive/attorney-client-talking-480.webp";
import { ArrowLink } from "@/components/ui/button";
import TestimonialSlider from "@/components/editorial/TestimonialSlider";
import { responsiveImageProps } from "@/lib/responsive-images";
import { clientReviews } from "@/data/clientReviews";
import type { SiteLocale } from "@/data/injurySite";
import ClientProof from "./ClientProof";

const ClientSuccessFeature = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  // The firm requested restoration of these existing homepage testimonials.
  // Use the same saved cards in development and production.
  const items = clientReviews[locale];
  if (!items.length) return <ClientProof locale={locale} />;
  const reviewLabel = ko ? "의뢰인 후기" : es ? "Testimonio de cliente" : "Client testimonial";

  return (
    <section id="reviews" aria-label={ko ? "의뢰인 경험" : es ? "Experiencias de clientes" : "Client experiences"} className="flex min-h-[100svh] w-full bg-[#f7f6f3] text-foreground">
      <div className="site-shell flex w-full flex-col justify-center py-12 lg:py-16">
        <div className="text-center">
          <div className="text-xs text-foreground/65">{ko ? "의뢰인 경험" : es ? "Experiencia del cliente" : "Client Experience"}</div>
          <h2 className="editorial-serif mt-4">
            {ko ? "복잡한 순간에도 명확한 안내." : es ? <>Orientación clara<br /><span className="text-foreground/70">cuando el caso se siente complicado.</span></> : <>Clear guidance<br /><span className="text-foreground/70">when the case feels complicated.</span></>}
          </h2>
          <p className="mx-auto mt-5 max-w-[430px] text-[14px] leading-6 text-foreground/64">
            {ko ? "의료 기록, 보험 문제와 다음 법적 단계까지 이해하기 쉽게 안내합니다." : es ? "Una buena representación debe hacer el proceso más fácil de entender, desde los expedientes médicos y las preguntas de seguro hasta las decisiones de resolución y el siguiente paso legal." : "Good representation should make the process easier to understand, from medical records and insurance questions to settlement decisions and the next legal step."}
          </p>
          <ArrowLink direction="right" variant="ink" href={`${prefix}/contact`} className="mt-6">{ko ? "상담 시작" : es ? "Iniciar una conversación" : "Start a Conversation"}</ArrowLink>
        </div>
        <TestimonialSlider
          reviews={items}
          image={<picture><source media="(max-width: 767px)" srcSet={mobileConsultation} /><img width={1200} height={800} {...responsiveImageProps("https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=84")} src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=84" alt={ko ? "법률 상담" : es ? "Reunión de un cliente con un abogado de lesiones personales" : "Client meeting with personal injury legal counsel"} loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></picture>}
          label={reviewLabel}
          previousLabel={ko ? "이전 후기" : es ? "Testimonio anterior" : "Previous review"}
          nextLabel={ko ? "다음 후기" : es ? "Siguiente testimonio" : "Next review"}
        />
      </div>
    </section>
  );
};

export default ClientSuccessFeature;
