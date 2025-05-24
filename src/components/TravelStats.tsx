import { useState } from 'react'; // Add this import
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTravelStats } from '@/hooks/useTravelStats';
import {
  Trophy, MapPin, Globe, Route, Award, TrendingUp, Flag,
  Compass, Camera, Leaf, Calendar, Mountain, Hotel, Bookmark,
  Target, BarChart, BookOpen, Zap, Sparkles, LucideIcon,
  Thermometer, Navigation, Share2, Rocket, Anchor, Waves, Home, Earth
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge'; // Ensure this supports ref forwarding
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface StatItemProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  iconColor?: string;
  bgColor?: string;
  delay?: number;
}

const StatItem = ({ icon: Icon, value, label, iconColor = "text-primary", bgColor = "bg-primary/10", delay = 0 }: StatItemProps) => (
  <motion.div
    className="text-center transform transition-all duration-300 hover:scale-105"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay * 0.1, duration: 0.4 }}
  >
    <div className={`w-14 h-14 rounded-xl ${bgColor} flex items-center justify-center mx-auto mb-3 shadow-sm`}>
      <Icon size={22} className={iconColor} />
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </motion.div>
);

interface TravelStatsProps {
  stats?: {
    tripsCompleted: number;
    countriesVisited: number;
    citiesExplored: number;
    totalDistance: number;
    travelPoints: number;
    travelRank: string;
    milesTraveled?: number;
    landmarks?: number;
    continents?: number;
    carbonOffset?: number;
    nightsStayed?: number;
    photosUploaded?: number;
    travelStyle?: string;
    premiumStatus?: boolean;
    worldPercentTraveled?: number;
    highestAltitude?: { value: number; location: string; date: string };
    mostDistantFromHome?: { value: number; location: string; date: string };
    hottestPlace?: { value: number; location: string; date: string };
    coldestPlace?: { value: number; location: string; date: string };
    worldCircumference?: number;
    homeLocation?: string;
    adventures?: Array<{
      id: number;
      type: string;
      location: string;
      height?: string;
      date: string;
      description: string;
      icon: string;
      distance?: string;
      depth?: string;
      grade?: string;
      duration?: string;
    }>;
  };
  className?: string;
}

export default function TravelStats({ stats: propStats, className }: TravelStatsProps) {
  const {
    stats: hookStats,
    isLoading,
    travelBadges,
    levelInfo,
    upcomingAchievement,
    travelGoals,
    travelProfile,
    adventures,
    generateShareableSummary
  } = useTravelStats();

  const stats = propStats || hookStats;
  const [activeTab, setActiveTab] = useState<'overview' | 'goals' | 'badges' | 'extremes' | 'adventures'>('overview');

  const handleShare = () => {
    const summary = generateShareableSummary();
    toast.success('Ready to share your travel stats!', {
      description: 'Share your impressive travel journey with friends and family.'
    });
    console.log('Sharing stats:', summary);
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="h-8 bg-primary/10 animate-pulse rounded mb-4 w-1/3"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 animate-pulse mb-2"></div>
              <div className="h-6 bg-primary/10 animate-pulse rounded w-1/2 mb-1"></div>
              <div className="h-4 bg-primary/10 animate-pulse rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const getAdventureIcon = (iconName: string) => {
    switch (iconName) {
      case 'rocket': return <Rocket size={18} className="text-purple-500" />;
      case 'parachute': return <Rocket size={18} className="text-blue-500" />;
      case 'mountain': return <Mountain size={18} className="text-emerald-500" />;
      case 'anchor': return <Anchor size={18} className="text-cyan-500" />;
      case 'wave': return <Waves size={18} className="text-blue-500" />;
      default: return <Award size={18} className="text-amber-500" />;
    }
  };

  return (
    <Card
      variant={stats.premiumStatus ? "premium" : "default"}
      className={cn("overflow-hidden relative", className)}
    >
      <Tabs defaultValue="overview" className="w-full">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <div className="flex items-center space-x-2">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-medium flex items-center"
            >
              <Sparkles size={20} className="text-amber-500 mr-2" />
              Travel Dashboard
            </motion.h3>
            {stats.premiumStatus && (
              <Badge className="bg-gradient-to-r from-amber-500 to-amber-300 text-white border-0 hover:from-amber-600 hover:to-amber-400">
                Premium
              </Badge>
            )}
          </div>

          
            <TabsList className="bg-secondary/50 flex whitespace-nowrap">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="extremes">Extremes</TabsTrigger>
              <TabsTrigger value="adventures">Adventures</TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Premium pattern */}
        {stats.premiumStatus && (
          <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
            <div className="absolute top-5 right-5 w-40 h-40 rounded-full border-8 border-primary/20"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full border-4 border-primary/20"></div>
            <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full border-2 border-primary/10"></div>
          </div>
        )}

        <TabsContent value="overview" className="space-y-6 p-6 pt-2">
          {/* Travel Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 flex items-center justify-between shadow-sm border border-blue-100/50"
          >
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mr-4 shadow-md">
                <Award size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-950">{travelProfile}</h4>
                <p className="text-sm text-blue-600/80">Your Travel Personality</p>
              </div>
            </div>
            <div>
              <div className="text-sm bg-white rounded-full px-3 py-1 flex items-center shadow-sm border border-blue-100/50">
                <Zap size={14} className="mr-1.5 text-amber-500" />
                Level {levelInfo.currentLevel}
              </div>
            </div>
          </motion.div>

          {/* Home Location */}
          {stats.homeLocation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 flex items-center shadow-sm border border-orange-100/50"
            >
              <div className="p-2.5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg mr-3 shadow-sm">
                <Home size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600/80">Home Base</p>
                <h4 className="font-semibold text-orange-950">{stats.homeLocation}</h4>
              </div>
            </motion.div>
          )}

          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 relative z-10">
            <StatItem
              icon={Trophy}
              value={stats.tripsCompleted}
              label="Trips Completed"
              iconColor="text-amber-500"
              bgColor="bg-amber-50"
              delay={0}
            />

            <StatItem
              icon={Globe}
              value={stats.countriesVisited}
              label="Countries"
              iconColor="text-indigo-500"
              bgColor="bg-indigo-50"
              delay={1}
            />

            <StatItem
              icon={MapPin}
              value={stats.citiesExplored}
              label="Cities"
              iconColor="text-rose-500"
              bgColor="bg-rose-50"
              delay={2}
            />

            <StatItem
              icon={Route}
              value={Math.floor(stats.totalDistance).toLocaleString()}
              label="KM Traveled"
              iconColor="text-emerald-500"
              bgColor="bg-emerald-50"
              delay={3}
            />

            <StatItem
              icon={Award}
              value={stats.travelPoints.toLocaleString()}
              label="Travel Points"
              iconColor="text-violet-500"
              bgColor="bg-violet-50"
              delay={4}
            />

            <StatItem
              icon={Flag}
              value={5}
              label="Continents"
              iconColor="text-blue-500"
              bgColor="bg-blue-50"
              delay={5}
            />
          </div>

          {/* premium stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white-50 to-cyan-50 rounded-xl p-4 border border-blue-100/50 shadow-sm">
                <div className="flex items-center mb-2">
                  <Earth size={18} className="text-blue-600 mr-2" />
                  <h5 className="font-medium">World Explored</h5>
                </div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Coverage</span>
                  <span className="font-medium">7.2%</span>
                </div>
                <Progress value={7.2} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  You've explored {7.2}% of the world's countries
                </p>
              </div>
            </div>
          </motion.div>

          {/* Additional Premium Stats */}
          {stats.premiumStatus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4"
            >
              <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-3 text-center border border-slate-200/50 shadow-sm">
                <div className="flex justify-center mb-1">
                  <Compass size={18} className="text-slate-700" />
                </div>
                <div className="text-lg font-semibold">{stats.landmarks}</div>
                <div className="text-xs text-slate-500">Landmarks</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 text-center border border-green-200/50 shadow-sm">
                <div className="flex justify-center mb-1">
                  <Leaf size={18} className="text-green-600" />
                </div>
                <div className="text-lg font-semibold">{stats.carbonOffset}t</div>
                <div className="text-xs text-green-600/80">Carbon Offset</div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-3 text-center border border-amber-200/50 shadow-sm">
                <div className="flex justify-center mb-1">
                  <Hotel size={18} className="text-amber-600" />
                </div>
                <div className="text-lg font-semibold">{stats.nightsStayed}</div>
                <div className="text-xs text-amber-600/80">Nights Stayed</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-3 text-center border border-purple-200/50 shadow-sm">
                <div className="flex justify-center mb-1">
                  <Camera size={18} className="text-purple-600" />
                </div>
                <div className="text-lg font-semibold">{stats.photosUploaded}</div>
                <div className="text-xs text-purple-600/80">Photos</div>
              </div>
            </motion.div>
          )}

          {/* Level Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mt-4 border border-blue-100/50 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="flex items-center text-blue-700">
                <TrendingUp size={15} className="mr-1.5" />
                Level {levelInfo.currentLevel}
              </span>
              <span className="text-blue-700">{levelInfo.pointsNeeded} points to Level {levelInfo.currentLevel + 1}</span>
            </div>
            <Progress value={levelInfo.progress} className="h-2.5 bg-blue-200" indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-600" />
          </motion.div>

          {/* Upcoming Achievement */}
          {upcomingAchievement && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 mt-4 border border-purple-100/50 shadow-sm"
            >
              <h4 className="text-sm font-medium mb-3 text-purple-800">Next Achievement</h4>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-4 shadow-md">
                  <span className="text-xl text-white">{upcomingAchievement.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-purple-900">{upcomingAchievement.name}</h5>
                    <span className="text-sm text-purple-700">{upcomingAchievement.points} pts</span>
                  </div>
                  <div className="mt-2">
                    <Progress value={upcomingAchievement.progress} className="h-2 bg-purple-200" indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </TabsContent>

        <TabsContent value="goals" className="p-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between mb-2">
              <motion.h4
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-base font-medium flex items-center"
              >
                <Target size={16} className="mr-2 text-blue-600" />
                Your Travel Goals
              </motion.h4>
              <button className="text-xs text-primary hover:underline flex items-center">
                <Sparkles size={12} className="mr-1" />
                Edit Goals
              </button>
            </div>

            {travelGoals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100/50 shadow-sm"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mr-3 shadow-sm border border-blue-100/50">
                    <span className="text-xl">{goal.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-blue-900">{goal.name}</h5>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-blue-700">{goal.current} of {goal.target} completed</span>
                    <span className="font-medium text-blue-800">{Math.round((goal.current / goal.target) * 100)}%</span>
                  </div>
                  <Progress
                    value={(goal.current / goal.target) * 100}
                    className="h-2.5 bg-blue-200"
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-600"
                  />
                </div>
              </motion.div>
            ))}

            <div className="text-center mt-8">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-sm px-5 py-2.5 rounded-lg flex items-center justify-center mx-auto text-white shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-700"
              >
                <Target size={15} className="mr-2" />
                Add New Goal
              </motion.button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="badges" className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <motion.h4
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-base font-medium flex items-center"
              >
                <Award size={16} className="mr-2 text-amber-500" />
                Your Badges
              </motion.h4>
              <Badge className="bg-secondary text-xs">
                {travelBadges.length} Earned
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {travelBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-4 text-center relative border border-slate-200/70 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                >
                  {badge.exclusive && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-amber-300 text-white text-[10px] border-0">
                      PREMIUM
                    </Badge>
                  )}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center mx-auto mb-3 border border-indigo-100/50 shadow-sm">
                    <span className="text-2xl">{badge.icon}</span>
                  </div>
                  <h5 className="font-medium text-slate-800">{badge.name}</h5>
                  <div className="flex items-center justify-center mt-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full mx-0.5 ${i < badge.level ? 'bg-indigo-500' : 'bg-indigo-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{badge.description}</p>
                </motion.div>
              ))}

              {/* Locked Badge Example */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-4 text-center relative border border-slate-200/70 shadow-sm hover:opacity-70 transition-all duration-300 opacity-60"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-100 to-gray-100 flex items-center justify-center mx-auto mb-3 border border-slate-200/50 shadow-sm">
                  <span className="text-2xl">🛳️</span>
                </div>
                <h5 className="font-medium text-slate-700">Cruise Enthusiast</h5>
                <div className="flex items-center justify-center mt-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full mx-0.5 bg-slate-300"
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">Take your first cruise journey</p>
                <div className="absolute inset-0 flex items-center justify-center rounded-xl">
                  <div className="px-2.5 py-1.5 bg-gradient-to-r from-slate-600/90 to-slate-700/90 rounded-lg text-xs font-medium text-white shadow-sm">
                    <Sparkles size={10} className="inline mr-1" /> Locked
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="extremes" className="p-6">

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={cn(
                "p-4 rounded-lg flex flex-col justify-between",
                "bg-gradient-to-br from-blue-500/10 to-blue-700/20"
              )}>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Mountain size={18} className="text-blue-500 mr-2" />
                    <h4 className="font-medium">Highest Altitude</h4>
                  </div>
                  <p className="text-2xl font-medium">3812m</p>
                </div>

                <div className="mt-4 text-sm">
                  <p className="font-medium">Mount Fuji Base Camp, Japan</p>
                  <p className="text-xs text-muted-foreground">2022-08-15</p>
                </div>
              </div>

              <div className={cn(
                "p-4 rounded-lg flex flex-col justify-between",
                "bg-gradient-to-br from-amber-500/10 to-amber-700/20"
              )}>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Navigation size={18} className="text-amber-500 mr-2" />
                    <h4 className="font-medium">Most Distant</h4>
                  </div>
                  <p className="text-2xl font-medium">15420 km</p>
                </div>

                <div className="mt-4 text-sm">
                  <p className="font-medium">Sydney, Australia</p>
                  <p className="text-xs text-muted-foreground">2023-05-10</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={cn(
                "p-4 rounded-lg flex flex-col justify-between",
                "bg-gradient-to-br from-red-500/10 to-red-700/20"
              )}>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Thermometer size={18} className="text-red-500 mr-2" />
                    <h4 className="font-medium">Hottest Place</h4>
                  </div>
                  <p className="text-2xl font-medium">42°C</p>
                </div>

                <div className="mt-4 text-sm">
                  <p className="font-medium">Dubai, UAE</p>
                  <p className="text-xs text-muted-foreground">2023-07-20</p>
                </div>
              </div>

              <div className={cn(
                "p-4 rounded-lg flex flex-col justify-between",
                "bg-gradient-to-br from-cyan-500/10 to-cyan-700/20"
              )}>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Thermometer size={18} className="text-cyan-500 mr-2" />
                    <h4 className="font-medium">Coldest Place</h4>
                  </div>
                  <p className="text-2xl font-medium">-12°C</p>
                </div>

                <div className="mt-4 text-sm">
                  <p className="font-medium">Reykjavik, Iceland</p>
                  <p className="text-xs text-muted-foreground">2022-12-05</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-2">
              Based from your home location: Jaipur, Rajasthan, India
            </p>
          </div>
          {/* more  */}
          <div className="mb-4"></div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <Globe className="w-5 h-5 text-primary mr-2" />
                  <span className="font-medium">Continents</span>
                </div>
                <div className="flex items-end">
                  <span className="text-2xl font-medium">5</span>
                  <span className="text-xs text-muted-foreground ml-2 mb-1">/7</span>
                </div>
                <div className="mt-2">
                  <Progress value={(5 / 7) * 100} indicatorClassName="bg-indigo-500" />
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <MapPin className="w-5 h-5 text-primary mr-2" />
                  <span className="font-medium">Countries</span>
                </div>
                <div className="flex items-end">
                  <span className="text-2xl font-medium">12</span>
                  <span className="text-xs text-muted-foreground ml-2 mb-1">/195</span>
                </div>
                <div className="mt-2">
                  <Progress value={(12 / 195) * 100} indicatorClassName="bg-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Navigation className="w-5 h-5 text-primary mr-2" />
                  <span className="font-medium">Times Around The World</span>
                </div>
                <span className="text-sm">0.31x</span>
              </div>

              <Slider
                value={[0.31 * 100]}
                max={1}
                step={0.01}
                disabled
                className="my-1"
              />

              <p className="text-xs text-muted-foreground mt-2">
                Earth's circumference is 40,075 km (24,901 miles)
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="adventures" className="p-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Record of your most thrilling adventures and extreme activities around the world.
            </p>

            {adventures && adventures.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {adventures.map((adventure) => (
                  <motion.div
                    key={adventure.id}
                    className={cn(
                      "rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300",
                      "bg-gradient-to-br from-background/80 to-background"
                    )}
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={cn(
                      "p-4 border-l-4",
                      adventure.icon === 'rocket' ? "border-purple-500" :
                        adventure.icon === 'parachute' ? "border-blue-500" :
                          adventure.icon === 'mountain' ? "border-emerald-500" :
                            adventure.icon === 'anchor' ? "border-cyan-500" :
                              adventure.icon === 'wave' ? "border-blue-500" : "border-amber-500"
                    )}>
                      <div className="flex items-start space-x-4">
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                          adventure.icon === 'rocket' ? "bg-purple-100 text-purple-500" :
                            adventure.icon === 'parachute' ? "bg-blue-100 text-blue-500" :
                              adventure.icon === 'mountain' ? "bg-emerald-100 text-emerald-500" :
                                adventure.icon === 'anchor' ? "bg-cyan-100 text-cyan-500" :
                                  adventure.icon === 'wave' ? "bg-blue-100 text-blue-500" : "bg-amber-100 text-amber-500"
                        )}>
                          {getAdventureIcon(adventure.icon)}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-lg">{adventure.type}</h4>
                            <div className={cn(
                              "rounded-full px-3 py-1 text-xs font-medium",
                              adventure.icon === 'rocket' ? "bg-purple-100 text-purple-700" :
                                adventure.icon === 'parachute' ? "bg-blue-100 text-blue-700" :
                                  adventure.icon === 'mountain' ? "bg-emerald-100 text-emerald-700" :
                                    adventure.icon === 'anchor' ? "bg-cyan-100 text-cyan-700" :
                                      adventure.icon === 'wave' ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                            )}>
                              {adventure.icon === 'rocket' ? "Thrill" :
                                adventure.icon === 'parachute' ? "Extreme" :
                                  adventure.icon === 'mountain' ? "Expedition" :
                                    adventure.icon === 'anchor' ? "Underwater" :
                                      adventure.icon === 'wave' ? "Water" : "Adventure"}
                            </div>
                          </div>

                          <div className="flex items-center mt-2 text-sm text-muted-foreground">
                            <MapPin size={14} className="mr-1" />
                            <span>{adventure.location}</span>
                            <span className="mx-2">•</span>
                            <Calendar size={14} className="mr-1" />
                            <span>{adventure.date}</span>
                          </div>

                          <p className="mt-3 text-sm">{adventure.description}</p>

                          <div className="mt-4 grid grid-cols-2 gap-3">
                            {adventure.height && (
                              <div className="bg-muted/30 rounded-md p-2 flex items-center">
                                <Mountain size={14} className="mr-2 text-muted-foreground" />
                                <div>
                                  <div className="text-xs text-muted-foreground">Height</div>
                                  <div className="text-sm font-medium">{adventure.height}</div>
                                </div>
                              </div>
                            )}

                            {adventure.distance && (
                              <div className="bg-muted/30 rounded-md p-2 flex items-center">
                                <Compass size={14} className="mr-2 text-muted-foreground" />
                                <div>
                                  <div className="text-xs text-muted-foreground">Distance</div>
                                  <div className="text-sm font-medium">{adventure.distance}</div>
                                </div>
                              </div>
                            )}

                            {adventure.depth && (
                              <div className="bg-muted/30 rounded-md p-2 flex items-center">
                                <Anchor size={14} className="mr-2 text-muted-foreground" />
                                <div>
                                  <div className="text-xs text-muted-foreground">Depth</div>
                                  <div className="text-sm font-medium">{adventure.depth}</div>
                                </div>
                              </div>
                            )}

                            {adventure.grade && (
                              <div className="bg-muted/30 rounded-md p-2 flex items-center">
                                <Award size={14} className="mr-2 text-muted-foreground" />
                                <div>
                                  <div className="text-xs text-muted-foreground">Grade</div>
                                  <div className="text-sm font-medium">{adventure.grade}</div>
                                </div>
                              </div>
                            )}

                            {adventure.duration && (
                              <div className="bg-muted/30 rounded-md p-2 flex items-center">
                                <Calendar size={14} className="mr-2 text-muted-foreground" />
                                <div>
                                  <div className="text-xs text-muted-foreground">Duration</div>
                                  <div className="text-sm font-medium">{adventure.duration}</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 border border-dashed rounded-lg">
                <Rocket className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                <h4 className="font-medium mb-2">No adventures recorded yet</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Add your extreme adventures like bungee jumping, skydiving, or deep sea diving.
                </p>
              </div>
            )}

            <Button variant="outline" className="w-full mt-4">
              <Rocket size={16} className="mr-2" />
              Add New Adventure
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* share option */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <div className="bg-gradient-to-br from-white-50 to-cyan-50 rounded-xl p-4 border border-blue-100/50 shadow-sm flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            🌍 Share your travel achievements with friends and inspire them to explore the world! ✈️
          </p>
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
            onClick={handleShare}
          >
            <Share2 size={16} />
            <span>Share Stats</span>
          </Button>
        </div>
      </motion.div>

    </Card>
  );
}