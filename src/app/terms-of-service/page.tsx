"use client";

import { useEffect } from "react";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackgroundGlows as BG4 } from "@/components/background-glows-4";
import { captureUTMParams } from "@/lib/utm";
import Link from "next/link";

export default function TermsOfServicePage() {
  useEffect(() => {
    captureUTMParams();
  }, []);

  return (
    <>
      <BG4 />
      <NavBar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 font-playfair">
              Terms of <span className="text-teal">Service</span>
            </h1>
            <p className="text-xl text-muted-gray max-w-2xl mx-auto">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">1. Acceptance of Terms</h2>
              <p className="text-muted-gray leading-relaxed">
                By accessing or using the services provided by SORTISIQ LLC (&quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of
                Service. If you do not agree to these terms, please do not use our services.
              </p>
              <p className="text-muted-gray leading-relaxed mt-4">
                <strong>Business Address:</strong> 925 S FEDERAL HWY, STE 125, BOCA RATON, FL 33432
                <br />
                <strong>Contact Email:</strong> info@sortisiq.com
                <br />
                <strong>Contact Phone:</strong> 954-751-5519
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">2. Description of Services</h2>
              <p className="text-muted-gray leading-relaxed">
                SORTISIQ LLC provides health insurance lead generation and related services to
                insurance agencies and individual agents. Our services include lead delivery,
                predictive scoring, and marketing communications via SMS, email, and phone calls.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">
                3. SMS Marketing Terms & Conditions
              </h2>

              <h3 className="text-xl font-semibold mb-3 text-teal">Program Description</h3>
              <p className="text-muted-gray leading-relaxed mb-4">
                By opting in to our SMS program, you agree to receive promotional and informational
                text messages from SORTISIQ LLC about health insurance products, quotes, enrollment
                periods, and related services. This program allows us to send you important updates
                and offers via text message to the mobile number you provided.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-teal">
                Consent to Receive Text Messages
              </h3>
              <p className="text-muted-gray leading-relaxed mb-4">
                By providing your mobile phone number and checking the SMS consent checkbox on our
                forms, you expressly consent to receive recurring promotional and informational text
                messages from SORTISIQ LLC and our authorized partners. You understand that:
              </p>
              <ul className="list-disc list-inside text-muted-gray space-y-2 ml-4 mb-4">
                <li>Consent is not a condition of purchase or use of our services</li>
                <li>
                  You may receive messages from SORTISIQ LLC or our authorized insurance agency
                  partners
                </li>
                <li>Your consent applies to the specific mobile number you provided</li>
                <li>Standard message and data rates may apply from your carrier</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-teal">Message Frequency</h3>
              <p className="text-muted-gray leading-relaxed mb-4">
                Message frequency varies and depends on your activity and the services you request.
                You may receive up to 10 messages per month, with higher frequency during open
                enrollment periods or when you have active quote requests. We respect your time and
                aim to provide valuable information without excessive messaging.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-teal">Message and Data Rates</h3>
              <p className="text-muted-gray leading-relaxed mb-4">
                Standard message and data rates may apply according to your mobile carrier&apos;s
                plan. Message and data rates depend on your carrier and plan. You are responsible
                for all charges from your mobile carrier. We do not charge for our SMS messages, but
                your carrier may charge for receiving text messages.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-teal">
                Opt-Out / Unsubscribe Instructions
              </h3>
              <p className="text-muted-gray leading-relaxed mb-4">
                You can opt out of receiving text messages at any time. Your options include:
              </p>
              <ul className="list-disc list-inside text-muted-gray space-y-2 ml-4 mb-4">
                <li>
                  <strong>Reply STOP:</strong> Text <strong>STOP</strong>,{" "}
                  <strong>UNSUBSCRIBE</strong>,<strong>CANCEL</strong>, <strong>END</strong>, or{" "}
                  <strong>QUIT</strong> to any message you receive from us
                </li>
                <li>
                  <strong>Email:</strong> Send your opt-out request to info@sortisiq.com
                </li>
                <li>
                  <strong>Phone:</strong> Call us at 954-751-5519
                </li>
                <li>
                  <strong>Mail:</strong> Send a written request to 925 S FEDERAL HWY, STE 125, BOCA
                  RATON, FL 33432
                </li>
              </ul>
              <p className="text-muted-gray leading-relaxed mb-4">
                After you opt out, you will receive one final confirmation message acknowledging
                your unsubscribe request. Please allow up to 10 business days for your request to be
                fully processed. We also recognize informal opt-out requests such as &quot;no more
                messages,&quot; &quot;leave me alone,&quot; or similar language.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-teal">Help and Support</h3>
              <p className="text-muted-gray leading-relaxed mb-4">
                For help or more information about our SMS program:
              </p>
              <ul className="list-disc list-inside text-muted-gray space-y-2 ml-4 mb-4">
                <li>
                  Reply <strong>HELP</strong> or <strong>INFO</strong> to any text message from us
                </li>
                <li>Email us at info@sortisiq.com</li>
                <li>Call us at 954-751-5519</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-teal">Supported Carriers</h3>
              <p className="text-muted-gray leading-relaxed mb-4">
                Our SMS program is supported by major U.S. carriers including AT&T, Verizon,
                T-Mobile, Sprint, U.S. Cellular, Boost Mobile, MetroPCS, and others. If you have
                questions about your carrier&apos;s support, please contact your mobile service
                provider.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-teal">TCPA Compliance</h3>
              <p className="text-muted-gray leading-relaxed mb-4">
                We comply with the Telephone Consumer Protection Act (TCPA), the Telemarketing Sales
                Rule (TSR), and all applicable federal and state telecommunications laws. We only
                send messages to individuals who have provided express written consent. Your consent
                is documented and retained in accordance with legal requirements.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-teal">Privacy and Data</h3>
              <p className="text-muted-gray leading-relaxed">
                Your mobile number and related information will be used in accordance with our{" "}
                <Link href="/privacy-policy" className="text-teal hover:underline">
                  Privacy Policy
                </Link>
                . We do not sell or share your mobile number with unrelated third parties without
                your consent, except as required by law or as described in our Privacy Policy.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">4. Phone Call Communications</h2>
              <p className="text-muted-gray leading-relaxed mb-4">
                By providing your phone number and consenting to receive communications, you also
                agree to receive phone calls from SORTISIQ LLC and our authorized insurance agency
                partners. These calls may include:
              </p>
              <ul className="list-disc list-inside text-muted-gray space-y-2 ml-4 mb-4">
                <li>Follow-up calls regarding your quote requests</li>
                <li>Informational calls about health insurance products and enrollment periods</li>
                <li>Customer service and support calls</li>
                <li>Promotional calls about special offers and new services</li>
              </ul>
              <p className="text-muted-gray leading-relaxed">
                You may request to stop receiving calls at any time by informing us during a call,
                emailing info@sortisiq.com, or calling 954-751-5519.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">5. User Responsibilities</h2>
              <p className="text-muted-gray leading-relaxed mb-4">
                By using our services, you agree to:
              </p>
              <ul className="list-disc list-inside text-muted-gray space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the accuracy of your contact information</li>
                <li>
                  Notify us promptly of any changes to your phone number or contact information
                </li>
                <li>Ensure you have authority to provide the phone number and consent</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">6. Intellectual Property</h2>
              <p className="text-muted-gray leading-relaxed">
                All content, trademarks, logos, and intellectual property displayed on our website
                and in our communications are the property of SORTISIQ LLC or our licensors. You may
                not use, reproduce, or distribute any content without our express written
                permission.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">7. Disclaimer of Warranties</h2>
              <p className="text-muted-gray leading-relaxed mb-4">
                Our services are provided &quot;as is&quot; and &quot;as available&quot; without
                warranties of any kind, either express or implied. We do not guarantee:
              </p>
              <ul className="list-disc list-inside text-muted-gray space-y-2 ml-4">
                <li>Uninterrupted or error-free service</li>
                <li>Specific results from using our services</li>
                <li>That insurance quotes will result in policy purchases</li>
                <li>The accuracy or completeness of information provided by third parties</li>
              </ul>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">8. Limitation of Liability</h2>
              <p className="text-muted-gray leading-relaxed">
                To the fullest extent permitted by law, SORTISIQ LLC shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising out of or
                related to your use of our services. Our total liability shall not exceed the amount
                you paid for our services in the past 12 months.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">9. Indemnification</h2>
              <p className="text-muted-gray leading-relaxed">
                You agree to indemnify and hold harmless SORTISIQ LLC and its officers, directors,
                employees, and agents from any claims, damages, losses, or expenses arising from
                your use of our services or violation of these Terms of Service.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">10. Modification of Terms</h2>
              <p className="text-muted-gray leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. We will notify
                you of significant changes by posting the updated terms on our website and updating
                the &quot;Last Updated&quot; date. Your continued use of our services after changes
                constitute acceptance of the modified terms.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">11. Termination</h2>
              <p className="text-muted-gray leading-relaxed">
                We reserve the right to suspend or terminate your access to our services at any
                time, with or without notice, for any reason, including violation of these Terms of
                Service. You may terminate your relationship with us at any time by opting out of
                communications and ceasing use of our services.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">12. Governing Law</h2>
              <p className="text-muted-gray leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the
                laws of FL, without regard to its conflict of law provisions. Any disputes arising
                from these terms shall be resolved in the courts of FL.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">13. Severability</h2>
              <p className="text-muted-gray leading-relaxed">
                If any provision of these Terms of Service is found to be invalid or unenforceable,
                the remaining provisions shall continue in full force and effect.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">14. Contact Information</h2>
              <p className="text-muted-gray leading-relaxed mb-4">
                If you have any questions about these Terms of Service or our SMS program, please
                contact us:
              </p>
              <div className="text-muted-gray leading-relaxed">
                <p>
                  <strong>SORTISIQ LLC</strong>
                </p>
                <p>925 S FEDERAL HWY, STE 125, BOCA RATON, FL 33432</p>
                <p>
                  Email:{" "}
                  <a href="mailto:info@sortisiq.com" className="text-teal hover:underline">
                    info@sortisiq.com
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a href="tel:954-751-5519" className="text-teal hover:underline">
                    954-751-5519
                  </a>
                </p>
              </div>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">15. Entire Agreement</h2>
              <p className="text-muted-gray leading-relaxed">
                These Terms of Service, together with our{" "}
                <Link href="/privacy-policy" className="text-teal hover:underline">
                  Privacy Policy
                </Link>
                , constitute the entire agreement between you and SORTISIQ LLC regarding the use of
                our services.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
