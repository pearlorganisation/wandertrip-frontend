
import { cn } from '@/lib/utils';
import { Sunrise, Camera, Utensils, Plane, MapPin, FileText, AlertCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import ActivityManager from './ActivityManager';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: JSX.Element;
  location?: string;
  price?: number | null;
  isPaid?: boolean;
  isBooked?: boolean;
  cancellationPolicy?: string;
}

interface DayDetailsProps {
  day: {
    day: number;
    title: string;
    image: string;
    activities: Activity[];
  };
  showEmergencyContacts: boolean;
  setShowEmergencyContacts: (show: boolean) => void;
}

export const DaySchedule = ({ day, showEmergencyContacts, setShowEmergencyContacts }: DayDetailsProps) => {
  const [useEnhancedView, setUseEnhancedView] = useState(true);
  const [destination, setDestination] = useState('Bali');
  const [showWeatherAlert, setShowWeatherAlert] = useState(true);
  
  // Ensure all activities have IDs
  const enhancedActivities = day.activities.map(activity => ({
    id: activity.id || `activity-${activity.title.replace(/\s+/g, '-').toLowerCase()}`,
    time: activity.time,
    title: activity.title,
    description: activity.description,
    location: activity.location || destination,
    price: activity.price !== undefined ? activity.price : null,
    isPaid: activity.isPaid !== undefined ? activity.isPaid : false,
    isBooked: activity.isBooked !== undefined ? activity.isBooked : false,
    icon: activity.icon,
    cancellationPolicy: activity.cancellationPolicy || 'Free cancellation up to 24 hours before the activity'
  }));
  
  const handleToggleView = () => {
    setUseEnhancedView(!useEnhancedView);
    toast({
      title: "View updated",
      description: `Switched to ${!useEnhancedView ? "Enhanced" : "Classic"} view`,
      duration: 1500,
    });
  };

  const weatherInfo = {
    forecast: "Mostly sunny, chance of afternoon showers",
    temperature: "28°C / 82°F",
    humidity: "75%",
    rainChance: "30%",
    sunrise: "06:15",
    sunset: "18:45",
  };
  
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <img 
              src={day.image} 
              alt={day.title}
              className="w-full h-80 object-cover rounded-2xl mb-6" 
            />
            
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-medium">Day {day.day}: {day.title}</h2>
              
              <button 
                onClick={handleToggleView}
                className="text-sm text-primary underline"
              >
                {useEnhancedView ? "Classic View" : "Enhanced View"}
              </button>
            </div>
            
            <p className="text-muted-foreground mb-4">
              Experience the perfect blend of culture and adventure on Day {day.day} of your {destination} journey.
            </p>
            
            {showWeatherAlert && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200 relative">
                <button 
                  className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
                  onClick={() => setShowWeatherAlert(false)}
                >
                  ×
                </button>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Info size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-900">Today's Weather</h3>
                    <p className="text-xs text-blue-700 mt-1">{weatherInfo.forecast}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="info" size="sm">{weatherInfo.temperature}</Badge>
                      <Badge variant="info" size="sm">Rain: {weatherInfo.rainChance}</Badge>
                      <Badge variant="info" size="sm">Sunrise: {weatherInfo.sunrise}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center mr-3">
                  <Sunrise size={16} className="text-primary" />
                </div>
                <span className="text-sm">Early start to maximize your day</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center mr-3">
                  <Camera size={16} className="text-primary" />
                </div>
                <span className="text-sm">Stunning photo opportunities</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center mr-3">
                  <Utensils size={16} className="text-primary" />
                </div>
                <span className="text-sm">Local cuisine experiences</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
              <h3 className="text-sm font-medium mb-2">On-Trip Assistance</h3>
              <div className="space-y-2">
                <Link 
                  to="/on-trip-assistance" 
                  className="flex items-center text-primary text-sm"
                >
                  <Plane size={14} className="mr-2" />
                  Real-time travel updates
                </Link>
                <Link 
                  to="/on-trip-assistance?tab=local" 
                  className="flex items-center text-primary text-sm"
                >
                  <MapPin size={14} className="mr-2" />
                  Local recommendations
                </Link>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setShowEmergencyContacts(!showEmergencyContacts)}
                        className="flex items-center text-primary text-sm"
                      >
                        <FileText size={14} className="mr-2" />
                        Emergency contacts
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Access important local contacts</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <AlertCircle size={16} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-amber-900">Health & Safety</h3>
                  <p className="text-xs text-amber-700 mt-1">
                    Remember to stay hydrated and use sun protection during outdoor activities today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-8">
          {useEnhancedView ? (
            <ActivityManager 
              activities={enhancedActivities}
              dayNumber={day.day}
              destination={destination}
              date="June 16, 2024"
            />
          ) : (
            <div className="relative pl-6 border-l border-border">
              {enhancedActivities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className={cn(
                    "glass relative mb-10 p-6 rounded-xl",
                    index % 2 === 0 ? "bg-background/70" : "glass-dark"
                  )}
                >
                  <div className="absolute top-6 -left-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    {activity.icon}
                  </div>
                  
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary inline-block mb-2">
                    {activity.time}
                  </span>
                  <h3 className="text-lg font-medium mb-2">{activity.title}</h3>
                  <p className="text-muted-foreground">{activity.description}</p>
                  
                  {index === 1 && (
                    <div className="mt-4 p-4 rounded-lg bg-secondary/40">
                      <div className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-primary text-xs">AI</span>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            <span className="text-foreground font-medium">AI Tip:</span> Best time to visit is early morning to avoid crowds. Bring cash for entrance fees and water as it can get hot.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
