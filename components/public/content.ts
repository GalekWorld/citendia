export const useCases = [
  {
    key: "clinicas",
    label: "Clínicas",
    title: "Cero llamadas perdidas mientras el equipo está con pacientes.",
    description:
      "Citendia atiende llamadas entrantes, resuelve dudas frecuentes y agenda citas para clínicas, centros médicos y centros de estética en España sin depender del horario de recepción.",
    bullets: [
      "Agenda y cambios de cita con reglas por profesional",
      "Recordatorios automáticos por SMS o WhatsApp",
      "Filtro de llamadas y preguntas previas antes de la reserva"
    ]
  },
  {
    key: "restaurantes",
    label: "Restaurantes",
    title: "Reservas automáticas y atención al cliente incluso en hora punta.",
    description:
      "Para restaurantes y negocios de reservas, el agente telefónico gestiona mesas, alérgenos, horarios y cambios sin interrumpir al equipo de sala.",
    bullets: [
      "Reservas y cancelaciones 24/7",
      "Respuesta a dudas sobre carta, horarios y ubicación",
      "Gestión de picos de llamadas sin perder oportunidades"
    ]
  },
  {
    key: "peluquerias",
    label: "Peluquerías",
    title: "Citas, cambios y consultas sin cortar el ritmo del salón.",
    description:
      "Citendia funciona muy bien como agente telefónico para peluquerías y centros de belleza que reciben llamadas mientras atienden a clientes presenciales.",
    bullets: [
      "Reserva de servicios y huecos disponibles",
      "Cambios y cancelaciones de cita",
      "Información sobre precios, tiempos y tratamientos"
    ]
  },
  {
    key: "inmobiliarias",
    label: "Inmobiliarias",
    title: "Leads atendidos al momento y visitas mejor cualificadas.",
    description:
      "El agente de llamadas recoge información del lead, responde a consultas habituales y agenda visitas para inmobiliarias con volumen comercial.",
    bullets: [
      "Respuesta inmediata a interesados",
      "Precalificación antes de derivar al comercial",
      "Agenda de visitas sincronizada con el equipo"
    ]
  },
  {
    key: "talleres",
    label: "Talleres",
    title: "Más entradas al taller y menos llamadas que se quedan sin responder.",
    description:
      "Para talleres y negocios de atención telefónica continua, Citendia organiza citas, incidencias y seguimiento de clientes sin saturar al personal.",
    bullets: [
      "Recepción de citas y consultas rápidas",
      "Información sobre horarios, recogidas y disponibilidad",
      "Atención estable incluso fuera del horario comercial"
    ]
  }
] as const;

export const faqItems = [
  {
    question: "¿Qué hace exactamente Citendia?",
    answer:
      "Citendia crea agentes de llamadas y mensajes para negocios. Atienden clientes, responden dudas, gestionan citas o reservas y ayudan a no perder oportunidades cuando tu equipo no puede responder al momento."
  },
  {
    question: "¿Sirve para llamadas y también para mensajes?",
    answer:
      "Sí. Citendia está pensado para voz y mensajería. Puede atender teléfono, chat web y flujos de WhatsApp según el caso de uso del negocio."
  },
  {
    question: "¿Puede trabajar 24/7?",
    answer:
      "Sí. Uno de los principales beneficios es mantener una atención constante 24/7 para negocios que reciben llamadas y mensajes fuera de horario o en momentos de saturación."
  },
  {
    question: "¿Qué tipo de negocios suelen usar Citendia?",
    answer:
      "Trabajamos especialmente bien con peluquerías, clínicas, restaurantes, centros de estética, talleres, inmobiliarias y negocios españoles con mucha atención al cliente."
  },
  {
    question: "¿Puedo ver llamadas, minutos y previsión de pago?",
    answer:
      "Sí. Cada cliente puede acceder a su portal para revisar llamadas, minutos consumidos y el estado de su cuenta desde una vista privada."
  },
  {
    question: "¿Cómo se pone en marcha?",
    answer:
      "Primero definimos el proceso de atención, después configuramos el agente, lo conectamos con tus canales y por último revisamos resultados y ajustes."
  }
] as const;

export const benefits = [
  "No perder llamadas de clientes potenciales fuera de horario",
  "Responder mensajes y reservas sin depender del equipo humano",
  "Reducir interrupciones en negocios con mucha atención presencial",
  "Mantener una experiencia consistente para llamadas y WhatsApp",
  "Escalar atención al cliente sin montar una centralita compleja"
] as const;

export const processSteps = [
  {
    title: "Analizamos tu operación",
    text: "Definimos cómo entra una llamada, qué preguntas hay que resolver y cuándo conviene reservar, vender o derivar."
  },
  {
    title: "Entrenamos el agente",
    text: "Adaptamos tono, respuestas, horarios y procesos para que encaje con tu negocio y con cómo trabajas en España."
  },
  {
    title: "Conectamos canales",
    text: "Unimos llamadas, mensajes, reservas o citas con tus herramientas para que el agente no funcione aislado."
  },
  {
    title: "Medimos y mejoramos",
    text: "Revisamos llamadas, minutos, resultados y puntos de fricción para optimizar el rendimiento del agente."
  }
] as const;
