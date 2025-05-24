import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

// Types
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

interface User {
  name: string;
  email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate backend call
      await new Promise((res) => setTimeout(res, 1000));

      const demoUser = { name: "Demo User", email };
      setUser(demoUser);
      localStorage.setItem("user", JSON.stringify(demoUser));

      toast({ title: "Login Successful", description: "Welcome back!" });
      navigate("/");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Something went wrong. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate backend call
      await new Promise((res) => setTimeout(res, 1000));

      const newUser = { name, email };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      toast({ title: "Account Created", description: "You're logged in!" });
      navigate("/");
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "Something went wrong. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({ title: "Logged out", description: "You have been signed out." });
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
