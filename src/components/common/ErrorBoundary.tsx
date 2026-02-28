"use client";

import { Component, type ReactNode } from "react";
import { Button } from "./Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary to catch React errors and display a fallback UI.
 * Wrap route-level or feature-level components for graceful degradation.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-8 dark:border-red-900/50 dark:bg-red-950/30">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
              Something went wrong
            </h3>
            <p className="mt-2 text-sm text-red-600 dark:text-red-300">
              {this.state.error.message}
            </p>
          </div>
          <Button variant="outline" onClick={this.handleRetry}>
            Try again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
