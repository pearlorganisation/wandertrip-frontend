import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MobileAppHeader } from '@/components/MobileAppHeader';
import { Calendar, MapPin, Clock, Edit, Plus, Trash2, Share2, Download, Send, Star, ArrowRight, Plane, Sparkles, Filter, Search, Heart, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { SwipeableCard } from '@/components/SwipeableCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppBottomSheet } from '@/components/AppBottomSheet';
import { ItineraryTabs } from '@/components/itinerary/ItineraryTabs';
import { ItineraryDaySelector } from '@/components/itinerary/ItineraryDaySelector';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import FlightTracker from '@/components/on-trip/FlightTracker';
import { MobileAppNavBar } from '@/components/MobileAppNavBar';
import { DaySchedule } from '@/components/itinerary/DaySchedule';

const ItineraryPage = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [showFlightTracker, setShowFlightTracker] = useState(false);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [showPackingList, setShowPackingList] = useState(false);
  const [activityFilter, setActivityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [showTripSelector, setShowTripSelector] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);  // Added missing state
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const activitiesSectionRef = useRef(null);
  
  const handleShareItinerary = () => {
    toast.success("Itinerary shared!", {
      description: "A link has been copied to your clipboard"
    });
  };
  
  const handleSaveChanges = () => {
    setEditMode(false);
    toast.success("Changes saved successfully!");
  };
  
  const handleAddActivity = () => {
    toast.success("New activity added!");
  };
  
  const handleEmergencyAssistance = () => {
    navigate('/emergency-assistance');
  };

  useEffect(() => {
    if (activitiesSectionRef.current && !isMobile) {
      activitiesSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeDay, isMobile]);

  const upcomingFlight = {
    flightNumber: "UA1234",
    airline: "United Airlines",
    departureAirport: "JFK",
    departureCity: "New York",
    departureTime: "08:30",
    departureDate: "2025-05-15",
    arrivalAirport: "LAX",
    arrivalCity: "Los Angeles",
    arrivalTime: "11:45",
    arrivalDate: "2025-05-15",
    status: "on-time"
  };

  const days = [
    { day: 1, title: "Sacred Monkey Forest" },
    { day: 2, title: "Rice Terraces" },
    { day: 3, title: "Beach Day" },
    { day: 4, title: "Mount Batur Sunrise" },
    { day: 5, title: "Ubud Art Markets" },
    { day: 6, title: "Temple Tour" },
    { day: 7, title: "Departure Day" }
  ];
  
  const activities = [
    {
      time: "7:00 AM",
      title: "Morning Yoga Session",
      location: "Yoga Barn, Ubud",
      description: "Start your day with a rejuvenating yoga session overlooking the rice fields.",
      booked: true,
      category: "wellness"
    },
    {
      time: "9:30 AM",
      title: "Tegalalang Rice Terraces",
      location: "Tegalalang, Ubud",
      description: "Explore the stunning Tegalalang Rice Terraces, one of Bali's most famous attractions.",
      booked: false,
      category: "sightseeing"
    },
    {
      time: "12:30 PM",
      title: "Lunch at Kepitu Restaurant",
      location: "Kepitu at Kayon Resort",
      description: "Enjoy authentic Balinese cuisine with a stunning jungle view.",
      booked: true,
      category: "food"
    },
    {
      time: "2:00 PM",
      title: "Sacred Monkey Forest Sanctuary",
      location: "Monkey Forest Street, Ubud",
      description: "Visit this natural reserve and temple complex with over 700 monkeys. Walk through ancient temples and lush jungle.",
      booked: false,
      category: "adventure"
    }
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = activityFilter === 'all' || activity.category === activityFilter;
    const matchesSearch = searchTerm === '' || 
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const userTrips = [
    { 
      id: 'trip-1',
      title: 'Bali Adventure', 
      dateRange: 'June 15 - 22, 2024',
      destination: 'Bali, Indonesia', 
      status: 'active',
      image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18'
    },
    { 
      id: 'trip-2',
      title: 'Tokyo Exploration', 
      dateRange: 'August 5 - 15, 2024',
      destination: 'Tokyo, Japan', 
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'
    },
    { 
      id: 'trip-3',
      title: 'Paris Getaway', 
      dateRange: 'October 10 - 17, 2024',
      destination: 'Paris, France', 
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'
    },
    { 
      id: 'trip-4',
      title: 'Italy Road Trip', 
      dateRange: 'September 1 - 14, 2024',
      destination: 'Rome to Venice, Italy', 
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52'
    }
  ];
  
  // Dummy data for current day activities
  const currentDayData = {
    day: activeDay,
    title: days.find(d => d.day === activeDay)?.title || "",
    image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18",
    activities: [
      {
        id: "act-1",
        time: "7:00 AM",
        title: "Morning Yoga Session",
        description: "Start your day with a rejuvenating yoga session overlooking the rice fields.",
        icon: <Clock size={16} className="text-primary" />,
        location: "Yoga Barn, Ubud",
        price: 15,
        isPaid: true,
        isBooked: true
      },
      {
        id: "act-2",
        time: "9:30 AM",
        title: "Tegalalang Rice Terraces",
        description: "Explore the stunning Tegalalang Rice Terraces, one of Bali's most famous attractions.",
        icon: <MapPin size={16} className="text-primary" />,
        location: "Tegalalang, Ubud"
      },
      {
        id: "act-3",
        time: "12:30 PM",
        title: "Lunch at Kepitu Restaurant",
        description: "Enjoy authentic Balinese cuisine with a stunning jungle view.",
        icon: <MapPin size={16} className="text-primary" />,
        location: "Kepitu at Kayon Resort",
        price: 25,
        isPaid: true,
        isBooked: true
      }
    ]
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {!isMobile && <Navbar />}
      
      {isMobile && (
        <MobileAppHeader
          title="Your Itineraries"
          subtitle="Manage your travel plans"
          actions={[
            {
              label: "Share",
              onClick: handleShareItinerary
            },
            {
              label: "Download",
              onClick: () => toast.success("Itinerary downloaded!")
            }
          ]}
          bgColor="bg-primary/5"
        />
      )}
      
      <main className={`flex-grow ${isMobile ? 'pt-0 pb-20' : 'pt-24'} pb-16`}>
        {!isMobile && (
          <section className="py-8 bg-muted/30">
            <div className="container px-4 sm:px-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-medium mb-2">Bali Adventure</h1>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active Trip</Badge>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar size={16} className="mr-1" />
                      June 15 - 22, 2024
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin size={16} className="mr-1" />
                      Bali, Indonesia
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center ${
                      editMode 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <Edit size={16} className="mr-1.5" />
                    {editMode ? "Editing" : "Edit Itinerary"}
                  </button>
                  
                  <button
                    onClick={handleShareItinerary}
                    className="px-3 py-2 text-sm font-medium bg-muted rounded-lg flex items-center"
                  >
                    <Share2 size={16} className="mr-1.5" />
                    Share
                  </button>
                  
                  <button
                    className="px-3 py-2 text-sm font-medium bg-muted rounded-lg flex items-center"
                  >
                    <Download size={16} className="mr-1.5" />
                    Download
                  </button>
                </div>
              </div>
              
              <ItineraryDaySelector 
                days={days} 
                activeDay={activeDay} 
                setActiveDay={setActiveDay} 
              />
            </div>
          </section>
        )}
        
        {isMobile && (
          <>
            <div className="bg-primary/5 border-y border-primary/10 py-3 mb-4">
              <div className="px-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Plane size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Upcoming Flight</h3>
                      <div className="flex items-center text-sm">
                        <span>{upcomingFlight.departureDate} • {upcomingFlight.airline} {upcomingFlight.flightNumber}</span>
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">On Time</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <AppBottomSheet
                      trigger={
                        <button 
                          className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs"
                        >
                          View Details
                        </button>
                      }
                      title="Flight Tracker"
                    >
                      <FlightTracker />
                    </AppBottomSheet>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 mb-6">
              <Button 
                onClick={() => setShowTripSelector(true)} 
                className="w-full flex items-center justify-between mb-3 card-hover"
                variant="outline"
              >
                <span>Bali Adventure</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Active Trip</span>
              </Button>
              
              <AppBottomSheet
                isOpen={showTripSelector}
                onOpenChange={setShowTripSelector}
                trigger={<div className="hidden"></div>}
                title="Your Trips"
              >
                <div className="space-y-3">
                  {userTrips.map(trip => (
                    <Card 
                      key={trip.id} 
                      className={`overflow-hidden card-hover ${trip.status === 'active' ? 'border-primary/40' : ''}`}
                      onClick={() => {
                        toast.success(`Switched to ${trip.title}`);
                        setShowTripSelector(false);
                      }}
                    >
                      <div className="flex h-24">
                        <div 
                          className="w-1/3 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${trip.image})` }}
                        />
                        <div className="w-2/3 p-3">
                          <div className="flex items-start justify-between">
                            <h3 className="font-medium text-sm">{trip.title}</h3>
                            <Badge className={`
                              ${trip.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                              } capitalize text-xs
                            `}>
                              {trip.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            <div className="flex items-center">
                              <Calendar size={10} className="mr-1" />
                              {trip.dateRange}
                            </div>
                            <div className="flex items-center mt-1">
                              <MapPin size={10} className="mr-1" />
                              {trip.destination}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => navigate('/trip-planner')}
                  >
                    <Plus size={16} className="mr-1" />
                    Plan a New Trip
                  </Button>
                </div>
              </AppBottomSheet>
            </div>

            <div className="px-4 mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Today's Schedule</h2>
              <Button variant="ghost" size="sm" onClick={() => setEditMode(!editMode)}>
                {editMode ? "Done" : <Edit size={16} />}
              </Button>
            </div>
            
            <ItineraryDaySelector 
              days={days} 
              activeDay={activeDay} 
              setActiveDay={setActiveDay} 
            />
          </>
        )}
        
        {!isMobile && (
          <ItineraryTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showPackingList={showPackingList}
            setShowPackingList={setShowPackingList}
            onEmergencyAssistance={handleEmergencyAssistance}
          />
        )}
        
        <section className={`py-${isMobile ? '0' : '8'}`} ref={activitiesSectionRef}>
          <div className={`${isMobile ? 'px-4' : 'container px-4 sm:px-6'}`}>
            {isMobile ? (
              <DaySchedule 
                day={currentDayData}
                showEmergencyContacts={showEmergencyContacts}
                setShowEmergencyContacts={setShowEmergencyContacts}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                  {!isMobile && (
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <div className="flex gap-2">
                        <Tabs defaultValue={activityFilter} onValueChange={setActivityFilter} className="w-fit">
                          <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="sightseeing">Sightseeing</TabsTrigger>
                            <TabsTrigger value="food">Food</TabsTrigger>
                            <TabsTrigger value="wellness">Wellness</TabsTrigger>
                            <TabsTrigger value="adventure">Adventure</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                      
                      <div className="relative w-full max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search activities..."
                          className="w-full pl-9"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  
                  <DaySchedule 
                    day={currentDayData}
                    showEmergencyContacts={showEmergencyContacts}
                    setShowEmergencyContacts={setShowEmergencyContacts}
                  />
                </div>
                
                <div className="lg:col-span-4 space-y-6">
                  {!isMobile && !showFlightTracker ? (
                    <Card className="mb-6 border border-border/40 shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Upcoming Flight</CardTitle>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">On Time</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-3">
                          <div className="text-sm font-medium">{upcomingFlight.airline} {upcomingFlight.flightNumber}</div>
                          <div className="text-xs text-muted-foreground">{upcomingFlight.departureDate}</div>
                        </div>
                        
                        <div className="flex items-center mt-3">
                          <div className="text-center mr-3">
                            <div className="text-sm font-semibold">{upcomingFlight.departureTime}</div>
                            <div className="text-xs text-muted-foreground">{upcomingFlight.departureAirport}</div>
                          </div>
                          
                          <div className="flex-1 px-3">
                            <div className="relative">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-muted"></div>
                              </div>
                              <div className="relative flex justify-center">
                                <div className="bg-card px-1">
                                  <Plane size={16} className="text-muted-foreground transform rotate-90" />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-center ml-3">
                            <div className="text-sm font-semibold">{upcomingFlight.arrivalTime}</div>
                            <div className="text-xs text-muted-foreground">{upcomingFlight.arrivalAirport}</div>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => setShowFlightTracker(true)}
                          className="w-full mt-4 text-xs bg-primary text-primary-foreground px-2 py-1.5 rounded-lg"
                        >
                          View Flight Tracker
                        </button>
                      </CardContent>
                    </Card>
                  ) : !isMobile && showFlightTracker ? (
                    <div className="glass rounded-xl p-5 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Flight Tracker</h3>
                        <button 
                          onClick={() => setShowFlightTracker(false)}
                          className="text-xs text-primary"
                        >
                          Hide
                        </button>
                      </div>
                      <FlightTracker />
                    </div>
                  ) : null}
                  
                  <div className={`${isMobile ? '' : 'glass rounded-xl overflow-hidden hover:shadow-md transition-shadow'}`}>
                    {!isMobile && (
                      <img 
                        src="https://images.unsplash.com/photo-1512100356356-de1b84283e18" 
                        alt="Tegalalang Rice Terraces" 
                        className="w-full h-48 object-cover"
                      />
                    )}
                    
                    <div className={isMobile ? "bg-background rounded-xl border border-border/60 shadow-sm p-4 mb-4" : "p-5"}>
                      <h3 className="font-medium mb-2">Weather Forecast</h3>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-1">🌤️</span>
                          <div>
                            <p className="text-sm font-medium">Partly Cloudy</p>
                            <p className="text-xs text-muted-foreground">June 16, 2024</p>
                          </div>
                        </div>
                        <p className="text-xl font-medium">29°C</p>
                      </div>
                      
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="text-center">
                          <p>Morning</p>
                          <p className="font-medium">24°C</p>
                        </div>
                        <div className="text-center">
                          <p>Afternoon</p>
                          <p className="font-medium">29°C</p>
                        </div>
                        <div className="text-center">
                          <p>Evening</p>
                          <p className="font-medium">26°C</p>
                        </div>
                        <div className="text-center">
                          <p>Night</p>
                          <p className="font-medium">23°C</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={isMobile ? "bg-background rounded-xl border border-border/60 shadow-sm p-4 mb-4" : "glass rounded-xl p-5"}>
                    <h3 className="font-medium mb-3">Transportation</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/50 rounded-lg flex items-start hover:bg-muted/60 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-primary text-lg">🚗</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Private Driver</p>
                          <p className="text-xs text-muted-foreground mb-2">Booked for full day, 8:00 AM - 6:00 PM</p>
                          <button className="text-xs text-primary">Contact Driver</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {isMobile ? (
                    <AppBottomSheet
                      trigger={
                        <button className="fixed bottom-20 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
                          <Plus size={24} />
                        </button>
                      }
                      title="Trip Actions"
                    >
                      <div className="grid grid-cols-3 gap-3 pt-2">
                        <div className="flex flex-col items-center justify-center p-3 bg-muted/20 rounded-lg" onClick={() => setShowRecommendations(true)}>
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <Plus size={20} className="text-primary" />
                          </div>
                          <span className="text-xs text-center">Add Activity</span>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center p-3 bg-muted/20 rounded-lg" onClick={() => navigate('/booking')}>
                          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                            <Calendar size={20} className="text-amber-600" />
                          </div>
                          <span className="text-xs text-center">Book Activity</span>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center p-3 bg-muted/20 rounded-lg" onClick={() => navigate('/on-trip-assistance')}>
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                            <MapPin size={20} className="text-blue-600" />
                          </div>
                          <span className="text-xs text-center">Local Guide</span>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center p-3 bg-muted/20 rounded-lg" onClick={() => setShowEmergencyContacts(true)}>
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                            <span className="text-red-600 font-bold">!</span>
                          </div>
                          <span className="text-xs text-center">Emergency</span>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center p-3 bg-muted/20 rounded-lg" onClick={() => setEditMode(!editMode)}>
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                            <Edit size={20} className="text-green-600" />
                          </div>
                          <span className="text-xs text-center">Edit Trip</span>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center p-3 bg-muted/20 rounded-lg" onClick={() => handleShareItinerary()}>
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                            <Share2 size={20} className="text-purple-600" />
                          </div>
                          <span className="text-xs text-center">Share Trip</span>
                        </div>
                      </div>
                    </AppBottomSheet>
                  ) : (
                    <>
                      <div className="glass rounded-xl p-5">
                        <h3 className="font-medium mb-3">Nearby Recommendations</h3>
                        <div className="space-y-3">
                          {[
                            {
                              name: "Goa Gajah Temple",
                              type: "Cultural Site",
                              distance: "15 min drive"
                            },
                            {
                              name: "Ubud Art Market",
                              type: "Shopping",
                              distance: "10 min drive"
                            },
                            {
                              name: "Campuhan Ridge Walk",
                              type: "Nature Trail",
                              distance: "20 min drive"
                            }
                          ].map((place, index) => (
                            <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/30 rounded-lg transition-colors">
                              <div>
                                <p className="text-sm font-medium">{place.name}</p>
                                <p className="text-xs text-muted-foreground">{place.type} • {place.distance}</p>
                              </div>
                              <Button size="sm" variant="outline" className="h-8">
                                <Plus size={14} className="mr-1" />
                                Add
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-primary/10 rounded-xl p-5">
                        <div className="flex items-center mb-3">
                          <Sparkles size={18} className="text-primary mr-2" />
                          <h3 className="font-medium">Trip Add-ons</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-background/80 p-3 rounded-lg hover:bg-background/90 transition-colors">
                            <p className="text-sm font-medium">Balinese Cooking Class</p>
                            <p className="text-xs text-muted-foreground mb-2">Learn to make authentic local dishes</p>
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">$45 per person</p>
                              <Button size="sm" className="h-8">
                                Add
                              </Button>
                            </div>
                          </div>
                          <div className="bg-background/80 p-3 rounded-lg hover:bg-background/90 transition-colors">
                            <p className="text-sm font-medium">Spa & Massage Package</p>
                            <p className="text-xs text-muted-foreground mb-2">Traditional Balinese massage techniques</p>
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">$60 per person</p>
                              <Button size="sm" className="h-8">
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Link to="/booking" className="w-full block">
                        <motion.button
                          className="w-full flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground bg-primary rounded-xl transition-colors hover:bg-primary/90"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="mr-2">Book Missing Activities</span>
                          <ArrowRight size={16} />
                        </motion.button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      
      {!isMobile && <Footer />}
      
      {isMobile && <MobileAppNavBar />}
    </div>
  );
};

export default ItineraryPage;
