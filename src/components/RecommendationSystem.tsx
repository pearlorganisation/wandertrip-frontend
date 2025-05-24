
import { useState, useEffect, useRef } from 'react';
import { Sparkles, MapPin, Compass, Globe, ChevronLeft, ChevronRight, Heart, Star, Clock, Calendar, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import TravelPersonalityCard from './TravelPersonalityCard';
import RecommendedDestinations from './RecommendedDestinations';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface RecommendationSystemProps {
  className?: string;
  userPreferences?: Record<string, any>;
}

export default function RecommendationSystem({ className, userPreferences }: RecommendationSystemProps) {
  const [activeTab, setActiveTab] = useState<string>('foryou');
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Record<string, any>>({});
  const [activeMoodFilter, setActiveMoodFilter] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedDestinations, setLikedDestinations] = useState<string[]>([]);
  const [animateCards, setAnimateCards] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // This would connect to an API in a real application
  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        // Simulate API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Mock data - in a real app this would come from a recommendation API
        const mockRecommendations = {
          destinations: [
            {
              id: 'dest-swiss-alps',
              name: 'Swiss Alps',
              location: 'Switzerland',
              image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7',
              rating: 4.9,
              reason: 'Since you loved mountains in your past trips',
              theme: 'Adventure',
              price: {
                value: 1200,
                currency: 'USD',
                duration: 'per person for 5 nights'
              },
              highlights: ['Scenic hiking trails', 'Cable car experiences', 'Alpine villages'],
              bestTime: 'June to September'
            },
            {
              id: 'dest-amalfi',
              name: 'Amalfi Coast',
              location: 'Italy',
              image: 'https://images.unsplash.com/photo-1612698093158-e07ac200d44e',
              rating: 4.8,
              reason: 'Perfect for your upcoming anniversary',
              theme: 'Romance',
              price: {
                value: 1500,
                currency: 'USD',
                duration: 'per person for 7 nights'
              },
              highlights: ['Coastal views', 'Authentic Italian cuisine', 'Historic towns'],
              bestTime: 'May to October'
            },
            {
              id: 'dest-kyoto',
              name: 'Kyoto',
              location: 'Japan',
              image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
              rating: 4.7,
              reason: 'Matches your interest in cultural experiences',
              theme: 'Culture',
              price: {
                value: 1800,
                currency: 'USD',
                duration: 'per person for 6 nights'
              },
              highlights: ['Ancient temples', 'Traditional tea ceremonies', 'Bamboo forests'],
              bestTime: 'March-May & October-November'
            }
          ],
          packages: [
            {
              id: 'pkg-europe-luxury',
              name: 'Luxury Europe in 7 Days',
              image: 'https://images.unsplash.com/photo-1499856871958-5b9357976b82',
              rating: 4.9,
              price: {
                value: 2500,
                currency: 'USD',
                duration: 'per person'
              },
              destinations: ['Paris', 'Rome', 'Barcelona'],
              highlights: ['5-star accommodations', 'Private tours', 'Michelin dining'],
              trending: true
            },
            {
              id: 'pkg-beach-couple',
              name: 'Couple-friendly Beach Escape',
              image: 'https://images.unsplash.com/photo-1589197331516-4d84b72ebde3',
              rating: 4.8,
              price: {
                value: 1200,
                currency: 'USD',
                duration: 'per couple'
              },
              destinations: ['Maldives'],
              highlights: ['Overwater bungalow', 'Couples massage', 'Sunset cruise'],
              trending: false
            }
          ],
          miniTrips: [
            {
              id: 'mini-mystery',
              name: 'Mystery Getaway',
              image: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd',
              description: 'A surprise destination revealed just before departure',
              price: {
                value: 800,
                currency: 'USD',
                duration: 'for 3 nights'
              },
              popularity: '94% satisfaction rate'
            },
            {
              id: 'mini-gastro',
              name: 'Gastronomic Adventure',
              image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
              description: 'Explore the world\'s most delicious culinary destinations',
              price: {
                value: 950,
                currency: 'USD',
                duration: 'for 4 nights'
              },
              popularity: 'Top rated experience'
            },
            {
              id: 'mini-nature',
              name: 'Offbeat Nature Trail',
              image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b',
              description: 'Discover hidden natural wonders off the beaten path',
              price: {
                value: 750,
                currency: 'USD',
                duration: 'for 3 nights'
              },
              popularity: 'Limited spots available'
            }
          ],
          seasonalMatches: [
            {
              id: 'seasonal-bali',
              name: 'Bali',
              period: 'Perfect in July',
              discount: '15% off',
              image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4'
            },
            {
              id: 'seasonal-morocco',
              name: 'Morocco',
              period: 'Ideal in October',
              discount: '10% off',
              image: 'https://images.unsplash.com/photo-1539020140153-e8c5070856d6'
            },
            {
              id: 'seasonal-iceland',
              name: 'Iceland',
              period: 'Magic in September',
              discount: '12% off',
              image: 'https://images.unsplash.com/photo-1504233529578-6d46baba6d34'
            }
          ],
          travelPersonality: {
            type: 'Curious Wanderer',
            emoji: '🌍',
            description: 'You love exploring new cultures and immersing yourself in local experiences.',
            compatibleDestinations: ['Japan', 'Morocco', 'Peru'],
            insights: ['You prefer authentic experiences over tourist attractions',
                      'You enjoy learning local phrases before traveling',
                      'You value cultural immersion over luxury']
          },
          previousChoices: {
            destination: 'Goa',
            suggestion: 'Gokarna',
            reason: 'Similar beautiful beaches with a more peaceful atmosphere',
            imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2'
          }
        };
        
        setRecommendations(mockRecommendations);
        // Trigger animation after data is loaded
        setTimeout(() => setAnimateCards(true), 300);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        toast({
          title: "Couldn't load recommendations",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [toast]);
  
  // Filter recommendations by mood/theme
  const getFilteredDestinations = (mood: string) => {
    if (!recommendations.destinations) return [];
    
    if (mood === 'all') return recommendations.destinations;
    
    return recommendations.destinations.filter(
      (dest: any) => dest.theme?.toLowerCase() === mood.toLowerCase()
    );
  };

  // Handle carousel navigation
  const nextSlide = () => {
    if (!recommendations.seasonalMatches) return;
    setCurrentSlide((prev) => 
      prev === recommendations.seasonalMatches.length - 1 ? 0 : prev + 1
    );
    
    // Smooth scroll carousel on mobile
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: slideWidth * (currentSlide + 1),
        behavior: 'smooth'
      });
    }
  };

  const prevSlide = () => {
    if (!recommendations.seasonalMatches) return;
    setCurrentSlide((prev) => 
      prev === 0 ? recommendations.seasonalMatches.length - 1 : prev - 1
    );
    
    // Smooth scroll carousel on mobile
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: slideWidth * (currentSlide - 1),
        behavior: 'smooth'
      });
    }
  };

  const handleLikeDestination = (id: string) => {
    setLikedDestinations(prev => {
      const isAlreadyLiked = prev.includes(id);
      
      if (isAlreadyLiked) {
        toast({
          title: "Removed from favorites",
          description: "Destination removed from your saved list",
        });
        return prev.filter(item => item !== id);
      } else {
        toast({
          title: "Added to favorites!",
          description: "Destination saved to your list",
        });
        return [...prev, id];
      }
    });
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className={cn("mt-8", className)}>
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold flex items-center">
              <Sparkles size={20} className="mr-2 text-primary" />
              Personalized for You
            </h2>
            <p className="text-muted-foreground">
              Recommendations based on your travel preferences and history
            </p>
          </div>
          
          {user && (
            <Button variant="outline" className="flex items-center md:self-end group hover:border-primary transition-all duration-300">
              <MapPin size={16} className="mr-2 group-hover:text-primary" />
              <span className="group-hover:translate-x-1 transition-transform">Update Travel Preferences</span>
            </Button>
          )}
        </div>
      </motion.div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="space-y-2 text-center">
            <p className="text-muted-foreground">Finding perfect matches for you...</p>
            <p className="text-xs text-muted-foreground/70">Analyzing your travel preferences</p>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Travel Personality Card */}
          {recommendations.travelPersonality && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TravelPersonalityCard personality={recommendations.travelPersonality} />
            </motion.div>
          )}
          
          {/* Tabs */}
          <Tabs defaultValue="foryou" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8 overflow-x-auto scrollbar-hide bg-background/50 backdrop-blur-sm border">
              <TabsTrigger value="foryou" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Sparkles size={16} className="mr-2 hidden sm:inline-block" />
                For You
              </TabsTrigger>
              <TabsTrigger value="destinations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <MapPin size={16} className="mr-2 hidden sm:inline-block" />
                Destinations
              </TabsTrigger>
              <TabsTrigger value="packages" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Star size={16} className="mr-2 hidden sm:inline-block" />
                Packages
              </TabsTrigger>
              <TabsTrigger value="minitrips" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Zap size={16} className="mr-2 hidden sm:inline-block" />
                Mini Trips
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="foryou" className="space-y-8">
              {/* Previous Choice Based Recommendation */}
              {recommendations.previousChoices && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-orange-100/50 to-amber-100/50 rounded-xl p-4 md:p-6 overflow-hidden relative"
                >
                  <h3 className="text-lg font-medium mb-3">Because You Chose {recommendations.previousChoices.destination}...</h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <img 
                            src={recommendations.previousChoices.imageUrl} 
                            alt={recommendations.previousChoices.suggestion}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm mb-1">You might love</p>
                          <p className="text-xl font-medium bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            {recommendations.previousChoices.suggestion}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{recommendations.previousChoices.reason}</p>
                    </div>
                    <Button className="w-full md:w-auto group">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">Explore Now</span>
                      <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-amber-300/30 blur-3xl" />
                  <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-orange-300/30 blur-3xl" />
                </motion.div>
              )}
              
              {/* Season Matches */}
              {recommendations.seasonalMatches && recommendations.seasonalMatches.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-primary" />
                      <h3 className="text-lg font-medium">Seasonal Perfect Matches</h3>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full mr-2 hover:border-primary transition-colors"
                        onClick={prevSlide}
                      >
                        <ChevronLeft size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full hover:border-primary transition-colors"
                        onClick={nextSlide}
                      >
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="relative overflow-hidden">
                    <div 
                      className="flex transition-transform duration-500 ease-out scrollbar-hide"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      ref={carouselRef}
                    >
                      {recommendations.seasonalMatches.map((match: any) => (
                        <motion.div 
                          key={match.id} 
                          className="relative w-full flex-shrink-0 md:w-1/2 px-1"
                          whileHover={{ y: -5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <div className="relative rounded-lg overflow-hidden group cursor-pointer h-48 shadow-md">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
                            <img 
                              src={match.image} 
                              alt={match.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3 z-20">
                              <span className="inline-block bg-primary/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                                {match.discount}
                              </span>
                            </div>
                            <div className="absolute bottom-0 left-0 p-4 z-20">
                              <h4 className="text-white text-xl font-medium">{match.name}</h4>
                              <div className="flex items-center gap-1">
                                <Clock size={14} className="text-primary" />
                                <p className="text-white/90 text-sm">{match.period}</p>
                              </div>
                            </div>
                            <Button size="sm" variant="secondary" className="absolute right-3 bottom-3 z-20 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                              Check Flights
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  {/* Navigation dots */}
                  <div className="flex justify-center gap-1.5 mt-3">
                    {recommendations.seasonalMatches.map((_: any, idx: number) => (
                      <button
                        key={idx}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          idx === currentSlide ? "bg-primary w-6" : "bg-primary/30"
                        )}
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Top Destinations For You */}
              <RecommendedDestinations 
                title="Top Picks For You"
                destinations={recommendations.destinations?.slice(0, 3) || []}
              />
            </TabsContent>
            
            <TabsContent value="destinations" className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
                <h3 className="text-lg font-medium flex items-center">
                  <Globe size={18} className="mr-2 text-primary" />
                  Find Your Perfect Destination
                </h3>
                <Button variant="outline" size="sm" className="rounded-full flex items-center gap-2 group hover:bg-primary hover:text-white transition-all duration-300">
                  <Compass size={14} className="text-primary group-hover:text-white" />
                  <span>Surprise Me!</span>
                </Button>
              </div>
              
              <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2 mb-6">
                {['All', 'Adventure', 'Relax', 'Culture', 'Romance'].map((mood) => (
                  <motion.div
                    key={mood}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      key={mood}
                      size="sm"
                      variant={mood.toLowerCase() === activeMoodFilter ? 'default' : 'outline'}
                      className={cn(
                        "rounded-full whitespace-nowrap transition-all duration-300",
                        mood.toLowerCase() === activeMoodFilter 
                          ? "shadow-md shadow-primary/30" 
                          : "hover:border-primary"
                      )}
                      onClick={() => setActiveMoodFilter(mood.toLowerCase())}
                    >
                      {mood}
                    </Button>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={animateCards ? "visible" : "hidden"}
              >
                <RecommendedDestinations 
                  title=""
                  destinations={getFilteredDestinations(activeMoodFilter)}
                  showReason
                />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="packages" className="space-y-6">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate={animateCards ? "visible" : "hidden"}
              >
                {recommendations.packages?.map((pkg: any) => (
                  <motion.div 
                    key={pkg.id}
                    className="border rounded-xl overflow-hidden group hover-scale relative"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="relative h-48">
                      <img 
                        src={pkg.image} 
                        alt={pkg.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium z-10 shadow-sm">
                        {pkg.price.value} {pkg.price.currency} {pkg.price.duration}
                      </div>
                      {pkg.trending && (
                        <div className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                          <Zap size={12} className="animate-pulse" />
                          <span>Trending</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-medium mb-1">{pkg.name}</h4>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <div className="flex items-center text-yellow-500 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={i < Math.floor(pkg.rating) ? "fill-yellow-500" : "fill-gray-200"} 
                            />
                          ))}
                        </div>
                        <span className="mr-2">{pkg.rating.toFixed(1)}</span>
                        <span>{pkg.destinations.join(', ')}</span>
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Highlights:</h5>
                        <ul className="text-sm text-muted-foreground">
                          {pkg.highlights.map((highlight: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="group hover:border-primary transition-all duration-300"
                        >
                          <Heart 
                            size={16} 
                            className={cn(
                              "mr-2 transition-colors duration-300",
                              "group-hover:text-red-500 group-hover:fill-red-500"
                            )} 
                          />
                          Save
                        </Button>
                        <Button size="sm" className="group">
                          <span className="group-hover:translate-x-1 transition-transform duration-300">View Details</span>
                          <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="minitrips" className="space-y-6">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate={animateCards ? "visible" : "hidden"}  
              >
                {recommendations.miniTrips?.map((trip: any, index: number) => (
                  <motion.div 
                    key={trip.id}
                    className="border rounded-xl overflow-hidden hover-scale relative"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    custom={index}
                  >
                    <div className="relative h-44">
                      <img 
                        src={trip.image} 
                        alt={trip.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <h4 className="font-medium text-lg">{trip.name}</h4>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-xs font-medium text-primary mb-2">
                        {trip.popularity}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{trip.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium">{trip.price.value} {trip.price.currency}</span>
                          <span className="text-xs text-muted-foreground ml-1">{trip.price.duration}</span>
                        </div>
                        <Button size="sm" className="group">
                          <span className="group-hover:translate-x-1 transition-transform duration-300">Explore</span>
                          <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
          
          {/* World Travel Map */}
          <motion.div 
            className="border rounded-xl p-4 md:p-6 bg-muted/20 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3 relative z-10">
              <h3 className="text-lg font-medium flex items-center">
                <Globe size={20} className="mr-2 text-primary" />
                Your World Travel Map
              </h3>
              <Button variant="outline" size="sm" className="group hover:border-primary transition-colors duration-300">
                <span className="group-hover:translate-x-1 transition-transform duration-300">View Full Map</span>
                <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
            <div className="bg-muted/30 rounded-lg h-48 md:h-72 flex items-center justify-center relative z-10 overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700 group-hover:scale-105" />
              <div className="text-center px-4 z-10">
                <h4 className="font-medium mb-2">Your Travel Journey Awaits</h4>
                <p className="text-muted-foreground mb-4">
                  Explore more destinations to fill in your personal travel map<br />
                  <span className="text-sm">Track your adventures across the globe</span>
                </p>
                <Button size="sm" className="group">
                  <span className="mr-2">Start Your Map</span>
                  <Globe size={16} className="animate-pulse" />
                </Button>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-blue-300/10 blur-3xl" />
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-indigo-300/10 blur-3xl" />
          </motion.div>
        </div>
      )}
    </div>
  );
}
