"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import { validateEmail, validatePassword } from "@/lib/validation";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

/**
 * Login page with form validation and loading states.
 * Public route - redirects authenticated users to dashboard.
 */
export default function LoginPage() {
  const { login } = useAuth() as { login: (email: string, password: string) => Promise<void> };
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const emailResult = validateEmail(email);
    const passwordResult = validatePassword(password);

    if (!emailResult.valid || !passwordResult.valid) {
      setFieldErrors({
        email: emailResult.valid ? undefined : emailResult.message,
        password: passwordResult.valid ? undefined : passwordResult.message,
      });
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Login failed");
      } else {
        setError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <RoleGuard>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
          <Navbar />
          <main className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-10">
            <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="space-y-1 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  Welcome back
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Sign in to access your AI Clinic dashboard.
                </p>
              </div>
              {error && (
                <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200">
                  {error}
                </p>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setFieldErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-teal-500 disabled:opacity-60 dark:bg-slate-950 dark:text-slate-100 ${
                      fieldErrors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-300 dark:border-slate-700"
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setFieldErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-teal-500 disabled:opacity-60 dark:bg-slate-950 dark:text-slate-100 ${
                      fieldErrors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-300 dark:border-slate-700"
                    }`}
                  />
                  {fieldErrors.password && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={loading}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
              <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </main>
        </div>
      </RoleGuard>
    </ErrorBoundary>
  );
}
