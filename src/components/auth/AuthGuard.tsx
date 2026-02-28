"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
  /** When true, this route is private and requires an auth token. */
  requireAuth?: boolean;
}

export default function AuthGuard({
  children,
  requireAuth = false,
}: AuthGuardProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // All auth checks are done client-side using localStorage.
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("accessToken")
        : null;

    if (requireAuth) {
      // Private route: redirect unauthenticated users to login.
      if (!token) {
        router.replace("/login");
        return;
      }
    } else {
      // Public route: redirect authenticated users straight to dashboard.
      if (token) {
        router.replace("/dashboard");
        return;
      }
    }

    setIsChecking(false);
  }, [requireAuth, router]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        <p className="text-sm text-slate-400">
          Preparing your personalized workspace...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

