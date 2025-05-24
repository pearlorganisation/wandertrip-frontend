
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Clock, Calendar, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock blog data - would normally come from an API
const blogPosts = [
  {
    id: 1,
    slug: 'best-beaches-in-bali',
    title: "Top 10 Beaches in Bali You Can't Miss",
    excerpt: 'Discover the most stunning beaches in Bali, from hidden coves to popular surf spots.',
    image: 'https://images.unsplash.com/photo-1555993539-1732b0258235',
    category: 'Destinations',
    date: 'June 10, 2024',
    readTime: '8 min read',
    tags: ['Bali', 'Beaches', 'Indonesia']
  },
  {
    id: 2,
    slug: 'japan-cherry-blossom-guide',
    title: "Complete Guide to Japan's Cherry Blossom Season",
    excerpt: "Everything you need to know about planning a trip to see Japan's famous sakura.",
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951',
    category: 'Seasonal Travel',
    date: 'May 25, 2024',
    readTime: '12 min read',
    tags: ['Japan', 'Cherry Blossoms', 'Spring']
  },
  {
    id: 3,
    slug: 'budget-travel-europe',
    title: 'How to Travel Europe on a Budget in 2024',
    excerpt: 'Practical tips and tricks for exploring Europe without breaking the bank.',
    image: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89',
    category: 'Travel Tips',
    date: 'May 18, 2024',
    readTime: '10 min read',
    tags: ['Europe', 'Budget Travel', 'Backpacking']
  },
  {
    id: 4,
    slug: 'sustainable-travel-tips',
    title: 'Sustainable Travel: Reducing Your Carbon Footprint',
    excerpt: 'Practical ways to travel more responsibly and sustainably around the world.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    category: 'Sustainable Travel',
    date: 'May 12, 2024',
    readTime: '7 min read',
    tags: ['Sustainable Travel', 'Eco-friendly', 'Green Tourism']
  },
  {
    id: 5,
    slug: 'solo-female-travel-safety',
    title: 'Solo Female Travel: Safety Tips & Best Destinations',
    excerpt: 'Essential safety advice and recommended destinations for women traveling alone.',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486',
    category: 'Solo Travel',
    date: 'May 5, 2024',
    readTime: '9 min read',
    tags: ['Solo Travel', 'Female Travelers', 'Safety']
  },
  {
    id: 6,
    slug: 'best-travel-photography-tips',
    title: 'Capture the Perfect Travel Photo: Pro Tips',
    excerpt: 'Improve your travel photography with these professional techniques and gear recommendations.',
    image: 'https://images.unsplash.com/photo-1500531279542-fc8490c8ea4d',
    category: 'Photography',
    date: 'April 28, 2024',
    readTime: '11 min read',
    tags: ['Photography', 'Travel Tips', 'Gear']
  }
];

const categories = [
  'All Posts',
  'Destinations',
  'Travel Tips',
  'Solo Travel',
  'Sustainable Travel',
  'Photography',
  'Seasonal Travel'
];

const BlogPage = () => {
   // Scroll to top on component mount
   useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once on mount
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Posts');
  
  const filteredPosts = blogPosts.filter(post => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Apply category filter
    const matchesCategory = activeCategory === 'All Posts' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Travel Blog - Tips, Guides & Inspiration"
        description="Discover travel tips, destination guides, and inspiration for your next adventure from seasoned travelers and local experts."
        keywords="travel blog, travel tips, destination guides, travel inspiration, travel planning"
      />
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12 bg-muted/20">
          <div className="container px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-medium mb-4">Travel Blog & Resources</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Expert tips, destination guides, and travel inspiration for your next adventure
              </p>
              
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="search"
                  placeholder="Search articles, destinations, or topics..."
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
                defaultValue="All Posts" 
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
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    className="glass rounded-xl overflow-hidden flex flex-col h-full border border-border/40"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-medium backdrop-blur-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center text-xs text-muted-foreground mb-3">
                        <div className="flex items-center mr-4">
                          <Calendar size={14} className="mr-1" />
                          {post.date}
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-medium mb-2">
                        <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 text-sm flex-grow">{post.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <div key={tag} className="flex items-center text-xs bg-muted/50 px-2 py-1 rounded-full">
                            <Tag size={10} className="mr-1" />
                            {tag}
                          </div>
                        ))}
                      </div>
                      
                      <Link 
                        to={`/blog/${post.slug}`} 
                        className="text-sm text-primary font-medium flex items-center hover:underline mt-auto"
                      >
                        Read Article
                        <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No articles found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-muted/10">
          <div className="container px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-medium mb-3">Subscribe to Our Newsletter</h2>
              <p className="text-muted-foreground mb-6">
                Get travel tips, destination insights and exclusive offers delivered to your inbox
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="h-12 sm:flex-grow" 
                />
                <button className="h-12 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
