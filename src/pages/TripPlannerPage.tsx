
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripPlanner from '@/components/TripPlanner';
import WeatherForecast from '@/components/WeatherForecast';
import TripBudgetCalculator from '@/components/TripBudgetCalculator';
import TravelHelper from '@/components/TravelHelper';
import TravelCompanion from '@/components/TravelCompanion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { MapPin, Calendar, Sparkles, PlaneTakeoff, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TripPlannerPage() {
  const [destination, setDestination] = useState<string>('Bali');
  const [dateRange, setDateRange] = useState<string>('June 15 - June 22, 2023');
  const [travelers, setTravelers] = useState<number>(2);
  const [itineraryGenerated, setItineraryGenerated] = useState<boolean>(false);
  const [personalizedPreferences, setPersonalizedPreferences] = useState<Record<string, string>>({});
  
  const handleGenerateItinerary = (formData: any) => {
    // Update state based on trip planner form submission
    if (formData.destination) {
      setDestination(formData.destination);
    }
    if (formData.dates) {
      setDateRange(formData.dates);
    }
    if (formData.travelers) {
      const numTravelers = parseInt(formData.travelers.split(' ')[0]) || 
                           formData.travelers.adults + formData.travelers.children;
      setTravelers(numTravelers);
    }
    
    // Store personalized preferences if available
    if (formData.personalizedPreferences) {
      setPersonalizedPreferences(formData.personalizedPreferences);
    }
    
    setItineraryGenerated(true);
  };

  const steps = [
    { icon: <MapPin size={14} />, text: 'Choose Destination' },
    { icon: <Calendar size={14} />, text: 'Set Dates' },
    { icon: <Sparkles size={14} />, text: 'Generate Itinerary' },
    { icon: <PlaneTakeoff size={14} />, text: 'Book & Go' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-16 md:pt-20">
        <motion.section 
          className="bg-muted/20 py-12 md:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 sm:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">
                Create Your Perfect Travel Plan
              </h1>
              <p className="text-muted-foreground mb-6">
                Personalized itineraries with local insights and smart recommendations
              </p>
              
              <div className="inline-flex items-center justify-center rounded-full bg-muted/50 backdrop-blur-sm p-1.5 mb-8 overflow-x-auto max-w-full scrollbar-none">
                <div className="flex space-x-1">
                  {steps.map((step, index) => (
                    <div 
                      key={index} 
                      className={
                        index === 0 
                          ? "flex items-center text-xs px-3 py-1.5 rounded-full bg-primary text-primary-foreground whitespace-nowrap"
                          : "flex items-center text-xs px-3 py-1.5 rounded-full text-muted-foreground whitespace-nowrap"
                      }
                    >
                      {step.icon}
                      <span className="ml-1.5">{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        
        <section className="py-8 md:py-12" id="plan_trip">
          <div className="container px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TripPlanner onGenerate={handleGenerateItinerary} />
              </div>
              
              <div className="space-y-5">
                <motion.div
                  className="bg-muted/30 p-4 rounded-xl border border-border/30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="flex items-start mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Lightbulb size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Quick Tips</h3>
                      <p className="text-xs text-muted-foreground">
                        Make the most of your journey
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2.5">
                    <li className="flex items-start">
                      <span className="text-xs bg-primary/10 text-primary w-4 h-4 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</span>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Be specific about interests</span> - the more details, the better your itinerary
                      </p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-xs bg-primary/10 text-primary w-4 h-4 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</span>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Research weather</span> - visit destinations during optimal seasons
                      </p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-xs bg-primary/10 text-primary w-4 h-4 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</span>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Balance activities</span> - alternate between busy days and relaxation
                      </p>
                    </li>
                  </ul>
                </motion.div>
                
                <WeatherForecast 
                  destination={destination} 
                  dateRange={dateRange}
                  personalizedPreferences={personalizedPreferences}
                />
              </div>
            </div>
          </div>
        </section>
        
        {itineraryGenerated && (
          <motion.section 
            className="py-8 md:py-12 bg-muted/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-medium mb-6 text-center">
                  Planning Tools for {destination}
                </h2>
                
                <Tabs defaultValue="budget" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 overflow-x-auto">
                    <TabsTrigger value="budget">Budget Planning</TabsTrigger>
                    <TabsTrigger value="practical">Practical Information</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="budget">
                    <TripBudgetCalculator 
                      destination={destination}
                      duration={7}
                      travelers={travelers}
                      personalizedPreferences={personalizedPreferences}
                    />
                    
                    <div className="mt-6 text-center">
                      <Button asChild>
                        <a href="/booking">Proceed to Booking</a>
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="practical">
                    <TravelHelper 
                      destination={destination} 
                      personalizedPreferences={personalizedPreferences} 
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </motion.section>
        )}
      </main>
      
      <TravelCompanion />
      <Footer />
    </div>
  );
}
