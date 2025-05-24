import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/Slice/authSlice";
// import otpReducer from "./slice/otpVerificationSlice";
import userReducer from "../redux/Slice/authSlice";
const rootReducer = combineReducers({
  auth: authReducer, // Add other reducers here
  //   otp: otpReducer,
  usersProfile: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type
export default rootReducer;
