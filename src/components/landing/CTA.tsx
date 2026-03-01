"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Call-to-action section. Montserrat heading, CTA font buttons, dark AI theme.
 */
export default function CTA() {
  return (
    <section
      id="cta"
      className="border-t border-white/10 bg-gradient-to-b from-slate-950 to-slate-900 py-16 md:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-white/10 bg-slate-800/50 p-8 shadow-2xl backdrop-blur-sm md:p-12"
        >
          <h2 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
            Ready to transform your clinic?
          </h2>
          <p className="font-[family-name:var(--font-open-sans)] mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
            Join practices using AI to streamline diagnosis, prescriptions, and
            patient records. Start your free trial today.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="font-[family-name:var(--font-montserrat)] inline-flex w-full items-center justify-center rounded-xl bg-teal-500 px-6 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-teal-500/30 transition hover:bg-teal-400 sm:w-auto"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="font-[family-name:var(--font-montserrat)] inline-flex w-full items-center justify-center rounded-xl border-2 border-slate-600 bg-transparent px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/60 hover:text-cyan-400 sm:w-auto"
            >
              Sign In
            </Link>
          </div>
          <p className="font-[family-name:var(--font-roboto)] mt-4 text-xs text-slate-500">
            No credit card required • HIPAA compliant • 14-day free trial
          </p>
        </motion.div>
      </div>
    </section>
  );
}
