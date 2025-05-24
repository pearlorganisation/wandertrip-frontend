
import { Crown, Filter, Search, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface Trip {
  id: string;
  destination: string;
  date: string;
  coverImage: string;
  status: string;
  exclusivity: string;
  highlights: {
    title: string;
    image: string;
    description: string;
  }[];
  stats: {
    days: number;
    photos: number;
    places: number;
    spending: number;
    currency: string;
  };
}

interface TripSelectorProps {
  trips: Trip[];
  selectedTripId: string;
  onTripSelect: (trip: Trip) => void;
}

export const TripSelector = ({ trips, selectedTripId, onTripSelect }: TripSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [exclusivityFilter, setExclusivityFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'destination' | 'exclusivity'>('date');
  
  // Filter trips based on search query and exclusivity filter
  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExclusivity = !exclusivityFilter || trip.exclusivity === exclusivityFilter;
    return matchesSearch && matchesExclusivity;
  });
  
  // Sort filtered trips based on the selected sort option
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (sortBy === 'destination') {
      return a.destination.localeCompare(b.destination);
    } else if (sortBy === 'exclusivity') {
      return a.exclusivity.localeCompare(b.exclusivity);
    } else {
      // Default sort by date (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  return (
    <div className="glass rounded-xl p-6 mb-6 border border-slate-200 dark:border-slate-800">
      <h2 className="text-xl font-medium mb-4 flex items-center">
        <Crown size={18} className="text-primary mr-2" />
        Your Elite Journeys
      </h2>
      
      {/* Search and Filter Controls */}
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Search your trips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter size={14} />
              {exclusivityFilter || 'All Trips'}
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Exclusivity Level</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setExclusivityFilter(null)}>
              All Levels
              {!exclusivityFilter && <Check size={14} className="ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setExclusivityFilter('VIP')}>
              VIP
              {exclusivityFilter === 'VIP' && <Check size={14} className="ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setExclusivityFilter('Premium')}>
              Premium
              {exclusivityFilter === 'Premium' && <Check size={14} className="ml-auto" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              Sort: {sortBy === 'date' ? 'Date' : sortBy === 'destination' ? 'Destination' : 'Exclusivity'}
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSortBy('date')}>
              Date
              {sortBy === 'date' && <Check size={14} className="ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('destination')}>
              Destination
              {sortBy === 'destination' && <Check size={14} className="ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('exclusivity')}>
              Exclusivity
              {sortBy === 'exclusivity' && <Check size={14} className="ml-auto" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <AnimatePresence>
        {sortedTrips.length > 0 ? (
          <div className="space-y-4">
            {sortedTrips.map((trip) => (
              <motion.div 
                key={trip.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => onTripSelect(trip)}
                className={cn(
                  "flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200",
                  selectedTripId === trip.id 
                    ? "bg-primary/10 border border-primary/30 shadow-sm" 
                    : "hover:bg-muted border border-transparent"
                )}
              >
                <div className="w-12 h-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
                  <img 
                    src={trip.coverImage} 
                    alt={trip.destination}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{trip.destination}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{trip.date}</p>
                    <span className="text-xs text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">{trip.stats.days} days</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full text-white",
                    trip.exclusivity === 'VIP' ? 'bg-gradient-to-r from-purple-700 to-pink-600' : 'bg-gradient-to-r from-amber-600 to-yellow-500'
                  )}>
                    {trip.exclusivity}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6"
          >
            <p className="text-muted-foreground">No trips match your search criteria.</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => {
                setSearchQuery('');
                setExclusivityFilter(null);
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
