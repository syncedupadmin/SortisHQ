"use client";

import { useEffect } from "react";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackgroundGlows as BG4 } from "@/components/background-glows-4";
import { captureUTMParams } from "@/lib/utm";
import { TrendingUp, Users, Calendar } from "lucide-react";

export default function ProofPage() {
  useEffect(() => {
    captureUTMParams();
  }, []);

  const caseStudies = [
    {
      company: "HealthFirst Insurance Partners",
      industry: "Individual & Family Health Plans",
      metrics: {
        cplReduction: "-22%",
        pipelineGrowth: "+68%",
        showUpRate: "+19%",
      },
      quote:
        "SortisIQ helped us identify better-quality private health insurance shoppers. Our agents are spending less time chasing and more time enrolling.",
      author: "Agency Owner",
    },
    {
      company: "HealthChoice Insurance Group",
      industry: "Individual & Family Health Plans",
      metrics: {
        cplReduction: "-25%",
        pipelineGrowth: "+74%",
        showUpRate: "+24%",
      },
      quote:
        "We've been able to filter out the window-shoppers and focus on people who actually want coverage. Our contact rate and conversion rates have both gone up noticeably.",
      author: "Director of Sales",
    },
    {
      company: "Unified Benefits Partners",
      industry: "Individual & Family Health Plans",
      metrics: {
        cplReduction: "-32%",
        pipelineGrowth: "+95%",
        showUpRate: "+31%",
      },
      quote:
        "Within a few weeks, our reps were raving about lead quality. We're writing real policies again—not just quotes. The difference in intent is night and day.",
      author: "VP of Agency Operations",
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
              Results That <span className="text-teal">Speak</span>
            </h1>
            <p className="text-xl text-muted-gray max-w-3xl mx-auto">
              Real insurance agencies, real enrollment growth. See how SortisIQ helps top agencies
              build stronger books year round.
            </p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-card-bg border border-white/10 rounded-lg p-8 hover:border-teal/30 transition-colors"
              >
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold mb-2">{study.company}</h2>
                      <p className="text-muted-gray">{study.industry}</p>
                    </div>

                    <blockquote className="text-lg mb-4 italic">
                      &ldquo;{study.quote}&rdquo;
                    </blockquote>
                    <p className="text-sm text-muted-gray">— {study.author}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-teal" />
                      <div>
                        <div className="text-2xl font-bold text-teal">
                          {study.metrics.cplReduction}
                        </div>
                        <div className="text-sm text-muted-gray">CPL Reduction</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-azure" />
                      <div>
                        <div className="text-2xl font-bold text-azure">
                          {study.metrics.pipelineGrowth}
                        </div>
                        <div className="text-sm text-muted-gray">Pipeline Growth</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-soft" />
                      <div>
                        <div className="text-2xl font-bold text-soft">
                          {study.metrics.showUpRate}
                        </div>
                        <div className="text-sm text-muted-gray">Show-up Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6 font-playfair">
              Ready to Write Your Success Story?
            </h2>
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
