
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard';
import { Search, Filter, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useSavedDestinations } from '@/hooks/useSavedDestinations';

// Mock destination data for the destinations page
const mockDestinations = [
  {
    id: "dest-001",
    name: "Bali",
    location: "Indonesia",
    image_url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    is_hidden: false
  },
  {
    id: "dest-002",
    name: "Paris",
    location: "France",
    image_url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    is_hidden: false
  },
  {
    id: "dest-003", 
    name: "Tokyo",
    location: "Japan",
    image_url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    is_hidden: false
  },
  {
    id: "dest-004",
    name: "New York",
    location: "United States",
    image_url: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    is_hidden: false
  },
  {
    id: "dest-002",
    name: "Santorini",
    location: "Greece",
    image_url: "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    is_hidden: true
  },
  {
    id: "dest-006",
    name: "Kyoto",
    location: "Japan",
    image_url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    is_hidden: true
  },
  {
    id: "dest-007",
    name: "Barcelona",
    location: "Spain",
    image_url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    is_hidden: false
  },
  {
    id: "dest-008",
    name: "Maldives",
    location: "Maldives",
    image_url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    is_hidden: true
  },
  {
    id: "dest-009",
    name: "Rome",
    location: "Italy",
    image_url: "https://images.unsplash.com/photo-1555992828-ca4dbe41d294?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    is_hidden: false
  },
  {
    id: "dest-010",
    name: "Sydney",
    location: "Australia",
    image_url: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    is_hidden: false
  },
  {
    id: "dest-011",
    name: "Marrakech",
    location: "Morocco",
    image_url: "https://images.unsplash.com/photo-1597211684565-dca64d72bdfc?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    is_hidden: true
  },
  {
    id: "dest-012",
    name: "Prague",
    location: "Czech Republic",
    image_url: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    is_hidden: false
  }
];

// Categories for filtering
const categories = [
  { name: "All", icon: <MapPin size={16} /> },
  { name: "Beach", icon: null },
  { name: "Mountains", icon: null },
  { name: "Cities", icon: null },
  { name: "Cultural", icon: null },
  { name: "Adventure", icon: null },
  { name: "Luxury", icon: null },
];

const Destinations = () => {
  const { toast } = useToast();
  const { destinations: savedDestinations, toggleSaveDestination } = useSavedDestinations();
  
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showHiddenOnly, setShowHiddenOnly] = useState(false);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setDestinations(mockDestinations);
      } catch (error: any) {
        console.error('Error fetching destinations:', error);
        toast({
          title: "Error loading destinations",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchDestinations();
  }, [toast]);

  // Filter destinations based on search query and filters
  const filteredDestinations = destinations.filter(destination => {
    // Apply search filter
    const matchesSearch = 
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply hidden gems filter
    const matchesHidden = showHiddenOnly ? destination.is_hidden : true;
    
    return matchesSearch && matchesHidden;
  });

  const getIsFavorite = (destId: string) => {
    return savedDestinations.some(d => d.id === destId && d.saved);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="py-12 bg-secondary/30">
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Discover Amazing Destinations
              </h1>
              <p className="text-muted-foreground text-lg">
                Explore unique places around the world tailored to your preferences
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Search destinations, countries, or experiences..."
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-border focus:outline-none focus:ring-1 focus:ring-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveFilter(category.name)}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    activeFilter === category.name
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                >
                  {category.icon && <span className="mr-1.5">{category.icon}</span>}
                  {category.name}
                </button>
              ))}
              
              <button
                onClick={() => setShowHiddenOnly(!showHiddenOnly)}
                className={cn(
                  "flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  showHiddenOnly
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                )}
              >
                <Filter size={16} className="mr-1.5" />
                Hidden Gems
              </button>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container px-4 sm:px-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="rounded-2xl overflow-hidden bg-secondary/30 animate-pulse h-96" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredDestinations.map((destination, index) => (
                  <div key={destination.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <DestinationCard 
                      id={destination.id}
                      name={destination.name}
                      location={destination.location}
                      image={destination.image_url}
                      rating={destination.rating}
                      isHidden={destination.is_hidden}
                      isFavorite={getIsFavorite(destination.id)}
                      onToggleFavorite={toggleSaveDestination}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {!isLoading && filteredDestinations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No destinations found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("All");
                    setShowHiddenOnly(false);
                  }}
                  className="mt-4 text-primary font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Destinations;
