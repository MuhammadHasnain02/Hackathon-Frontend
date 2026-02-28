"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

/**
 * Doctor dashboard - Doctor role only.
 */
export default function DoctorDashboard() {
  return (
    <ErrorBoundary>
      <RoleGuard requireAuth allowedRoles={["doctor"]}>
        <DashboardLayout
          role="doctor"
          title="Doctor Dashboard"
          subtitle="Smart diagnosis, prescriptions, and patient records."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Smart Diagnosis
              </h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                AI-assisted symptom analysis and differential diagnosis.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Prescriptions
              </h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                Generate and manage digital prescription PDFs.
              </p>
            </div>
          </div>
        </DashboardLayout>
      </RoleGuard>
    </ErrorBoundary>
  );
}
