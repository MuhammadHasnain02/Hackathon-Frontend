"use client";

/**
 * Re-export useAuth from AuthContext for consistent hook imports.
*/
// export { useAuth } from "@/context/AuthContext";
// AuthContext.js

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Agar server-side rendering ho rahi ho to error ki jagah empty object ya null dein
  if (typeof window !== "undefined" && !context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context || {}; // Default empty object taaki destructuring fail na ho
};