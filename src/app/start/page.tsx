"use client";

import { useEffect } from "react";
import Script from "next/script";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackgroundGlows as BG4 } from "@/components/background-glows-4";
import { captureUTMParams } from "@/lib/utm";

export default function StartPage() {
  useEffect(() => {
    captureUTMParams();
  }, []);

  return (
    <>
      <BG4 />
      <NavBar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 font-playfair">
              Let&apos;s <span className="text-teal">Talk Book Growth</span>
            </h1>
            <p className="text-xl text-muted-gray">
              Get started and discover how SortisIQ can transform your health insurance agency.
            </p>
          </div>

          <div className="bg-card-bg border border-white/10 rounded-lg p-2 sm:p-4 md:p-8">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/uUcsUyoOtmiIR397sHOb"
              style={{ width: "100%", height: "762px", border: "none", borderRadius: "4px" }}
              id="inline-uUcsUyoOtmiIR397sHOb"
              data-layout='{"id":"INLINE"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Sortis Agency Form"
              data-height="762"
              data-layout-iframe-id="inline-uUcsUyoOtmiIR397sHOb"
              data-form-id="uUcsUyoOtmiIR397sHOb"
              title="Sortis Agency Form"
            />
          </div>
        </div>
      </main>
      <Footer />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </>
  );
}
