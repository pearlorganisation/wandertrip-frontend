
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Clock, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const blogPosts = [
  {
    id: 'blog1',
    title: 'Top 10 Hidden Beaches in Southeast Asia',
    excerpt: 'Discover untouched paradises away from the tourist crowds.',
    category: 'Destinations',
    image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=2340&auto=format&fit=crop',
    author: 'Emma Rodriguez',
    date: '2023-06-15',
    readTime: '8 min read'
  },
  {
    id: 'blog2',
    title: 'Ultimate Guide to Travel Photography',
    excerpt: 'How to capture stunning travel moments with any camera.',
    category: 'Tips & Tricks',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2340&auto=format&fit=crop',
    author: 'Michael Chen',
    date: '2023-05-22',
    readTime: '12 min read'
  },
  {
    id: 'blog3',
    title: 'Sustainable Travel: Reducing Your Carbon Footprint',
    excerpt: 'Simple ways to make your travel experiences more eco-friendly.',
    category: 'Eco Travel',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2340&auto=format&fit=crop',
    author: 'Sarah Johnson',
    date: '2023-04-10',
    readTime: '10 min read'
  }
];

export default function HomeBlogPreview() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  return (
    <div className="py-16 bg-gradient-to-b from-background/70 to-background">
      <div className="container px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-medium tracking-wide rounded-full bg-primary/10 text-primary">
            <Book size={14} />
            <span>Travel Inspiration</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Latest from our Blog
          </h2>
          <p className="text-muted-foreground text-lg">
            Expert travel tips, destination guides, and inspiring stories
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="h-full"
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card border-border/40">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredCard === post.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-foreground">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center text-xs text-muted-foreground space-x-4">
                    <span>{post.date}</span>
                    <span className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-sm font-medium text-primary"
                  >
                    <span>Read Article</span>
                    <motion.div
                      animate={hoveredCard === post.id 
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
            <Link to="/blog">
              View All Articles
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
