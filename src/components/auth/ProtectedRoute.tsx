"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useAuth } from "@/hooks";
import type { UserRole } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
}) => {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  // Still loading auth state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full mb-3" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    router.replace("/login");
    return null;
  }

  // Check role-based access
  if (requiredRoles && user && (!user.role || !requiredRoles.includes(user.role))) {
    router.replace("/dashboard");
    return null;
  }

  return <>{children}</>;
};
