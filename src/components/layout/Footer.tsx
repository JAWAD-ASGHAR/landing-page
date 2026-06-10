import Link from "next/link";
import { navLinks, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-white text-foreground">
      <div className="container-main border-t border-border/60 pt-12 pb-10">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="heading-display text-sm font-semibold">{site.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.tagline}
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-8 gap-y-3"
            aria-label="Footer"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="nav-link text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-display-clip" aria-hidden>
        <p className="footer-display-text">Practice Pro</p>
      </div>
    </footer>
  );
}
