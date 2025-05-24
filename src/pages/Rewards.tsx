
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Award, Trophy, Gift, Star, Calendar, Sparkles, 
  BadgeCheck, ChevronRight, Flame, Zap, PartyPopper, 
  Crown, ShieldCheck, Rocket, Heart, Compass, MapPin,
  Ticket, Clock, Smile, Globe, Lightbulb, Camera
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import confetti from 'canvas-confetti';
import { useTravelStats } from '@/hooks/useTravelStats';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

const Rewards = () => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState<'achievements' | 'rewards' | 'badges'>('achievements');
  const [progressValues, setProgressValues] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const { stats, travelBadges, levelInfo, isLoading } = useTravelStats();
  
  // Sample data for achievements and rewards
  const achievements = [
    { id: 1, name: 'First Adventure', icon: '🏕️', description: 'Complete your first trip booking', progress: 100, points: 50, completed: true },
    { id: 2, name: 'Luxury Explorer', icon: '✨', description: 'Book a 5-star accommodation', progress: 100, points: 100, completed: true },
    { id: 3, name: 'Island Hopper', icon: '🏝️', description: 'Visit 3 different islands', progress: 66, points: 150, completed: false },
    { id: 4, name: 'Culture Seeker', icon: '🏛️', description: 'Visit 5 historical landmarks', progress: 40, points: 200, completed: false },
    { id: 5, name: 'Foodie Traveler', icon: '🍜', description: 'Try local cuisine in 3 countries', progress: 33, points: 100, completed: false },
    { id: 6, name: 'Mountain Climber', icon: '🏔️', description: 'Book a hiking adventure', progress: 0, points: 150, completed: false },
    { id: 7, name: 'City Explorer', icon: '🏙️', description: 'Visit 5 major cities', progress: 80, points: 120, completed: false },
    { id: 8, name: 'Sunset Chaser', icon: '🌅', description: 'Photograph 3 sunsets around the world', progress: 66, points: 80, completed: false },
  ];
  
  const rewards = [
    { id: 1, name: 'Free Airport Transfer', icon: '🚗', points: 200, available: true },
    { id: 2, name: '10% Off Next Booking', icon: '🏷️', points: 300, available: true },
    { id: 3, name: 'Luxury Hotel Upgrade', icon: '🏨', points: 500, available: false },
    { id: 4, name: 'Travel Insurance Discount', icon: '🛡️', points: 150, available: true },
    { id: 5, name: 'Priority Check-in', icon: '✅', points: 100, available: true },
    { id: 6, name: 'Exclusive Travel Guide', icon: '📔', points: 75, available: true },
    { id: 7, name: 'Spa Treatment Voucher', icon: '💆', points: 250, available: true },
    { id: 8, name: 'Adventure Activity Discount', icon: '🧗‍♂️', points: 180, available: true },
  ];
  
  const badges = [
    { id: 1, name: 'Globetrotter', icon: '🌍', level: 2, description: 'Visited 10+ countries', unlocked: true },
    { id: 2, name: 'Culture Explorer', icon: '🏛️', level: 3, description: 'Visited 15+ historical sites', unlocked: true },
    { id: 3, name: 'Mountain Climber', icon: '🏔️', level: 1, description: 'Completed hiking trips', unlocked: true },
    { id: 4, name: 'Beach Lover', icon: '🏝️', level: 2, description: 'Visited 5+ beach destinations', unlocked: true },
    { id: 5, name: 'Night Owl', icon: '🦉', level: 1, description: 'Experienced 3+ nightlife scenes', unlocked: false },
    { id: 6, name: 'Food Connoisseur', icon: '🍽️', level: 2, description: 'Tried cuisine in 8+ countries', unlocked: false },
  ];
  
  const userPoints = isLoading ? 0 : stats.travelPoints;
  const nextLevelPoints = isLoading ? 500 : levelInfo.nextLevelPoints;
  const userLevel = isLoading ? 1 : levelInfo.currentLevel;

  // Animation effect for progress bars
  useEffect(() => {
    // Start with zero progress, then animate to actual values
    setProgressValues({});
    
    const timer = setTimeout(() => {
      const newProgressValues = {};
      
      achievements.forEach(achievement => {
        newProgressValues[achievement.id] = achievement.progress;
      });
      
      setProgressValues(newProgressValues);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [currentTab]);

  // Trigger confetti effect
  useEffect(() => {
    if (showConfetti) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      
      const randomInRange = (min, max) => {
        return Math.random() * (max - min) + min;
      }
      
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        
        confetti({
          particleCount: 3,
          startVelocity: 30,
          spread: 100,
          origin: { 
            x: randomInRange(0.1, 0.9), 
            y: randomInRange(0.1, 0.5) 
          },
          colors: ['#FFC700', '#FF0080', '#00FFFF', '#7928CA'],
          disableForReducedMotion: true
        });
      }, 150);
      
      setTimeout(() => {
        setShowConfetti(false);
      }, duration);
    }
  }, [showConfetti]);
  
  const handleClaimReward = (rewardName: string, points: number) => {
    setShowConfetti(true);
    
    toast({
      title: `🎉 Reward Claimed: ${rewardName}`,
      description: `You've used ${points} points. Check your email for redemption details!`,
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="py-12 bg-gradient-to-r from-primary/5 via-secondary/10 to-primary/5">
          <div className="container px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center mb-8"
            >
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20 
                }}
                className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-primary/10"
              >
                <Award size={24} className="text-primary" />
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
              >
                Your Travel Rewards
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-muted-foreground text-lg"
              >
                Earn points, unlock achievements, and redeem exciting travel rewards
              </motion.p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              {/* User Status Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm rounded-xl p-6 mb-8 border border-primary/10 shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-center">
                    <motion.div 
                      whileHover={{ rotate: 10, scale: 1.05 }}
                      className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4"
                    >
                      <Trophy size={32} className="text-primary" />
                    </motion.div>
                    <div>
                      <h2 className="text-xl font-medium mb-1">Level {userLevel} Explorer</h2>
                      <p className="text-sm text-muted-foreground">Keep traveling to reach Level {userLevel + 1}</p>
                    </div>
                  </div>
                  
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex-grow max-w-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium flex items-center">
                        <Star size={16} className="text-yellow-500 mr-1" /> {userPoints} points
                      </span>
                      <span className="text-sm text-muted-foreground">{nextLevelPoints} points</span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Progress 
                        value={(userPoints / nextLevelPoints) * 100} 
                        className="h-3 bg-primary/10"
                      />
                    </motion.div>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center">
                      <Zap size={14} className="text-yellow-500 mr-1" /> 
                      <span>{nextLevelPoints - userPoints} more points to reach Level {userLevel + 1}</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Stats Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass rounded-xl p-5 flex items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                    <BadgeCheck size={24} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Achievements Completed</p>
                    <h3 className="text-2xl font-semibold">{achievements.filter(a => a.completed).length}/{achievements.length}</h3>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass rounded-xl p-5 flex items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
                    <Gift size={24} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Available Rewards</p>
                    <h3 className="text-2xl font-semibold">{rewards.filter(r => r.available && r.points <= userPoints).length}</h3>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass rounded-xl p-5 flex items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mr-4">
                    <Award size={24} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Badges Unlocked</p>
                    <h3 className="text-2xl font-semibold">{badges.filter(b => b.unlocked).length}/{badges.length}</h3>
                  </div>
                </motion.div>
              </div>
              
              {/* Tabs */}
              <div className="mb-8">
                <Tabs defaultValue="achievements" value={currentTab} onValueChange={(v) => setCurrentTab(v as any)}>
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="achievements" className="flex items-center">
                      <BadgeCheck size={16} className="mr-2" />
                      Achievements
                    </TabsTrigger>
                    <TabsTrigger value="rewards" className="flex items-center">
                      <Gift size={16} className="mr-2" />
                      Rewards
                    </TabsTrigger>
                    <TabsTrigger value="badges" className="flex items-center">
                      <Award size={16} className="mr-2" />
                      Badges
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="achievements">
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {achievements.map((achievement, index) => (
                          <motion.div 
                            key={achievement.id}
                            variants={itemVariants}
                            whileHover={{ 
                              y: -5,
                              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                              transition: { duration: 0.2 }
                            }}
                            className={`p-5 rounded-xl transition-all ${
                              achievement.completed 
                                ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 shadow' 
                                : 'glass'
                            }`}
                          >
                            <div className="flex items-start">
                              <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-2xl mr-4 shadow-sm">
                                {achievement.icon}
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold">{achievement.name}</h3>
                                  {achievement.completed && (
                                    <motion.span 
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ 
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: 0.5 + index * 0.1
                                      }}
                                      className="text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded-full flex items-center"
                                    >
                                      <BadgeCheck size={12} className="mr-1" />
                                      Completed
                                    </motion.span>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                                
                                <div className="mt-3">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-medium">{achievement.progress}% Complete</span>
                                    <span className="text-xs text-primary font-medium flex items-center">
                                      <Star size={12} className="text-yellow-500 mr-1 animate-pulse" />
                                      +{achievement.points} pts
                                    </span>
                                  </div>
                                  <div className="relative h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: '0%' }}
                                      animate={{ width: `${progressValues[achievement.id] || 0}%` }}
                                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                                      className={`absolute top-0 left-0 h-full rounded-full ${
                                        achievement.completed
                                          ? 'bg-gradient-to-r from-primary to-secondary'
                                          : 'bg-primary'
                                      }`}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="rounded-xl glass p-6 border border-muted"
                      >
                        <h3 className="font-medium mb-4 flex items-center">
                          <Calendar size={18} className="mr-2 text-primary" />
                          Coming Soon
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                          <motion.div 
                            whileHover={{ scale: 1.03 }}
                            className="flex items-center p-3 bg-muted/50 rounded-lg"
                          >
                            <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-xl mr-3">
                              🌎
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Continent Collector</h4>
                              <p className="text-xs text-muted-foreground">Visit all 7 continents</p>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            whileHover={{ scale: 1.03 }}
                            className="flex items-center p-3 bg-muted/50 rounded-lg"
                          >
                            <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-xl mr-3">
                              🌟
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Trip Milestone</h4>
                              <p className="text-xs text-muted-foreground">Complete 10 trips</p>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            whileHover={{ scale: 1.03 }}
                            className="flex items-center p-3 bg-muted/50 rounded-lg"
                          >
                            <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-xl mr-3">
                              📸
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Memory Maker</h4>
                              <p className="text-xs text-muted-foreground">Share 5 trip photos</p>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            whileHover={{ scale: 1.03 }}
                            className="flex items-center p-3 bg-muted/50 rounded-lg"
                          >
                            <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-xl mr-3">
                              🧳
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Frequent Traveler</h4>
                              <p className="text-xs text-muted-foreground">3 trips in one year</p>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="rewards">
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium flex items-center">
                          <PartyPopper size={18} className="text-primary mr-2" />
                          Available Rewards
                        </h3>
                        <motion.div 
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 260,
                            damping: 20 
                          }}
                          className="flex items-center text-sm font-medium bg-primary/10 px-3 py-1 rounded-full"
                        >
                          <Star size={16} className="text-yellow-500 mr-1" />
                          {userPoints} points available
                        </motion.div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {rewards.map((reward, index) => (
                          <motion.div 
                            key={reward.id}
                            variants={itemVariants}
                            whileHover={
                              reward.available && userPoints >= reward.points 
                                ? { 
                                    y: -5,
                                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                                  }
                                : {}
                            }
                            className={`glass p-5 rounded-xl border transition-all ${
                              reward.available && userPoints >= reward.points 
                                ? 'border-primary/20 hover:border-primary/50'
                                : 'border-muted opacity-80'
                            }`}
                          >
                            <div className="flex items-start">
                              <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-2xl mr-4 shadow-sm">
                                {reward.icon}
                              </div>
                              <div className="flex-grow">
                                <h3 className="font-semibold">{reward.name}</h3>
                                <div className="flex items-center mt-1">
                                  <Star size={14} className="text-yellow-500 mr-1" />
                                  <span className="text-sm font-medium">{reward.points} points</span>
                                </div>
                                
                                <motion.button
                                  whileHover={
                                    reward.available && userPoints >= reward.points 
                                      ? { scale: 1.05 }
                                      : {}
                                  }
                                  whileTap={
                                    reward.available && userPoints >= reward.points 
                                      ? { scale: 0.98 }
                                      : {}
                                  }
                                  onClick={() => handleClaimReward(reward.name, reward.points)}
                                  disabled={!reward.available || userPoints < reward.points}
                                  className={`mt-4 w-full px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                                    reward.available && userPoints >= reward.points
                                      ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-md'
                                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                                  }`}
                                >
                                  {!reward.available 
                                    ? 'Currently Unavailable'
                                    : userPoints < reward.points 
                                      ? `Need ${reward.points - userPoints} more points`
                                      : 'Redeem Now'
                                  }
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.div 
                        variants={itemVariants}
                        className="rounded-xl glass p-6 border border-muted"
                      >
                        <h3 className="font-medium mb-4 flex items-center">
                          <Crown size={18} className="mr-2 text-primary" />
                          Premium Rewards
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Unlock these exclusive rewards when you reach Level 5 Explorer status.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                          <motion.div 
                            whileHover={{ scale: 1.03 }}
                            className="flex items-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10"
                          >
                            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-xl mr-3 shadow-sm">
                              🧳
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold">Free Luggage Upgrade</h4>
                              <div className="flex items-center mt-1">
                                <Star size={12} className="text-yellow-500 mr-1" />
                                <span className="text-xs">800 points</span>
                              </div>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            whileHover={{ scale: 1.03 }}
                            className="flex items-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10"
                          >
                            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-xl mr-3 shadow-sm">
                              🛂
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold">Fast-Track Immigration</h4>
                              <div className="flex items-center mt-1">
                                <Star size={12} className="text-yellow-500 mr-1" />
                                <span className="text-xs">1000 points</span>
                              </div>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            whileHover={{ scale: 1.03 }}
                            className="flex items-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10"
                          >
                            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-xl mr-3 shadow-sm">
                              🛎️
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold">Personal Concierge</h4>
                              <div className="flex items-center mt-1">
                                <Star size={12} className="text-yellow-500 mr-1" />
                                <span className="text-xs">1200 points</span>
                              </div>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            whileHover={{ scale: 1.03 }}
                            className="flex items-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10"
                          >
                            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-xl mr-3 shadow-sm">
                              ✈️
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold">Seat Upgrade</h4>
                              <div className="flex items-center mt-1">
                                <Star size={12} className="text-yellow-500 mr-1" />
                                <span className="text-xs">900 points</span>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        variants={itemVariants}
                        className="rounded-xl glass p-6 border border-primary/10"
                      >
                        <h3 className="font-medium mb-4 flex items-center">
                          <Lightbulb size={18} className="mr-2 text-primary" />
                          How Rewards Work
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="text-center p-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                              <Compass size={20} className="text-primary" />
                            </div>
                            <h4 className="font-medium mb-1">1. Explore &amp; Earn</h4>
                            <p className="text-xs text-muted-foreground">Complete trips and achievements to earn travel points</p>
                          </div>
                          
                          <div className="text-center p-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                              <Ticket size={20} className="text-primary" />
                            </div>
                            <h4 className="font-medium mb-1">2. Redeem Rewards</h4>
                            <p className="text-xs text-muted-foreground">Use your points for exclusive travel perks and benefits</p>
                          </div>
                          
                          <div className="text-center p-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                              <Rocket size={20} className="text-primary" />
                            </div>
                            <h4 className="font-medium mb-1">3. Level Up</h4>
                            <p className="text-xs text-muted-foreground">Reach higher tiers for premium rewards and status benefits</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="badges">
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium flex items-center">
                          <Award size={18} className="text-primary mr-2" />
                          Your Badges
                        </h3>
                        <Badge variant="outline" className="bg-primary/10">
                          {badges.filter(b => b.unlocked).length} / {badges.length} Unlocked
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {badges.map((badge, index) => (
                          <motion.div 
                            key={badge.id}
                            variants={itemVariants}
                            className={`glass rounded-xl p-5 text-center border ${
                              badge.unlocked ? 'border-primary/20' : 'border-muted opacity-70'
                            }`}
                          >
                            <div className="relative inline-block">
                              <div className={`w-16 h-16 rounded-full ${
                                badge.unlocked ? 'bg-primary/10' : 'bg-muted/50'
                              } flex items-center justify-center text-3xl mx-auto mb-2`}>
                                {badge.icon}
                              </div>
                              {badge.level > 1 && badge.unlocked && (
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                                  {badge.level}
                                </div>
                              )}
                            </div>
                            
                            <h3 className="font-medium mb-1">{badge.name}</h3>
                            <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                            
                            <div className={`text-xs px-2 py-1 rounded-full inline-flex items-center ${
                              badge.unlocked 
                                ? 'bg-green-500/10 text-green-600'
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {badge.unlocked ? (
                                <>
                                  <BadgeCheck size={12} className="mr-1" />
                                  Unlocked
                                </>
                              ) : (
                                <>
                                  <Clock size={12} className="mr-1" />
                                  Locked
                                </>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.div 
                        variants={itemVariants}
                        className="rounded-xl glass p-6 border border-primary/10"
                      >
                        <h3 className="font-medium mb-4 flex items-center">
                          <Smile size={18} className="mr-2 text-primary" />
                          Badge Benefits
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start p-3 rounded-lg bg-muted/30">
                            <Globe size={18} className="text-primary mr-3 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium">Status Recognition</h4>
                              <p className="text-xs text-muted-foreground">Your badges visibly showcase your travel accomplishments to the community</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start p-3 rounded-lg bg-muted/30">
                            <Star size={18} className="text-primary mr-3 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium">Bonus Points</h4>
                              <p className="text-xs text-muted-foreground">Earn extra points when you unlock badges for specific achievements</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start p-3 rounded-lg bg-muted/30">
                            <Camera size={18} className="text-primary mr-3 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium">Profile Enhancement</h4>
                              <p className="text-xs text-muted-foreground">Badges automatically feature on your public travel profile</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 flex justify-between"
              >
                <motion.button 
                  whileHover={{ x: -5 }}
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                >
                  Back to Dashboard
                </motion.button>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-sm text-primary"
                >
                  View Rewards History
                  <ChevronRight size={16} className="ml-1" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Rewards;
