import SpanishNavigation from "@/components/SpanishNavigation";
import SpanishFooter from "@/components/SpanishFooter";
import { brand } from "@/data/injurySite";

export type SpanishLegalDocumentType = "privacy" | "terms" | "disclaimer" | "accessibility";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalDocument = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

const docs: Record<SpanishLegalDocumentType, LegalDocument> = {
  privacy: {
    eyebrow: "Legal",
    title: "Política de privacidad",
    intro: "Esta política explica qué información puede recopilar Buena Park Injury Lawyer a través de este sitio, cómo puede utilizarse y qué opciones pueden estar disponibles.",
    updated: "Última actualización: 26 de septiembre de 2026",
    sections: [
      {
        title: "Información que podemos recopilar",
        bullets: [
          "Información de contacto que usted proporcione, como nombre, correo electrónico, número de teléfono y dirección.",
          "Información incluida en una consulta, solicitud de consulta, nota de cita u otra comunicación con la firma.",
          "Información de programación, incluida la fecha y hora solicitadas para una consulta.",
          "Información técnica y de uso, como navegador, dispositivo, páginas visitadas, páginas de referencia y actividad similar cuando nuestros proveedores de alojamiento, seguridad o análisis la habiliten.",
        ],
      },
      {
        title: "Cómo podemos utilizar la información",
        bullets: [
          "Responder a su consulta, evaluar si la firma puede ayudar y comunicarse con usted.",
          "Programar, confirmar, cambiar o dar seguimiento a una consulta.",
          "Operar, proteger, mantener y mejorar el sitio y los servicios relacionados.",
          "Cumplir obligaciones legales, profesionales, de conservación de registros y de seguridad.",
        ],
      },
      {
        title: "Proveedores de servicios y terceros",
        paragraphs: [
          "Podemos utilizar proveedores para alojamiento web, programación, gestión de relaciones con clientes, comunicaciones, seguridad, análisis y funciones comerciales similares. Esos proveedores pueden procesar información en nuestro nombre según sea razonablemente necesario para prestar sus servicios.",
          "No tenemos la intención de vender información personal a cambio de dinero. La información móvil y los datos de consentimiento para mensajes de texto no se comparten con terceros o afiliados para sus propios fines de marketing o promoción. Podemos divulgar información cuando lo exija la ley, para proteger derechos o seguridad, o en relación con servicios profesionales razonablemente necesarios para operar la firma.",
        ],
      },
      {
        title: "Cookies y tecnologías similares",
        paragraphs: [
          "El sitio y sus proveedores pueden usar cookies o tecnologías similares para funciones esenciales, seguridad, preferencias, medición de rendimiento o análisis. Si se introducen tecnologías adicionales de publicidad o seguimiento, esta política deberá actualizarse y se proporcionarán las opciones que exija la ley.",
        ],
      },
      {
        title: "Mensajes y comunicaciones",
        paragraphs: [
          "Si proporciona voluntariamente un número móvil y acepta recibir mensajes relacionados con citas, la frecuencia puede variar y pueden aplicarse tarifas de mensajes y datos. Puede responder STOP para dejar de recibir mensajes y HELP para solicitar ayuda. El consentimiento para recibir mensajes no es condición para contratar a la firma.",
        ],
      },
      {
        title: "Conservación, seguridad y derechos en California",
        paragraphs: [
          "La información puede conservarse durante el tiempo razonablemente necesario para el propósito para el que fue recopilada, para mantener registros comerciales y profesionales, resolver disputas y cumplir obligaciones legales o profesionales. Utilizamos medidas administrativas y técnicas razonables, pero ningún sistema de transmisión o almacenamiento por internet puede garantizar seguridad absoluta.",
          "Dependiendo de las circunstancias y la ley aplicable, los residentes de California pueden tener derechos para solicitar acceso, corrección o eliminación de cierta información personal y obtener información sobre su uso o divulgación. Algunas categorías pueden estar exentas por obligaciones legales, profesionales, de evidencia o seguridad.",
        ],
      },
      {
        title: "Contacto",
        paragraphs: [
          `Las preguntas sobre esta política pueden dirigirse a ${brand.name}, ${brand.address}, por teléfono al ${brand.phoneDisplay} o mediante la página de Contacto.`,
        ],
      },
    ],
  },
  terms: {
    eyebrow: "Legal",
    title: "Términos de uso",
    intro: "Estos términos se aplican al uso del sitio web de Buena Park Injury Lawyer.",
    updated: "Última actualización: 26 de septiembre de 2026",
    sections: [
      {
        title: "Información general solamente",
        paragraphs: [
          "Los materiales de este sitio se proporcionan únicamente con fines informativos generales. No constituyen asesoría legal y no deben sustituir el consejo de un abogado que haya revisado los hechos y plazos específicos de su asunto.",
        ],
      },
      {
        title: "No se crea una relación abogado-cliente",
        paragraphs: [
          "Visitar el sitio, enviar un formulario, programar una consulta, enviar un correo electrónico, llamar a la oficina o comunicarse de otra forma no crea por sí solo una relación abogado-cliente. Esa relación existe únicamente después de que la firma acepte la representación y se complete cualquier acuerdo requerido.",
          "No envíe información altamente confidencial o sensible hasta que la firma confirme que lo representa y le indique cómo proporcionar esa información.",
        ],
      },
      {
        title: "Sin garantía de resultados",
        paragraphs: [
          "Cada asunto legal es diferente. Cualquier referencia a resultados, acuerdos, veredictos, ejemplos o experiencias anteriores no constituye una promesa ni garantía de un resultado particular.",
        ],
      },
      {
        title: "Citas y comunicaciones",
        paragraphs: [
          "La disponibilidad de citas puede cambiar. Una solicitud de cita está sujeta a la información presentada y a la capacidad de la firma para aceptar la consulta. Si acepta llamadas, mensajes de texto o correos relacionados con citas, pueden aplicarse tarifas y la frecuencia puede variar.",
        ],
      },
      {
        title: "Plazos y emergencias",
        paragraphs: [
          "No utilice este sitio como el único medio para comunicar una fecha límite legal, una emergencia, una fecha judicial o un asunto urgente. Los plazos pueden vencer mientras una consulta está pendiente.",
        ],
      },
      {
        title: "Servicios y enlaces de terceros",
        paragraphs: [
          "El sitio puede utilizar o enlazar servicios de terceros, incluidos mapas, programación, comunicaciones, alojamiento y tecnología. La firma no controla todo el contenido, disponibilidad, términos o prácticas de privacidad de esos servicios.",
        ],
      },
      {
        title: "Idioma",
        paragraphs: [
          "Esta versión en español se proporciona para facilitar el acceso a información general. La firma indica atención en inglés y coreano. Antes de depender de asistencia en español para una consulta o representación, confirme directamente con la firma qué asistencia lingüística está disponible.",
        ],
      },
    ],
  },
  disclaimer: {
    eyebrow: "Legal",
    title: "Aviso legal",
    intro: "Información importante sobre contenido legal, publicidad de abogados, comunicaciones y resultados presentados en este sitio.",
    updated: "Última actualización: 26 de septiembre de 2026",
    sections: [
      {
        title: "Publicidad de abogado",
        paragraphs: [
          "Este sitio puede constituir publicidad de abogado. Está diseñado para proporcionar información general sobre Buena Park Injury Lawyer, Howard Choi y los tipos de asuntos que la firma puede manejar.",
        ],
      },
      {
        title: "No es asesoría legal",
        paragraphs: [
          "El contenido del sitio es información general y no asesoría legal. Las leyes, plazos, procedimientos y resultados dependen de la jurisdicción y de los hechos de cada asunto.",
        ],
      },
      {
        title: "No existe relación abogado-cliente por usar el sitio",
        paragraphs: [
          "Ver el sitio o contactar a la firma no crea una relación abogado-cliente. La firma debe confirmar que puede aceptar el asunto y completar cualquier acuerdo de representación requerido.",
        ],
      },
      {
        title: "Resultados y testimonios",
        paragraphs: [
          "Los resultados anteriores no garantizan ni predicen un resultado similar en ningún asunto futuro. Un testimonio, reseña o descripción de un asunto anterior refleja circunstancias individuales.",
        ],
      },
      {
        title: "Licencia, jurisdicción y plazos",
        paragraphs: [
          "La información del sitio no significa que la firma o un abogado pueda ejercer en todas las jurisdicciones. La representación está sujeta a reglas profesionales, conflictos, licencias aplicables y aceptación del asunto.",
          "No dependa de un formulario o solicitud de cita para preservar un reclamo, cumplir un plazo o responder a una emergencia.",
        ],
      },
      {
        title: "Versión en español",
        paragraphs: [
          "El contenido en español busca transmitir la misma información general de forma accesible. Si existe una diferencia de interpretación entre una traducción y un documento legal o acuerdo de representación, solicite aclaración directamente a la firma antes de actuar.",
        ],
      },
    ],
  },
  accessibility: {
    eyebrow: "Información",
    title: "Declaración de accesibilidad",
    intro: "Buena Park Injury Lawyer procura que este sitio sea utilizable por la mayor cantidad de personas posible, incluidas quienes utilizan tecnologías de asistencia.",
    updated: "Última actualización: 26 de septiembre de 2026",
    sections: [
      {
        title: "Nuestro enfoque",
        paragraphs: [
          "Buscamos mantener texto legible, navegación accesible con teclado, etiquetas significativas, estructura clara y diseños adaptables en dispositivos y navegadores comunes. La accesibilidad es un proceso continuo y el contenido o las integraciones de terceros pueden cambiar.",
        ],
      },
      {
        title: "Contenido de terceros",
        paragraphs: [
          "Algunas funciones pueden depender de servicios externos como mapas, programación, comunicaciones o medios integrados. No controlamos todos los aspectos de accesibilidad de esos servicios, pero procuraremos ofrecer una alternativa práctica cuando se nos informe de un problema.",
        ],
      },
      {
        title: "¿Necesita ayuda?",
        paragraphs: [
          `Si tiene dificultad para utilizar el sitio o necesita información en otro formato, comuníquese mediante la página de Contacto o llame al ${brand.phoneDisplay}. Cuando sea posible, indique la página y el problema de accesibilidad.`,
        ],
      },
    ],
  },
};

export const SpanishLegalPage = ({ type }: { type: SpanishLegalDocumentType }) => {
  const doc = docs[type];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SpanishNavigation />
      <main className="site-shell py-14 md:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.28fr_0.72fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border-t border-foreground/12 pt-5">
              <div className="text-[10px] uppercase tracking-[0.15em] text-foreground/40">{doc.eyebrow}</div>
              <div className="mt-4 text-[12px] leading-5 text-foreground/46">{doc.updated}</div>
            </div>
          </aside>
          <article>
            <h1 className="editorial-serif max-w-[900px] text-[clamp(3rem,5vw,5.2rem)] leading-[0.95] tracking-[-0.04em]">{doc.title}</h1>
            <p className="mt-6 max-w-[760px] text-[15px] leading-7 text-foreground/62">{doc.intro}</p>
            <div className="mt-12 space-y-12">
              {doc.sections.map((section, index) => (
                <section key={section.title} className="border-t border-foreground/12 pt-7">
                  <div className="text-[10px] text-foreground/30">{String(index + 1).padStart(2, "0")}</div>
                  <h2 className="editorial-serif mt-4 text-[clamp(1.8rem,2.8vw,2.7rem)] leading-[1.06]">{section.title}</h2>
                  {section.paragraphs ? <div className="mt-5 max-w-[800px] space-y-5 text-[14px] leading-7 text-foreground/66">{section.paragraphs.map((p) => <p key={p}>{p}</p>)}</div> : null}
                  {section.bullets ? <ul className="mt-5 max-w-[800px] list-disc space-y-3 pl-5 text-[14px] leading-7 text-foreground/66">{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                </section>
              ))}
            </div>
          </article>
        </div>
      </main>
      <SpanishFooter />
    </div>
  );
};
