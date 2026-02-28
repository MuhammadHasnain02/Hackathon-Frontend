"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Calendar, Stethoscope, Send } from "lucide-react";
import { useState } from "react";

/**
 * Doctor dashboard: Appointments + AI Diagnosis input.
 */
export default function DoctorDashboardPage() {
  const [diagnosisInput, setDiagnosisInput] = useState("");

  return (
    <ErrorBoundary>
      <RoleGuard requireAuth allowedRoles={["doctor"]}>
        <DashboardLayout
          role="doctor"
          title="Doctor Dashboard"
          subtitle="Appointments and AI-assisted diagnosis."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Appointments */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-teal-600" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Appointments
                </h3>
              </div>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    9:00 AM — John Doe
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    General checkup
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    10:30 AM — Jane Smith
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Follow-up
                  </p>
                </div>
              </div>
            </div>

            {/* AI Diagnosis */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-teal-600" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  AI Diagnosis
                </h3>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Enter symptoms for AI-assisted differential diagnosis.
              </p>
              <textarea
                value={diagnosisInput}
                onChange={(e) => setDiagnosisInput(e.target.value)}
                placeholder="e.g. headache, fever, fatigue for 3 days..."
                rows={4}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
              <button
                type="button"
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                <Send className="h-4 w-4" />
                Get AI Suggestions
              </button>
            </div>
          </div>
        </DashboardLayout>
      </RoleGuard>
    </ErrorBoundary>
  );
}
