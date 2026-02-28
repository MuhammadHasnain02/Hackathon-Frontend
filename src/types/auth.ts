// /**
//  * User roles for role-based access control.
//  * Backend may not return role yet; we persist it in localStorage on signup.
//  */
// export type UserRole = "admin" | "doctor" | "patient";

// export interface User {
//   id: string;
//   email: string;
//   role?: UserRole;
// }

// export const ROLE_LABELS: Record<UserRole, string> = {
//   admin: "Admin",
//   doctor: "Doctor",
//   patient: "Patient",
// };

// export const ROLE_STORAGE_KEY = "userRole";


/**
 * User roles for role-based access control.
 * Updated to include all 4 mandatory roles from hackathon requirements. [cite: 25]
 */
export type UserRole = "admin" | "doctor" | "receptionist" | "patient";

export interface User {
  id: string;
  email: string;
  role?: UserRole;
}

// Labels for UI display [cite: 59, 83]
export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Admin",
  doctor: "Doctor",
  receptionist: "Receptionist",
  patient: "Patient",
};

// Single dashboard path for all roles (RBAC via conditional rendering)
export const ROLE_DASHBOARD: Record<UserRole, string> = {
  admin: "/dashboard",
  doctor: "/dashboard",
  receptionist: "/dashboard",
  patient: "/dashboard",
};

export const ROLE_STORAGE_KEY = "userRole";