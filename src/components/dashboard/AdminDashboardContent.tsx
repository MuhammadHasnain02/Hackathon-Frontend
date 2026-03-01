"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BarChart3,
  Users,
  UserCog,
  Calendar,
  DollarSign,
  Trash2,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import AnalyticsCharts from "@/components/admin/AnalyticsCharts";
import AddStaffModal from "@/components/admin/AddStaffModal";
import { adminApi, type AdminAnalytics, type StaffMember } from "@/api/admin";
import Loader from "@/components/common/Loader";

/**
 * Admin dashboard content: staff management + analytics. No layout/guard.
 */
export default function AdminDashboardContent() {
  const queryClient = useQueryClient();
  const [doctorModalOpen, setDoctorModalOpen] = useState(false);
  const [receptionistModalOpen, setReceptionistModalOpen] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["admin", "analytics"],
    queryFn: adminApi.getAnalytics,
  });

  const { data: staffData, isLoading: staffLoading } = useQuery({
    queryKey: ["admin", "staff"],
    queryFn: adminApi.getStaff,
  });

  const addDoctorMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      adminApi.addDoctor(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "staff"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "analytics"] });
    },
    onError: (err: unknown) => {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : err instanceof Error ? err.message : "Failed to add doctor";
      setModalError(String(msg));
    },
  });

  const addReceptionistMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      adminApi.addReceptionist(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "staff"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "analytics"] });
    },
    onError: (err: unknown) => {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : err instanceof Error ? err.message : "Failed to add receptionist";
      setModalError(String(msg));
    },
  });

  const removeStaffMutation = useMutation({
    mutationFn: adminApi.removeStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "staff"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "analytics"] });
    },
  });

  const staff = staffData?.staff ?? [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsLoading ? (
          <div className="col-span-full flex justify-center py-12">
            <Loader size="lg" label="Loading analytics..." />
          </div>
        ) : analytics ? (
          <>
            <StatCard label="Total Patients" value={analytics.totalPatients} icon={Users} index={0} />
            <StatCard label="Total Doctors" value={analytics.totalDoctors} icon={UserCog} index={1} />
            <StatCard label="Monthly Appointments" value={analytics.monthlyAppointments} icon={Calendar} index={2} />
            <StatCard label="Simulated Revenue" value={`$${analytics.simulatedRevenue}`} icon={DollarSign} index={3} />
          </>
        ) : null}
      </div>

      {analytics && <AnalyticsCharts data={analytics} />}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <BarChart3 className="h-5 w-5 text-teal-600" />
            Staff Management
          </h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setModalError(null); setDoctorModalOpen(true); }}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              <Stethoscope className="h-4 w-4" /> Add Doctor
            </button>
            <button
              type="button"
              onClick={() => { setModalError(null); setReceptionistModalOpen(true); }}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-teal-600 px-4 py-2 text-sm font-semibold text-teal-600 transition hover:bg-teal-50 dark:hover:bg-teal-950"
            >
              <UserCheck className="h-4 w-4" /> Add Receptionist
            </button>
          </div>
        </div>

        {staffLoading ? (
          <Loader size="md" label="Loading staff..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="pb-3 text-left font-medium text-slate-500 dark:text-slate-400">Email</th>
                  <th className="pb-3 text-left font-medium text-slate-500 dark:text-slate-400">Role</th>
                  <th className="pb-3 text-right font-medium text-slate-500 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-slate-500">
                      No staff yet. Add doctors or receptionists above.
                    </td>
                  </tr>
                ) : (
                  staff.map((s: StaffMember) => (
                    <tr key={s._id} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 text-slate-800 dark:text-slate-200">{s.email}</td>
                      <td className="py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                            s.role === "doctor"
                              ? "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300"
                              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                        >
                          {s.role}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={() => removeStaffMutation.mutate(s._id)}
                          disabled={removeStaffMutation.isPending}
                          className="inline-flex items-center gap-1 rounded-lg p-1.5 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50"
                        >
                          <Trash2 className="h-4 w-4" /> Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      <AddStaffModal
        isOpen={doctorModalOpen}
        onClose={() => { setDoctorModalOpen(false); setModalError(null); }}
        role="doctor"
        onSubmit={(email, password) => addDoctorMutation.mutateAsync({ email, password })}
        error={modalError}
        onClearError={() => setModalError(null)}
      />
      <AddStaffModal
        isOpen={receptionistModalOpen}
        onClose={() => { setReceptionistModalOpen(false); setModalError(null); }}
        role="receptionist"
        onSubmit={(email, password) => addReceptionistMutation.mutateAsync({ email, password })}
        error={modalError}
        onClearError={() => setModalError(null)}
      />
    </motion.div>
  );
}
