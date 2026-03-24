export type UserRole = "ROLE_ADMIN" | "ROLE_USER";

export interface User {
  id: string;
  fullName: string;
  email: string;
  dob?: Date;
  avatarUrl?: string;
  gender: string;
  phoneNumber?: string;
  address?: string;
  createdAt: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  role?: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  role: UserRole;
  user: User;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dob?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  error: string | null;
}
