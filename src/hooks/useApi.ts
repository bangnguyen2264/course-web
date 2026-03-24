"use client";

import type { AxiosError } from "axios";
import { useCallback, useState } from "react";

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | AxiosError | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: () => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook to handle API calls with loading and error states
 */
export function useApi<T = unknown>(
  callback: () => Promise<T>,
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, isLoading: true, error: null });

    try {
      const result = await callback();
      setState({ data: result, isLoading: false, error: null });
    } catch (err) {
      setState({
        data: null,
        isLoading: false,
        error: err instanceof Error ? err : new Error("Unknown error"),
      });
    }
  }, [callback]);

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
