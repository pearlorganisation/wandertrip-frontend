
import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Umbrella } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeatherForecastProps {
  destination: string;
  dateRange?: string;
  personalizedPreferences?: Record<string, string>;
}

interface WeatherDay {
  day: string;
  icon: React.ReactNode;
  temp: string;
  condition: string;
}

export default function WeatherForecast({ destination, dateRange, personalizedPreferences }: WeatherForecastProps) {
  const [forecast, setForecast] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!destination) return;
    
    // In a real app, this would be an API call to a weather service
    // For this demo, we'll simulate weather data
    setLoading(true);
    const delay = setTimeout(() => {
      const mockForecast = generateMockForecast();
      setForecast(mockForecast);
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(delay);
  }, [destination]);

  const generateMockForecast = () => {
    // We could use personalizedPreferences here to customize the forecast if needed
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const conditions = [
      { condition: 'Sunny', icon: <Sun className="text-yellow-500" size={20} /> },
      { condition: 'Cloudy', icon: <Cloud className="text-gray-400" size={20} /> },
      { condition: 'Rainy', icon: <CloudRain className="text-blue-400" size={20} /> },
      { condition: 'Windy', icon: <Wind className="text-blue-300" size={20} /> },
    ];
    
    return days.map(day => {
      const randomIndex = Math.floor(Math.random() * conditions.length);
      const randomTemp = Math.floor(Math.random() * 15) + 15; // 15-30°C
      
      return {
        day,
        ...conditions[randomIndex],
        temp: `${randomTemp}°C`,
      };
    });
  };

  if (!destination) {
    return null;
  }

  return (
    <div className="glass p-4 rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">Weather Forecast</h3>
        <div className="text-xs text-muted-foreground">{dateRange || 'Next 7 days'}</div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-6">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {forecast.map((day, index) => (
            <motion.div 
              key={day.day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex flex-col items-center"
            >
              <span className="text-xs font-medium mb-1">{day.day}</span>
              <div className="mb-1">{day.icon}</div>
              <span className="text-xs font-medium">{day.temp}</span>
              <span className="text-xs text-muted-foreground">{day.condition}</span>
            </motion.div>
          ))}
        </div>
      )}
      
      <div className="mt-3 pt-2 border-t border-border/30">
        <div className="flex items-start text-xs">
          <Umbrella size={14} className="text-primary mr-1 flex-shrink-0 mt-0.5" />
          <span className="text-muted-foreground">
            {destination === "Bali" 
              ? "Rainy season from November to March. Pack light rain gear."
              : `Best weather for ${destination} is typically during summer months.`
            }
          </span>
        </div>
      </div>
    </div>
  );
}
