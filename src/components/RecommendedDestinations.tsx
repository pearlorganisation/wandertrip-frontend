
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reason?: string;
  theme?: string;
  price?: {
    value: number;
    currency: string;
    duration: string;
  };
  highlights?: string[];
}

interface RecommendedDestinationsProps {
  title: string;
  destinations: Destination[];
  className?: string;
  showReason?: boolean;
}

export default function RecommendedDestinations({
  title,
  destinations,
  className,
  showReason = false
}: RecommendedDestinationsProps) {
  
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
    <div className={className}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <Button variant="ghost" size="sm" className="text-primary" asChild>
            <Link to="/destinations" className="flex items-center">
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      )}
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {destinations.map((destination) => (
          <motion.div 
            key={destination.id}
            className="group rounded-xl overflow-hidden border hover-scale"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative h-48">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              
              <button className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                <Heart size={16} />
              </button>
              
              {destination.theme && (
                <span className="absolute top-3 left-3 text-xs font-medium bg-white/80 backdrop-blur-sm text-gray-800 rounded-full px-2 py-1">
                  {destination.theme}
                </span>
              )}
              
              <div className="absolute bottom-3 left-3 text-white">
                <h4 className="font-medium text-lg">{destination.name}</h4>
                <p className="text-white/80 text-sm">{destination.location}</p>
              </div>
              
              <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                <span className="text-yellow-300 mr-1">★</span>
                <span className="text-xs text-white font-medium">{destination.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="p-4">
              {showReason && destination.reason && (
                <div className="mb-3 text-sm text-muted-foreground">
                  <span className="font-medium text-primary">Why we suggest this:</span> {destination.reason}
                </div>
              )}
              
              {destination.price && (
                <div className="mb-3">
                  <span className="font-medium">From {destination.price.value} {destination.price.currency}</span>
                  <span className="text-xs text-muted-foreground ml-1">{destination.price.duration}</span>
                </div>
              )}
              
              {destination.highlights && destination.highlights.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium mb-1">Highlights:</p>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-muted/40 px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-2">
                <Button variant="outline" size="sm">Learn More</Button>
                <Button size="sm" asChild>
                  <Link to={`/destination/${destination.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
