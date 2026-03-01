"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/common/Button";
import { ROLE_LABELS, User, type UserRole } from "@/types/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  /** Role required for this dashboard. Used for nav highlighting. */
  role: UserRole;
}

// Single Dashboard link for all roles (RBAC handled by conditional rendering in dashboard page)
const navItems: { label: string; path: string; roles: UserRole[] }[] = [
  { label: "Dashboard", path: "/dashboard", roles: ["admin", "doctor", "receptionist", "patient"] },
];

/**
 * Shared dashboard layout with sidebar and logout.
 * Medical SaaS theme.
 */
export default function DashboardLayout({
  children,
  title,
  subtitle,
  role,
}: DashboardLayoutProps) {
  const { user, logout } = useAuth() as { user: User; logout: () => Promise<void> };
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto flex min-h-screen max-w-6xl gap-6 px-4 py-6 md:px-6">
        <aside className="hidden w-56 shrink-0 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white">
                <span className="text-sm font-bold">HC</span>
              </div>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                HealthClinic AI
              </span>
            </div>
            <nav className="space-y-1">
              {navItems
                .filter((item) => item.roles.includes(role))
                .map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                      pathname === item.path
                        ? "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                    }`}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
            </nav>
          </div>
          <div className="space-y-2 border-t border-slate-200 pt-4 dark:border-slate-800">
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {user?.email}
            </p>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
              {user?.role ? ROLE_LABELS[user.role] : "User"}
            </p>
            <Button
              variant="danger"
              fullWidth
              onClick={handleLogout}
              className="mt-2"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        <main className="flex flex-1 flex-col gap-4">
          <header className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {subtitle}
                </p>
              )}
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="md:hidden"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
