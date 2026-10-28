import type { EnglishPracticeGuide } from "./englishPracticeGuides";

/**
 * Spanish translations corresponding to every English case-guide summary
 * and each of the four case-specific topics, in identical order.
 * California counsel/language review required when substantive law changes.
 */
export const spanishPracticeGuides: Record<string, EnglishPracticeGuide> = {
  "car-accidents": {
    title: "Cómo se investiga un reclamo por accidente de auto en Buena Park",
    summary: "La investigación no termina con determinar a quién le pusieron una multa. Hay que distinguir cómo ocurrió el choque, quién podría tener responsabilidad legal, qué pólizas pueden intervenir y cómo evolucionaron las consecuencias de la lesión.",
    topics: [
      ["Reconstruir con precisión la secuencia del choque", "Se analizan los carriles, sentidos de circulación, semáforos, velocidad de aproximación cuando pueda acreditarse, líneas de visión, posición final de los vehículos y daños físicos. En una intersección concurrida de Beach Boulevard, una fotografía amplia puede explicar mejor un giro o cambio de carril que un primer plano del parachoques. Compare imágenes, testigos y posibles grabaciones en lugar de considerar concluyente la descripción policial."],
      ["Preservar pruebas antes de reparar vehículos o perder grabaciones", "Guarde fotografías originales, datos de los vehículos, presupuestos de reparación, archivos de cámaras de tablero, grúas, contactos de testigos y la ubicación de cámaras comerciales cercanas. Antes de reparar o desechar un vehículo, considere si es necesario documentar su estado o información electrónica. Conserve toda la correspondencia con aseguradoras, el número del reporte y las cuestiones todavía sin resolver."],
      ["Identificar todas las coberturas potencialmente aplicables", "La póliza del conductor responsable es solo un punto de partida. Dependiendo de los hechos, puede ser necesario revisar seguros del propietario, empleador, vehículo comercial, servicio de viajes por aplicación o cobertura propia para conductores sin seguro o con seguro insuficiente. Revise las declaraciones de póliza y cartas de cobertura, no solo la expresión ‘cobertura completa’. La disponibilidad de seguro y el valor de los daños acreditados son cuestiones distintas."],
      ["Vincular el tratamiento y los ingresos perdidos con el accidente", "Organice cronológicamente los primeros síntomas, consultas, derivaciones, restricciones laborales, turnos perdidos y rehabilitación. Distinga las condiciones preexistentes de los cambios posteriores al choque y de los tratamientos realmente recomendados por profesionales. Los gastos futuros o la pérdida de capacidad de ingresos requieren fundamento médico o económico; no pueden deducirse solo del daño del vehículo."],
    ],
  },
  "truck-accidents": {
    title: "Cuatro investigaciones dentro de un reclamo por accidente de camión",
    summary: "Un accidente con tractocamión, furgoneta de reparto o flota comercial puede implicar más registros y posibles responsables que uno entre vehículos particulares. Los documentos necesarios dependen del vehículo, transportista y función del conductor.",
    topics: [
      ["Determinar quién controlaba al conductor y el equipo", "Identifique al transportista y sus registros, propietarios del tractor y remolque, relaciones laborales o contractuales, participantes del envío y entrega y encargados del mantenimiento. El nombre impreso en un camión no significa necesariamente que esa sea la única empresa responsable. Primero deben verificarse las identidades y funciones del vehículo y las compañías."],
      ["Preservar registros operativos y electrónicos", "Pueden importar los dispositivos electrónicos de registro (ELD), horas de servicio, mensajes de despacho, inspecciones, mantenimiento, requisitos del conductor y video a bordo. Cada categoría puede tener un plazo y una obligación de conservación diferente. Puede ser necesario solicitar oportunamente la preservación de registros concretos; no se debe suponer que todos los transportistas guardan todo indefinidamente."],
      ["Analizar por separado la mecánica del choque", "Las fotografías del trazado vial, lugares de impacto, condiciones de la carga, marcas de neumáticos y ubicación posterior de vehículos permiten contrastar versiones. Un choque de camión no demuestra por sí mismo una infracción federal de horas de servicio: esa conclusión exige registros fiables y análisis de las normas aplicables. Los testigos, la investigación policial y otros vehículos pueden aportar pruebas distintas."],
      ["Documentar pérdidas graves y a largo plazo", "Estos accidentes pueden implicar cirugía, rehabilitación, restricciones de trabajo y atención futura compleja. Conserve opiniones de los médicos, evaluaciones funcionales realistas, comprobantes de salario e información de pólizas por separado. Responsabilidad, cuantía de daños y posibilidad real de cobro son cuestiones diferentes; una póliza comercial elevada no garantiza un resultado."],
    ],
  },
  "motorcycle-accidents": {
    title: "Pruebas decisivas en una colisión de motocicleta",
    summary: "Es necesario comprobar las pruebas materiales sin prejuicios sobre el comportamiento del motociclista. Una lesión grave puede coexistir con daños visibles relativamente pequeños en el automóvil implicado.",
    topics: [
      ["Examinar giros, carriles y visibilidad", "En giros a la izquierda, incorporaciones o cambios de carril, importan la geometría de aproximación, el tiempo, señales, marcas viales, velocidad acreditable, líneas de visión y punto del impacto. Cuando sea seguro, fotografíe la vía desde la perspectiva de cada participante. No suponga que la versión de un conductor o la posición del motociclista determina por sí sola la culpa."],
      ["Conservar equipo de protección y estado del vehículo", "Fotografíe y, cuando proceda, conserve el casco, la ropa dañada y las piezas de la motocicleta antes de repararlas. Son elementos útiles, pero una persona sin formación clínica no debe diagnosticar lesiones de cabeza a partir del estado del casco. Identifique pronto cámaras y testigos independientes porque el video puede borrarse."],
      ["Identificar seguros y personas responsables", "Pueden intervenir vehículos particulares, sus propietarios y la cobertura propia del motociclista frente a conductores sin seguro o con seguro insuficiente. Un trayecto de trabajo, vehículo comercial o conductor no identificado puede añadir otras preguntas. Revise términos y plazos de aviso de las pólizas. La culpa comparativa puede ser relevante, pero no toda maniobra es ilegal ni una evaluación inicial del asegurador es definitiva."],
      ["Registrar efectos funcionales prolongados", "Las lesiones ortopédicas, cicatrices, rehabilitación y restricciones para volver al trabajo merecen una cronología propia. Documente recomendaciones médicas reales, gastos, empleo perdido y actividades limitadas; no utilice el costo de reparación de la moto como medida del daño corporal. Las pérdidas futuras necesitan pruebas."],
    ],
  },
  "pedestrian-accidents": {
    title: "Hechos esenciales en una reclamación por atropello o lesión peatonal",
    summary: "Los casos de paso peatonal exigen reconstruir la escena con precisión. Mucho después del hecho pueden discutirse la velocidad, maniobra del vehículo, posición del peatón y señales de tráfico.",
    topics: [
      ["Identificar el punto de impacto y la secuencia de señales", "Conserve fotos de marcas de cruce, rampas de acera, flechas de carril, semáforos, iluminación, giros y obstrucciones. Determine desde dónde entró el peatón y cómo se acercaba cada vehículo. Un cruce marcado no resuelve automáticamente la responsabilidad, y la ausencia de marcas no elimina necesariamente los derechos del peatón."],
      ["Asegurar las pruebas que desaparecen más rápido", "Grabaciones de negocios, tráfico o timbres pueden sobrescribirse; también es fácil perder los datos de contacto de testigos. Anote dónde está la cámara, la hora aproximada y quién la controla. Conserve las palabras de los testigos sin inducirles una conclusión."],
      ["Investigar fugas y vehículos comerciales", "Ante un conductor que se dio a la fuga pueden importar una matrícula parcial, descripción del vehículo, restos, daños y el número del incidente. Un vehículo de empresa o viaje por aplicación introduce posibles seguros y responsables adicionales. Verifique términos de póliza antes de dar por disponible una cobertura."],
      ["Medir las pérdidas de movilidad e independencia", "La persona lesionada podría necesitar ayudas para caminar, asistencia doméstica, fisioterapia o ausentarse del empleo. Guarde recomendaciones de tratamiento, restricciones funcionales, gastos de traslado y efectos documentados en actividades cotidianas. Distinga los gastos ya sufridos de servicios futuros que aún no sean seguros."],
    ],
  },
  "rideshare-accidents": {
    title: "Evidencia de viajes por aplicación que modifica el análisis del seguro",
    summary: "En un accidente con Uber o Lyft, la misma colisión puede plantear coberturas diferentes según el estado real del conductor en la aplicación. Hay que investigar tanto el accidente vial como los detalles del viaje.",
    topics: [
      ["Conservar estado de la app y detalles del viaje", "Guarde recibos, puntos de origen y destino, identidad del conductor, vehículo, capturas originales y mensajes, sin alterar archivos. Registre la hora estimada del choque y lo que mostraba la aplicación antes y después. Estar conectado esperando, dirigirse a recoger un pasajero o llevarlo a bordo puede modificar el análisis del seguro."],
      ["Documentar por separado lo ocurrido en la vía", "La actividad de la aplicación no demuestra por sí sola la responsabilidad. Preserve fotos, testigos, reportes, semáforos, carriles y daños. Determine si el conductor de viajes por aplicación, otro automovilista o un tercero pudo contribuir al choque."],
      ["Revisar la superposición de pólizas antes de firmar", "La empresa de viajes, el seguro personal del conductor, la póliza de otro vehículo y otras fuentes pueden aplicarse en circunstancias distintas. La Comisión de Servicios Públicos de California (CPUC) publica requisitos para estas empresas, pero la cobertura concreta depende del trayecto y la póliza. Un logotipo no garantiza un límite de seguro ni una indemnización determinada."],
      ["Organizar los registros médicos y de empleo", "Feche lesiones, consultas, ausencias, recomendaciones futuras y comunicaciones con aseguradoras. Documente únicamente pérdidas respaldadas y examine cuidadosamente las autorizaciones amplias antes de firmarlas si podrían afectar a varias reclamaciones o coberturas."],
    ],
  },
  "slip-and-fall": {
    title: "Qué debe establecer una investigación de responsabilidad de propiedad",
    summary: "Una caída es un suceso; la responsabilidad por un inmueble normalmente requiere hechos sobre el peligro, quién controlaba el lugar y qué inspección o advertencia razonable correspondía.",
    topics: [
      ["Describir y conservar el peligro concreto", "Fotografíe derrames, desniveles, iluminación, obstáculos o superficies dañadas desde varias distancias sin ponerse en riesgo. Incluya carteles de advertencia, accesos y luz del entorno. Una imagen posterior a la limpieza podría no representar la condición que causó la caída."],
      ["Preguntar quién mantenía el área y qué sabía", "Un arrendatario, propietario, administrador o contratista puede controlar distintas partes de la instalación. Pueden importar inspecciones, limpieza, reportes internos, historial de reparaciones y quejas anteriores. No basta con suponer que una tienda es responsable porque alguien cayó dentro."],
      ["Preservar video, testigos y detalles físicos", "Registre hora exacta, pasillo o recorrido, personas que vieron el estado y cámaras que quizá lo grabaron. Conserve el calzado y fotos originales. Grabaciones y condiciones temporales pueden desaparecer; solicite preservar las pruebas de manera adecuada, sin suponer que cualquier persona tiene acceso a video privado."],
      ["Demostrar la lesión y sus limitaciones posteriores", "Registros clínicos, fechas de tratamiento, restricciones laborales y cambios funcionales ayudan a separar daños temporales de posibles necesidades futuras. Documente salarios perdidos y gastos directos. También es necesario examinar causalidad, deber de cuidado y posibles cuestiones de culpa comparativa."],
    ],
  },
  "wrongful-death": {
    title: "Preguntas que una familia necesita aclarar tras un fallecimiento",
    summary: "La muerte por negligencia no es simplemente una demanda por lesión más grave. La ley de California distingue quién puede reclamar, qué pérdidas pueden resarcirse y qué acciones pertenecieron a la persona antes de morir.",
    topics: [
      ["Identificar quién está autorizado a presentar la acción", "La sección 377.60 del Código de Procedimiento Civil de California define categorías de personas que podrían reunir los requisitos. Es más complejo que nombrar al pariente más cercano: matrimonio, hijos, dependientes y relaciones familiares deben evaluarse conforme a las circunstancias."],
      ["Separar la acción por muerte injusta de la de supervivencia", "Los daños por muerte injusta normalmente se refieren a pérdidas de los sobrevivientes elegibles; una acción de supervivencia se ocupa de ciertos derechos del fallecido. No son intercambiables y podrían exigir alegaciones, pruebas y trámites diferentes. Es indispensable revisar con un abogado la situación concreta de la familia."],
      ["Guardar evidencia de responsabilidad y seguros", "Preserve reportes del incidente, testigos, documentos de vehículos o trabajo, registros relativos al fallecimiento y pólizas disponibles. Los demandados comerciales o públicos pueden modificar las exigencias de investigación y aviso. La familia no debería tener que reconstruir el hecho por su cuenta mientras está de duelo."],
      ["Documentar con cuidado el apoyo y las consecuencias familiares", "Los ingresos reales, servicios del hogar, beneficios y otras ayudas económicas pueden ser relevantes, además de pérdidas de relación legalmente indemnizables. Evite ejemplos genéricos de acuerdo; prevalecen los registros y criterios legales. Una consulta debe aclarar proceso, plazos, responsables de decisiones y honorarios."],
    ],
  },
  "serious-injuries": {
    title: "Construir el expediente médico y económico de una lesión catastrófica",
    summary: "En lesiones cerebrales, medulares y otras lesiones graves, la primera factura médica casi nunca cuenta toda la historia. Una evaluación fiable relaciona pronóstico médico, cambios funcionales observados y pruebas del accidente sin exagerar su certeza.",
    topics: [
      ["Distinguir el diagnóstico de las capacidades documentadas", "Las imágenes clínicas, evaluaciones especializadas, registros de tratamiento y síntomas referidos cumplen funciones distintas. Una exploración aguda normal no excluye automáticamente una conmoción cerebral; los síntomas subjetivos tampoco demuestran por sí mismos la causalidad. Registre cambios cognitivos, de movilidad, laborales y de cuidados cotidianos con evaluaciones profesionales apropiadas."],
      ["Evaluar atención futura según recomendaciones reales", "La rehabilitación, controles especializados, tecnología de apoyo, adaptación de vivienda o asistencia personal deben basarse en opiniones médicas individualizadas. Distinga servicios recomendados de posibilidades hipotéticas. Para una lesión cerebral, anote cambios concretos de memoria, concentración y sueño con fechas, en lugar de afirmar de forma genérica que todo cambió."],
      ["Reconstruir responsabilidad y cobertura disponible", "Un daño grave no determina la culpa legal. Un choque, accidente de camión, caída u otro hecho exige investigar la conducta, el lugar, los testigos y las partes pertinentes. Las necesidades de cuidado futuro pueden hacer más importante el seguro, pero su disponibilidad y la posibilidad real de cobro deben revisarse independientemente."],
      ["Preservar ingresos y efectos en la familia", "Conserve historial laboral, pagos, restricciones, adaptaciones o cambios reales de puesto, rehabilitación y tareas que ahora realiza la familia. La pérdida acreditada de capacidad de ingresos y las necesidades de cuidado pueden importar además de los salarios ya perdidos. No afirme incapacidad permanente ni pronóstico fijo sin respaldo clínico."],
    ],
  },
};
