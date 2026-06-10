import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

type ServiceDetail = {
  id: string;
  title: string;
  shortTitle: string;
  comingSoon?: boolean;
  details: {
    intro: string;
    benefits: readonly string[];
    whoWeHelp: string;
    steps: readonly string[];
  };
};

export function ServiceDetailSection({
  service,
  index,
}: {
  service: ServiceDetail;
  index: number;
}) {
  const reversed = index % 2 === 1;

  return (
    <section
      id={service.id}
      className="scroll-mt-28 section-padding border-t border-border"
    >
      <div className="container-main">
        <div
          className={`grid items-start gap-12 lg:grid-cols-2 lg:gap-16 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}
        >
          <ScrollReveal direction={reversed ? "right" : "left"}>
            <div>
              <p className="eyebrow mb-4">
                Service {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="heading-display text-3xl font-semibold text-foreground sm:text-4xl">
                {service.title}
              </h2>
              {service.comingSoon && (
                <span className="mt-3 inline-block rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                  Coming Soon
                </span>
              )}
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {service.details.intro}
              </p>
              <div className="mt-8">
                <Button href="/contact">Book a Free Consultation</Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction={reversed ? "left" : "right"} delay={0.1}>
            <ImagePlaceholder
              label={`${service.title} — service visual`}
              aspectRatio="aspect-[4/3]"
            />
          </ScrollReveal>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          <ScrollReveal delay={0.05}>
            <div className="rounded-2xl border border-border bg-white p-7">
              <h3 className="heading-display text-lg font-semibold text-foreground">
                Benefits & Features
              </h3>
              <ol className="mt-5 space-y-4">
                {service.details.benefits.map((benefit, i) => (
                  <li key={benefit} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-blue-light text-xs font-semibold text-accent-blue">
                      {i + 1}
                    </span>
                    {benefit}
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-white p-7">
              <h3 className="heading-display text-lg font-semibold text-foreground">
                Who We Help
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {service.details.whoWeHelp}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="rounded-2xl border border-border bg-white p-7">
              <h3 className="heading-display text-lg font-semibold text-foreground">
                How It Works
              </h3>
              <ol className="mt-5 space-y-4">
                {service.details.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-blue-light text-xs font-semibold text-accent-blue">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
