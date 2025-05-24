import { useAppDispatch } from "@/hooks/dispatchHooks";
import { verifyOtp } from "@/lib/redux/Action/authAction";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
const OTPPage = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const email: string = location.state?.email;
  const type: string = location.state?.type;

  const dispatch = useAppDispatch();
  const handleVerifyOTP = async () => {
    if (!email || !otp || otp.length !== 4) {
      setMessage("Email and valid 4-digit OTP are required");
      return;
    }

    try {
      const res = await dispatch(verifyOtp({ email, otp, type }));

      if (res.payload?.success) {
        toast.success(res.payload.message || "OTP verified successfully");

        if (res.payload.action === "RESET_PASSWORD") {
          navigate("/reset-password", { state: { email } }); // <-- fix typo from "/rest-paasword"
        } else {
          navigate("/login");
        }
      } else {
        setMessage(res.payload?.message || "OTP verification failed");
        toast.error(res.payload?.message || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred during OTP verification");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          OTP Verification
        </h2>

        <label className="block mb-2 font-medium">4-digit OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            setOtp(val.slice(0, 4));
          }}
          maxLength={4}
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border rounded-md mb-4"
        />

        <button
          onClick={handleVerifyOTP}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Verify OTP
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default OTPPage;
