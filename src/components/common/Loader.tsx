"use client";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const sizeClasses = {
  sm: "h-6 w-6 border-2",
  md: "h-10 w-10 border-2",
  lg: "h-14 w-14 border-3",
};

/**
 * Reusable loading spinner with optional label.
 * Use for async operations, route transitions, and skeleton fallbacks.
 */
export default function Loader({ size = "md", label, className = "" }: LoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-label={label ?? "Loading"}
    >
      <div
        className={`animate-spin rounded-full border-teal-600 border-t-transparent ${sizeClasses[size]}`}
      />
      {label && (
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {label}
        </p>
      )}
    </div>
  );
}
