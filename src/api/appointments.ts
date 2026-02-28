import api from "@/lib/api";

export interface Appointment {
  _id: string;
  patientId: { _id: string; email: string };
  doctorId: { _id: string; email: string } | null;
  scheduledAt: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  reason?: string;
  diagnosis?: string;
  prescription?: string;
  createdAt: string;
}

export const appointmentsApi = {
  list: () =>
    api.get<{ appointments: Appointment[] }>("/appointments").then((r) => r.data),

  create: (scheduledAt: string, reason?: string) =>
    api
      .post<{ appointment: Appointment }>("/appointments", {
        scheduledAt,
        reason,
      })
      .then((r) => r.data),

  update: (id: string, data: { status?: string; doctorId?: string | null }) =>
    api
      .patch<{ appointment: Appointment }>(`/appointments/${id}`, data)
      .then((r) => r.data),
};
