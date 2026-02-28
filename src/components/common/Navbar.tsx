"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#cta", label: "Get Started" },
];

/**
 * Sticky glassmorphism navbar for landing and auth pages.
 * Medical SaaS branding with HealthClinic AI.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <header className="sticky inset-x-0 top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-lg shadow-teal-500/30">
            <span className="text-sm font-bold">HC</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-slate-800 dark:text-slate-100">
              HealthClinic AI
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
              AI Clinic Management
            </span>
          </div>
        </Link>

        {!isAuthPage && (
          <div className="hidden items-center gap-8 md:flex">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 transition hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-500 hover:text-teal-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-teal-500 dark:hover:text-teal-400"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition hover:bg-teal-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}

        {!isAuthPage && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 md:hidden"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="flex flex-col gap-1">
              <span className="block h-0.5 w-4 rounded-full bg-current" />
              <span className="block h-0.5 w-3 rounded-full bg-current opacity-70" />
              <span className="block h-0.5 w-5 rounded-full bg-current opacity-50" />
            </div>
          </button>
        )}
      </nav>

      {!isAuthPage && open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-600 dark:text-slate-400"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2">
              <Link
                href="/login"
                className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-center text-sm font-medium dark:border-slate-700"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="flex-1 rounded-xl bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
