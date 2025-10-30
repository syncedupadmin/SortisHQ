import { Metadata } from "next";

/**
 * SEO Utilities Library
 * Centralized functions for generating SEO metadata and structured data
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = "SortisIQ";
const defaultTitle = "SortisIQ - Smarter Health Insurance Leads. Stronger Books.";
const defaultDescription =
  "Predictive signals and conversion playbooks that turn health insurance shoppers into enrolled clients. Transform your agency's enrollment growth with intelligent scoring.";

// ============================================
// METADATA GENERATION
// ============================================

export interface SEOConfig {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noindex?: boolean;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const { title, description, path = "/", image, keywords = [], noindex = false } = config;

  const fullTitle = title === defaultTitle ? title : `${title} | ${siteName}`;
  const url = `${siteUrl}${path}`;
  const ogImage = image || `${siteUrl}/api/og?title=${encodeURIComponent(title)}`;

  return {
    title: fullTitle,
    description,
    keywords,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    alternates: {
      canonical: url,
    },
  };
}

// ============================================
// STRUCTURED DATA (JSON-LD) SCHEMAS
// ============================================

export interface OrganizationSchemaProps {
  url?: string;
  logo?: string;
  name?: string;
  description?: string;
  sameAs?: string[];
}

export function generateOrganizationSchema(props?: OrganizationSchemaProps) {
  const {
    url = siteUrl,
    logo = `${siteUrl}/logo.jpg`,
    name = siteName,
    description = defaultDescription,
    sameAs = [],
  } = props || {};

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    sameAs,
  };
}

export interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  email?: string;
  areaServed?: string[];
}

export function generateLocalBusinessSchema(props?: LocalBusinessSchemaProps) {
  const {
    name = siteName,
    description = defaultDescription,
    url = siteUrl,
    telephone,
    email,
    areaServed = US_STATES,
  } = props || {};

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}/#organization`,
    name,
    description,
    url,
    ...(telephone && { telephone }),
    ...(email && { email }),
    priceRange: "$$",
    areaServed: areaServed.map((state) => ({
      "@type": "State",
      name: state,
    })),
  };
}

export interface ServiceSchemaProps {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string[];
  serviceType?: string;
}

export function generateServiceSchema(props: ServiceSchemaProps) {
  const {
    name,
    description,
    provider = siteName,
    areaServed = US_STATES,
    serviceType = "Insurance Lead Generation",
  } = props;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType,
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: siteUrl,
    },
    areaServed: areaServed.map((state) => ({
      "@type": "State",
      name: state,
    })),
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

export interface ArticleSchemaProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}

export function generateArticleSchema(props: ArticleSchemaProps) {
  const { title, description, author, datePublished, dateModified, image, url } = props;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.jpg`,
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    ...(image && { image }),
    url: `${siteUrl}${url}`,
  };
}

// ============================================
// CONSTANTS & DATA
// ============================================

export const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export const TARGET_KEYWORDS = {
  primary: [
    "health insurance leads",
    "Medicare leads",
    "ACA marketplace leads",
    "insurance lead generation",
  ],
  medicare: [
    "Medicare leads for agents",
    "Medicare Advantage leads",
    "Medicare supplement leads",
    "Medigap leads",
    "Medicare turning 65 leads",
    "AEP lead generation",
  ],
  aca: [
    "ACA marketplace leads",
    "Obamacare leads",
    "ACA open enrollment leads",
    "health insurance exchange leads",
    "subsidized health insurance leads",
  ],
  longTail: [
    "affordable Medicare supplement leads 2025",
    "exclusive Medicare leads",
    "real-time health insurance leads",
    "Medicare AEP lead generation strategy",
    "health insurance leads for independent agents",
  ],
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}
