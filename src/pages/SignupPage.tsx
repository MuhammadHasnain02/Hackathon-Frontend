"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "@/lib/validation";
import { ROLE_LABELS, type UserRole } from "@/types/auth";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

/**
 * Signup page with role selection, validation, and loading states.
 * Public route - redirects authenticated users to dashboard.
 */
export default function SignupPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("patient");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const emailResult = validateEmail(email);
    const passwordResult = validatePassword(password);
    const confirmResult = validateConfirmPassword(password, confirmPassword);

    if (!emailResult.valid) {
      setFieldErrors((prev) => ({ ...prev, email: emailResult.message }));
    }
    if (!passwordResult.valid) {
      setFieldErrors((prev) => ({ ...prev, password: passwordResult.message }));
    }
    if (!confirmResult.valid) {
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: confirmResult.message,
      }));
    }
    if (!emailResult.valid || !passwordResult.valid || !confirmResult.valid) {
      return;
    }

    setLoading(true);
    try {
      await register(email, password, role);
      router.push("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Sign up failed");
      } else {
        setError("Sign up failed");
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
                  Create your account
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Join HealthClinic AI and start managing your clinic today.
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
                    htmlFor="role"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    I am a
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {(Object.keys(ROLE_LABELS) as UserRole[]).map((r) => (
                      <option key={r} value={r}>
                        {ROLE_LABELS[r]}
                      </option>
                    ))}
                  </select>
                </div>
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
                    minLength={6}
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
                <div className="space-y-1.5">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setFieldErrors((prev) => ({
                        ...prev,
                        confirmPassword: undefined,
                      }));
                    }}
                    className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-teal-500 disabled:opacity-60 dark:bg-slate-950 dark:text-slate-100 ${
                      fieldErrors.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-300 dark:border-slate-700"
                    }`}
                  />
                  {fieldErrors.confirmPassword && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {fieldErrors.confirmPassword}
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
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </form>
              <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </main>
        </div>
      </RoleGuard>
    </ErrorBoundary>
  );
}
