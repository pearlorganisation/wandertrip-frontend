
import { useState, useCallback } from 'react';
import { Calendar, MapPin, Users, Sparkles, DollarSign, CreditCard, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface ImprovedTripPlannerProps {
  onGenerate?: (formData: any) => void;
  className?: string;
}

export default function ImprovedTripPlanner({ onGenerate, className }: ImprovedTripPlannerProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    dates: '',
    travelers: '1 Adult',
    travelStyle: 'Adventure',
    budget: '$1,000 - $2,000',
    interests: [] as string[]
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    
    // Simulate API call
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

  return (
    <div className={cn("glass rounded-xl p-6 md:p-8", className)}>
      {step === 1 ? (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-medium mb-2">Plan Your Perfect Trip</h2>
            <p className="text-muted-foreground">Our AI will create a personalized itinerary just for you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <option>2 Adults, 1 Child</option>
                  <option>2 Adults, 2 Children</option>
                  <option>Group (5+)</option>
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
                <option>Family</option>
                <option>Romantic</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Budget Range</label>
              <div className="relative">
                <DollarSign size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <select 
                  name="budget"
                  className="w-full pl-10 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none"
                  value={formData.budget}
                  onChange={handleInputChange}
                >
                  <option>Under $1,000</option>
                  <option>$1,000 - $2,000</option>
                  <option>$2,000 - $5,000</option>
                  <option>$5,000 - $10,000</option>
                  <option>$10,000+</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">What interests you?</label>
            <div className="flex flex-wrap gap-2">
              {[
                'Food & Dining', 'Hiking', 'History', 'Beaches', 'Nightlife', 
                'Shopping', 'Art', 'Photography', 'Wildlife', 'Architecture', 
                'Local Experiences', 'Wellness'
              ].map((interest) => (
                <label 
                  key={interest} 
                  className={cn(
                    "flex items-center space-x-2 px-3 py-1.5 rounded-full cursor-pointer transition-colors",
                    formData.interests.includes(interest)
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-muted hover:bg-muted/80 border border-transparent"
                  )}
                >
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestToggle(interest)}
                  />
                  <span className="text-sm">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={generateItinerary}
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground bg-primary rounded-lg transition-colors hover:bg-primary/90 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating Your Trip...
                </>
              ) : (
                <>
                  <Sparkles size={18} className="mr-2" />
                  Create AI Travel Plan
                </>
              )}
            </button>
            
            <p className="text-xs text-center text-muted-foreground mt-3">
              Our AI generates unique itineraries based on your preferences and travel style
            </p>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 mb-2 text-xs font-medium bg-primary/10 text-primary rounded-full">
              AI Generated
            </span>
            <h2 className="text-2xl font-medium mb-2">Your Personalized Itinerary</h2>
            <p className="text-muted-foreground">Crafted based on your preferences for {formData.destination}</p>
          </div>

          <div className="bg-muted/40 rounded-xl p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-medium">{formData.destination} Adventure</h3>
                <p className="text-sm text-muted-foreground">
                  {formData.dates || '7 days'} • {formData.travelers} • {formData.travelStyle}
                </p>
              </div>
              
              <div className="flex items-center space-x-1 px-3 py-1.5 bg-background/80 rounded-lg text-sm">
                <DollarSign size={16} className="text-primary" />
                <span>{formData.budget}</span>
              </div>
            </div>
            
            <div className="space-y-5">
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="mr-2 text-primary"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                    <path d="M8 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 18h.01" />
                    <path d="M12 18h.01" />
                    <path d="M16 18h.01" />
                  </svg>
                  Daily Itinerary
                </h4>
                
                <div className="space-y-3">
                  {[
                    {
                      day: 'Day 1', 
                      title: 'Arrival & Exploration', 
                      description: 'Check into hotel, local market tour, welcome dinner'
                    },
                    {
                      day: 'Day 2', 
                      title: 'Cultural Immersion', 
                      description: 'Historical sites, museum visits, traditional lunch'
                    },
                    {
                      day: 'Day 3', 
                      title: 'Nature & Adventure', 
                      description: 'Hiking, scenic viewpoints, outdoor activities'
                    },
                    {
                      day: 'Day 4', 
                      title: 'Local Experiences', 
                      description: 'Cooking class, artisan workshops, local entertainment'
                    }
                  ].map((day, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h5 className="font-medium">{day.title}</h5>
                        <p className="text-sm text-muted-foreground">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 text-center">
                  <Link 
                    to="/itinerary/detailed-plan"
                    className="text-primary text-sm font-medium inline-flex items-center"
                  >
                    View full detailed itinerary
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="ml-1"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/40 rounded-xl p-6 mb-6">
            <h4 className="font-medium mb-3 flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mr-2 text-primary"
              >
                <path d="M20 7h-9" />
                <path d="M14 17H5" />
                <circle cx="17" cy="17" r="3" />
                <circle cx="7" cy="7" r="3" />
              </svg>
              AI-Powered Insights
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-background/80 p-3 rounded-lg">
                <h5 className="text-sm font-medium mb-1">Best Time to Visit</h5>
                <p className="text-xs text-muted-foreground">
                  {formData.destination === 'Bali' 
                    ? 'May to September offers dry weather with minimal rainfall.'
                    : 'Spring (March-May) and Fall (Sept-Nov) offer ideal weather.'}
                </p>
              </div>
              <div className="bg-background/80 p-3 rounded-lg">
                <h5 className="text-sm font-medium mb-1">Local Transportation</h5>
                <p className="text-xs text-muted-foreground">
                  {formData.destination === 'Bali' 
                    ? 'Rent a scooter or use ride-hailing apps like Gojek or Grab.'
                    : 'Public transit is efficient, consider getting a travel pass.'}
                </p>
              </div>
              <div className="bg-background/80 p-3 rounded-lg">
                <h5 className="text-sm font-medium mb-1">Must-Try Experiences</h5>
                <p className="text-xs text-muted-foreground">
                  Based on your interests in {formData.interests.slice(0, 2).join(', ')}
                </p>
              </div>
              <div className="bg-background/80 p-3 rounded-lg">
                <h5 className="text-sm font-medium mb-1">Budget Optimization</h5>
                <p className="text-xs text-muted-foreground">
                  Tips to make the most of your {formData.budget} budget
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-2">
            <h4 className="font-medium mb-4">Ready to make this journey a reality?</h4>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                to="/booking" 
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground bg-primary rounded-lg transition-colors hover:bg-primary/90"
              >
                <CreditCard size={18} className="mr-2" />
                Book This Trip
              </Link>
              
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                Modify Plan
              </button>
              
              <button 
                onClick={() => toast.success("Itinerary shared!", { description: "A link has been copied to your clipboard." })}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-primary border border-primary/25 rounded-lg hover:bg-primary/5 transition-colors"
              >
                <Send size={18} className="mr-2" />
                Share
              </button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              You can modify your itinerary anytime before booking
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
