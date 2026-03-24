export interface DashboardAdminStats {
  totalUsers: number;
  totalSubjects: number;
  totalEnrollments: number;
  totalOrders: number;
  totalRevenue: number;
  newUsersToday: number;
  newEnrollmentsToday: number;
  newOrdersToday: number;
  revenueToday: number;
  newEnrollmentsThisMonth: number;
  revenueThisMonth: number;
}

export type DashboardUserStats = Record<string, unknown>;

export interface DashboardAnalytics {
  totalRevenue: number;
  averageOrderValue: number;
  averageDailyRevenue: number;
  retentionRate: number;
  conversionRate: number;
  totalActiveUsers: number;
  inactiveUsersCount: number;
  completionRate: number;
  notStartedRate: number;
}

export interface DashboardResponse {
  role: string;
  userId: number;
  from: string;
  to: string;
  generatedAt: string;
  admin: DashboardAdminStats | null;
  user: DashboardUserStats | null;
  analytics: DashboardAnalytics | null;
}
