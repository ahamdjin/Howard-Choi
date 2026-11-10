import { learningResources } from "@/data/learningResources";
import type { SiteLocale } from "@/data/injurySite";

// Short title and heading patterns checked against DK Law on November 4, 2026.
// Descriptions use Howard-specific facts. Keep page URLs and indexing policy unchanged.
type PracticeMessaging = { title: string; heading: string; description: string };

export const practicePageMessaging: Record<string, Record<SiteLocale, PracticeMessaging>> = {
  "car-accidents": {
    "en": {
      "title": "Injured in a Car Accident? We Can Help You Recover | Free Consultation",
      "heading": "We Win Car Accident Cases.",
      "description": "Injured in a car accident? Discuss fault, your rights and compensation with Buena Park lawyer Howard Choi. Free consultation. No fee unless there is a recovery."
    },
    "es": {
      "title": "¿Lesionado en un accidente de auto? Le ayudamos a recuperarse | Consulta gratuita",
      "heading": "Ganamos casos de accidentes de auto.",
      "description": "¿Lesionado en un accidente de auto? Consulte culpa, derechos y compensación con Howard Choi en Buena Park. Consulta gratuita. Sin honorarios salvo que haya recuperación."
    },
    "ko": {
      "title": "교통사고로 다치셨나요? 회복을 도와드립니다 | 무료 상담",
      "heading": "자동차 사고 사건에서 승소를 이끕니다.",
      "description": "교통사고 후 과실, 권리와 보상에 대해 부에나파크 Howard Choi 변호사와 상담하세요. 무료 상담. 보상금 회수 없이는 변호사 수임료가 없습니다."
    }
  },
  "truck-accidents": {
    "en": {
      "title": "Injured in a Truck Crash? Let’s Talk Options | Free Consultation",
      "heading": "We Win Truck Accident Cases.",
      "description": "Hurt in a truck crash? Howard Choi helps Buena Park injury victims pursue compensation from responsible parties. Free consultation. No fee unless there is a recovery."
    },
    "es": {
      "title": "¿Lesionado en un choque de camión? Hablemos de sus opciones | Consulta gratuita",
      "heading": "Ganamos casos de accidentes de camión.",
      "description": "¿Lesionado en un choque de camión? Howard Choi ayuda a víctimas en Buena Park a reclamar compensación. Consulta gratuita. Sin honorarios salvo que haya recuperación."
    },
    "ko": {
      "title": "트럭 사고로 다치셨나요? 해결 방안을 상담하세요 | 무료 상담",
      "heading": "트럭 사고 사건에서 승소를 이끕니다.",
      "description": "트럭 사고로 다치셨나요? Howard Choi 변호사가 부에나파크 피해자의 책임 당사자에 대한 보상 청구를 돕습니다. 무료 상담. 보상금 회수 없이는 변호사 수임료가 없습니다."
    }
  },
  "motorcycle-accidents": {
    "en": {
      "title": "Hurt in a Motorcycle Crash? Know Your Rights | Free Consultation",
      "heading": "We Win Motorcycle Accident Cases.",
      "description": "Hurt in a motorcycle crash? Protect your rights and pursue compensation with Buena Park lawyer Howard Choi. Free consultation. No fee unless there is a recovery."
    },
    "es": {
      "title": "¿Lesionado en un accidente de moto? Conozca sus derechos | Consulta gratuita",
      "heading": "Ganamos casos de accidentes de motocicleta.",
      "description": "¿Lesionado en un accidente de moto? Proteja sus derechos y reclame compensación con Howard Choi en Buena Park. Consulta gratuita. Sin honorarios salvo que haya recuperación."
    },
    "ko": {
      "title": "오토바이 사고로 다치셨나요? 권리를 알아보세요 | 무료 상담",
      "heading": "오토바이 사고 사건에서 승소를 이끕니다.",
      "description": "오토바이 사고 후 부에나파크 Howard Choi 변호사와 권리 보호 및 보상 청구를 상담하세요. 무료 상담. 보상금 회수 없이는 변호사 수임료가 없습니다."
    }
  },
  "pedestrian-accidents": {
    "en": {
      "title": "Hit While Walking? Know Your Rights | Free Consultation",
      "heading": "We Win Pedestrian Accident Cases.",
      "description": "Struck by a vehicle while walking? Howard Choi helps Buena Park pedestrians seek accountability and injury compensation. Free consultation. No fee unless there is a recovery."
    },
    "es": {
      "title": "¿Atropellado al caminar? Conozca sus derechos | Consulta gratuita",
      "heading": "Ganamos casos de accidentes peatonales.",
      "description": "¿Atropellado al caminar? Howard Choi ayuda a peatones en Buena Park a exigir responsabilidad y compensación. Consulta gratuita. Sin honorarios salvo que haya recuperación."
    },
    "ko": {
      "title": "보행 중 차에 치이셨나요? 권리를 알아보세요 | 무료 상담",
      "heading": "보행자 사고 사건에서 승소를 이끕니다.",
      "description": "보행 중 차에 치이셨나요? Howard Choi 변호사가 부에나파크 보행자의 책임 규명과 상해 보상 청구를 돕습니다. 무료 상담. 보상금 회수 없이는 변호사 수임료가 없습니다."
    }
  },
  "rideshare-accidents": {
    "en": {
      "title": "Rideshare Accidents Are Complicated. Legal Help Isn’t | Free Consultation",
      "heading": "We Win Rideshare Accident Cases.",
      "description": "Injured in an Uber or Lyft accident? Discuss your compensation options with Buena Park lawyer Howard Choi. Free consultation. No fee unless there is a recovery."
    },
    "es": {
      "title": "Los accidentes de Uber y Lyft son complejos. Obtener ayuda no lo es | Consulta gratuita",
      "heading": "Ganamos casos de accidentes de Uber y Lyft.",
      "description": "¿Lesionado en un accidente de Uber o Lyft? Consulte sus opciones de compensación con Howard Choi en Buena Park. Consulta gratuita. Sin honorarios salvo que haya recuperación."
    },
    "ko": {
      "title": "우버·리프트 사고는 복잡해도 법률 상담은 간단합니다 | 무료 상담",
      "heading": "우버·리프트 사고 사건에서 승소를 이끕니다.",
      "description": "우버나 리프트 사고로 다치셨나요? 부에나파크 Howard Choi 변호사와 보상 청구 방안을 상담하세요. 무료 상담. 보상금 회수 없이는 변호사 수임료가 없습니다."
    }
  },
  "slip-and-fall": {
    "en": {
      "title": "Slip and Fall Accidents – Know Your Rights | Free Consultation",
      "heading": "We Win Slip and Fall Cases.",
      "description": "Hurt in a fall on unsafe property? Discuss liability, your rights and injury compensation with Howard Choi in Buena Park. Free consultation. No fee unless there is a recovery."
    },
    "es": {
      "title": "Resbalones y caídas: conozca sus derechos y cómo recuperarse | Consulta gratuita",
      "heading": "Ganamos casos de resbalones y caídas.",
      "description": "¿Lesionado al caer en una propiedad insegura? Consulte responsabilidad, derechos y compensación con Howard Choi en Buena Park. Consulta gratuita. Sin honorarios salvo que haya recuperación."
    },
    "ko": {
      "title": "미끄러짐·낙상 사고: 권리와 회복 방법을 알아보세요 | 무료 상담",
      "heading": "미끄러짐·낙상 사건에서 승소를 이끕니다.",
      "description": "안전하지 않은 부지에서 넘어지셨나요? 부에나파크 Howard Choi 변호사와 책임, 권리 및 상해 보상을 상담하세요. 무료 상담. 보상금 회수 없이는 변호사 수임료가 없습니다."
    }
  },
  "wrongful-death": {
    "en": {
      "title": "Wrongful Death Claims: Your Rights, Your Recovery | Free Consultation",
      "heading": "We Win Wrongful Death Cases.",
      "description": "Lost a loved one because of someone else’s negligence? Discuss justice, compensation and your family’s rights with Howard Choi. Free consultation in Buena Park."
    },
    "es": {
      "title": "Muerte por negligencia: sus derechos y su recuperación | Consulta gratuita",
      "heading": "Ganamos casos de muerte por negligencia.",
      "description": "¿Perdió a un ser querido por negligencia ajena? Consulte justicia, compensación y los derechos de su familia con Howard Choi. Consulta gratuita en Buena Park."
    },
    "ko": {
      "title": "부당 사망 청구: 유가족의 권리와 회복 | 무료 상담",
      "heading": "부당 사망 사건에서 승소를 이끕니다.",
      "description": "타인의 과실로 가족을 잃으셨나요? Howard Choi 변호사와 책임 규명, 보상 및 유가족의 권리를 상담하세요. 부에나파크 무료 상담."
    }
  },
  "serious-injuries": {
    "en": {
      "title": "Catastrophic Injury? We Fight for Your Compensation | Free Consultation",
      "heading": "We Win Catastrophic Injury Cases.",
      "description": "A life-changing injury calls for long-term support. Howard Choi helps Buena Park victims pursue compensation for care and lasting losses. Free consultation."
    },
    "es": {
      "title": "¿Lesión catastrófica? Luchamos por la atención y compensación que merece | Consulta gratuita",
      "heading": "Ganamos casos de lesiones catastróficas.",
      "description": "Una lesión que cambia la vida requiere apoyo a largo plazo. Howard Choi ayuda a víctimas en Buena Park a reclamar atención y pérdidas duraderas. Consulta gratuita."
    },
    "ko": {
      "title": "중대 상해를 입으셨나요? 필요한 치료와 보상을 위해 힘씁니다 | 무료 상담",
      "heading": "중대 상해 사건에서 승소를 이끕니다.",
      "description": "삶을 바꾸는 중대 상해에는 장기적인 지원이 필요합니다. Howard Choi 변호사가 부에나파크 피해자의 치료 및 지속적인 손실에 대한 보상 청구를 돕습니다. 무료 상담."
    }
  },
  "personal-injury": {
    "en": {
      "title": "Accident Turned Life Upside Down? Let’s Make It Right | Free Consultation",
      "heading": "We Win Personal Injury Cases.",
      "description": "An injury can turn daily life upside down. Howard Choi helps Buena Park accident victims pursue compensation with personal legal support. Free consultation."
    },
    "es": {
      "title": "¿Un accidente cambió su vida? Busquemos una solución | Consulta gratuita",
      "heading": "Ganamos casos de lesiones personales.",
      "description": "Una lesión puede cambiar su vida diaria. Howard Choi ayuda a víctimas en Buena Park a reclamar compensación con atención legal personal. Consulta gratuita."
    },
    "ko": {
      "title": "사고로 일상이 무너지셨나요? 해결을 위해 함께하겠습니다 | 무료 상담",
      "heading": "개인상해 사건에서 승소를 이끕니다.",
      "description": "상해 사고는 일상을 바꿀 수 있습니다. Howard Choi 변호사가 부에나파크 사고 피해자에게 개별 법률 지원을 제공하며 보상 청구를 돕습니다. 무료 상담."
    }
  }
};

export const getPracticeMessaging = (slug: string, locale: SiteLocale) => {
  const fallback = practicePageMessaging[slug]?.[locale];
  if (locale !== "en") return fallback;
  const source = learningResources.find(r => r.kind === "service" && r.path === `/practice-areas/${slug}`);
  return source ? { title: source.metaTitle, heading: source.title, description: source.description } : fallback;
};
