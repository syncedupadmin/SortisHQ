"use client";

import { useEffect } from "react";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackgroundGlows as BG4 } from "@/components/background-glows-4";
import { captureUTMParams } from "@/lib/utm";

export default function PrivacyPolicyPage() {
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
              Privacy <span className="text-teal">Policy</span>
            </h1>
            <p className="text-xl text-muted-gray max-w-2xl mx-auto">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">1. Introduction</h2>
              <p className="text-muted-gray leading-relaxed">
                [COMPANY NAME] (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to
                protecting your privacy. This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you visit our website or use our services,
                including when you provide your phone number and consent to receive SMS messages and
                phone calls from us.
              </p>
              <p className="text-muted-gray leading-relaxed mt-4">
                <strong>Business Address:</strong> [BUSINESS ADDRESS]
                <br />
                <strong>Contact Email:</strong> [CONTACT EMAIL]
                <br />
                <strong>Contact Phone:</strong> [PHONE NUMBER]
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3 text-teal">Personal Information</h3>
              <p className="text-muted-gray leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-muted-gray space-y-2 ml-4">
                <li>Fill out forms on our website</li>
                <li>Request information about our services</li>
                <li>Opt-in to receive SMS messages or phone calls</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us directly</li>
              </ul>
              <p className="text-muted-gray leading-relaxed mt-4">This information may include:</p>
              <ul className="list-disc list-inside text-muted-gray space-y-2 ml-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number (including mobile phone number)</li>
                <li>Mailing address</li>
                <li>ZIP code</li>
                <li>Age or date of birth</li>
                <li>Insurance needs and preferences</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-teal">
                Automatically Collected Information
              </h3>
              <p className="text-muted-gray leading-relaxed">
                When you visit our website, we may automatically collect certain information about
                your device, including information about your web browser, IP address, time zone,
                and some of the cookies installed on your device. We may also collect information
                about your browsing actions and patterns.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">3. How We Use Your Information</h2>
              <p className="text-muted-gray leading-relaxed mb-4">
                We use the information we collect in the following ways:
              </p>
              <ul className="list-disc list-inside text-muted-gray space-y-2 ml-4">
                <li>To provide, operate, and maintain our services</li>
                <li>
                  To communicate with you, including sending you information about health insurance
                  products
                </li>
                <li>To send you SMS text messages and make phone calls (if you have opted in)</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To process your requests for quotes or information</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
                <li>To detect, prevent, and address fraud or security issues</li>
              </ul>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">4. SMS and Phone Communication</h2>

              <h3 className="text-xl font-semibold mb-3 text-teal">
                Consent to Receive Communications
              </h3>
              <p className="text-muted-gray leading-relaxed mb-4">
                By providing your phone number and checking the SMS consent box on our forms, you
                expressly consent to receive promotional and informational text messages and phone
                calls from [COMPANY NAME] and our authorized partners at the phone number you
                provided. This consent is not a condition of purchase.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-teal">
                Message Frequency and Charges
              </h3>
              <p className="text-muted-gray leading-relaxed mb-4">
                Message frequency may vary depending on your interactions with us and the services
                you request. Message and data rates may apply. You are responsible for any charges
                from your mobile carrier.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-teal">Opt-Out Instructions</h3>
              <p className="text-muted-gray leading-relaxed mb-4">
                You may opt out of receiving SMS messages at any time by:
              </p>
              <ul className="list-disc list-inside text-muted-gray space-y-2 ml-4 mb-4">
                <li>
                  Replying <strong>STOP</strong> to any text message you receive from us
                </li>
                <li>Sending an email to [CONTACT EMAIL] with your request to unsubscribe</li>
                <li>Calling us at [PHONE NUMBER]</li>
                <li>Sending a written request to [BUSINESS ADDRESS]</li>
              </ul>
              <p className="text-muted-gray leading-relaxed mb-4">
                After you opt out, you will receive one final confirmation message. Please allow up
                to 10 business days for your opt-out request to be fully processed.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-teal">Help Information</h3>
              <p className="text-muted-gray leading-relaxed">
                For help or more information about SMS messages, reply <strong>HELP</strong> to any
                text message or contact us at [CONTACT EMAIL] or [PHONE NUMBER].
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">5. TCPA Compliance</h2>
              <p className="text-muted-gray leading-relaxed mb-4">
                We comply with the Telephone Consumer Protection Act (TCPA) and related regulations.
                We only send SMS messages and make phone calls to individuals who have provided
                express written consent to receive such communications. Your consent is documented
                and retained in accordance with TCPA requirements.
              </p>
              <p className="text-muted-gray leading-relaxed">
                We respect your right to revoke consent at any time through the opt-out methods
                described above. We will honor all opt-out requests within 10 business days and
                recognize various forms of opt-out requests, including informal messages.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">
                6. Information Sharing and Disclosure
              </h2>
              <p className="text-muted-gray leading-relaxed mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-muted-gray space-y-2 ml-4">
                <li>
                  <strong>Insurance Agencies and Carriers:</strong> We may share your information
                  with licensed insurance agencies and carriers to provide you with quotes and
                  information about insurance products.
                </li>
                <li>
                  <strong>Service Providers:</strong> We may share your information with third-party
                  service providers who perform services on our behalf, such as SMS delivery, CRM
                  systems, and analytics.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with any merger, sale of
                  company assets, or acquisition.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our
                  rights, property, or safety.
                </li>
              </ul>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">7. Data Security</h2>
              <p className="text-muted-gray leading-relaxed">
                We implement appropriate technical and organizational security measures to protect
                your personal information. However, no method of transmission over the Internet or
                electronic storage is 100% secure. While we strive to use commercially acceptable
                means to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">8. Your Privacy Rights</h2>
              <p className="text-muted-gray leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal
                information:
              </p>
              <ul className="list-disc list-inside text-muted-gray space-y-2 ml-4">
                <li>
                  <strong>Access:</strong> Request access to the personal information we hold about
                  you
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate personal information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal information
                </li>
                <li>
                  <strong>Opt-Out:</strong> Opt out of certain uses of your information, including
                  SMS and phone communications
                </li>
                <li>
                  <strong>Data Portability:</strong> Request a copy of your personal information in
                  a portable format
                </li>
              </ul>
              <p className="text-muted-gray leading-relaxed mt-4">
                To exercise these rights, please contact us at [CONTACT EMAIL] or [PHONE NUMBER].
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">
                9. State-Specific Privacy Rights
              </h2>

              <h3 className="text-xl font-semibold mb-3 text-teal">
                California Residents (CCPA/CPRA)
              </h3>
              <p className="text-muted-gray leading-relaxed mb-4">
                If you are a California resident, you have additional rights under the California
                Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), including the
                right to know what personal information we collect, the right to delete personal
                information, and the right to opt-out of the sale or sharing of personal
                information.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-teal">Other State Privacy Laws</h3>
              <p className="text-muted-gray leading-relaxed">
                Residents of Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), and Utah (UCPA)
                may have similar rights under their respective state privacy laws. Contact us to
                exercise your rights.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">
                10. Cookies and Tracking Technologies
              </h2>
              <p className="text-muted-gray leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website
                and hold certain information. You can instruct your browser to refuse all cookies or
                to indicate when a cookie is being sent. However, if you do not accept cookies, you
                may not be able to use some portions of our website.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">11. Third-Party Links</h2>
              <p className="text-muted-gray leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for
                the privacy practices or content of these third-party sites. We encourage you to
                review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">12. Children&apos;s Privacy</h2>
              <p className="text-muted-gray leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not
                knowingly collect personal information from children under 18. If you become aware
                that a child has provided us with personal information, please contact us
                immediately.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">
                13. Changes to This Privacy Policy
              </h2>
              <p className="text-muted-gray leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page and updating the &quot;Last
                Updated&quot; date. You are advised to review this Privacy Policy periodically for
                any changes.
              </p>
            </section>

            <section className="bg-card-bg border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">14. Contact Us</h2>
              <p className="text-muted-gray leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please
                contact us:
              </p>
              <div className="text-muted-gray leading-relaxed">
                <p>
                  <strong>[COMPANY NAME]</strong>
                </p>
                <p>[BUSINESS ADDRESS]</p>
                <p>
                  Email:{" "}
                  <a href="mailto:[CONTACT EMAIL]" className="text-teal hover:underline">
                    [CONTACT EMAIL]
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a href="tel:[PHONE NUMBER]" className="text-teal hover:underline">
                    [PHONE NUMBER]
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
