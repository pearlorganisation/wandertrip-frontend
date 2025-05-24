import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import TripPlannerPage from "./pages/TripPlannerPage";
import BookingPage from "./pages/BookingPage";
import ItineraryDetailsPage from "./pages/ItineraryDetailsPage";
import ItineraryPage from "./pages/ItineraryPage";
import OnTripAssistancePage from "./pages/OnTripAssistancePage";
import LuxuryConcierge from "./pages/LuxuryConcierge";
import SocialSharing from "./pages/SocialSharing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import EmergencyAssistance from "./pages/EmergencyAssistance";
import DestinationDetailsPage from "./pages/DestinationDetailsPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ThingsToDoPage from "./pages/ThingsToDoPage";
import ActivityDetailsPage from "./pages/ActivityDetailsPage";
import TravelSafetyPage from "./pages/TravelSafetyPage";
import TravelTimeline from "./components/TravelTimeline";
import Wallet from "./pages/Wallet";
import MysteryTrip from "./components/MysteryTrip";
import { AppInstallPrompt } from "./components/AppInstallPrompt";
import { ConnectivityStatus } from "./components/ConnectivityStatus";
import { MobileAppNavBar } from "./components/MobileAppNavBar";
import { useIsMobile } from "./hooks/use-mobile";

// Import framer-motion to enhance animations
import { MotionConfig } from "framer-motion";
import OTPPage from "./pages/otpPage";

import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordForm from "./pages/ForgetPaas";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// Mobile app layout wrapper
const MobileAppLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? "pb-16 min-h-screen" : ""}>
      {children}
      <MobileAppNavBar />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <HelmetProvider>
            <MotionConfig reducedMotion="user">
              <Toaster />
              <Sonner position="top-right" closeButton />
              <AppInstallPrompt />
              <ConnectivityStatus />
              <MobileAppLayout>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/destinations" element={<Destinations />} />
                  <Route
                    path="/destination/:id"
                    element={<DestinationDetailsPage />}
                  />
                  <Route path="/trip-planner" element={<TripPlannerPage />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/verify-otp" element={<OTPPage />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route
                    path="/forget-password"
                    element={<ForgotPasswordForm />}
                  />
                  <Route
                    path="/reset-password"
                    element={<ResetPasswordPage />}
                  />
                  {/* Content pages */}
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/things-to-do" element={<ThingsToDoPage />} />
                  <Route path="/activities" element={<ActivityDetailsPage />} />
                  <Route path="/travel-safety" element={<TravelSafetyPage />} />
                  <Route
                    path="/memories"
                    element={
                      <div className="pt-16 pb-16 bg-background min-h-screen">
                        <TravelTimeline />
                      </div>
                    }
                  />

                  {/* Emergency */}
                  <Route
                    path="/emergency-assistance"
                    element={<EmergencyAssistance />}
                  />

                  {/* Protected routes - require login */}
                  <Route
                    path="/itinerary"
                    element={
                      <ProtectedRoute>
                        <ItineraryPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/itinerary/:id"
                    element={
                      <ProtectedRoute>
                        <ItineraryDetailsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/on-trip-assistance"
                    element={
                      <ProtectedRoute>
                        <OnTripAssistancePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/luxury-concierge"
                    element={
                      <ProtectedRoute>
                        <LuxuryConcierge />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/social-sharing"
                    element={
                      <ProtectedRoute>
                        <SocialSharing />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/rewards"
                    element={
                      <ProtectedRoute>
                        <Rewards />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/MysteryTrip"
                    element={
                      <ProtectedRoute>
                        <MysteryTrip />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/wallet"
                    element={
                      <ProtectedRoute>
                        <Wallet />
                      </ProtectedRoute>
                    }
                  />

                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MobileAppLayout>
            </MotionConfig>
          </HelmetProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
