"use client";

import { createContext, useContext, ReactNode } from "react";
import { useMe, useLogin, useRegister, useLogout } from "@/api/queries";
import type { User } from "@/api/auth";
import { ROLE_STORAGE_KEY, type UserRole } from "@/types/auth";

interface AuthContextType {
  user: (User & { role?: UserRole }) | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const hasToken = typeof window !== "undefined" && !!localStorage.getItem("accessToken");
  const meQuery = useMe(hasToken);
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const rawUser = meQuery.data?.user ?? null;
  const loading = hasToken && meQuery.isLoading;

  // Merge role from localStorage (backend may not return it yet)
  const user = rawUser
    ? {
        ...rawUser,
        role:
          rawUser.role ??
          (typeof window !== "undefined"
            ? (localStorage.getItem(ROLE_STORAGE_KEY) as UserRole | null)
            : null) ??
          undefined,
      }
    : null;

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const register = async (email: string, password: string, role?: UserRole) => {
    await registerMutation.mutateAsync({ email, password });
    if (role && typeof window !== "undefined") {
      localStorage.setItem(ROLE_STORAGE_KEY, role);
    }
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    if (typeof window !== "undefined") {
      localStorage.removeItem(ROLE_STORAGE_KEY);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
