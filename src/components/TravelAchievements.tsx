
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Star, MapPin, Plane, Mountain, Sunrise, Globe, Shield, Sparkles, ChevronRight, ChevronLeft, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  progress: number;
  total: number;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  category: 'explorer' | 'adventurer' | 'cultural' | 'luxury' | 'social';
  xp: number;
  image?: string; // Optional background image
}

interface RewardTier {
  level: number;
  name: string;
  icon: JSX.Element;
  color: string;
  benefits: string[];
}

const rewardTiers: RewardTier[] = [
  {
    level: 1,
    name: "Wanderer",
    icon: <MapPin className="h-8 w-8" />,
    color: "text-blue-500",
    benefits: [
      "Access to basic travel tips",
      "Simple trip organization tools"
    ]
  },
  {
    level: 2,
    name: "Explorer",
    icon: <Globe className="h-8 w-8" />,
    color: "text-green-500",
    benefits: [
      "5% off select bookings",
      "Priority customer support",
      "Exclusive travel guides"
    ]
  },
  {
    level: 3,
    name: "Voyager",
    icon: <Plane className="h-8 w-8" />,
    color: "text-purple-500",
    benefits: [
      "10% off select bookings",
      "Access to VIP lounges",
      "Free travel insurance",
      "Exclusive travel events"
    ]
  },
  {
    level: 4,
    name: "Adventurer",
    icon: <Mountain className="h-8 w-8" />,
    color: "text-amber-500",
    benefits: [
      "15% off all bookings",
      "Free upgrades when available",
      "Dedicated concierge",
      "Surprise welcome gifts",
      "Invitation to travel influencer events"
    ]
  },
  {
    level: 5,
    name: "Legend",
    icon: <Trophy className="h-8 w-8" />,
    color: "text-red-500",
    benefits: [
      "20% off all bookings",
      "Personal travel advisor",
      "Guaranteed upgrades",
      "Special anniversary perks",
      "Exclusive partner benefits",
      "Free annual luxury experience"
    ]
  }
];

// Sample achievements
const achievements: Achievement[] = [
  {
    id: "globe-trotter",
    name: "Globe Trotter",
    description: "Visit 5 different countries across multiple continents",
    icon: <Globe className="h-6 w-6" />,
    progress: 3,
    total: 5,
    level: 1,
    maxLevel: 5,
    unlocked: false,
    category: 'explorer',
    xp: 100,
    image: "https://images.unsplash.com/photo-1531219572328-a0171b4448a3?q=80&w=1080&auto=format&fit=crop"
  },
  {
    id: "dawn-patrol",
    name: "Dawn Patrol",
    description: "Experience 3 memorable sunrises in different locations",
    icon: <Sunrise className="h-6 w-6" />,
    progress: 3,
    total: 3,
    level: 1,
    maxLevel: 3,
    unlocked: true,
    category: 'adventurer',
    xp: 150,
    image: "https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?q=80&w=1080&auto=format&fit=crop"
  },
  {
    id: "mountain-conqueror",
    name: "Mountain Conqueror",
    description: "Hike a mountain peak with elevation over 3,000 meters",
    icon: <Mountain className="h-6 w-6" />,
    progress: 0,
    total: 1,
    level: 0,
    maxLevel: 5,
    unlocked: false,
    category: 'adventurer',
    xp: 200
  },
  {
    id: "luxury-escape",
    name: "Luxury Escape",
    description: "Stay at a 5-star resort with exclusive amenities",
    icon: <Star className="h-6 w-6" />,
    progress: 1,
    total: 1,
    level: 1,
    maxLevel: 3,
    unlocked: true,
    category: 'luxury',
    xp: 100,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1080&auto=format&fit=crop"
  },
  {
    id: "culture-dive",
    name: "Culture Dive",
    description: "Attend 3 local cultural events or traditional ceremonies",
    icon: <MapPin className="h-6 w-6" />,
    progress: 2,
    total: 3,
    level: 0,
    maxLevel: 3,
    unlocked: false,
    category: 'cultural',
    xp: 120
  },
  {
    id: "social-butterfly",
    name: "Social Butterfly",
    description: "Share 10 travel photos that receive over 50 likes each",
    icon: <Share2 className="h-6 w-6" />,
    progress: 7,
    total: 10,
    level: 0,
    maxLevel: 5,
    unlocked: false,
    category: 'social',
    xp: 80
  }
];

export default function TravelAchievements() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTierIndex, setActiveTierIndex] = useState(0);
  const [userLevel, setUserLevel] = useState(2); // Current user level
  const [userXP, setUserXP] = useState(350); // Current XP
  const [detailId, setDetailId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const nextXPThreshold = 500; // XP needed for next level
  
  const filteredAchievements = selectedCategory 
    ? achievements.filter(a => a.category === selectedCategory)
    : achievements;
    
  const totalAchieved = achievements.filter(a => a.unlocked).length;
  const totalProgress = achievements.reduce((sum, a) => sum + a.progress, 0);
  const totalPossible = achievements.reduce((sum, a) => sum + a.total, 0);
  
  const xpPercentage = (userXP / nextXPThreshold) * 100;
  
  const handleNextTier = () => {
    setActiveTierIndex(prev => Math.min(prev + 1, rewardTiers.length - 1));
  };
  
  const handlePrevTier = () => {
    setActiveTierIndex(prev => Math.max(prev - 1, 0));
  };
  
  const handleShareAchievements = () => {
    toast({
      title: "Achievements Shared!",
      description: "Your travel achievements have been shared to your social media accounts.",
    });
  };

  return (
    <div className="py-16 bg-gradient-to-b from-background/90 to-background/60">
      <div className="container px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-medium tracking-wide rounded-full bg-primary/10 text-primary">
            <Trophy size={14} />
            <span>Travel Mastery</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Your Travel Achievements
          </h2>
          <p className="text-muted-foreground text-lg">
            Unlock badges, earn rewards, and level up your travel status
          </p>
        </div>
        
        {/* User travel level summary */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="glass rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-24 h-24 relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse-glow" />
                <div className="absolute inset-1 bg-background rounded-full flex items-center justify-center">
                  {rewardTiers[userLevel - 1]?.icon || <Award className="h-10 w-10 text-primary" />}
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
                  <span>Level {userLevel}</span>
                  <span className={rewardTiers[userLevel - 1]?.color || "text-primary"}>
                    {rewardTiers[userLevel - 1]?.name || "Traveler"}
                  </span>
                </h3>
                
                <div className="mt-2 mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>XP: {userXP}/{nextXPThreshold}</span>
                    <span>{Math.floor(xpPercentage)}% to Level {userLevel + 1}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-purple-500"
                      style={{ width: `${xpPercentage}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${xpPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center">
                    <Trophy size={14} className="mr-1" />
                    {totalAchieved} Achievements
                  </div>
                  <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center">
                    <Plane size={14} className="mr-1" />
                    {totalProgress}/{totalPossible} Tasks
                  </div>
                  <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center">
                    <Star size={14} className="mr-1" />
                    Elite benefits unlocked
                  </div>
                </div>
              </div>
              
              <Button 
                className="rounded-full"
                onClick={handleShareAchievements}
              >
                <Share2 size={16} className="mr-2" />
                Share Status
              </Button>
            </div>
          </div>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full",
              selectedCategory === null && "bg-primary text-primary-foreground"
            )}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {['explorer', 'adventurer', 'cultural', 'luxury', 'social'].map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                selectedCategory === category && "bg-primary text-primary-foreground"
              )}
              onClick={() => setSelectedCategory(category as any)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
        
        {/* Achievements grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredAchievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              className={cn(
                "glass rounded-xl overflow-hidden shadow-lg",
                !achievement.unlocked && "opacity-70"
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.02, opacity: 1 }}
              onClick={() => setDetailId(achievement.id)}
            >
              <div className="relative h-40">
                {achievement.image ? (
                  <>
                    <img 
                      src={achievement.image} 
                      alt={achievement.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-wander-500/30 to-muted/30" />
                )}
                
                <div className="absolute top-4 right-4">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    achievement.unlocked ? "bg-green-500" : "bg-muted",
                  )}>
                    {achievement.unlocked ? (
                      <Shield className="h-5 w-5 text-white" />
                    ) : (
                      achievement.icon
                    )}
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-semibold mb-1 flex items-center">
                    {achievement.name}
                    {achievement.unlocked && (
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-200">
                        Level {achievement.level}
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-white/80">{achievement.description}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-2">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{achievement.progress}/{achievement.total}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div 
                      className={cn(
                        "h-full rounded-full",
                        achievement.unlocked ? "bg-green-500" : "bg-primary"
                      )}
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Sparkles size={14} className="mr-1 text-amber-500" />
                    {achievement.xp} XP
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary text-sm">
                    Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Reward tiers section */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Reward Tiers</h3>
            <p className="text-muted-foreground">Unlock more benefits as you level up your travel status</p>
          </div>
          
          <div className="relative">
            <button 
              onClick={handlePrevTier}
              disabled={activeTierIndex === 0}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center shadow-lg disabled:opacity-40"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="overflow-hidden px-10">
              <div 
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${activeTierIndex * 100}%)` }}
              >
                {rewardTiers.map((tier, index) => (
                  <div 
                    key={tier.level}
                    className="min-w-full flex-shrink-0 px-4"
                  >
                    <motion.div 
                      className={cn(
                        "glass rounded-xl p-6",
                        userLevel >= tier.level && "ring-2 ring-green-500"
                      )}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center mb-4">
                        <div className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center mr-4",
                          "bg-gradient-to-br from-wander-500/30 to-transparent",
                        )}>
                          {tier.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold flex items-center">
                            <span className={tier.color}>{tier.name}</span>
                            <span className="ml-2 text-sm font-normal text-muted-foreground">Level {tier.level}</span>
                          </h4>
                          {userLevel >= tier.level ? (
                            <div className="flex items-center text-green-500 text-sm">
                              <Shield className="h-4 w-4 mr-1" />
                              Unlocked
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground">
                              {userLevel === tier.level - 1 ? (
                                <span>Next tier to unlock</span>
                              ) : (
                                <span>{tier.level - userLevel} levels to unlock</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium">Exclusive Benefits:</h5>
                        <ul className="space-y-1">
                          {tier.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <Star size={16} className={cn(
                                "mt-0.5 mr-2 flex-shrink-0",
                                userLevel >= tier.level ? tier.color : "text-muted-foreground"
                              )} />
                              <span className={cn(
                                userLevel < tier.level && "text-muted-foreground"
                              )}>
                                {benefit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleNextTier}
              disabled={activeTierIndex === rewardTiers.length - 1}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center shadow-lg disabled:opacity-40"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="flex justify-center mt-4 gap-1">
            {rewardTiers.map((_, i) => (
              <button
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  i === activeTierIndex ? "bg-primary" : "bg-muted"
                )}
                onClick={() => setActiveTierIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Achievement detail modal */}
      <AnimatePresence>
        {detailId && (
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDetailId(null)}
          >
            <motion.div 
              className="bg-card max-w-md w-full rounded-xl overflow-hidden shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const achievement = achievements.find(a => a.id === detailId);
                if (!achievement) return null;
                
                return (
                  <>
                    <div className="relative h-48">
                      {achievement.image ? (
                        <img 
                          src={achievement.image} 
                          alt={achievement.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-wander-500/30 to-muted" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{achievement.name}</h3>
                            <div className="flex items-center text-sm">
                              <MapPin size={14} className="mr-1" />
                              {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)} Achievement
                            </div>
                          </div>
                          
                          <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center border-2",
                            achievement.unlocked ? "border-green-500 bg-green-500/30" : "border-muted bg-muted/30",
                          )}>
                            {achievement.unlocked ? (
                              <Shield className="h-6 w-6 text-white" />
                            ) : (
                              achievement.icon
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <p className="text-muted-foreground mb-4">{achievement.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{achievement.progress}/{achievement.total}</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              achievement.unlocked ? "bg-green-500" : "bg-primary"
                            )}
                            style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="border-t border-border pt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Rewards</span>
                          <span className="flex items-center text-sm font-medium">
                            <Sparkles size={14} className="mr-1 text-amber-500" />
                            {achievement.xp} XP
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Current Level</span>
                          <span className="text-sm font-medium">
                            {achievement.level}/{achievement.maxLevel}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Status</span>
                          <span className={cn(
                            "text-sm px-2 py-0.5 rounded-full",
                            achievement.unlocked ? "bg-green-500/20 text-green-500" : "bg-amber-500/20 text-amber-500"
                          )}>
                            {achievement.unlocked ? "Completed" : "In Progress"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-5 flex justify-end">
                        <Button 
                          variant="outline" 
                          onClick={() => setDetailId(null)}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
