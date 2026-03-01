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
import Footer from "@/components/common/Footer";
import { Stethoscope } from "lucide-react";

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
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
          <div className="pointer-events-none fixed inset-0 z-0">
            <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(20,184,166,0.12)_0%,transparent_60%)] blur-3xl" />
          </div>
          <Navbar />
          <main className="relative z-10 flex min-h-[calc(100vh-56px)] flex-col items-center justify-center px-4 py-10">
            <div className="mb-6 flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/25">
                <Stethoscope className="h-6 w-6" aria-hidden />
              </div>
              <span className="font-[family-name:var(--font-montserrat)] text-lg font-bold tracking-tight text-slate-50">
                HealthClinic AI
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-cyan-400/90">
                AI Clinic Management
              </span>
            </div>
            <div className="w-full max-w-md space-y-6 rounded-2xl border border-white/10 bg-slate-800/50 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
              <div className="space-y-1 text-center">
                <h1 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold tracking-tight text-slate-50">
                  Welcome back
                </h1>
                <p className="text-sm text-slate-400">
                  Sign in to access your AI Clinic dashboard.
                </p>
              </div>
              {error && (
                <p className="rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-center text-sm text-red-200">
                  {error}
                </p>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-300"
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
                    className={`w-full rounded-xl border bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-teal-500/50 disabled:opacity-60 ${
                      fieldErrors.email
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-white/10 focus:border-teal-500"
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-red-400">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-300"
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
                    className={`w-full rounded-xl border bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-teal-500/50 disabled:opacity-60 ${
                      fieldErrors.password
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-white/10 focus:border-teal-500"
                    }`}
                  />
                  {fieldErrors.password && (
                    <p className="text-xs text-red-400">
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
                  className="bg-teal-500 font-[family-name:var(--font-montserrat)] font-bold text-slate-900 shadow-lg shadow-teal-500/30 hover:bg-teal-400 focus:ring-teal-500/50"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
              <p className="text-center text-sm text-slate-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-teal-400 hover:text-teal-300"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </main>
          <Footer />
        </div>
      </RoleGuard>
    </ErrorBoundary>
  );
}
