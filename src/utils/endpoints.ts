/**
 * Consolidated API Endpoints
 * All API endpoints are centralized here
 */

/**
 * API Endpoints - Auth Module
 * Authentication related endpoints
 */
export const AUTH_ENDPOINTS = {
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
  REFRESH: "/api/auth/refresh",
} as const;

/**
 * API Endpoints - User Module
 * User management and profile endpoints
 */
export const USER_ENDPOINTS = {
  LIST: "/api/user",
  CREATE: "/api/user",
  DETAIL: (id: string | number) => `/api/user/${id}`,
  PROFILE: (id: string | number) => `/api/user/${id}`, // Alias for detail
  UPDATE: (id: string | number) => `/api/user/${id}`,
  DELETE: (id: string | number) => `/api/user/${id}`,
  CHANGE_PASSWORD: (id: string | number) => `/api/user/${id}/change-password`,
} as const;

/**
 * API Endpoints - Subject Module (Courses)
 * Subject/Course management endpoints
 */
export const SUBJECT_ENDPOINTS = {
  LIST: "/api/subject",
  CREATE: "/api/subject",
  BATCH_CREATE: "/api/subject/batch",
  DETAIL: (id: string | number) => `/api/subject/${id}`,
  UPDATE: (id: string | number) => `/api/subject/${id}`,
  DELETE: (id: string | number) => `/api/subject/${id}`,
} as const;

/**
 * API Endpoints - Subject Progress Module
 * Track user progress in subjects
 */
export const SUBJECT_PROGRESS_ENDPOINTS = {
  LIST: "/api/subject-progress",
  CREATE: "/api/subject-progress",
  DETAIL: (id: string | number) => `/api/subject-progress/${id}`,
  UPDATE: (id: string | number) => `/api/subject-progress/${id}`,
  DELETE: (id: string | number) => `/api/subject-progress/${id}`,
} as const;

/**
 * API Endpoints - Lesson Module
 * Lesson and lesson content management
 */
export const LESSON_ENDPOINTS = {
  LIST: "/api/lesson",
  CREATE: "/api/lesson",
  BATCH_CREATE: "/api/lesson/batch",
  DETAIL: (id: string | number) => `/api/lesson/${id}`,
  UPDATE: (id: string | number) => `/api/lesson/${id}`,
  DELETE: (id: string | number) => `/api/lesson/${id}`,
} as const;

/**
 * API Endpoints - Lesson Section Module
 * Lesson section/chapter management
 */
export const LESSON_SECTION_ENDPOINTS = {
  LIST: "/api/lesson-section",
  CREATE: "/api/lesson-section",
  BATCH_CREATE: "/api/lesson-section/batch",
  DETAIL: (id: string | number) => `/api/lesson-section/${id}`,
  UPDATE: (id: string | number) => `/api/lesson-section/${id}`,
  DELETE: (id: string | number) => `/api/lesson-section/${id}`,
} as const;

/**
 * API Endpoints - Chapter Module
 * Chapter/Module management
 */
export const CHAPTER_ENDPOINTS = {
  LIST: "/api/chapter",
  CREATE: "/api/chapter",
  BATCH_CREATE: "/api/chapter/batch",
  DETAIL: (id: string | number) => `/api/chapter/${id}`,
  UPDATE: (id: string | number) => `/api/chapter/${id}`,
  DELETE: (id: string | number) => `/api/chapter/${id}`,
} as const;

/**
 * API Endpoints - Quiz Module
 * Quiz management and review
 */
export const QUIZ_ENDPOINTS = {
  LIST: "/api/quiz",
  CREATE: "/api/quiz",
  BATCH_CREATE: "/api/quiz/batch",
  DETAIL: (id: string | number) => `/api/quiz/${id}`,
  UPDATE: (id: string | number) => `/api/quiz/${id}`,
  DELETE: (id: string | number) => `/api/quiz/${id}`,
  REVIEW: "/api/quiz/review",
} as const;

/**
 * API Endpoints - Exam Module
 * Exam management
 */
export const EXAM_ENDPOINTS = {
  LIST: "/api/exam",
  CREATE: "/api/exam",
  DETAIL: (id: string | number) => `/api/exam/${id}`,
  UPDATE: (id: string | number) => `/api/exam/${id}`,
  DELETE: (id: string | number) => `/api/exam/${id}`,
} as const;

/**
 * API Endpoints - Exam Result Module
 * Exam results and submissions
 */
export const EXAM_RESULT_ENDPOINTS = {
  LIST: "/api/exam-result",
  SUBMIT: "/api/exam-result/submit",
  DETAIL: (id: string | number) => `/api/exam-result/${id}`,
  UPDATE: (id: string | number) => `/api/exam-result/${id}`,
  DELETE: (id: string | number) => `/api/exam-result/${id}`,
} as const;

/**
 * API Endpoints - Enrollment Module
 * Student enrollment management
 */
export const ENROLLMENT_ENDPOINTS = {
  LIST: "/api/enrollment",
  CREATE: "/api/enrollment",
  DETAIL: (id: string | number) => `/api/enrollment/${id}`,
  UPDATE: (id: string | number) => `/api/enrollment/${id}`,
  DELETE: (id: string | number) => `/api/enrollment/${id}`,
} as const;

/**
 * API Endpoints - Payment Module
 * Payment and billing management
 */
export const PAYMENT_ENDPOINTS = {
  LIST: "/api/payment",
  CREATE: "/api/payment",
  DETAIL: (id: string | number) => `/api/payment/${id}`,
  UPDATE: (id: string | number) => `/api/payment/${id}`,
  DELETE: (id: string | number) => `/api/payment/${id}`,
  INITIATE: "/api/payment/initiate",
  CONFIRM: "/api/payment/confirm",
  CANCEL: (paymentId: string | number) => `/api/payment/${paymentId}/cancel`,
  REFUND: (paymentId: string | number) => `/api/payment/${paymentId}/refund`,
  GET_TRANSACTION: (transactionId: string | number) =>
    `/api/payment/transaction/${transactionId}`,
  GET_LOGS: "/api/payment/logs",
} as const;

/**
 * API Endpoints - Order Module
 * Order management
 */
export const ORDER_ENDPOINTS = {
  LIST: "/api/order",
  CREATE: "/api/order",
  DETAIL: (id: string | number) => `/api/order/${id}`,
  UPDATE: (id: string | number) => `/api/order/${id}`,
  DELETE: (id: string | number) => `/api/order/${id}`,
} as const;

/**
 * API Endpoints - Order Item Module
 * Order items/line items
 */
export const ORDER_ITEM_ENDPOINTS = {
  LIST: "/api/order-item",
  CREATE: "/api/order-item",
  DETAIL: (id: string | number) => `/api/order-item/${id}`,
  UPDATE: (id: string | number) => `/api/order-item/${id}`,
  DELETE: (id: string | number) => `/api/order-item/${id}`,
  GET_BY_ORDER: (orderId: string | number) =>
    `/api/order-item/order/${orderId}`,
} as const;

/**
 * API Endpoints - Media Module
 * File upload and media management
 */
export const MEDIA_ENDPOINTS = {
  UPLOAD_PUBLIC: "/api/media/upload/public",
  UPLOAD_PRIVATE: "/api/media/upload/private",
  GET_PUBLIC: (id: string | number) => `/api/media/public/${id}`,
  GET_PRIVATE: (id: string | number) => `/api/media/private/${id}`,
  DELETE_PUBLIC: (id: string | number) => `/api/media/public/${id}`,
  DELETE_PRIVATE: (id: string | number) => `/api/media/private/${id}`,
} as const;

/**
 * Aggregated API Endpoints
 * Access all endpoints through this centralized object
 */
export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  USER: USER_ENDPOINTS,
  SUBJECT: SUBJECT_ENDPOINTS,
  SUBJECT_PROGRESS: SUBJECT_PROGRESS_ENDPOINTS,
  LESSON: LESSON_ENDPOINTS,
  LESSON_SECTION: LESSON_SECTION_ENDPOINTS,
  CHAPTER: CHAPTER_ENDPOINTS,
  QUIZ: QUIZ_ENDPOINTS,
  EXAM: EXAM_ENDPOINTS,
  EXAM_RESULT: EXAM_RESULT_ENDPOINTS,
  ENROLLMENT: ENROLLMENT_ENDPOINTS,
  PAYMENT: PAYMENT_ENDPOINTS,
  ORDER: ORDER_ENDPOINTS,
  ORDER_ITEM: ORDER_ITEM_ENDPOINTS,
  MEDIA: MEDIA_ENDPOINTS,
} as const;
