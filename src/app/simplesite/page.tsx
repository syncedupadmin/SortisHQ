"use client";

import { useState, useEffect, useRef } from "react";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackgroundGlows as BG4 } from "@/components/background-glows-4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Zap,
  Target,
  RefreshCw,
  Users,
  CheckCircle2,
  Calendar,
  Award,
  Shield,
  Clock,
} from "lucide-react";

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function SimpleSitePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    agency: "",
  });

  // Detect reduced motion preference for better mobile performance
  const [shouldAnimate, setShouldAnimate] = useState(() => {
    // Initialize based on media query to avoid cascading renders
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      return !mediaQuery.matches;
    }
    return true;
  });

  useEffect(() => {
    // Listen for changes to reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldAnimate(!e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Optimized viewport settings for mobile scroll performance
  const viewportSettings = {
    once: true,
    amount: 0.3 as const,
    margin: "0px 0px -100px 0px",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <BG4 />
      <NavBar />

      <main className="min-h-screen pt-24 pb-16 relative" style={{ willChange: "transform" }}>
        {/* HERO SECTION */}
        <section className="container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal via-azure to-soft-blue bg-clip-text text-transparent">
              Stop Chasing Random U65 Leads.
              <br />
              Start Enrolling Predictable Families.
            </h1>

            <p className="text-xl md:text-2xl text-muted-gray mb-4 max-w-4xl mx-auto leading-relaxed">
              AI-powered platform delivers high-intent shoppers who are ready to enroll{" "}
              <span className="text-teal font-semibold">RIGHT NOW</span> - in 60 seconds or less.
            </p>

            <p className="text-lg text-txt/80 mb-10 max-w-2xl mx-auto">
              Know who will enroll{" "}
              <span className="text-azure font-semibold">before your competitors do</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="glow-teal bg-teal hover:bg-teal/90 text-ink font-semibold text-lg px-8 py-6 rounded-lg transition-all hover:scale-105"
              >
                Get 20% Off First Month
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-teal/50 text-teal hover:bg-teal/10 text-lg px-8 py-6 rounded-lg transition-all hover:border-teal"
              >
                Call: (866) 555-LEAD
              </Button>
            </div>

            {/* Live counter animation */}
            <motion.div
              initial={shouldAnimate ? { opacity: 0 } : false}
              animate={shouldAnimate ? { opacity: 1 } : { opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-12 text-muted-gray text-sm"
            >
              <Clock className="inline-block w-4 h-4 mr-2" />
              <span className="text-teal font-semibold">247</span> leads delivered in last 24h
            </motion.div>
          </motion.div>
        </section>

        {/* 3 S FRAMEWORK SECTION */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            viewport={viewportSettings}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-txt">
              The <span className="text-teal">3 S</span> Framework
            </h2>
            <p className="text-lg text-muted-gray max-w-2xl mx-auto">
              How we deliver families that actually enroll
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* SIGNALS */}
            <motion.div
              initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
              whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              viewport={viewportSettings}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card className="bg-card-bg border border-white/10 p-8 rounded-2xl hover:border-teal/50 transition-all hover:glow-teal h-full">
                <div className="w-16 h-16 bg-teal/10 rounded-xl flex items-center justify-center mb-6 glow-teal mx-auto">
                  <Zap className="w-8 h-8 text-teal" />
                </div>
                <h3 className="font-playfair text-2xl font-bold mb-4 text-txt">SIGNALS</h3>
                <p className="text-muted-gray leading-relaxed">Real-time behavioral tracking</p>
                <p className="text-txt/80 mt-4 text-sm leading-relaxed">
                  We track behavioral signals, plan comparisons, and SEP triggers to catch shoppers
                  at peak intent
                </p>
              </Card>
            </motion.div>

            {/* SCORING */}
            <motion.div
              initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
              whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              viewport={viewportSettings}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="bg-card-bg border border-white/10 p-8 rounded-2xl hover:border-azure/50 transition-all hover:glow-azure h-full">
                <div className="w-16 h-16 bg-azure/10 rounded-xl flex items-center justify-center mb-6 glow-azure mx-auto">
                  <Target className="w-8 h-8 text-azure" />
                </div>
                <h3 className="font-playfair text-2xl font-bold mb-4 text-txt">SCORING</h3>
                <p className="text-muted-gray leading-relaxed">Predictive ML intelligence</p>
                <p className="text-txt/80 mt-4 text-sm leading-relaxed">
                  Our AI learns from YOUR enrollments to predict which families will actually sign
                  up - not just click
                </p>
              </Card>
            </motion.div>

            {/* SYNC */}
            <motion.div
              initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
              whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              viewport={viewportSettings}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="bg-card-bg border border-white/10 p-8 rounded-2xl hover:border-soft-blue/50 transition-all h-full">
                <div className="w-16 h-16 bg-soft-blue/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <RefreshCw className="w-8 h-8 text-soft-blue" />
                </div>
                <h3 className="font-playfair text-2xl font-bold mb-4 text-txt">SYNC</h3>
                <p className="text-muted-gray leading-relaxed">Instant CRM delivery</p>
                <p className="text-txt/80 mt-4 text-sm leading-relaxed">
                  60-second delivery to your CRM (AgencyBloc, EZLynx). No CSV exports. No manual
                  entry. Just ready-to-call families.
                </p>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            viewport={viewportSettings}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-12 max-w-5xl mx-auto border border-white/10"
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12 text-txt">
              Numbers That <span className="text-teal">Speak</span>
            </h2>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl md:text-6xl font-bold text-teal mb-2 font-playfair">
                  <AnimatedCounter value={42} suffix="%" />
                </div>
                <div className="text-muted-gray text-sm uppercase tracking-wide">
                  Lower Cost Per Lead
                </div>
              </div>

              <div>
                <div className="text-5xl md:text-6xl font-bold text-azure mb-2 font-playfair">
                  <AnimatedCounter value={3} suffix=".2x" />
                </div>
                <div className="text-muted-gray text-sm uppercase tracking-wide">
                  Enrollment Growth
                </div>
              </div>

              <div>
                <div className="text-5xl md:text-6xl font-bold text-soft-blue mb-2 font-playfair">
                  <AnimatedCounter value={68} suffix="%" />
                </div>
                <div className="text-muted-gray text-sm uppercase tracking-wide">
                  Application Completion
                </div>
              </div>

              <div>
                <div className="text-5xl md:text-6xl font-bold text-teal mb-2 font-playfair">
                  <AnimatedCounter value={92} suffix="%" />
                </div>
                <div className="text-muted-gray text-sm uppercase tracking-wide">
                  Agent Satisfaction
                </div>
              </div>
            </div>

            <p className="text-center text-muted-gray text-sm mt-8">
              Average results from top agencies in 2024
            </p>
          </motion.div>
        </section>

        {/* EXCLUSIVITY ADVANTAGE SECTION */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            viewport={viewportSettings}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-teal/5 to-azure/5 border border-teal/20 p-10 rounded-3xl">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-teal/20 rounded-2xl flex items-center justify-center flex-shrink-0 glow-teal">
                  <Award className="w-8 h-8 text-teal" />
                </div>
                <div>
                  <h3 className="font-playfair text-3xl font-bold mb-4 text-txt">
                    The Exclusivity Advantage
                  </h3>
                  <p className="text-lg text-txt/90 mb-4 leading-relaxed">
                    <span className="font-semibold text-teal">
                      Why shared leads are killing your ROI
                    </span>
                  </p>
                  <p className="text-muted-gray leading-relaxed">
                    When a lead is sold to{" "}
                    <span className="text-teal font-semibold">10-20 other agents</span>, you&apos;re
                    competing on price alone. With our{" "}
                    <span className="text-azure font-semibold">
                      exclusive and semi-exclusive options
                    </span>
                    , you&apos;re first (or only) to call. The math is simple: fewer competitors =
                    higher conversion rates, better relationships, and premium pricing power.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            viewport={viewportSettings}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-txt">
              Real Agencies, Real <span className="text-azure">Numbers</span>
            </h2>
            <p className="text-lg text-muted-gray">
              See what happens when you switch to predictive enrollment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <motion.div
              initial={shouldAnimate ? { opacity: 0, x: -30 } : false}
              whileInView={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
              viewport={viewportSettings}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card className="bg-card-bg border border-white/10 p-8 rounded-2xl hover:border-teal/50 transition-all h-full">
                <div className="mb-6">
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 bg-teal/10 text-teal text-xs rounded-full font-semibold">
                      185% Growth
                    </span>
                    <span className="px-3 py-1 bg-azure/10 text-azure text-xs rounded-full font-semibold">
                      42% Lower CPL
                    </span>
                  </div>
                  <p className="text-txt/90 leading-relaxed italic mb-4">
                    &quot;The ROI was evident within 60 days. We saw a massive increase in pipeline
                    and our agents love the quality.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="w-12 h-12 bg-teal/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <div className="text-txt font-semibold">Sarah M.</div>
                    <div className="text-muted-gray text-sm">Premier Medicare</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={shouldAnimate ? { opacity: 0, x: 30 } : false}
              whileInView={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
              viewport={viewportSettings}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="bg-card-bg border border-white/10 p-8 rounded-2xl hover:border-azure/50 transition-all h-full">
                <div className="mb-6">
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 bg-teal/10 text-teal text-xs rounded-full font-semibold">
                      310% Growth
                    </span>
                    <span className="px-3 py-1 bg-azure/10 text-azure text-xs rounded-full font-semibold">
                      55% Lower CPL
                    </span>
                  </div>
                  <p className="text-txt/90 leading-relaxed italic mb-4">
                    &quot;We scaled our ACA book faster than ever. The predictive scoring is a
                    game-changer for our team&apos;s efficiency.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="w-12 h-12 bg-azure/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-azure" />
                  </div>
                  <div>
                    <div className="text-txt font-semibold">Michael R.</div>
                    <div className="text-muted-gray text-sm">Unified Benefits</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* OPEN ENROLLMENT SECTION */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            viewport={viewportSettings}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-azure/10 to-soft-blue/5 border border-azure/20 p-12 rounded-3xl">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-azure/20 rounded-2xl mb-6 glow-azure">
                  <Calendar className="w-10 h-10 text-azure" />
                </div>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-txt">
                  Built for <span className="text-azure">Open Enrollment</span>
                </h2>
                <p className="text-xl text-muted-gray">When Nov 1 hits, you&apos;ll be ready</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-azure flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-txt font-semibold mb-1">Surge Capacity</div>
                    <div className="text-muted-gray text-sm">
                      Handle Open Enrollment rush (Nov 1 - Jan 15) with unlimited lead capacity
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-azure flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-txt font-semibold mb-1">Year-Round SEP</div>
                    <div className="text-muted-gray text-sm">
                      Life event triggers: job loss, marriage, moving, birth
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-azure flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-txt font-semibold mb-1">Real-Time Alerts</div>
                    <div className="text-muted-gray text-sm">
                      Instant notifications for qualifying life events
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-azure flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-txt font-semibold mb-1">Always Fresh</div>
                    <div className="text-muted-gray text-sm">
                      No aged leads - ever. Only fresh, intent-driven families
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            viewport={viewportSettings}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-txt">
              Ready to Transform Your <span className="text-teal">U65 Book</span>?
            </h2>
            <p className="text-xl text-muted-gray mb-12">
              Join top agencies using predictive enrollment intelligence
            </p>

            {/* Offer card */}
            <Card className="glass glow-teal border-2 border-teal/30 p-10 rounded-3xl mb-12">
              <div className="flex items-center justify-center w-16 h-16 bg-teal/20 rounded-2xl mb-6 mx-auto">
                <Award className="w-8 h-8 text-teal" />
              </div>

              <div className="mb-8">
                <div className="text-3xl font-bold text-teal mb-2 font-playfair">
                  LAUNCH SPECIAL
                </div>
                <div className="text-5xl font-bold text-txt mb-4 font-playfair">
                  20% Off First Month
                </div>
                <div className="flex items-center justify-center gap-6 text-muted-gray text-sm">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal" />
                    No setup fees
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal" />
                    No long-term contracts
                  </span>
                </div>
              </div>

              <div className="text-2xl font-bold text-txt mb-8">
                <a href="tel:8665557532" className="hover:text-teal transition-colors">
                  Call: (866) 555-LEAD
                </a>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-ink/50 border-white/20 text-txt placeholder:text-muted-gray"
                  required
                />
                <Input
                  placeholder="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-ink/50 border-white/20 text-txt placeholder:text-muted-gray"
                  required
                />
                <Input
                  placeholder="Agency Name"
                  value={formData.agency}
                  onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                  className="bg-ink/50 border-white/20 text-txt placeholder:text-muted-gray"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full glow-teal bg-teal hover:bg-teal/90 text-ink font-bold text-lg py-6 rounded-lg transition-all hover:scale-105"
                >
                  Get Started in 60 Seconds
                </Button>
              </form>
            </Card>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-muted-gray text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal" />
                <span>Healthcare.gov Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-azure" />
                <span>CMS-Ready Consent</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-soft-blue" />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
