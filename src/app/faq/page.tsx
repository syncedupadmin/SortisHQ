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
        "We specialize in ACA Marketplace leads (Bronze, Silver, Gold, Platinum plans), individual health insurance leads, family coverage leads, and private health insurance leads for the U65 market (ages 18-64). All leads are pre-qualified with intent scoring and compliance-ready consent tracking.",
    },
    {
      question: "How does your lead scoring system work?",
      answer:
        "Our AI-powered system analyzes behavioral signals like plan comparison activity, subsidy calculator usage, enrollment timeline urgency, and qualifying life events (job loss, marriage, birth) to predict enrollment probability. Leads are scored in real-time based on subsidy eligibility, household income factors, and likelihood to complete applications.",
    },
    {
      question: "Are your leads exclusive or shared?",
      answer:
        "We offer both exclusive and semi-exclusive lead options. Exclusive leads are delivered to only one agency, while semi-exclusive leads may be shared with 2-3 pre-qualified agencies in non-competing territories. All leads include first-contact priority tracking.",
    },
    {
      question: "Do you support ACA Open Enrollment campaigns?",
      answer:
        "Yes! We provide surge capacity during ACA Open Enrollment Period (November 1 - January 15) with increased lead volume, priority routing, and real-time alerts for subsidy-eligible shoppers. We also generate Special Enrollment Period (SEP) leads year-round for qualifying life events like job loss, marriage, birth, or moving.",
    },
    {
      question: "What CRMs does SortisIQ integrate with?",
      answer:
        "We offer native integrations with AgencyBloc, EZLynx, Salesforce, HubSpot, and most major insurance CRMs. Custom integrations are available via API. Lead data syncs in real-time with automatic field mapping and status updates.",
    },
    {
      question: "How do you ensure ACA marketplace compliance?",
      answer:
        "All ACA marketplace leads follow healthcare.gov and state-based exchange consumer protection guidelines. We document explicit consent before lead delivery, maintain audit trails for all interactions, and ensure compliance with marketplace privacy requirements. We never sell leads without proper authorization.",
    },
    {
      question: "What's the typical cost per lead?",
      answer:
        "Lead costs vary by product type, exclusivity, subsidy eligibility, and geography. ACA marketplace leads typically range from $20-$60, individual health insurance leads $25-$70, and family coverage leads $35-$85. Volume discounts and Open Enrollment pricing available. Contact us for custom pricing based on your monthly volume needs.",
    },
    {
      question: "How quickly are leads delivered after generation?",
      answer:
        "Real-time leads are delivered within 60 seconds of capture via email, SMS, and CRM push. Aged leads (24-72 hours old) are available in bulk packages at discounted rates. Our platform includes lead aging filters so you can prioritize fresh prospects.",
    },
    {
      question: "What geographic areas do you cover?",
      answer:
        "We serve all 50 states with state-specific targeting based on your licensing and carrier appointments. You can filter leads by ZIP code, county, or state. We account for both Federally Facilitated Marketplace (FFM) states and state-based exchanges, ensuring leads match your local marketplace requirements.",
    },
    {
      question: "Can I target subsidy-eligible leads specifically?",
      answer:
        "Absolutely. We use behavioral signals and demographic indicators to identify subsidy-eligible prospects (138%-400% of Federal Poverty Level). Our lead filters allow you to target households most likely to qualify for Advanced Premium Tax Credits (APTC) and Cost-Sharing Reductions (CSRs).",
    },
    {
      question: "What kind of return can I expect on my lead investment?",
      answer:
        "Agencies using SortisIQ report 42% lower cost-per-enrollment, 185% enrollment growth, and 31% higher application completion rates compared to traditional lead sources. ROI depends on your conversion process, but most agencies see positive ROI within 60-90 days.",
    },
    {
      question: "Do you offer lead replacement or guarantees?",
      answer:
        "Yes. We provide lead replacement for invalid contact information, wrong demographic data, or duplicate leads within 30 days. Quality guarantees vary by lead type - contact us for specific SLA details for your product mix.",
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
              Our team is here to help. Book a demo to discuss your specific needs.
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
