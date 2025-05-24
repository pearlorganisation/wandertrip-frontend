
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Umbrella, Clock, Check, Heart, ArrowLeft, Share2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Sample destination data - in a real app, this would come from an API or context
const destinations = {
  "dest-001": {
    id: "dest-001",
    name: "Phi Phi Islands",
    location: "Thailand",
    description: "Known for its stunning limestone cliffs, crystal-clear waters, and vibrant marine life, the Phi Phi Islands are a tropical paradise in the Andaman Sea. Perfect for snorkeling, diving, and beach relaxation.",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1739&q=80",
    rating: 4.8,
    bestTimeToVisit: "November to April",
    highlightActivities: [
      "Island hopping tour",
      "Snorkeling at Maya Bay",
      "Hiking to Phi Phi Viewpoint",
      "Monkey Beach visit"
    ],
    hotels: [
      {
        id: "hotel-001",
        name: "Phi Phi Island Village Beach Resort",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        price: "$180/night",
        rating: 4.7
      },
      {
        id: "hotel-002",
        name: "Zeavola Resort",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        price: "$220/night",
        rating: 4.9
      }
    ],
    flights: [
      {
        id: "flight-001",
        from: "Bangkok",
        to: "Phuket",
        airline: "Thai Airways",
        image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        price: "$120",
        duration: "1h 20m"
      }
    ],
    bookableActivities: [
      {
        id: "activity-001",
        name: "Full-Day Phi Phi Islands Tour",
        image: "https://images.unsplash.com/photo-1468476396571-4d6f2a427ee7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        price: "$45",
        duration: "8 hours",
        rating: 4.8
      },
      {
        id: "activity-002",
        name: "Sunset Cruise with Dinner",
        image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        price: "$65",
        duration: "3 hours",
        rating: 4.6
      }
    ]
  },
  "dest-002": {
    id: "dest-002",
    name: "Santorini",
    location: "Greece",
    description: "Famous for its dramatic views, stunning sunsets, white-washed houses, and blue domed churches, Santorini is the jewel of the Aegean Sea. The island's unique architecture and volcanic landscape create an unforgettable experience.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
    rating: 4.9,
    bestTimeToVisit: "April to October",
    highlightActivities: [
      "Sunset watching in Oia",
      "Wine tasting tour",
      "Volcano and hot springs tour",
      "Akrotiri archaeological site visit"
    ],
    hotels: [
      {
        id: "hotel-003",
        name: "Canaves Oia Suites",
        image: "https://images.unsplash.com/photo-1527322220566-6baaeb9a720c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        price: "$350/night",
        rating: 4.9
      }
    ],
    flights: [
      {
        id: "flight-002",
        from: "Athens",
        to: "Santorini",
        airline: "Aegean Airlines",
        image: "https://images.unsplash.com/photo-1553088435-3bc8665f5949?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        price: "$180",
        duration: "45m"
      }
    ],
    bookableActivities: [
      {
        id: "activity-003",
        name: "Caldera Sailing Cruise",
        image: "https://images.unsplash.com/photo-1586156938613-769b0353c8fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        price: "$85",
        duration: "5 hours",
        rating: 4.8
      }
    ]
  },
  "dest-003": {
    id: "dest-003",
    name: "Kyoto",
    location: "Japan",
    description: "A city of incredible temples, traditional wooden houses, beautiful gardens, and geisha culture. Kyoto offers a perfect balance of ancient traditions and modern conveniences in a picturesque setting.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    rating: 4.7,
    bestTimeToVisit: "March-May and October-November",
    highlightActivities: [
      "Visit Fushimi Inari Shrine",
      "Arashiyama Bamboo Grove",
      "Kinkaku-ji (Golden Pavilion)",
      "Gion District exploration"
    ],
    hotels: [
      {
        id: "hotel-004",
        name: "The Ritz-Carlton Kyoto",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        price: "$450/night",
        rating: 4.9
      }
    ],
    flights: [],
    bookableActivities: [
      {
        id: "activity-004",
        name: "Tea Ceremony Experience",
        image: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        price: "$55",
        duration: "1.5 hours",
        rating: 4.7
      }
    ]
  },
  "dest-004": {
    id: "dest-004",
    name: "Amalfi Coast",
    location: "Italy",
    description: "A stunning coastline with dramatic cliffs, colorful villages, and azure waters. The Amalfi Coast is renowned for its scenic beauty, delicious cuisine, and charming seaside towns like Positano, Amalfi, and Ravello.",
    image: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e",
    rating: 4.8,
    bestTimeToVisit: "May to October",
    highlightActivities: [
      "Drive along the coastal road",
      "Boat tour of the coast",
      "Visit Ravello and Villa Rufolo",
      "Beach day in Positano"
    ],
    hotels: [
      {
        id: "hotel-005",
        name: "Hotel Santa Caterina",
        image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        price: "$380/night",
        rating: 4.8
      }
    ],
    flights: [],
    bookableActivities: []
  },
  "trending-001": {
    id: "trending-001",
    name: "Cabo San Lucas",
    location: "Mexico",
    description: "Known for its pristine beaches, dramatic sea arches, and vibrant nightlife, Cabo San Lucas is a popular resort city at the southern tip of Mexico's Baja California peninsula.",
    image: "https://images.unsplash.com/photo-1527734055665-8def83921139?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7,
    bestTimeToVisit: "May to June, October to November",
    highlightActivities: [
      "Visit El Arco and Land's End",
      "Whale watching tours",
      "Sunset sailing",
      "Sport fishing"
    ],
    hotels: [],
    flights: [],
    bookableActivities: []
  },
  "trending-002": {
    id: "trending-002",
    name: "Bora Bora",
    location: "French Polynesia",
    description: "This magical island rises from the velvet blues of the deep water up to the surface of the lagoon, with its string of islets encircling the sunken crater. Bora Bora is famous for its overwater bungalows and stunning turquoise lagoon.",
    image: "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.9,
    bestTimeToVisit: "May to October",
    highlightActivities: [
      "Snorkeling in the coral gardens",
      "Circle island tour",
      "Mount Otemanu hike",
      "Lagoon tour with shark and ray feeding"
    ],
    hotels: [],
    flights: [],
    bookableActivities: []
  },
  "trending-003": {
    id: "trending-003",
    name: "Machu Picchu",
    location: "Peru",
    description: "A 15th-century Inca citadel situated on a mountain ridge above the Sacred Valley. This UNESCO World Heritage site is renowned for its sophisticated dry-stone walls and panoramic views.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.9,
    bestTimeToVisit: "April to October",
    highlightActivities: [
      "Hike the Inca Trail",
      "Visit Huayna Picchu",
      "Tour of the citadel",
      "Visit the Sun Gate"
    ],
    hotels: [],
    flights: [],
    bookableActivities: []
  },
  "trending-004": {
    id: "trending-004",
    name: "Seychelles",
    location: "East Africa",
    description: "An archipelago of 115 islands in the Indian Ocean known for its beaches, coral reefs, nature reserves, and rare wildlife like the giant Aldabra tortoises.",
    image: "https://images.unsplash.com/photo-1589197331516-4d84b72a20ba?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
    bestTimeToVisit: "April to May, October to November",
    highlightActivities: [
      "Island hopping",
      "Snorkeling at Anse Lazio",
      "Hiking in Morne Seychellois National Park",
      "Visit Vallée de Mai Nature Reserve"
    ],
    hotels: [],
    flights: [],
    bookableActivities: []
  },
  "trending-005": {
    id: "trending-005",
    name: "Swiss Alps",
    location: "Switzerland",
    description: "A majestic mountain range offering breathtaking scenery, world-class skiing, and charming alpine villages with traditional Swiss architecture.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
    bestTimeToVisit: "December to March for skiing, June to September for hiking",
    highlightActivities: [
      "Skiing or snowboarding in winter",
      "Hiking mountain trails in summer",
      "Scenic train journeys",
      "Visit traditional alpine villages"
    ],
    hotels: [],
    flights: [],
    bookableActivities: []
  },
  "trending-006": {
    id: "trending-006",
    name: "Banff National Park",
    location: "Canada",
    description: "Canada's first national park is home to stunning mountain landscapes, turquoise lakes, abundant wildlife, and the charming town of Banff.",
    image: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
    bestTimeToVisit: "June to August for summer activities, December to March for winter activities",
    highlightActivities: [
      "Explore Lake Louise and Moraine Lake",
      "Wildlife watching",
      "Hiking mountain trails",
      "Skiing at local resorts"
    ],
    hotels: [],
    flights: [],
    bookableActivities: []
  }
};

export default function DestinationDetailsPage() {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once on mount
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Get destination data based on the ID
  const destination = id ? destinations[id] : null;

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-medium mb-4">Destination not found</h1>
        <Button onClick={() => navigate('/destinations')} variant="default">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Destinations
        </Button>
      </div>
    );
  }

  const handleStartPlanning = () => {
    navigate('/trip-planner', { state: { destination: destination.name } });
  };

  function DestinationDetailPage({ destination }) {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Hero section */}
        <section className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20">
            <div className="container max-w-6xl mx-auto">
              <Link to="/destinations" className="inline-flex items-center text-white mb-6">
                <ArrowLeft size={16} className="mr-2" />
                Back to destinations
              </Link>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                <div className="bg-black/50 p-4 rounded-lg backdrop-blur-sm">
                  <h1 className="text-3xl md:text-5xl font-medium text-white mb-2">{destination.name}</h1>
                  <div className="flex items-center mb-4">
                    <MapPin size={16} className="text-white mr-1" />
                    <span className="text-white/90">{destination.location}</span>
                    <div className="ml-4 flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="h-3.5 w-3.5 text-yellow-300 mr-1" />
                      <span className="text-xs text-white font-medium">{destination.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 md:mt-0">
                  <Button
                    onClick={() => setIsFavorite(!isFavorite)}
                    variant="outline"
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm border-transparent text-white hover:bg-white/30"
                  >
                    <Heart className={cn("mr-2 h-4 w-4", isFavorite && "fill-red-500 text-red-500")} />
                    {isFavorite ? 'Saved' : 'Save'}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm border-transparent text-white hover:bg-white/30"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content section */}
        <section className="py-10">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <motion.div
                  className="glass p-6 rounded-2xl mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-medium mb-4">About {destination.name}</h2>
                  <p className="text-muted-foreground mb-6">{destination.description}</p>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-start">
                      <Umbrella size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Best time to visit</p>
                        <p className="text-sm text-muted-foreground">{destination.bestTimeToVisit}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Recommended duration</p>
                        <p className="text-sm text-muted-foreground">5-7 days</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="glass p-6 rounded-2xl mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-xl font-medium mb-4">Top Activities</h2>
                  <div className="space-y-3">
                    {destination.highlightActivities && destination.highlightActivities.map((activity, index) => (
                      <div key={index} className="flex items-start">
                        <Check size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-muted-foreground">{activity}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Hotels section */}
                {destination.hotels && destination.hotels.length > 0 && (
                  <motion.div
                    className="glass p-6 rounded-2xl mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-medium">Where to Stay</h2>
                      <Link to="/booking" className="text-primary text-sm">View all</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {destination.hotels.map((hotel) => (
                        <Link
                          key={hotel.id}
                          to={`/hotels/${hotel.id}`}
                          className="overflow-hidden rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="relative h-32">
                            <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                            <div className="absolute bottom-2 right-2 bg-white/90 text-xs font-medium px-2 py-1 rounded-full">
                              {hotel.price}
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-sm">{hotel.name}</h3>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                <span className="text-xs">{hotel.rating}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Activities booking section */}
                {destination.bookableActivities && destination.bookableActivities.length > 0 && (
                  <motion.div
                    className="glass p-6 rounded-2xl mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-medium">Things to Do</h2>
                      <Link to="/booking" className="text-primary text-sm">View all</Link>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {destination.bookableActivities.map((activity) => (
                        <Link
                          key={activity.id}
                          to={`/activities/${activity.id}`}
                          className="flex overflow-hidden rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="relative w-24 h-24 flex-shrink-0">
                            <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-3 flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-sm">{activity.name}</h3>
                                <p className="text-xs text-muted-foreground">{activity.duration}</p>
                              </div>
                              <div>
                                <p className="font-medium text-sm">{activity.price}</p>
                                <div className="flex items-center justify-end">
                                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                  <span className="text-xs">{activity.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Flights section */}
                {destination.flights && destination.flights.length > 0 && (
                  <motion.div
                    className="glass p-6 rounded-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-medium">Flights</h2>
                      <Link to="/booking" className="text-primary text-sm">View all</Link>
                    </div>
                    <div className="space-y-4">
                      {destination.flights.map((flight) => (
                        <Link
                          key={flight.id}
                          to={`/flights/${flight.id}`}
                          className="flex items-center p-3 rounded-lg hover:bg-background transition-colors"
                        >
                          <div className="w-10 h-10 rounded overflow-hidden mr-3">
                            <img src={flight.image} alt={flight.airline} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-sm">{flight.from} → {flight.to}</p>
                                <p className="text-xs text-muted-foreground">{flight.airline} • {flight.duration}</p>
                              </div>
                              <p className="font-medium">{flight.price}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="glass p-6 rounded-2xl sticky top-24">
                  <h3 className="text-lg font-medium mb-4">Start Planning Your Trip</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <MapPin size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Destination</p>
                        <p className="text-sm text-muted-foreground">{destination.name}, {destination.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Calendar size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">When</p>
                        <p className="text-sm text-muted-foreground">Select your dates</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Users size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Travelers</p>
                        <p className="text-sm text-muted-foreground">2 adults, 0 children</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleStartPlanning}
                    className="w-full"
                  >
                    Start Planning
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Our AI will create your personalized itinerary
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
