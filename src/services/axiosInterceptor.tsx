// src/services/axiosInterceptor.ts
import axios, { AxiosInstance } from "axios";

// Optional: type safety for the injected store
import type { Store } from "@reduxjs/toolkit";

let store: Store | undefined;

// Function to inject Redux store for use in interceptors if needed
export const injectStore = (_store: Store) => {
  store = _store;
};

const baseURL =
  import.meta.env.VITE_APP_ENV === "development"
    ? import.meta.env.VITE_APP_BACKEND_DEV_BASE_URL
    : import.meta.env.VITE_APP_BACKEND_PROD_BASE_URL;

// ✅ Create Axios instance with credentials and base URL
export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true, // ✅ Enables cookies for cross-origin requests
});

// Optional: Add interceptors (if needed later for auth, errors, etc.)
// axiosInstance.interceptors.request.use(...)
// axiosInstance.interceptors.response.use(...)
