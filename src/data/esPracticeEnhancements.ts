export type SpanishPracticeEnhancement = {
  fromAttorney: string;
  headings: { understand: string; issues: string; value: string; insurance: string };
  evidenceItems: string[];
  damages: string[];
  deadlineNote: string;
  guideTitles: Record<string, string>;
};

export const esPracticeEnhancements: Record<string, SpanishPracticeEnhancement> = {
  "car-accidents": {
    fromAttorney: "Lo que más perjudica a muchas personas es la primera llamada de la aseguradora del otro conductor. Suelen ser amables, preguntan cómo se siente y mucha gente responde que está bien por costumbre. Meses después, cuando el cuello sigue mal, esa frase puede volver a aparecer. Puede decir que todavía está siendo evaluado y que responderá por escrito.",
    headings: {
      understand: "Qué decide realmente un reclamo por accidente de auto.",
      issues: "Dónde suelen discutirse estos choques.",
      value: "Qué puede cubrir un reclamo por choque.",
      insurance: "¿Qué póliza paga después de una colisión?",
    },
    evidenceItems: ["Fotos del lugar y de los vehículos", "Reporte policial o de colisión", "Testigos, video y datos del vehículo", "Tratamiento, facturas, pérdida salarial y cartas del seguro"],
    damages: ["Tratamiento médico, incluida la atención que todavía necesitará", "Salarios perdidos y capacidad de ingresos si la lesión persiste", "Dolor y actividades de la vida diaria que perdió", "El vehículo, cuando forma parte del reclamo"],
    deadlineNote: "Para muchas demandas por lesiones personales en California, el plazo general es de dos años desde la lesión. Los reclamos contra una entidad pública pueden exigir un reclamo administrativo mucho antes y otras excepciones pueden cambiar el plazo. Lo más seguro es identificar el plazo aplicable según los hechos reales del caso.",
    guideTitles: {
      "what-to-do-after-a-car-accident-in-california": "Qué hacer después de un accidente de auto en California",
      "california-comparative-fault-personal-injury": "Cómo funciona la culpa comparativa en California",
      "california-personal-injury-deadlines": "Plazos de lesiones personales en California",
    },
  },
  "truck-accidents": {
    fromAttorney: "Las compañías de transporte no esperan. Pueden tener personas revisando el choque el mismo día, incluso antes de mover los vehículos. Si alguien llama semanas después, ciertos registros o videos ya pueden estar fuera de su período de conservación. Por eso preservar evidencia temprano importa tanto.",
    headings: {
      understand: "Por qué un caso de camión no es un caso de auto.",
      issues: "Quién puede terminar siendo responsable de un choque de camión.",
      value: "Qué puede cubrir un reclamo comercial.",
      insurance: "Capas de cobertura detrás de un camión.",
    },
    evidenceItems: ["Registros electrónicos y tiempo de conducción", "Mantenimiento, inspecciones y archivos del vehículo", "Expediente del conductor y registros de la empresa", "Evidencia del lugar, testigos, expedientes médicos y seguro"],
    damages: ["Atención de emergencia, cirugía y rehabilitación", "Limitaciones físicas o cognitivas a largo plazo", "Ingresos perdidos ahora y capacidad de ingresos futura", "Pérdidas por muerte injusta cuando el choque es fatal"],
    deadlineNote: "Los plazos de California siguen aplicando a casos de camiones comerciales, pero el reloj práctico de la evidencia puede ser mucho más corto. Registros electrónicos, video a bordo, despacho, inspecciones y materiales de la empresa pueden conservarse por períodos distintos, por lo que la preservación no debe esperar al plazo de litigio.",
    guideTitles: {
      "truck-accident-evidence-eld-records-california": "Evidencia en accidentes de camión: ELD y registros de empresa",
      "california-personal-injury-deadlines": "Plazos de lesiones personales en California",
    },
  },
  "motorcycle-accidents": {
    fromAttorney: "Los ajustadores a veces empiezan suponiendo que el motociclista iba demasiado rápido. A veces tienen razón, pero otras veces es una suposición que nadie ha probado. La posición en el carril, las líneas de visión y dónde terminaron los vehículos suelen decidir esa discusión.",
    headings: {
      understand: "A qué se enfrenta realmente un motociclista.",
      issues: "Las discusiones que aparecen con frecuencia.",
      value: "Qué puede cubrir el reclamo de un motociclista.",
      insurance: "Cobertura cuando un motociclista es golpeado.",
    },
    evidenceItems: ["Fotos de la vía, carriles e intersección", "Testigos y cámaras", "Daños del vehículo y punto de impacto", "Tratamiento médico y limitaciones funcionales"],
    damages: ["Atención ortopédica, cirugía y rehabilitación", "Cicatrices y pérdida permanente de movilidad", "Tratamiento futuro", "Ingresos perdidos y menor capacidad para conducir o trabajar"],
    deadlineNote: "Para muchas demandas por lesiones en California, el plazo general es de dos años desde la lesión, aunque algunos asuntos tienen reglas más cortas. Estos casos también se benefician de preservar temprano video, condiciones de la vía, daños, testigos y equipo del motociclista.",
    guideTitles: {
      "california-comparative-fault-personal-injury": "Cómo funciona la culpa comparativa en California",
      "how-much-is-my-personal-injury-case-worth-california": "¿Cuánto vale un caso de lesiones personales en California?",
      "california-personal-injury-deadlines": "Plazos de lesiones personales en California",
    },
  },
  "pedestrian-accidents": {
    fromAttorney: "Estos casos muchas veces dependen del punto exacto del impacto, y ese detalle suele quedar mal documentado en la escena. Unos pocos pies pueden cambiar si la persona estaba dentro del cruce peatonal. Una buena foto del pavimento puede valer más que varios recuerdos un mes después.",
    headings: {
      understand: "Qué importa cuando un vehículo golpea a una persona.",
      issues: "Dónde se discuten los reclamos de peatones.",
      value: "Qué puede cubrir un reclamo de peatón.",
      insurance: "Quién paga cuando un conductor golpea a un peatón.",
    },
    evidenceItems: ["Cruce peatonal, señales y condiciones de la vía", "Video de vigilancia y cámaras de vehículos", "Datos de testigos y declaraciones del conductor", "Expedientes médicos, atención futura y pérdida laboral"],
    damages: ["Tratamiento médico de emergencia y a largo plazo", "Rehabilitación, apoyo de movilidad y atención futura", "Salarios perdidos y menor capacidad futura de ingresos", "Dolor, pérdida de independencia y limitaciones diarias"],
    deadlineNote: "El plazo general de California para muchas demandas por lesiones es de dos años, pero algunos reclamos tienen requisitos más cortos. Los casos de peatones también pueden depender de evidencia que desaparece rápido, especialmente video, información de señales e intersecciones y memoria de testigos.",
    guideTitles: {
      "california-comparative-fault-personal-injury": "Cómo funciona la culpa comparativa en California",
      "california-personal-injury-deadlines": "Plazos de lesiones personales en California",
    },
  },
  "rideshare-accidents": {
    fromAttorney: "Guarde una captura de su viaje antes de hacer cualquier otra cosa. Puede sonar extraño después de un choque, pero muchas disputas de Uber o Lyft terminan dependiendo de lo que mostraba la aplicación en el momento del impacto. Si nadie lo guarda, luego puede ser más difícil demostrarlo.",
    headings: {
      understand: "La pregunta que solo tienen los casos de rideshare.",
      issues: "Dónde se atascan los reclamos de Uber y Lyft.",
      value: "Qué puede cubrir un reclamo de rideshare.",
      insurance: "El estado de la aplicación puede decidir la cobertura.",
    },
    evidenceItems: ["Capturas del viaje y estado de la aplicación", "Información del conductor y de los vehículos", "Fotos, reportes, testigos y video", "Tratamiento, gastos, salarios perdidos y cartas del seguro"],
    damages: ["Tratamiento médico y atención futura", "Salarios perdidos y menor capacidad de ingresos", "Dolor, limitaciones y alteración de la vida diaria", "Otras pérdidas económicas del accidente respaldadas por registros"],
    deadlineNote: "Los plazos de lesiones de California siguen aplicando, pero un caso de rideshare tiene otra cuestión sensible al tiempo: preservar el viaje y el estado de la aplicación. Capturas, recibos, información del conductor y estado del viaje pueden ayudar a identificar qué capa de seguro debe revisarse.",
    guideTitles: {
      "uber-lyft-accident-insurance-california": "Seguro en accidentes de Uber y Lyft en California",
      "california-comparative-fault-personal-injury": "Cómo funciona la culpa comparativa en California",
      "how-much-is-my-personal-injury-case-worth-california": "¿Cuánto vale un caso de lesiones personales en California?",
    },
  },
  "slip-and-fall": {
    fromAttorney: "El peligro puede desaparecer en una hora. El reporte del incidente puede describirlo desde la perspectiva del negocio y, para cuando alguien revisa el caso, el piso ya está limpio o reparado. La foto que toma antes de que cambien la escena puede terminar siendo una de las pruebas más importantes.",
    headings: {
      understand: "Por qué un reclamo de caída no se trata solo de caer.",
      issues: "Qué suelen discutir los propietarios.",
      value: "Qué puede cubrir un reclamo de responsabilidad de propiedad.",
      insurance: "¿Quién controlaba el lugar donde cayó?",
    },
    evidenceItems: ["Fotos del peligro y del área", "Reporte del incidente y testigos", "Video de vigilancia y registros de inspección", "Tratamiento médico, gastos y pérdida laboral"],
    damages: ["Tratamiento médico y rehabilitación", "Pérdida de ingresos y limitaciones laborales", "Atención futura o restricciones permanentes de movilidad", "Dolor, limitaciones de actividad y otros daños respaldados"],
    deadlineNote: "Muchas demandas por lesiones en California tienen un plazo general de dos años, pero los reclamos de propiedad pueden perder evidencia mucho antes. Un derrame puede limpiarse, un defecto repararse y un video sobrescribirse mucho antes de que llegue el plazo de presentar una demanda.",
    guideTitles: {
      "california-comparative-fault-personal-injury": "Cómo funciona la culpa comparativa en California",
      "california-personal-injury-deadlines": "Plazos de lesiones personales en California",
    },
  },
  "wrongful-death": {
    fromAttorney: "Las familias a veces se sienten incómodas al preguntar sobre dinero. No deberían. Los plazos siguen corriendo y también existe la pregunta de quién puede presentar legalmente el reclamo. Alguien tiene que hacer esas preguntas temprano, aunque sean difíciles.",
    headings: {
      understand: "Lo primero que enfrenta una familia.",
      issues: "Qué debe establecerse.",
      value: "Qué puede cubrir un reclamo por muerte injusta.",
      insurance: "Encontrar la cobertura detrás de una muerte.",
    },
    evidenceItems: ["Evidencia de responsabilidad del accidente", "Registros médicos y de fallecimiento", "Seguro y partes potencialmente responsables", "Apoyo financiero, aportes al hogar y relaciones familiares"],
    damages: ["Pérdida de apoyo financiero y aportes al hogar", "Gastos funerarios y de entierro cuando sean recuperables", "Pérdida de compañía, cuidado y orientación", "Otras pérdidas permitidas por la ley de California según la relación y los hechos"],
    deadlineNote: "Los plazos de muerte injusta dependen de los hechos, los demandados y la ley aplicable. La ley de California identifica quién puede presentar la acción y pueden existir reglas distintas para una demanda o un reclamo previo contra una entidad pública. El plazo debe revisarse según la fecha y las partes específicas.",
    guideTitles: {
      "california-personal-injury-deadlines": "Plazos de lesiones personales en California",
    },
  },
  "serious-injuries": {
    fromAttorney: "Un error común es resolver el caso mientras la persona todavía se está recuperando. Puede sentirse responsable cerrar el asunto, pero la cifra tiene que considerar una cirugía o atención que quizá se necesite años después. Eso no puede evaluarse bien mientras el tratamiento todavía está en desarrollo.",
    headings: {
      understand: "Por qué estos reclamos necesitan una visión más larga.",
      issues: "Qué plantea una lesión a largo plazo.",
      value: "Qué puede cubrir un reclamo por lesión grave.",
      insurance: "Cuando una sola póliza no es suficiente.",
    },
    evidenceItems: ["Expedientes médicos, imágenes y opiniones de especialistas", "Rehabilitación, restricciones y dispositivos de apoyo", "Pérdida laboral y capacidad futura de ingresos", "Evidencia de cambios en movilidad, independencia y vida diaria"],
    damages: ["Tratamiento médico pasado y futuro", "Rehabilitación, asistencia y equipos de apoyo", "Pérdida de ingresos y menor capacidad futura de ganar", "Dolor, limitaciones y pérdida de independencia"],
    deadlineNote: "Las lesiones graves pueden requerir tiempo para entender el pronóstico, pero eso no detiene los plazos legales. También puede ser importante preservar temprano evidencia del accidente, identificar cobertura disponible y documentar cambios en trabajo, movilidad y vida diaria mientras ocurren.",
    guideTitles: {
      "how-much-is-my-personal-injury-case-worth-california": "¿Cuánto vale un caso de lesiones personales en California?",
      "california-personal-injury-deadlines": "Plazos de lesiones personales en California",
    },
  },
};
