"use client";

import { useEffect, useState } from "react";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { BackgroundGlows as BG1 } from "@/components/background-glows-1";
import { BackgroundGlows as BG2 } from "@/components/background-glows-2";
import { BackgroundGlows as BG3 } from "@/components/background-glows-3";
import { BackgroundGlows as BG4 } from "@/components/background-glows-4";
import { captureUTMParams } from "@/lib/utm";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [variant, setVariant] = useState(1);

  useEffect(() => {
    captureUTMParams();
  }, []);

  const variants = [
    { id: 1, name: "Enhanced Bokeh", description: "Logo Match" },
    { id: 2, name: "Animated Particles", description: "Interactive Grid" },
    { id: 3, name: "Gradient Mesh", description: "Fluid Motion" },
    { id: 4, name: "Hybrid", description: "All Effects" },
  ];

  return (
    <>
      {/* Background Variants */}
      {variant === 1 && <BG1 />}
      {variant === 2 && <BG2 />}
      {variant === 3 && <BG3 />}
      {variant === 4 && <BG4 />}

      {/* Background Control Panel */}
      <div className="fixed bottom-8 right-8 z-50 glass rounded-lg border border-white/20 p-4 shadow-xl">
        <div className="text-sm font-medium mb-3 text-center">Background Variant</div>
        <div className="flex gap-2 mb-3">
          {variants.map((v) => (
            <Button
              key={v.id}
              onClick={() => setVariant(v.id)}
              variant={variant === v.id ? "default" : "outline"}
              size="sm"
              className={variant === v.id ? "glow-teal" : ""}
            >
              {v.id}
            </Button>
          ))}
        </div>
        <div className="text-xs text-center">
          <div className="font-semibold text-teal">{variants[variant - 1].name}</div>
          <div className="text-muted-gray">{variants[variant - 1].description}</div>
        </div>
      </div>

      <NavBar />
      <main className="min-h-screen">
        <Hero />

        {/* Metrics Strip */}
        <section className="py-16 px-4 border-y border-white/10">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "42%", label: "Lower CPL" },
                { value: "3.2x", label: "Enrollment Growth" },
                { value: "68%", label: "Application Completion" },
                { value: "92%", label: "Agent Satisfaction" },
              ].map((metric, i) => (
                <div key={i}>
                  <div className="text-4xl font-bold text-teal mb-2">{metric.value}</div>
                  <div className="text-sm text-muted-gray">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-16 font-playfair">
              Why Top Insurance Agencies Choose <span className="text-teal">SortisIQ</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Predictive Signals",
                  description:
                    "Know which shoppers are ready to enroll before your competitors do. Our AI analyzes engagement patterns to surface high-intent health insurance prospects during AEP and SEP.",
                },
                {
                  title: "Smart Scoring",
                  description:
                    "Automated lead scoring that learns from your enrollments. Focus your agents' energy on prospects who are most likely to complete applications and stay enrolled.",
                },
                {
                  title: "Seamless Sync",
                  description:
                    "Native integrations with your insurance CRM and marketing stack. Lead data flows automatically from capture to enrollment, no manual work required.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg bg-card-bg border border-white/10 hover:border-teal/50 transition-colors"
                >
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-gray">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 px-4 bg-gradient-to-b from-transparent to-card-bg/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-4 font-playfair">
              Specialized Lead Solutions
            </h2>
            <p className="text-center text-muted-gray mb-12">
              Targeted lead generation for every insurance product line
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="/services/medicare-leads"
                className="group p-8 rounded-lg bg-card-bg border border-white/10 hover:border-teal/50 transition-all hover:scale-[1.02]"
              >
                <h3 className="text-2xl font-bold mb-3 group-hover:text-teal transition-colors">
                  Medicare Leads →
                </h3>
                <p className="text-muted-gray">
                  Medicare Advantage, Supplements, and Turning 65 leads with AEP surge support.
                </p>
              </a>
              <a
                href="/faq"
                className="group p-8 rounded-lg bg-card-bg border border-white/10 hover:border-azure/50 transition-all hover:scale-[1.02]"
              >
                <h3 className="text-2xl font-bold mb-3 group-hover:text-azure transition-colors">
                  Common Questions →
                </h3>
                <p className="text-muted-gray">
                  Learn about pricing, compliance, integrations, and our quality guarantees.
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6 font-playfair">
              Ready to Transform Your Book of Business?
            </h2>
            <p className="text-xl text-muted-gray mb-8">
              Join top insurance agencies who&apos;ve accelerated enrollment growth with SortisIQ.
            </p>
            <a
              href="/start"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-teal text-ink px-8 py-4 hover:bg-teal/90 transition-colors glow-teal"
            >
              Book Your Demo
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
