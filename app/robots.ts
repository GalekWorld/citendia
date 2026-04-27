import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/servicios", "/como-funciona", "/casos-de-uso", "/precios", "/faq", "/contacto", "/legal", "/privacidad", "/cookies"],
        disallow: ["/dashboard", "/billing", "/bots", "/calls", "/clients", "/settings", "/account", "/login", "/register", "/api"]
      }
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/")
  };
}
