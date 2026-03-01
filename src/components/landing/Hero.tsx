"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/**
 * Hero section: large Montserrat heading with gradient text, CTA font buttons.
 * Dark mode AI aesthetic with high-quality medical/AI image.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-[-20%] h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(20,184,166,0.15)_0%,transparent_60%)] blur-3xl" />
        <div className="absolute right-0 top-1/2 h-[320px] w-[400px] rounded-full bg-[radial-gradient(circle,_rgba(167,139,250,0.12)_0%,transparent_60%)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-16 md:flex-row md:items-start md:gap-14 md:px-6 md:py-24">
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-cyan-400"
          >
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            AI-Powered Clinic Management
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-[family-name:var(--font-montserrat)] text-balance text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl md:text-6xl"
          >
            Streamline your clinic with{" "}
            <span className="mt-2 block bg-gradient-to-r from-teal-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              AI Clinic Management
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="font-[family-name:var(--font-open-sans)] text-balance text-base leading-relaxed text-slate-400 sm:text-lg"
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
              className="font-[family-name:var(--font-montserrat)] inline-flex items-center justify-center rounded-xl bg-teal-500 px-6 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-teal-500/30 transition hover:bg-teal-400"
            >
              Start Free Trial
            </Link>
            <Link
              href="/login"
              className="font-[family-name:var(--font-montserrat)] inline-flex items-center justify-center rounded-xl border-2 border-slate-600 bg-slate-800/50 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/60 hover:text-cyan-400"
            >
              Login to Dashboard
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-6 grid w-full grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-slate-800/40 p-4 backdrop-blur-sm sm:max-w-md"
          >
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">HIPAA Ready</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-100">Secure by design</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Uptime</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-100">99.9%</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Setup</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-100">&lt; 5 min</dd>
            </div>
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.16, type: "spring", stiffness: 90 }}
          className="relative w-full max-w-lg"
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-800/50 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-3">
              <span className="text-sm font-semibold text-slate-200">AI Clinic Dashboard</span>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-medium text-emerald-400">
                Live
              </span>
            </div>
            <div className="relative p-4">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                width={600}
                height={400}
                alt="AI Clinic Management dashboard — medical and digital healthcare"
                className="h-48 w-full rounded-lg object-cover sm:h-56"
              />
              <p className="mt-3 text-xs text-slate-400">
                Smart diagnosis, prescriptions, and patient history in one place.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
