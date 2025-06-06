import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/Slice/authSlice";
// import otpReducer from "./slice/otpVerificationSlice";
import destinationReducer from "../redux/Slice/destinationSlice";

const rootReducer = combineReducers({
  auth: authReducer, // Add other reducers here
  //   otp: otpReducer,
  destination: destinationReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type
export default rootReducer;
