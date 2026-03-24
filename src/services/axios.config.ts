import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";
import type { ApiResponse } from "@/types";
import { API_BASE_URL, API_TIMEOUT, TOKEN_KEYS } from "@/utils/constants";

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor - add auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor - handle errors and token refresh
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiResponse>) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        // Handle 401 Unauthorized - token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = this.getRefreshToken();
            if (refreshToken) {
              // Try to refresh token
              const response = await this.axiosInstance.post<any>("/auth/refresh", {
                refreshToken,
              });

              // Handle both wrapped and unwrapped response
              const responseData = response.data;
              const token = responseData.data?.token || responseData.token;
              
              if (token) {
                this.setAccessToken(token);

                // Retry original request
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return this.axiosInstance(originalRequest);
              }
            }
          } catch {
            // Refresh failed, redirect to login
            this.clearTokens();
            window.location.href = "/login";
          }
        }

        return Promise.reject(error);
      },
    );
  }

  // Token management
  private getAccessToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
    }
    return null;
  }

  private getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
    }
    return null;
  }

  private setAccessToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
    }
  }

  private clearTokens(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(TOKEN_KEYS.USER);
    }
  }

  // HTTP Methods
  get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.axiosInstance.get(url, config).then((res) => this.handleResponse<T>(res));
  }

  post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.axiosInstance.post(url, data, config).then((res) => this.handleResponse<T>(res));
  }

  put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.axiosInstance.put(url, data, config).then((res) => this.handleResponse<T>(res));
  }

  patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.axiosInstance.patch(url, data, config).then((res) => this.handleResponse<T>(res));
  }

  delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.axiosInstance.delete(url, config).then((res) => this.handleResponse<T>(res));
  }

  private handleResponse<T>(res: any): ApiResponse<T> {
    const data = res.data;
    
    // If it's already an ApiResponse (has success or it's a list with data/total)
    // The backend uses 'data' for both payload and lists.
    // If 'success' is present, it's definitely a wrapped response.
    // If 'total' is present, it's a paginated response which we consider wrapped.
    if (data && (data.success !== undefined || data.total !== undefined)) {
      return data as ApiResponse<T>;
    }

    // Special case: if data already has a 'data' property but not success/total
    // it might be a wrapped response from a different endpoint.
    if (data && data.data !== undefined && Object.keys(data).length <= 3) {
       return data as ApiResponse<T>;
    }

    // Otherwise, it's an unwrapped single resource (like AuthResponse or UserResponse)
    // Wrap it so services can continue using response.data
    return {
      success: true,
      data: data as T,
      statusCode: res.status,
      message: data?.message
    };
  }
}

export const apiClient = new ApiClient();
