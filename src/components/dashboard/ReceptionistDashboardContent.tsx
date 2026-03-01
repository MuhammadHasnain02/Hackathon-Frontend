"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { UserPlus, CalendarPlus } from "lucide-react";
import { appointmentsApi } from "@/api/appointments";
import AppointmentsTable from "@/components/appointments/AppointmentsTable";
import Loader from "@/components/common/Loader";

/**
 * Receptionist dashboard: read-only appointments table + patient registration & booking forms.
 * Medical data (diagnosis, prescription) is read-only.
 */
export default function ReceptionistDashboardContent() {
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
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isLoading ? (
          <Loader size="md" label="Loading appointments..." />
        ) : (
          <AppointmentsTable
            appointments={appointments}
            readOnlyMedical
          />
        )}
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
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
              <UserPlus className="h-4 w-4" />
              Register Patient
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
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
              <CalendarPlus className="h-4 w-4" />
              Book Appointment
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
