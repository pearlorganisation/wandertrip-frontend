
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Globe, Heart, MapPin, Compass, Star, Plane, Sun, Moon, Cloud, Sunrise } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const destinations = [
  { name: 'Bali', lat: -8.4095, lng: 115.1889, category: 'Beach', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1080&auto=format&fit=crop', 
    description: 'Tropical paradise with lush rice terraces, spiritual temples, and vibrant culture.' },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, category: 'City', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1080&auto=format&fit=crop',
    description: 'Ultramodern metropolis blending ancient traditions with cutting-edge technology.' },
  { name: 'Paris', lat: 48.8566, lng: 2.3522, category: 'City', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1080&auto=format&fit=crop',
    description: 'Romantic city of lights famous for art, fashion, gastronomy, and culture.' },
  { name: 'Santorini', lat: 36.3932, lng: 25.4615, category: 'Beach', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1080&auto=format&fit=crop',
    description: 'Stunning Greek island with iconic white buildings and breathtaking sunsets.' },
  { name: 'New York', lat: 40.7128, lng: -74.0060, category: 'City', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1080&auto=format&fit=crop',
    description: 'Vibrant metropolis known for its skyscrapers, Broadway shows, and cultural diversity.' },
  { name: 'Swiss Alps', lat: 46.8182, lng: 8.2275, category: 'Mountain', image: 'https://images.unsplash.com/photo-1508437247013-e053ee4e6b89?q=80&w=1080&auto=format&fit=crop',
    description: 'Majestic mountain range with world-class skiing, hiking, and alpine villages.' },
  { name: 'Kyoto', lat: 35.0116, lng: 135.7681, category: 'Cultural', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1080&auto=format&fit=crop',
    description: 'Ancient Japanese city with thousands of classical Buddhist temples and gardens.' },
  { name: 'Maldives', lat: 3.2028, lng: 73.2207, category: 'Beach', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1080&auto=format&fit=crop',
    description: 'Tropical paradise with crystal clear waters, overwater bungalows, and coral reefs.' },
  { name: 'Marrakech', lat: 31.6295, lng: -7.9811, category: 'Cultural', image: 'https://images.unsplash.com/photo-1597211833712-5e41faa202e2?q=80&w=1080&auto=format&fit=crop',
    description: 'Exotic Moroccan city with vibrant souks, gardens, and ancient medina.' },
  { name: 'Queenstown', lat: -45.0312, lng: 168.6626, category: 'Adventure', image: 'https://images.unsplash.com/photo-1589196728426-8aadbf4f1393?q=80&w=1080&auto=format&fit=crop',
    description: 'Adventure capital of New Zealand with stunning landscapes and adrenaline activities.' },
];

// Time to destination using a random but believable flight duration
const getFlightTime = (destination: string) => {
  const flightTimesHours = {
    'Bali': '16-18',
    'Tokyo': '12-14',
    'Paris': '7-9',
    'Santorini': '10-12',
    'New York': '5-7',
    'Swiss Alps': '8-10',
    'Kyoto': '13-15',
    'Maldives': '18-20',
    'Marrakech': '9-11',
    'Queenstown': '19-22',
  };
  
  return flightTimesHours[destination as keyof typeof flightTimesHours] || '10-12';
};

// Get current season for destination based on latitude and current date
const getSeason = (lat: number) => {
  const now = new Date();
  const month = now.getMonth();
  
  // Northern hemisphere
  if (lat >= 0) {
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Autumn';
    return 'Winter';
  } 
  // Southern hemisphere
  else {
    if (month >= 2 && month <= 4) return 'Autumn';
    if (month >= 5 && month <= 7) return 'Winter';
    if (month >= 8 && month <= 10) return 'Spring';
    return 'Summer';
  }
};

// Get season icon
const getSeasonIcon = (season: string) => {
  switch (season) {
    case 'Spring': return <Sunrise className="w-4 h-4 text-green-500" />;
    case 'Summer': return <Sun className="w-4 h-4 text-amber-500" />;
    case 'Autumn': return <Cloud className="w-4 h-4 text-orange-500" />;
    case 'Winter': return <Moon className="w-4 h-4 text-blue-400" />;
    default: return <Sun className="w-4 h-4" />;
  }
};

const DestinationsGlobe = () => {
  const [activeDestination, setActiveDestination] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(true);
  const [isSurpriseMode, setIsSurpriseMode] = useState(false);
  const [isDimmed, setIsDimmed] = useState(false);
  const [animateGlobe, setAnimateGlobe] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [showTimelineAnimation, setShowTimelineAnimation] = useState(false);
  const globeRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!isSpinning) return;
    
    const rotationInterval = setInterval(() => {
      if (globeRef.current) {
        globeRef.current.style.transform = `rotate(${Math.random() * 360}deg)`;
      }
    }, 10000);
    
    return () => clearInterval(rotationInterval);
  }, [isSpinning]);

  // Timeline animation effect
  useEffect(() => {
    if (showTimelineAnimation && activeDestination !== null) {
      const timer = setTimeout(() => {
        setShowTimelineAnimation(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showTimelineAnimation, activeDestination]);

  const handleSurpriseMe = () => {
    setIsSurpriseMode(true);
    setIsDimmed(true);
    setAnimateGlobe(true);
    
    // Animate globe for magic effect
    setTimeout(() => {
      setAnimateGlobe(false);
    }, 1500);
    
    // Pause briefly before revealing
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * destinations.length);
      setActiveDestination(randomIndex);
      setIsSurpriseMode(false);
      setIsDimmed(false);
      setShowTimelineAnimation(true);
      
      toast({
        title: "✨ Destination Found!",
        description: `How about ${destinations[randomIndex].name}? This could be your next adventure!`,
        action: (
          <Link to={`/destination/${destinations[randomIndex].name.toLowerCase()}`}>
            <Button variant="outline" size="sm">
              Explore
            </Button>
          </Link>
        ),
      });
    }, 1500);
  };

  const filteredDestinations = filterCategory 
    ? destinations.filter(dest => dest.category === filterCategory)
    : destinations;

  return (
    <div className="relative h-[550px] w-full max-w-4xl mx-auto my-16 overflow-hidden rounded-xl">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background pointer-events-none z-10" />
      
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div 
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.3,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              opacity: [0.3, 0.8, 0.3], 
              scale: [1, 1.5, 1] 
            }}
            transition={{ 
              duration: 3 + Math.random() * 5, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        ))}
      </div>
      
      {/* Magical glow effect during surprise mode */}
      <AnimatePresence>
        {animateGlobe && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary/30 to-purple-500/30 blur-xl" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Timeline animation */}
      <AnimatePresence>
        {showTimelineAnimation && activeDestination !== null && (
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/0 z-20 pointer-events-none"
          >
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute right-0 -top-1.5 w-3 h-3 bg-primary rounded-full"
            />
            <Plane className="absolute -top-3 text-primary w-6 h-6 animate-pulse" style={{ left: '30%' }} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Interactive Globe */}
      <motion.div 
        ref={globeRef}
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          isDimmed && "opacity-50"
        )}
        animate={{ 
          rotate: isSpinning ? 360 : 0,
          scale: animateGlobe ? 1.2 : 1 
        }}
        transition={{ 
          duration: animateGlobe ? 1.5 : 120, 
          repeat: animateGlobe ? 0 : Infinity, 
          ease: animateGlobe ? "easeInOut" : "linear" 
        }}
      >
        <div className="relative w-[350px] h-[350px] rounded-full bg-gradient-to-br from-primary/5 to-primary/20 backdrop-blur-sm border border-primary/10">
          <div className="absolute inset-0 rounded-full border-2 border-primary/5 border-dashed animate-spin-slow" />
          
          <AnimatePresence>
            {filteredDestinations.map((dest, index) => {
              // Calculate position on the "globe" using trigonometry
              const angle = (index / filteredDestinations.length) * Math.PI * 2;
              const radius = 165; // Distance from center
              const left = Math.cos(angle) * radius + 175;
              const top = Math.sin(angle) * radius + 175;
              
              return (
                <motion.div
                  key={dest.name}
                  className={cn(
                    "absolute cursor-pointer z-30",
                    activeDestination === destinations.findIndex(d => d.name === dest.name) && "z-40"
                  )}
                  style={{ left, top }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.5 }}
                  onClick={() => {
                    setActiveDestination(destinations.findIndex(d => d.name === dest.name));
                    setShowTimelineAnimation(true);
                  }}
                >
                  <div className="relative">
                    <div className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center",
                      dest.category === 'Beach' && "bg-blue-500",
                      dest.category === 'City' && "bg-amber-500",
                      dest.category === 'Mountain' && "bg-green-500",
                      dest.category === 'Cultural' && "bg-purple-500",
                      dest.category === 'Adventure' && "bg-red-500",
                    )}>
                      <div className="w-2 h-2 rounded-full bg-white animate-ping absolute" />
                    </div>
                    
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium opacity-0 group-hover:opacity-100 bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded-full transition-opacity">
                      {dest.name}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <Globe className="text-primary w-12 h-12 opacity-20" />
          </div>
        </div>
      </motion.div>
      
      {/* Category filters */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
        {['Beach', 'City', 'Mountain', 'Cultural', 'Adventure'].map((category) => (
          <Button
            key={category}
            size="sm"
            variant="outline"
            className={cn(
              "rounded-full bg-background/50 backdrop-blur-sm border-primary/10 py-1 px-3 h-auto text-xs",
              filterCategory === category && "bg-primary text-primary-foreground"
            )}
            onClick={() => setFilterCategory(filterCategory === category ? null : category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      {/* Destination Preview */}
      <AnimatePresence>
        {activeDestination !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md p-5 rounded-t-xl z-20"
          >
            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 rounded-lg overflow-hidden">
                <motion.img 
                  src={destinations[activeDestination].image} 
                  alt={destinations[activeDestination].name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="text-xl font-medium">{destinations[activeDestination].name}</h3>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {destinations[activeDestination].category}
                  </span>
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>
                    {destinations[activeDestination].lat.toFixed(2)}° {destinations[activeDestination].lat >= 0 ? 'N' : 'S'}, {destinations[activeDestination].lng.toFixed(2)}° {destinations[activeDestination].lng >= 0 ? 'E' : 'W'}
                  </span>
                </div>
                
                <p className="text-sm mt-2 text-muted-foreground">
                  {destinations[activeDestination].description}
                </p>
                
                <div className="flex mt-3 items-center gap-4">
                  <div className="flex items-center text-xs">
                    <Plane className="w-3.5 h-3.5 mr-1 text-primary" />
                    <span>{getFlightTime(destinations[activeDestination].name)} hours</span>
                  </div>
                  
                  <div className="flex items-center text-xs">
                    {getSeasonIcon(getSeason(destinations[activeDestination].lat))}
                    <span className="ml-1">
                      Current season: {getSeason(destinations[activeDestination].lat)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Link to={`/destination/${destinations[activeDestination].name.toLowerCase()}`}>
                  <Button size="sm" className="w-full rounded-full">
                    Explore <Heart className="ml-1 w-4 h-4" />
                  </Button>
                </Link>
                
                <Button size="sm" variant="outline" className="w-full rounded-full" 
                  onClick={() => setActiveDestination(null)}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Surprise Me Button */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          onClick={handleSurpriseMe}
          variant="outline"
          className="rounded-full bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20"
          disabled={isSurpriseMode}
        >
          {isSurpriseMode ? (
            <>Finding magic <span className="ml-1 animate-pulse">✨</span></>
          ) : (
            <>Surprise Me <Sparkles className="ml-2 w-4 h-4 text-primary" /></>
          )}
        </Button>
      </div>
      
      {/* Globe Controls */}
      <div className="absolute bottom-4 left-4 z-20">
        <Button
          onClick={() => setIsSpinning(!isSpinning)}
          variant="ghost"
          size="sm"
          className="rounded-full bg-background/30 backdrop-blur-sm hover:bg-background/50"
        >
          {isSpinning ? (
            <><Compass className="w-4 h-4 mr-2" /> Pause Globe</>
          ) : (
            <><Compass className="w-4 h-4 mr-2" /> Spin Globe</>
          )}
        </Button>
      </div>
      
      {/* Decorative compass */}
      <div className="absolute bottom-4 right-4 z-20 w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center bg-background/20 backdrop-blur-sm">
        <Compass className="w-6 h-6 text-primary/60" />
        <div className="absolute w-1 h-6 bg-primary/30 animate-spin-slow" style={{ transformOrigin: 'bottom', top: '3px' }} />
      </div>
    </div>
  );
};

export default DestinationsGlobe;
