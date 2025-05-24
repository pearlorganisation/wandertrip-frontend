
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Share2, Edit, CreditCard, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";

interface ItineraryHeaderProps {
  itinerary: {
    title: string;
    subtitle: string;
    destination: string;
    duration: string;
    travelers: string;
    coverImage: string;
    id: string;
  };
}

export const ItineraryHeader = ({ itinerary }: ItineraryHeaderProps) => {
  const handleShareItinerary = () => {
    toast.success("Share link copied to clipboard!");
  };

  const handleBookTrip = () => {
    // Create URL with query parameters to pass the itinerary ID and other details
    const bookingUrl = `/booking?id=${itinerary.id}&destination=${encodeURIComponent(itinerary.destination)}&duration=${encodeURIComponent(itinerary.duration)}&travelers=${encodeURIComponent(itinerary.travelers)}`;
    window.location.href = bookingUrl;
  };

  return (
    <section 
      className="py-16 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${itinerary.coverImage})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-2 text-white">
            {itinerary.title}
          </h1>
          <p className="text-xl text-white/80 mb-6">
            {itinerary.subtitle}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center">
              <MapPin size={16} className="text-primary mr-2" />
              <span className="text-sm text-white">{itinerary.destination}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center">
              <Calendar size={16} className="text-primary mr-2" />
              <span className="text-sm text-white">{itinerary.duration}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center">
              <Users size={16} className="text-primary mr-2" />
              <span className="text-sm text-white">{itinerary.travelers}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button
              className="gap-2"
              onClick={handleBookTrip}
            >
              <CreditCard size={16} />
              Book This Trip
            </Button>
            
            <Button
              variant="outline"
              className="bg-white/20 text-white border-white/20 hover:bg-white/30 hover:text-white gap-2"
              onClick={handleShareItinerary}
            >
              <Share2 size={16} />
              Share
            </Button>
            
            <Button
              variant="outline"
              className="bg-white/20 text-white border-white/20 hover:bg-white/30 hover:text-white gap-2"
              asChild
            >
              <Link to={`/trip-planner?edit=${itinerary.id}`}>
                <Edit size={16} />
                Edit
              </Link>
            </Button>
            
            <Button
              variant="outline"
              className="bg-white/20 text-white border-white/20 hover:bg-white/30 hover:text-white gap-2"
              asChild
            >
              <Link to="/luxury-concierge">
                <Sparkles size={16} />
                Luxury Concierge
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};