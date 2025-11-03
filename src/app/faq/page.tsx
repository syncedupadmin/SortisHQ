"use client";

import { useEffect } from "react";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackgroundGlows as BG4 } from "@/components/background-glows-4";
import { captureUTMParams } from "@/lib/utm";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
  useEffect(() => {
    captureUTMParams();
  }, []);

  const faqs = [
    {
      question: "What types of health insurance leads does SortisIQ provide?",
      answer:
        "We focus on individual health insurance leads, family coverage leads, and private health insurance leads for adults under age 65. Our leads include intent scoring and compliance-ready consent tracking.",
    },
    {
      question: "Are your leads exclusive or shared?",
      answer:
        "We offer both exclusive and semi-exclusive lead options. Exclusive leads are delivered to only one agency, while semi-exclusive leads may be shared with 2-3 pre-qualified agencies in non-competing territories. All leads include first-contact priority tracking.",
    },
    {
      question: "What CRMs does SortisIQ integrate with?",
      answer: "We integrate with Convoso, Chase, and TLD.",
    },
    {
      question: "What geographic areas do you cover?",
      answer:
        "We serve all 50 states with state-specific targeting based on your licensing and carrier appointments. You can filter leads by ZIP code, county, or state. We account for both Federally Facilitated Marketplace (FFM) states and state-based exchanges, ensuring leads match your local marketplace requirements.",
    },
    {
      question: "What kind of return can I expect on my lead investment?",
      answer:
        "Results vary by agency, but many clients see improved conversion rates and enrollment growth over time. ROI depends on your follow-up process, lead quality preferences, and market conditions. Most agencies start seeing positive results within their first few months as they optimize their approach.",
    },
  ];

  return (
    <>
      <BG4 />
      <NavBar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 font-playfair">
              Frequently Asked <span className="text-teal">Questions</span>
            </h1>
            <p className="text-xl text-muted-gray max-w-2xl mx-auto">
              Everything you need to know about SortisIQ health insurance leads
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-card-bg border border-white/10 rounded-lg hover:border-teal/30 transition-colors"
              >
                <summary className="flex justify-between items-center cursor-pointer p-6 list-none">
                  <h2 className="text-lg font-semibold pr-8">{faq.question}</h2>
                  <ChevronDown className="h-5 w-5 text-teal flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-muted-gray leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>

          <div className="text-center bg-gradient-to-br from-teal/10 to-azure/10 rounded-lg p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-gray mb-6">
              Our team is here to help. Get started to discuss your specific needs.
            </p>
            <Link
              href="/start"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-teal text-ink px-8 py-4 hover:bg-teal/90 transition-colors glow-teal"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </main>
      <Footer />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
    </>
  );
}
