"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar, Stethoscope, Send, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { appointmentsApi, type Appointment } from "@/api/appointments";
import Loader from "@/components/common/Loader";

export default function DoctorDashboardView() {
  const queryClient = useQueryClient();
  const [diagnosisInput, setDiagnosisInput] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => appointmentsApi.getList(),
  });

  const confirmMutation = useMutation({
    mutationFn: (id: string) => appointmentsApi.update(id, { status: "confirmed" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });

  const appointments = data?.appointments ?? [];

  return (
    <DashboardLayout
      role="doctor"
      title="Doctor Dashboard"
      subtitle="Appointments and AI-assisted diagnosis."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-teal-600" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              My Appointments
            </h3>
          </div>
          {isLoading ? (
            <Loader size="md" label="Loading..." className="py-8" />
          ) : (
            <div className="mt-4 space-y-3">
              {appointments.length === 0 ? (
                <p className="py-4 text-sm text-slate-500">No appointments assigned yet.</p>
              ) : (
                appointments.map((apt: Appointment) => (
                  <div
                    key={apt._id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        {apt.patientId?.email ?? "—"}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(apt.scheduledAt).toLocaleString()} · {apt.reason || "—"}
                      </p>
                      <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${apt.status === "pending" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50" : "bg-teal-100 text-teal-700 dark:bg-teal-900/50"}`}>
                        {apt.status}
                      </span>
                    </div>
                    {apt.status === "pending" && (
                      <button
                        type="button"
                        onClick={() => confirmMutation.mutate(apt._id)}
                        disabled={confirmMutation.isPending}
                        className="inline-flex items-center gap-1 rounded-xl bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-teal-700 disabled:opacity-50"
                      >
                        <CheckCircle className="h-4 w-4" /> Accept / Confirm
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-teal-600" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              AI Diagnosis
            </h3>
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Enter symptoms for AI-assisted differential diagnosis.
          </p>
          <textarea
            value={diagnosisInput}
            onChange={(e) => setDiagnosisInput(e.target.value)}
            placeholder="e.g. headache, fever, fatigue for 3 days..."
            rows={4}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <Send className="h-4 w-4" /> Get AI Suggestions
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
