import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Umbrella, BookOpen, Globe, Smartphone, Map, AlertTriangle, Info, CheckSquare, Download
} from 'lucide-react';

// Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PreTripChecklist from '@/components/PreTripChecklist';
import TravelInsuranceInfo from '@/components/TravelInsuranceInfo';
import WeatherAlert from '@/components/WeatherAlert';

const TravelSafetyPage = () => {
   // Scroll to top on component mount
   useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once on mount
  const [activeTab, setActiveTab] = useState('before-trip');

  // Helper function to render checklist items
  const renderChecklist = (items: string[], icon: React.ReactNode) => (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          {icon}
          <span className="text-sm">{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Travel Safety Guide | Wander Trip</title>
        <meta name="description" content="Comprehensive travel safety guide with tips, checklists, and resources for before, during, and after your trip." />
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 sm:px-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Travel Safety Guide</h1>
                <p className="text-muted-foreground mt-1">
                  Everything you need to know to travel safely and confidently
                </p>
              </div>

              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => {
                  toast.success("Safety guide downloaded", {
                    description: "Travel safety guide PDF available in your downloads folder"
                  });
                }}
              >
                <Download className="h-4 w-4" />
                <span>Download Safety Guide</span>
              </Button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs defaultValue="before-trip" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 bg-muted/50">
              <TabsTrigger value="before-trip">Before Your Trip</TabsTrigger>
              <TabsTrigger value="during-trip">During Your Trip</TabsTrigger>
              <TabsTrigger value="resources">Safety Resources</TabsTrigger>
              <TabsTrigger value="insurance">Travel Insurance</TabsTrigger>
            </TabsList>

            {/* Before Your Trip Tab */}
            <TabsContent value="before-trip" className="space-y-8 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pre-Trip Preparation */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckSquare className="h-5 w-5 text-primary" />
                      Pre-Trip Preparation
                    </CardTitle>
                    <CardDescription>
                      Essential tasks to complete before your travels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PreTripChecklist
                      destination="Bali"
                      departureDate="June 15, 2023"
                      className="glass-none p-0"
                    />
                  </CardContent>
                </Card>

                {/* Weather Conditions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Umbrella className="h-5 w-5 text-primary" />
                      Weather Conditions
                    </CardTitle>
                    <CardDescription>
                      Current weather alerts for popular destinations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <WeatherAlert
                      destination="Bali"
                      condition="rain"
                      temperature={{ min: 24, max: 29, unit: 'celsius' }}
                      forecast="Scattered thunderstorms expected for the next 5 days."
                      travelDate="June 2023"
                    />
                    <WeatherAlert
                      destination="Paris"
                      condition="clear"
                      temperature={{ min: 18, max: 26, unit: 'celsius' }}
                      forecast="Clear skies and mild temperatures expected."
                      travelDate="June 2023"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Additional Checklists */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Travel Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Travel Documents
                    </CardTitle>
                    <CardDescription>
                      Essential documents for international travel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderChecklist([
                      "Valid passport (6+ months validity)",
                      "Necessary visas",
                      "Travel insurance documents",
                      "Flight and accommodation confirmations",
                      "International driving permit (if needed)",
                      "Travel itinerary with emergency contacts",
                      "Copies of important documents (digital and physical)",
                      "COVID-19 vaccination certificates (if required)"
                    ], <ShieldCheck className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />)}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      View Document Checklist
                    </Button>
                  </CardFooter>
                </Card>

                {/* Health Precautions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Health Precautions
                    </CardTitle>
                    <CardDescription>
                      Medical preparation for international travel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderChecklist([
                      "Check required vaccinations for your destination",
                      "Pack adequate supply of prescription medications",
                      "Prepare a basic first-aid kit",
                      "Check if your health insurance covers international travel",
                      "Research healthcare facilities at your destination",
                      "Consider purchasing travel medical insurance",
                      "Check travel health advisories for your destination",
                      "Plan for any pre-existing medical conditions"
                    ], <ShieldCheck className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />)}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Health Resources
                    </Button>
                  </CardFooter>
                </Card>

                {/* Tech Preparation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-primary" />
                      Tech Preparation
                    </CardTitle>
                    <CardDescription>
                      Digital tools and tech tips for safe travel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderChecklist([
                      "Download offline maps for your destination",
                      "Setup international roaming or get a local SIM card",
                      "Install a VPN for secure internet connections",
                      "Save emergency contacts in your phone",
                      "Download translation apps if needed",
                      "Backup important documents to the cloud",
                      "Ensure your devices are fully charged",
                      "Pack universal adapters for your electronics"
                    ], <ShieldCheck className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />)}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Tech Travel Guide
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* During Your Trip Tab */}
            <TabsContent value="during-trip" className="space-y-8 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Safety Tips During Travel */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      Safety Tips During Travel
                    </CardTitle>
                    <CardDescription>
                      Practical advice to stay safe while traveling
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        {
                          title: "Accommodation Safety",
                          tips: [
                            "Store valuables in the room safe",
                            "Always lock your door, even when inside",
                            "Know the emergency exits",
                            "Don't open the door to unexpected visitors"
                          ]
                        },
                        {
                          title: "Transportation Safety",
                          tips: [
                            "Use reputable transportation services",
                            "Share your route with someone you trust",
                            "Keep valuables out of sight while traveling",
                            "Be cautious when using public WiFi"
                          ]
                        },
                        {
                          title: "Personal Safety",
                          tips: [
                            "Stay aware of your surroundings",
                            "Keep emergency contacts easily accessible",
                            "Research local scams before visiting",
                            "Trust your instincts if something feels wrong"
                          ]
                        }
                      ].map((section, idx) => (
                        <div key={idx}>
                          <h4 className="font-medium mb-2">{section.title}</h4>
                          {renderChecklist(section.tips, <CheckSquare className="h-4 w-4 text-primary mt-1 flex-shrink-0" />)}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Destination-Specific Advice */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Map className="h-5 w-5 text-primary" />
                      Destination-Specific Advice
                    </CardTitle>
                    <CardDescription>
                      Safety considerations for popular destinations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        {
                          destination: "Bali, Indonesia",
                          tips: [
                            "Be cautious when riding scooters - wear a helmet",
                            "Beware of money changers offering too-good rates",
                            "Respect local customs and dress modestly at temples",
                            "Watch out for monkeys at temples - they can be aggressive"
                          ]
                        },
                        {
                          destination: "Paris, France",
                          tips: [
                            "Be aware of pickpockets around tourist attractions",
                            "Validate tickets on public transportation to avoid fines",
                            "Learn basic French phrases for emergencies",
                            "Keep a copy of your passport separate from the original"
                          ]
                        },
                        {
                          destination: "Bangkok, Thailand",
                          tips: [
                            "Use only official taxis or ride-sharing services",
                            "Drink bottled water and be cautious with street food",
                            "Respect royal family images and references",
                            "Be wary of tuk-tuk drivers offering very cheap tours"
                          ]
                        }
                      ].map((location, idx) => (
                        <div key={idx}>
                          <h4 className="font-medium mb-2">{location.destination}</h4>
                          {renderChecklist(location.tips, <Info className="h-4 w-4 text-primary mt-1 flex-shrink-0" />)}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      View All Destination Guides
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Emergency Response Guide */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Emergency Response Guide
                  </CardTitle>
                  <CardDescription>
                    How to handle common travel emergencies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Lost Passport",
                        steps: [
                          "Contact your country's nearest embassy or consulate immediately",
                          "Report the loss to local police and get a police report",
                          "Have digital copies of your passport ready",
                          "Contact our 24/7 emergency assistance line for guidance"
                        ]
                      },
                      {
                        title: "Medical Emergency",
                        steps: [
                          "Dial the local emergency number (911, 112, etc.)",
                          "Contact your travel insurance provider's emergency line",
                          "Notify your embassy if hospitalization is required",
                          "Keep all medical documents and receipts for insurance claims"
                        ]
                      },
                      {
                        title: "Natural Disaster",
                        steps: [
                          "Follow instructions from local authorities",
                          "Register with your embassy's emergency alert system",
                          "Stay in a safe location and have emergency supplies ready",
                          "Contact our emergency assistance for evacuation coordination"
                        ]
                      }
                    ].map((emergency, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-red-50">
                        <h4 className="font-medium text-red-700 mb-3">{emergency.title}</h4>
                        <ol className="space-y-2 list-decimal pl-5">
                          {emergency.steps.map((step, i) => (
                            <li key={i} className="text-sm text-red-700">{step}</li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700">
                    <Link to="/emergency-assistance" className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Emergency Assistance
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Download Emergency Guide
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Safety Resources Tab */}
            <TabsContent value="resources" className="space-y-8 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Government Travel Advisories",
                    description: "Official safety information and travel warnings",
                    icon: <Globe className="h-6 w-6 text-primary" />,
                    resources: [
                      { name: "U.S. Department of State", url: "https://travel.state.gov" },
                      { name: "UK Foreign Travel Advice", url: "https://www.gov.uk/foreign-travel-advice" },
                      { name: "Australian Smart Traveller", url: "https://www.smartraveller.gov.au" },
                      { name: "Government of Canada Travel", url: "https://travel.gc.ca" }
                    ]
                  },
                  {
                    title: "Health Resources",
                    description: "Medical advice for international travelers",
                    icon: <BookOpen className="h-6 w-6 text-primary" />,
                    resources: [
                      { name: "World Health Organization", url: "https://www.who.int" },
                      { name: "CDC Travelers' Health", url: "https://wwwnc.cdc.gov/travel" },
                      { name: "International SOS", url: "https://www.internationalsos.com" },
                      { name: "Travel Health Pro", url: "https://travelhealthpro.org.uk" }
                    ]
                  },
                  {
                    title: "Safety Apps & Tools",
                    description: "Digital resources for safer travels",
                    icon: <Smartphone className="h-6 w-6 text-primary" />,
                    resources: [
                      { name: "GeoSure (Safety ratings app)", url: "#" },
                      { name: "TripWhistle (Emergency numbers)", url: "#" },
                      { name: "Sitata (Travel alerts)", url: "#" },
                      { name: "Smart Traveler App", url: "#" }
                    ]
                  }
                ].map((resource, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {resource.icon}
                        {resource.title}
                      </CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {resource.resources.map((item, i) => (
                          <li key={i}>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                            >
                              <span className="text-primary mr-2">•</span>
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Travel Safety Maps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-primary" />
                    Travel Safety Maps
                  </CardTitle>
                  <CardDescription>
                    Visualize global safety information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                    <div className="text-center p-8">
                      <Map className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Interactive safety map would be displayed here. Shows risk levels,
                        travel advisory levels, and safety information globally.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Travel Insurance Tab */}
            <TabsContent value="insurance" className="space-y-8 animate-in fade-in">
              <TravelInsuranceInfo className="glass-none p-0 shadow-none" />

              {/* Insurance Claim Guide */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    Insurance Claim Guide
                  </CardTitle>
                  <CardDescription>
                    How to file a claim with your travel insurance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Before Making a Claim</h4>
                      {renderChecklist([
                        "Keep all original documents and receipts",
                        "Take photos of damaged items or relevant incidents",
                        "Report incidents to local authorities when applicable",
                        "Contact your insurance provider as soon as possible"
                      ], <CheckSquare className="h-4 w-4 text-primary mt-1 flex-shrink-0" />)}
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Claim Process Steps</h4>
                      <ol className="space-y-3 list-decimal pl-5">
                        {[
                          "Notify your insurance provider within the required timeframe (usually 24-48 hours)",
                          "Complete the claim form provided by your insurance company",
                          "Gather all supporting documentation (receipts, reports, statements)",
                          "Submit your claim through the insurance company's preferred method",
                          "Keep copies of everything you submit and note your claim reference number",
                          "Follow up regularly until your claim is processed"
                        ].map((step, i) => (
                          <li key={i} className="text-sm">{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TravelSafetyPage;