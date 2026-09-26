import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroLawOffice from "@/assets/law-firm/hero-law-office.webp";
import heroJusticeLibrary from "@/assets/law-firm/hero-justice-library.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";

export type SpanishBlogSection = { heading: string; paragraphs: string[] };
export type SpanishBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  publishedAt: string;
  readingTime: string;
  image: string;
  alt: string;
  intro: string;
  takeaway: string;
  sections: SpanishBlogSection[];
  relatedHref: string;
  relatedLabel: string;
};

export const esBlogPosts: SpanishBlogPost[] = [
  {
    slug: "california-comparative-fault-personal-injury",
    title: "Culpa comparativa en California: ¿qué pasa si tuve parte de la culpa?",
    excerpt: "Cómo puede afectar la culpa comparativa a un reclamo por lesiones personales en California y qué evidencia puede influir en el porcentaje de responsabilidad.",
    category: "Responsabilidad y seguro",
    date: "14 de septiembre de 2026",
    publishedAt: "2026-09-14",
    readingTime: "7 min",
    image: heroCourthouse,
    alt: "Interior de un tribunal de California",
    intro: "Tener parte de la responsabilidad por un accidente no significa automáticamente que un reclamo por lesiones personales desaparezca en California. El estado aplica principios de culpa comparativa, por lo que la responsabilidad puede dividirse entre varias personas.",
    takeaway: "La culpa parcial puede reducir una recuperación en lugar de eliminarla. El porcentaje y la evidencia que lo respalda importan.",
    relatedHref: "/es/practice-areas/car-accidents",
    relatedLabel: "Accidentes de auto y disputas de culpa",
    sections: [
      { heading: "La idea básica de la culpa comparativa", paragraphs: ["En California, una persona lesionada puede todavía recuperar la parte de los daños atribuible a otros responsables, aunque se le asigne una parte de la culpa.", "Si los daños totales fueran de $100,000 y a la persona lesionada se le atribuyera un 20% de responsabilidad, ese porcentaje puede reducir la cantidad recuperable. El resultado real también depende del seguro, gravámenes, evidencia y otros factores."] },
      { heading: "Qué evidencia puede afectar el porcentaje de culpa", paragraphs: ["Fotos del lugar, daños de los vehículos, video, señales y marcas viales, testigos, reportes policiales y datos electrónicos pueden ayudar a explicar cómo ocurrió un accidente.", "En un caso de caída, pueden ser más importantes la condición peligrosa, advertencias, iluminación, inspecciones y video de seguridad."] },
      { heading: "La opinión inicial de una aseguradora no es necesariamente final", paragraphs: ["Una aseguradora puede asignar porcentajes de culpa según la información disponible al principio. Esa evaluación puede cambiar cuando aparecen videos, testigos, reportes u otra evidencia.", "La decisión de una aseguradora durante un reclamo tampoco es lo mismo que una determinación final de responsabilidad en un litigio."] },
      { heading: "La culpa también cambia la estrategia de negociación", paragraphs: ["Cuando la responsabilidad es discutida, cada lado puede valorar el riesgo de que un jurado asigne un porcentaje diferente. En casos con daños importantes, incluso una diferencia pequeña en el porcentaje puede tener un efecto grande.", "Por eso el análisis del valor del caso suele considerar tanto los daños como la fortaleza de la responsabilidad."] },
      { heading: "Qué conviene preservar", paragraphs: ["Conserve pronto fotos, videos, reportes, información de testigos y comunicaciones del seguro.", "Si hay cámaras de negocios, datos de vehículos u otros registros que pueden desaparecer con el tiempo, identificar esas fuentes temprano puede ser importante."] },
    ],
  },
  {
    slug: "how-much-is-my-personal-injury-case-worth-california",
    title: "¿Cuánto puede valer un caso de lesiones personales en California?",
    excerpt: "Factores que pueden influir en el valor de un reclamo, incluidos gastos médicos, pérdida de ingresos, atención futura, culpa, seguro y evidencia.",
    category: "Valor del caso",
    date: "13 de septiembre de 2026",
    publishedAt: "2026-09-13",
    readingTime: "8 min",
    image: heroJusticeLibrary,
    alt: "Balanza de justicia y libros jurídicos",
    intro: "No existe una sola tabla o multiplicador que determine con precisión el valor de todos los casos de lesiones personales en California. El análisis combina daños demostrables, responsabilidad, seguro disponible y la evidencia que conecta esos elementos.",
    takeaway: "El valor del caso surge de daños, responsabilidad, seguro y evidencia; una factura médica alta por sí sola no determina el resultado.",
    relatedHref: "/es/case-value-calculator",
    relatedLabel: "Calculadora educativa de valor del caso",
    sections: [
      { heading: "Empiece por las pérdidas económicas", paragraphs: ["Gastos médicos, salarios ya perdidos, atención futura, reducción de ingresos y otros costos razonables relacionados con el accidente pueden formar parte de los daños económicos.", "Las pérdidas futuras suelen requerir apoyo en expedientes médicos, recomendaciones de tratamiento y documentación laboral."] },
      { heading: "Los daños no económicos no tienen un multiplicador fijo", paragraphs: ["Dolor, limitaciones funcionales, incomodidad y cambios en la vida diaria pueden ser relevantes, pero California no impone un multiplicador único de facturas médicas para todos los casos.", "La naturaleza de la lesión, duración de síntomas, cirugía, rehabilitación, cicatrices y limitaciones permanentes pueden influir."] },
      { heading: "La culpa puede reducir la recuperación", paragraphs: ["Bajo la culpa comparativa de California, una parte de responsabilidad atribuida a la persona lesionada puede reducir los daños recuperables.", "Una responsabilidad clara tampoco garantiza un valor alto si la lesión fue menor o las pérdidas no están bien documentadas."] },
      { heading: "Los límites de seguro también importan", paragraphs: ["Un caso puede tener daños teóricos altos pero una recuperación práctica menor si no existe suficiente cobertura o activos disponibles.", "Dependiendo del accidente, pueden ser relevantes pólizas del propietario, empleador, empresa, rideshare o cobertura UM/UIM."] },
      { heading: "La evidencia conecta los números con la historia real", paragraphs: ["Expedientes médicos, estudios de imagen, fotos, testigos, documentos salariales, recomendaciones de atención futura y reportes ayudan a respaldar el reclamo.", "La pregunta no es solo qué ocurrió, sino qué puede demostrarse con claridad."] },
      { heading: "Use una calculadora solo como punto de partida", paragraphs: ["Una calculadora puede organizar gastos, salarios, tratamiento, pérdidas futuras y culpa para ofrecer un rango educativo.", "No puede capturar todos los límites de seguro, gravámenes, disputas de causalidad, calidad de evidencia, lugar del juicio ni dinámica de negociación."] },
    ],
  },
  {
    slug: "uber-lyft-accident-insurance-california",
    title: "Seguro en accidentes de Uber y Lyft en California",
    excerpt: "Por qué el estado de la aplicación del conductor puede cambiar la cobertura y qué información conviene conservar después de un accidente de rideshare.",
    category: "Uber y Lyft",
    date: "12 de septiembre de 2026",
    publishedAt: "2026-09-12",
    readingTime: "7 min",
    image: heroCityBoardroom,
    alt: "Sala de reuniones de una firma legal",
    intro: "Un accidente de Uber o Lyft puede parecer un choque de auto normal en el lugar, pero el análisis del seguro puede ser diferente. El estado de la aplicación del conductor en el momento del accidente puede afectar qué cobertura debe revisarse.",
    takeaway: "En un accidente de rideshare, la cronología de la aplicación puede ser tan importante como la cronología del choque.",
    relatedHref: "/es/practice-areas/rideshare-accidents",
    relatedLabel: "Reclamos por accidentes de Uber y Lyft",
    sections: [
      { heading: "Primero identifique el estado de la aplicación", paragraphs: ["Conviene determinar si el conductor estaba desconectado, esperando una solicitud, viajando a recoger a un pasajero o transportando a uno.", "Los pasajeros pueden conservar recibos y capturas de pantalla; otras personas lesionadas pueden necesitar información adicional para establecer el periodo correcto."] },
      { heading: "California distingue diferentes periodos de cobertura", paragraphs: ["Los requisitos de seguro para empresas de red de transporte cambian según la etapa del viaje.", "No debe asumirse que todos los accidentes de rideshare caen automáticamente bajo la misma póliza o el mismo límite."] },
      { heading: "Preserve la información del viaje pronto", paragraphs: ["Guarde recibos, capturas, origen y destino, datos del conductor y vehículo, mensajes en la aplicación, fotografías y el reporte policial.", "No conviene depender de que toda esa información siga disponible meses después."] },
      { heading: "Puede haber varias pólizas involucradas", paragraphs: ["Pueden ser relevantes el seguro personal del conductor, la cobertura de la empresa de rideshare, el seguro de otro conductor o la cobertura UM/UIM.", "La combinación correcta depende de los hechos y del estado de la aplicación."] },
      { heading: "La lesión todavía necesita evidencia propia", paragraphs: ["Tener cobertura no elimina la necesidad de demostrar tratamiento, atención futura, pérdida de ingresos, limitaciones y otros daños.", "Organizar juntos los registros del viaje, el seguro y la evidencia médica ayuda a entender mejor el reclamo."] },
    ],
  },
  {
    slug: "truck-accident-evidence-eld-records-california",
    title: "Evidencia en accidentes de camión: ELD y registros de empresa",
    excerpt: "Cómo los registros electrónicos, horas de servicio, mantenimiento, cámaras y archivos internos pueden importar en un accidente de camión comercial.",
    category: "Accidentes de camión",
    date: "11 de septiembre de 2026",
    publishedAt: "2026-09-11",
    readingTime: "8 min",
    image: heroLawOffice,
    alt: "Oficina legal revisando registros de un accidente de camión",
    intro: "Los accidentes de camión comercial pueden generar registros que no existen en un choque común entre autos. Datos ELD, archivos del conductor, mantenimiento, despacho, cámaras e inspecciones pueden ayudar a explicar lo que ocurrió antes de la colisión.",
    takeaway: "En un caso de camión, la evidencia interna de la empresa puede ser tan importante como la evidencia física del lugar.",
    relatedHref: "/es/practice-areas/truck-accidents",
    relatedLabel: "Accidentes de camión comercial",
    sections: [
      { heading: "El ELD puede registrar tiempo de conducción", paragraphs: ["Muchos conductores comerciales utilizan dispositivos electrónicos para registrar horas de servicio y otra información del viaje.", "Esos datos pueden ayudar a comparar la actividad registrada con otros elementos de la cronología del accidente."] },
      { heading: "Los registros de empresa van más allá del ELD", paragraphs: ["Despacho, documentos de carga, combustible, peajes, capacitación, inspecciones y comunicaciones internas pueden ser relevantes dependiendo del problema investigado.", "Los documentos necesarios cambian si se discute fatiga, mantenimiento, carga o supervisión."] },
      { heading: "Mantenimiento e inspección también pueden importar", paragraphs: ["Si frenos, neumáticos, luces o la condición del vehículo contribuyeron al accidente, los registros de mantenimiento e inspección pueden ser importantes.", "El vehículo mismo puede ser evidencia antes de que sea reparado o retirado de servicio."] },
      { heading: "Video y datos electrónicos tienen su propio reloj", paragraphs: ["Dashcams, GPS, telemática y sistemas de seguridad pueden generar información útil.", "Los periodos de conservación varían, por lo que no debe asumirse que todo seguirá disponible mucho tiempo después."] },
      { heading: "La evidencia ordinaria del choque sigue siendo necesaria", paragraphs: ["Los registros comerciales no sustituyen fotos, reportes policiales, testigos, expedientes médicos, información de seguro y documentación de pérdidas.", "Un expediente fuerte conecta la evidencia de la empresa con lo que ocurrió en la carretera y con las consecuencias de la lesión."] },
    ],
  },
  {
    slug: "california-personal-injury-deadlines",
    title: "Plazos para reclamos por lesiones personales en California",
    excerpt: "El plazo general de dos años para muchas demandas por lesiones, reclamos contra entidades públicas y razones para revisar pronto la fecha aplicable.",
    category: "Ley de lesiones de California",
    date: "10 de septiembre de 2026",
    publishedAt: "2026-09-10",
    readingTime: "7 min",
    image: heroCourthouse,
    alt: "Tribunal de California",
    intro: "Un plazo legal puede afectar un reclamo incluso cuando la evidencia sobre el accidente es fuerte. California tiene periodos generales de prescripción, pero la fecha exacta puede cambiar según los hechos, el tipo de demandado y ciertas excepciones.",
    takeaway: "Las reglas generales ayudan a orientarse, pero el plazo seguro debe calcularse con los hechos reales del caso. Los reclamos contra entidades públicas pueden requerir pasos mucho antes de dos años.",
    relatedHref: "/es/practice-areas",
    relatedLabel: "Áreas de lesiones personales",
    sections: [
      { heading: "Muchas demandas por lesiones tienen un plazo general de dos años", paragraphs: ["California Courts explica que, en general, una demanda por lesiones personales debe presentarse dentro de dos años desde la lesión.", "La regla suele mencionarse en choques y caídas, pero la fecha de inicio y las excepciones deben confirmarse en cada caso."] },
      { heading: "Los reclamos contra entidades públicas pueden ser mucho más rápidos", paragraphs: ["Cuando una ciudad, condado, estado u otra entidad pública puede ser responsable, a menudo existe un procedimiento administrativo previo con plazos más cortos.", "Accidentes relacionados con vías públicas, transporte, vehículos gubernamentales u otras entidades públicas merecen revisión temprana."] },
      { heading: "Daños a la propiedad pueden tener un periodo diferente", paragraphs: ["El plazo aplicable a daños de propiedad puede ser distinto al de una lesión corporal.", "Un solo accidente puede generar varios tipos de daños con reglas diferentes."] },
      { heading: "Algunas excepciones pueden cambiar el cálculo", paragraphs: ["Edad, descubrimiento tardío, identidad del demandado y otros factores pueden afectar el análisis.", "No es prudente asumir que una excepción existe sin revisar los hechos específicos."] },
      { heading: "No espere hasta el último día", paragraphs: ["Aun cuando falte tiempo para el plazo legal, la evidencia puede desaparecer mucho antes.", "Videos, testigos, registros comerciales y datos electrónicos suelen ser razones prácticas para actuar temprano."] },
    ],
  },
  {
    slug: "what-to-do-after-a-car-accident-in-california",
    title: "Qué hacer después de un accidente de auto en California",
    excerpt: "Pasos prácticos después de un choque: seguridad, atención médica, evidencia, reportes, seguros y documentación.",
    category: "Accidentes de auto",
    date: "9 de septiembre de 2026",
    publishedAt: "2026-09-09",
    readingTime: "8 min",
    image: heroLawOffice,
    alt: "Documentos y notas después de un accidente",
    intro: "Los primeros días después de un choque pueden sentirse desordenados. No necesita resolver todo de inmediato, pero algunas acciones básicas pueden proteger su salud y preservar información que después será difícil recuperar.",
    takeaway: "Priorice seguridad y atención médica, documente lo que pueda, conserve comunicaciones y evite asumir que la evidencia seguirá disponible más adelante.",
    relatedHref: "/es/practice-areas/car-accidents",
    relatedLabel: "Reclamos por accidentes de auto",
    sections: [
      { heading: "Primero atienda la seguridad y las necesidades médicas", paragraphs: ["Si existe una emergencia, busque atención inmediata. Algunas lesiones no se sienten plenamente en el momento del choque y pueden evolucionar con el tiempo.", "Explique a los proveedores médicos cómo ocurrió la lesión y siga las recomendaciones razonables de tratamiento."] },
      { heading: "Documente el lugar si puede hacerlo con seguridad", paragraphs: ["Fotografíe posiciones de vehículos, daños, señales, marcas viales, condiciones del camino y cualquier detalle relevante.", "Obtenga información de testigos y anote dónde puede haber cámaras cercanas."] },
      { heading: "Obtenga el reporte correspondiente", paragraphs: ["Dependiendo del lugar, la policía local o la CHP puede haber respondido.", "Conserve el número del reporte, datos de los conductores y cualquier información de intercambio entregada en el lugar."] },
      { heading: "Sea cuidadoso con comunicaciones del seguro", paragraphs: ["Informe el accidente según corresponda, pero entienda quién está pidiendo una declaración y qué documentos desea antes de dar información extensa.", "Guarde correos, cartas, números de reclamo y nombres de ajustadores."] },
      { heading: "Lleve una cronología sencilla", paragraphs: ["Registre tratamiento, días de trabajo perdidos, síntomas, limitaciones y gastos relacionados.", "Una cronología clara puede ayudar a conectar el accidente con sus consecuencias médicas y económicas."] },
      { heading: "Revise pronto los plazos y la evidencia que puede desaparecer", paragraphs: ["El plazo legal de una demanda y el tiempo de vida de una grabación de seguridad son problemas distintos.", "Si hay una entidad pública, un vehículo comercial o evidencia electrónica, puede ser especialmente importante identificar temprano qué debe preservarse."] },
    ],
  },
];

export const getSpanishBlogBySlug = (slug: string) => esBlogPosts.find((post) => post.slug === slug);
