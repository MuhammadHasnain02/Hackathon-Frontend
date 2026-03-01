"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { useEffect, useState } from "react";

/**
 * Admin dashboard - Admin role only.
 */
export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);

  // 2. useEffect ensures this runs ONLY on the client side
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  // 3. Agar server-side render ho raha hai, to kuch return na karein (Build pass ho jayegi)
  if (!mounted) {
    return null; 
  }

  return (
    <ErrorBoundary>
      <RoleGuard requireAuth allowedRoles={["admin"]}>
        <DashboardLayout
          role="admin"
          title="Admin Dashboard"
          subtitle="Manage users, settings, and clinic-wide configurations."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Users
              </h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                Manage doctors, staff, and patient accounts.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Settings
              </h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                Clinic-wide settings, integrations, and billing.
              </p>
            </div>
          </div>
        </DashboardLayout>
      </RoleGuard>
    </ErrorBoundary>
  );
}
