"use client";

import Link from "next/link";

const footerLinks = [
  { href: "/features", label: "Features" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Sign Up" },
  { href: "/", label: "Privacy" },
  { href: "/", label: "Terms" },
];

/**
 * Reusable footer for landing and auth pages.
 * Medical SaaS theme with teal accent.
 */
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
            HC
          </div>
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            HealthClinic AI
          </span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-600 transition hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} HealthClinic AI. HIPAA-ready.
        </p>
      </div>
    </footer>
  );
}
