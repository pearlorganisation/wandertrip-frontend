
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { ItineraryHeader } from '@/components/itinerary/ItineraryHeader';
import { ItineraryTabs } from '@/components/itinerary/ItineraryTabs';
import { ItineraryDaySelector } from '@/components/itinerary/ItineraryDaySelector';
import { DaySchedule } from '@/components/itinerary/DaySchedule';
import { PremiumAddons } from '@/components/itinerary/PremiumAddons';
import { TravelTips } from '@/components/itinerary/TravelTips';
import { EmergencyContacts } from '@/components/itinerary/EmergencyContacts';
import { CollaboratorsList } from '@/components/itinerary/CollaboratorsList';
import PackingListGenerator from '@/components/PackingListGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Sunrise, Camera, Utensils, Clock, Bike, Sunset, Coffee, Users, Plane } from 'lucide-react';
import FlightTracker from '@/components/on-trip/FlightTracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Toaster } from "@/components/ui/toaster";

// Mock data - would normally be fetched from an API
const mockItinerary = {
  id: 'bali-adventure-123',
  title: 'Bali Adventure',
  subtitle: '7 days of cultural immersion & natural beauty',
  destination: 'Bali, Indonesia',
  duration: '7 days',
  travelers: '2 adults',
  style: 'Adventure',
  coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
  days: [
    {
      day: 1,
      title: 'Arrival & Ubud Exploration',
      image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18',
      activities: [
        {
          id: 'act-1-1',
          time: '12:00 PM',
          title: 'Check-in to Villa in Ubud',
          description: 'Arrive at your private villa nestled among the rice terraces of Ubud. Take time to relax and refresh.',
          icon: <MapPin size={16} className="text-primary" />
        },
        {
          id: 'act-1-2',
          time: '2:30 PM',
          title: 'Sacred Monkey Forest Sanctuary',
          description: 'Visit this natural reserve and temple complex with over 700 monkeys. Walk through ancient temples and lush jungle.',
          icon: <Bike size={16} className="text-primary" />
        },
        {
          id: 'act-1-3',
          time: '6:00 PM',
          title: 'Traditional Balinese Welcome Dinner',
          description: 'Enjoy authentic Balinese cuisine at a local warung with traditional dance performance.',
          icon: <Utensils size={16} className="text-primary" />
        }
      ]
    },
    {
      day: 2,
      title: 'Temples & Rice Terraces',
      image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18',
      activities: [
        {
          id: 'act-2-1',
          time: '7:00 AM',
          title: 'Morning Yoga Session',
          description: 'Start your day with a rejuvenating yoga session overlooking the rice fields.',
          icon: <Sunrise size={16} className="text-primary" />
        },
        {
          id: 'act-2-2',
          time: '9:30 AM',
          title: 'Tegalalang Rice Terraces',
          description: "Explore the stunning Tegalalang Rice Terraces, one of Bali's most famous attractions.",
          icon: <Camera size={16} className="text-primary" />
        },
        {
          id: 'act-2-3',
          time: '2:00 PM',
          title: 'Tirta Empul Temple',
          description: 'Visit this sacred water temple with natural springs where locals perform purification rituals.',
          icon: <MapPin size={16} className="text-primary" />
        }
      ]
    },
    {
      day: 3,
      title: 'Mount Batur Sunrise Trek',
      image: 'https://images.unsplash.com/photo-1531778272849-d1dd22444c06',
      activities: [
        {
          id: 'act-3-1',
          time: '2:30 AM',
          title: 'Departure for Mount Batur',
          description: 'Early morning pickup from your villa for the drive to the base of Mount Batur.',
          icon: <Clock size={16} className="text-primary" />
        },
        {
          id: 'act-3-2',
          time: '4:00 AM',
          title: 'Begin Trek to Summit',
          description: 'Start your guided 2-hour trek to the summit (1,717m) to catch the sunrise.',
          icon: <Bike size={16} className="text-primary" />
        },
        {
          id: 'act-3-3',
          time: '6:15 AM',
          title: 'Sunrise Breakfast',
          description: 'Enjoy breakfast at the summit while watching the sun rise over Mount Agung and Lake Batur.',
          icon: <Coffee size={16} className="text-primary" />
        },
        {
          id: 'act-3-4',
          time: '2:00 PM',
          title: 'Afternoon Rest & Spa Treatment',
          description: 'Return to your villa for rest followed by a traditional Balinese massage.',
          icon: <Sunset size={16} className="text-primary" />
        }
      ]
    }
  ],
  premiumAddOns: [
    {
      id: 'addon-001',
      title: 'Private Beach Dinner',
      description: 'Romantic sunset dining experience on a secluded beach with personal chef and butler service.',
      price: '$120 per person',
      image: 'https://images.unsplash.com/photo-1602488283247-29bf1f5b148a'
    },
    {
      id: 'addon-002',
      title: 'Helicopter Island Tour',
      description: 'See the beauty of Bali from above with a private helicopter tour of the island and surrounding areas.',
      price: '$350 per person',
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b'
    },
    {
      id: 'addon-003',
      title: 'Professional Photography Session',
      description: 'Capture your Bali memories with a 2-hour session with a professional photographer at your favorite locations.',
      price: '$180 per session',
      image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0'
    }
  ],
  travelTips: [
    {
      title: 'Best Time to Visit',
      description: 'May to September for dry season with minimal rainfall.'
    },
    {
      title: 'Local Customs',
      description: 'When visiting temples, wear a sarong and sash (usually provided at entrance). Remove shoes before entering temples or homes.'
    },
    {
      title: 'Currency',
      description: 'Indonesian Rupiah (IDR) is the local currency. ATMs are widely available in tourist areas, but bring some cash for smaller vendors.'
    },
    {
      title: 'Transportation',
      description: 'Renting a scooter is popular but be cautious of traffic. Alternatively, hire a private driver for day trips (approximately $40-50/day).'
    }
  ],
  emergencyContacts: [
    {
      title: 'Tourist Police',
      contact: '+62 361 754 599'
    },
    {
      title: 'BIMC Hospital Kuta',
      contact: '+62 361 761 263'
    },
    {
      title: 'Bali International Hospital',
      contact: '+62 361 710 505'
    },
    {
      title: 'Tourist Information Center',
      contact: '+62 361 225 565'
    }
  ],
  flights: {
    departure: {
      flightNumber: "GA406",
      airline: "Garuda Indonesia",
      departureAirport: "JFK",
      departureCity: "New York",
      departureTime: "21:45",
      departureDate: "2024-06-12",
      arrivalAirport: "DPS",
      arrivalCity: "Denpasar",
      arrivalTime: "08:30",
      arrivalDate: "2024-06-14", 
      terminal: "4",
      gate: "B12",
      seatNumber: "14A",
      leaveHomeBy: "18:15",
      checkInBy: "19:15",
      boardingTime: "21:00",
      status: "on-time"
    },
    return: {
      flightNumber: "GA407",
      airline: "Garuda Indonesia",
      departureAirport: "DPS",
      departureCity: "Denpasar",
      departureTime: "14:30",
      departureDate: "2024-06-19",
      arrivalAirport: "JFK",
      arrivalCity: "New York",
      arrivalTime: "19:45",
      arrivalDate: "2024-06-20",
      terminal: "2",
      gate: "D8",
      seatNumber: "22C",
      leaveHomeBy: "11:00",
      checkInBy: "12:00",
      boardingTime: "13:45",
      status: "on-time"
    }
  }
};

const ItineraryDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [itinerary, setItinerary] = useState(mockItinerary);
  const [activeDay, setActiveDay] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showPackingList, setShowPackingList] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [managementTab, setManagementTab] = useState('details');
  const [showFlightDetails, setShowFlightDetails] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch itinerary data
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [id]);
  // Scroll to top on component mount
  useEffect(() => {
   window.scrollTo(0, 0); // Scroll to the top of the page
 }, []); // Empty dependency array ensures this runs only once on mount
  
  const handleEmergencyAssistance = () => {
    window.location.href = '/emergency-assistance';
  };

  const handleToggleFlightDetails = () => {
    setShowFlightDetails(!showFlightDetails);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${itinerary.title} - Detailed Trip Itinerary`}
        description={`${itinerary.subtitle} - Day by day travel plan for your ${itinerary.duration} trip to ${itinerary.destination}`}
        keywords={`${itinerary.destination}, trip planner, travel itinerary, ${itinerary.style} travel, vacation planner`}
        image={itinerary.coverImage}
      />
      
      <Navbar />
      <Toaster />
      
      <main className="flex-grow pt-24">
        {isLoading ? (
          <div className="container px-4 sm:px-6 py-12 flex justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <ItineraryHeader itinerary={itinerary} />

            {/* Flight Alert Banner */}
            {itinerary.flights && (
              <div className="bg-primary/5 border-y border-primary/10 py-3">
                <div className="container px-4 sm:px-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Plane size={18} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Upcoming Flight</h3>
                        <div className="flex items-center text-sm">
                          <span>{itinerary.flights.departure.departureDate} • {itinerary.flights.departure.airline} {itinerary.flights.departure.flightNumber}</span>
                          <Badge variant="ontime" className="ml-2">{itinerary.flights.departure.status === 'on-time' ? 'On Time' : 'Delayed'}</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button 
                        onClick={handleToggleFlightDetails} 
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
                      >
                        {showFlightDetails ? 'Hide Flight Details' : 'View Flight Details'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showFlightDetails && (
              <section className="py-6 bg-background">
                <div className="container px-4 sm:px-6">
                  <div className="mb-4">
                    <h2 className="text-2xl font-medium">Flight Tracker</h2>
                    <p className="text-muted-foreground">Monitor your flights and receive real-time updates</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                      <FlightTracker />
                    </div>
                    <div className="lg:col-span-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Travel Reminders</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                              <Clock size={16} className="text-blue-600" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Leave for Airport</h4>
                              <p className="text-xs text-muted-foreground">
                                Leave your accommodation by {itinerary.flights.departure.leaveHomeBy} to reach the airport with sufficient time.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                              <MapPin size={16} className="text-green-600" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Airport Information</h4>
                              <p className="text-xs text-muted-foreground">
                                Terminal {itinerary.flights.departure.terminal}, Gate {itinerary.flights.departure.gate}
                              </p>
                              <Badge variant="outline" className="mt-1.5">Seat {itinerary.flights.departure.seatNumber}</Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                              <Users size={16} className="text-amber-600" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Airport Transfer</h4>
                              <p className="text-xs text-muted-foreground">
                                Your pre-arranged airport pickup will be waiting at Denpasar Airport arrivals hall with your name.
                              </p>
                              <button className="text-xs text-primary font-medium mt-1.5 hover:underline">
                                View Transfer Details
                              </button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            <ItineraryTabs 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              showPackingList={showPackingList}
              setShowPackingList={setShowPackingList}
              onEmergencyAssistance={handleEmergencyAssistance}
            />

            {activeTab === 'itinerary' && (
              <section className="py-12">
                <div className="container px-4 sm:px-6">
                  <ItineraryDaySelector 
                    days={itinerary.days}
                    activeDay={activeDay}
                    setActiveDay={setActiveDay}
                  />
                  
                  {itinerary.days
                    .filter(day => day.day === activeDay)
                    .map(day => (
                      <DaySchedule 
                        key={day.day} 
                        day={day} 
                        showEmergencyContacts={showEmergencyContacts}
                        setShowEmergencyContacts={setShowEmergencyContacts}
                      />
                    ))}
                </div>
              </section>
            )}

            {activeTab === 'addons' && (
              <PremiumAddons addons={itinerary.premiumAddOns} />
            )}

            {activeTab === 'tips' && (
              <TravelTips tips={itinerary.travelTips} />
            )}
            
            {activeTab === 'manage' && (
              <section className="py-12">
                <div className="container px-4 sm:px-6">
                  <div className="max-w-4xl mx-auto">
                    <Tabs 
                      defaultValue="details" 
                      value={managementTab}
                      onValueChange={setManagementTab}
                      className="mb-8"
                    >
                      <TabsList>
                        <TabsTrigger value="details" className="flex items-center">
                          <Clock size={16} className="mr-1.5" />
                          Trip Details
                        </TabsTrigger>
                        <TabsTrigger value="collaborators" className="flex items-center">
                          <Users size={16} className="mr-1.5" />
                          Collaborators
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="details" className="pt-6">
                        <div className="glass rounded-xl p-6 border border-border/40">
                          <h2 className="text-xl font-medium mb-6">Trip Details</h2>
                          
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="text-sm text-muted-foreground mb-1 block">Trip Name</label>
                                <input 
                                  type="text" 
                                  defaultValue={itinerary.title}
                                  className="w-full px-3 py-2 rounded-lg border border-border/80 bg-muted/30"
                                />
                              </div>
                              <div>
                                <label className="text-sm text-muted-foreground mb-1 block">Destination</label>
                                <input 
                                  type="text" 
                                  defaultValue={itinerary.destination}
                                  className="w-full px-3 py-2 rounded-lg border border-border/80 bg-muted/30"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="text-sm text-muted-foreground mb-1 block">Start Date</label>
                                <input 
                                  type="date" 
                                  className="w-full px-3 py-2 rounded-lg border border-border/80 bg-muted/30"
                                />
                              </div>
                              <div>
                                <label className="text-sm text-muted-foreground mb-1 block">End Date</label>
                                <input 
                                  type="date" 
                                  className="w-full px-3 py-2 rounded-lg border border-border/80 bg-muted/30"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm text-muted-foreground mb-1 block">Trip Description</label>
                              <textarea 
                                defaultValue={itinerary.subtitle}
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-border/80 bg-muted/30"
                              />
                            </div>
                            
                            <div className="flex justify-end">
                              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="collaborators" className="pt-6">
                        <div className="glass rounded-xl p-6 border border-border/40">
                          <CollaboratorsList itineraryId={id || ''} />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </section>
            )}
                
            {showPackingList && (
              <section className="py-12 bg-secondary/10">
                <div className="container px-4 sm:px-6">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-medium mb-6">Your Packing List</h2>
                    <PackingListGenerator 
                      destination="Bali" 
                      travelStyle="Adventure"
                    />
                  </div>
                </div>
              </section>
            )}

            {showEmergencyContacts && (
              <EmergencyContacts contacts={itinerary.emergencyContacts} />
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ItineraryDetailsPage;
