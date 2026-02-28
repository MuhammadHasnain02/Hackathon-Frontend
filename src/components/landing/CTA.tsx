"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Call-to-action section for the landing page.
 * Encourages sign-up with medical SaaS value proposition.
 */
export default function CTA() {
  return (
    <section
      id="cta"
      className="border-t border-slate-200 bg-gradient-to-b from-white to-teal-50/50 py-16 dark:border-slate-800 dark:from-slate-950 dark:to-teal-950/20 md:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-teal-200 bg-white p-8 shadow-lg dark:border-teal-800 dark:bg-slate-900 md:p-12"
        >
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            Ready to transform your clinic?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-400">
            Join practices using AI to streamline diagnosis, prescriptions, and
            patient records. Start your free trial today.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex w-full items-center justify-center rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition hover:bg-teal-700 sm:w-auto"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center rounded-xl border-2 border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-teal-500 hover:text-teal-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-teal-500 dark:hover:text-teal-400 sm:w-auto"
            >
              Sign In
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            No credit card required • HIPAA compliant • 14-day free trial
          </p>
        </motion.div>
      </div>
    </section>
  );
}
