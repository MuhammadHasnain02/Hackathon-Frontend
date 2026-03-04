"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { UserPlus, CalendarPlus, Calendar } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { appointmentsApi, type Appointment } from "@/api/appointments";
import Loader from "@/components/common/Loader";

/**
 * Receptionist: Read-only appointments table (no medical edit).
 * Can register patients and book appointments.
 */
export default function ReceptionistDashboardView() {
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [bookPatient, setBookPatient] = useState("");
  const [bookDate, setBookDate] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => appointmentsApi.getList(),
  });

  const appointments = data?.appointments ?? [];

  return (
    <DashboardLayout
      role="receptionist"
      title="Receptionist Dashboard"
      subtitle="Patient registration and appointment booking. Read-only access to medical data."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-teal-600" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Patient Registration
            </h3>
          </div>
          <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
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
              <UserPlus className="h-4 w-4" /> Register Patient
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center gap-2">
            <CalendarPlus className="h-5 w-5 text-teal-600" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Appointment Booking
            </h3>
          </div>
          <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
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
              <CalendarPlus className="h-4 w-4" /> Book Appointment
            </button>
          </form>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-teal-600" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            All Appointments (Read-Only)
          </h3>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Medical diagnosis and prescriptions are read-only. Use booking form to create appointments.
        </p>
        {isLoading ? (
          <Loader size="md" label="Loading..." className="py-8" />
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="pb-2 text-left font-medium text-slate-500 dark:text-slate-400">Patient</th>
                  <th className="pb-2 text-left font-medium text-slate-500 dark:text-slate-400">Scheduled</th>
                  <th className="pb-2 text-left font-medium text-slate-500 dark:text-slate-400">Status</th>
                  <th className="pb-2 text-left font-medium text-slate-500 dark:text-slate-400">Diagnosis (read-only)</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500">No appointments.</td>
                  </tr>
                ) : (
                  appointments.map((apt: Appointment) => (
                    <tr key={apt._id} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-2 text-slate-800 dark:text-slate-200">{apt.patientId?.email ?? "—"}</td>
                      <td className="py-2 text-slate-600 dark:text-slate-300">{new Date(apt.scheduledAt).toLocaleString()}</td>
                      <td className="py-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            apt.status === "pending"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50"
                              : apt.status === "confirmed"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50"
                              : apt.status === "cancelled"
                              ? "bg-red-100 text-red-800 dark:bg-red-900/50"
                              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                          }`}
                        >
                          {apt.status === "pending"
                            ? "Pending"
                            : apt.status === "confirmed"
                            ? "Accepted"
                            : apt.status === "cancelled"
                            ? "Declined"
                            : apt.status}
                        </span>
                      </td>
                      <td className="max-w-[200px] truncate py-2 text-slate-500 dark:text-slate-400">{apt.diagnosis || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
