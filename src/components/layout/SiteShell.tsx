"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const isHome = usePathname() === "/";

  return (
    <>
      <Header placement="site" />
      <main
        className={cn(
          "min-h-0 flex-1 overflow-visible",
          !isHome && "pt-[4.5rem]",
        )}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
