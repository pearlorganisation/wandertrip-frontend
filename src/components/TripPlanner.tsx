import { useState, useCallback, useRef } from 'react';
import { Calendar as CalendarIcon, MapPin, Users, Sparkles, LucideShirt } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import PackingListGenerator from './PackingListGenerator';
import PersonalizedTripQuestions from './PersonalizedTripQuestions';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface TripPlannerProps {
  onGenerate?: (formData: any) => void;
}

export default function TripPlanner({ onGenerate }: TripPlannerProps = {}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPackingList, setShowPackingList] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const destinationRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    destination: '',
    dates: '',
    travelers: {
      adults: 1,
      children: 0
    },
    travelStyle: 'Adventure',
    interests: [] as string[],
    personalizedPreferences: {}
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'destination' && value.length > 1) {
      setShowDestinationSuggestions(true);
    } else {
      setShowDestinationSuggestions(false);
    }
  };

  const handleTravelersChange = (type: 'adults' | 'children', value: number) => {
    setFormData(prev => ({
      ...prev,
      travelers: {
        ...prev.travelers,
        [type]: value
      }
    }));
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

  const handleDestinationSelect = (destination: string) => {
    setFormData(prev => ({ ...prev, destination }));
    setShowDestinationSuggestions(false);
  };

  const handleDateSelect = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
    if (range.from && range.to) {
      const formatted = `${format(range.from, 'MMM d')} - ${format(range.to, 'MMM d, yyyy')}`;
      setFormData(prev => ({ ...prev, dates: formatted }));
    }
  };

  const handlePersonalizedSuggestion = (questionId: string, answer: string) => {
    // Store personalized preferences in form data
    setFormData(prev => ({
      ...prev,
      personalizedPreferences: {
        ...prev.personalizedPreferences,
        [questionId]: answer
      }
    }));
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
        toast.success("Itinerary generated successfully!");
      }
    }, 1500);
  }, [formData, onGenerate]);

  // Popular destinations for suggestions
  const popularDestinations = [
    "Bali, Indonesia",
    "Paris, France",
    "Tokyo, Japan",
    "New York, USA",
    "London, UK",
    "Rome, Italy",
    "Barcelona, Spain",
    "Santorini, Greece"
  ];

  const filteredDestinations = formData.destination
    ? popularDestinations.filter(dest =>
      dest.toLowerCase().includes(formData.destination.toLowerCase())
    )
    : [];

  return (
    <div className="bg-background border border-border/40 rounded-xl p-6 shadow-sm">
      {step === 1 ? (
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-medium mb-4">Plan Your Trip</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 relative">
              <label className="text-sm font-medium">Where to?</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  ref={destinationRef}
                  type="text"
                  name="destination"
                  placeholder="Destination"
                  className="w-full pl-10 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
                  value={formData.destination}
                  onChange={handleInputChange}
                  onFocus={() => {
                    if (formData.destination.length > 1) {
                      setShowDestinationSuggestions(true);
                    }
                  }}
                />
              </div>
              {/* Destination suggestions */}
              {showDestinationSuggestions && filteredDestinations.length > 0 && (
                <div className="absolute z-50 mt-1 w-full bg-background border border-border rounded-lg shadow-lg">
                  <ul className="py-1 max-h-60 overflow-auto">
                    {filteredDestinations.map((destination, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-muted cursor-pointer text-sm"
                        onClick={() => handleDestinationSelect(destination)}
                      >
                        {destination}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">When?</label>
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative cursor-pointer">
                      <CalendarIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        name="dates"
                        placeholder="Travel dates"
                        className="w-full pl-10 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 cursor-pointer"
                        value={formData.dates}
                        readOnly
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={handleDateSelect}
                      numberOfMonths={2}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Travelers</label>
            <div className="flex items-center gap-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Adults</label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleTravelersChange('adults', Math.max(1, formData.travelers.adults - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-muted rounded-l-lg border-y border-l border-border"
                  >
                    -
                  </button>
                  <div className="w-10 h-8 flex items-center justify-center border-y border-border">
                    {formData.travelers.adults}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTravelersChange('adults', formData.travelers.adults + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-muted rounded-r-lg border-y border-r border-border"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Children</label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleTravelersChange('children', Math.max(0, formData.travelers.children - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-muted rounded-l-lg border-y border-l border-border"
                  >
                    -
                  </button>
                  <div className="w-10 h-8 flex items-center justify-center border-y border-border">
                    {formData.travelers.children}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTravelersChange('children', formData.travelers.children + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-muted rounded-r-lg border-y border-r border-border"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Travel Style</label>
            <select
              name="travelStyle"
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none"
              value={formData.travelStyle}
              onChange={handleInputChange}
            >
              <option>Adventure</option>
              <option>Relaxation</option>
              <option>Cultural</option>
              <option>Luxury</option>
              <option>Budget-friendly</option>
              <option>Family-friendly</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Interests (Optional)</label>
            <div className="flex flex-wrap gap-2">
              {['Food', 'Hiking', 'History', 'Beaches', 'Nightlife', 'Shopping'].map((interest) => (
                <label key={interest} className="flex items-center space-x-2 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full cursor-pointer">
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
          </div>

          {formData.destination && (
            <PersonalizedTripQuestions
              destination={formData.destination}
              travelStyle={formData.travelStyle}
              onAnswer={handlePersonalizedSuggestion}
            />
          )}

          <Button
            onClick={generateItinerary}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating...
              </div>
            ) : (
              <>
                <Sparkles size={16} className="mr-2" />
                Generate Itinerary
              </>
            )}
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Your Personalized Itinerary</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep(1)}
            >
              Edit Details
            </Button>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium">{formData.destination || "Bali"} Adventure</h4>
                <p className="text-sm text-muted-foreground">
                  {formData.dates || "7 days"} • {formData.travelers.adults + formData.travelers.children} travelers • {formData.travelStyle}
                </p>
              </div>
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                AI Generated
              </span>
            </div>

            <div className="space-y-3">
              {['Day 1: Arrival & Exploration', 'Day 2: Cultural Immersion', 'Day 3: Adventure Activities', 'Day 4: Relaxation Day'].map((day, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium mr-2.5 mt-0.5">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{day}</p>
                  </div>
                </div>
              ))}
              <Link to="/itinerary/bali-adventure-123" className="text-primary text-sm font-medium inline-block">
                View full itinerary →
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPackingList(!showPackingList)}
              className="text-muted-foreground"
            >
              <LucideShirt size={16} className="mr-1.5" />
              {showPackingList ? "Hide Packing List" : "Show Packing List"}
            </Button>
          </div>

          {showPackingList && (
            <PackingListGenerator
              destination={formData.destination || "Bali"}
              travelStyle={formData.travelStyle}
            />
          )}

          <div className="flex gap-3 mt-4">
            <Button className="flex-1">
              Save Itinerary
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link to="/booking">Book Now</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
