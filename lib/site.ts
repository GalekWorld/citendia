export const SITE_NAME = "Citendia";
export const SITE_URL = "https://citendia.com";
export const SITE_DOMAIN = "citendia.com";
export const SITE_EMAIL = "info@citendia.com";
export const SITE_PHONE = "620670568";
export const SITE_LOCALE = "es_ES";
export const SITE_LANGUAGE = "es-ES";
export const SITE_DESCRIPTION =
  "Citendia automatiza llamadas, mensajes y reservas con agentes inteligentes para que tu negocio atienda clientes 24/7 y no pierda oportunidades.";

export const SITE_TITLE = "Citendia | Agentes de llamadas y mensajes para negocios";

export const DEFAULT_KEYWORDS = [
  "Citendia",
  "agentes de llamadas para negocios",
  "agente de IA para llamadas",
  "asistente virtual para citas",
  "automatizar llamadas de clientes",
  "bot para reservas",
  "centralita inteligente para negocios",
  "automatización de WhatsApp para empresas",
  "recepcionista virtual 24/7",
  "agente telefónico para peluquerías",
  "agente telefónico para clínicas",
  "agente telefónico para restaurantes",
  "agentes de mensajes para empresas",
  "IA para negocios en España"
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
