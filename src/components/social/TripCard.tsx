
import { useState } from 'react';
import { Crown, Shield, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TripHighlight {
  title: string;
  image: string;
  description: string;
}

interface TripStats {
  days: number;
  photos: number;
  places: number;
  spending: number;
  currency: string;
}

interface TripCardProps {
  trip: {
    id: string;
    destination: string;
    date: string;
    coverImage: string;
    status: string;
    exclusivity: string;
    highlights: TripHighlight[];
    stats: TripStats;
  };
  selectedTemplate: {
    id: string;
    name: string;
  };
  exclusiveMode: boolean;
  showStats: boolean;
}

export const TripCard = ({ trip, selectedTemplate, exclusiveMode, showStats }: TripCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-xl overflow-hidden relative shadow-lg border", 
        selectedTemplate.id === 'prestige' ? "border-slate-700 bg-slate-50 dark:bg-slate-900" :
        selectedTemplate.id === 'luxury' ? "border-amber-200 bg-amber-50 dark:bg-amber-900/20" :
        selectedTemplate.id === 'exclusive' ? "border-purple-200 bg-purple-50 dark:bg-purple-900/20" :
        "border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20"
      )}
    >
      <div className="relative p-6 md:p-8">
        {exclusiveMode && (
          <div className="absolute top-4 right-4 z-10">
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold flex items-center",
              selectedTemplate.id === 'prestige' ? "bg-slate-900 text-white" :
              selectedTemplate.id === 'luxury' ? "bg-gradient-to-r from-amber-600 to-yellow-500 text-white" :
              selectedTemplate.id === 'exclusive' ? "bg-gradient-to-r from-purple-700 to-pink-600 text-white" :
              "bg-gradient-to-r from-emerald-600 to-teal-500 text-white"
            )}>
              <Shield size={12} className="mr-1.5" />
              {trip.status}
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-medium mb-2 flex items-center">
            {exclusiveMode && <Crown size={20} className="mr-2 text-amber-500" />}
            My {trip.destination} Journey
          </h2>
          <p className="text-muted-foreground">{trip.date} • {trip.stats.days} days</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {trip.highlights.map((highlight, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-background/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow"
            >
              <div className="aspect-video relative">
                <img 
                  src={highlight.image} 
                  alt={highlight.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {exclusiveMode && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                      <Star size={10} className="mr-1 text-amber-400" />
                      Exclusive
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm mb-1">{highlight.title}</h3>
                <p className="text-xs text-muted-foreground">{highlight.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {showStats && (
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 mb-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-medium mb-3 flex items-center">
              {exclusiveMode ? (
                <>
                  <Crown size={16} className="text-amber-500 mr-1" />
                  Elite Travel Status
                </>
              ) : (
                <>
                  <Star size={16} className="text-primary mr-1" />
                  Travel Statistics
                </>
              )}
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-background/50 p-2 rounded-lg">
                <p className="text-2xl font-medium">{trip.stats.days}</p>
                <p className="text-xs text-muted-foreground">Days</p>
              </div>
              <div className="bg-background/50 p-2 rounded-lg">
                <p className="text-2xl font-medium">{trip.stats.photos}</p>
                <p className="text-xs text-muted-foreground">Photos</p>
              </div>
              <div className="bg-background/50 p-2 rounded-lg">
                <p className="text-2xl font-medium">{trip.stats.places}</p>
                <p className="text-xs text-muted-foreground">Places</p>
              </div>
              <div className="bg-background/50 p-2 rounded-lg">
                <p className="text-2xl font-medium">${trip.stats.spending}</p>
                <p className="text-xs text-muted-foreground">Spent</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
