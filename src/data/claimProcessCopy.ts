import type { SiteLocale } from "@/data/injurySite";

// English is the factual master. Keep every stage aligned across languages.
export const claimProcessCopy = {
  en: {
    eyebrow: "From the first call onward",
    title: "A clearer path through an unfamiliar process.",
    intro: "Know what each stage is for, what you can bring and which decisions deserve a conversation.",
    link: "Explore what to expect",
    steps: [
      { title: "Tell your story", body: "Start with the accident, your treatment and the questions on your mind. A free consultation helps identify what needs closer attention." },
      { title: "Build the record", body: "If the firm takes your case, the investigation connects evidence about the accident with medical records, insurance coverage and documented losses." },
      { title: "Consider your options", body: "Review an offer in the context of your injuries and the evidence. Discuss negotiation, remaining questions or litigation before deciding how to proceed." },
    ],
  },
  es: {
    eyebrow: "Desde la primera llamada",
    title: "Un camino más claro a través de un proceso desconocido.",
    intro: "Sepa para qué sirve cada etapa, qué puede traer y qué decisiones merecen una conversación.",
    link: "Conozca qué puede esperar",
    steps: [
      { title: "Cuente su historia", body: "Empiece por el accidente, su tratamiento y las preguntas que tiene. Una consulta gratuita ayuda a identificar qué necesita una revisión más detenida." },
      { title: "Reúna la documentación", body: "Si el bufete acepta su caso, la investigación relaciona las pruebas del accidente con los expedientes médicos, la cobertura del seguro y las pérdidas documentadas." },
      { title: "Considere sus opciones", body: "Revise cualquier oferta teniendo en cuenta sus lesiones y las pruebas. Hable sobre la negociación, las preguntas pendientes o una demanda antes de decidir cómo proceder." },
    ],
  },
  ko: {
    eyebrow: "첫 전화부터",
    title: "낯선 절차를 더 명확하게 이해할 수 있도록.",
    intro: "각 단계의 목적, 준비할 수 있는 자료, 대화를 통해 결정해야 할 사항을 알아보세요.",
    link: "진행 과정 알아보기",
    steps: [
      { title: "상황을 들려주세요", body: "사고 경위, 치료 내용, 궁금한 점부터 말씀해 주세요. 무료 상담을 통해 어떤 사항을 더 자세히 검토해야 하는지 파악할 수 있습니다." },
      { title: "기록을 정리합니다", body: "사무실에서 사건을 수임하면 사고 증거를 의료 기록, 보험 보장 범위, 문서로 확인되는 손실과 연결하여 조사합니다." },
      { title: "선택지를 검토하세요", body: "부상과 증거를 바탕으로 제안을 검토하세요. 진행 방향을 결정하기 전에 협상, 남은 질문 또는 소송에 관해 상담하세요." },
    ],
  },
} satisfies Record<SiteLocale, {
  eyebrow: string; title: string; intro: string; link: string;
  steps: readonly [{ title: string; body: string }, { title: string; body: string }, { title: string; body: string }];
}>;
