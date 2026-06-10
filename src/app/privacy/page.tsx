import { JsonLd } from "@/components/seo/JsonLd";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { privacyPolicy } from "@/lib/content";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Read how Practice Pro Solutions collects, uses, and protects personal information for Australian general practices.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <LegalDocument
        eyebrow={privacyPolicy.eyebrow}
        title={privacyPolicy.title}
        updated={privacyPolicy.updated}
        intro={privacyPolicy.intro}
        sections={privacyPolicy.sections}
      />
    </>
  );
}
