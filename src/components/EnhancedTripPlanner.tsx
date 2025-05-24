
import { useState, useCallback, useEffect } from 'react';
import { Calendar, MapPin, Users, Sparkles, Umbrella, LucideShirt, Milestone, Globe, ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import PackingListGenerator from './PackingListGenerator';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface EnhancedTripPlannerProps {
  onGenerate?: (formData: any) => void;
  className?: string;
}

export default function EnhancedTripPlanner({ onGenerate, className }: EnhancedTripPlannerProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPackingList, setShowPackingList] = useState(false);
  const [travelSuggestions, setTravelSuggestions] = useState([
    'Bali, Indonesia',
    'Santorini, Greece',
    'Tokyo, Japan',
    'Paris, France',
    'New York, USA',
  ]);
  
  const [formData, setFormData] = useState({
    destination: '',
    dates: '',
    travelers: '1 Adult',
    travelStyle: 'Adventure',
    interests: [] as string[]
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDestinationSelect = (destination: string) => {
    setFormData(prev => ({ ...prev, destination }));
  };
  
  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const interests = [...prev.interests];
      if (interests.includes(interest)) {
        return { ...prev, interests: interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...interests, interest] };
      }
    });
  };
  
  const generateItinerary = useCallback(() => {
    if (!formData.destination) {
      toast.error("Please enter a destination");
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      
      if (onGenerate) {
        onGenerate(formData);
      } else {
        toast.success("Itinerary generated!", {
          description: "Your personalized travel plan is ready to view.",
        });
      }
    }, 1500);
  }, [formData, onGenerate]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Simulate AI fetching suggestions
  useEffect(() => {
    if (formData.destination.length > 0) {
      // Simulate fetching travel suggestions based on user input
      const query = formData.destination.toLowerCase();
      const destinations = [
        'Bali, Indonesia',
        'Bangkok, Thailand',
        'Barcelona, Spain',
        'Santorini, Greece',
        'Sydney, Australia',
        'Tokyo, Japan',
        'Paris, France',
        'New York, USA',
        'Kyoto, Japan',
        'London, UK'
      ];
      
      setTravelSuggestions(
        destinations.filter(dest => dest.toLowerCase().includes(query)).slice(0, 5)
      );
    }
  }, [formData.destination]);

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
      y: 0
    }
  };

  return (
    <div className={cn("glass rounded-2xl p-8 md:p-10", className)}>
      {step === 1 ? (
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-medium mb-4">Plan Your Dream Trip</h2>
            <p className="text-muted-foreground mb-6">Our AI creates personalized itineraries based on your preferences</p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Where to?</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  name="destination"
                  placeholder="Enter destination" 
                  className="w-full pl-10 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
                  value={formData.destination}
                  onChange={handleInputChange}
                />
                
                {formData.destination.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-lg shadow-lg overflow-hidden">
                    {travelSuggestions.map((suggestion, idx) => (
                      <div 
                        key={idx}
                        className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center"
                        onClick={() => handleDestinationSelect(suggestion)}
                      >
                        <Globe size={16} className="mr-2 text-muted-foreground" />
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">When?</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  name="dates"
                  placeholder="Travel dates" 
                  className="w-full pl-10 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
                  value={formData.dates}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Travelers</label>
              <div className="relative">
                <Users size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <select 
                  name="travelers"
                  className="w-full pl-10 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none"
                  value={formData.travelers}
                  onChange={handleInputChange}
                >
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>3 Adults</option>
                  <option>4+ Adults</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Travel Style</label>
              <select 
                name="travelStyle"
                className="w-full px-3 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none"
                value={formData.travelStyle}
                onChange={handleInputChange}
              >
                <option>Adventure</option>
                <option>Relaxation</option>
                <option>Cultural</option>
                <option>Luxury</option>
                <option>Budget-friendly</option>
              </select>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-sm font-medium">Special Interests</label>
            <div className="flex flex-wrap gap-2">
              {['Food & Dining', 'Hiking', 'History', 'Beaches', 'Nightlife', 'Shopping', 'Art', 'Photography'].map((interest) => (
                <label key={interest} className="flex items-center space-x-2 px-3 py-1.5 bg-muted hover:bg-secondary rounded-full cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded text-primary focus:ring-primary/25" 
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestToggle(interest)}
                  />
                  <span className="text-sm">{interest}</span>
                </label>
              ))}
            </div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            onClick={generateItinerary}
            className="w-full flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground bg-primary rounded-lg transition-colors hover:bg-primary/90"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating...
              </div>
            ) : (
              <>
                <Sparkles size={18} className="mr-2" />
                Generate AI Itinerary
              </>
            )}
          </motion.button>
        </motion.div>
      ) : (
        <motion.div 
          className="animate-fade-in"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium">Your Personalized Itinerary</h3>
            <button 
              onClick={() => setStep(1)}
              className="text-sm text-primary underline"
            >
              Edit Preferences
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-muted/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium">Bali Adventure</h4>
                  <p className="text-sm text-muted-foreground">7 days • 2 adults • Adventure</p>
                </div>
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                  AI Generated
                </span>
              </div>

              <div className="space-y-4">
                {['Day 1: Arrival & Ubud Exploration', 'Day 2: Sacred Monkey Forest & Rice Terraces', 'Day 3: Mount Batur Sunrise Trek', 'Day 4: Uluwatu Temple & Beach Day'].map((day, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{day}</p>
                    </div>
                  </div>
                ))}
                <Link to="/itinerary/bali-adventure-123" className="text-primary text-sm font-medium cursor-pointer inline-block">
                  View full itinerary →
                </Link>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <h5 className="text-sm font-medium mb-3">Travel Tips & Highlights</h5>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Umbrella size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">Best time to visit:</span> May to September for dry season with minimal rainfall.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Milestone size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">Why you'll love it:</span> Bali offers the perfect mix of cultural experiences, adventure, and relaxation with some of the friendliest locals.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <h5 className="text-sm font-medium mb-3">Recommended Add-ons</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-background/80 p-3 rounded-lg flex items-start">
                    <div className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center mr-2 mt-0.5">+</div>
                    <div>
                      <p className="text-sm font-medium">Private Beach Dinner</p>
                      <p className="text-xs text-muted-foreground">Romantic sunset dining experience</p>
                    </div>
                  </div>
                  <div className="bg-background/80 p-3 rounded-lg flex items-start">
                    <div className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center mr-2 mt-0.5">+</div>
                    <div>
                      <p className="text-sm font-medium">Spa Package</p>
                      <p className="text-xs text-muted-foreground">Traditional Balinese massage treatments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button 
                onClick={() => setShowPackingList(!showPackingList)}
                className="flex items-center text-sm text-primary"
              >
                <LucideShirt size={16} className="mr-1" />
                {showPackingList ? "Hide Packing List" : "Show Packing List"}
              </button>
              
              {user ? (
                <div className="flex items-center text-sm">
                  <Clock size={14} className="mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">Generated in 2.3s</span>
                </div>
              ) : (
                <Link to="/login" className="text-sm text-primary">
                  Sign in to save this itinerary
                </Link>
              )}
            </div>
            
            {showPackingList && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PackingListGenerator 
                  destination={formData.destination || "Bali"} 
                  travelStyle={formData.travelStyle} 
                />
              </motion.div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                className="flex-1 flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground bg-primary rounded-lg transition-colors hover:bg-primary/90"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Itinerary
              </motion.button>
              <Link 
                to="/booking" 
                className="flex-1 flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-primary bg-transparent rounded-lg border border-primary/25 transition-colors hover:bg-primary/5 hover:border-primary/40"
              >
                <motion.div
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Book Now <ArrowRight size={16} className="ml-2" />
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
