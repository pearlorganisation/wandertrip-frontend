
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, Heart, Share2, Star, Wifi, Coffee, Utensils, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Sample hotel data - would come from an API in a real app
const hotels = {
  "hotel-001": {
    id: "hotel-001",
    name: "Phi Phi Island Village Beach Resort",
    location: "Phi Phi Islands, Thailand",
    description: "Nestled on a private stretch of pristine white sand beach and surrounded by lush tropical greenery, Phi Phi Island Village Beach Resort offers spacious and secluded accommodation. The resort features traditional Thai-style bungalows with modern amenities, multiple dining options, a spa, and various recreational activities.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "$180",
    rating: 4.7,
    facilities: [
      "Private beach",
      "Outdoor pool",
      "Spa and wellness center",
      "Free WiFi",
      "Restaurant",
      "Fitness center",
      "Airport shuttle"
    ],
    rooms: [
      {
        id: "room-001",
        name: "Deluxe Garden Bungalow",
        price: "$180",
        occupancy: "2 Adults",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "room-002",
        name: "Beachfront Junior Suite",
        price: "$250",
        occupancy: "2 Adults, 1 Child",
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Sarah T.",
        rating: 5,
        comment: "Beautiful location with stunning views. The staff was incredibly helpful and friendly.",
        date: "May 2023"
      },
      {
        id: "review-002",
        name: "Michael L.",
        rating: 4,
        comment: "Great resort with excellent amenities. The beach was pristine. Only downside was the distance from the main attractions.",
        date: "April 2023"
      }
    ]
  },
  "hotel-002": {
    id: "hotel-002",
    name: "Zeavola Resort",
    location: "Phi Phi Islands, Thailand",
    description: "Zeavola Resort is a luxury 5-star resort located on the northern tip of Phi Phi Don Island. This sustainable beachfront resort offers a rustic-chic experience with teakwood suites, tropical gardens, and exceptional service. Guests can enjoy a private beach, fine dining, and a range of activities including diving and snorkeling.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "$220",
    rating: 4.9,
    facilities: [
      "Private beach",
      "Outdoor pool",
      "Spa and wellness center",
      "Free WiFi",
      "Restaurant",
      "Diving center",
      "Airport shuttle"
    ],
    rooms: [
      {
        id: "room-003",
        name: "Garden Suite",
        price: "$220",
        occupancy: "2 Adults",
        image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "room-004",
        name: "Beachfront Suite",
        price: "$350",
        occupancy: "2 Adults",
        image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ],
    reviews: []
  },
  "hotel-003": {
    id: "hotel-003",
    name: "Canaves Oia Suites",
    location: "Santorini, Greece",
    description: "Perched on the cliffs of Oia, Canaves Oia Suites offers breathtaking views of the Aegean Sea and the Caldera. This luxury hotel features elegant white-washed suites, infinity pools, and personalized service. The property combines traditional Cycladic architecture with modern amenities for an unforgettable stay.",
    image: "https://images.unsplash.com/photo-1527322220566-6baaeb9a720c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "$350",
    rating: 4.9,
    facilities: [
      "Infinity pool",
      "Spa and wellness center",
      "Free WiFi",
      "Restaurant",
      "Bar",
      "Airport shuttle",
      "Concierge service"
    ],
    rooms: [],
    reviews: []
  },
  "hotel-004": {
    id: "hotel-004",
    name: "The Ritz-Carlton Kyoto",
    location: "Kyoto, Japan",
    description: "Located on the banks of the Kamogawa River, The Ritz-Carlton Kyoto offers a perfect blend of traditional Japanese aesthetics and luxury. This 5-star hotel features spacious rooms with river or garden views, multiple dining options serving Japanese and international cuisine, a spa, and indoor pool.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "$450",
    rating: 4.9,
    facilities: [
      "Indoor pool",
      "Spa and wellness center",
      "Free WiFi",
      "Multiple restaurants",
      "Fitness center",
      "Airport shuttle",
      "Concierge service"
    ],
    rooms: [],
    reviews: []
  },
  "hotel-005": {
    id: "hotel-005",
    name: "Hotel Santa Caterina",
    location: "Amalfi Coast, Italy",
    description: "Set into the cliff-side of the Amalfi Coast, Hotel Santa Caterina is a late 19th-century Art Nouveau villa surrounded by olive groves and fruit orchards. This luxury hotel offers elegant rooms with hand-painted tiles and Mediterranean views, a private beach club, a saltwater swimming pool, and terraced gardens.",
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "$380",
    rating: 4.8,
    facilities: [
      "Private beach",
      "Outdoor pool",
      "Spa and wellness center",
      "Free WiFi",
      "Restaurant",
      "Bar",
      "Airport shuttle"
    ],
    rooms: [],
    reviews: []
  }
};

export default function HotelDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string>("");
  
  // Get hotel data based on the ID
  const hotel = id ? hotels[id] : null;
  
  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-medium mb-4">Hotel not found</h1>
        <Button onClick={() => navigate(-1)} variant="default">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero section */}
        <section className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20">
            <div className="container max-w-6xl mx-auto">
              <button onClick={() => navigate(-1)} className="inline-flex items-center text-white mb-6">
                <ArrowLeft size={16} className="mr-2" />
                Go back
              </button>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                <div>
                  <h1 className="text-3xl md:text-5xl font-medium text-white mb-2">{hotel.name}</h1>
                  <div className="flex items-center mb-4">
                    <span className="text-white/90">{hotel.location}</span>
                    <div className="ml-4 flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="h-3.5 w-3.5 text-yellow-300 mr-1" />
                      <span className="text-xs text-white font-medium">{hotel.rating}</span>
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
                  <h2 className="text-xl font-medium mb-4">About {hotel.name}</h2>
                  <p className="text-muted-foreground mb-6">{hotel.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-md font-medium mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {hotel.facilities.includes('Free WiFi') && (
                        <div className="flex items-center">
                          <Wifi size={16} className="text-primary mr-2" />
                          <span className="text-sm">Free WiFi</span>
                        </div>
                      )}
                      {hotel.facilities.includes('Restaurant') && (
                        <div className="flex items-center">
                          <Utensils size={16} className="text-primary mr-2" />
                          <span className="text-sm">Restaurant</span>
                        </div>
                      )}
                      {hotel.facilities.includes('Coffee') && (
                        <div className="flex items-center">
                          <Coffee size={16} className="text-primary mr-2" />
                          <span className="text-sm">Coffee shop</span>
                        </div>
                      )}
                      {/* Display other amenities as text-only */}
                      {hotel.facilities.filter(f => !['Free WiFi', 'Restaurant', 'Coffee'].includes(f)).map((facility, index) => (
                        <div key={index} className="flex items-center">
                          <Check size={16} className="text-primary mr-2" />
                          <span className="text-sm">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                {/* Rooms section */}
                {hotel.rooms && hotel.rooms.length > 0 && (
                  <motion.div 
                    className="glass p-6 rounded-2xl mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h2 className="text-xl font-medium mb-4">Available Rooms</h2>
                    <div className="space-y-4">
                      {hotel.rooms.map((room) => (
                        <div key={room.id} className="border border-border rounded-lg overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 h-48 md:h-auto">
                              <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow p-4 flex flex-col">
                              <div className="mb-4">
                                <h3 className="font-medium">{room.name}</h3>
                                <p className="text-sm text-muted-foreground">{room.occupancy}</p>
                              </div>
                              <div className="flex-grow"></div>
                              <div className="flex flex-col sm:flex-row justify-between items-end">
                                <div>
                                  <p className="text-xl font-medium">{room.price}<span className="text-sm font-normal text-muted-foreground">/night</span></p>
                                  <p className="text-xs text-muted-foreground">Includes taxes & fees</p>
                                </div>
                                <Button className="mt-3 sm:mt-0">Book Now</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* Reviews section */}
                {hotel.reviews && hotel.reviews.length > 0 && (
                  <motion.div 
                    className="glass p-6 rounded-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-medium">Guest Reviews</h2>
                      <div className="flex items-center bg-primary/10 px-2 py-1 rounded-md">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{hotel.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {hotel.reviews.map((review) => (
                        <div key={review.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <span className="font-medium">{review.name}</span>
                              <span className="text-xs text-muted-foreground ml-2">{review.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-3.5 w-3.5 text-yellow-500 mr-0.5" />
                              <span className="text-sm font-medium">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="lg:col-span-1">
                <div className="glass p-6 rounded-2xl sticky top-24">
                  <h3 className="text-lg font-medium mb-4">Book Your Stay</h3>
                  
                  <div className="mb-4">
                    <p className="text-xl font-medium mb-1">{hotel.price}<span className="text-sm font-normal text-muted-foreground">/night</span></p>
                    <p className="text-xs text-muted-foreground">Includes taxes & fees</p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <Calendar size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <div className="flex-grow">
                        <p className="text-sm font-medium mb-1">Check-in / Check-out</p>
                        <input 
                          type="text" 
                          value={selectedDates}
                          onChange={(e) => setSelectedDates(e.target.value)}
                          placeholder="Select dates"
                          className="w-full text-sm px-3 py-2 border border-border rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-md border border-border">
                      <div>
                        <p className="text-sm font-medium">Refundable rate</p>
                        <p className="text-xs text-muted-foreground">Free cancellation before check-in</p>
                      </div>
                      <Check size={16} className="text-primary" />
                    </div>
                  </div>
                  
                  <Button className="w-full mb-3">Book Now</Button>
                  <Button variant="outline" className="w-full">Contact Property</Button>
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
