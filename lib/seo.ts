import type { Metadata } from "next";
import {
  DEFAULT_KEYWORDS,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_PHONE,
  SITE_TITLE,
  absoluteUrl
} from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords = []
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const mergedTitle = title === SITE_TITLE ? title : `${title} | ${SITE_NAME}`;

  return {
    title: mergedTitle,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    authors: [{ name: SITE_NAME, url: absoluteUrl("/") }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    alternates: {
      canonical
    },
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      url: canonical,
      siteName: SITE_NAME,
      title: mergedTitle,
      description,
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: SITE_TITLE
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: mergedTitle,
      description,
      images: [absoluteUrl("/twitter-image")]
    }
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: [...DEFAULT_KEYWORDS],
  authors: [{ name: SITE_NAME, url: absoluteUrl("/") }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: absoluteUrl("/")
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: SITE_TITLE
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/twitter-image")]
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: ["/icon.png"],
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }]
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  other: {
    "contact:email": SITE_EMAIL,
    "contact:phone_number": SITE_PHONE,
    "content-language": SITE_LANGUAGE
  }
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/citendia-logo.png"),
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    description: SITE_DESCRIPTION,
    areaServed: "España",
    knowsAbout: DEFAULT_KEYWORDS
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    inLanguage: SITE_LANGUAGE,
    description: SITE_DESCRIPTION
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Agentes de llamadas y mensajes para negocios",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/")
    },
    areaServed: {
      "@type": "Country",
      name: "España"
    },
    availableLanguage: ["es", "en"],
    description: SITE_DESCRIPTION
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    image: absoluteUrl("/citendia-logo.png"),
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    description: SITE_DESCRIPTION,
    addressCountry: "ES",
    areaServed: "España",
    priceRange: "€€"
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function faqJsonLd(
  items: Array<{
    question: string;
    answer: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
