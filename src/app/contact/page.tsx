import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { site, trustSignals } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Book a free consultation with Practice Pro Solutions. Contact us to explore virtual reception, practice management, bookkeeping, media, and medical supplies.",
};

export default function ContactPage() {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-main">
          <ScrollReveal>
            <p className="eyebrow mb-5">Contact Us</p>
            <h1 className="heading-display max-w-3xl text-4xl font-semibold text-foreground sm:text-5xl">
              Get In Touch
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Book a free consultation to explore how we can support your
              practice. Consultations usually take 20–30 minutes, with no hidden
              costs — completely free.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-main">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <ContactForm />

            <div className="space-y-8">
              <ScrollReveal delay={0.1}>
                <div className="rounded-2xl border border-border bg-white p-7">
                  <SectionHeading title="Contact Details" />
                  <ul className="mt-6 space-y-5">
                    <li className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-blue-light text-accent-blue">
                        <Phone size={18} />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Telephone
                        </p>
                        <a
                          href={`tel:${site.phone.replace(/\s/g, "")}`}
                          className="mt-1 block text-sm text-muted-foreground hover:text-accent-blue"
                        >
                          {site.phone}
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-blue-light text-accent-blue">
                        <Mail size={18} />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Email
                        </p>
                        <a
                          href={`mailto:${site.email}`}
                          className="mt-1 block text-sm text-muted-foreground hover:text-accent-blue"
                        >
                          {site.email}
                        </a>
                        <a
                          href={`mailto:${site.supportEmail}`}
                          className="mt-1 block text-sm text-muted-foreground hover:text-accent-blue"
                        >
                          {site.supportEmail}
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-blue-light text-accent-blue">
                        <MapPin size={18} />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Location
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {site.location}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <ImagePlaceholder
                  label="Map — Australian practice locations"
                  aspectRatio="aspect-[4/3]"
                />
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="flex flex-wrap gap-2">
                  {trustSignals.map((signal) => (
                    <span
                      key={signal}
                      className="rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-muted-foreground"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
