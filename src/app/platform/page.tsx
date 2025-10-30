"use client";

import { useEffect } from "react";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackgroundGlows } from "@/components/background-glows";
import { captureUTMParams } from "@/lib/utm";
import { Zap, Target, RefreshCw } from "lucide-react";

export default function PlatformPage() {
  useEffect(() => {
    captureUTMParams();
  }, []);

  const features = [
    {
      icon: <Zap className="h-12 w-12 text-teal" />,
      title: "Signals",
      description:
        "Real-time behavioral signals that identify high-intent health insurance shoppers. Track plan comparison activity, AEP urgency, and enrollment readiness across all touchpoints.",
      benefits: [
        "AEP/SEP enrollment intent scoring",
        "Plan comparison behavior analysis",
        "Automated alerts for ready-to-enroll prospects",
      ],
    },
    {
      icon: <Target className="h-12 w-12 text-azure" />,
      title: "Scoring",
      description:
        "ML-powered lead scoring that learns from your enrollments. Automatically prioritize shoppers based on demographics, subsidy eligibility, and historical enrollment patterns.",
      benefits: [
        "Predictive enrollment probability",
        "Age/subsidy-based scoring models",
        "Agent performance insights by product line",
      ],
    },
    {
      icon: <RefreshCw className="h-12 w-12 text-soft" />,
      title: "Sync",
      description:
        "Seamless two-way sync with your insurance CRM and marketing tools. Lead data flows automatically from capture to enrollment, keeping your agency stack in perfect harmony.",
      benefits: [
        "Native AgencyBloc & EZLynx integration",
        "Real-time bidirectional sync",
        "Custom field mapping for carrier data",
      ],
    },
  ];

  return (
    <>
      <BackgroundGlows />
      <NavBar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 font-playfair">
              The Platform That <span className="text-teal">Enrolls</span>
            </h1>
            <p className="text-xl text-muted-gray max-w-3xl mx-auto">
              Three integrated systems working together to transform health insurance shoppers into
              enrolled clients.
            </p>
          </div>

          <div className="space-y-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="grid md:grid-cols-2 gap-12 items-center p-8 rounded-lg bg-card-bg border border-white/10"
              >
                <div>
                  {feature.icon}
                  <h2 className="text-3xl font-bold mt-6 mb-4">{feature.title}</h2>
                  <p className="text-lg text-muted-gray mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-teal mr-2">✓</span>
                        <span className="text-muted-gray">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-teal/10 to-azure/10 rounded-lg p-12 border border-white/5">
                  <div className="text-muted-gray text-center">
                    Platform visualization coming soon
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold mb-6 font-playfair">Ready to See It in Action?</h2>
            <a
              href="/start"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-teal text-ink px-8 py-4 hover:bg-teal/90 transition-colors glow-teal"
            >
              Book Your Demo
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
