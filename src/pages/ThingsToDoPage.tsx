import { useEffect } from 'react'; // Import useEffect
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Star, Calendar, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock activities data - would normally come from an API
const activities = [
  {
    id: 1,
    slug: 'mount-batur-sunrise-trek',
    title: 'Mount Batur Sunrise Trek',
    description: 'Experience a breathtaking sunrise from the summit of Mount Batur, an active volcano in Bali.',
    image: 'https://images.unsplash.com/photo-1665640514893-4eca1d839e33',
    location: 'Bali, Indonesia',
    category: 'Adventure',
    rating: 4.8,
    reviews: 426,
    price: 'From $45',
    duration: '7 hours',
    tags: ['Trekking', 'Volcano', 'Sunrise', 'Nature']
  },
  {
    id: 2,
    slug: 'kyoto-bamboo-forest-walk',
    title: 'Arashiyama Bamboo Grove Walk',
    description: "Stroll through the enchanting bamboo groves of Arashiyama, one of Kyoto's most photographed spots.",
    image: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6',
    location: 'Kyoto, Japan',
    category: 'Nature',
    rating: 4.7,
    reviews: 352,
    price: 'Free',
    duration: '1-2 hours',
    tags: ['Nature', 'Photography', 'Walking', 'Cultural']
  },
  {
    id: 3,
    slug: 'barcelona-gaudi-tour',
    title: 'Gaudí Masterpieces Tour',
    description: 'Discover the extraordinary works of Antoni Gaudí including Sagrada Familia and Park Güell.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
    location: 'Barcelona, Spain',
    category: 'Cultural',
    rating: 4.9,
    reviews: 589,
    price: 'From $65',
    duration: '4 hours',
    tags: ['Architecture', 'Art', 'UNESCO', 'Walking']
  },
  {
    id: 4,
    slug: 'santorini-sunset-cruise',
    title: 'Santorini Caldera Sunset Cruise',
    description: "Sail around Santorini's caldera and witness one of the most spectacular sunsets in the world.",
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
    location: 'Santorini, Greece',
    category: 'Cruises',
    rating: 4.8,
    reviews: 412,
    price: 'From $85',
    duration: '5 hours',
    tags: ['Sailing', 'Sunset', 'Island', 'Views']
  },
  {
    id: 5,
    slug: 'new-york-broadway-show',
    title: 'Broadway Musical Experience',
    description: "Catch a world-famous Broadway show in the heart of New York's Theater District.",
    image: 'https://images.unsplash.com/photo-1633485672364-b0c82adb7662',
    location: 'New York City, USA',
    category: 'Entertainment',
    rating: 4.7,
    reviews: 623,
    price: 'From $99',
    duration: '2-3 hours',
    tags: ['Theater', 'Music', 'Arts', 'Night']
  },
  {
    id: 6,
    slug: 'marrakech-food-tour',
    title: 'Marrakech Food & Market Tour',
    description: 'Sample authentic Moroccan cuisine while exploring the vibrant markets of Marrakech.',
    image: 'https://images.unsplash.com/photo-1723214722992-3ed6b2a15616',
    location: 'Marrakech, Morocco',
    category: 'Food & Drink',
    rating: 4.6,
    reviews: 347,
    price: 'From $55',
    duration: '4 hours',
    tags: ['Food', 'Market', 'Culture', 'Walking']
  }
];

const categories = [
  'All Activities',
  'Adventure',
  'Nature',
  'Cultural',
  'Food & Drink',
  'Entertainment',
  'Cruises'
];

const ThingsToDoPage = () => {
   // Scroll to top on component mount
   useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once on mount
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Activities');
  
  const filteredActivities = activities.filter(activity => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Apply category filter
    const matchesCategory = activeCategory === 'All Activities' || activity.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Things To Do - Unique Experiences Around the World"
        description="Discover unique activities, tours, and experiences in destinations around the world. From adventure and nature to food and culture."
        keywords="things to do, activities, tours, experiences, attractions, travel activities"
      />
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12 bg-muted/20">
          <div className="container px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-medium mb-4">Things To Do Around the World</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Discover unique experiences, tours, and activities for your next adventure
              </p>
              
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="search"
                  placeholder="Search activities, destinations, or interests..."
                  className="pl-10 h-12 rounded-full bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container px-4 sm:px-6">
            <div className="overflow-x-auto pb-4 mb-8">
              <Tabs 
                defaultValue="All Activities" 
                value={activeCategory}
                onValueChange={setActiveCategory}
                className="w-full"
              >
                <TabsList className="flex justify-start p-1 bg-muted/50 rounded-full w-max min-w-full md:min-w-0">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="px-4 py-2 rounded-full"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    className="glass rounded-xl overflow-hidden flex flex-col h-full border border-border/40"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img 
                        src={activity.image} 
                        alt={activity.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-medium backdrop-blur-sm">
                          {activity.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium flex items-center">
                          {activity.price}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin size={14} className="mr-1" />
                          {activity.location}
                        </div>
                        <div className="flex items-center text-xs">
                          <Star size={14} className="mr-1 text-yellow-500 fill-yellow-500" />
                          <span>{activity.rating}</span>
                          <span className="text-muted-foreground ml-1">({activity.reviews})</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-medium mb-2">
                        <Link to={`/things-to-do/${activity.slug}`} className="hover:text-primary transition-colors">
                          {activity.title}
                        </Link>
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 text-sm flex-grow">{activity.description}</p>
                      
                      <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {activity.duration}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {activity.tags.map(tag => (
                          <div key={tag} className="flex items-center text-xs bg-muted/50 px-2 py-1 rounded-full">
                            <Tag size={10} className="mr-1" />
                            {tag}
                          </div>
                        ))}
                      </div>
                      
                      <Link 
                        to={`/things-to-do/${activity.slug}`} 
                        className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-lg text-center text-sm transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No activities found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThingsToDoPage;
