
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { Wifi, WifiOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export const ConnectivityStatus = () => {
  const isOnline = useOnlineStatus();
  const [showToast, setShowToast] = useState(false);
  
  useEffect(() => {
    // Only show toast when status changes, not on initial load
    if (showToast) {
      if (isOnline) {
        toast({
          title: "You're back online",
          description: "Your internet connection has been restored.",
          duration: 3000,
        });
      } else {
        toast({
          title: "You're offline",
          description: "Some features may be limited until you reconnect.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } else {
      setShowToast(true);
    }
  }, [isOnline]);

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full flex items-center shadow-lg animate-pulse">
        <WifiOff size={16} className="mr-2" />
        <span className="text-sm font-medium">Offline Mode</span>
      </div>
    </div>
  );
};
