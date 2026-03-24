import type { User } from "./auth";

export interface UserProfile extends User {
  bio?: string;
  phone?: string;
  address?: string;
  university?: string;
  enrolledCourses?: string[];
  certificates?: string[];
}

export interface UpdateUserProfileRequest {
  name?: string;
  bio?: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

export interface UserStats {
  totalCourses: number;
  completedCourses: number;
  certificatesEarned: number;
  hoursLearned: number;
}
