"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import {
  FileText,
  Download,
  Calendar,
  Activity,
} from "lucide-react";

/**
 * Patient dashboard: Medical History Timeline + Prescription PDF download.
 */
export default function PatientDashboardPage() {
  return (
    <ErrorBoundary>
      <RoleGuard requireAuth allowedRoles={["patient"]}>
        <DashboardLayout
          role="patient"
          title="Patient Dashboard"
          subtitle="Your medical history and prescriptions."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Medical History Timeline */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-teal-600" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Medical History Timeline
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/50">
                    <Calendar className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      General Checkup
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Jan 15, 2025
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      Routine examination. Vital signs normal.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/50">
                    <Calendar className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      Follow-up Visit
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Dec 10, 2024
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      Prescription refill completed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prescription PDF Download */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-teal-600" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Prescription PDF
                </h3>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Download your latest prescription as a PDF.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                <Download className="h-4 w-4" />
                Download Prescription
              </button>
            </div>
          </div>
        </DashboardLayout>
      </RoleGuard>
    </ErrorBoundary>
  );
}
