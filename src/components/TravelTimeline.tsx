import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, MapPin, Calendar, Camera, Heart, Share2, MessageSquare, Plus, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import MemoryFilter, { FilterOptions } from './MemoryFilter';
import { toast } from 'sonner';

interface Memory {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
  description: string;
  likes: number;
  comments: number;
  hasLiked: boolean;
}

const memories: Memory[] = [
  {
    id: 'mem1',
    title: 'Sunrise at Bali Rice Terraces',
    location: 'Tegallalang, Bali',
    date: '2023-06-15',
    image: 'https://images.unsplash.com/photo-1536152470836-b943b246224c?q=80&w=1080&auto=format&fit=crop',
    description: 'Watching the sun rise over the ancient rice terraces was truly magical. The mist hanging over the fields created an ethereal atmosphere that I\'ll never forget.',
    likes: 124,
    comments: 18,
    hasLiked: false
  },
  {
    id: 'mem2',
    title: 'Midnight in Paris',
    location: 'Eiffel Tower, Paris',
    date: '2023-04-22',
    image: 'https://images.unsplash.com/photo-1699567806583-2d82e1ec2b66',
    description: 'The city of lights truly comes alive at night. Standing beneath the glittering Eiffel Tower, I felt like I was in a dream.',
    likes: 89,
    comments: 12,
    hasLiked: true
  },
  {
    id: 'mem3',
    title: 'Desert Safari Adventure',
    location: 'Dubai Desert Conservation Reserve',
    date: '2023-02-10',
    image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?q=80&w=1080&auto=format&fit=crop',
    description: 'Dune bashing through the golden sands, followed by a traditional Bedouin dinner under the stars. The desert\'s vastness makes you feel so small yet so alive.',
    likes: 152,
    comments: 27,
    hasLiked: false
  },
  {
    id: 'mem4',
    title: 'Cherry Blossoms in Kyoto',
    location: 'Philosopher\'s Path, Kyoto',
    date: '2023-03-30',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1080&auto=format&fit=crop',
    description: 'Walking along the canal lined with cherry trees in full bloom was like stepping into a painting. The gentle rain of pink petals created the most perfect moment.',
    likes: 201,
    comments: 34,
    hasLiked: true
  },
  {
    id: 'mem5',
    title: 'Northern Lights Magic',
    location: 'Tromsø, Norway',
    date: '2023-01-18',
    image: 'https://images.unsplash.com/photo-1614090691187-983c32a930c9',
    description: 'After three nights of waiting in the freezing cold, the sky finally erupted in dancing green lights. No photograph can ever capture the true beauty of this phenomenon.',
    likes: 278,
    comments: 41,
    hasLiked: false
  }
];

export default function TravelTimeline() {
  const [activeMemory, setActiveMemory] = useState<string | null>(null);
  const [likedMemories, setLikedMemories] = useState<string[]>(
    memories.filter(m => m.hasLiked).map(m => m.id)
  );
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    location: '',
    dateRange: {
      from: undefined,
      to: undefined,
    },
    sortBy: 'date',
    onlyLiked: false,
  });
  const [showAddMemory, setShowAddMemory] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const handleLike = (id: string) => {
    if (likedMemories.includes(id)) {
      setLikedMemories(prev => prev.filter(memId => memId !== id));
    } else {
      setLikedMemories(prev => [...prev, id]);
      toast.success("Memory added to favorites!");
    }
  };
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  const filteredMemories = useMemo(() => {
    return memories.filter(memory => {
      // Filter by search text
      if (filters.search && !memory.title.toLowerCase().includes(filters.search.toLowerCase()) && 
          !memory.description.toLowerCase().includes(filters.search.toLowerCase()) &&
          !memory.location.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Filter by location
      if (filters.location && !memory.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      // Filter by date range
      if (filters.dateRange.from && new Date(memory.date) < filters.dateRange.from) {
        return false;
      }
      
      if (filters.dateRange.to && new Date(memory.date) > filters.dateRange.to) {
        return false;
      }
      
      // Filter by liked status
      if (filters.onlyLiked && !likedMemories.includes(memory.id)) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      // Sort based on selected sort option
      switch(filters.sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'likes':
          return b.likes - a.likes;
        case 'location':
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });
  }, [filters, likedMemories]);
  
  const handleAddMemory = () => {
    setShowAddMemory(!showAddMemory);
    if (!showAddMemory) {
      toast.info("Memory creation feature coming soon!");
    }
  };
  
  return (
    <div className="py-16 bg-gradient-to-b from-background to-background/80 overflow-hidden">
      <div className="container px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-medium tracking-wide rounded-full bg-primary/10 text-primary">
            <Clock size={14} />
            <span>Travel Memories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Your Travel Story Timeline
          </h2>
          <p className="text-muted-foreground text-lg">
            Revisit your most cherished travel moments through an immersive timeline
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <MemoryFilter onFilterChange={handleFilterChange} />
          </motion.div>
        </div>
        
        <div ref={containerRef} className="relative max-w-5xl mx-auto my-16">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20 transform -translate-x-1/2" />
          
          {/* Progress indicator */}
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary transform -translate-x-1/2 origin-top"
            style={{ scaleY: scrollYProgress }}
          />
          
          {filteredMemories.length > 0 ? (
            filteredMemories.map((memory, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <MemoryCard 
                  key={memory.id}
                  memory={memory}
                  isEven={isEven}
                  isActive={activeMemory === memory.id}
                  setActiveMemory={setActiveMemory}
                  isLiked={likedMemories.includes(memory.id)}
                  onLike={handleLike}
                  index={index}
                  scrollYProgress={scrollYProgress}
                />
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <div className="inline-block p-4 rounded-full bg-muted mb-4">
                <Filter size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No memories match your filters</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filter criteria or add new memories</p>
              <Button 
                variant="outline" 
                onClick={() => setFilters({
                  search: '',
                  location: '',
                  dateRange: { from: undefined, to: undefined },
                  sortBy: 'date',
                  onlyLiked: false,
                })}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
        
        <div className="max-w-md mx-auto text-center mt-12">
          <Button className="rounded-full" onClick={handleAddMemory}>
            <Camera size={16} className="mr-2" />
            Add New Memory
          </Button>
        </div>
      </div>
    </div>
  );
}

interface MemoryCardProps {
  memory: Memory;
  isEven: boolean;
  isActive: boolean;
  setActiveMemory: (id: string | null) => void;
  isLiked: boolean;
  onLike: (id: string) => void;
  index: number;
  scrollYProgress: any;
}

function MemoryCard({ 
  memory, 
  isEven, 
  isActive, 
  setActiveMemory, 
  isLiked, 
  onLike,
  index,
  scrollYProgress
}: MemoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Calculate different parallax effects based on index position
  const yOffset = useTransform(
    scrollYProgress, 
    [0, 1], 
    isEven ? [100, -100] : [-100, 100]
  );
  
  const rotation = useTransform(
    scrollYProgress,
    [0, 1],
    isEven ? [2, -2] : [-2, 2]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    // Create a window where this specific card is fully visible
    [
      Math.max(0, (index - 1) / Math.max(1, memories.length)),
      index / Math.max(1, memories.length),
      Math.min(1, (index + 1) / Math.max(1, memories.length))
    ],
    [0.3, 1, 0.3]
  );
  
  return (
    <div 
      className={cn(
        "relative my-24",
        isEven ? "ml-auto mr-[5%] pl-12" : "mr-auto ml-[5%] pr-12",
        "w-[90%] md:w-[45%]"
      )}
    >
      {/* Timeline dot */}
      <div className="absolute w-5 h-5 bg-primary rounded-full z-10 top-1/2 transform -translate-y-1/2 border-4 border-background"
        style={{ 
          [isEven ? 'left' : 'right']: '-2.5rem',
        }}
      />
      
      {/* Date flag */}
      <div 
        className={cn(
          "absolute top-1/2 transform -translate-y-1/2 bg-muted px-3 py-1 rounded-full text-xs font-medium z-10 flex items-center",
          isEven ? "-left-24" : "-right-24"
        )}
      >
        <Calendar size={12} className="mr-1" />
        {new Date(memory.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </div>
      
      <motion.div
        ref={cardRef}
        className={cn(
          "glass rounded-xl overflow-hidden shadow-lg",
          isActive && "ring-4 ring-primary"
        )}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        style={{
          y: yOffset,
          rotate: rotation,
          opacity
        }}
        onClick={() => setActiveMemory(isActive ? null : memory.id)}
      >
        <div className="relative">
          <img 
            src={memory.image} 
            alt={memory.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-xl font-bold mb-1">{memory.title}</h3>
            <div className="flex items-center text-sm opacity-90">
              <MapPin size={14} className="mr-1" />
              {memory.location}
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <p className="text-muted-foreground mb-4">{memory.description}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn("px-2", isLiked && "text-red-500")}
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(memory.id);
                }}
              >
                <Heart size={18} className={cn("mr-1", isLiked && "fill-current")} />
                {isLiked ? memory.likes + 1 : memory.likes}
              </Button>
              <Button variant="ghost" size="sm" className="px-2">
                <MessageSquare size={18} className="mr-1" />
                {memory.comments}
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="px-2">
              <Share2 size={18} />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
