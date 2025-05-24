
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftAction?: string;
  rightAction?: string;
  threshold?: number;
  className?: string;
  disableDrag?: boolean;
  disableSwipe?: boolean;
}

export const SwipeableCard = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftAction = "Delete",
  rightAction = "Archive",
  threshold = 100,
  className = "",
  disableDrag = false,
  disableSwipe = false
}: SwipeableCardProps) => {
  const controls = useAnimation();
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const isMobile = useIsMobile();
  const [isDragging, setIsDragging] = useState(false);
  
  useEffect(() => {
    controls.start({ x: 0 });
  }, [controls]);
  
  if (!isMobile || disableSwipe) {
    return <div className={className}>{children}</div>;
  }
  
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const { offset, velocity } = info;
    
    // Determine if a swipe has occurred
    if (offset.x < -threshold && onSwipeLeft) {
      controls.start({ x: -200, transition: { type: 'spring', damping: 20 } });
      setSwipeDirection('left');
      setTimeout(() => {
        onSwipeLeft();
        controls.start({ x: 0, transition: { type: 'spring', damping: 20, stiffness: 300 } });
      }, 300);
      return;
    } 
    
    if (offset.x > threshold && onSwipeRight) {
      controls.start({ x: 200, transition: { type: 'spring', damping: 20 } });
      setSwipeDirection('right');
      setTimeout(() => {
        onSwipeRight();
        controls.start({ x: 0, transition: { type: 'spring', damping: 20, stiffness: 300 } });
      }, 300);
      return;
    }
    
    // If no swipe, return to center
    controls.start({ x: 0, transition: { type: 'spring', damping: 20, stiffness: 300 } });
    setSwipeDirection(null);
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Background indicators for swipe actions */}
      <div className="absolute inset-0 flex">
        {onSwipeLeft && (
          <div className="flex-1 bg-destructive/10 flex items-center justify-end pr-4">
            <span className="text-destructive font-medium">{leftAction}</span>
          </div>
        )}
        {onSwipeRight && (
          <div className="flex-1 bg-primary/10 flex items-center pl-4">
            <span className="text-primary font-medium">{rightAction}</span>
          </div>
        )}
      </div>
      
      <motion.div
        drag={disableDrag ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={controls}
        className={`${className} ${isDragging ? 'cursor-grabbing z-10' : 'cursor-grab'}`}
        whileTap={{ scale: disableDrag ? 1 : 0.98 }}
        whileHover={{ scale: disableDrag ? 1 : 1.01 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
