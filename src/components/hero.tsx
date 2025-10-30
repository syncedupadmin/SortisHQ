"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 font-playfair">
            Smarter Leads.
            <br />
            <span className="text-teal">Stronger Books.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-gray max-w-3xl mx-auto mb-12 leading-relaxed">
            Predictive signals and conversion playbooks that turn interest into revenue.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="group glow-teal">
              <Link href="/start">
                Book a Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="ghost" className="group">
              <Link href="/platform">
                See the Platform
                <Play className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
