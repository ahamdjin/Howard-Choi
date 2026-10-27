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
    description: "Guía de lesiones en Buena Park, con reportes de Buena Park Police y CHP y pruebas de accidentes en calles y negocios.",
    localIntro: "Buena Park combina las intersecciones comerciales de Beach Boulevard con las autopistas I-5 y SR-91. Un choque en una calle, un incidente de autopista y una lesión en un local comercial pueden requerir agencias y pruebas distintas. El hecho de que el despacho esté situado en Beach Boulevard no determina el tribunal ni quién investigó el accidente.",
    localNote: "Anote el lugar exacto del accidente y conserve fotos, reportes, comunicaciones del seguro y cualquier información sobre cámaras cercanas.",
  },
  anaheim: {
    slug: "anaheim",
    name: "Anaheim",
    description: "Anaheim: búsqueda oficial de reportes de tráfico, vehículos de transporte turístico, Uber o Lyft y pruebas para peatones.",
    localIntro: "En áreas hoteleras y de atracciones de Anaheim circulan automóviles particulares, vehículos de traslado, viajes por aplicación y peatones. Conviene distinguir quién operaba el vehículo, la hora y estado del trayecto, el lugar del cruce y las cámaras que puedan existir. Anaheim Police permite buscar determinados reportes; los de autopista podrían corresponder a CHP.",
    localNote: "En zonas comerciales y de hoteles puede existir video de seguridad; identificarlo pronto puede ser útil.",
  },
  fullerton: {
    slug: "fullerton",
    name: "Fullerton",
    description: "Fullerton: reportes por lesiones, choques cerca de escuelas y registros de actividades académicas afectadas.",
    localIntro: "Fullerton reúne accesos educativos, zonas residenciales e intersecciones de tránsito. Si una lesión afectó clases o prácticas, los registros académicos pueden acompañar los documentos médicos. Fullerton Police reserva su sistema de reportes de choque en línea para casos elegibles sin lesiones, y la cercanía del North Justice Center no decide automáticamente la sede de una demanda.",
    localNote: "Si la lesión afecta estudios, trabajo o una práctica profesional, documente esas pérdidas además de los gastos médicos.",
  },
  "garden-grove": {
    slug: "garden-grove",
    name: "Garden Grove",
    description: "Garden Grove: reportes policiales, colisiones en vías comerciales y pruebas de accidentes dentro de negocios.",
    localIntro: "Harbor Boulevard y Brookhurst Street conectan vías de tránsito, accesos comerciales y cruces peatonales. Un choque necesita datos de carriles y maniobras, mientras que una caída en una tienda puede depender del estado del piso y de quién lo mantenía. Garden Grove Police solicita a los interesados permitir al menos 21 días para la revisión de reportes de colisión; esto no impide preservar pruebas inmediatamente.",
    localNote: "Muchos sistemas de video se sobrescriben en pocos días; identifique negocios o propiedades con cámaras lo antes posible.",
  },
  cypress: {
    slug: "cypress",
    name: "Cypress",
    description: "Cypress: solicitud de reportes policiales y evidencia de choques cerca de límites municipales.",
    localIntro: "Cypress está próximo a varias ciudades del noroeste del condado de Orange. En un accidente cerca de un límite, la dirección exacta y la agencia que acudió importan más que el nombre de la ciudad cercana. Cypress Police publica un formulario de entrega de registros y condiciones de identificación y elegibilidad para solicitar reportes de colisión.",
    localNote: "Guarde la ubicación precisa, no solo la intersección aproximada, especialmente cerca de límites entre ciudades.",
  },
  "la-habra": {
    slug: "la-habra",
    name: "La Habra",
    description: "La Habra: consultas del Records Bureau y Traffic Bureau y pruebas de choques en avenidas principales.",
    localIntro: "La Habra se encuentra en Orange County cerca del límite con Los Ángeles. En Whittier Boulevard e Imperial Highway, el lugar real, los giros, los semáforos y los testigos pueden ser decisivos para reconstruir un hecho. La ciudad proporciona contactos separados de la policía para registros y tráfico. La proximidad del condado vecino no determina por sí sola la competencia de un tribunal.",
    localNote: "Mantenga juntos reportes, fotos, tratamiento y comunicaciones de seguro para que la cronología del caso sea clara.",
  },
  "la-mirada": {
    slug: "la-mirada",
    name: "La Mirada",
    description: "La Mirada: reportes de Norwalk Sheriff's Station y procesos de Los Angeles County.",
    localIntro: "La Mirada pertenece a Los Angeles County aunque esté junto a Buena Park y La Habra. La información oficial municipal identifica a Norwalk Sheriff's Station como agencia de servicio y señala dónde pedir un reporte. En un accidente junto a una propiedad comercial o un límite territorial, registre dirección, organismo que acudió y quién controlaba el inmueble antes de evaluar responsabilidad o sede judicial.",
    localNote: "Confirme el condado y la agencia que respondió; no asuma que un accidente cerca de la frontera pertenece a Orange County.",
  },
  cerritos: {
    slug: "cerritos",
    name: "Cerritos",
    description: "Cerritos: registros de Cerritos Sheriff's Station, posibles reportes CHP y evidencia de centros comerciales.",
    localIntro: "Cerritos recibe servicios policiales de Cerritos Sheriff's Station. Los choques en las autopistas SR-91 o I-605 podrían haber sido investigados por CHP, que utiliza otro sistema de reportes. En centros comerciales pueden importar las entradas, los operadores, las cámaras y el control del inmueble. Ninguno de esos lugares demuestra por sí solo la responsabilidad de una empresa o entidad pública.",
    localNote: "En choques de autopista, la CHP puede ser la agencia que preparó el reporte; identifique correctamente quién respondió.",
  },
  norwalk: {
    slug: "norwalk",
    name: "Norwalk",
    description: "Norwalk: reportes LASD, accidentes en I-5 e I-605 y reglas para determinar el tribunal civil.",
    localIntro: "Norwalk tiene conexiones con las autopistas I-5 e I-605 y vías como Firestone Boulevard y Rosecrans Avenue. Norwalk Sheriff's Station presta servicios a la ciudad, pero LASD dispone de procedimientos específicos para obtener copias. Un choque de autopista podría requerir un reporte de CHP. El Norwalk Courthouse existe, pero no todos los casos de lesiones se presentan allí.",
    localNote: "El tribunal más cercano no siempre determina dónde se presentaría una demanda; eso depende de los hechos y las reglas de jurisdicción.",
  },
  whittier: {
    slug: "whittier",
    name: "Whittier",
    description: "Whittier: Traffic Bureau, jurisdicción de áreas no incorporadas y pruebas de visibilidad en calles con pendiente.",
    localIntro: "Whittier combina avenidas comerciales y calles residenciales con pendientes o curvas, donde la visibilidad puede ser relevante. Whittier Police indica que su Traffic Bureau investiga choques en Whittier y Santa Fe Springs; algunas áreas no incorporadas con dirección postal de Whittier dependen del Sheriff. Por eso conviene fijar la ubicación exacta antes de solicitar un informe o evaluar un reclamo.",
    localNote: "Tome fotografías desde la perspectiva de cada participante cuando la visibilidad o la geometría de la calle sea una cuestión importante.",
  },
};

export const getSpanishLocation = (slug: string) => esLocationContent[slug];
