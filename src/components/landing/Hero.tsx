"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/**
 * Hero section for the landing page.
 * Highlights AI Clinic Management with medical SaaS theme.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-teal-50/80 via-white to-white dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-[-200px] z-0 flex justify-center opacity-40">
        <div className="h-[320px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(20,184,166,0.4),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-16 md:flex-row md:items-start md:gap-14 md:px-6 md:py-24">
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-teal-700 dark:border-teal-800 dark:bg-teal-950/50 dark:text-teal-300"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-teal-500" />
            AI-Powered Clinic Management
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-balance text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl md:text-6xl"
          >
            Streamline your clinic with
            <span className="mt-2 block bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
              AI Clinic Management
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="text-balance text-base text-slate-600 dark:text-slate-400 sm:text-lg"
          >
            Smart diagnosis, digital prescriptions, and unified medical history.
            Reduce admin work and focus on patient care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex flex-col items-center gap-3 sm:flex-row sm:justify-start"
          >
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition hover:bg-teal-700"
            >
              Start Free Trial
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl border-2 border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-teal-500 hover:text-teal-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-teal-500 dark:hover:text-teal-400"
            >
              Login to Dashboard
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-6 grid w-full grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 sm:max-w-md"
          >
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                HIPAA Ready
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
                Secure by design
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Uptime
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
                99.9%
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Setup
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
                &lt; 5 min
              </dd>
            </div>
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.16, type: "spring", stiffness: 90 }}
          className="relative w-full max-w-lg"
        >
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                AI Clinic Dashboard
              </span>
              <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-[10px] font-medium text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">
                Live
              </span>
            </div>
            <div className="p-4">
              <Image
                src="https://via.placeholder.com/600x400"
                width={600}
                height={400}
                alt="AI Clinic Management dashboard preview"
                className="h-48 w-full rounded-lg object-cover sm:h-56"
              />
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Smart diagnosis, prescriptions, and patient history in one place.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
