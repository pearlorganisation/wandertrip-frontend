
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TravelPersonalityProps {
  personality: {
    type: string;
    emoji: string;
    description: string;
    compatibleDestinations: string[];
  };
  className?: string;
}

export default function TravelPersonalityCard({ personality, className }: TravelPersonalityProps) {
  return (
    <motion.div 
      className={cn("rounded-xl overflow-hidden", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-indigo-100/50 to-blue-100/50 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center mb-2">
              <span className="text-4xl mr-3">{personality.emoji}</span>
              <div>
                <h3 className="text-xl font-medium">Your Travel Personality</h3>
                <p className="text-lg font-semibold text-primary">{personality.type}</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              {personality.description}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 text-sm">
              <p className="font-medium mb-1">Compatible Destinations</p>
              <div className="flex flex-wrap gap-2">
                {personality.compatibleDestinations.map((destination, index) => (
                  <span 
                    key={index}
                    className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                  >
                    {destination}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:hidden mt-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 text-sm">
            <p className="font-medium mb-1">Compatible Destinations</p>
            <div className="flex flex-wrap gap-2">
              {personality.compatibleDestinations.map((destination, index) => (
                <span 
                  key={index}
                  className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                >
                  {destination}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
