"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FileText, Download, Calendar, Activity } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { appointmentsApi } from "@/api/appointments";
import AppointmentsTable from "@/components/appointments/AppointmentsTable";
import BookAppointmentForm from "@/components/appointments/BookAppointmentForm";
import Loader from "@/components/common/Loader";
import { User } from "@/types/auth";

/**
 * Patient dashboard: Book Appointment form, own appointments, timeline, profile & PDF.
 */
export default function PatientDashboardContent() {
  const { user } = useAuth() as { user: User };

  const { data, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => appointmentsApi.getList(),
  });

  const appointments = data?.appointments ?? [];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <BookAppointmentForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-teal-600" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Medical History Timeline
            </h3>
          </div>
          <div className="mt-4 space-y-4">
            {appointments.length === 0 ? (
              <p className="text-sm text-slate-500">No appointments yet.</p>
            ) : (
              appointments.slice(0, 5).map((apt) => (
                <div key={apt._id} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/50">
                    <Calendar className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      {apt.reason || "Appointment"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(apt.scheduledAt).toLocaleDateString()} — {apt.status}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {isLoading ? (
          <Loader size="md" label="Loading your appointments..." />
        ) : (
          <AppointmentsTable appointments={appointments} readOnlyMedical />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-teal-600" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Profile & Prescription PDF
          </h3>
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Signed in as <span className="font-medium">{user?.email}</span>
        </p>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          <Download className="h-4 w-4" />
          Download Prescription
        </button>
      </motion.div>
    </div>
  );
}
