"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { UserPlus, CalendarPlus } from "lucide-react";
import { useState } from "react";

/**
 * Receptionist dashboard: Patient Registration + Appointment Booking.
 */
export default function ReceptionistDashboardPage() {
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [bookPatient, setBookPatient] = useState("");
  const [bookDate, setBookDate] = useState("");

  return (
    <ErrorBoundary>
      <RoleGuard requireAuth allowedRoles={["receptionist"]}>
        <DashboardLayout
          role="receptionist"
          title="Receptionist Dashboard"
          subtitle="Patient registration and appointment booking."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Patient Registration */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-teal-600" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Patient Registration
                </h3>
              </div>
              <form
                className="mt-4 space-y-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Full name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                >
                  <UserPlus className="h-4 w-4" />
                  Register Patient
                </button>
              </form>
            </div>

            {/* Appointment Booking */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <CalendarPlus className="h-5 w-5 text-teal-600" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Appointment Booking
                </h3>
              </div>
              <form
                className="mt-4 space-y-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Patient name or ID"
                  value={bookPatient}
                  onChange={(e) => setBookPatient(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
                <input
                  type="datetime-local"
                  value={bookDate}
                  onChange={(e) => setBookDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                >
                  <CalendarPlus className="h-4 w-4" />
                  Book Appointment
                </button>
              </form>
            </div>
          </div>
        </DashboardLayout>
      </RoleGuard>
    </ErrorBoundary>
  );
}
