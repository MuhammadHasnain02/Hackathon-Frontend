"use client";

import { motion } from "framer-motion";

const featureItems = [
  {
    title: "Smart Diagnosis",
    description:
      "AI-powered symptom analysis and differential diagnosis suggestions to support clinical decision-making.",
    icon: "🔬",
    metric: "Evidence-based",
  },
  {
    title: "Digital Prescriptions",
    description:
      "Generate prescription PDFs instantly. E-sign, share with pharmacies, and maintain full audit trails.",
    icon: "📋",
    metric: "PDF ready",
  },
  {
    title: "Medical History",
    description:
      "Unified patient records across visits. Timeline view, allergies, medications, and lab results in one place.",
    icon: "📁",
    metric: "Longitudinal",
  },
];

/**
 * Features grid for landing page.
 * AI Diagnosis, Digital Prescriptions, Medical History.
 */
export default function Features() {
  return (
    <section
      id="features"
      className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Why HealthClinic AI
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            Built for modern healthcare
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
            Reduce administrative burden and improve patient outcomes with
            AI-assisted workflows.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featureItems.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.05 + index * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-800"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-2xl dark:bg-teal-900/50">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                {feature.metric}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
