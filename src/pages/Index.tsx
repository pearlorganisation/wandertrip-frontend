
import { useEffect, useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import EnhancedTripPlanner from '@/components/EnhancedTripPlanner';
import BookingPreview from '@/components/BookingPreview';
import Footer from '@/components/Footer';
import TrendingDestinations from '@/components/TrendingDestinations';
import RecommendationSystem from '@/components/RecommendationSystem';
import { MapPin, ChevronRight, Sparkles, Plane, Users, Calendar, ChevronUp } from 'lucide-react';
import { CreditCardIcon } from '@/components/icons/CreditCardIcon';
import { cn } from '@/lib/utils';
import TravelMoodSelector from '@/components/TravelMoodSelector';
import TravelInspiration from '@/components/TravelInspiration';
import HomeBlogPreview from '@/components/HomeBlogPreview';
import ThingsToDoPreview from '@/components/ThingsToDoPreview';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const destinations = [
  {
    id: "dest-001",
    name: "Phi Phi Islands",
    location: "Thailand",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1739&q=80",
    rating: 4.8
  },
  {
    id: "dest-002",
    name: "Santorini",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
    rating: 4.9
  },
  {
    id: "dest-003",
    name: "Kyoto",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    rating: 4.7
  },
  {
    id: "dest-004",
    name: "Amalfi Coast",
    location: "Italy",
    image: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e",
    rating: 4.8
  }
];

const trendingDestinations = [
  {
    id: "trending-001",
    name: "Cabo San Lucas",
    location: "Mexico",
    image: "https://images.unsplash.com/photo-1527734055665-8def83921139?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7
  },
  {
    id: "trending-002",
    name: "Bora Bora",
    location: "French Polynesia",
    image: "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.9
  },
  {
    id: "trending-003",
    name: "Swiss Alps",
    location: "Switzerland",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8
  },
  {
    id: "trending-004",
    name: "Bali",
    location: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1438&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7
  },
  {
    id: "trending-005",
    name: "Machu Picchu",
    location: "Peru",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.9
  },
  {
    id: "trending-006",
    name: "Banff National Park",
    location: "Canada",
    image: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8
  }
];

const Index = () => {
  const [visibleSection, setVisibleSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [destinationsVisible, setDestinationsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false); // State for showing scroll-to-top

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalScroll) * 100;
      setScrollProgress(progress);

      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setVisibleSection(index);

          if (index === 1 && !destinationsVisible) {
            setDestinationsVisible(true);
          }
        }
      });
    });
  }, [destinationsVisible]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen">
      <div
        className="fixed top-0 left-0 w-full h-0.5 bg-primary/10 z-50"
        aria-hidden="true"
      >
        <motion.div
          className="h-full bg-primary hardware-accelerated"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: "0%" }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 z-40 w-10 h-10 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <Navbar />
      <Hero />

      {/* NEW: Recommendation System Section */}
      <section id="recommendations" className="py-16 bg-gradient-to-b from-background to-background/80">
        <div className="container px-4 sm:px-6">
          <RecommendationSystem />
        </div>
      </section>

      {/* Travel Mood Section */}
      <section id="mood" className="py-16 bg-gradient-to-b from-background to-background/80">
        <div className="container px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <TravelMoodSelector />
          </motion.div>
        </div>
      </section>

      {/* Travel Inspiration Section */}
      <section id="inspiration">
        <TravelInspiration />
      </section>

      <BookingPreview />

      {/* Interactive Globe Section */}
      {/* <section id="globe" className="py-16 bg-gradient-to-b from-background/80 to-secondary/20">
        <div className="container px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Explore Our World
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover destinations across the globe with our interactive map
            </p>
          </motion.div>
          
          <DestinationsGlobe />
        </div>
      </section> */}

      <section id="booking" className="bg-gradient-to-b from-background to-wander-800/5 py-16">
        <div className="container px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-medium tracking-wide rounded-full bg-primary/10 text-primary">
              <Sparkles size={14} />
              <span>AI-Powered Planning</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Plan Your Dream Trip
            </h2>
            <p className="text-muted-foreground text-lg">
              Our advanced AI will create a personalized itinerary based on your preferences
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <EnhancedTripPlanner />
          </div>
        </div>
      </section>

      {/* NEW: Things To Do Section */}
      <section id="things-to-do">
        <ThingsToDoPreview />
      </section>

      {/* NEW: Blog Preview Section */}
      <section id="blogs">
        <HomeBlogPreview />
      </section>

      <TrendingDestinations destinations={trendingDestinations} />


      <section className="py-20 md:py-28 bg-muted/30 content-visibility-auto">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wide uppercase rounded-full bg-primary/10 text-primary">
              Smart Features
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-balance">
              Travel Smarter with AI
            </h2>
            <p className="text-muted-foreground text-lg">
              Leverage cutting-edge AI technology to enhance every aspect of your travel experience
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Sparkles size={24} className="text-primary" />,
                title: "Personalized Itineraries",
                description: "AI-powered recommendations based on your preferences, past trips, and travel trends.",
                path: "/trip-planner"
              },
              {
                icon: <MapPin size={24} className="text-primary" />,
                title: "Hidden Gem Discovery",
                description: "Uncover unique locations that match your interests but aren't on typical tourist radars.",
                path: "/destinations"
              },
              {
                icon: <CreditCardIcon />,
                title: "Dynamic Pricing Insights",
                description: "Get alerts on price drops and learn the best time to book for optimal savings.",
                path: "/booking"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={cn(
                  "glass p-6 rounded-xl hover-scale",
                  visibleSection === 3 && "animate-scale-in"
                )}
                style={{
                  animationDelay: visibleSection === 3 ? `${index * 150}ms` : '0ms',
                  animationFillMode: 'forwards'
                }}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                <Link
                  to={feature.path}
                  className="text-primary text-sm flex items-center"
                >
                  Learn more <ChevronRight size={14} className="ml-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      <section className="py-20 content-visibility-auto">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wide uppercase rounded-full bg-primary/10 text-primary">
              Travel Simplified
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-balance">
              Everything You Need in One Place
            </h2>
            <p className="text-muted-foreground text-lg">
              From planning to booking to on-trip assistance, we've got you covered
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Plane className="text-primary" size={32} />,
                title: "One-tap Booking",
                description: "Book flights, hotels, and activities all in one place with the best prices guaranteed.",
                path: "/booking"
              },
              {
                icon: <Users className="text-primary" size={32} />,
                title: "Concierge Service",
                description: "Access our premium concierge service for special requests and VIP experiences.",
                path: "/luxury-concierge"
              },
              {
                icon: <Calendar className="text-primary" size={32} />,
                title: "Smart Itineraries",
                description: "Dynamic itineraries that adjust in real-time based on weather, delays, and your preferences.",
                path: "/itinerary/bali-adventure-123"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                <Link
                  to={feature.path}
                  className="text-primary text-sm flex items-center"
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Explore <ChevronRight size={14} className="ml-1" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
