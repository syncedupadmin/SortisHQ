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
    default: "SortisIQ - Smarter Leads. Stronger Books.",
    template: "%s | SortisIQ",
  },
  description:
    "Predictive signals and conversion playbooks that turn interest into revenue. Transform your lead generation with intelligent scoring and seamless CRM sync.",
  keywords: [
    "lead generation",
    "predictive analytics",
    "conversion optimization",
    "CRM integration",
    "lead scoring",
    "marketing automation",
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
    title: "SortisIQ - Smarter Leads. Stronger Books.",
    description: "Predictive signals and conversion playbooks that turn interest into revenue.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SortisIQ - Smarter Leads. Stronger Books.",
    description: "Predictive signals and conversion playbooks that turn interest into revenue.",
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
                "Predictive signals and conversion playbooks that turn interest into revenue.",
              sameAs: [],
            }),
          }}
        />
      </body>
    </html>
  );
}
