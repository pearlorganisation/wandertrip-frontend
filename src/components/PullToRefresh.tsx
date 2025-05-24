
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowDown } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export const PullToRefresh = ({ onRefresh, children }: PullToRefreshProps) => {
  const isMobile = useIsMobile();
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const threshold = 80; // Distance required to trigger refresh

  useEffect(() => {
    if (!isMobile) return;

    let startY = 0;
    let touchMoved = false;

    const handleTouchStart = (e: TouchEvent) => {
      // Only enable pull to refresh when at the top of the page
      if (window.scrollY <= 0) {
        startY = e.touches[0].clientY;
        touchMoved = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY > 0) return; // Don't pull if not at the top

      const currentY = e.touches[0].clientY;
      const distance = currentY - startY;
      
      if (distance > 0) {
        touchMoved = true;
        setPullDistance(Math.min(distance * 0.5, threshold * 1.5)); // Damping effect
        setIsPulling(true);
        
        // Prevent default scrolling when pulling
        if (distance > 10) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = async () => {
      if (isPulling) {
        if (pullDistance >= threshold) {
          // Trigger refresh
          setIsRefreshing(true);
          try {
            await onRefresh();
          } finally {
            setIsRefreshing(false);
          }
        }
        
        // Reset
        setPullDistance(0);
        setIsPulling(false);
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, isPulling, pullDistance, onRefresh, threshold]);

  if (!isMobile) return <>{children}</>;

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 right-0 flex justify-center items-center pointer-events-none"
        animate={{ y: isPulling ? pullDistance - threshold : -threshold }}
      >
        <div className="flex flex-col items-center py-3 px-4">
          <motion.div
            animate={{
              rotate: isRefreshing ? 360 : 0,
              scale: isPulling ? Math.min(pullDistance / threshold, 1) : 0
            }}
            transition={{ 
              rotate: isRefreshing ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 0.2 } 
            }}
            className="text-primary mb-1"
          >
            <ArrowDown size={24} />
          </motion.div>
          <span className="text-xs font-medium text-muted-foreground">
            {isRefreshing ? "Refreshing..." : pullDistance >= threshold ? "Release to refresh" : "Pull to refresh"}
          </span>
        </div>
      </motion.div>
      {children}
    </div>
  );
};
