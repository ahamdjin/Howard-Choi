import type { LocalGuide } from "./locationGuidesEn";

/** City-specific Spanish content. These pages remain noindex pending language
 * and attorney review. Source references are shared with the English guides.
 */
export const locationGuidesEs: Record<string, Pick<LocalGuide, "seoTitle" | "seoDescription" | "records" | "evidence" | "deadlines" | "faqs">> = {
  "buena-park": {
    seoTitle: "Accidentes en Buena Park | Reportes y evidencia",
    seoDescription: "Cómo identificar reportes de Buena Park Police o CHP, preservar pruebas en Beach Boulevard y revisar los plazos de reclamos por lesiones.",
    records: "Para un choque en una calle de Buena Park, conserve el número de incidente y confirme qué agencia lo investigó. La política de Buena Park Police limita la entrega de reportes de colisión a las personas autorizadas por el Código de Vehículos de California. Si ocurrió en las autopistas I-5 o SR-91, el informe podría ser de CHP. Su portal y formulario CHP 190 sirven para investigaciones de CHP, no para obtener reportes emitidos por la policía municipal.",
    evidence: "En Beach Boulevard o en una entrada comercial, documente carriles, señales, dirección de los vehículos y lugar exacto del impacto. Si había comercios o estacionamientos cerca, anote quién podría conservar cámaras de seguridad y solicite preservar el video sin asumir que existe. Para una caída en un negocio, registre la condición peligrosa, los avisos y quién controlaba esa área.",
    deadlines: "La ubicación del despacho en Buena Park no determina dónde debe presentarse una demanda. California generalmente establece dos años para muchas acciones por lesiones, con excepciones. Si pudiera ser responsable una entidad pública, puede existir un trámite administrativo mucho antes, normalmente dentro de seis meses en ciertos reclamos por lesiones. El reporte policial no sustituye ese trámite.",
    faqs: [
      ["¿Dónde solicito el reporte de un choque en Beach Boulevard?", "Primero averigüe qué agencia acudió y conserve el número de incidente. Un reporte de Buena Park Police se solicita a esa agencia; si CHP investigó en la autopista, consulte su portal o el formulario CHP 190."],
      ["¿Qué debo fotografiar cerca de Knott's o de una entrada comercial?", "La entrada, los carriles, los semáforos, las posiciones de los vehículos y los negocios cercanos. Identifique posibles cámaras y testigos sin suponer cuánto tiempo se conservarán las grabaciones."],
      ["¿Necesito presentar la demanda donde está la oficina del abogado?", "No. El lugar del despacho no decide la sede judicial. El sitio de la lesión, las partes demandadas y las reglas de competencia pueden importar."],
    ],
  },
  anaheim: {
    seoTitle: "Lesiones en Anaheim | Reportes policiales y viajes compartidos",
    seoDescription: "Guía de Anaheim para buscar reportes de tráfico, conservar viajes de Uber o Lyft y comprender lesiones en zonas de hoteles y atracciones.",
    records: "Anaheim Police ofrece una búsqueda de ciertos reportes de tránsito, incluidos choques sin lesiones y algunos casos de fuga. Se necesita el número de reporte y los casos presentados por internet pueden tardar en aparecer. Si la búsqueda no encuentra el documento, utilice el procedimiento separado para pedir un reporte policial. Compruebe antes si el incidente fue investigado por Anaheim Police, CHP u otra agencia.",
    evidence: "En incidentes cerca de hoteles, transporte de visitantes o viajes de Uber y Lyft, guarde comprobantes de viaje, estado de la aplicación, hora de recogida, identificación del conductor y operador. Para un peatón, documente señales y punto de cruce; para un vehículo comercial, distinga al conductor de la empresa. Solicite información sobre cámaras a quien realmente las gestione.",
    deadlines: "Los accidentes en zonas turísticas siguen sujetos a las reglas legales aplicables a los hechos y a las partes, no a una fecha especial por ser visitantes. Los reclamos contra una entidad pública pueden requerir un trámite administrativo anticipado. Que un choque ocurra cerca de un hotel no demuestra responsabilidad del establecimiento.",
    faqs: [
      ["¿Por qué no aparece mi reporte en la búsqueda de Anaheim Police?", "El sistema no publica inmediatamente todos los reportes. Se exige un número de caso y algunos necesitan revisión; use la solicitud oficial alternativa y confirme quién investigó."],
      ["¿Qué datos sirven si viajaba en un shuttle, Uber o Lyft?", "Identifique empresa, vehículo, conductor, estado del viaje, ubicación de recogida y comunicaciones. Estos detalles ayudan a evaluar qué coberturas podrían intervenir."],
      ["¿El hotel es responsable solo porque ocurrió el choque cerca?", "No. Hay que identificar quién controlaba el vehículo o la condición peligrosa y qué hechos respaldan una posible responsabilidad."],
    ],
  },
  fullerton: {
    seoTitle: "Accidentes en Fullerton | Reportes por lesiones y pruebas",
    seoDescription: "Restricciones de los reportes en línea de Fullerton Police, documentos de accidentes cerca de escuelas y cuestiones de tribunal.",
    records: "Fullerton Police limita su sistema de reporte en línea a categorías elegibles sin lesiones. Si hubo lesionados, las instrucciones policiales indican usar otro canal de contacto, no ese formulario. La página también enlaza el procedimiento para solicitar una copia. En una autopista estatal, verifique qué autoridad atendió el hecho antes de pedir un reporte municipal.",
    evidence: "En un cruce cerca de escuelas o zonas universitarias, registre el paso peatonal, los semáforos, el sentido de los giros y posibles cámaras. Si una lesión causó ausencias académicas o de prácticas, conserve horarios, avisos de asistencia, restricciones médicas y documentación del trabajo afectado. No todas esas consecuencias representan automáticamente pérdidas recuperables.",
    deadlines: "El North Justice Center está en Fullerton y atiende determinadas materias, pero no recibe necesariamente todas las demandas civiles por lesiones en la ciudad. Las reglas de competencia y asignación deben verificarse. Los plazos también dependen del tipo de demandado y pueden ser más breves para reclamos contra organismos públicos.",
    faqs: [
      ["¿Se puede denunciar en línea un choque con lesionados en Fullerton?", "No mediante el sistema municipal para choques sin lesiones. Fullerton Police ofrece instrucciones de contacto distintas para accidentes con lesiones."],
      ["¿Qué documentos necesito si perdí clases por una lesión?", "Registros de asistencia, horarios, prácticas o trabajo perdido, junto con informes clínicos que expliquen las restricciones reales."],
      ["¿Todas las demandas de Fullerton se llevan al North Justice Center?", "No necesariamente. El edificio existe, pero la competencia y la distribución de casos civiles se determinan por las reglas del tribunal."],
    ],
  },
  "garden-grove": {
    seoTitle: "Lesiones en Garden Grove | Reportes y pruebas comerciales",
    seoDescription: "Procedimiento de Garden Grove Police, plazo de revisión de reportes, pruebas en Harbor y Brookhurst y reclamos por caídas.",
    records: "Garden Grove Police permite solicitar ciertos reportes a personas lesionadas, afectadas por daños o representantes autorizados. Sus instrucciones piden esperar al menos 21 días para solicitar una copia de un reporte de colisión, debido a la revisión y aprobación. Puede haber restricciones o datos censurados. Ese plazo administrativo no significa que deba esperar para recibir tratamiento o preservar pruebas.",
    evidence: "En Harbor Boulevard o Brookhurst Street, documente la entrada comercial, las maniobras y la ubicación exacta. Una caída en una tienda puede requerir fotografías del suelo, avisos de seguridad, registros de inspección y el nombre del operador. Un accidente vial puede necesitar testigos, semáforos y cámaras de comercios cercanos.",
    deadlines: "El tiempo para obtener un informe policial no es el plazo para presentar una demanda. Si el hecho involucra una condición de vía pública o un vehículo municipal, evalúe pronto si corresponde un reclamo administrativo ante una entidad pública. No espere al cierre de la investigación para conservar pruebas.",
    faqs: [
      ["¿Por qué Garden Grove Police menciona 21 días para un reporte?", "La agencia indica ese período para revisar y aprobar reportes de colisión. No es una instrucción de demorar la atención médica ni una fecha de prescripción."],
      ["¿Qué cambia si me caí dentro de un comercio?", "Importan el estado del piso, los avisos, el mantenimiento, el control del lugar, las cámaras y el reporte interno, más que un formulario policial de choque."],
      ["¿Cualquier persona puede obtener el reporte?", "No. La policía publica condiciones de elegibilidad, restricciones de investigación y posibles datos protegidos."],
    ],
  },
  cypress: {
    seoTitle: "Accidentes en Cypress | Solicitud de reportes policiales",
    seoDescription: "Cypress Police exige solicitud e identificación para ciertos reportes. Guía de límites municipales, evidencia de tráfico y plazos.",
    records: "Cypress Police publica un formulario oficial de solicitud de entrega de registros. Para obtener un reporte de colisión debe acreditarse la relación con el caso y presentar la identificación exigida; cada solicitud se evalúa individualmente. Cerca de los límites municipales, confirme la dirección real del incidente y la agencia que acudió antes de enviar la solicitud.",
    evidence: "En cruces próximos a otras ciudades, conserve un mapa preciso, las señales de calle, fotografías y el nombre de la agencia que atendió. Para una motocicleta o un giro conflictivo, documente ambos sentidos de circulación, carriles y visibilidad. Una imagen del daño del vehículo por sí sola no decide quién tenía prioridad.",
    deadlines: "La elegibilidad para recibir un reporte no determina el plazo civil. Los límites municipales pueden afectar qué policía investigó; la sede judicial depende además de los demandados y otros hechos. Si una agencia pública podría ser responsable, hay que revisar un procedimiento de reclamo previo potencialmente más corto.",
    faqs: [
      ["¿Qué debo llevar para solicitar un reporte de Cypress Police?", "El formulario oficial, identificación adecuada, datos del incidente y explicación de su relación con el caso, según las reglas de entrega de registros."],
      ["¿Qué ocurre si el choque fue cerca de Los Alamitos?", "Confirme la dirección exacta y qué agencia respondió. El nombre de la ciudad más cercana no prueba quién tiene el expediente."],
      ["¿Debo esperar el reporte para guardar fotografías?", "No. Preserve de forma temprana señales, daños, testigos, video y registros médicos."],
    ],
  },
  "la-habra": {
    seoTitle: "Lesiones en La Habra | Records Bureau y accidentes",
    seoDescription: "Contactos oficiales de La Habra Police, evidencia en Whittier Boulevard e Imperial Highway y cuestiones de competencia.",
    records: "La Habra Police publica contactos separados para su Records Bureau y Traffic Bureau. Para un accidente en una calle municipal, confirme qué autoridad lo investigó y conserve el número de incidente. Cerca de la línea con Los Ángeles o de una autopista, no suponga la jurisdicción por el nombre de la avenida; utilice la ubicación exacta.",
    evidence: "En Whittier Boulevard o Imperial Highway, registre la dirección de ambos vehículos, el carril del giro, la señal y el punto del impacto. En una entrada de comercio, identifique si la maniobra ocurrió en la vía pública o en propiedad privada. Guarde testigos, fotografías y fechas de atención clínica.",
    deadlines: "La cercanía de La Habra con Los Angeles County no decide automáticamente el tribunal de una demanda. Las reglas de California consideran el lugar del incidente, los demandados y otros factores. El plazo general por lesiones tiene excepciones y las entidades públicas pueden requerir una reclamación administrativa anterior.",
    faqs: [
      ["¿Qué oficina de La Habra Police atiende dudas sobre reportes?", "La ciudad distingue las consultas de Records Bureau y Traffic Bureau. Prepare fecha, lugar, número del caso y agencia investigadora."],
      ["¿Por qué importa la dirección exacta cerca del límite del condado?", "Una misma avenida puede atravesar varias jurisdicciones. La autoridad que investigó y la competencia civil deben determinarse por los hechos."],
      ["¿Qué ayuda en una disputa por un giro a la izquierda?", "Fotos de carriles, líneas de detención, semáforos, dirección de los vehículos, testigos y grabaciones disponibles."],
    ],
  },
  "la-mirada": {
    seoTitle: "Lesiones en La Mirada | Reportes del Sheriff de Norwalk",
    seoDescription: "Cómo solicitar documentos en Norwalk Sheriff's Station y revisar accidentes de La Mirada, jurisdicción del condado y tribunal.",
    records: "La Mirada recibe servicios del Sheriff's Department del condado de Los Ángeles. La información municipal dirige la solicitud de una copia policial a Norwalk Sheriff's Station y recomienda llevar el número del expediente. LASD también dispone de su Records and Identification Bureau. Primero identifique qué autoridad documentó el accidente; no todos los reportes son de LASD.",
    evidence: "La Mirada pertenece a Los Angeles County pese a su cercanía con Buena Park y La Habra. Anote el lugar real, la vía y el propietario de cualquier inmueble relacionado. En una lesión de peatón, conserve la dirección del cruce, semáforos y visibilidad; en una entrada comercial, identifique cámaras y quién las controla.",
    deadlines: "No todas las demandas originadas en La Mirada se presentan automáticamente en Norwalk Courthouse. El Tribunal Superior de Los Ángeles ofrece reglas y un localizador para casos civiles. Si pudiera intervenir una entidad pública, un reclamo administrativo anticipado puede ser distinto de solicitar el reporte policial.",
    faqs: [
      ["¿Dónde se obtiene un reporte de un incidente en La Mirada?", "La información pública municipal señala Norwalk Sheriff's Station y recomienda llevar el número del expediente. LASD tiene también instrucciones centrales de registros."],
      ["¿La Mirada pertenece a Orange County?", "No. La Mirada está en Los Angeles County aunque se encuentre junto a ciudades del condado de Orange."],
      ["¿Debo presentar siempre la demanda en Norwalk?", "No. Consulte el localizador civil del Tribunal Superior y las reglas de competencia aplicables."],
    ],
  },
  cerritos: {
    seoTitle: "Accidentes en Cerritos | Sheriff, CHP y pruebas",
    seoDescription: "Diferencias entre reportes de Cerritos Sheriff's Station y CHP en SR-91/I-605, evidencia de centros comerciales y trámites civiles.",
    records: "Cerritos Sheriff's Station presta servicio a la ciudad de Cerritos y LASD tiene un procedimiento central de solicitud de reportes. Un choque en SR-91 o I-605 puede haber sido investigado por CHP, cuya solicitud es distinta. Antes de pedir un documento, verifique el número del incidente y quién elaboró el informe.",
    evidence: "Para un choque en autopista, documente ruta, dirección, carril, salida cercana y vehículos implicados. Para una lesión en un estacionamiento comercial, identifique entrada, empresa o administrador, cámaras, superficie y reporte interno. Son incidentes con preguntas probatorias diferentes y no conviene tratarlos como si fueran idénticos.",
    deadlines: "Cerritos está en Los Angeles County, pero el tribunal para un caso civil depende de las reglas de competencia y las partes. La existencia de una autopista o centro comercial tampoco prueba responsabilidad. Los reclamos contra entidades públicas pueden exigir una solicitud administrativa antes del plazo general de lesiones.",
    faqs: [
      ["¿El reporte de SR-91 se solicita al Sheriff o a CHP?", "Depende de quién investigó el accidente. LASD sirve la ciudad; CHP mantiene su propio sistema para choques investigados por esa agencia."],
      ["¿Qué debo preservar si me lesioné en un estacionamiento?", "El lugar exacto, la entrada, el operador, las cámaras, el peligro o movimiento del vehículo y cualquier reporte elaborado por el negocio."],
      ["¿Se entregan los reportes del Sheriff a cualquier persona?", "No automáticamente. LASD revisa la elegibilidad y las restricciones de publicación según el tipo de documento."],
    ],
  },
  norwalk: {
    seoTitle: "Accidentes en Norwalk | Reportes LASD y tribunal",
    seoDescription: "Solicitudes al Sheriff, reportes CHP en I-5/I-605, pruebas de accidentes en Norwalk y las reglas para presentar una demanda.",
    records: "Norwalk Sheriff's Station presta servicio a Norwalk y La Mirada. La oficina central de Records and Identification Bureau de LASD publica vías para solicitar copias y pide datos del solicitante, fecha y ubicación del hecho. Un accidente en las autopistas I-5 o I-605 podría estar documentado por CHP, así que confirme primero quién respondió.",
    evidence: "En Firestone Boulevard o Rosecrans Avenue, anote carriles, giro, señales y testigos. En autopista, registre dirección, salida próxima y punto exacto. Si el incidente involucró una instalación de transporte o entidad pública, identifique quién controlaba el lugar y conserve cualquier comunicación o documento pertinente.",
    deadlines: "La presencia de Norwalk Courthouse no implica que toda lesión en Norwalk se demande allí. El Tribunal Superior de Los Ángeles ofrece su localizador de sedes para asuntos civiles. Los plazos pueden variar si el responsable es un particular o una entidad pública, y los trámites son diferentes.",
    faqs: [
      ["¿Dónde solicito un reporte de Norwalk Sheriff's Station?", "Verifique que LASD haya investigado y siga las instrucciones de su Records and Identification Bureau, con identificación y datos del hecho."],
      ["¿Un choque en I-605 siempre queda en el expediente de LASD?", "No. Si CHP investigó, corresponde su propia solicitud de reporte y número de incidente."],
      ["¿Por estar cerca de Norwalk Courthouse debo demandar allí?", "No necesariamente. La sede civil se determina mediante las reglas y el localizador del tribunal."],
    ],
  },
  whittier: {
    seoTitle: "Lesiones en Whittier | Traffic Bureau y reportes",
    seoDescription: "Cómo obtener registros de Whittier Police, identificar jurisdicción en zonas no incorporadas y conservar pruebas de visibilidad en calles inclinadas.",
    records: "La página oficial de Whittier Police indica que su Traffic Bureau investiga choques en Whittier y Santa Fe Springs, incluidos algunos casos de fuga y accidentes mortales. El Records Bureau administra documentos de tráfico. Determinadas zonas no incorporadas con dirección postal de Whittier pueden corresponder a LASD y los choques de autopista podrían ser de CHP. Compruebe el lugar preciso y la autoridad investigadora.",
    evidence: "En calles inclinadas o curvas, documente la visibilidad desde cada aproximación, pendientes, autos estacionados, iluminación y señalización. En un cruce comercial, registre paso peatonal, bordillo y dirección del giro. La pendiente por sí sola no demuestra negligencia; se necesita reconstruir lo ocurrido.",
    deadlines: "Un reporte policial no determina el plazo para demandar ni resuelve definitivamente la responsabilidad civil. Las reclamaciones ordinarias y las posibles reclamaciones frente a entidades públicas pueden seguir calendarios diferentes. Verifique además las reglas de la sede civil correspondiente en Los Ángeles.",
    faqs: [
      ["¿Whittier Police investiga choques en Santa Fe Springs?", "Su Traffic Bureau identifica ambas ciudades en sus funciones. Para un caso concreto, confirme el número del reporte y el investigador."],
      ["¿Puede responder LASD a un incidente con dirección postal de Whittier?", "Sí, en ciertas áreas no incorporadas. La ubicación real es más fiable que el nombre postal para identificar la jurisdicción."],
      ["¿Qué fotografías ayudan en una disputa de visibilidad en una colina?", "Curvas, pendiente, vehículos estacionados, señalización, iluminación y las vistas desde cada sentido, tomadas de manera segura."],
    ],
  },
};
