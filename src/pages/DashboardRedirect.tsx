"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RoleGuard from "@/components/auth/RoleGuard";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_DASHBOARD, ROLE_STORAGE_KEY, type UserRole } from "@/types/auth";

/**
 * /dashboard redirects to role-specific dashboard.
 * Shows loader while resolving.
 */
export default function DashboardRedirect() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    const role =
      user?.role ??
      (typeof window !== "undefined"
        ? (localStorage.getItem(ROLE_STORAGE_KEY) as UserRole | null)
        : null);

    router.replace("/dashboard");
  }, [user, loading, router]);

  return (
    <RoleGuard requireAuth>
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader size="lg" label="Redirecting to your dashboard..." />
      </div>
    </RoleGuard>
  );
}
