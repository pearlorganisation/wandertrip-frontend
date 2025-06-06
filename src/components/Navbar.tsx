import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  ChevronDown,
  Search,
  Map,
  Compass,
  PlaneTakeoff,
  Home,
  Wallet,
  Settings,
  BookOpen,
  AlertCircle,
  Crown,
  Calendar,
  Heart,
  LogOut,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/dispatchHooks";
import { getProfile, logout } from "@/lib/redux/Action/authAction";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.auth.user);

  const [shareInProgress, setShareInProgress] = useState<boolean>(false);
  const [shareType, setShareType] = useState<string>("");

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    const checkShareStatus = () => {
      const status = localStorage.getItem("shareStatus");
      if (status) {
        const { inProgress, type } = JSON.parse(status);
        setShareInProgress(inProgress);
        setShareType(type);
      }
    };

    checkShareStatus();
    window.addEventListener("focus", checkShareStatus);
    return () => window.removeEventListener("focus", checkShareStatus);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavigation = (path: string, event?: React.MouseEvent) => {
    if (event) event.preventDefault();
    try {
      navigate(path);
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Navigation failed. Please try again.");
    }
  };

  const handleSignOut = () => {
    // localStorage.removeItem("token");
    dispatch(logout()).then((res: any) => {
      if (res?.payload?.success == true) {
        toast.success("Signed out successfully.");
        navigate("/login");
      }
    });
  };

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/destinations", label: "Explore", icon: Map },
    { path: "/trip-planner", label: "Plan Trip", icon: PlaneTakeoff },
    { path: "/itinerary", label: "My Trips", icon: Calendar },
    { path: "/luxury-concierge", label: "Concierge", icon: Crown },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300",
        isHomePage
          ? scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm"
            : "bg-black/40 backdrop-blur-sm text-sm"
          : "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/30"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        <Link
          to="/"
          className={cn(
            "flex items-center space-x-2",
            isHomePage && !scrolled ? "text-white" : "text-foreground"
          )}
        >
          <span className="font-medium text-lg">
            Wander<span className="font-bold text-primary">Trip</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-1.5",
                isActive(link.path)
                  ? isHomePage && !scrolled
                    ? "bg-white/20 text-white font-semibold"
                    : "bg-primary/10 text-primary font-semibold"
                  : isHomePage && !scrolled
                  ? "text-white/90 hover:text-white hover:bg-white/10"
                  : "text-foreground/80 hover:text-foreground hover:bg-accent/50"
              )}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}

          {users?.data?.fullName && (
            <Link
              to="/wallet"
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-1.5",
                isActive("/wallet")
                  ? isHomePage && !scrolled
                    ? "bg-white/20 text-white font-semibold"
                    : "bg-primary/10 text-primary font-semibold"
                  : isHomePage && !scrolled
                  ? "text-white/90 hover:text-white hover:bg-white/10"
                  : "text-foreground/80 hover:text-foreground hover:bg-accent/50"
              )}
            >
              <Wallet className="w-4 h-4" />
              Wallet
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-2">
          {shareInProgress && (
            <Link
              to="/social-sharing"
              className="hidden sm:inline-flex items-center h-9 px-3 text-sm font-medium rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
            >
              <Crown size={16} className="mr-1.5 text-amber-500" />
              <span>{shareType} Share in Progress</span>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            className={cn(
              isHomePage && !scrolled
                ? "text-white/90 hover:text-white hover:bg-white/10"
                : "text-foreground/80 hover:text-foreground hover:bg-accent/50"
            )}
            aria-label="Search"
          >
            <Search size={18} />
          </Button>

          {users?.data?.fullName ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "gap-2",
                    isHomePage && !scrolled
                      ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      : "bg-background border-input text-foreground hover:bg-accent"
                  )}
                >
                  <User size={16} />
                  <span className="hidden sm:inline">
                    {users?.data?.fullName}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer w-full">
                      <User size={16} className="mr-2" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/itinerary" className="cursor-pointer w-full">
                      <Calendar size={16} className="mr-2" />
                      <span>My Trips</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/social-sharing"
                      className="cursor-pointer w-full"
                    >
                      <Share2 size={16} className="mr-2" />
                      <span>Share Journey</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/destinations" className="cursor-pointer w-full">
                      <Heart size={16} className="mr-2" />
                      <span>Saved Destinations</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer w-full">
                      <Settings size={16} className="mr-2" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut size={16} className="mr-2" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className={cn(
                "inline-flex items-center justify-center h-9 px-4 text-sm font-medium tracking-wide transition-colors rounded-full",
                isHomePage && !scrolled
                  ? "bg-white text-primary hover:bg-white/90"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
