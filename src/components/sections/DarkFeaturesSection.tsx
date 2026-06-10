import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { whyChooseUs } from "@/lib/content";

export function DarkFeaturesSection() {
  const features = whyChooseUs.slice(0, 3);

  return (
    <section className="section-padding bg-dark text-white">
      <div className="container-main">
        <ScrollReveal>
          <h2 className="heading-display mx-auto max-w-3xl text-center text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
            Building Future-Ready Practices
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-white/55">
            We combine innovation and expertise to help healthcare providers
            thrive — making your practice more efficient, profitable, and
            future-ready while you focus on quality patient care.
          </p>
        </ScrollReveal>

        <div className="mt-20 space-y-24 lg:space-y-32">
          {features.map((feature, index) => {
            const reversed = index % 2 === 1;

            return (
              <div
                key={feature.title}
                className={`relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <span
                  className="feature-number absolute -top-8 left-0 hidden lg:block"
                  aria-hidden
                >
                  {feature.number}
                </span>

                <ScrollReveal direction={reversed ? "right" : "left"}>
                  <div className="relative z-10 pt-4 lg:pt-8">
                    <span className="feature-number mb-2 block lg:hidden" aria-hidden>
                      {feature.number}
                    </span>
                    <h3 className="heading-display text-2xl font-semibold sm:text-3xl">
                      {feature.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-white/55">
                      {feature.description}
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction={reversed ? "left" : "right"} delay={0.1}>
                  <ImagePlaceholder
                    label={feature.imageLabel}
                    aspectRatio="aspect-[4/3]"
                    className="rounded-none grayscale"
                  />
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
