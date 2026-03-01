"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Stethoscope } from "lucide-react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#cta", label: "Get Started" },
];

/**
 * Sticky glassmorphism navbar for landing and auth pages.
 * Clean brand logo and dark AI aesthetic.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-900/70 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/25">
            <Stethoscope className="h-5 w-5" aria-hidden />
          </div>
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-montserrat)] text-sm font-bold tracking-tight text-slate-50">
              HealthClinic AI
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-cyan-400/90">
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
                  className="text-sm font-medium text-slate-300 transition hover:text-cyan-400"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-xl border border-slate-600 bg-transparent px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-500/60 hover:text-cyan-400"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-bold text-slate-900 shadow-lg shadow-teal-500/30 transition hover:bg-teal-400 font-[family-name:var(--font-montserrat)]"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-600 bg-slate-800/80 text-slate-200 md:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}
      </nav>

      {!isAuthPage && open && (
        <div className="border-t border-white/10 bg-slate-900/95 px-4 py-3 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-300"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2">
              <Link
                href="/login"
                className="flex-1 rounded-xl border border-slate-600 px-3 py-2 text-center text-sm font-medium text-slate-200"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="flex-1 rounded-xl bg-teal-500 px-3 py-2 text-center text-sm font-bold text-slate-900 font-[family-name:var(--font-montserrat)]"
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
