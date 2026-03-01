"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RoleGuard from "@/components/auth/RoleGuard";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_STORAGE_KEY, User, type UserRole } from "@/types/auth";
import AdminDashboardView from "@/components/dashboard/views/AdminDashboardView";
import PatientDashboardView from "@/components/dashboard/views/PatientDashboardView";
import DoctorDashboardView from "@/components/dashboard/views/DoctorDashboardView";
import ReceptionistDashboardView from "@/components/dashboard/views/ReceptionistDashboardView";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

/**
 * /dashboard renders role-based dashboard content.
 * Shows loader while resolving auth/role, then the correct view.
 */
export default function DashboardRedirect() {
  const router = useRouter();
  const { user, loading } = useAuth() as { user: User; loading: boolean };

  const role: UserRole | null =
    user?.role ??
    (typeof window !== "undefined"
      ? (localStorage.getItem(ROLE_STORAGE_KEY) as UserRole | null)
      : null);

  useEffect(() => {
    if (loading) return;
    if (!role) {
      router.replace("/login");
    }
  }, [loading, role, router]);

  return (
    <RoleGuard requireAuth>
      {loading ? (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
          <Loader size="lg" label="Redirecting to your dashboard..." />
        </div>
      ) : !role ? (
        null
      ) : (
        <ErrorBoundary>
          {role === "admin" && <AdminDashboardView />}
          {role === "patient" && <PatientDashboardView />}
          {role === "doctor" && <DoctorDashboardView />}
          {role === "receptionist" && <ReceptionistDashboardView />}
        </ErrorBoundary>
      )}
    </RoleGuard>
  );
}
