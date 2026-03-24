import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "@/types";
import { AUTH_ENDPOINTS } from "@/utils/endpoints";
import { TOKEN_KEYS } from "@/utils/constants";
import { apiClient } from "./axios.config";

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<any>(
      AUTH_ENDPOINTS.LOGIN,
      credentials,
    );

    // Flexible handling for wrapped vs unwrapped responses
    const data = response.data || response;

    if (!data || !data.token || !data.user) {
      const errorMsg = response.message || "Invalid credentials or server error";
      throw new Error(errorMsg);
    }

    this.saveTokens(data.token, data.refreshToken);
    this.saveUser(data.user);

    return data as LoginResponse;
  }

  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await apiClient.post<any>(
      AUTH_ENDPOINTS.REGISTER,
      data,
    );

    // Flexible handling for wrapped vs unwrapped responses
    const dataResponse = response.data || response;

    if (!dataResponse || !dataResponse.token || !dataResponse.user) {
      const errorMsg = response.message || "Registration failed";
      throw new Error(errorMsg);
    }

    this.saveTokens(dataResponse.token, dataResponse.refreshToken);
    this.saveUser(dataResponse.user);

    return dataResponse as LoginResponse;
  }

  async logout(): Promise<void> {
    try {
      // Note: LOGOUT endpoint not in API_ENDPOINTS yet, using manual path
      await apiClient.post("/api/auth/logout");
    } finally {
      this.clearTokens();
    }
  }

  async getMe(): Promise<User> {
    // Note: ME endpoint not in API_ENDPOINTS yet, using manual path
    const response = await apiClient.get<any>("/api/auth/me");
    const data = response.data || response;
    return data as User;
  }

  async refreshToken(refreshToken: string): Promise<string> {
    const response = await apiClient.post<any>(
      AUTH_ENDPOINTS.REFRESH,
      { refreshToken },
    );
    const data = response.data || response;
    return data.token;
  }

  // Token management
  private saveTokens(accessToken: string, refreshToken?: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
      if (refreshToken) {
        localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
      }
    }
  }

  private saveUser(user: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEYS.USER, JSON.stringify(user));
    }
  }

  private clearTokens(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(TOKEN_KEYS.USER);
    }
  }

  getAccessToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
    }
    return null;
  }

  getUser(): User | null {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem(TOKEN_KEYS.USER);
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }
}

export const authService = new AuthService();
