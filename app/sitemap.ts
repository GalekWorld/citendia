import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const publicRoutes = [
  "/",
  "/servicios",
  "/como-funciona",
  "/casos-de-uso",
  "/precios",
  "/faq",
  "/contacto",
  "/legal",
  "/privacidad",
  "/cookies"
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7
  }));
}
