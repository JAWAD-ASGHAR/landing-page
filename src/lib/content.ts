export const site = {
  name: "Practice Pro Solutions",
  logoMark: "Practice Pro",
  logoSuffix: "Solutions",
  domain: "practiceprosolutions.com.au",
  tagline: "Your trusted partner in supporting general practices across Australia",
  phone: "+61 2 0000 0000",
  email: "info@practiceprosolutions.com.au",
  supportEmail: "support@practiceprosolutions.com.au",
  location: "Australia-wide support for general practices",
} as const;

export const hero = {
  eyebrow: "For Australian general practices",
  title: "Focus on patient care.",
  titleAccent: "We handle everything else.",
  description:
    "Reception, operations, media, and practice transitions — one partner supporting clinics nationwide.",
} as const;

export const chairCta = {
  title: "Don't be shy",
  description:
    "Book a free consultation and explore how Practice Pro Solutions can support your clinic — from media and reception to bookkeeping, supplies, and practice transitions.",
  primaryLabel: "Book a Consultation",
  secondaryLabel: "Contact Us",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const services = [
  {
    id: "practice-media",
    title: "Practice Media",
    shortTitle: "Digital | Health Marketing Solutions",
    description:
      "Boost your clinic's visibility with tailored digital marketing and media solutions.",
    featured: true,
    comingSoon: false,
    stackColor: "#4a4844",
    stackImage: "/services/Practice Media.webp",
    stackImageLabel: "GP clinic website and digital marketing visual",
    details: {
      intro:
        "Web development, software solutions, and digital marketing tailored for medical practices.",
      benefits: [
        "Professional websites that build patient trust",
        "Targeted digital marketing for local GP visibility",
        "Brand development aligned with healthcare compliance",
        "Content and media that speaks to your community",
      ],
      whoWeHelp:
        "GP clinics, multi-doctor practices, and healthcare providers looking to grow their presence and attract new patients.",
      steps: [
        "Understand your practice goals and patient audience",
        "Design a tailored media and marketing strategy",
        "Launch, monitor, and refine for ongoing growth",
      ],
    },
  },
  {
    id: "virtual-receptionists",
    title: "Virtual Receptionists",
    shortTitle: "Virtual Receptionists",
    description:
      "Never miss a call — professional reception support that keeps patients connected.",
    featured: false,
    comingSoon: false,
    stackColor: "#3d4548",
    stackImage: "/services/Virtual Receptionists.webp",
    stackImageLabel: "Virtual receptionist with headset at medical desk",
    details: {
      intro:
        "Professional virtual receptionists to handle calls, book appointments, and manage patient enquiries.",
      benefits: [
        "Calls answered in your practice name",
        "Appointment booking and patient enquiries managed",
        "Consistent, professional patient communication",
        "Flexible coverage without in-house staffing costs",
      ],
      whoWeHelp:
        "Busy GP practices that need reliable front-desk support without adding permanent reception staff.",
      steps: [
        "Learn your practice workflows and call handling preferences",
        "Set up systems integrated with your scheduling",
        "Provide ongoing reception support with regular reviews",
      ],
    },
  },
  {
    id: "gp-sale-purchase",
    title: "Sale & Purchase GP",
    shortTitle: "Own / Setup A Practice",
    description:
      "Buy or sell GP practices with confidence, backed by expert guidance.",
    featured: false,
    comingSoon: false,
    stackColor: "#503a3a",
    stackImage: "/services/Sale & Purchase GP.webp",
    stackImageLabel: "Australian GP practice exterior or sale consultation",
    details: {
      intro:
        "Facilitating sale, acquisition, or transition of general medical practices with care.",
      benefits: [
        "Expert guidance through buy and sell processes",
        "Due diligence support tailored to GP practices",
        "Smooth transitions for staff and patients",
        "Confident decisions backed by healthcare experience",
      ],
      whoWeHelp:
        "GPs buying their first practice, retiring doctors selling, and clinic owners planning transitions.",
      steps: [
        "Assess your goals and practice requirements",
        "Guide negotiations, compliance, and documentation",
        "Support handover for a seamless transition",
      ],
    },
  },
  {
    id: "medical-consumables",
    title: "E-commerce Medical Consumables",
    shortTitle: "E-commerce Medical Consumables",
    description:
      "Order and manage consumables with ease, delivered directly to your practice.",
    featured: false,
    comingSoon: false,
    stackColor: "#424538",
    stackImage: "/services/E-commerce Medical Consumables.webp",
    stackImageLabel: "Medical consumables and supplies for GP clinics",
    details: {
      intro:
        "Access surgical supplies, consumables, and hospital materials with our simple dropshipping solution.",
      benefits: [
        "Simple ordering and direct delivery",
        "Reduced admin for stock management",
        "Reliable supply for day-to-day clinical needs",
      ],
      whoWeHelp:
        "GP clinics and healthcare providers seeking cost-effective, hassle-free medical consumables.",
      steps: [
        "Set up your practice ordering profile",
        "Browse and order supplies as needed",
        "Receive direct delivery with ongoing support",
      ],
    },
  },
  {
    id: "virtual-practice-management",
    title: "Virtual Practice Management",
    shortTitle: "Virtual Practice Management",
    description:
      "Streamline admin, HR, and compliance with expert virtual support.",
    featured: false,
    comingSoon: true,
    stackColor: "#3f3a48",
    stackImage: "/services/Virtual Practice Management.webp",
    stackImageLabel: "Practice management dashboard and admin workflow",
    details: {
      intro:
        "Streamline your practice with virtual support to upgrade systems, improve workflows, and stay compliant.",
      benefits: [
        "Compliance-focused workflows for Australian practices",
        "System upgrades and process improvements",
        "Ongoing monitoring to keep operations efficient",
      ],
      whoWeHelp:
        "Growing GP practices managing increasing admin, HR, and compliance demands.",
      steps: [
        "Audit current operations and pain points",
        "Design customised management workflows",
        "Deliver ongoing virtual support and reviews",
      ],
    },
  },
  {
    id: "accounting-bookkeeping",
    title: "Accounting & Bookkeeping",
    shortTitle: "Accounting & Bookkeeping",
    description:
      "Stay compliant and in control with accurate, stress-free financial management.",
    featured: false,
    comingSoon: true,
    stackColor: "#3a4240",
    stackImage: "/services/Accounting & Bookkeeping.webp",
    stackImageLabel: "Healthcare bookkeeping and financial reporting",
    details: {
      intro:
        "Comprehensive accounting services designed to streamline your financial operations.",
      benefits: [
        "Healthcare-aware bookkeeping practices",
        "Compliance and financial clarity for peace of mind",
        "Less time on finances, more time for patients",
      ],
      whoWeHelp:
        "GP practice owners and managers who want reliable, compliant financial management.",
      steps: [
        "Review your current financial setup",
        "Implement tailored bookkeeping processes",
        "Provide regular reporting and ongoing support",
      ],
    },
  },
] as const;

export const whyChooseUs = [
  {
    number: "01",
    title: "Smarter Operations",
    description:
      "Virtual management and reception support that keeps your clinic running smoothly — so your team can focus on patients, not paperwork.",
    image: "/home/Smarter Operations.webp",
    imageLabel: "Medical professional with headset at reception desk",
  },
  {
    number: "02",
    title: "Strong Foundations",
    description:
      "Accounting, bookkeeping, and GP sales expertise that gives your practice financial clarity and confidence at every stage.",
    image: "/home/Strong Foundations.webp",
    imageLabel: "Hands using tablet for practice financial management",
  },
  {
    number: "03",
    title: "Connected Care",
    description:
      "Build your brand with practice media and digital solutions that keep patients informed, engaged, and connected to your clinic.",
    image: "/home/Connected Care.webp",
    imageLabel: "Mobile app interface for patient communication",
  },
  {
    number: "04",
    title: "Affordable Access",
    description: "Medical supplies at fair prices",
    imageLabel: "Medical consumables delivery to GP clinic",
  },
] as const;

export const impactQuote =
  "Precision in operations is the pulse of a successful clinic.";

export const stats = [
  { value: 22, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Healthcare Brands Trusted" },
  { value: 6, suffix: "", label: "Core Service Areas" },
  { value: 100, suffix: "%", label: "Healthcare Focused" },
] as const;

export const testimonials = [
  {
    quote:
      "Practice Pro Solutions completely streamlined my clinic operations. Their virtual reception service means no patient call is ever missed, and their bookkeeping support has taken a huge weight off my shoulders.",
    name: "Dr. Sarah Mitchell",
    role: "General Practitioner, Sydney",
  },
  {
    quote:
      "Their team has been outstanding in helping us with medical supplies and financial management. Reliable, professional, and always quick to respond — exactly what every practice needs.",
    name: "Michael Roberts",
    role: "Practice Manager, Melbourne",
  },
  {
    quote:
      "When I purchased my GP practice, Practice Pro Solutions guided me through the entire process. Their support made the transition smooth, stress-free, and incredibly efficient.",
    name: "Emily Chen",
    role: "Clinic Owner, Brisbane",
  },
] as const;

export const clientLogos = [
  { name: "Wallsend Healthcare", src: "/list/wallsend-healthcare.svg" },
  { name: "Paterson Medical", src: "/list/Paterson-medical.svg" },
  { name: "Branxton Healthcare", src: "/list/Branxton-Healthcare.svg" },
  { name: "Huntlee Healthcare", src: "/list/huntlee-healthcare.svg" },
  { name: "Clarence Town Medical", src: "/list/clarence-town.svg" },
  { name: "Healthcare Partner", src: "/list/Group 405.svg" },
  { name: "Healthcare Partner", src: "/list/Group 407.svg" },
  { name: "Healthcare Partner", src: "/list/Mask group.svg" },
] as const;

export const founder = {
  name: "Dr. Faisal Khan",
  title: "Founder | GP Specialist | Mentor",
  credentials: "MBBS, FRACGP, FAMAC",
  quote: "We exist to make healthcare simpler for providers and better for patients.",
  bio: "With more than 22 years of experience in general practice and integrative medicine, Dr. Faisal Khan has built a reputation as a trusted leader in Australian healthcare. Holding qualifications including MBBS, FRACGP, and FAMAC, he combines clinical excellence with a holistic, patient-centered approach to care.",
  extendedBio:
    "As the Founder of Practice Pro Solutions and a senior GP at Wallsend Medical Practice, Dr. Khan has dedicated his career to improving patient outcomes, empowering healthcare providers, and mentoring the next generation of doctors. His leadership extends beyond the clinic — he actively supports innovation in healthcare delivery, integrating evidence-based practices with modern systems to simplify operations and enhance care.",
} as const;

export const howItWorks = [
  {
    step: "1",
    title: "Idea Generation",
    description:
      "We work closely with you to understand your practice goals and identify the best solutions for your needs.",
  },
  {
    step: "2",
    title: "System Design",
    description:
      "Our team develops customised workflows and technology setups that integrate seamlessly into your clinic.",
  },
  {
    step: "3",
    title: "Monitoring & Support",
    description:
      "Ongoing support and performance checks help keep your systems reliable, efficient, and secure.",
  },
] as const;

export const faqs = [
  {
    question: "How long does the consultation take?",
    answer:
      "Consultations usually take around 20–30 minutes, depending on your needs.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes, there are no hidden costs — it's completely free to book a consultation.",
  },
  {
    question: "Do you offer online consultations?",
    answer:
      "Yes, we can meet via Zoom or phone call for your convenience.",
  },
  {
    question: "What happens after I book?",
    answer:
      "Our team will contact you to confirm details and schedule the consultation at a time that suits you.",
  },
  {
    question: "Can I ask about multiple services?",
    answer:
      "Absolutely. During the consultation, you can explore any of our services — media, bookkeeping, reception, management, or medical supplies.",
  },
  {
    question: "What services do you provide?",
    answer:
      "We offer virtual reception, practice management, bookkeeping, media, and admin support — tailored to keep your practice running smoothly.",
  },
  {
    question: "How does a virtual receptionist work?",
    answer:
      "Our team answers calls in your practice name, manages appointments, and handles patient enquiries — just like an in-house receptionist.",
  },
  {
    question: "Is patient information secure?",
    answer:
      "Absolutely. We follow strict Australian privacy standards to ensure all patient data remains safe and confidential.",
  },
] as const;

export const aboutValues = [
  "Clear, reliable support for your practice",
  "Professional solutions tailored to healthcare",
  "Patient care at the heart of what we do",
  "Secure systems that protect sensitive information",
  "Experienced team with a focus on efficiency and accuracy",
  "Flexible services designed to suit your practice needs",
] as const;

export const trustSignals = [
  "Australian privacy standards",
  "Healthcare-specialist team",
  "GP-led expertise since 2003",
  "Trusted by practices nationwide",
] as const;

export const aboutPage = {
  eyebrow: "About Us",
  title: "Supporting Australian healthcare",
  titleAccent: "since 2003.",
  description:
    "For over two decades we've partnered with GPs and clinics nationwide — easing the administrative burden so doctors can focus on what matters most: their patients.",
  highlights: [
    { label: "Years of experience", value: "22+" },
    { label: "Core service areas", value: "6" },
    { label: "Coverage", value: "Australia-wide" },
  ],
} as const;

export const whatWeDoPage = {
  eyebrow: "What We Do",
  title: "Everything your practice needs",
  titleAccent: "under one roof.",
  description:
    "From building your brand to managing daily operations, finances, and supplies — tailored solutions that make your clinic more efficient, compliant, and patient-focused.",
  highlights: [
    { label: "Service areas", value: "6" },
    { label: "Consultation", value: "Free" },
    { label: "Focus", value: "General practice" },
  ],
} as const;

export const contactPage = {
  eyebrow: "Contact Us",
  title: "Let's talk about",
  titleAccent: "your practice.",
  description:
    "Book a free consultation to explore how we can support your clinic. No pressure, no hidden costs — just a clear conversation about what your practice needs.",
  highlights: [
    { label: "Free consultation", value: "Always" },
    { label: "Typical duration", value: "20–30 min" },
    { label: "Coverage", value: "Australia-wide" },
  ],
  formTitle: "Book a free consultation",
  formDescription:
    "Tell us a little about your practice and we'll be in touch to confirm a time that suits you.",
  processTitle: "What happens next",
  processDescription:
    "A simple, no-pressure path from enquiry to clarity — designed around how busy practices actually work.",
  processSteps: [
    {
      step: "01",
      title: "You reach out",
      description:
        "Share your practice details and what you're looking for — reception, media, bookkeeping, or something else.",
    },
    {
      step: "02",
      title: "We confirm a time",
      description:
        "Our team contacts you within one business day to schedule a phone or Zoom consultation at your convenience.",
    },
    {
      step: "03",
      title: "We explore solutions",
      description:
        "In 20–30 minutes, we learn about your clinic and outline practical ways Practice Pro Solutions can help.",
    },
  ],
  responseQuote:
    "Most practices tell us the consultation alone clarifies what support would actually make a difference.",
} as const;

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  list?: readonly string[];
};

export const privacyPolicy = {
  title: "Privacy Policy",
  eyebrow: "Legal",
  updated: "10 June 2026",
  intro:
    "Practice Pro Solutions respects your privacy and is committed to protecting personal information in line with the Australian Privacy Act 1988 and the Australian Privacy Principles (APPs).",
  sections: [
    {
      id: "collection",
      title: "Information we collect",
      paragraphs: [
        "We may collect personal information you provide when you contact us, book a consultation, use our services, or interact with our website — including your name, practice name, email address, phone number, and any message content you submit.",
        "We may also collect limited technical information when you visit our website, such as browser type, device information, and pages viewed, to help us improve the site experience.",
      ],
    },
    {
      id: "use",
      title: "How we use your information",
      paragraphs: [
        "We use personal information to respond to enquiries, deliver our services, manage client relationships, improve our website, and meet legal or regulatory obligations.",
      ],
      list: [
        "Scheduling and conducting consultations",
        "Providing practice support services you request",
        "Communicating updates relevant to your enquiry or engagement",
        "Maintaining the security and performance of our systems",
      ],
    },
    {
      id: "health",
      title: "Healthcare and sensitive information",
      paragraphs: [
        "Where our services involve access to practice or patient-related information, we handle that data with heightened care and only as required to deliver the agreed service. We do not use patient information for unrelated marketing purposes.",
        "We expect all information shared with us to be provided lawfully and with appropriate authority from your practice.",
      ],
    },
    {
      id: "disclosure",
      title: "When we disclose information",
      paragraphs: [
        "We do not sell personal information. We may disclose information to trusted service providers who help us operate our business (such as hosting or email providers), regulators where required by law, or professional advisers bound by confidentiality obligations.",
      ],
    },
    {
      id: "security",
      title: "Storage and security",
      paragraphs: [
        "We take reasonable steps to protect personal information from misuse, loss, unauthorised access, modification, or disclosure. No method of transmission over the internet is completely secure, but we review our safeguards regularly.",
      ],
    },
    {
      id: "rights",
      title: "Your rights and enquiries",
      paragraphs: [
        "You may request access to, or correction of, personal information we hold about you, subject to applicable exceptions under Australian privacy law.",
        "For privacy-related questions or requests, contact us at info@practiceprosolutions.com.au.",
      ],
    },
  ] satisfies readonly LegalSection[],
} as const;

export const termsOfService = {
  title: "Terms of Service",
  eyebrow: "Legal",
  updated: "10 June 2026",
  intro:
    "These terms govern your use of the Practice Pro Solutions website and any enquiry or consultation you request through it. By using this site, you agree to these terms.",
  sections: [
    {
      id: "website",
      title: "Use of this website",
      paragraphs: [
        "This website provides general information about Practice Pro Solutions and our services for Australian general practices. Content is for informational purposes and does not constitute medical, legal, or financial advice.",
        "You agree to use the website lawfully and not to interfere with its operation or attempt unauthorised access to our systems.",
      ],
    },
    {
      id: "consultations",
      title: "Consultations and enquiries",
      paragraphs: [
        "Consultations offered through this website are free and non-binding. They are intended to help you understand how our services may support your practice.",
        "Submitting a contact form does not create a client relationship or service agreement until both parties agree to formal terms in writing.",
      ],
    },
    {
      id: "services",
      title: "Professional services",
      paragraphs: [
        "Specific services — including virtual reception, practice management, bookkeeping, media, supplies, and GP practice transitions — are provided under separate agreements that define scope, fees, responsibilities, and data handling requirements.",
      ],
    },
    {
      id: "accuracy",
      title: "Information accuracy",
      paragraphs: [
        "We aim to keep website content current and accurate, but we do not warrant that all information is complete or free from error. Service availability may change, and any timelines discussed in consultations are estimates unless confirmed in writing.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      paragraphs: [
        "To the extent permitted by Australian law, Practice Pro Solutions is not liable for any loss arising from reliance on general website content or from temporary unavailability of the site.",
        "Nothing in these terms excludes rights or remedies that cannot be excluded under applicable consumer protection laws.",
      ],
    },
    {
      id: "changes",
      title: "Changes and contact",
      paragraphs: [
        "We may update these terms from time to time. Continued use of the website after changes are published constitutes acceptance of the updated terms.",
        "Questions about these terms can be directed to info@practiceprosolutions.com.au.",
      ],
    },
  ] satisfies readonly LegalSection[],
} as const;

export const legalFooterLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;
