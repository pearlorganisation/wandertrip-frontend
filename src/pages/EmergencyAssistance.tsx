
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { AlertCircle, Hospital, Phone, Shield, MapPin, User, Building, BookOpen } from 'lucide-react';

const EmergencyAssistance = () => {
  const [activeTab, setActiveTab] = useState('emergency');
  
  const handleEmergencyCall = (service: string) => {
    toast.success(`Connecting to ${service}...`, {
      description: "This is a demo - in a real app this would initiate a call.",
      duration: 5000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Emergency Assistance</h1>
                <p className="text-muted-foreground mt-1">
                  24/7 access to emergency services and support during your travels
                </p>
              </div>
              
              <Button 
                variant="destructive" 
                size="lg" 
                className="flex items-center gap-2"
                onClick={() => handleEmergencyCall('Emergency Hotline')}
              >
                <Phone className="h-4 w-4" />
                <span>Emergency Call</span>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="emergency" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 bg-muted/50">
              <TabsTrigger value="emergency">Emergency Services</TabsTrigger>
              <TabsTrigger value="medical">Medical Assistance</TabsTrigger>
              <TabsTrigger value="embassy">Embassy Information</TabsTrigger>
              <TabsTrigger value="resources">Travel Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="emergency" className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Local Police",
                    description: "Connect with local police authorities",
                    icon: <Shield className="h-6 w-6" />,
                    number: "911",
                    action: "Call Police"
                  },
                  {
                    title: "Ambulance",
                    description: "Request emergency medical transportation",
                    icon: <Hospital className="h-6 w-6" />,
                    number: "112",
                    action: "Call Ambulance"
                  },
                  {
                    title: "Fire Department",
                    description: "Report fire emergencies and get assistance",
                    icon: <AlertCircle className="h-6 w-6" />,
                    number: "101",
                    action: "Call Fire Dept"
                  },
                  {
                    title: "Traveler Helpline",
                    description: "Wander Trip's 24/7 traveler emergency support",
                    icon: <Phone className="h-6 w-6" />,
                    number: "+1-800-WANDERTRIP",
                    action: "Call Helpline"
                  },
                  {
                    title: "Local Embassy",
                    description: "Connect with your country's embassy or consulate",
                    icon: <Building className="h-6 w-6" />,
                    number: "View Details",
                    action: "Contact Embassy"
                  },
                  {
                    title: "Travel Insurance",
                    description: "Get assistance with travel insurance claims",
                    icon: <Shield className="h-6 w-6" />,
                    number: "Policy #TR-1234567",
                    action: "Contact Insurance"
                  }
                ].map((service, index) => (
                  <Card key={index} className="overflow-hidden border border-border">
                    <CardHeader className="bg-muted/20">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {service.icon}
                            {service.title}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {service.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="text-xl font-bold">{service.number}</div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/10 px-6 py-4">
                      <Button 
                        className="w-full" 
                        variant={index === 0 || index === 1 ? "destructive" : "default"}
                        onClick={() => handleEmergencyCall(service.title)}
                      >
                        {service.action}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="medical" className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nearby Hospitals</CardTitle>
                    <CardDescription>Find medical facilities near your location</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      "Memorial Hospital - 1.2 miles away",
                      "St. Mary's Medical Center - 2.5 miles away",
                      "City General Hospital - 3.1 miles away"
                    ].map((hospital, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-3">
                          <Hospital className="h-5 w-5 text-primary" />
                          <span>{hospital}</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast.info("Directions provided in demo mode")}
                        >
                          Directions
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => toast.info("This would display a map with nearby medical facilities")}
                    >
                      View All on Map
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Records</CardTitle>
                    <CardDescription>Access your medical information for emergencies</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Allergies</h4>
                      <p className="text-sm text-muted-foreground">Penicillin, Peanuts</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Blood Type</h4>
                      <p className="text-sm text-muted-foreground">O Positive</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Emergency Contact</h4>
                      <p className="text-sm text-muted-foreground">Jane Doe - +1 (555) 123-4567</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button 
                      className="w-full"
                      onClick={() => toast.info("Medical records would be accessible here")}
                    >
                      View Complete Records
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => toast.info("This would allow you to update medical information")}
                    >
                      Update Information
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="embassy" className="space-y-6 animate-in fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Embassy & Consulate Information</CardTitle>
                  <CardDescription>Find your country's diplomatic missions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium">Current Location</label>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>Paris, France</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block mb-2 text-sm font-medium">Your Country</label>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                        <User className="h-5 w-5 text-primary" />
                        <span>United States</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="block mb-2 text-sm font-medium">Nearby Diplomatic Missions</label>
                      <div className="p-4 rounded-lg bg-muted/30 space-y-4">
                        <div>
                          <h4 className="font-medium">U.S. Embassy in Paris</h4>
                          <p className="text-sm text-muted-foreground mb-2">2 Avenue Gabriel, 75008 Paris, France</p>
                          <div className="flex flex-wrap gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEmergencyCall("U.S. Embassy")}
                            >
                              <Phone className="h-4 w-4 mr-1" /> +33 1 43 12 22 22
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toast.info("Directions to embassy would be shown")}
                            >
                              <MapPin className="h-4 w-4 mr-1" /> Directions
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium">U.S. Consulate in Paris</h4>
                          <p className="text-sm text-muted-foreground mb-2">4 Avenue Gabriel, 75008 Paris, France</p>
                          <div className="flex flex-wrap gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEmergencyCall("U.S. Consulate")}
                            >
                              <Phone className="h-4 w-4 mr-1" /> +33 1 42 60 14 00
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toast.info("Directions to consulate would be shown")}
                            >
                              <MapPin className="h-4 w-4 mr-1" /> Directions
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => toast.info("Emergency services for citizens abroad would be displayed")}
                  >
                    Emergency Services for Citizens
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Travel Advisories",
                    description: "Current safety and security information",
                    icon: <AlertCircle className="h-6 w-6" />,
                    action: "View Advisories"
                  },
                  {
                    title: "Health Guidelines",
                    description: "Local health regulations and guidelines",
                    icon: <Hospital className="h-6 w-6" />,
                    action: "View Guidelines"
                  },
                  {
                    title: "Emergency Phrases",
                    description: "Essential phrases in local language",
                    icon: <BookOpen className="h-6 w-6" />,
                    action: "View Phrases"
                  }
                ].map((resource, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {resource.icon}
                        {resource.title}
                      </CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button 
                        className="w-full"
                        onClick={() => toast.info(`This would display ${resource.title.toLowerCase()} for your location`)}
                      >
                        {resource.action}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Download Emergency Kit</CardTitle>
                  <CardDescription>Access important information offline</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download a PDF with emergency contacts, local emergency services, 
                    and essential phrases for your destination. Available offline once downloaded.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => toast.success("Emergency kit downloaded successfully", {
                      description: "This is a demo - no actual file was downloaded"
                    })}
                  >
                    Download Emergency PDF
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmergencyAssistance;
