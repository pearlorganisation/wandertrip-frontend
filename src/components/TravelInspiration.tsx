
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Sparkles, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  tags: string[];
  gradient: string;
}

const destinations: Destination[] = [
  {
    id: 'dest-002',
    name: 'Santorini',
    location: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1080&auto=format&fit=crop',
    description: 'Experience the iconic blue domes and whitewashed buildings overlooking the azure Aegean Sea.',
    tags: ['Romantic', 'Beach', 'Scenic'],
    gradient: 'from-blue-400/40 to-indigo-500/40'
  },
  {
    id: 'dest-003',
    name: 'Kyoto',
    location: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1080&auto=format&fit=crop',
    description: 'Discover ancient temples, traditional tea houses, and enchanting bamboo forests.',
    tags: ['Cultural', 'Historic', 'Nature'],
    gradient: 'from-green-400/40 to-teal-500/40'
  },
  {
    id: 'trending-003',
    name: 'Machu Picchu',
    location: 'Peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1080&auto=format&fit=crop',
    description: 'Marvel at the ancient Incan citadel set high in the Andes Mountains.',
    tags: ['Adventure', 'Historic', 'Hiking'],
    gradient: 'from-yellow-400/40 to-amber-600/40'
  },
  {
    id: 'dest-004',
    name: 'Amalfi Coast',
    location: 'Italy',
    image: 'https://images.unsplash.com/photo-1612698093158-e07ac200d44e?q=80&w=1080&auto=format&fit=crop',
    description: 'Drive along the stunning coastline and visit charming cliffside villages.',
    tags: ['Scenic', 'Culinary', 'Relaxation'],
    gradient: 'from-blue-400/40 to-purple-500/40'
  },
  {
    id: 'trending-002',
    name: 'Bora Bora',
    location: 'French Polynesia',
    image: 'https://images.unsplash.com/photo-1589197331516-4d84b72ebde3',
    description: 'Experience luxury overwater bungalows in a turquoise lagoon paradise.',
    tags: ['Luxury', 'Beach', 'Romance'],
    gradient: 'from-cyan-400/40 to-blue-500/40'
  }
];

export default function TravelInspiration() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null);
  
  const allTags = Array.from(new Set(destinations.flatMap(dest => dest.tags)));
  
  const filteredDestinations = activeTag
    ? destinations.filter(dest => dest.tags.includes(activeTag))
    : destinations;
  
  return (
    <div className="py-16 bg-gradient-to-b from-background/80 to-background overflow-hidden">
      <div className="container px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-medium tracking-wide rounded-full bg-primary/10 text-primary">
            <Sparkles size={14} />
            <span>Travel Inspiration</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Discover Your Next Adventure
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore handpicked destinations that will inspire your wanderlust
          </p>
        </motion.div>
        
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <Button
            variant={activeTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTag(null)}
            className="rounded-full"
          >
            All
          </Button>
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={activeTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTag(tag)}
              className="rounded-full"
            >
              {tag}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <motion.div
                className={cn(
                  "group relative h-full overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br",
                  destination.gradient
                )}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredDestination(destination.id)}
                onHoverEnd={() => setHoveredDestination(null)}
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>
                
                <div className="relative z-10 flex h-full flex-col justify-end p-6">
                  <div className="mb-2 flex items-center">
                    <MapPin size={16} className="mr-1 text-primary" />
                    <span className="text-sm font-medium text-white/90">{destination.location}</span>
                  </div>
                  
                  <h3 className="mb-2 text-2xl font-bold text-white">{destination.name}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {destination.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="inline-block text-xs bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="mb-4 text-sm text-white/80">
                    {destination.description}
                  </p>
                  
                  <Link 
                    to={`/destination/${destination.id}`} 
                    className="inline-flex items-center justify-between text-sm font-medium text-white"
                  >
                    <span>Explore Destination</span>
                    <motion.div
                      animate={hoveredDestination === destination.id 
                        ? { x: 5, transition: { repeat: Infinity, repeatType: "mirror", duration: 0.6 } } 
                        : { x: 0 }}
                    >
                      <ArrowRight size={16} className="ml-1" />
                    </motion.div>
                  </Link>
                </div>
                
                <motion.div
                  className="absolute top-3 right-3 origin-top-right"
                  initial={{ scale: 0 }}
                  animate={hoveredDestination === destination.id ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                          <Info size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="w-80 p-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">{destination.name}</h4>
                          <p className="text-sm text-muted-foreground">{destination.description}</p>
                          <p className="text-xs">Best time to visit: May to September</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/destinations">
              View All Destinations
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
