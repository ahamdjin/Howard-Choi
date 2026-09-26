export type SpanishLocation = {
  slug: string;
  name: string;
  description: string;
  localIntro: string;
  localNote: string;
};

export const esLocationContent: Record<string, SpanishLocation> = {
  "buena-park": {
    slug: "buena-park",
    name: "Buena Park",
    description: "Guía local de accidentes y lesiones en Buena Park con información sobre registros, evidencia, plazos y los tipos de reclamos que atiende la firma.",
    localIntro: "Buena Park es la sede de la firma. Accidentes en Beach Boulevard, La Palma Avenue, intersecciones locales y propiedades comerciales pueden involucrar a la policía local, cámaras de negocios y recursos del Condado de Orange.",
    localNote: "Anote el lugar exacto del accidente y conserve fotos, reportes, comunicaciones del seguro y cualquier información sobre cámaras cercanas.",
  },
  anaheim: {
    slug: "anaheim",
    name: "Anaheim",
    description: "Información para personas lesionadas en accidentes en Anaheim, incluidos registros locales, evidencia, seguros y próximos pasos.",
    localIntro: "Anaheim combina vías urbanas concurridas, zonas hoteleras y de entretenimiento, autopistas y tráfico de rideshare. El tipo de vehículo y el lugar exacto pueden cambiar qué registros y pólizas deben revisarse.",
    localNote: "En zonas comerciales y de hoteles puede existir video de seguridad; identificarlo pronto puede ser útil.",
  },
  fullerton: {
    slug: "fullerton",
    name: "Fullerton",
    description: "Guía de accidentes y lesiones en Fullerton con recursos locales, evidencia y cuestiones de seguros.",
    localIntro: "Fullerton incluye corredores comerciales, áreas residenciales y tráfico universitario. Después de un accidente, el reporte correspondiente, las cámaras cercanas y la documentación médica y laboral pueden ser importantes.",
    localNote: "Si la lesión afecta estudios, trabajo o una práctica profesional, documente esas pérdidas además de los gastos médicos.",
  },
  "garden-grove": {
    slug: "garden-grove",
    name: "Garden Grove",
    description: "Guía local para reclamos por accidentes y lesiones en Garden Grove.",
    localIntro: "Corredores como Harbor Boulevard y Brookhurst Street tienen negocios, estacionamientos y tráfico frecuente. Cámaras privadas y reportes locales pueden ayudar a reconstruir un accidente.",
    localNote: "Muchos sistemas de video se sobrescriben en pocos días; identifique negocios o propiedades con cámaras lo antes posible.",
  },
  cypress: {
    slug: "cypress",
    name: "Cypress",
    description: "Información sobre accidentes y lesiones en Cypress y comunidades cercanas del norte del Condado de Orange.",
    localIntro: "Cypress está cerca de varias fronteras municipales. La ubicación exacta del incidente puede determinar qué agencia respondió y qué recursos locales corresponden.",
    localNote: "Guarde la ubicación precisa, no solo la intersección aproximada, especialmente cerca de límites entre ciudades.",
  },
  "la-habra": {
    slug: "la-habra",
    name: "La Habra",
    description: "Guía para accidentes y lesiones en La Habra con enfoque en evidencia, seguros y plazos de California.",
    localIntro: "La Habra conecta el norte del Condado de Orange con ciudades vecinas del Condado de Los Angeles. Los accidentes pueden involucrar conductores y aseguradoras de distintas áreas, pero los mismos principios de evidencia y plazos siguen siendo importantes.",
    localNote: "Mantenga juntos reportes, fotos, tratamiento y comunicaciones de seguro para que la cronología del caso sea clara.",
  },
  "la-mirada": {
    slug: "la-mirada",
    name: "La Mirada",
    description: "Información local sobre accidentes y lesiones en La Mirada, Condado de Los Angeles.",
    localIntro: "Aunque La Mirada está junto a ciudades del Condado de Orange, pertenece al Condado de Los Angeles. Eso puede cambiar la agencia, el tribunal y ciertos procedimientos locales.",
    localNote: "Confirme el condado y la agencia que respondió; no asuma que un accidente cerca de la frontera pertenece a Orange County.",
  },
  cerritos: {
    slug: "cerritos",
    name: "Cerritos",
    description: "Guía de accidentes y lesiones en Cerritos con recursos sobre reportes, evidencia y reclamos.",
    localIntro: "Cerritos está conectado con las autopistas 91 y 605 y con corredores comerciales importantes. Un choque de autopista puede generar registros distintos a un accidente en una calle local.",
    localNote: "En choques de autopista, la CHP puede ser la agencia que preparó el reporte; identifique correctamente quién respondió.",
  },
  norwalk: {
    slug: "norwalk",
    name: "Norwalk",
    description: "Información sobre reclamos por accidentes y lesiones en Norwalk y el sureste del Condado de Los Angeles.",
    localIntro: "Norwalk cuenta con recursos judiciales y policiales propios de Los Angeles County. El lugar del accidente, la agencia y el tribunal potencial son datos prácticos que conviene identificar temprano.",
    localNote: "El tribunal más cercano no siempre determina dónde se presentaría una demanda; eso depende de los hechos y las reglas de jurisdicción.",
  },
  whittier: {
    slug: "whittier",
    name: "Whittier",
    description: "Guía local de accidentes y lesiones en Whittier con enfoque en evidencia, reportes y próximos pasos.",
    localIntro: "Whittier combina vías comerciales, calles residenciales y zonas con pendientes y visibilidad limitada. Las fotografías de líneas de visión y condiciones de la vía pueden ser especialmente útiles.",
    localNote: "Tome fotografías desde la perspectiva de cada participante cuando la visibilidad o la geometría de la calle sea una cuestión importante.",
  },
};

export const getSpanishLocation = (slug: string) => esLocationContent[slug];
