"use client";

import Link from "next/link";
import { Stethoscope, Github, Linkedin, Twitter, Mail } from "lucide-react";

const footerLinks = [
  { href: "#features", label: "Features" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Sign Up" },
  // { href: "/privacy", label: "Privacy" },
  // { href: "/terms", label: "Terms" },
];

const socialLinks = [
  { href: "https://github.com", label: "GitHub", icon: Github },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
  { href: "https://twitter.com", label: "Twitter", icon: Twitter },
];

/**
 * Footer with Roboto-style body, social icons, and quick links.
 * Clean layout for landing and auth pages.
 */
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
                <Stethoscope className="h-4 w-4" aria-hidden />
              </div>
              <span className="font-[family-name:var(--font-roboto)] text-base font-bold text-slate-100">
                HealthClinic AI
              </span>
            </Link>
            <p className="mt-3 max-w-sm font-[family-name:var(--font-roboto)] text-sm leading-relaxed text-slate-400">
              AI-powered clinic management. Smart diagnosis, prescriptions, and patient records in one place.
            </p>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/50 text-slate-400 transition hover:border-cyan-500/50 hover:text-cyan-400"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-[family-name:var(--font-roboto)] text-xs font-semibold uppercase tracking-wider text-slate-500">
              Quick links
            </h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-roboto)] text-sm text-slate-400 transition hover:text-cyan-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-[family-name:var(--font-roboto)] text-xs font-semibold uppercase tracking-wider text-slate-500">
              Contact
            </h4>
            <a
              href="mailto:hello@healthclinicaidemo.com"
              className="mt-3 inline-flex items-center gap-2 font-[family-name:var(--font-roboto)] text-sm text-slate-400 transition hover:text-cyan-400"
            >
              <Mail className="h-4 w-4" />
              hello@healthclinicaidemo.com
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="font-[family-name:var(--font-roboto)] text-xs text-slate-500">
            © {new Date().getFullYear()} HealthClinic AI. HIPAA-ready.
          </p>
        </div>
      </div>
    </footer>
  );
}
