"use client";

import { useState, useEffect } from "react";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackgroundGlows as BG4 } from "@/components/background-glows-4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { captureUTMParams, getStoredUTMParams } from "@/lib/utm";

export default function StartPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    captureUTMParams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const utmParams = getStoredUTMParams();
      const payload = { ...formData, ...utmParams };

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit form");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

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

          <div className="bg-card-bg border border-white/10 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-input border-white/10"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-input border-white/10"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-input border-white/10"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company *
                </label>
                <Input
                  id="company"
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-input border-white/10"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Tell us about your agency and enrollment goals
                </label>
                <Textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-input border-white/10"
                />
              </div>

              {status === "error" && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                  {errorMessage}
                </div>
              )}

              {status === "success" && (
                <div className="p-4 rounded-lg bg-teal/10 border border-teal/20 text-teal">
                  Thanks! We&apos;ll be in touch shortly.
                </div>
              )}

              <Button type="submit" disabled={status === "loading"} className="w-full glow-teal">
                {status === "loading" ? "Submitting..." : "Get Started"}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
