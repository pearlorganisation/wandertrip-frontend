
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Mock destination data
const mockDestinationsData = [
  {
    id: "dest-001",
    name: "Bali",
    location: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    saved: true,
    rating: 4.8
  },
  {
    id: "dest-002",
    name: "Paris",
    location: "France",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
    saved: true,
    rating: 4.7
  },
  {
    id: "dest-003", 
    name: "Tokyo",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    saved: false,
    rating: 4.9
  },
  {
    id: "dest-004",
    name: "New York",
    location: "United States",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    saved: false,
    rating: 4.6
  },
  {
    id: "dest-005",
    name: "Santorini",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
    saved: false,
    rating: 4.9
  },
  {
    id: "dest-006",
    name: "Kyoto",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80",
    saved: false,
    rating: 4.8
  },
  {
    id: "dest-007",
    name: "Barcelona",
    location: "Spain",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80",
    saved: false,
    rating: 4.7
  },
  {
    id: "dest-008",
    name: "Maldives",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    saved: false,
    rating: 4.9
  }
];

interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  saved: boolean;
  rating: number;
}

export function useSavedDestinations() {
  const { user } = useAuth();
  const [destinations, setDestinations] = useState<Destination[]>(mockDestinationsData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSavedDestinations = useCallback(async () => {
    try {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Use static data for demonstration
      setDestinations(mockDestinationsData);
    } catch (err: any) {
      console.error('Error fetching saved destinations:', err);
      setError("Could not load destinations");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleSaveDestination = useCallback(async (destinationId: string) => {
    if (!user) {
      toast("Please log in to save destinations");
      return;
    }

    const destination = destinations.find(d => d.id === destinationId);
    if (!destination) return;

    try {
      const isSaved = destination.saved;

      // Optimistically update the UI
      setDestinations(prev => 
        prev.map(d => d.id === destinationId ? { ...d, saved: !isSaved } : d)
      );

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (isSaved) {
        toast(`${destination.name} removed from favorites`, {
          description: "You can add it back anytime",
          position: "bottom-right",
        });
      } else {
        toast(`${destination.name} added to favorites`, {
          description: "View all favorites in your profile",
          position: "bottom-right",
        });
      }
    } catch (err: any) {
      console.error('Error toggling save state:', err);
      
      // Revert the optimistic update on error
      setDestinations(prev => 
        prev.map(d => d.id === destinationId ? { ...d, saved: destination.saved } : d)
      );
      
      toast.error("Failed to update favorites", {
        description: "Please try again later",
        position: "bottom-right",
      });
    }
  }, [user, destinations]);

  useEffect(() => {
    fetchSavedDestinations();
  }, [fetchSavedDestinations]);

  return { 
    destinations, 
    isLoading, 
    error, 
    toggleSaveDestination,
    refreshDestinations: fetchSavedDestinations
  };
}
