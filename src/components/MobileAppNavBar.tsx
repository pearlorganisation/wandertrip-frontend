
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Map, PlaneTakeoff, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export const MobileAppNavBar = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/destinations', label: 'Explore', icon: Map },
    { path: '/trip-planner', label: 'Plan', icon: PlaneTakeoff },
    { path: '/itinerary', label: 'Trips', icon: Calendar },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.nav 
            className="bg-background/90 backdrop-blur-xl border border-border/30 shadow-lg rounded-2xl overflow-hidden"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <div className="flex justify-around items-center h-16">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center justify-center flex-1 py-2 mobile-tab transition-all"
                >
                  <motion.div 
                    className={cn(
                      "flex flex-col items-center justify-center p-1 relative",
                      isActive(item.path) ? "text-primary" : "text-muted-foreground"
                    )}
                    whileTap={{ scale: 0.92 }}
                  >
                    <div className={cn(
                      "w-10 h-10 flex items-center justify-center rounded-full transition-all mb-0.5",
                      isActive(item.path) ? "bg-primary/10" : "bg-transparent"
                    )}>
                      <item.icon className={cn(
                        "w-5 h-5",
                        isActive(item.path) ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <span className="text-xs font-medium">{item.label}</span>
                    
                    {isActive(item.path) && (
                      <motion.div 
                        className="absolute -bottom-1 h-1 w-1 bg-primary rounded-full"
                        layoutId="navIndicator"
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
