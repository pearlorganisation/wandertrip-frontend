import { useAppDispatch } from "@/hooks/dispatchHooks";
import { ForgetPassword } from "@/lib/redux/Action/authAction";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type FormData = {
  email: string;
};

const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // ✅ move this inside the component

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    dispatch(ForgetPassword({ email: data.email })).then((res) => {
      if (res.payload?.success === true) {
        toast.success("OTP has been sent successfully.");
        navigate("/verify-otp", {
          state: { email: data.email, type: "FORGOT_PASSWORD" },
        });
      } else {
        toast.error("Failed to send OTP.");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
