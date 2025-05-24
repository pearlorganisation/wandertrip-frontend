
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Sparkles,
  Heart,
  Coffee,
  Mountain,
  Sun,
  Music,
  Sunrise,
  Umbrella,
  Utensils,
  Building2,
  Book,
  Camera,
  Star,
  Clock,
  Users,
  DollarSign,
  ThumbsUp
} from 'lucide-react';

type TravelMood = {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  description: string;
  idealTraveler: string;
  bestTime: string;
  budget: string;
  highlights: string[];
  destinations: Array<{ name: string; image: string }>;
};

const travelMoods: TravelMood[] = [
  {
    id: 'relaxation',
    name: 'Relaxation',
    icon: <Umbrella className="w-5 h-5" />,
    color: 'from-blue-500/20 to-emerald-500/20',
    description: 'Unwind and recharge with serene beaches, spa retreats, and peaceful getaways.',
    idealTraveler: 'Those needing a break from the hustle',
    bestTime: 'Year-round, varies by destination',
    budget: '$$-$$$',
    highlights: ['Beach lounging', 'Spa treatments', 'Meditation retreats'],
    destinations: [
      { name: 'Maldives', image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=500&auto=format&fit=crop' },
      { name: 'Bora Bora', image: 'https://images.unsplash.com/photo-1589197331516-4d84b72ebde3' },
      { name: 'Santorini', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=500&auto=format&fit=crop' },
    ],
  },
  {
    id: 'adventure',
    name: 'Adventure',
    icon: <Mountain className="w-5 h-5" />,
    color: 'from-orange-500/20 to-red-500/20',
    description: 'Seek thrills and excitement with hiking, water sports, and outdoor expeditions.',
    idealTraveler: 'Adrenaline seekers and nature lovers',
    bestTime: 'Varies by activity and region',
    budget: '$$-$$$',
    highlights: ['Hiking', 'White water rafting', 'Zip-lining'],
    destinations: [
      { name: 'New Zealand', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?q=80&w=500&auto=format&fit=crop' },
      { name: 'Costa Rica', image: 'https://images.unsplash.com/photo-1536332016596-dc50468cbf41?q=80&w=500&auto=format&fit=crop' },
      { name: 'Swiss Alps', image: 'https://images.unsplash.com/photo-1531400158697-004a3a06fd3f?q=80&w=500&auto=format&fit=crop' },
    ],
  },
  {
    id: 'culture',
    name: 'Cultural Immersion',
    icon: <Building2 className="w-5 h-5" />,
    color: 'from-purple-500/20 to-pink-500/20',
    description: 'Dive deep into local traditions, historical sites, and authentic experiences.',
    idealTraveler: 'History buffs and cultural enthusiasts',
    bestTime: 'Spring or fall for most destinations',
    budget: '$$',
    highlights: ['Historical sites', 'Local festivals', 'Museums and art'],
    destinations: [
      { name: 'Kyoto', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=500&auto=format&fit=crop' },
      { name: 'Rome', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=500&auto=format&fit=crop' },
      { name: 'Marrakech', image: 'https://images.unsplash.com/photo-1547995886-6dc09384c6e6?q=80&w=500&auto=format&fit=crop' },
    ],
  },
  {
    id: 'culinary',
    name: 'Culinary Journey',
    icon: <Utensils className="w-5 h-5" />,
    color: 'from-yellow-500/20 to-amber-500/20',
    description: 'Tantalize your taste buds with food tours, cooking classes, and gastronomic delights.',
    idealTraveler: 'Food enthusiasts and aspiring chefs',
    bestTime: 'Year-round, varies by cuisine',
    budget: '$$-$$$',
    highlights: ['Food tours', 'Cooking classes', 'Wine tasting'],
    destinations: [
      { name: 'Tokyo', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=500&auto=format&fit=crop' },
      { name: 'Barcelona', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=500&auto=format&fit=crop' },
      { name: 'Bangkok', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=500&auto=format&fit=crop' },
    ],
  },
  {
    id: 'inspiration',
    name: 'Creative Inspiration',
    icon: <Camera className="w-5 h-5" />,
    color: 'from-teal-500/20 to-cyan-500/20',
    description: 'Find your muse with artistic neighborhoods, photography hotspots, and creative workshops.',
    idealTraveler: 'Artists, photographers, and creatives',
    bestTime: 'Varies by destination',
    budget: '$$',
    highlights: ['Art galleries', 'Photography spots', 'Creative workshops'],
    destinations: [
      { name: 'Paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=500&auto=format&fit=crop' },
      { name: 'Berlin', image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=500&auto=format&fit=crop' },
      { name: 'Bali', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=500&auto=format&fit=crop' },
    ],
  },
  {
    id: 'wellness',
    name: 'Wellness Retreat',
    icon: <Sunrise className="w-5 h-5" />,
    color: 'from-green-500/20 to-lime-500/20',
    description: 'Nurture mind, body, and spirit with yoga, meditation, and holistic experiences.',
    idealTraveler: 'Those seeking balance and rejuvenation',
    bestTime: 'Year-round, varies by location',
    budget: '$$$',
    highlights: ['Yoga retreats', 'Meditation', 'Holistic therapies'],
    destinations: [
      { name: 'Ubud, Bali', image: 'https://images.unsplash.com/photo-1559628233-100c798642d4' },
      { name: 'Sedona', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=500&auto=format&fit=crop' },
      { name: 'Kerala, India', image: 'https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8' },
    ],
  },
];

const TravelMoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState<TravelMood | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);
  const [showMoodQuiz, setShowMoodQuiz] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto rotate destinations
  useEffect(() => {
    if (selectedMood && !isScrolling) {
      const interval = setInterval(() => {
        setActiveDestinationIndex((prev) =>
          prev === selectedMood.destinations.length - 1 ? 0 : prev + 1
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [selectedMood, isScrolling]);

  const handleMoodSelect = (mood: TravelMood) => {
    setIsAnimating(true);

    // Brief delay for animation
    setTimeout(() => {
      setSelectedMood(mood);
      setIsAnimating(false);
      setActiveDestinationIndex(0);

      toast({
        title: `${mood.name} Mood Selected!`,
        description: "We've found perfect destinations that match your travel mood.",
        duration: 3000,
      });
    }, 500);
  };

  const handleCardMouseEnter = (id: string) => {
    setHoveredCard(id);
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
  };

  // Handle horizontal scrolling for mood cards
  const handleScroll = () => {
    setIsScrolling(true);
    clearTimeout((scrollRef.current as any)?.scrollTimeout);
    (scrollRef.current as any).scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  // Horizontal scroll with mouse wheel
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        element.scrollLeft += e.deltaY;
        handleScroll();
      }
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    element.addEventListener('scroll', handleScroll);

    return () => {
      element.removeEventListener('wheel', handleWheel);
      element.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="p-6 md:p-8 backdrop-blur-sm bg-background/40 dark:bg-background/60 rounded-xl border border-border shadow-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background z-0" />

      {/* Animated stars in the background */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="text-primary w-5 h-5" />
          <h2 className="text-xl font-semibold">What's Your Travel Mood?</h2>
          <Sparkles className="text-primary w-4 h-4" />
        </div>

        <p className="text-muted-foreground mb-6">
          Discover destinations and experiences that perfectly match how you're feeling right now.
        </p>

        <AnimatePresence mode="wait">
          {!selectedMood ? (
            <motion.div
              key="mood-selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  Swipe or scroll horizontally to see more moods →
                </p>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs flex items-center gap-1"
                  onClick={() => setShowMoodQuiz(true)}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Not sure what you need?
                </Button>
              </div>

              <div
                className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide snap-x scroll-smooth"
                ref={scrollRef}
              >
                {travelMoods.map((mood) => (
                  <motion.div
                    key={mood.id}
                    className="flex-shrink-0 snap-start w-[200px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() => handleCardMouseEnter(mood.id)}
                    onMouseLeave={handleCardMouseLeave}
                  >
                    <motion.button
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMoodSelect(mood)}
                      className={cn(
                        "flex flex-col items-center p-4 h-64 w-full rounded-lg bg-gradient-to-br border border-primary/10 hover:border-primary/30 transition-all duration-300",
                        mood.color
                      )}
                    >
                      <div className="w-16 h-16 rounded-full bg-background/60 flex items-center justify-center mb-3">
                        {mood.icon}
                      </div>
                      <span className="text-base font-medium mb-2">{mood.name}</span>
                      <p className="text-xs text-center text-muted-foreground mb-3">
                        {mood.description.length > 100
                          ? mood.description.substring(0, 100) + '...'
                          : mood.description}
                      </p>

                      <AnimatePresence>
                        {hoveredCard === mood.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-auto"
                          >
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10">
                              See destinations →
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* Scroll indicator */}
              <div className="flex justify-center mt-2">
                <div className="flex space-x-1.5">
                  {travelMoods.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        index === Math.floor(((scrollRef.current?.scrollLeft || 0) / (scrollRef.current?.scrollWidth || 1) * travelMoods.length))
                          ? "w-4 bg-primary"
                          : "w-1.5 bg-primary/30"
                      )}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="mood-details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedMood.color} flex items-center justify-center`}>
                    {selectedMood.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{selectedMood.name}</h3>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Users className="w-3 h-3 mr-1" />
                      <span>Perfect for: {selectedMood.idealTraveler}</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedMood(null)}
                  className="text-xs h-8"
                >
                  Change Mood
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5">
                {/* Left column: Mood details */}
                <div>
                  <p className="text-muted-foreground mb-4">
                    {selectedMood.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center text-xs font-medium mb-1.5">
                        <Clock className="w-3.5 h-3.5 mr-1.5 text-primary" />
                        Best Time to Go
                      </div>
                      <span className="text-sm">{selectedMood.bestTime}</span>
                    </div>

                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center text-xs font-medium mb-1.5">
                        <DollarSign className="w-3.5 h-3.5 mr-1.5 text-primary" />
                        Budget Level
                      </div>
                      <span className="text-sm">{selectedMood.budget}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMood.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 flex items-center"
                        >
                          <Star className="w-3 h-3 mr-1 text-amber-500" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right column: Destinations */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Perfect Destinations:</h4>

                  <div className="relative h-[200px] overflow-hidden rounded-lg">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeDestinationIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <img
                          src={selectedMood.destinations[activeDestinationIndex].image}
                          alt={selectedMood.destinations[activeDestinationIndex].name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                          <div>
                            <h5 className="text-white text-lg font-medium">
                              {selectedMood.destinations[activeDestinationIndex].name}
                            </h5>
                            <Link
                              to={`/destination/${selectedMood.destinations[activeDestinationIndex].name.toLowerCase()}`}
                              className="text-white/80 text-xs flex items-center hover:text-white"
                            >
                              Explore destination <Heart className="ml-1 w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation dots */}
                    <div className="absolute bottom-3 right-3 z-10 flex space-x-1.5">
                      {selectedMood.destinations.map((_, index) => (
                        <button
                          key={index}
                          className={cn(
                            "w-2 h-2 rounded-full",
                            index === activeDestinationIndex
                              ? "bg-white"
                              : "bg-white/40"
                          )}
                          onClick={() => setActiveDestinationIndex(index)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between mt-3">
                    <button
                      className="text-xs flex items-center text-muted-foreground hover:text-foreground"
                      onClick={() => setActiveDestinationIndex(prev =>
                        prev === 0 ? selectedMood.destinations.length - 1 : prev - 1
                      )}
                    >
                      Previous
                    </button>
                    <button
                      className="text-xs flex items-center text-muted-foreground hover:text-foreground"
                      onClick={() => setActiveDestinationIndex(prev =>
                        prev === selectedMood.destinations.length - 1 ? 0 : prev + 1
                      )}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button asChild>
                  <Link
                    to={`/trip-planner?mood=${selectedMood.id}`}
                    onClick={() => {
                      setTimeout(() => {
                        const element = document.getElementById("plan_trip");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }, 300); // Small delay to ensure smooth transition
                    }}
                  >
                    <Sparkles className="mr-2 w-4 h-4" />
                    Plan My {selectedMood.name} Trip
                  </Link>
                </Button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mood Quiz Modal */}
        <AnimatePresence>
          {showMoodQuiz && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-card border border-border rounded-xl shadow-lg max-w-md w-full p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Find Your Perfect Travel Mood</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowMoodQuiz(false)}>
                    ✕
                  </Button>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-sm text-muted-foreground">
                    Answer these quick questions, and we'll help you discover your ideal travel mood:
                  </p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-2">When on vacation, I prefer to:</h4>
                      <div className="space-y-2">
                        {[
                          { text: "Relax and take it easy", mood: "relaxation" },
                          { text: "Seek thrills and adventure", mood: "adventure" },
                          { text: "Experience local culture", mood: "culture" },
                          { text: "Discover new foods and flavors", mood: "culinary" }
                        ].map((option, index) => (
                          <label key={index} className="flex items-center space-x-2 text-sm cursor-pointer">
                            <input type="radio" name="activity" className="accent-primary" />
                            <span>{option.text}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Right now, I need:</h4>
                      <div className="space-y-2">
                        {[
                          { text: "Inspiration for creative projects", mood: "inspiration" },
                          { text: "Mental and physical wellness", mood: "wellness" },
                          { text: "Excitement and new experiences", mood: "adventure" },
                          { text: "Peace and relaxation", mood: "relaxation" }
                        ].map((option, index) => (
                          <label key={index} className="flex items-center space-x-2 text-sm cursor-pointer">
                            <input type="radio" name="need" className="accent-primary" />
                            <span>{option.text}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowMoodQuiz(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    // In a real app, you'd calculate the result based on selections
                    // For demo purposes, we'll just select a random mood
                    const randomMood = travelMoods[Math.floor(Math.random() * travelMoods.length)];
                    setShowMoodQuiz(false);
                    handleMoodSelect(randomMood);
                  }}>
                    <Sparkles className="mr-2 w-3.5 h-3.5" />
                    Find My Mood
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TravelMoodSelector;
