
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Cloud, CloudRain, Sun, Umbrella } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Day {
  day: number;
  title: string;
}

interface ItineraryDaySelectorProps {
  days: Day[];
  activeDay: number;
  setActiveDay: (day: number) => void;
}

export const ItineraryDaySelector = ({ days, activeDay, setActiveDay }: ItineraryDaySelectorProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeDayRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();
  const [showWeather, setShowWeather] = useState(!isMobile);

  // Mock weather data for the trip days
  const weatherData = [
    { icon: <Sun className="text-yellow-500" size={14} />, temp: '29°C', conditions: 'Sunny' },
    { icon: <Cloud className="text-gray-400" size={14} />, temp: '26°C', conditions: 'Cloudy' },
    { icon: <Sun className="text-yellow-500" size={14} />, temp: '30°C', conditions: 'Sunny' },
    { icon: <CloudRain className="text-blue-400" size={14} />, temp: '24°C', conditions: 'Rain' },
    { icon: <Cloud className="text-gray-400" size={14} />, temp: '27°C', conditions: 'Cloudy' },
    { icon: <Sun className="text-yellow-500" size={14} />, temp: '28°C', conditions: 'Sunny' },
    { icon: <Umbrella className="text-indigo-400" size={14} />, temp: '25°C', conditions: 'Showers' },
  ];

  // This effect scrolls the active day into view when it changes
  useEffect(() => {
    if (scrollContainerRef.current && activeDayRef.current) {
      const container = scrollContainerRef.current;
      const activeButton = activeDayRef.current;
      
      // Calculate the position to scroll to (center the active button)
      const scrollLeft = activeButton.offsetLeft - (container.offsetWidth / 2) + (activeButton.offsetWidth / 2);
      
      // Scroll smoothly to the position
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [activeDay]);

  return (
    <div 
      className={cn(
        "overflow-x-auto pb-2 -mx-4 px-4 hide-scrollbar",
        isMobile ? "sticky top-[56px] z-20 pt-2 pb-1 bg-background/95 backdrop-blur-md shadow-sm border-b border-border/30 mb-4" : "mb-6"
      )} 
      ref={scrollContainerRef}
    >
      <div className="flex gap-2 min-w-max py-2">
        {days.map((day, index) => {
          const weather = weatherData[index % weatherData.length];
          return (
            <motion.button
              key={day.day}
              ref={activeDay === day.day ? activeDayRef : null}
              onClick={() => setActiveDay(day.day)}
              className={cn(
                "relative px-4 py-2 rounded-lg flex flex-col items-center justify-center transition-all whitespace-nowrap shadow-sm min-w-16",
                isMobile ? "py-1.5 px-3 min-w-14" : "",
                activeDay === day.day
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted/60 hover:bg-muted border border-border/40"
              )}
              whileHover={{ scale: activeDay !== day.day ? 1.05 : 1 }}
              animate={{ scale: activeDay === day.day ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className={cn("font-medium", isMobile ? "text-sm" : "text-base")}>Day {day.day}</span>
              <span className={cn("opacity-80", isMobile ? "text-[10px]" : "text-xs")}>{day.title}</span>
              
              {showWeather && (
                <div className={cn(
                  "flex items-center gap-1 mt-1",
                  activeDay === day.day ? "text-primary-foreground/90" : "text-muted-foreground"
                )}>
                  {weather.icon}
                  <span className="text-[10px]">{weather.temp}</span>
                </div>
              )}
              
              {activeDay === day.day && (
                <div className="absolute inset-0 rounded-lg border-2 border-primary/30 animate-pulse pointer-events-none" />
              )}
            </motion.button>
          );
        })}
      </div>
      
      {!isMobile && (
        <div className="flex justify-end mt-2">
          <button 
            className="text-xs text-primary flex items-center"
            onClick={() => setShowWeather(!showWeather)}
          >
            {showWeather ? 'Hide weather' : 'Show weather'}
          </button>
        </div>
      )}
    </div>
  );
};
