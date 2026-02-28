"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FileText, Download, Calendar, Activity, CalendarPlus } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { appointmentsApi, type Appointment } from "@/api/appointments";
import Loader from "@/components/common/Loader";

export default function PatientDashboardView() {
  const queryClient = useQueryClient();
  const [scheduledAt, setScheduledAt] = useState("");
  const [reason, setReason] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => appointmentsApi.list(),
  });

  const createMutation = useMutation({
    mutationFn: () => appointmentsApi.create(scheduledAt, reason || undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setScheduledAt("");
      setReason("");
    },
  });

  const appointments = data?.appointments ?? [];

  return (
    <DashboardLayout
      role="patient"
      title="Patient Dashboard"
      subtitle="Your medical history and prescriptions."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center gap-2">
            <CalendarPlus className="h-5 w-5 text-teal-600" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Book Appointment
            </h3>
          </div>
          <form
            className="mt-4 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (scheduledAt) createMutation.mutate();
            }}
          >
            <input
              type="datetime-local"
              required
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <input
              type="text"
              placeholder="Reason (optional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <button
              type="submit"
              disabled={createMutation.isPending || !scheduledAt}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-50"
            >
              <CalendarPlus className="h-4 w-4" /> Book Appointment
            </button>
          </form>
          {createMutation.isSuccess && (
            <p className="mt-2 text-sm text-teal-600 dark:text-teal-400">Appointment requested (pending).</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
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
          {isLoading ? (
            <Loader size="md" className="py-6" />
          ) : (
            <div className="mt-4 space-y-4">
              {appointments.length === 0 ? (
                <p className="text-sm text-slate-500">No appointments yet.</p>
              ) : (
                appointments.map((apt: Appointment) => (
                  <div key={apt._id} className="flex gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/50">
                      <Calendar className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        {new Date(apt.scheduledAt).toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{apt.status}</p>
                      {apt.reason && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{apt.reason}</p>}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2"
        >
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-teal-600" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Prescription PDF
            </h3>
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Download your latest prescription as a PDF.
          </p>
          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <Download className="h-4 w-4" /> Download Prescription
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
