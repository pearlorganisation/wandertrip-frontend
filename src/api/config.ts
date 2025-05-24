
/**
 * API configuration for different environments
 */

// Base API URLs for different environments
const API_URLS = {
  development: 'http://localhost:8000/api',
  test: 'https://test-api.wandertrip.app/api',
  production: 'https://api.wandertrip.app/api',
};

// Determine the current environment
const ENV = import.meta.env.MODE || 'development';

// Export the configuration
export const API_CONFIG = {
  baseURL: API_URLS[ENV as keyof typeof API_URLS],
  timeout: 30000, // 30 seconds
  withCredentials: true, // Include cookies in requests
};

// API version
export const API_VERSION = 'v1';

// Full API URL with version
export const API_BASE_URL = `${API_CONFIG.baseURL}/${API_VERSION}`;
