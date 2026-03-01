"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle } from "lucide-react";
import type { Appointment } from "@/api/appointments";

interface AppointmentsTableProps {
  appointments: Appointment[];
  /** Doctor can confirm pending appointments */
  showConfirmAction?: boolean;
  onConfirm?: (id: string) => void;
  confirmingId?: string | null;
  /** Receptionist: read-only, hide diagnosis/prescription edit */
  readOnlyMedical?: boolean;
}

function formatDate(d: string) {
  return new Date(d).toLocaleString(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function AppointmentsTable({
  appointments,
  showConfirmAction = false,
  onConfirm,
  confirmingId = null,
  readOnlyMedical = false,
}: AppointmentsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden"
    >
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50">
        <Calendar className="h-5 w-5 text-teal-600" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Appointments
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">
                Date & Time
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">
                Patient
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">
                Doctor
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">
                Status
              </th>
              {!readOnlyMedical && (
                <>
                  <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">
                    Reason
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">
                    Diagnosis
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">
                    Prescription
                  </th>
                </>
              )}
              {readOnlyMedical && (
                <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">
                  Reason
                </th>
              )}
              {showConfirmAction && (
                <th className="px-4 py-3 text-right font-medium text-slate-500 dark:text-slate-400">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    (readOnlyMedical ? 5 : 7) + (showConfirmAction ? 1 : 0)
                  }
                  className="px-4 py-8 text-center text-slate-500"
                >
                  No appointments.
                </td>
              </tr>
            ) : (
              appointments.map((apt) => (
                <tr
                  key={apt._id}
                  className="border-b border-slate-100 dark:border-slate-800"
                >
                  <td className="px-4 py-3 text-slate-800 dark:text-slate-200 whitespace-nowrap">
                    {formatDate(apt.scheduledAt)}
                  </td>
                  <td className="px-4 py-3 text-slate-800 dark:text-slate-200">
                    {typeof apt.patientId === "object" ? apt.patientId?.email : "-"}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {apt.doctorId && typeof apt.doctorId === "object"
                      ? apt.doctorId.email
                      : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        apt.status === "confirmed"
                          ? "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300"
                          : apt.status === "completed"
                            ? "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                            : apt.status === "cancelled"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>
                  {!readOnlyMedical && (
                    <>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-[120px] truncate">
                        {apt.reason || "-"}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-[120px] truncate">
                        {apt.diagnosis || "-"}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-[120px] truncate">
                        {apt.prescription || "-"}
                      </td>
                    </>
                  )}
                  {readOnlyMedical && (
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-[180px] truncate">
                      {apt.reason || "-"}
                    </td>
                  )}
                  {showConfirmAction && (
                    <td className="px-4 py-3 text-right">
                      {apt.status === "pending" && (
                        <button
                          type="button"
                          onClick={() => onConfirm?.(apt._id)}
                          disabled={confirmingId === apt._id}
                          className="inline-flex items-center gap-1 rounded-lg bg-teal-600 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-teal-700 disabled:opacity-50"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          {confirmingId === apt._id ? "Confirming..." : "Confirm"}
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
