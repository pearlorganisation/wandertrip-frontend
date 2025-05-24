
import { toast } from "sonner";
import { API_BASE_URL, API_CONFIG } from "./config";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Base API client for making HTTP requests
 */
class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  /**
   * Set authorization header with token
   */
  setAuthHeader(token: string | null): void {
    if (token) {
      this.defaultHeaders = {
        ...this.defaultHeaders,
        'Authorization': `Bearer ${token}`,
      };
    } else {
      // Remove Authorization header if token is null
      const headers = { ...this.defaultHeaders };
      delete headers['Authorization'];
      this.defaultHeaders = headers;
    }
  }

  /**
   * Make a request to the API
   */
  async request<T>(
    endpoint: string,
    method: string,
    data?: any,
    customHeaders?: HeadersInit
  ): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;

    const headers = {
      ...this.defaultHeaders,
      ...customHeaders,
    };

    const config: RequestInit = {
      method,
      headers,
      credentials: API_CONFIG.withCredentials ? 'include' : 'same-origin',
    };

    if (data && method !== 'GET') {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);
      
      // Check if the response is ok
      if (!response.ok) {
        // Handle different error status codes
        let errorMessage = 'An unexpected error occurred';
        let errorData = null;

        try {
          errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          // If response is not JSON, use statusText
          errorMessage = response.statusText;
        }

        // Handle unauthorized errors (401) - typically for auth issues
        if (response.status === 401) {
          // You might want to trigger a logout or token refresh here
          console.error('Authentication error:', errorMessage);
        }

        throw new ApiError(errorMessage, response.status, errorData);
      }

      // Check if response is empty
      if (response.status === 204) {
        return {} as T;
      }

      // Parse JSON response
      const responseData = await response.json();
      return responseData as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Handle network errors
      console.error('API request failed:', error);
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0
      );
    }
  }

  // HTTP method wrappers
  async get<T>(endpoint: string, customHeaders?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, 'GET', undefined, customHeaders);
  }

  async post<T>(endpoint: string, data?: any, customHeaders?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, 'POST', data, customHeaders);
  }

  async put<T>(endpoint: string, data?: any, customHeaders?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, 'PUT', data, customHeaders);
  }

  async patch<T>(endpoint: string, data?: any, customHeaders?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, 'PATCH', data, customHeaders);
  }

  async delete<T>(endpoint: string, customHeaders?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', undefined, customHeaders);
  }
}

// Create and export the API client instance
export const apiClient = new ApiClient(API_BASE_URL);

/**
 * Hook to use the API client with authentication
 */
export const useApiClient = () => {
  const { user } = useAuth();
  
  // Instead of calling getToken(), we'll use localStorage directly
  // since that's what the AuthContext uses to store auth data
  const updateAuthToken = () => {
    // In AuthContext, the user is stored in localStorage when logged in
    const mockToken = user ? "demo-token-123" : null;
    apiClient.setAuthHeader(mockToken);
  };

  // Update token when hook is used
  updateAuthToken();

  return apiClient;
};
