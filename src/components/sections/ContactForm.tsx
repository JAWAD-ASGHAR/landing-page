"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <ScrollReveal>
        <div className="rounded-3xl bg-white p-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.08)] sm:p-10">
          <p className="eyebrow mb-4">Enquiry received</p>
          <p className="heading-display text-2xl font-semibold text-foreground sm:text-3xl">
            Thank you for reaching out
          </p>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Our team will contact you within one business day to confirm details
            and schedule your free consultation.
          </p>
        </div>
      </ScrollReveal>
    );
  }

  const fieldClassName =
    "w-full rounded-2xl border border-border/80 bg-white px-4 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/15";

  return (
    <ScrollReveal>
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-white p-8 shadow-[0_24px_60px_rgba(0,0,0,0.08)] sm:p-9"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Full name
            </span>
            <input
              required
              type="text"
              name="name"
              autoComplete="name"
              className={fieldClassName}
              placeholder="Dr. Jane Smith"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Practice name
            </span>
            <input
              required
              type="text"
              name="practice"
              autoComplete="organization"
              className={fieldClassName}
              placeholder="Your GP clinic"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Email
            </span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              className={fieldClassName}
              placeholder="you@practice.com.au"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Phone
            </span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              className={fieldClassName}
              placeholder="+61 ..."
            />
          </label>
        </div>

        <label className="mt-6 block">
          <span className="mb-2 block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            How can we help?
          </span>
          <select name="service" className={fieldClassName}>
            <option>General enquiry</option>
            <option>Practice Media</option>
            <option>Virtual Receptionists</option>
            <option>Sale & Purchase GP</option>
            <option>Medical Consumables</option>
            <option>Virtual Practice Management</option>
            <option>Accounting & Bookkeeping</option>
          </select>
        </label>

        <label className="mt-6 block">
          <span className="mb-2 block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Message
          </span>
          <textarea
            name="message"
            rows={6}
            className={`${fieldClassName} resize-y`}
            placeholder="Tell us about your practice and what support you're looking for."
          />
        </label>

        <div className="mt-9">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-dark px-7 py-4 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-dark-muted"
          >
            Book a free consultation
            <ArrowRight size={15} strokeWidth={2.25} aria-hidden />
          </button>
        </div>
      </form>
    </ScrollReveal>
  );
}
