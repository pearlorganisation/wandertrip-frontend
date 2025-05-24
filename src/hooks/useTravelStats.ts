import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// Enhanced mock stats with premium data
const defaultStats = {
  tripsCompleted: 12,
  countriesVisited: 18,
  citiesExplored: 32,
  totalDistance: 68720,
  travelPoints: 3840,
  travelRank: "Platinum Explorer",
  landmarks: 43,
  continents: 5,
  milesTraveled: 42700,
  carbonOffset: 2.8, // tons of CO2
  nightsStayed: 87,
  photosUploaded: 324,
  travelStyle: "Explorer",
  premiumStatus: true,
  lastLogin: "2023-12-28",
  memberSince: "2020-03-15",
  worldPercentTraveled: 7.2, // % of the world traveled
  highestAltitude: {
    value: 3812,
    location: "Mount Fuji Base Camp, Japan",
    date: "2022-08-15"
  },
  mostDistantFromHome: {
    value: 15420,
    location: "Sydney, Australia",
    date: "2023-05-10" 
  },
  hottestPlace: {
    value: 42, // °C
    location: "Dubai, UAE",
    date: "2023-07-20"
  },
  coldestPlace: {
    value: -12, // °C
    location: "Reykjavik, Iceland", 
    date: "2022-12-05"
  },
  worldCircumference: 0.31, // times traveled around the world
  homeLocation: "Jaipur, Rajasthan, India",
  achievements: [
    { id: 1, name: "First Trip", icon: "🚀", completed: true, date: "2020-04-10", points: 100 },
    { id: 2, name: "Island Adventurer", icon: "🏝️", completed: true, date: "2020-08-22", points: 250 },
    { id: 3, name: "Mountain Climber", icon: "🏔️", completed: true, date: "2021-07-10", points: 350 },
    { id: 4, name: "City Explorer", icon: "🏙️", completed: true, date: "2022-02-15", points: 300 },
    { id: 5, name: "Heritage Seeker", icon: "🏛️", completed: false, progress: 75, points: 400 },
    { id: 6, name: "Wildlife Spotter", icon: "🦁", completed: false, progress: 40, points: 300 }
  ],
  recentActivity: [
    { id: 1, type: "trip", description: "Completed trip to Bali", date: "2023-12-10", icon: "✈️" },
    { id: 2, type: "achievement", description: "Unlocked 'Beach Lover' badge", date: "2023-12-08", icon: "🏅" },
    { id: 3, type: "reward", description: "Redeemed Airport Lounge access", date: "2023-11-28", icon: "🎁" },
    { id: 4, type: "milestone", description: "Reached 10 countries visited", date: "2023-10-15", icon: "🏆" },
    { id: 5, type: "booking", description: "Confirmed reservation at Grand Hyatt Tokyo", date: "2023-10-02", icon: "🏨" }
  ],
  yearlyStats: [
    { year: 2020, trips: 2, countries: 3, distance: 8500 },
    { year: 2021, trips: 3, countries: 4, distance: 12300 },
    { year: 2022, trips: 4, countries: 5, distance: 18600 },
    { year: 2023, trips: 3, countries: 6, distance: 29320 }
  ],
  travelGoals: [
    { id: 1, name: "Visit 25 countries", current: 18, target: 25, icon: "🌎" },
    { id: 2, name: "Experience all continents", current: 5, target: 7, icon: "🧭" },
    { id: 3, name: "Try 50 local cuisines", current: 38, target: 50, icon: "🍲" }
  ],
  adventures: [
    { 
      id: 1, 
      type: "Bungee Jumping", 
      location: "Queenstown, New Zealand", 
      height: "134m",
      date: "2022-09-18",
      description: "Nevis Bungy - the highest bungee jump in New Zealand",
      icon: "rocket"
    },
    { 
      id: 2, 
      type: "Skydiving", 
      location: "Interlaken, Switzerland", 
      height: "4,000m",
      date: "2023-02-27",
      description: "Tandem skydive over the Swiss Alps",
      icon: "parachute"
    },
    { 
      id: 3, 
      type: "Trekking", 
      location: "Everest Base Camp, Nepal", 
      distance: "130km",
      date: "2022-04-15",
      duration: "12 days",
      description: "Trek to Everest Base Camp at 5,364m altitude",
      icon: "mountain"
    },
    { 
      id: 4, 
      type: "Scuba Diving", 
      location: "Great Barrier Reef, Australia", 
      depth: "30m",
      date: "2023-11-08",
      description: "Explored the vibrant coral reefs and marine life",
      icon: "anchor"
    },
    { 
      id: 5, 
      type: "White Water Rafting", 
      location: "Zambezi River, Zimbabwe", 
      grade: "Class V",
      date: "2021-08-22",
      description: "Navigated the wild rapids below Victoria Falls",
      icon: "wave"
    }
  ]
};

export function useTravelStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState(defaultStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [travelBadges, setTravelBadges] = useState<any[]>([]);
  const [favoriteDestinations, setFavoriteDestinations] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStats() {
      if (!user) {
        setStats(defaultStats);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // For demo purpose, we're using enhanced static data
        setStats(defaultStats);
        
        // Simulate fetching badges with premium features
        setTravelBadges([
          { name: "Globetrotter", icon: "🌍", level: 3, description: "Visited 15+ countries", exclusive: true },
          { name: "Culture Explorer", icon: "🏛️", level: 2, description: "Visited 10+ historical sites", exclusive: false },
          { name: "Mountain Climber", icon: "🏔️", level: 3, description: "Completed 5+ hiking trips", exclusive: false },
          { name: "Beach Lover", icon: "🏝️", level: 3, description: "Visited 8+ beach destinations", exclusive: false },
          { name: "Urban Discoverer", icon: "🏙️", level: 2, description: "Explored 20+ major cities", exclusive: true },
          { name: "Gastronomic Adventurer", icon: "🍽️", level: 1, description: "Tried 30+ local cuisines", exclusive: false }
        ]);
        
        // Simulate fetching favorite destinations
        setFavoriteDestinations([
          { id: 1, name: "Kyoto", country: "Japan", visitCount: 3, lastVisit: "2023-10" },
          { id: 2, name: "Paris", country: "France", visitCount: 2, lastVisit: "2022-06" },
          { id: 3, name: "Bali", country: "Indonesia", visitCount: 2, lastVisit: "2023-12" },
        ]);
      } catch (err: any) {
        console.error('Error fetching travel stats:', err);
        setError("Could not load travel statistics");
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, [user]);

  // Calculate next level threshold
  const calculateNextLevel = () => {
    const currentLevel = Math.floor(stats.travelPoints / 1000) + 1;
    const nextLevelPoints = currentLevel * 1000;
    const pointsNeeded = nextLevelPoints - stats.travelPoints;
    
    return {
      currentLevel,
      nextLevelPoints,
      pointsNeeded,
      progress: (stats.travelPoints / nextLevelPoints) * 100
    };
  };

  // Get upcoming achievement
  const getUpcomingAchievement = () => {
    const incomplete = stats.achievements.find(a => !a.completed);
    return incomplete || null;
  };
  
  // Get user's travel milestones for this year
  const getTravelMilestones = () => {
    const currentYear = new Date().getFullYear();
    const yearStats = stats.yearlyStats.find(ys => ys.year === currentYear) || { trips: 0, countries: 0, distance: 0 };
    
    return {
      tripsThisYear: yearStats.trips,
      newCountriesThisYear: yearStats.countries,
      distanceThisYear: yearStats.distance
    };
  };
  
  // Calculate user's travel profile based on stats
  const getTravelProfile = () => {
    if (stats.countriesVisited > 15) return "Global Explorer";
    if (stats.citiesExplored > 25) return "Urban Discoverer";
    if (stats.landmarks > 30) return "Cultural Enthusiast";
    return "Adventure Seeker";
  };

  // Generate a shareable stats summary
  const generateShareableSummary = () => {
    // Get a username from user data, falling back to a default if needed
    // Fix: Check for user_metadata?.full_name instead of displayName
    const username = user?.user_metadata?.full_name || "Travel Enthusiast";
    
    return {
      name: username,
      stats: {
        countries: stats.countriesVisited,
        cities: stats.citiesExplored,
        continents: stats.continents,
        distance: stats.totalDistance,
        worldPercentage: stats.worldPercentTraveled,
        worldCircumference: stats.worldCircumference,
        highestAltitude: stats.highestAltitude,
        hottestPlace: stats.hottestPlace,
        coldestPlace: stats.coldestPlace,
        mostDistant: stats.mostDistantFromHome,
        travelRank: stats.travelRank,
        travelStyle: getTravelProfile(),
      },
      achievements: stats.achievements.filter(a => a.completed).length,
      travelGoals: stats.travelGoals.map(goal => ({
        name: goal.name,
        progress: Math.round((goal.current / goal.target) * 100)
      }))
    };
  };

  // Get top adventures by type
  const getTopAdventureByType = (type: string) => {
    return stats.adventures.find(adv => adv.type === type) || null;
  };

  return { 
    stats, 
    isLoading, 
    error,
    travelBadges,
    favoriteDestinations,
    levelInfo: calculateNextLevel(),
    upcomingAchievement: getUpcomingAchievement(),
    recentActivity: stats.recentActivity,
    travelMilestones: getTravelMilestones(),
    travelProfile: getTravelProfile(),
    travelGoals: stats.travelGoals,
    adventures: stats.adventures,
    getTopAdventureByType,
    generateShareableSummary
  };
}
