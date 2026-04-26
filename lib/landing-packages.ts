export type LandingPackage = {
  slug: string;
  name: string;
  price: string;
  price_suffix?: string | null;
  description: string;
  features: string[];
  button_label: string;
  cta_href: string;
  theme: "light" | "dark";
  badge?: string | null;
  sort_order: number;
  active: boolean;
};

export const defaultLandingPackages: LandingPackage[] = [
  {
    slug: "starter",
    name: "Starter",
    price: "199",
    price_suffix: "/mes",
    description: "Un agente de voz o chat para validar el caso de uso.",
    features: [
      "1 agente IA (voz o chat)",
      "Hasta 500 conversaciones/mes",
      "1 integracion con calendario",
      "Soporte por email",
      "Despliegue en 2 semanas"
    ],
    button_label: "Empezar ahora",
    cta_href: "#contacto",
    theme: "light",
    badge: null,
    sort_order: 1,
    active: true
  },
  {
    slug: "pro",
    name: "Pro",
    price: "599",
    price_suffix: "/mes",
    description: "Para PYMES que quieren cubrir voz, chat y WhatsApp.",
    features: [
      "Hasta 3 agentes IA",
      "Hasta 3.000 conversaciones/mes",
      "Integraciones ilimitadas (CRM, calendario, ERP)",
      "WhatsApp Business + Web + Voz",
      "Mejora continua mensual",
      "Soporte prioritario"
    ],
    button_label: "Hablar con ventas",
    cta_href: "https://api.whatsapp.com/send?text=Hola%2C%20quiero%20informacion%20sobre%20Citendia",
    theme: "dark",
    badge: "Mas popular",
    sort_order: 2,
    active: true
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    price: "Custom",
    price_suffix: null,
    description: "Volumen alto, multilingue, on-premise o requisitos especificos.",
    features: [
      "Agentes ilimitados",
      "Volumen ilimitado",
      "SLA 99,9 %",
      "Cumplimiento RGPD avanzado",
      "Manager de cuenta dedicado",
      "Onboarding y formacion"
    ],
    button_label: "Solicitar propuesta",
    cta_href: "#contacto",
    theme: "light",
    badge: null,
    sort_order: 3,
    active: true
  }
];
