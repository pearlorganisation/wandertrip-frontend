import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail, User, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAppDispatch } from "@/hooks/dispatchHooks";
import {
  ForgetPassword,
  LoginUser,
  registerUser,
} from "@/lib/redux/Action/authAction";

const Login = () => {
  const { signIn, signUp, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setName] = useState<string>("");
  console.log("is login", isLogin);
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await dispatch(LoginUser({ email, password })).then((res) => {
          if (res.payload.success == true) {
            navigate("/");
          }
        });
      } else if (!isLogin) {
        //    const response = await axios.post("http://localhost:5000/apiv1/auth/signup", {

        // });
        await dispatch(registerUser({ fullName, email, password }) as any).then(
          (res: any) => {
            if (res.payload.success == true) {
              navigate("/verify-otp", { state: { email, type: "REGISTER" } });
            }
          }
        );
        // console.log("Signup successful:", response.data);
      }
      // signUp(fullName, email, password);
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const handleForgetpaasword = () => {
    navigate("/forget-password");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Image Section */}
      <div className="hidden lg:block relative">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          alt="Travel landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30 flex flex-col justify-end p-12">
          <Link to="/" className="text-white text-2xl font-medium mb-8">
            Wander Trip
          </Link>
          <h1 className="text-white text-4xl font-medium mb-4">
            Discover the world with AI-powered travel planning
          </h1>
          <p className="text-white/80 text-lg">
            Join thousands of travelers creating unforgettable experiences.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link to="/" className="text-2xl font-medium">
              Wander Trip
            </Link>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-medium mb-2">
              {isLogin ? "Welcome to the Demo" : "Create a Demo Account"}
            </h2>
            <p className="text-muted-foreground">
              {isLogin
                ? "Sign in with the demo credentials below"
                : "Create a demo account to explore Wander Trip"}
            </p>
          </div>

          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700">
              This is a demo application. Any email and password will work, or
              use the pre-filled values.
            </AlertDescription>
          </Alert>

          <div className="flex border-b border-border mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={cn(
                "flex-1 pb-3 text-sm font-medium transition-colors relative",
                isLogin
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Log In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={cn(
                "flex-1 pb-3 text-sm font-medium transition-colors relative",
                !isLogin
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/** this is for signup */}
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-10 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
                    value={fullName}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button
                    className="text-sm text-primary hover:underline"
                    onClick={handleForgetpaasword}
                  >
                    Forgot password?{" "}
                  </button>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-sm font-medium tracking-wide text-primary-foreground bg-primary rounded-lg transition-colors hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading
                ? "Please wait..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </Button>

            <div className="text-center mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                className="w-full"
              >
                Continue as Guest
              </Button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-background text-xs text-muted-foreground">
                  or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center py-3"
                onClick={() => {
                  toast({
                    title: "Demo Mode",
                    description: "Social login is not available in demo mode.",
                  });
                }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center py-3"
                onClick={() => {
                  toast({
                    title: "Demo Mode",
                    description: "Social login is not available in demo mode.",
                  });
                }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    fill="#1877F2"
                  />
                </svg>
                Facebook
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
