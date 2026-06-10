import Link from "next/link";
import { navLinks, services, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="container-main section-padding pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="heading-display text-base font-semibold">{site.name}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {site.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[0.65rem] font-semibold text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                in
              </a>
            </div>
          </div>

          <div>
            <p className="nav-link mb-5 text-white/40">Contact</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="nav-link mb-5 text-white/40">Services</p>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/what-we-do#${service.id}`}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="nav-link mb-5 text-white/40">Register</p>
            <p className="mb-4 text-sm text-white/60">
              Subscribe for practice insights and updates.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                className="min-w-0 flex-1 rounded-md border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/30"
              />
              <button
                type="submit"
                className="rounded-md bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-dark transition-colors hover:bg-white/90"
              >
                Agree
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
