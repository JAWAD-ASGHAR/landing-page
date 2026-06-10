"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type HeaderProps = {
  placement?: "site" | "hero";
};

type HeaderContentProps = {
  light?: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean | ((current: boolean) => boolean)) => void;
  pathname: string;
};

function HeaderContent({
  light = false,
  mobileOpen,
  setMobileOpen,
  pathname,
}: HeaderContentProps) {
  return (
    <>
      <div className="container-main grid h-[4.5rem] grid-cols-[1fr_auto_1fr] items-center">
        <Link
          href="/"
          className={cn("site-logo shrink-0", light && "site-logo--light")}
          aria-label={site.name}
        >
          <Image
            src="/favicon.png"
            alt=""
            width={34}
            height={34}
            className="site-logo-icon shrink-0"
            aria-hidden
            priority
          />
          <span className="site-logo-wordmark">
            <span
              className={cn(
                "site-logo-mark",
                light ? "text-white" : "text-foreground",
              )}
            >
              {site.logoMark}
            </span>
            <span
              className={cn(
                "site-logo-suffix",
                light ? "text-white/85" : "text-foreground",
              )}
            >
              {site.logoSuffix}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link transition-colors duration-300",
                light
                  ? pathname === link.href
                    ? "text-white"
                    : "text-white/75 hover:text-white"
                  : pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden justify-end lg:flex">
          <Button href="/contact" variant={light ? "hero" : "primary"}>
            Book Consultation
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "col-start-3 inline-flex items-center justify-end p-2 lg:hidden",
            light ? "text-white" : "text-foreground",
          )}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className={cn(
            "border-t px-4 py-6 lg:hidden",
            light
              ? "border-white/15 bg-black/80 backdrop-blur-md"
              : "border-border bg-white",
          )}
        >
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "nav-link",
                  light
                    ? pathname === link.href
                      ? "text-white"
                      : "text-white/75"
                    : pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button
              href="/contact"
              className="mt-2 w-full"
              variant={light ? "hero" : "primary"}
            >
              Book Consultation
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}

export function Header({ placement = "site" }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (isHome && placement === "site") {
      const onScroll = () => {
        const y = window.scrollY;
        const scrollingUp = y < lastScrollY.current;

        if (y <= 8) {
          setRevealed(false);
        } else if (scrollingUp) {
          setRevealed(true);
        } else {
          setRevealed(false);
        }

        lastScrollY.current = y;
      };

      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, placement]);

  if (placement === "hero") {
    if (!isHome) return null;

    return (
      <header className="absolute inset-x-0 top-0 z-20 bg-transparent">
        <HeaderContent
          light
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          pathname={pathname}
        />
      </header>
    );
  }

  if (isHome) {
    return (
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out",
          revealed
            ? "translate-y-0 border-b border-border/60 bg-white/95 shadow-sm backdrop-blur-md"
            : "-translate-y-full pointer-events-none",
        )}
      >
        <HeaderContent
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          pathname={pathname}
        />
      </header>
    );
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-white/95 backdrop-blur-md"
          : "bg-white/80 backdrop-blur-sm",
      )}
    >
      <HeaderContent
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        pathname={pathname}
      />
    </header>
  );
}
