"use client";

import { motion } from "framer-motion";
import {
  Stethoscope,
  FileText,
  FolderOpen,
  CalendarCheck,
  UserCog,
  UserCheck,
  Users,
} from "lucide-react";

const featureItems = [
  {
    title: "Smart Diagnosis",
    description:
      "AI-powered symptom analysis and differential diagnosis suggestions to support clinical decision-making.",
    icon: Stethoscope,
    metric: "Evidence-based",
  },
  {
    title: "Appointment Tracking",
    description:
      "Book, confirm, and track appointments across roles. Real-time status and calendar sync for doctors and receptionists.",
    icon: CalendarCheck,
    metric: "Real-time",
  },
  {
    title: "Patient Records",
    description:
      "Unified patient records across visits. Timeline view, allergies, medications, and lab results in one place.",
    icon: FolderOpen,
    metric: "Longitudinal",
  },
  {
    title: "Digital Prescriptions",
    description:
      "Generate prescription PDFs instantly. E-sign, share with pharmacies, and maintain full audit trails.",
    icon: FileText,
    metric: "PDF ready",
  },
];

const roleItems = [
  {
    role: "Admin",
    description: "Staff management, analytics, and control center.",
    icon: UserCog,
  },
  {
    role: "Doctor",
    description: "Appointments, AI diagnosis, and prescriptions.",
    icon: Stethoscope,
  },
  {
    role: "Receptionist",
    description: "Patient registration and appointment booking.",
    icon: UserCheck,
  },
  {
    role: "Patient",
    description: "Medical history, book visits, and prescriptions.",
    icon: Users,
  },
];

/**
 * Features section: Lucide icons, 4-role grid, scroll-reveal animations.
 * Dark mode AI aesthetic with teal/cyan accents.
 */
export default function Features() {
  return (
    <section
      id="features"
      className="border-t border-white/10 bg-slate-950 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="font-[family-name:var(--font-montserrat)] text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Why HealthClinic AI
          </p>
          <h2 className="font-[family-name:var(--font-montserrat)] mt-2 text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
            Built for modern healthcare
          </h2>
          <p className="font-[family-name:var(--font-open-sans)] mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
            Reduce administrative burden and improve patient outcomes with
            AI-assisted workflows.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featureItems.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.05 + index * 0.05 }}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm transition hover:border-cyan-500/30 hover:bg-slate-800/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 text-cyan-400">
                <feature.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="font-[family-name:var(--font-montserrat)] text-lg font-semibold text-slate-50">
                {feature.title}
              </h3>
              <p className="font-[family-name:var(--font-open-sans)] mt-2 text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                {feature.metric}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="font-[family-name:var(--font-montserrat)] text-xs font-semibold uppercase tracking-wider text-violet-400">
            Four roles, one platform
          </p>
          <h3 className="font-[family-name:var(--font-montserrat)] mt-2 text-xl font-bold text-slate-50 sm:text-2xl">
            Admin, Doctor, Receptionist, Patient
          </h3>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roleItems.map((item, index) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="flex items-start gap-4 rounded-xl border border-white/10 bg-slate-800/40 p-4 transition hover:border-teal-500/30"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400">
                <item.icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h4 className="font-[family-name:var(--font-montserrat)] font-semibold text-slate-100">
                  {item.role}
                </h4>
                <p className="font-[family-name:var(--font-open-sans)] mt-0.5 text-xs text-slate-400">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
