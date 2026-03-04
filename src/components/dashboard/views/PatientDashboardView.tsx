"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FileText, Download, Calendar, Activity, CalendarPlus, Trash2, XCircle } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { appointmentsApi, type Appointment } from "@/api/appointments";
import Loader from "@/components/common/Loader";
import axios from "axios";

export default function PatientDashboardView() {
  const queryClient = useQueryClient();
  const [scheduledAt, setScheduledAt] = useState("");
  const [reason, setReason] = useState("");

  const [doctorId, setDoctorId] = useState("" as string); // Selected Doctor ID
  const [doctors, setDoctors] = useState<{ _id: string; email: string }[]>([]);

  // Fetch Doctors List

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // LocalStorage se token nikaalein
        const token = localStorage.getItem("accessToken");
        
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/doctors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setDoctors(res.data.doctors || []);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      }
    };
    
    fetchDoctors();
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => appointmentsApi.getList(),
  });

  const createMutation = useMutation({
    mutationFn: () => appointmentsApi.create({ scheduledAt, reason: reason || undefined , doctorId: doctorId || undefined }),
    // mutationFn: () => appointmentsApi.create({ scheduledAt, reason: reason || undefined }),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setScheduledAt("");
      setReason("");
      setDoctorId("");
    },
  });

  const cancelMutation = useMutation({
    mutationFn: (id: string) => appointmentsApi.update(id, { status: "cancelled" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => appointmentsApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] }),
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
            {/* Doctor Selection Dropdown */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Select Doctor</label>
              <select
                required
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="">-- Choose a Doctor --</option>
                {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.email}
                  </option>
                ))}
              </select>
            </div>

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
                  <div key={apt._id} className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/50">
                      <Calendar className="h-5 w-5 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        {new Date(apt.scheduledAt).toLocaleString()}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
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
                        {apt.reason && (
                          <span className="text-xs text-slate-400 dark:text-slate-400">
                            • {apt.reason}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {apt.status === "pending" && (
                        <button
                          type="button"
                          onClick={() => cancelMutation.mutate(apt._id)}
                          disabled={cancelMutation.isPending}
                          className="inline-flex items-center gap-1 rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:bg-slate-700 disabled:opacity-50"
                        >
                          <XCircle className="h-4 w-4" /> Cancel
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => deleteMutation.mutate(apt._id)}
                        disabled={deleteMutation.isPending}
                        className="inline-flex items-center gap-1 rounded-xl bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
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
