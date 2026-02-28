"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_DASHBOARD, ROLE_STORAGE_KEY, type UserRole } from "@/types/auth";
import Loader from "@/components/common/Loader";

interface RoleGuardProps {
  children: React.ReactNode;
  /** Roles allowed to access this route. Empty = any authenticated user. */
  allowedRoles?: UserRole[];
  /** When true, requires auth token. When false, redirects authenticated users away. */
  requireAuth?: boolean;
}

/**
 * Protects routes by auth token and optional role.
 * - requireAuth + allowedRoles: only those roles can access
 * - requireAuth, no allowedRoles: any authenticated user
 * - !requireAuth: public route, redirects authenticated users to dashboard
 */
export default function RoleGuard({
  children,
  allowedRoles = [],
  requireAuth = false,
}: RoleGuardProps) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    if (requireAuth) {
      if (!token) {
        router.replace("/login");
        return;
      }
      if (loading) {
        return;
      }
      if (!user) {
        router.replace("/login");
        return;
      }
      const role =
        user.role ??
        (typeof window !== "undefined"
          ? (localStorage.getItem(ROLE_STORAGE_KEY) as UserRole | null)
          : null);
      if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
        router.replace(ROLE_DASHBOARD[role] ?? "/dashboard");
        return;
      }
    } else {
      if (token) {
        router.replace("/dashboard"); // Will redirect to role-specific dashboard
        return;
      }
    }
    setIsChecking(false);
  }, [requireAuth, token, user, loading, allowedRoles, router]);

  if (isChecking || (requireAuth && loading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader size="lg" label="Loading..." />
      </div>
    );
  }

  return <>{children}</>;
}
