"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

/**
 * Landing page with AI Clinic Management theme.
 * Public route - redirects authenticated users to dashboard.
 */
export default function HomePage() {
  return (
    <ErrorBoundary>
      <RoleGuard>
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
          <Navbar />
          <main>
            <Hero />
            <Features />
            <CTA />
          </main>
          <Footer />
        </div>
      </RoleGuard>
    </ErrorBoundary>
  );
}
