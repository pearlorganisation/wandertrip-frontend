// src/redux/auth/authActions.ts
import { axiosInstance } from "@/services/axiosInterceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "auth/signUp",
  async (
    {
      fullName,
      email,
      password,
    }: { fullName: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/signup", {
        fullName,
        email,
        password,
      });
      toast.success("Registration successful!");
      return res.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const LoginUser = createAsyncThunk(
  "auth/signIn",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      };
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          email,
          password,
        },
        config
      );
      toast.success("Login successful!");
      return res.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const ForgetPassword = createAsyncThunk(
  "auth/forgetpaas",
  async ({ email }: { email: string }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axiosInstance.post("/api/v1/auth/forgot-password", {
        email,
      });
      toast.success("otp sended successfully!");
      return res.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "failed to send otp";
      toast.error(message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (
    { email, otp, type }: { email: string; otp: string; type: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/verify-otp",
        {
          email,
          otp,
          type,
        }
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const ResetPaasword = createAsyncThunk(
  "auth/resetpaas",
  async (
    {
      email,
      newPassword,
      confirmNewPassword,
    }: { email: string; newPassword: string; confirmNewPassword: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/reset-password",
        {
          email,
          newPassword,
          confirmNewPassword,
        }
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProfile = createAsyncThunk(
  "get/profile",
  async (_, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axiosInstance.get("/api/v1/users/profile", config);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const changePaas = createAsyncThunk(
  "change",
  async (
    {
      currentPassword,
      newPassword,
      confirmNewPassword,
    }: {
      currentPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    },
    thunkAPI
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axiosInstance.post(
        "/api/v1/users/change-password",
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
        config
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logout = createAsyncThunk("logout/user", async (_, thunkAPI) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const res = await axiosInstance.post(
      "http://localhost:5000/api/v1/auth/logout",
      config
    );
    return null;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// google auth

export const googleLogin = createAsyncThunk(
  "google/login",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/v1/auth/google");
      console.log("data", data);
      return data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Google login failed";

      toast.error(errorMessage); // ✅ show toast

      return rejectWithValue(errorMessage); // ✅ dispatch error to reducer
    }
  }
);
