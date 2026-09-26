export type SpanishPractice = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  issues: string[];
  evidenceTitle: string;
  evidenceIntro: string;
  valueIntro: string;
  insuranceIntro: string;
  faqs: Array<[string, string]>;
};

export const esPracticeContent: Record<string, SpanishPractice> = {
  "car-accidents": {
    slug: "car-accidents",
    title: "Abogado de accidentes de auto en Buena Park",
    shortTitle: "Accidentes de auto",
    description: "Ayuda con reclamos por lesiones después de choques de auto en Buena Park, incluidos disputas de culpa, seguros, tratamiento médico y pérdida de ingresos.",
    intro: "Un choque puede afectar al mismo tiempo su salud, su vehículo, su trabajo y su relación con las aseguradoras. Un reclamo sólido empieza por documentar cómo ocurrió el accidente, identificar la cobertura disponible y registrar con claridad el tratamiento y las pérdidas que siguieron.",
    issues: ["Choques por alcance e intersecciones", "Atropello y fuga y conductores sin seguro", "Disputas sobre culpa", "Gastos médicos, salarios perdidos y atención futura"],
    evidenceTitle: "Obtenga la evidencia antes de que desaparezca.",
    evidenceIntro: "Guarde fotos y videos del lugar, daños de los vehículos, datos de testigos, el reporte policial, expedientes médicos y comunicaciones del seguro. Las cámaras de negocios e intersecciones pueden sobrescribirse rápidamente.",
    valueIntro: "El valor de un reclamo depende de la gravedad y duración de la lesión, el tratamiento, la atención futura, el tiempo perdido de trabajo, las limitaciones permanentes, la responsabilidad, los límites de seguro y la calidad de la documentación.",
    insuranceIntro: "Puede haber más de una póliza relevante: la del conductor responsable, la del propietario del vehículo, una póliza comercial si alguien estaba trabajando y su propia cobertura para conductores sin seguro o con seguro insuficiente.",
    faqs: [
      ["¿Qué pasa si dicen que yo tuve parte de la culpa?", "California aplica principios de culpa comparativa. Una parte de responsabilidad no necesariamente elimina el reclamo, pero puede reducir la recuperación según el porcentaje atribuido."],
      ["¿Debo dar una declaración grabada al seguro?", "Antes de dar una declaración detallada o firmar autorizaciones amplias, conviene entender qué aseguradora la solicita y para qué la utilizará."],
      ["¿Qué pasa si el otro conductor no tenía seguro?", "Puede ser necesario revisar su cobertura para conductores sin seguro o con seguro insuficiente, además del reporte policial, videos y otras fuentes de evidencia."],
    ],
  },
  "truck-accidents": {
    slug: "truck-accidents",
    title: "Abogado de accidentes de camión en Buena Park",
    shortTitle: "Accidentes de camión",
    description: "Reclamos por lesiones causadas por camiones comerciales, vehículos de reparto y flotas, con atención a registros de empresa, conductores y múltiples capas de seguro.",
    intro: "Un accidente de camión rara vez se limita al conductor. La empresa transportista, el propietario, el empleador, el mantenimiento, los registros electrónicos y varias pólizas pueden ser relevantes. Por eso la preservación temprana de evidencia suele ser especialmente importante.",
    issues: ["Camiones comerciales y vehículos de reparto", "Responsabilidad del conductor y la empresa", "Registros electrónicos y de mantenimiento", "Lesiones graves o fatales"],
    evidenceTitle: "La evidencia más importante puede estar en los registros de la empresa.",
    evidenceIntro: "Los datos ELD, registros de horas de servicio, mantenimiento, inspecciones, despacho, cámaras a bordo y archivos del conductor pueden ayudar a explicar lo que ocurrió antes del choque. Algunos registros no se conservan indefinidamente.",
    valueIntro: "Estos casos pueden incluir lesiones graves, atención futura, pérdida de capacidad de ingresos y preguntas complejas sobre responsabilidad. También importa cuánta cobertura comercial existe y cuántas empresas participaron.",
    insuranceIntro: "Un choque comercial puede involucrar varias pólizas y entidades. Es importante identificar al conductor, transportista, propietario del vehículo o remolque, empleador, contratistas y cualquier otra parte relevante.",
    faqs: [
      ["¿El conductor del camión es siempre el único responsable?", "No necesariamente. Dependiendo de los hechos, también pueden ser relevantes la empresa transportista, el propietario, el empleador, mantenimiento u otras entidades."],
      ["¿Qué es un ELD?", "Es un dispositivo electrónico que puede registrar información sobre tiempo de conducción y actividad del vehículo. En algunos casos ayuda a reconstruir la cronología del viaje."],
      ["¿Por qué importa actuar pronto?", "Ciertos videos, datos electrónicos y registros comerciales pueden tener periodos de retención limitados."],
    ],
  },
  "motorcycle-accidents": {
    slug: "motorcycle-accidents",
    title: "Abogado de accidentes de motocicleta en Buena Park",
    shortTitle: "Accidentes de motocicleta",
    description: "Representación para motociclistas lesionados en choques con disputas sobre visibilidad, carriles, derecho de paso y cobertura de seguro.",
    intro: "Los motociclistas pueden sufrir lesiones graves aun cuando el daño visible al otro vehículo sea pequeño. La posición en el carril, la visibilidad, los giros, las condiciones de la vía y la documentación médica suelen ser centrales.",
    issues: ["Giros a la izquierda y cambios de carril", "Disputas de visibilidad y derecho de paso", "Lesiones de cabeza, columna y ortopédicas", "Cobertura de seguro y culpa discutida"],
    evidenceTitle: "Cuando se discute la visibilidad, la posición de los vehículos importa.",
    evidenceIntro: "Fotografías del camino, marcas de carril, daños, testigos, cámaras cercanas y la posición final de los vehículos pueden ayudar a reconstruir lo que cada conductor podía ver.",
    valueIntro: "La gravedad de la lesión, cirugía, rehabilitación, tiempo fuera del trabajo, atención futura, cicatrices, limitaciones permanentes, responsabilidad y seguro disponible influyen en el reclamo.",
    insuranceIntro: "Normalmente se revisa la póliza del conductor responsable y, cuando corresponde, la cobertura propia para conductores sin seguro o con seguro insuficiente.",
    faqs: [
      ["¿Una lesión grave prueba que el otro conductor tuvo la culpa?", "No. La gravedad de la lesión y la responsabilidad son preguntas distintas; ambas necesitan evidencia."],
      ["¿Qué pasa si el conductor dice que no vio la motocicleta?", "La visibilidad puede evaluarse con posición de carriles, iluminación, líneas de visión, daños, testigos y video."],
      ["¿Mi propio seguro de motocicleta puede importar?", "Sí. Dependiendo de la póliza y los hechos, la cobertura UM/UIM puede ser relevante."],
    ],
  },
  "pedestrian-accidents": {
    slug: "pedestrian-accidents",
    title: "Abogado de accidentes peatonales en Buena Park",
    shortTitle: "Accidentes peatonales",
    description: "Reclamos por lesiones de peatones en cruces peatonales, intersecciones, estacionamientos, entradas y casos de atropello y fuga.",
    intro: "Un peatón no tiene la protección física de un vehículo. El lugar exacto del impacto, señales, iluminación, visibilidad, velocidad, testigos, video y las consecuencias médicas pueden ser decisivos.",
    issues: ["Cruces peatonales e intersecciones", "Estacionamientos y entradas", "Atropello y fuga", "Lesiones graves y de larga duración"],
    evidenceTitle: "Las cámaras cercanas pueden perderse rápidamente.",
    evidenceIntro: "Negocios, viviendas, timbres con cámara, autobuses y otros vehículos pueden tener grabaciones útiles. Guarde también fotos, información de testigos, reportes y registros médicos.",
    valueIntro: "Las lesiones peatonales pueden requerir hospitalización, cirugía, rehabilitación y atención prolongada. La responsabilidad, el seguro, la evidencia médica y el efecto en la independencia diaria son importantes.",
    insuranceIntro: "La póliza del conductor suele ser central, pero también pueden importar propietarios de vehículos, empleadores, pólizas comerciales o de rideshare y su propia cobertura UM.",
    faqs: [
      ["¿Estar en un cruce peatonal decide automáticamente la culpa?", "No por sí solo. También pueden importar señales, velocidad, visibilidad, movimientos de giro y otras pruebas."],
      ["¿Qué hago si el conductor huyó?", "Reporte el hecho, preserve cámaras y testigos y revise la cobertura de conductor sin seguro cuando corresponda."],
      ["¿Por qué estos casos pueden ser médicamente complejos?", "La falta de protección física puede producir lesiones que requieren cirugía, rehabilitación, atención futura y cambios importantes en la vida diaria."],
    ],
  },
  "rideshare-accidents": {
    slug: "rideshare-accidents",
    title: "Abogado de accidentes de Uber y Lyft en Buena Park",
    shortTitle: "Accidentes de Uber y Lyft",
    description: "Ayuda con accidentes de rideshare en California, incluido el estado de la aplicación, registros del viaje, seguros superpuestos y lesiones de pasajeros.",
    intro: "Un choque de Uber o Lyft añade una pregunta clave: qué estaba haciendo el conductor en la aplicación en el momento del accidente. Estar desconectado, esperando una solicitud, yendo a recoger a alguien o transportando a un pasajero puede cambiar el análisis del seguro.",
    issues: ["Lesiones de pasajeros", "Estado de la aplicación y registros del viaje", "Pólizas superpuestas", "Choques causados por conductores de rideshare u otros vehículos"],
    evidenceTitle: "La cronología de la aplicación importa tanto como la del choque.",
    evidenceIntro: "Guarde el recibo del viaje, capturas de pantalla, información del conductor y vehículo, mensajes de la aplicación, fotos, reportes y registros médicos.",
    valueIntro: "El valor sigue dependiendo de tratamiento, necesidades futuras, pérdida de ingresos, dolor, limitaciones, responsabilidad y evidencia. La capa rideshare afecta qué póliza puede responder.",
    insuranceIntro: "California distingue los requisitos de seguro según el estado de la aplicación del conductor. Por eso es importante preservar pronto la información del viaje.",
    faqs: [
      ["¿Por qué importa el estado de la aplicación?", "Porque la cobertura disponible puede cambiar según si el conductor estaba esperando una solicitud, había aceptado un viaje o transportaba a un pasajero."],
      ["¿Qué pasa si yo era pasajero?", "El registro del viaje puede ayudar a establecer el contexto de la cobertura, además de la evidencia habitual del accidente y la lesión."],
      ["¿Siempre aplica una póliza de un millón de dólares?", "No. La cobertura depende del periodo de rideshare y de los hechos específicos del accidente."],
    ],
  },
  "slip-and-fall": {
    slug: "slip-and-fall",
    title: "Abogado de resbalones y caídas en Buena Park",
    shortTitle: "Resbalones y caídas",
    description: "Reclamos por lesiones causadas por condiciones peligrosas en tiendas, negocios, propiedades privadas y otros establecimientos.",
    intro: "Una condición peligrosa puede limpiarse, repararse o cambiar poco después de una caída. Fotografías, video, reportes de incidente, testigos y registros de inspección pueden ser especialmente importantes.",
    issues: ["Pisos mojados y derrames", "Superficies peligrosas o defectuosas", "Iluminación y advertencias", "Video, inspección y mantenimiento"],
    evidenceTitle: "Documente la condición antes de que cambie.",
    evidenceIntro: "Tome fotografías de la condición y del área, conserve ropa o calzado relevantes, identifique testigos y solicite una copia o número del reporte de incidente cuando exista.",
    valueIntro: "El reclamo puede considerar tratamiento médico, rehabilitación, pérdida de ingresos, atención futura, limitaciones permanentes y el efecto de la lesión en la vida diaria.",
    insuranceIntro: "Puede ser necesario identificar quién controlaba la propiedad, quién era responsable de inspección o mantenimiento y qué seguro de responsabilidad estaba vigente.",
    faqs: [
      ["¿El propietario es responsable automáticamente porque me caí?", "No. Importan la condición peligrosa, el control del área, el aviso real o constructivo, las inspecciones y las circunstancias de la caída."],
      ["¿Por qué es importante el video?", "Puede mostrar la condición, cuánto tiempo existió, advertencias, limpieza y el accidente mismo."],
      ["¿Qué pasa si arreglaron el peligro inmediatamente?", "Las fotos, testigos, reportes y solicitudes de preservación pueden ser aún más importantes cuando la escena cambia."],
    ],
  },
  "wrongful-death": {
    slug: "wrongful-death",
    title: "Abogado de muerte por negligencia en Buena Park",
    shortTitle: "Muerte por negligencia",
    description: "Orientación para familias que enfrentan una muerte causada por un accidente o conducta negligente, incluidos plazos, elegibilidad y pérdidas familiares.",
    intro: "Una muerte causada por un accidente plantea preguntas legales y financieras en un momento especialmente difícil. La elegibilidad para presentar la acción, los plazos, la responsabilidad, el seguro y la documentación de las pérdidas deben revisarse con cuidado.",
    issues: ["Accidentes fatales", "Personas con derecho a presentar el reclamo", "Apoyo financiero y contribuciones al hogar", "Seguro, evidencia y plazos"],
    evidenceTitle: "La evidencia de responsabilidad sigue siendo esencial.",
    evidenceIntro: "Además de la evidencia del accidente, pueden ser importantes registros médicos y de fallecimiento, información financiera, contribuciones al hogar y documentación de las relaciones familiares.",
    valueIntro: "Los daños disponibles dependen de la ley aplicable, la relación familiar y los hechos. Pueden incluir ciertas pérdidas económicas y no económicas reconocidas por California.",
    insuranceIntro: "Debe identificarse toda cobertura potencial relacionada con las personas, vehículos, empresas o propiedades involucradas.",
    faqs: [
      ["¿Quién puede presentar una demanda por muerte por negligencia en California?", "La ley de California identifica categorías de personas que pueden tener legitimación. La respuesta depende de la relación familiar y las circunstancias."],
      ["¿Es lo mismo que una acción de supervivencia?", "No. Son teorías legales distintas y pueden cubrir tipos de pérdidas diferentes."],
      ["¿Hay plazos especiales?", "Sí pueden existir. El plazo exacto depende de los hechos y de quién sea el posible demandado, especialmente si participa una entidad pública."],
    ],
  },
  "serious-injuries": {
    slug: "serious-injuries",
    title: "Abogado de lesiones graves en Buena Park",
    shortTitle: "Lesiones graves",
    description: "Reclamos por lesiones graves que pueden requerir cirugía, rehabilitación, atención futura o causar limitaciones duraderas en el trabajo y la vida diaria.",
    intro: "Cuando una lesión cambia la capacidad de trabajar, moverse o vivir de forma independiente, el reclamo debe mirar más allá de las facturas actuales. La atención futura, la pérdida de capacidad de ingresos y las limitaciones permanentes pueden ser centrales.",
    issues: ["Traumatismos ortopédicos graves", "Lesiones de cabeza o columna", "Cirugía y rehabilitación", "Atención futura y pérdida de capacidad laboral"],
    evidenceTitle: "La historia médica debe mostrar el impacto a largo plazo.",
    evidenceIntro: "Expedientes médicos, imágenes, recomendaciones de especialistas, planes de rehabilitación, restricciones laborales y documentación funcional ayudan a explicar la magnitud de la lesión.",
    valueIntro: "El análisis puede incluir costos médicos actuales y futuros, pérdida de ingresos y capacidad de ganancia, dolor, limitaciones, necesidad de asistencia y otros daños respaldados por la evidencia.",
    insuranceIntro: "En lesiones graves es especialmente importante identificar todas las pólizas y partes responsables porque los daños pueden superar los límites de una sola póliza.",
    faqs: [
      ["¿Una lesión grave significa automáticamente un reclamo de alto valor?", "No. La responsabilidad, causalidad, cobertura, documentación y otros factores siguen siendo importantes."],
      ["¿Cómo se prueba la atención futura?", "Las recomendaciones médicas, diagnósticos, planes de tratamiento y opiniones de especialistas pueden ayudar a documentarla."],
      ["¿Qué pasa si no puedo volver al mismo trabajo?", "La pérdida de capacidad de ingresos puede ser relevante si puede demostrarse con evidencia médica, laboral y económica."],
    ],
  },
};

export const getSpanishPractice = (slug: string) => esPracticeContent[slug];
