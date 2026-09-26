import { practiceAreas, serviceLocations } from "@/data/injurySite";

export const esPractice: Record<string, {
  title: string;
  description: string;
  intro: string;
  issues: string[];
}> = {
  "car-accidents": {
    title: "Accidentes de Auto",
    description: "Representación en reclamos por lesiones después de choques en Buena Park, incluyendo responsabilidad, seguro, tratamiento médico y pérdida de ingresos.",
    intro: "Después de un choque suelen aparecer varios problemas a la vez: lesiones, daños al vehículo, tiempo perdido en el trabajo y llamadas de las aseguradoras. Un reclamo sólido empieza por documentar cómo ocurrió el accidente, qué coberturas aplican y cómo las lesiones afectan su vida.",
    issues: ["Choques por alcance e intersecciones", "Atropello y fuga y conductores sin seguro", "Disputas sobre responsabilidad", "Gastos médicos, pérdida de ingresos y atención futura"],
  },
  "truck-accidents": {
    title: "Accidentes de Camión",
    description: "Reclamos por lesiones causadas por camiones comerciales y vehículos de empresa, con posibles responsabilidades de conductores, transportistas y otras compañías.",
    intro: "Un accidente de camión puede involucrar al conductor, la empresa transportista, propietarios, contratistas, mantenimiento y varias pólizas de seguro. Preservar temprano los registros electrónicos y empresariales puede ser crucial.",
    issues: ["Camiones comerciales y flotas", "Responsabilidad del conductor y la empresa", "Registros electrónicos y de mantenimiento", "Lesiones graves o fatales"],
  },
  "motorcycle-accidents": {
    title: "Accidentes de Motocicleta",
    description: "Ayuda para motociclistas lesionados en choques donde pueden discutirse visibilidad, posición en el carril, derecho de paso y cobertura de seguro.",
    intro: "Los motociclistas pueden sufrir lesiones severas incluso cuando el otro vehículo muestra poco daño. La posición de los vehículos, la visibilidad, el movimiento de carriles, el estado de la vía y la evidencia médica suelen ser determinantes.",
    issues: ["Giros, cambios de carril e incorporaciones", "Visibilidad y derecho de paso", "Lesiones de cabeza, columna y ortopédicas", "Cobertura de seguro y responsabilidad disputada"],
  },
  "pedestrian-accidents": {
    title: "Accidentes de Peatones",
    description: "Reclamos por lesiones de peatones en cruces, intersecciones, estacionamientos, entradas y accidentes de atropello y fuga.",
    intro: "Cuando un vehículo golpea a un peatón, la ubicación exacta, las señales, la iluminación, la velocidad, los testigos, el video disponible y la documentación médica pueden ser decisivos.",
    issues: ["Cruces peatonales e intersecciones", "Estacionamientos y entradas", "Atropello y fuga", "Lesiones graves y de larga duración"],
  },
  "rideshare-accidents": {
    title: "Accidentes de Uber y Lyft",
    description: "Reclamos relacionados con Uber, Lyft y otros servicios de transporte por aplicación, incluyendo el estado de la app y las distintas capas de seguro.",
    intro: "En un choque de Uber o Lyft importa qué estaba haciendo el conductor en la aplicación en el momento del accidente. El estado del viaje puede cambiar qué cobertura corresponde y qué registros deben preservarse.",
    issues: ["Pasajeros lesionados", "Conductores conectados a la aplicación", "Coberturas de seguro superpuestas", "Registros del viaje y estado de la app"],
  },
  "slip-and-fall": {
    title: "Resbalones y Caídas",
    description: "Reclamos por lesiones causadas por condiciones peligrosas en tiendas, negocios, propiedades y otros espacios.",
    intro: "En una caída, la condición peligrosa puede limpiarse o repararse rápidamente. Fotografías, video, reportes del incidente, testigos y registros de inspección pueden ayudar a demostrar qué existía y por cuánto tiempo.",
    issues: ["Pisos mojados y derrames", "Superficies y escaleras peligrosas", "Iluminación o mantenimiento deficientes", "Video, reportes y evidencia de aviso"],
  },
  "wrongful-death": {
    title: "Muerte Injusta",
    description: "Orientación para familias que enfrentan una muerte causada por un accidente y necesitan entender responsabilidad, plazos y posibles reclamos.",
    intro: "Los casos de muerte injusta requieren revisar quién puede presentar el reclamo, qué ocurrió, qué seguro existe y qué pérdidas reconoce la ley de California. Los plazos deben revisarse pronto.",
    issues: ["Accidentes fatales", "Quién puede presentar el reclamo", "Pérdida de apoyo y compañía", "Seguros, evidencia y plazos"],
  },
  "serious-injuries": {
    title: "Lesiones Graves",
    description: "Reclamos por lesiones graves o permanentes que pueden requerir cirugía, rehabilitación, atención futura o cambios importantes en la vida diaria.",
    intro: "Una lesión grave se evalúa por mucho más que las facturas iniciales. El tratamiento futuro, la capacidad de trabajar, las limitaciones permanentes y el efecto cotidiano deben estar bien documentados.",
    issues: ["Lesiones cerebrales y de columna", "Cirugía y rehabilitación", "Discapacidad o limitaciones permanentes", "Atención futura y pérdida de capacidad laboral"],
  },
};

export const esLocations: Record<string, {
  name: string;
  description: string;
}> = {
  "buena-park": { name: "Buena Park", description: "Guía local para accidentes y lesiones en Buena Park, con recursos, datos de colisiones, evidencia y plazos de California." },
  "anaheim": { name: "Anaheim", description: "Información para reclamos por lesiones ocurridas en Anaheim, incluyendo registros locales, seguros y evidencia." },
  "fullerton": { name: "Fullerton", description: "Guía para accidentes y reclamos por lesiones en Fullerton y el norte del Condado de Orange." },
  "garden-grove": { name: "Garden Grove", description: "Información local para personas lesionadas en accidentes en Garden Grove." },
  "cypress": { name: "Cypress", description: "Recursos y orientación para accidentes y lesiones en Cypress, California." },
  "la-habra": { name: "La Habra", description: "Guía local sobre accidentes, evidencia, seguro y reclamos por lesiones en La Habra." },
  "la-mirada": { name: "La Mirada", description: "Información para accidentes y lesiones en La Mirada, incluyendo consideraciones del Condado de Los Ángeles." },
  "cerritos": { name: "Cerritos", description: "Recursos para reclamos por lesiones y accidentes en Cerritos y comunidades cercanas." },
  "norwalk": { name: "Norwalk", description: "Guía local para accidentes, registros y reclamos por lesiones en Norwalk." },
  "whittier": { name: "Whittier", description: "Información práctica para accidentes y lesiones en Whittier, California." },
};

export const esNav = {
  practice: "Áreas de práctica",
  locations: "Ubicaciones",
  attorney: "Abogado",
  results: "Resultados",
  blogs: "Guías",
  about: "Acerca del bufete",
  contact: "Contacto",
};

export const getEsPractice = (slug: string) => {
  const source = practiceAreas.find((item) => item.slug === slug);
  const translation = esPractice[slug];
  return source && translation ? { ...source, ...translation } : undefined;
};

export const getEsLocation = (slug: string) => {
  const source = serviceLocations.find((item) => item.slug === slug);
  const translation = esLocations[slug];
  return source && translation ? { ...source, ...translation } : undefined;
};
