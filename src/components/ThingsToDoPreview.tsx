
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, MapPin, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const activities = [
  {
    id: 'activity1',
    title: 'Hot Air Balloon Ride over Cappadocia',
    location: 'Cappadocia, Turkey',
    image: 'https://plus.unsplash.com/premium_photo-1664298243145-f71820d7eae3',
    rating: 4.9,
    reviews: 312,
    price: '€150',
    category: 'Adventure',
    featured: true
  },
  {
    id: 'activity2',
    title: 'Northern Lights Photography Tour',
    location: 'Tromsø, Norway',
    image: 'https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=2340&auto=format&fit=crop',
    rating: 4.8,
    reviews: 184,
    price: '€120',
    category: 'Nature',
    featured: true
  },
  {
    id: 'activity3',
    title: 'Traditional Cooking Class with Local Chef',
    location: 'Hoi An, Vietnam',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2340&auto=format&fit=crop',
    rating: 4.7,
    reviews: 256,
    price: '€45',
    category: 'Cultural',
    featured: false
  },
  {
    id: 'activity4',
    title: 'Sunset Sailing Cruise',
    location: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2687&auto=format&fit=crop',
    rating: 4.9,
    reviews: 298,
    price: '€85',
    category: 'Relaxation',
    featured: false
  }
];

export default function ThingsToDoPreview() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  return (
    <div className="py-16 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-medium tracking-wide rounded-full bg-primary/10 text-primary">
            <Compass size={14} />
            <span>Unforgettable Experiences</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Popular Things To Do
          </h2>
          <p className="text-muted-foreground text-lg">
            Unique activities and experiences handpicked for unforgettable memories
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(activity.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="h-full"
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border/40 bg-card">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredCard === activity.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  {activity.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-foreground">
                      {activity.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-primary" />
                      <span className="text-xs font-medium">{activity.location}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  <h3 className="text-lg font-semibold line-clamp-2">{activity.title}</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm font-medium">{activity.rating}</span>
                      <span className="ml-1 text-xs text-muted-foreground">({activity.reviews})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold">{activity.price}</span>
                      <span className="text-xs text-muted-foreground ml-1">per person</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/things-to-do?activity=${activity.id}`}
                    className="inline-flex items-center text-sm font-medium text-primary w-full justify-end mt-2"
                  >
                    <span>View Details</span>
                    <motion.div
                      animate={hoveredCard === activity.id 
                        ? { x: 5, transition: { repeat: Infinity, repeatType: "mirror", duration: 0.6 } } 
                        : { x: 0 }}
                    >
                      <ArrowRight size={16} className="ml-1" />
                    </motion.div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link to="/things-to-do">
              Explore All Activities
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
