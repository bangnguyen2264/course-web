"use client";

import type React from "react";
import { createContext, useCallback, useEffect, useState } from "react";
import { authService } from "@/services";

import type { AuthContextType, User, RegisterRequest } from "@/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = authService.getUser();
        if (storedUser && authService.isAuthenticated()) {
          setUser(storedUser);
        }
      } catch (err) {
        console.error("Failed to initialize auth:", err);
        authService.logout().catch(() => {});
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to login";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (data: RegisterRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await authService.register(data);
        setUser(response.user);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to register";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );


  const logout = useCallback(() => {
    authService.logout().catch(() => {});
    setUser(null);
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    login,
    register,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
