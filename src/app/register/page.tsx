"use client";

import { redirect } from "next/navigation";

export default function LegacyRegisterPage() {
  // Keep /register as a thin wrapper that forwards to /signup
  redirect("/signup");
}

