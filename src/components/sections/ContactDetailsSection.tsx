"use client";

import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Video } from "lucide-react";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { contactPage, site, trustSignals } from "@/lib/content";

const contactMethods = [
  {
    icon: Phone,
    label: "Telephone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    label: "General enquiries",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Mail,
    label: "Support",
    value: site.supportEmail,
    href: `mailto:${site.supportEmail}`,
  },
  {
    icon: MapPin,
    label: "Coverage",
    value: site.location,
  },
] as const;

export function ContactDetailsSection() {
  return (
    <section className="section-padding overflow-hidden bg-[#e6e6ea]">
      <div className="container-main">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20">
          <div>
            <ScrollReveal>
              <p className="eyebrow mb-5">{contactPage.formTitle}</p>
              <h2 className="heading-display max-w-lg text-3xl font-semibold sm:text-4xl">
                Start with a conversation
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                {contactPage.formDescription}
              </p>
            </ScrollReveal>

            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-8 lg:pt-4">
            <ScrollReveal delay={0.08}>
              <div className="rounded-3xl bg-dark p-7 text-white sm:p-8">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white/45">
                  Direct contact
                </p>
                <ul className="mt-6 space-y-6">
                  {contactMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <li key={`${method.label}-${method.value}`} className="flex gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                          <Icon size={18} strokeWidth={1.75} aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/45">
                            {method.label}
                          </p>
                          {"href" in method && method.href ? (
                            <a
                              href={method.href}
                              className="mt-1 block text-sm leading-relaxed text-white/85 transition-colors hover:text-white"
                            >
                              {method.value}
                            </a>
                          ) : (
                            <p className="mt-1 text-sm leading-relaxed text-white/85">
                              {method.value}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/70">
                    <Video size={14} aria-hidden />
                    Zoom or phone
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/70">
                    <Clock size={14} aria-hidden />
                    20–30 minutes
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.14}>
              <div className="relative overflow-hidden rounded-3xl">
                <ParallaxImage
                  src="/contact/contact.jpg"
                  alt="Practice team welcoming a consultation enquiry"
                  className="aspect-[4/3] min-h-[18rem]"
                  speed={0.14}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <ParallaxLayer
                  className="absolute bottom-0 left-0 z-10 max-w-[18rem] sm:max-w-xs"
                  speed={-0.06}
                >
                  <div className="bg-white/95 p-5 backdrop-blur-sm sm:p-6">
                    <p className="quote-serif text-base leading-snug text-foreground sm:text-lg">
                      &ldquo;{contactPage.responseQuote}&rdquo;
                    </p>
                  </div>
                </ParallaxLayer>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-2">
                {trustSignals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-border/80 bg-white px-4 py-2 text-xs font-medium text-muted-foreground"
                  >
                    {signal}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                By submitting the form you agree to our{" "}
                <Link href="/privacy" className="text-accent-blue hover:underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="text-accent-blue hover:underline">
                  Terms of Service
                </Link>
                .
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
