// ========== API CONFIGURATION ==========
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";
export const API_TIMEOUT = 30000; // 30 seconds

// ========== HTTP CONSTANTS ==========
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// ========== AUTHENTICATION & AUTHORIZATION ==========
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

export const PERMISSIONS = {
  [USER_ROLES.ADMIN]: [
    "manage-users",
    "manage-courses",
    "manage-reports",
    "view-analytics",
    "view-all",
    "edit-all",
    "delete-all",
    "create-course",
    "edit-course",
    "delete-course",
    "create-user",
    "edit-user",
    "delete-user",
  ],
  [USER_ROLES.USER]: [
    "view-courses",
    "enroll-course",
    "view-progress",
    "submit-assignments",

  ],
} as const;

// ========== DOMAIN STATUS CONSTANTS ==========
export const COURSE_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
  PENDING_APPROVAL: "pending_approval",
  REJECTED: "rejected",
} as const;

export const LESSON_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

export const ENROLLMENT_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  DROPPED: "dropped",
  PAUSED: "paused",
} as const;

export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
  BANNED: "banned",
} as const;

export const PAYMENT_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
  CANCELLED: "cancelled",
} as const;

export const NOTIFICATION_TYPES = {
  COURSE_ENROLLMENT: "course_enrollment",
  COURSE_PUBLISHED: "course_published",
  NEW_LESSON: "new_lesson",
  ASSIGNMENT_GRADED: "assignment_graded",
  CERTIFICATE_EARNED: "certificate_earned",
  COURSE_COMPLETED: "course_completed",
  USER_MESSAGE: "user_message",
  SYSTEM_UPDATE: "system_update",
} as const;

export const COURSE_LEVELS = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
} as const;

// ========== QUERY PARAMETERS ==========
export const QUERY_PARAMS = {
  PAGE: "page",
  PAGE_SIZE: "pageSize",
  SEARCH: "search",
  SORT: "sort",
  ORDER: "order",
  FILTER: "filter",
  CATEGORY: "category",
  LEVEL: "level",
  STATUS: "status",
  ROLE: "role",
  DATE_FROM: "dateFrom",
  DATE_TO: "dateTo",
  PRICE_FROM: "priceFrom",
  PRICE_TO: "priceTo",
} as const;

// ========== STORAGE & TOKENS ==========
export const TOKEN_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER: "user",
} as const;

export const STORAGE_KEYS = {
  THEME: "theme",
  LANGUAGE: "language",
  USER_PREFERENCES: "userPreferences",
  CART: "cart",
  RECENT_COURSES: "recentCourses",
} as const;

// ========== PAGINATION & LIMITS ==========
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

export const RATING = {
  MIN: 1,
  MAX: 5,
} as const;

// ========== SORT & FILTER ==========
export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;

// ========== API RESPONSE STATUS ==========
export const API_STATUS = {
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
  IDLE: "idle",
} as const;

// ========== ERROR MESSAGES ==========
export const ERROR_MESSAGES = {
  // Network errors
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  SERVER_ERROR: "Server error. Please try again later.",
  TIMEOUT_ERROR: "Request timeout. Please try again.",

  // Auth errors
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "Access denied.",
  SESSION_EXPIRED: "Your session has expired. Please login again.",

  // Validation errors
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_PASSWORD:
    "Password must be at least 8 characters with uppercase, lowercase, and number.",
  PASSWORD_MISMATCH: "Passwords do not match.",
  USER_EXISTS: "User with this email already exists.",
  REQUIRED_FIELD: "This field is required.",
  INVALID_INPUT: "Invalid input. Please check and try again.",

  // Resource errors
  NOT_FOUND: "Resource not found.",
  PERMISSION_DENIED: "You do not have permission to perform this action.",
  CONFLICT: "This action conflicts with existing data.",

  // Default
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
} as const;

// ========== SUCCESS MESSAGES ==========
export const SUCCESS_MESSAGES = {
  // Auth
  LOGIN_SUCCESS: "Login successful!",
  REGISTER_SUCCESS: "Registration successful!",
  LOGOUT_SUCCESS: "Logout successful!",

  // Course
  COURSE_CREATED: "Course created successfully!",
  COURSE_UPDATED: "Course updated successfully!",
  COURSE_DELETED: "Course deleted successfully!",
  COURSE_ENROLLED: "Enrolled in course successfully!",
  COURSE_UNENROLLED: "Unenrolled from course successfully!",

  // User
  PROFILE_UPDATED: "Profile updated successfully!",
  PASSWORD_CHANGED: "Password changed successfully!",

  // Learning
  LESSON_COMPLETED: "Lesson marked as completed!",
  QUIZ_SUBMITTED: "Quiz submitted successfully!",
  EXAM_SUBMITTED: "Exam submitted successfully!",

  // General
  REVIEW_SUBMITTED: "Review submitted successfully!",
  PAYMENT_COMPLETED: "Payment completed successfully!",
} as const;

// ========== NAVIGATION ROUTES ==========
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  COURSES: "/courses",
  PROFILE: "/profile",
  ADMIN_USERS: "/admin/users",
  ADMIN_COURSES: "/admin/courses",
  ADMIN_REPORTS: "/admin/reports",
} as const;
