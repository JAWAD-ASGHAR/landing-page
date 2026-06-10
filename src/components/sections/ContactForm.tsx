"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-md border border-accent-blue/30 bg-accent-blue-light p-8 text-center">
        <p className="heading-display text-xl font-semibold text-foreground">
          Thank you for your enquiry
        </p>
        <p className="mt-3 text-muted-foreground">
          Our team will contact you to confirm details and schedule your free
          consultation at a time that suits you.
        </p>
      </div>
    );
  }

  return (
    <ScrollReveal>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-white p-8 shadow-sm"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">
              Full name
            </span>
            <input
              required
              type="text"
              name="name"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
              placeholder="Dr. Jane Smith"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">
              Practice name
            </span>
            <input
              required
              type="text"
              name="practice"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
              placeholder="Your GP clinic"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">
              Email
            </span>
            <input
              required
              type="email"
              name="email"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
              placeholder="you@practice.com.au"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">
              Phone
            </span>
            <input
              type="tel"
              name="phone"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
              placeholder="+61 ..."
            />
          </label>
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-medium text-foreground">
            How can we help?
          </span>
          <select
            name="service"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
          >
            <option>General enquiry</option>
            <option>Practice Media</option>
            <option>Virtual Receptionists</option>
            <option>Sale & Purchase GP</option>
            <option>Medical Consumables</option>
            <option>Virtual Practice Management</option>
            <option>Accounting & Bookkeeping</option>
          </select>
        </label>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-medium text-foreground">
            Message
          </span>
          <textarea
            name="message"
            rows={4}
            className="w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
            placeholder="Tell us about your practice and what support you're looking for."
          />
        </label>

        <Button type="submit" className="mt-6 w-full sm:w-auto">
          Book a Free Consultation
        </Button>
      </form>
    </ScrollReveal>
  );
}
