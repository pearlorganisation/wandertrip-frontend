import { axiosInstance } from "@/services/axiosInterceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDestinations = createAsyncThunk(
  "get/alldestination",
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/api/v1/destinations", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
