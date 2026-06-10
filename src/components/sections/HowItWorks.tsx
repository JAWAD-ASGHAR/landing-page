import { howItWorks } from "@/lib/content";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function HowItWorks() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {howItWorks.map((step, index) => (
        <ScrollReveal key={step.title} delay={index * 0.12}>
          <article className="flex h-full flex-col">
            <ImagePlaceholder
              label={`Step ${step.step} — ${step.title} illustration`}
              aspectRatio="aspect-[5/4]"
              className="mb-6"
            />
            <span className="eyebrow mb-3">Step {step.step}</span>
            <h3 className="heading-display text-xl font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </article>
        </ScrollReveal>
      ))}
    </div>
  );
}
