"use client";

import { useEffect } from "react";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { BackgroundGlows } from "@/components/background-glows";
import { captureUTMParams } from "@/lib/utm";

export default function HomePage() {
  useEffect(() => {
    captureUTMParams();
  }, []);

  return (
    <>
      <BackgroundGlows />
      <NavBar />
      <main className="min-h-screen">
        <Hero />

        {/* Metrics Strip */}
        <section className="py-16 px-4 border-y border-white/10">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "42%", label: "Lower CPL" },
                { value: "3.2x", label: "Pipeline Growth" },
                { value: "68%", label: "Show-up Rate" },
                { value: "92%", label: "Client Satisfaction" },
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
              Why Top Firms Choose <span className="text-teal">SortisIQ</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Predictive Signals",
                  description:
                    "Know which leads are ready to convert before your competitors do. Our AI analyzes engagement patterns to surface high-intent prospects.",
                },
                {
                  title: "Smart Scoring",
                  description:
                    "Automated lead scoring that learns from your wins. Focus your team's energy on opportunities that actually close.",
                },
                {
                  title: "Seamless Sync",
                  description:
                    "Native integrations with your CRM and marketing stack. Data flows automatically, no manual work required.",
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

        {/* CTA */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6 font-playfair">
              Ready to Transform Your Pipeline?
            </h2>
            <p className="text-xl text-muted-gray mb-8">
              Join industry leaders who&apos;ve accelerated growth with SortisIQ.
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
