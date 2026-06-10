import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { SiteLoader } from "@/components/motion/SiteLoader";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Supporting General Practices Across Australia`,
    template: `%s | ${site.name}`,
  },
  description:
    "Practice Pro Solutions helps Australian GPs and clinics run smoother — from virtual reception and practice management to bookkeeping, media, supplies, and GP practice sales.",
  metadataBase: new URL(`https://${site.domain}`),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} ${sourceSerif.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-foreground">
        <SiteLoader>
          <SmoothScroll>
            <SiteShell>{children}</SiteShell>
          </SmoothScroll>
        </SiteLoader>
      </body>
    </html>
  );
}
