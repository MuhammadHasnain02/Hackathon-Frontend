import api from "@/lib/api";

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  _id: string;
  patientId: { _id: string; email: string };
  doctorId: { _id: string; email: string } | null;
  scheduledAt: string;
  status: AppointmentStatus;
  reason?: string;
  diagnosis?: string;
  prescription?: string;
  createdAt: string;
}

export const appointmentsApi = {
  getList: () =>
    api.get<{ appointments: Appointment[] }>("/appointments").then((r) => r.data),

  create: (data: { scheduledAt: string; reason?: string }) =>
    api
      .post<{ appointment: Appointment }>("/appointments", data)
      .then((r) => r.data),

  update: (
    id: string,
    data: { status?: AppointmentStatus; doctorId?: string | null }
  ) =>
    api
      .patch<{ appointment: Appointment }>(`/appointments/${id}`, data)
      .then((r) => r.data),
};
