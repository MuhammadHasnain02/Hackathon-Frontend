"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentsApi } from "@/api/appointments";

// import { useQuery } from "@tanstack/react-query";
// import { doctorsApi } from "@/api/doctors"; // Assume karein ke ye API bani hui hai

export default function BookAppointmentForm() {
  const queryClient = useQueryClient();
  const [scheduledAt, setScheduledAt] = useState("");
  const [reason, setReason] = useState("");

  const createMutation = useMutation({
    mutationFn: (data: { scheduledAt: string; reason?: string }) =>
      appointmentsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setScheduledAt("");
      setReason("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduledAt) return;
    createMutation.mutate({ scheduledAt, reason: reason || undefined });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-center gap-2 mb-4">
        <CalendarPlus className="h-5 w-5 text-teal-600" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Book Appointment
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
            Date & Time
          </label>
          <input
            type="datetime-local"
            required
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
            Reason (optional)
          </label>
          <input
            type="text"
            placeholder="e.g. General checkup"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
        {createMutation.isError && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {(createMutation.error as Error).message}
          </p>
        )}
        {createMutation.isSuccess && (
          <p className="text-sm text-teal-600 dark:text-teal-400">
            Appointment requested. Status: pending.
          </p>
        )}
        <button
          type="submit"
          disabled={createMutation.isPending || !scheduledAt}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-50"
        >
          <CalendarPlus className="h-4 w-4" />
          {createMutation.isPending ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </motion.div>
  );
}
