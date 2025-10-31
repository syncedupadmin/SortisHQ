"use client";

import { useEffect } from "react";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackgroundGlows as BG4 } from "@/components/background-glows-4";
import { captureUTMParams } from "@/lib/utm";
import { CheckCircle2, Users, Star, PhoneCall } from "lucide-react";

export default function LeadsPage() {
  useEffect(() => {
    captureUTMParams();
  }, []);

  const leadTypes = [
    {
      icon: <Star className="h-12 w-12 text-teal" />,
      title: "U65 Exclusive Leads",
      description:
        "Premium exclusive leads delivered to only your agency. First-to-contact advantage with highest conversion rates.",
      benefits: [
        "100% exclusive - no other agencies",
        "Real-time delivery within 60 seconds",
        "Highest intent scoring and qualification",
        "Priority during Open Enrollment surge",
        "Premium subsidy-eligible targeting",
      ],
    },
    {
      icon: <Users className="h-12 w-12 text-azure" />,
      title: "U65 Semi-Shared Leads",
      description:
        "High-quality leads shared with 2-3 pre-qualified agencies in non-competing territories. Balance of quality and cost-effectiveness.",
      benefits: [
        "Shared with only 2-3 agencies maximum",
        "Geographic territory protection",
        "Real-time behavioral scoring",
        "ACA marketplace compliance-ready",
        "Special Enrollment Period (SEP) year-round",
      ],
    },
    {
      icon: <PhoneCall className="h-12 w-12 text-soft-blue" />,
      title: "U65 Inbounds",
      description:
        "High intent for everything. Live transfer and inbound call leads from shoppers actively seeking coverage right now.",
      benefits: [
        "Live transfers to your agents",
        "Immediate connection with ready buyers",
        "Peak intent timing optimization",
        "Open Enrollment and SEP qualified",
        "Seamless dialer integration",
      ],
    },
  ];

  return (
    <>
      <BG4 />
      <NavBar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 font-playfair">
              Leads That <span className="text-teal">Enroll</span>
            </h1>
          </div>

          <div className="space-y-16 mb-20">
            {leadTypes.map((leadType, index) => (
              <div
                key={index}
                className="grid md:grid-cols-2 gap-12 items-center p-8 rounded-lg bg-card-bg border border-white/10 hover:border-teal/30 transition-colors"
              >
                <div>
                  {leadType.icon}
                  <h2 className="text-3xl font-bold mt-6 mb-4">{leadType.title}</h2>
                  <p className="text-lg text-muted-gray mb-6">{leadType.description}</p>
                  <ul className="space-y-3">
                    {leadType.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-teal mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-gray">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-teal/10 to-azure/10 rounded-lg p-12 border border-white/5">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-gray">
                      <div className="mb-2">
                        <strong className="text-txt">Target Market:</strong> Ages 18-64
                      </div>
                      <div className="mb-2">
                        <strong className="text-txt">Plans:</strong> Bronze, Silver, Gold, Platinum
                      </div>
                      <div className="mb-2">
                        <strong className="text-txt">Coverage:</strong> ACA Marketplace & Private
                        Plans
                      </div>
                      <div>
                        <strong className="text-txt">Timing:</strong> Open Enrollment + Year-Round
                        SEP
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center bg-gradient-to-br from-teal/10 to-azure/10 rounded-lg p-12 border border-white/10">
            <h2 className="text-3xl font-bold mb-4 font-playfair">
              Ready to Transform Your Book of Business?
            </h2>
            <p className="text-xl text-muted-gray mb-8 max-w-2xl mx-auto">
              Join top insurance agencies using SortisIQ to capture more enrollments and build
              sustainable growth.
            </p>
            <a
              href="/start"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-teal text-ink px-8 py-4 hover:bg-teal/90 transition-colors glow-teal"
            >
              Get Started
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
