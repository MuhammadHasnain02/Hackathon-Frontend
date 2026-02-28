"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

/**
 * Patient dashboard - Patient role only.
 */
export default function PatientDashboard() {
  const { user } = useAuth();

  return (
    <ErrorBoundary>
      <RoleGuard requireAuth allowedRoles={["patient"]}>
        <DashboardLayout
          role="patient"
          title="Patient Dashboard"
          subtitle="Your medical history and appointments."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Medical History
              </h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                View your visits, prescriptions, and lab results.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Profile
              </h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                Signed in as <span className="font-medium">{user?.email}</span>
              </p>
            </div>
          </div>
        </DashboardLayout>
      </RoleGuard>
    </ErrorBoundary>
  );
}
