import type { UserRole } from "@/types";
import { PERMISSIONS } from "./constants";

/**
 * Check if user has permission to perform an action
 */
export function hasPermission(role: UserRole, permission: string): boolean {
  const rolePermissions =
    (PERMISSIONS[role as keyof typeof PERMISSIONS] as unknown as string[]) ||
    [];
  return rolePermissions.includes(permission);
}

/**
 * Check if user has any of the specified roles
 */
export function hasRole(userRole: UserRole, ...roles: UserRole[]): boolean {
  return roles.includes(userRole);
}

/**
 * Format error message from API response
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return "An unexpected error occurred";
}

/**
 * Delay function for async operations
 */
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if user is admin
 */
export function isAdmin(role: UserRole): boolean {
  return role === "ROLE_ADMIN";
}

/**
 * Check if user is User
 */
export function isUser(role: UserRole): boolean {
  return role === "ROLE_USER";
}
