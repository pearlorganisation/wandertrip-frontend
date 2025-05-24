
import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Wand, MapPin, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AppBottomSheet } from '@/components/AppBottomSheet';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeBackground, setActiveBackground] = useState(0);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const backgrounds = [
    "https://images.unsplash.com/photo-1682687219573-3fd75f982217?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3", // Mountain view
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3", // Beach sunset
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3", // City skyline
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"  // Cultural landmark
  ];

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsLoaded(true);
    });

    const interval = setInterval(() => {
      setActiveBackground(prev => (prev + 1) % backgrounds.length);
    }, 8000);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
  }, []);

  const handleStartPlanning = useCallback(() => {
    navigate('/trip-planner');
    setTimeout(() => {
      const element = document.getElementById("plan_trip");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  }, [navigate]);
  
  const travelStyles = [
    { label: "Luxury", path: "/trip-planner?style=luxury" },
    { label: "Adventure", path: "/trip-planner?style=adventure" },
    { label: "Family", path: "/trip-planner?style=family" },
    { label: "Cultural", path: "/trip-planner?style=cultural" }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Lighter overlay */}
      <div className="absolute inset-0 bg-black/35 z-10" />
      
      {/* Background images with subtle brightness */}
      {backgrounds.map((bg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: activeBackground === index ? 1 : 0
          }}
          transition={{ 
            opacity: { duration: 1.5 }
          }}
          style={{
            backgroundImage: `url('${bg}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(1.15)",
          }}
          className="absolute inset-0 z-0"
          aria-hidden="true"
        />
      ))}

      <div className="container relative z-20 px-4 sm:px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Main heading with simplified styling */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight shadow-text"
          >
            Discover Your Perfect Adventure
          </motion.h1>

          {/* Description with improved typography and legibility */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white mb-8 max-w-lg mx-auto shadow-text font-medium"
          >
            Experience journeys designed just for you, powered by AI and curated by travel experts.
          </motion.p>

          {/* CTA buttons with modern styling */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Button
              onClick={handleStartPlanning}
              size="lg"
              className="px-8 py-6 text-base font-medium bg-white text-gray-900 
                       rounded-full shadow-lg hover:shadow-xl 
                       hover:bg-gray-100 transition-all
                       active:scale-95"
            >
              <Wand size={18} className="mr-2" />
              Plan Your Trip
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              asChild
              className="px-8 py-6 text-base font-medium 
                       text-white rounded-full bg-transparent 
                       border border-white/30 backdrop-blur-sm
                       hover:bg-white/10 transition-all
                       active:scale-95"
            >
              <Link to="/destinations">
                <MapPin size={18} className="mr-2" />
                Explore Destinations
              </Link>
            </Button>
          </motion.div>
          
          {/* Travel styles section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16"
          >
            <div className="flex flex-wrap items-center justify-center gap-3">
              {travelStyles.map((style, index) => (
                <Link
                  key={index}
                  to={style.path}
                  className="px-4 py-2 bg-white/20 backdrop-blur-md 
                           border border-white/30 rounded-full text-sm 
                           text-white font-medium transition-all
                           hover:bg-white/30 hover:scale-105 shadow-md"
                >
                  {style.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Simplified scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.span 
          animate={{ 
            y: [0, 5, 0],
          }} 
          transition={{ 
            duration: 2, 
            repeat: Infinity
          }}
          className="text-white text-xs font-medium flex flex-col items-center"
        >
          <span className="shadow-text">Scroll down to explore</span>
          <ChevronDown className="mt-1 animate-bounce" size={16} />
        </motion.span>
      </motion.div>
    </section>
  );
}
