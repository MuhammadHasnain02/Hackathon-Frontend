import api from "@/lib/api";

export interface AdminAnalytics {
  totalPatients: number;
  totalDoctors: number;
  totalReceptionists: number;
  monthlyAppointments: number;
  simulatedRevenue: number;
}

export interface StaffMember {
  _id: string;
  email: string;
  role: "doctor" | "receptionist";
  createdAt: string;
}

export const adminApi = {
  getAnalytics: () =>
    api.get<AdminAnalytics>("/admin/analytics").then((r) => r.data),

  getStaff: () =>
    api.get<{ staff: StaffMember[] }>("/admin/staff").then((r) => r.data),

  addDoctor: (email: string, password: string) =>
    api.post("/admin/staff/doctor", { email, password }).then((r) => r.data),

  addReceptionist: (email: string, password: string) =>
    api.post("/admin/staff/receptionist", { email, password }).then((r) => r.data),

  removeStaff: (id: string) =>
    api.delete(`/admin/staff/${id}`).then((r) => r.data),
};
