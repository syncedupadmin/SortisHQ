"use client";

import { useEffect } from "react";
import Link from "next/link";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackgroundGlows as BG4 } from "@/components/background-glows-4";
import { Button } from "@/components/ui/button";
import { captureUTMParams } from "@/lib/utm";
import { ArrowRight, CheckCircle2, Users, TrendingUp, Clock } from "lucide-react";

export default function ACAMarketplaceLeadsPage() {
  useEffect(() => {
    captureUTMParams();
  }, []);

  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-teal" />,
      title: "ACA Marketplace & Private Plans",
      description:
        "Access high-intent shoppers comparing Bronze, Silver, Gold, and Platinum ACA plans. Target subsidy-eligible households and private insurance seekers.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-azure" />,
      title: "U65 Lead Pipeline (Ages 18-64)",
      description:
        "Capture individuals and families under 65 seeking coverage. Predictive scoring based on subsidy eligibility, life events, and plan comparison behavior.",
    },
    {
      icon: <Clock className="h-8 w-8 text-soft" />,
      title: "Open Enrollment Optimized",
      description:
        "Surge capacity during ACA Open Enrollment (Nov 1 - Jan 15) with real-time lead scoring and priority routing for your agents. SEP support year-round.",
    },
  ];

  const stats = [
    { value: "42%", label: "Lower Cost Per Lead" },
    { value: "185%", label: "Enrollment Growth" },
    { value: "31%", label: "Higher Application Completion" },
  ];

  return (
    <>
      <BG4 />
      <NavBar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 font-playfair">
              ACA Marketplace Leads That <span className="text-teal">Enroll</span>
            </h1>
            <p className="text-xl text-muted-gray max-w-3xl mx-auto mb-8">
              Predictive lead generation for ACA marketplace plans, individual coverage, and family
              policies. Connect with subsidy-eligible shoppers ages 18-64 during Open Enrollment and
              year-round SEPs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="glow-teal">
                <Link href="/start">
                  Get ACA Marketplace Leads
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/proof">See Agency Results</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 py-12 border-y border-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-teal mb-2">{stat.value}</div>
                <div className="text-sm text-muted-gray">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 font-playfair">
              Why Agencies Choose Our ACA Marketplace Leads
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg bg-card-bg border border-white/10 hover:border-teal/50 transition-colors text-center md:text-left"
                >
                  <div className="mb-4 flex justify-center md:justify-start">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-gray">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-teal/10 to-azure/10 rounded-lg p-12 border border-white/10">
            <h2 className="text-3xl font-bold mb-4 font-playfair">
              Ready to Scale Your ACA Book of Business?
            </h2>
            <p className="text-xl text-muted-gray mb-8 max-w-2xl mx-auto">
              Join top health insurance agencies using SortisIQ to capture more Open Enrollment
              signups and build sustainable year-round growth with SEP leads.
            </p>
            <Button asChild size="lg" className="glow-teal">
              <Link href="/start">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "ACA Marketplace Lead Generation",
            name: "ACA Marketplace Leads for Insurance Agents",
            description:
              "High-quality ACA marketplace leads, individual health insurance leads, and family coverage leads for insurance agencies serving the U65 market.",
            provider: {
              "@type": "Organization",
              name: "SortisIQ",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
            },
            areaServed: {
              "@type": "Country",
              name: "United States",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "ACA Marketplace Lead Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "ACA Marketplace Plan Leads",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Individual Health Insurance Leads",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Family Health Insurance Leads",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Special Enrollment Period (SEP) Leads",
                  },
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}
