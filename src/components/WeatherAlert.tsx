
import React from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, CloudSnow, Wind, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface WeatherAlertProps {
  destination: string;
  condition: 'clear' | 'cloudy' | 'rain' | 'storm' | 'snow' | 'windy' | 'extreme';
  temperature?: {
    min: number;
    max: number;
    unit: 'celsius' | 'fahrenheit';
  };
  forecast?: string;
  travelDate?: string;
  className?: string;
}

export const WeatherAlert = ({
  destination,
  condition,
  temperature,
  forecast,
  travelDate,
  className
}: WeatherAlertProps) => {
  
  // Weather icon mapping
  const weatherIcons = {
    clear: <Sun className="h-6 w-6 text-amber-500" />,
    cloudy: <Cloud className="h-6 w-6 text-slate-500" />,
    rain: <CloudRain className="h-6 w-6 text-blue-500" />,
    storm: <CloudLightning className="h-6 w-6 text-purple-500" />,
    snow: <CloudSnow className="h-6 w-6 text-sky-300" />,
    windy: <Wind className="h-6 w-6 text-cyan-600" />,
    extreme: <AlertTriangle className="h-6 w-6 text-red-500" />
  };
  
  // Weather titles and descriptions
  const weatherInfo = {
    clear: {
      title: 'Clear Skies Expected',
      description: 'Pack sunscreen and light clothing, perfect for outdoor activities.',
      severity: 'low'
    },
    cloudy: {
      title: 'Cloudy Conditions',
      description: 'Mild temperatures, good for sightseeing. Consider a light jacket.',
      severity: 'low'
    },
    rain: {
      title: 'Rain Expected',
      description: 'Pack a raincoat and waterproof footwear. Consider indoor activities.',
      severity: 'medium'
    },
    storm: {
      title: 'Storms Forecasted',
      description: 'Be prepared for strong storms. Check local advisories before outdoor activities.',
      severity: 'high'
    },
    snow: {
      title: 'Snow Conditions',
      description: 'Pack warm clothing and appropriate footwear. Check for road closures.',
      severity: 'medium'
    },
    windy: {
      title: 'Windy Conditions',
      description: 'Secure loose items and be cautious in exposed areas.',
      severity: 'medium'
    },
    extreme: {
      title: 'Extreme Weather Alert',
      description: 'Potential severe conditions. Monitor local weather updates closely.',
      severity: 'critical'
    }
  };
  
  const info = weatherInfo[condition];
  
  // Alert styling based on severity
  const severityStyles = {
    low: 'bg-green-50 border-green-200',
    medium: 'bg-amber-50 border-amber-200',
    high: 'bg-orange-50 border-orange-200',
    critical: 'bg-red-50 border-red-200'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Alert className={cn("border", severityStyles[info.severity])}>
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{weatherIcons[condition]}</div>
          <div>
            <AlertTitle className="mb-1">
              {info.title} in {destination}
              {travelDate && <span className="font-normal text-sm ml-2">({travelDate})</span>}
            </AlertTitle>
            <AlertDescription className="text-sm">
              {info.description}
              {temperature && (
                <span className="block mt-1">
                  Expected temperatures between {temperature.min}° and {temperature.max}° {temperature.unit === 'celsius' ? 'C' : 'F'}.
                </span>
              )}
              {forecast && (
                <span className="block mt-1 text-xs opacity-80">
                  {forecast}
                </span>
              )}
            </AlertDescription>
            
            {condition === 'extreme' && (
              <div className="mt-2 p-2 bg-red-100 rounded text-xs text-red-700">
                <strong>Important:</strong> Monitor local news and weather services for updates on this extreme weather event.
              </div>
            )}
          </div>
        </div>
      </Alert>
    </motion.div>
  );
};

export default WeatherAlert;
