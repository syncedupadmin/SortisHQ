import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SortisIQ - Smarter Health Insurance Leads. Stronger Books.",
    template: "%s | SortisIQ",
  },
  description:
    "Predictive signals and conversion playbooks that turn health insurance shoppers into enrolled clients. Transform your agency's enrollment growth with intelligent scoring and seamless CRM sync for Medicare, ACA, and all health insurance products.",
  keywords: [
    "health insurance leads",
    "Medicare leads",
    "ACA marketplace leads",
    "health insurance CRM",
    "enrollment optimization",
    "insurance agency growth",
    "AEP leads",
    "health insurance marketing",
  ],
  authors: [{ name: "SortisIQ" }],
  creator: "SortisIQ",
  publisher: "SortisIQ",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "SortisIQ",
    title: "SortisIQ - Smarter Health Insurance Leads. Stronger Books.",
    description:
      "Predictive signals and conversion playbooks that turn health insurance shoppers into enrolled clients.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SortisIQ - Smarter Health Insurance Leads. Stronger Books.",
    description:
      "Predictive signals and conversion playbooks that turn health insurance shoppers into enrolled clients.",
  },
  robots: {
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SortisIQ",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo.jpg`,
              description:
                "Predictive signals and conversion playbooks that turn health insurance shoppers into enrolled clients.",
              sameAs: [],
            }),
          }}
        />
      </body>
    </html>
  );
}
