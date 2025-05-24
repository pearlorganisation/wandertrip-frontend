
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { memo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

interface DestinationCardProps {
  id?: string; // Make ID optional
  name: string;
  location: string;
  image: string;
  rating: number;
  isHidden?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const DestinationCard = memo(function DestinationCard({
  id = '', // Provide default empty string
  name,
  location,
  image,
  rating,
  isHidden = false,
  isFavorite = false,
  onToggleFavorite,
  className,
  style,
}: DestinationCardProps) {
  const { user } = useAuth();
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };
  
  return (
    <Link 
      to={`/destination/${id}`}
      className={cn(
        "relative group rounded-2xl overflow-hidden shadow-sm hover-scale hardware-accelerated block",
        className
      )}
      style={style}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
      
      {isHidden && (
        <div className="absolute top-3 left-3 z-20 px-2 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full">
          Hidden Gem
        </div>
      )}
      
      {user && (
        <button 
          onClick={toggleFavorite}
          className={cn(
            "absolute top-3 right-3 z-20 p-1.5 rounded-full backdrop-blur-sm transition-colors",
            isFavorite 
              ? "bg-primary/20 text-red-500" 
              : "bg-white/20 text-white hover:bg-white/30"
          )}
        >
          <Heart size={16} className={cn(isFavorite && "fill-current")} />
        </button>
      )}
      
      <img 
        src={image} 
        alt={name}
        loading="lazy"
        decoding="async"
        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105 hardware-accelerated"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <h3 className="text-lg font-medium text-white mb-1">{name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-sm text-white/80">{location}</p>
          <div className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
            <span className="text-yellow-300 mr-1">★</span>
            <span className="text-xs text-white font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default DestinationCard;
