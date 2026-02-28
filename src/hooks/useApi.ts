"use client";

import { useCallback, useState } from "react";

interface UseApiState<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

interface UseApiReturn<T, P extends unknown[]> extends UseApiState<T> {
  execute: (...args: P) => Promise<T | null>;
  reset: () => void;
}

/**
 * Generic hook for API calls with loading and error state.
 * Use for one-off mutations or async operations.
 */
export function useApi<T, P extends unknown[]>(
  apiFn: (...args: P) => Promise<T>
): UseApiReturn<T, P> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(
    async (...args: P): Promise<T | null> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const data = await apiFn(...args);
        setState({ data, error: null, isLoading: false });
        return data;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setState((prev) => ({ ...prev, error: message, isLoading: false }));
        return null;
      }
    },
    [apiFn]
  );

  const reset = useCallback(() => {
    setState({ data: null, error: null, isLoading: false });
  }, []);

  return { ...state, execute, reset };
}
