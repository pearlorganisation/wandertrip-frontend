import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Facebook, 
  Twitter, 
  Instagram, 
  Bookmark, 
  ChevronRight, 
  MessageCircle, 
  ThumbsUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

// This would come from an API in a real application
const getBlogPostBySlug = (slug: string) => {
  // Mock data with more detailed content
  const posts = {
    'japan-cherry-blossom-guide': {
      title: "Complete Guide to Japan's Cherry Blossom Season",
      content: "Japan's cherry blossom (sakura) season is one of the country's most magical times of year, attracting visitors from around the world who come to witness the stunning pink and white flowers that blanket the nation for just a few fleeting weeks.",
      image: "https://images.unsplash.com/photo-1522383225653-ed111181a951",
      author: "Jane Traveler",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop",
      date: "May 25, 2024",
      readTime: "12 min read",
      tags: ["Japan", "Cherry Blossoms", "Spring", "Seasonal Travel"],
      sections: [
        {
          title: "When to Visit for Cherry Blossoms",
          content: "The cherry blossom front moves from south to north, starting in late March in Kyushu and reaching Hokkaido by early May. The peak bloom in Tokyo and Kyoto typically occurs in late March to early April, but varies each year based on weather conditions. The Japan Meteorological Corporation releases forecast maps annually, which are essential for planning your trip.",
          image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e"
        },
        {
          title: "Top Viewing Locations",
          content: "While cherry blossoms can be enjoyed throughout Japan, some locations are particularly spectacular. In Tokyo, Ueno Park and Shinjuku Gyoen offer beautiful viewing opportunities. In Kyoto, the Philosopher's Path and Maruyama Park are must-visits. For a unique experience, see the blossoms along the moat of Hirosaki Castle in Aomori Prefecture, where over 2,500 trees create a pink tunnel and petals floating in the water create a 'sakura carpet.'",
          image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d"
        },
        {
          title: "Hanami Traditions",
          content: "Hanami, or 'flower viewing,' is a centuries-old Japanese tradition of enjoying the transient beauty of flowers, especially cherry blossoms. It typically involves gathering with friends or family under blooming trees for picnics, often with food and sake. To experience hanami like a local, arrive early to secure a good spot in popular parks, bring a tarp to sit on, and pack a selection of bento boxes and drinks.",
          image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b"
        },
        {
          title: "Cultural Significance",
          content: "Cherry blossoms hold deep cultural significance in Japan, symbolizing both the beauty and fragility of life. Their brief blooming period is seen as a metaphor for the impermanence of existence, a concept known as 'mono no aware' in Japanese aesthetics. This philosophical view celebrates the appreciation of beauty alongside the awareness of its transience, reminding viewers to cherish each moment.",
          image: null
        },
        {
          title: "Planning Tips",
          content: "Book accommodations at least 6 months in advance, as hotels fill quickly during cherry blossom season. Consider purchasing a Japan Rail Pass before entering the country for cost-effective travel between cities. Pack layers, as spring weather can be unpredictable. Have a flexible itinerary that allows for adjustments based on actual blooming dates, and consider including some indoor attractions as backup plans for rainy days.",
          image: null
        }
      ],
      relatedPosts: [
        {slug: 'sustainable-travel-tips', title: 'Sustainable Travel: Reducing Your Carbon Footprint'},
        {slug: 'best-travel-photography-tips', title: 'Capture the Perfect Travel Photo: Pro Tips'}
      ]
    },
    'sustainable-travel-tips': {
      title: "Sustainable Travel: Reducing Your Carbon Footprint",
      content: "As global awareness of environmental issues grows, many travelers are seeking ways to explore the world while minimizing their negative impact. Sustainable travel isn't just about reducing carbon emissions—it encompasses supporting local communities, respecting cultural heritage, and preserving natural resources.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      author: "Mark Ecologist",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop",
      date: "May 12, 2024",
      readTime: "7 min read",
      tags: ["Sustainable Travel", "Eco-friendly", "Green Tourism", "Environmental"],
      sections: [
        {
          title: "Choose Eco-Friendly Transportation",
          content: "Transportation often accounts for the largest portion of a trip's carbon footprint. Whenever possible, opt for direct flights as takeoffs and landings create the most emissions. Consider carbon offset programs offered by many airlines. For local travel, use public transportation, bike rentals, or explore on foot. Train travel is generally more environmentally friendly than flying, especially for shorter distances.",
          image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0"
        },
        {
          title: "Support Sustainable Accommodations",
          content: "Look for hotels and lodgings with recognized eco-certifications such as Green Key, LEED, or EarthCheck. Many sustainable properties use renewable energy, implement water conservation measures, and have waste reduction programs. Alternatively, consider locally-owned guesthouses or eco-lodges that often have a smaller environmental footprint and contribute directly to local economies.",
          image: "https://images.unsplash.com/photo-1551525212-a1dc18871d4a"
        },
        {
          title: "Reduce Waste While Traveling",
          content: "Pack reusable items like a water bottle, shopping bag, and bamboo or metal utensils to reduce single-use plastic consumption. Use refillable toiletry containers rather than buying travel-sized products. Respect local recycling systems and be mindful of water usage, especially in regions where water is scarce.",
          image: "https://images.unsplash.com/photo-1528190336454-13cd56b45b5a"
        },
        {
          title: "Choose Responsible Tour Operators",
          content: "When booking tours or activities, research companies that prioritize sustainability and ethical practices. Look for operators that employ local guides, contribute to conservation efforts, maintain small group sizes, and demonstrate respect for wildlife and cultural sites. Review their environmental policies and check if they're affiliated with sustainable tourism organizations.",
          image: null
        },
        {
          title: "Support Local Communities",
          content: "Spend your money where it benefits local residents directly. Eat at locally-owned restaurants that source ingredients from nearby farms. Purchase souvenirs and crafts made by local artisans rather than imported items. Consider participating in community-based tourism initiatives that allow visitors to engage with local traditions while providing economic benefits to communities.",
          image: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135"
        }
      ],
      relatedPosts: [
        {slug: 'japan-cherry-blossom-guide', title: "Complete Guide to Japan's Cherry Blossom Season"},
        {slug: 'best-travel-photography-tips', title: 'Capture the Perfect Travel Photo: Pro Tips'}
      ]
    },
    'best-beaches-in-bali': {
      title: "Top 10 Beaches in Bali You Can't Miss",
      content: "Bali, the Island of the Gods, is renowned for its stunning coastlines that range from secluded paradises to vibrant beach scenes. With its warm tropical waters, golden sands, dramatic cliffs, and spectacular sunsets, Bali's beaches offer something for every type of traveler.",
      image: "https://images.unsplash.com/photo-1555993539-1732b0258235",
      author: "Sarah Beachcomber",
      authorImage: "https://images.unsplash.com/photo-1581403341630-a6e0b9d2ebc5?q=80&w=1374&auto=format&fit=crop",
      date: "June 10, 2024",
      readTime: "8 min read",
      tags: ["Bali", "Beaches", "Indonesia", "Island Getaway"],
      sections: [
        {
          title: "1. Kuta Beach",
          content: "As Bali's most famous beach, Kuta offers a long stretch of golden sand and reliable surf breaks that are perfect for beginners. While it can get crowded, the lively atmosphere, stunning sunsets, and abundant nearby amenities make it a mainstay on any Bali itinerary. The beachfront is lined with restaurants, shops, and nightlife options, making it ideal for travelers who want entertainment alongside their beach experience.",
          image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4"
        },
        {
          title: "2. Nusa Dua",
          content: "For luxury seekers, Nusa Dua's pristine white sand beaches and calm, crystal-clear waters provide the perfect setting. This area is home to many of Bali's high-end resorts, offering a more exclusive and peaceful atmosphere than the island's busier beaches. Water sports enthusiasts will find plenty of activities, from parasailing to jet skiing, while those seeking relaxation can enjoy the immaculately maintained beach facilities.",
          image: "https://images.unsplash.com/photo-1555993539-1732b0258235"
        },
        {
          title: "3. Uluwatu Beach",
          content: "Situated beneath the iconic Uluwatu Temple, this beach is a surfer's paradise with its world-class waves and dramatic setting. The limestone cliffs provide a stunning backdrop, especially during sunset. While the powerful waves make it less suitable for swimming, the breathtaking views and surfer culture create a unique atmosphere that draws visitors from around the world.",
          image: "https://images.unsplash.com/photo-1588717212181-187fcc79bc8e"
        },
        {
          title: "4. Padang Padang Beach",
          content: "Made famous by the movie 'Eat Pray Love,' Padang Padang is a small but incredibly picturesque beach accessed through a narrow cave entrance. Its clear waters and sheltered location make it excellent for swimming, while its unique rock formations create interesting exploration opportunities at low tide. During high season, arrive early to secure a spot on this compact but stunning beach.",
          image: null
        },
        {
          title: "5. Balangan Beach",
          content: "One of Bali's hidden gems, Balangan features a long stretch of white sand backed by towering cliffs. Popular with intermediate surfers, it remains relatively uncrowded compared to other beaches on the island. The laid-back beach cafes serve fresh seafood and cold drinks, perfect for enjoying while watching surfers tackle the impressive waves.",
          image: null
        }
      ],
      relatedPosts: [
        {slug: 'japan-cherry-blossom-guide', title: "Complete Guide to Japan's Cherry Blossom Season"},
        {slug: 'sustainable-travel-tips', title: 'Sustainable Travel: Reducing Your Carbon Footprint'}
      ]
    }
  };
  
  // Return the requested post or a default post if not found
  return posts[slug as keyof typeof posts] || {
    title: "Complete Guide to Japan's Cherry Blossom Season",
    content: "This is a detailed blog post about Japan's cherry blossom season...",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951",
    author: "Jane Traveler",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop",
    date: "May 25, 2024",
    readTime: "12 min read",
    tags: ["Japan", "Cherry Blossoms", "Spring"],
    sections: [],
    relatedPosts: []
  };
};

const BlogPostPage = () => {
   // Scroll to top on component mount
   useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once on mount
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || '');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(42);
  const [hasLiked, setHasLiked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Removed from bookmarks" : "Added to bookmarks");
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
      toast.success("Thanks for liking this article!");
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleShare = (platform: string) => {
    toast.success(`Shared on ${platform}!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${post.title} | WanderTrip.in Blog`}
        description={post.content.substring(0, 160)}
        keywords={post.tags.join(', ')}
        image={post.image}
      />
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <article className="container px-4 sm:px-6 max-w-4xl mx-auto">
          <motion.img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-medium mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center">
                <img 
                  src={post.authorImage} 
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="text-sm font-medium">{post.author}</div>
                  <div className="text-xs text-muted-foreground">Travel Writer</div>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar size={16} className="mr-1" />
                <span>{post.date}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock size={16} className="mr-1" />
                <span>{post.readTime}</span>
              </div>
              
              <div className="flex items-center gap-2 ml-auto">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 text-muted-foreground"
                  onClick={() => handleShare('Facebook')}
                >
                  <Facebook size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 text-muted-foreground"
                  onClick={() => handleShare('Twitter')}
                >
                  <Twitter size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 text-muted-foreground"
                  onClick={() => handleShare('Instagram')}
                >
                  <Instagram size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex items-center gap-1 ${isBookmarked ? 'text-primary' : 'text-muted-foreground'}`}
                  onClick={handleBookmark}
                >
                  <Bookmark size={16} className={isBookmarked ? 'fill-primary' : ''} />
                </Button>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed">{post.content}</p>
              
              {post.sections.map((section, index) => (
                <div key={index} className="my-8">
                  <h2 className="text-2xl font-medium mb-4">{section.title}</h2>
                  <p className="mb-4">{section.content}</p>
                  {section.image && (
                    <img 
                      src={section.image} 
                      alt={section.title} 
                      className="w-full h-auto rounded-lg my-6 object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between border-t border-b border-border/40 py-4 my-8">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex items-center gap-1 ${hasLiked ? 'text-primary' : 'text-muted-foreground'}`}
                  onClick={handleLike}
                >
                  <ThumbsUp size={16} className={hasLiked ? 'fill-primary' : ''} />
                  <span>{likes} likes</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 text-muted-foreground"
                >
                  <MessageCircle size={16} />
                  <span>23 comments</span>
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 text-muted-foreground"
                onClick={() => handleShare('More')}
              >
                <Share2 size={16} />
                <span>Share</span>
              </Button>
            </div>
            
            <div className="mt-12 pt-8 border-t border-border/40">
              <h3 className="text-xl font-medium mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-muted/50 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-medium mb-6">You Might Also Like</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {post.relatedPosts.map((relatedPost, index) => (
                    <div key={index} className="glass rounded-lg overflow-hidden flex flex-col h-full border border-border/40">
                      <div className="p-6">
                        <h4 className="text-lg font-medium mb-4 hover:text-primary transition-colors">
                          <Link to={`/blog/${relatedPost.slug}`}>
                            {relatedPost.title}
                          </Link>
                        </h4>
                        <Link 
                          to={`/blog/${relatedPost.slug}`}
                          className="text-sm text-primary font-medium flex items-center hover:underline"
                        >
                          Read Article
                          <ChevronRight size={14} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-12 pt-8 border-t border-border/40">
              <h3 className="text-xl font-medium mb-6">Subscribe to Our Newsletter</h3>
              <div className="glass p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  Get notified about new travel guides and tips. No spam, we promise!
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-2 bg-background border border-border rounded-lg"
                  />
                  <Button>Subscribe</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
