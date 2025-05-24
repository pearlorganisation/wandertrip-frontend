
import { useState } from 'react';
import DestinationCard from './DestinationCard';
import { Search, MapPin } from 'lucide-react';

interface SavedDestinationsProps {
  savedDestinations: {
    id: string;
    name: string;
    location: string;
    image: string;
    saved: boolean;
  }[];
}

export default function SavedDestinations({ savedDestinations }: SavedDestinationsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredDestinations = savedDestinations.filter(destination => {
    const searchLower = searchQuery.toLowerCase();
    return (
      destination.name.toLowerCase().includes(searchLower) ||
      destination.location.toLowerCase().includes(searchLower)
    );
  });
  
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder="Search saved destinations..."
          className="w-full pl-10 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {filteredDestinations.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <MapPin size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No saved destinations found</h3>
          <p className="text-muted-foreground text-sm">
            {searchQuery ? 
              "Try adjusting your search or explore new destinations to save." :
              "Start exploring and save destinations you'd like to visit."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDestinations.map((destination, index) => (
            <DestinationCard
              key={index}
              id={destination.id}
              name={destination.name}
              location={destination.location}
              image={destination.image}
              rating={4.8}
              isFavorite={destination.saved}
              onToggleFavorite={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}
