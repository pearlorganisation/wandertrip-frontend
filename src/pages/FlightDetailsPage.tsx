
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Clock, Calendar, Users, Luggage, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Sample flight data - would come from an API in a real app
const flights = {
  "flight-001": {
    id: "flight-001",
    from: "Bangkok",
    to: "Phuket",
    fromCode: "BKK",
    toCode: "HKT",
    departureTime: "08:30",
    arrivalTime: "09:50",
    date: "2023-07-15",
    airline: "Thai Airways",
    flightNumber: "TG203",
    aircraft: "Airbus A320",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 120,
    duration: "1h 20m",
    stops: 0,
    returnFlights: [
      {
        id: "return-flight-001",
        from: "Phuket",
        to: "Bangkok",
        fromCode: "HKT",
        toCode: "BKK",
        departureTime: "19:30",
        arrivalTime: "20:50",
        date: "2023-07-22",
        airline: "Thai Airways",
        flightNumber: "TG204",
        price: 110,
        duration: "1h 20m"
      },
      {
        id: "return-flight-002",
        from: "Phuket",
        to: "Bangkok",
        fromCode: "HKT",
        toCode: "BKK",
        departureTime: "17:15",
        arrivalTime: "18:35",
        date: "2023-07-22",
        airline: "Bangkok Airways",
        flightNumber: "PG273",
        price: 105,
        duration: "1h 20m"
      }
    ],
    fareOptions: [
      {
        name: "Economy Light",
        price: 120,
        features: ["1 carry-on bag", "No checked bags", "No seat selection", "No changes"]
      },
      {
        name: "Economy Standard",
        price: 150,
        features: ["1 carry-on bag", "1 checked bag (23kg)", "Seat selection", "Changes allowed (fee applies)"]
      },
      {
        name: "Economy Flex",
        price: 190,
        features: ["1 carry-on bag", "2 checked bags (23kg each)", "Seat selection", "Free changes", "Priority boarding"]
      }
    ]
  },
  "flight-002": {
    id: "flight-002",
    from: "Athens",
    to: "Santorini",
    fromCode: "ATH",
    toCode: "JTR",
    departureTime: "10:15",
    arrivalTime: "11:00",
    date: "2023-08-05",
    airline: "Aegean Airlines",
    flightNumber: "A3352",
    aircraft: "Airbus A320",
    image: "https://images.unsplash.com/photo-1553088435-3bc8665f5949?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 180,
    duration: "45m",
    stops: 0,
    returnFlights: [],
    fareOptions: []
  }
};

export default function FlightDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Get flight data based on the ID
  const flight = id ? flights[id] : null;
  
  if (!flight) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-medium mb-4">Flight not found</h1>
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
      
      <main className="flex-grow pt-24">        
        <section className="py-10">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <button onClick={() => navigate(-1)} className="inline-flex items-center text-primary mb-8">
              <ArrowLeft size={16} className="mr-2" />
              Go back
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <motion.div 
                  className="glass p-6 rounded-2xl mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-medium">Flight Details</h2>
                    <div className="flex items-center bg-primary/10 px-2 py-1 rounded-md">
                      <span className="text-sm font-medium text-primary">${flight.price}</span>
                      <span className="text-xs ml-1 text-primary/80">/ person</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex flex-col items-center">
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                        <PlaneTakeoff size={18} className="text-primary" />
                      </div>
                      <span className="text-lg font-medium">{flight.fromCode}</span>
                      <span className="text-sm text-muted-foreground">{flight.from}</span>
                      <span className="text-sm font-medium">{flight.departureTime}</span>
                    </div>
                    
                    <div className="flex-grow mx-4 flex flex-col items-center">
                      <span className="text-xs text-muted-foreground mb-2">{flight.duration}</span>
                      <div className="w-full flex items-center">
                        <div className="h-0.5 flex-grow bg-border"></div>
                        <div className="px-3">
                          <ArrowRight size={16} className="text-muted-foreground" />
                        </div>
                        <div className="h-0.5 flex-grow bg-border"></div>
                      </div>
                      <span className="text-xs text-muted-foreground mt-2">Direct</span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                        <PlaneLanding size={18} className="text-primary" />
                      </div>
                      <span className="text-lg font-medium">{flight.toCode}</span>
                      <span className="text-sm text-muted-foreground">{flight.to}</span>
                      <span className="text-sm font-medium">{flight.arrivalTime}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-3 bg-background/50 rounded-md border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Airline</p>
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded overflow-hidden mr-2">
                          <img src={flight.image} alt={flight.airline} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-sm font-medium">{flight.airline}</p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-background/50 rounded-md border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Flight</p>
                      <p className="text-sm font-medium">{flight.flightNumber}</p>
                    </div>
                    
                    <div className="p-3 bg-background/50 rounded-md border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Date</p>
                      <p className="text-sm font-medium">{flight.date}</p>
                    </div>
                    
                    <div className="p-3 bg-background/50 rounded-md border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Aircraft</p>
                      <p className="text-sm font-medium">{flight.aircraft}</p>
                    </div>
                  </div>
                  
                  {flight.fareOptions && flight.fareOptions.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-md font-medium mb-4">Fare Options</h3>
                      <div className="space-y-4">
                        {flight.fareOptions.map((fare, index) => (
                          <div key={index} className="border border-border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-medium">{fare.name}</h4>
                                <p className="text-xs text-muted-foreground">Refundable fare</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-medium">${fare.price}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {fare.features.map((feature, fIndex) => (
                                <div key={fIndex} className="flex items-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                                  <p className="text-sm text-muted-foreground">{feature}</p>
                                </div>
                              ))}
                            </div>
                            <Button 
                              className="w-full mt-4" 
                              variant={index === 0 ? "outline" : index === 1 ? "default" : "outline"}
                            >
                              Select {fare.name}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
                
                {flight.returnFlights && flight.returnFlights.length > 0 && (
                  <motion.div 
                    className="glass p-6 rounded-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h2 className="text-xl font-medium mb-6">Return Flights</h2>
                    <div className="space-y-4">
                      {flight.returnFlights.map((returnFlight, index) => (
                        <div key={index} className="bg-background/50 p-4 rounded-lg border border-border">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <div className="text-sm">
                                <span className="font-medium">{returnFlight.airline}</span>
                                <span className="text-muted-foreground text-xs ml-2">{returnFlight.flightNumber}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-medium">${returnFlight.price}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col items-center">
                              <span className="text-sm font-medium">{returnFlight.departureTime}</span>
                              <span className="text-xs text-muted-foreground">{returnFlight.fromCode}</span>
                            </div>
                            
                            <div className="flex-grow mx-4 flex flex-col items-center">
                              <span className="text-xs text-muted-foreground mb-1">{returnFlight.duration}</span>
                              <div className="w-full flex items-center">
                                <div className="h-0.5 flex-grow bg-border"></div>
                                <div className="px-2">
                                  <ArrowRight size={14} className="text-muted-foreground" />
                                </div>
                                <div className="h-0.5 flex-grow bg-border"></div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-center">
                              <span className="text-sm font-medium">{returnFlight.arrivalTime}</span>
                              <span className="text-xs text-muted-foreground">{returnFlight.toCode}</span>
                            </div>
                            
                            <div className="ml-6">
                              <Button size="sm">Select</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="md:col-span-1">
                <div className="glass p-6 rounded-2xl sticky top-24">
                  <h3 className="text-lg font-medium mb-5">Price Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Adult fare (1)</p>
                      <p className="text-sm">${flight.price}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Taxes & fees</p>
                      <p className="text-sm">${Math.round(flight.price * 0.15)}</p>
                    </div>
                    {flight.returnFlights && flight.returnFlights.length > 0 && (
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Return flight</p>
                        <p className="text-sm">Not selected</p>
                      </div>
                    )}
                    <div className="border-t border-border pt-3 flex justify-between">
                      <p className="font-medium">Total</p>
                      <p className="font-medium">${flight.price + Math.round(flight.price * 0.15)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <Calendar size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Date</p>
                        <p className="text-sm text-muted-foreground">{flight.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-sm text-muted-foreground">{flight.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Passengers</p>
                        <p className="text-sm text-muted-foreground">1 Adult</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Luggage size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Baggage</p>
                        <p className="text-sm text-muted-foreground">Depends on fare selection</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <Button className="w-full mb-3">Book Flight</Button>
                    
                    <div className="mt-4 text-xs text-muted-foreground text-center">
                      <p>Prices are subject to availability</p>
                      <p>Fares include taxes and charges</p>
                    </div>
                  </div>
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
