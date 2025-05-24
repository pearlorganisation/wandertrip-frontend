import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Camera, Share2, Crown, Shield, Star, CheckCircle2, LayoutGrid, Globe, Map, Sparkles, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { TripCard } from '@/components/social/TripCard';
import { TripSelector } from '@/components/social/TripSelector';
import { ShareControls } from '@/components/social/ShareControls';
import { TemplateSelector } from '@/components/social/TemplateSelector';

const sampleTrips = [
  {
    id: 'bali-2023',
    destination: 'Bali',
    date: 'June 2023',
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    status: 'Gold Explorer',
    exclusivity: 'Premium',
    highlights: [
      {
        title: 'Sunrise at Mount Batur',
        image: 'https://images.unsplash.com/photo-1531778272849-d1dd22444c06',
        description: 'Hiked 2 hours in the dark to witness this breathtaking sunrise above the clouds.'
      },
      {
        title: 'Sacred Monkey Forest',
        image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18',
        description: 'Made friends with the locals at Ubud\'s famous monkey sanctuary.'
      },
      {
        title: 'Uluwatu Temple Sunset',
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
        description: 'Watched the traditional Kecak fire dance as the sun set over this clifftop temple.'
      }
    ],
    stats: {
      days: 7,
      photos: 342,
      places: 12,
      spending: 2150,
      currency: 'USD'
    }
  },
  {
    id: 'japan-2023',
    destination: 'Japan',
    date: 'March 2023',
    coverImage: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3',
    status: 'Platinum Voyager',
    exclusivity: 'VIP',
    highlights: [
      {
        title: 'Cherry Blossoms in Kyoto',
        image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951',
        description: 'Witnessed the magical sakura season along the Philosopher\'s Path.'
      },
      {
        title: 'Tokyo Skyline',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
        description: 'Panoramic views from the Tokyo Skytree observation deck.'
      },
      {
        title: 'Traditional Tea Ceremony',
        image: 'https://images.unsplash.com/photo-1536856136534-bb679c52a9aa',
        description: 'Learned the art of Japanese tea preparation from a master.'
      }
    ],
    stats: {
      days: 10,
      photos: 512,
      places: 18,
      spending: 3200,
      currency: 'USD'
    }
  }
];

const templates = [
  { id: 'prestige', name: 'Elite Prestige', color: 'bg-gradient-to-r from-slate-900 to-slate-700', icon: <Crown size={14} className="mr-1" /> },
  { id: 'luxury', name: 'Luxury Gold', color: 'bg-gradient-to-r from-amber-600 to-yellow-500', icon: <Star size={14} className="mr-1" /> },
  { id: 'exclusive', name: 'Exclusive Access', color: 'bg-gradient-to-r from-purple-700 to-pink-600', icon: <Shield size={14} className="mr-1" /> },
  { id: 'signature', name: 'Signature Journey', color: 'bg-gradient-to-r from-emerald-600 to-teal-500', icon: <CheckCircle2 size={14} className="mr-1" /> },
];

const socialFeatures = [
  {
    title: "Verified Traveler Badge",
    icon: <Shield className="text-primary h-5 w-5" />,
    description: "Display a verified status that authenticates your exclusive travel experiences"
  },
  {
    title: "Elite Travel Ranks",
    icon: <Crown className="text-primary h-5 w-5" />,
    description: "Earn prestigious travel ranks based on destinations visited and experiences completed"
  },
  {
    title: "Exclusive Content",
    icon: <Star className="text-primary h-5 w-5" />,
    description: "Share VIP moments and experiences that only WanderTrip members can access"
  },
  {
    title: "Rich Travel Stories",
    icon: <Sparkles className="text-primary h-5 w-5" />,
    description: "Create immersive travel narratives enhanced with premium visuals and animations"
  },
];

const SocialSharing = () => {
  const { toast } = useToast();
  const [selectedTrip, setSelectedTrip] = useState(sampleTrips[0]);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [showFlexDetails, setShowFlexDetails] = useState(true);
  const [exclusiveMode, setExclusiveMode] = useState(false);
  
  const handleGenerateHighlights = () => {
    toast({
      title: "Premium Highlights Generated",
      description: "Your travel story has been enhanced with exclusive AI-generated content!",
    });
  };
  
  const handleShare = (platform: string) => {
    toast({
      title: `Shared to ${platform}`,
      description: "Your premium travel experience has been shared!",
    });
  };
  
  const handleExclusiveToggle = () => {
    setExclusiveMode(!exclusiveMode);
    toast({
      title: exclusiveMode ? "Standard sharing mode" : "Exclusive sharing activated",
      description: exclusiveMode ? "Switched to standard sharing options" : "Your content will now display with premium badges and exclusive indicators",
    });
  };

  const handleTripSelect = (trip: typeof selectedTrip) => {
    setSelectedTrip(trip);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="py-12 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-primary/20 backdrop-blur-sm"
              >
                <Share2 size={20} className="text-primary" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl font-medium tracking-tight mb-4"
              >
                Elevate Your Travel Status
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-300 text-lg"
              >
                Showcase your exclusive journeys and establish yourself as an elite traveler
              </motion.p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <TripSelector 
                  trips={sampleTrips}
                  selectedTripId={selectedTrip.id}
                  onTripSelect={handleTripSelect}
                />
                
                <div className="glass rounded-xl p-6 mb-6 border border-slate-200 dark:border-slate-800">
                  <h2 className="text-xl font-medium mb-4 flex items-center">
                    <Crown size={18} className="text-primary mr-2" />
                    Premium Templates
                  </h2>
                  
                  <TemplateSelector 
                    templates={templates}
                    selectedTemplate={selectedTemplate}
                    onTemplateSelect={setSelectedTemplate}
                  />
                  
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <h3 className="text-sm font-medium flex items-center">
                        <LayoutGrid size={14} className="mr-1.5" />
                        Status Options
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Elite Travel Stats</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={showFlexDetails}
                            onChange={() => setShowFlexDetails(!showFlexDetails)}
                          />
                          <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">VIP Indicators</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={exclusiveMode}
                            onChange={handleExclusiveToggle}
                          />
                          <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleGenerateHighlights}
                      className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-lg transition-colors hover:bg-primary/20"
                    >
                      <Camera size={16} className="mr-2" />
                      Generate Premium Highlights
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <TripCard 
                  trip={selectedTrip}
                  selectedTemplate={selectedTemplate}
                  exclusiveMode={exclusiveMode}
                  showStats={showFlexDetails}
                />
                
                <div className="mt-6">
                  <ShareControls onShare={handleShare} />
                </div>
                
                <div className="mt-8 p-6 rounded-xl glass border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-start mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <Award size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1 text-lg">Elite Travel Status</h3>
                      <p className="text-sm text-muted-foreground">Showcase your premium travel experiences and elevate your social status</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {socialFeatures.map((feature, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/50"
                      >
                        <div className="flex items-start">
                          <div className="mt-0.5 mr-3">
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">{feature.title}</h4>
                            <p className="text-xs text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="bg-slate-900 text-white p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Crown size={18} className="text-amber-400 mr-2" />
                      <h4 className="font-medium">Travel Achievements</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { name: "Elite Explorer", icon: "🏝️", progress: 100, level: "16" },
                        { name: "Luxury Seeker", icon: "🏆", progress: 75, level: "8" },
                        { name: "Culture Maven", icon: "🏛️", progress: 90, level: "12" },
                        { name: "Global Influencer", icon: "🌟", progress: 60, level: "5" }
                      ].map((badge, index) => (
                        <div key={index} className="bg-slate-800/70 p-3 rounded-lg text-center">
                          <div className="text-2xl mb-1">{badge.icon}</div>
                          <div className="text-xs font-medium mb-1">{badge.name}</div>
                          <div className="text-xs text-slate-400 mb-1.5">Level {badge.level}</div>
                          <div className="w-full bg-slate-700 rounded-full h-1.5">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${badge.progress}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-background">
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-2xl font-medium mb-3">Elevate Your Social Presence</h2>
              <p className="text-muted-foreground">Transform your travel experiences into status symbols</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: <Crown className="text-amber-500" size={24} />,
                  title: "Premium Status Badges",
                  description: "Display exclusive status badges that showcase your travel achievements to your network"
                },
                {
                  icon: <Shield className="text-primary" size={24} />,
                  title: "Verified Experiences",
                  description: "Share authenticated luxury experiences that validate your exclusive access"
                },
                {
                  icon: <Sparkles className="text-primary" size={24} />,
                  title: "Enhanced Storytelling",
                  description: "Create immersive travel narratives with premium visuals that elevate your social presence"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SocialSharing;
