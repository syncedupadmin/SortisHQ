"use client";

import { useEffect } from "react";
import Link from "next/link";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackgroundGlows as BG4 } from "@/components/background-glows-4";
import { Button } from "@/components/ui/button";
import { captureUTMParams } from "@/lib/utm";
import { ArrowRight, CheckCircle2, Users, TrendingUp, Clock } from "lucide-react";

export default function MedicareLeadsPage() {
  useEffect(() => {
    captureUTMParams();
  }, []);

  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-teal" />,
      title: "Medicare Advantage & Supplement Leads",
      description:
        "Access high-intent shoppers comparing MA plans and Medigap policies during critical decision windows.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-azure" />,
      title: "Turning 65 Lead Pipeline",
      description:
        "Capture prospects entering Medicare eligibility with predictive scoring based on age and enrollment timing.",
    },
    {
      icon: <Clock className="h-8 w-8 text-soft" />,
      title: "AEP-Optimized Delivery",
      description:
        "Surge capacity during Annual Enrollment Period with real-time lead scoring and priority routing to your agents.",
    },
  ];

  const features = [
    "Real-time lead scoring for enrollment probability",
    "Intent signals: plan comparison activity, subsidy eligibility checks",
    "Automated CRM sync with AgencyBloc, EZLynx, and major platforms",
    "Compliance-ready consent tracking (CMS one-to-one requirements)",
    "Geographic targeting for state-specific Medicare rules",
    "AEP surge support with priority lead routing",
    "Turning 65 birthday-based targeting campaigns",
    "Medigap vs. MA preference detection",
  ];

  const stats = [
    { value: "42%", label: "Lower Cost Per Lead" },
    { value: "185%", label: "Enrollment Growth" },
    { value: "31%", label: "Higher Show-Up Rate" },
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
              Medicare Leads That <span className="text-teal">Enroll</span>
            </h1>
            <p className="text-xl text-muted-gray max-w-3xl mx-auto mb-8">
              Predictive lead generation for Medicare Advantage, Medicare Supplements, and Turning
              65 campaigns. Connect with ready-to-enroll shoppers during AEP and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="glow-teal">
                <Link href="/start">
                  Get Medicare Leads
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
              Why Agencies Choose Our Medicare Leads
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg bg-card-bg border border-white/10 hover:border-teal/50 transition-colors"
                >
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-gray">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features List */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 font-playfair">
              What&apos;s Included
            </h2>
            <div className="bg-card-bg border border-white/10 rounded-lg p-8 max-w-3xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal flex-shrink-0 mt-0.5" />
                    <span className="text-muted-gray">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-teal/10 to-azure/10 rounded-lg p-12 border border-white/10">
            <h2 className="text-3xl font-bold mb-4 font-playfair">
              Ready to Scale Your Medicare Book?
            </h2>
            <p className="text-xl text-muted-gray mb-8 max-w-2xl mx-auto">
              Join top Medicare agencies using SortisIQ to capture more AEP enrollments and build
              sustainable year-round growth.
            </p>
            <Button asChild size="lg" className="glow-teal">
              <Link href="/start">
                Book Your Demo
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
            serviceType: "Medicare Lead Generation",
            name: "Medicare Leads for Insurance Agents",
            description:
              "High-quality Medicare Advantage, Medicare Supplement, and Turning 65 leads for insurance agencies.",
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
              name: "Medicare Lead Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Medicare Advantage Leads",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Medicare Supplement (Medigap) Leads",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Turning 65 Medicare Leads",
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
