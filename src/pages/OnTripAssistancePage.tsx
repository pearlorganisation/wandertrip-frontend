
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  MapPin, Phone, Flag, MessageSquare, Globe, ArrowRight, LucideShirt, 
  AlertCircle, Compass, ClipboardCheck, Hospital, BusFront, Utensils, 
  Palette, Camera, UserCheck, Wifi, Search, FileText, Landmark, CreditCard, 
  HelpCircle, Building, Calendar, Check
} from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Import our components
import { PageHeader } from '@/components/on-trip/PageHeader';
import { TravelAssistant } from '@/components/on-trip/TravelAssistant';
import { TripInfoSidebar } from '@/components/on-trip/TripInfoSidebar';
import { TravelTools } from '@/components/on-trip/TravelTools';
import { TravelDocuments } from '@/components/on-trip/TravelDocuments';
import { EmergencyContactsEnhanced } from '@/components/itinerary/EmergencyContactsEnhanced';

// Define types for the emergency contacts
type EmergencyContactType = "emergency" | "medical" | "embassy" | "local" | "custom";

interface EmergencyContact {
  id: string;
  title: string;
  contact: string;
  type: EmergencyContactType;
  icon: React.ReactNode;
}

interface LocalResource {
  name: string;
  distance?: string;
  contact?: string;
  note?: string;
  cuisine?: string;
  specialty?: string;
  rating?: number;
  openHours?: string;
  priceRange?: string;
  website?: string;
  dietaryOptions?: string[];
}

interface LocalResourceCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: LocalResource[];
}

const OnTripAssistancePage = () => {
  const [query, setQuery] = useState('');
  const [showPackingList, setShowPackingList] = useState(false);
  const [translationQuery, setTranslationQuery] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Indonesian');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('assistant');
  const [currentLocation, setCurrentLocation] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [activeLocalTab, setActiveLocalTab] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedDietaryOptions, setSelectedDietaryOptions] = useState<string[]>([]);
  
  useEffect(() => {
    // Simulate getting current location
    const getLocation = () => {
      setLoadingLocation(true);
      setTimeout(() => {
        setCurrentLocation('Ubud, Bali');
        setLoadingLocation(false);
      }, 1000);
    };
    
    getLocation();
  }, []);
  
  const tripInfo = {
    destination: "Bali, Indonesia",
    dates: "June 15 - 22, 2024",
    weather: "29°C, Partly Cloudy",
    localTime: "3:45 PM",
    currency: "Indonesian Rupiah (IDR)",
    exchange: "1 USD = 15,600 IDR"
  };
  
  const emergencyContacts: EmergencyContact[] = [
    { id: "1", title: "Local Emergency", contact: "112", type: "emergency", icon: <Phone size={16} className="text-red-500" /> },
    { id: "2", title: "Tourist Police", contact: "+62 361 754599", type: "local", icon: <Flag size={16} className="text-blue-500" /> },
    { id: "3", title: "Trip Assistance", contact: "+1 800 555 1234", type: "custom", icon: <MessageSquare size={16} className="text-primary" /> }
  ];

  const localResourceCategories: LocalResourceCategory[] = [
    { 
      id: 'medical',
      title: 'Medical Services',
      icon: <Hospital size={20} className="text-red-500" />,
      items: [
        { name: 'BIMC Hospital Ubud', distance: '1.2 km', contact: '+62 361 978789', note: 'English-speaking staff', rating: 4.5, openHours: '24/7', website: 'bimcubud.com' },
        { name: 'Ubud Clinic', distance: '0.8 km', contact: '+62 361 974911', note: 'Open 24/7', rating: 4.2, openHours: '24/7', website: 'ubudclinic.com' },
        { name: 'Ubud Pharmacy', distance: '0.5 km', contact: '+62 361 971234', note: 'Has most common medications', rating: 4.0, openHours: '8AM-10PM', website: 'n/a' }
      ]
    },
    {
      id: 'transport',
      title: 'Local Transport',
      icon: <BusFront size={20} className="text-blue-500" />,
      items: [
        { name: 'BlueBird Taxi', contact: '+62 361 701111', note: 'Official metered taxi service', rating: 4.7, priceRange: '$$', website: 'bluebirdgroup.com' },
        { name: 'Gojek/Grab', contact: 'Mobile app', note: 'Ride-hailing services', rating: 4.8, priceRange: '$', website: 'gojek.com / grab.com' },
        { name: 'Ubud Scooter Rental', contact: '+62 812 3456 7890', note: 'Daily rentals available', rating: 4.3, priceRange: '$', openHours: '8AM-6PM', website: 'ubudscooters.com' },
        { name: 'Kura-Kura Bus', contact: '+62 361 4727979', note: 'Shuttle service between tourist areas', rating: 4.0, priceRange: '$', website: 'kura2bus.com' }
      ]
    },
    {
      id: 'dining',
      title: 'Local Dining',
      icon: <Utensils size={20} className="text-amber-500" />,
      items: [
        { 
          name: 'Warung Babi Guling Ibu Oka', 
          distance: '0.5 km', 
          cuisine: 'Balinese', 
          specialty: 'Roast pork', 
          rating: 4.6, 
          priceRange: '$', 
          openHours: '11AM-6PM', 
          website: 'n/a',
          dietaryOptions: ['Non-Vegetarian'] 
        },
        { 
          name: 'Locavore', 
          distance: '1.0 km', 
          cuisine: 'International/Local', 
          specialty: 'Fine dining, reservation required', 
          rating: 4.9, 
          priceRange: '$$$', 
          openHours: '12PM-2PM, 6PM-10PM', 
          website: 'locavore.co.id',
          dietaryOptions: ['Vegetarian', 'Non-Vegetarian', 'Vegan Options'] 
        },
        { 
          name: 'Clear Cafe', 
          distance: '0.7 km', 
          cuisine: 'Healthy/Vegan', 
          specialty: 'Fresh juices and organic food', 
          rating: 4.7, 
          priceRange: '$$', 
          openHours: '8AM-11PM', 
          website: 'clearcafebali.com',
          dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free'] 
        },
        { 
          name: 'Nasi Ayam Kedewatan Ibu Mangku', 
          distance: '2.3 km', 
          cuisine: 'Balinese', 
          specialty: 'Chicken rice', 
          rating: 4.8, 
          priceRange: '$', 
          openHours: '8AM-3PM', 
          website: 'n/a',
          dietaryOptions: ['Non-Vegetarian'] 
        },
        { 
          name: 'Sayuri Healing Food', 
          distance: '1.1 km', 
          cuisine: 'Raw Vegan', 
          specialty: 'Plant-based sushi and desserts', 
          rating: 4.8, 
          priceRange: '$$', 
          openHours: '8AM-9PM', 
          website: 'sayurihealingfood.com',
          dietaryOptions: ['Vegetarian', 'Vegan', 'Raw', 'Gluten-Free'] 
        },
        { 
          name: 'Earth Cafe', 
          distance: '0.6 km', 
          cuisine: 'Vegetarian/Vegan', 
          specialty: 'Buddha bowls and plant-based meals', 
          rating: 4.5, 
          priceRange: '$$', 
          openHours: '8AM-10PM', 
          website: 'earthcafebali.com',
          dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free'] 
        }
      ]
    },
    {
      id: 'attractions',
      title: 'Nearby Attractions',
      icon: <Palette size={20} className="text-pink-500" />,
      items: [
        { name: 'Sacred Monkey Forest', distance: '0.3 km', note: "Don't bring food or shiny items", rating: 4.5, priceRange: '$', openHours: '8:30AM-6PM', website: 'monkeyforestubud.com' },
        { name: 'Ubud Palace', distance: '0.9 km', note: 'Traditional dance performances nightly', rating: 4.3, priceRange: 'Free', openHours: '8AM-7PM', website: 'n/a' },
        { name: 'Campuhan Ridge Walk', distance: '1.5 km', note: 'Best at sunrise/sunset, bring water', rating: 4.8, priceRange: 'Free', openHours: '24/7', website: 'n/a' },
        { name: 'Tegalalang Rice Terraces', distance: '9.5 km', note: 'Iconic terraced rice fields', rating: 4.7, priceRange: '$', openHours: '7AM-6PM', website: 'n/a' }
      ]
    },
    {
      id: 'shopping',
      title: 'Local Shopping',
      icon: <CreditCard size={20} className="text-emerald-500" />,
      items: [
        { name: 'Ubud Traditional Art Market', distance: '0.8 km', note: 'Haggling expected', rating: 4.2, priceRange: '$-$$', openHours: '8AM-6PM', website: 'n/a' },
        { name: 'Threads of Life', distance: '1.2 km', note: 'Traditional textiles, fixed prices', rating: 4.6, priceRange: '$$$', openHours: '10AM-5:30PM', website: 'threadsoflife.com' },
        { name: 'Ubud Organic Farmers Market', distance: '1.5 km', note: 'Saturday mornings only', rating: 4.8, priceRange: '$$', openHours: 'Sat 9AM-2PM', website: 'n/a' }
      ]
    },
    {
      id: 'cultural',
      title: 'Cultural Experiences',
      icon: <Landmark size={20} className="text-violet-500" />,
      items: [
        { name: 'Saraswati Temple', distance: '0.6 km', note: 'Beautiful lotus pond', rating: 4.5, priceRange: 'Free', openHours: '7AM-6PM', website: 'n/a' },
        { name: 'Ubud Traditional Dance', distance: '0.9 km', note: 'Evening performances at Ubud Palace', rating: 4.7, priceRange: '$$', openHours: 'Shows at 7:30PM', website: 'n/a' },
        { name: 'Pura Tirta Empul', distance: '15 km', note: 'Sacred water temple', rating: 4.6, priceRange: '$', openHours: '8AM-6PM', website: 'n/a' }
      ]
    }
  ];

  const travelTools = [
    {
      id: 'translate',
      title: 'Language Translator',
      icon: <Globe size={20} className="text-primary" />,
      description: 'Translate phrases to local languages',
      action: () => setSelectedTab('tools')
    },
    {
      id: 'packing',
      title: 'Packing Checklist',
      icon: <LucideShirt size={20} className="text-emerald-500" />,
      description: "Verify you've packed everything needed",
      action: () => setShowPackingList(!showPackingList)
    },
    {
      id: 'nearby',
      title: 'Nearby Explorer',
      icon: <Compass size={20} className="text-amber-500" />,
      description: 'Discover points of interest around you',
      action: () => {
        setSelectedTab('local');
        toast.info("Opening nearby explorer...");
      }
    },
    {
      id: 'documents',
      title: 'Travel Documents',
      icon: <FileText size={20} className="text-blue-500" />,
      description: 'Access your tickets, bookings & IDs',
      action: () => toast.info("Accessing travel documents...")
    },
    {
      id: 'wifi',
      title: 'WiFi Finder',
      icon: <Wifi size={20} className="text-indigo-500" />,
      description: 'Find reliable WiFi connections nearby',
      action: () => setSelectedTab('tools')
    },
    {
      id: 'expenses',
      title: 'Trip Expenses',
      icon: <CreditCard size={20} className="text-slate-500" />,
      description: 'Track and categorize your spending',
      action: () => toast.info("Opening expense tracker...")
    },
    {
      id: 'customs',
      title: 'Cultural Guide',
      icon: <Landmark size={20} className="text-purple-500" />,
      description: 'Local customs, etiquette & traditions',
      action: () => {
        setSelectedTab('local');
        setActiveLocalTab('cultural');
        toast.info("Opening cultural guide...");
      }
    },
    {
      id: 'photos',
      title: 'Travel Moments',
      icon: <Camera size={20} className="text-pink-500" />,
      description: 'Capture and organize trip photos',
      action: () => toast.info("Opening photo organizer...")
    }
  ];

  const photoSpots = [
    {
      name: "Tegalalang Rice Terraces",
      distance: "11 km",
      bestTime: "Early morning (7-9 AM)",
      tips: "Visit the northern part for fewer tourists"
    },
    {
      name: "Ubud Palace",
      distance: "0.9 km",
      bestTime: "During traditional performances (evening)",
      tips: "Capture the ornate details of the architecture"
    },
    {
      name: "Pura Tirta Empul",
      distance: "15 km",
      bestTime: "8-10 AM before tour groups arrive",
      tips: "Be respectful during religious ceremonies"
    }
  ];

  const localTips = [
    {
      tip: "Bargaining is expected at markets, but do so respectfully. Start at 50% of asking price.",
      category: "shopping"
    },
    {
      tip: "When entering temples, always wear a sarong and sash (often provided at entrance).",
      category: "culture"
    },
    {
      tip: "Avoid drinking tap water. Bottled water is cheap and widely available.",
      category: "health"
    },
    {
      tip: "If invited to a local home, bring a small gift and remove shoes before entering.",
      category: "etiquette"
    },
    {
      tip: "The safest ATMs are those attached to banks. Notify your bank before travel.",
      category: "finance"
    }
  ];

  const travelDocuments = [
    { type: "Flight", title: "Bali Return", reference: "BK123456", date: "Jun 15, 2024" },
    { type: "Hotel", title: "Maya Ubud Resort", reference: "HT789012", date: "Jun 15-22, 2024" },
    { type: "Insurance", title: "Global Cover", reference: "IN345678", date: "Valid until Jun 30" },
    { type: "Visa", title: "Indonesia Visa", reference: "VS901234", date: "Valid until Aug 15" }
  ];

  // List of all dietary options
  const dietaryOptions = ["Vegetarian", "Vegan", "Non-Vegetarian", "Gluten-Free", "Raw"];

  // Toggle dietary filter
  const toggleDietaryOption = (option: string) => {
    if (selectedDietaryOptions.includes(option)) {
      setSelectedDietaryOptions(selectedDietaryOptions.filter(opt => opt !== option));
    } else {
      setSelectedDietaryOptions([...selectedDietaryOptions, option]);
    }
  };

  // Filter local resources based on search query and dietary options
  const filteredResources = localResourceCategories.map(category => {
    if (activeLocalTab !== 'all' && activeLocalTab !== category.id) {
      return null;
    }
    
    let filteredItems = category.items.filter(item => 
      searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.cuisine && item.cuisine.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.specialty && item.specialty.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.note && item.note.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    // Apply dietary filters only for dining category
    if (category.id === 'dining' && selectedDietaryOptions.length > 0) {
      filteredItems = filteredItems.filter(item => 
        item.dietaryOptions && 
        selectedDietaryOptions.some(option => item.dietaryOptions?.includes(option))
      );
    }
    
    return {
      ...category,
      items: filteredItems
    };
  }).filter(Boolean);

  // Function to simulate booking or contact actions
  const handleResourceAction = (resource: LocalResource) => {
    if (resource.contact) {
      toast.success(`Contact info for ${resource.name} copied to clipboard`);
    } else {
      toast.success(`Added ${resource.name} to your saved places`);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <PageHeader 
          tripInfo={tripInfo}
          currentLocation={currentLocation}
          loadingLocation={loadingLocation}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        
        <section className="py-8">
          <div className="container px-4 sm:px-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsContent value="assistant" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <TravelAssistant tripInfo={tripInfo} />
                  <TripInfoSidebar tripInfo={tripInfo} emergencyContacts={emergencyContacts} />
                </div>
              </TabsContent>
              
              <TabsContent value="tools" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <TravelTools 
                    travelTools={travelTools}
                    photoSpots={photoSpots}
                    localTips={localTips}
                  />
                  <TravelDocuments documents={travelDocuments} />
                </div>
              </TabsContent>

              <TabsContent value="emergency" className="mt-0">
                <div className="max-w-5xl mx-auto">
                  <EmergencyContactsEnhanced
                    destination="Bali"
                    country="Indonesia"
                    contacts={[
                      {
                        id: "embassy-us",
                        title: "US Embassy",
                        contact: "+62 21 5083 1000",
                        type: "embassy",
                        icon: <Building size={18} className="text-indigo-500" />
                      },
                      {
                        id: "intl-sos",
                        title: "International SOS",
                        contact: "+62 21 750 6001",
                        type: "medical",
                        icon: <Hospital size={18} className="text-green-500" />
                      }
                    ]}
                  />
                  
                  <div className="text-center py-6 mt-6 bg-red-50 rounded-xl border border-red-100">
                    <AlertCircle size={32} className="mx-auto text-red-500 mb-2" />
                    <h3 className="text-lg font-semibold mb-1">Need more comprehensive emergency assistance?</h3>
                    <p className="text-sm text-muted-foreground mb-4">Access detailed emergency services, medical facilities, and embassy information</p>
                    <Link to="/emergency-assistance">
                      <Button size="lg" variant="destructive" className="font-medium">
                        <AlertCircle size={18} className="mr-2" />
                        Go to Emergency Assistance Center
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="local" className="mt-0">
                <div className="max-w-5xl mx-auto">
                  <div className="glass rounded-xl p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h2 className="text-xl font-medium mb-1 flex items-center">
                          <Compass size={22} className="text-primary mr-2" />
                          Local Resources in Ubud
                        </h2>
                        <p className="text-sm text-muted-foreground">Discover essential services and attractions near you</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <div className="relative w-56">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search local resources..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8"
                          />
                        </div>
                        
                        <div className="flex">
                          <Button
                            variant="outline"
                            size="icon"
                            className={`rounded-r-none ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : ''}`}
                            onClick={() => setViewMode('list')}
                          >
                            <Search size={18} />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className={`rounded-l-none ${viewMode === 'map' ? 'bg-primary text-primary-foreground' : ''}`}
                            onClick={() => {
                              setViewMode('map');
                              toast.info("Map view is available in the full version");
                            }}
                          >
                            <MapPin size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <Tabs value={activeLocalTab} onValueChange={setActiveLocalTab}>
                        <TabsList className="w-full flex flex-wrap">
                          <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                          {localResourceCategories.map((category) => (
                            <TabsTrigger key={category.id} value={category.id} className="flex-1 flex items-center">
                              {category.icon}
                              <span className="ml-1 hidden sm:inline">{category.title}</span>
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </Tabs>
                    </div>
                    
                    {/* Dietary filters - show only when dining tab is active */}
                    {(activeLocalTab === 'dining' || activeLocalTab === 'all') && (
                      <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <h3 className="text-sm font-medium mb-2 flex items-center">
                          <Utensils size={16} className="text-amber-500 mr-2" />
                          Dietary Preferences
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {dietaryOptions.map(option => (
                            <Badge 
                              key={option} 
                              variant={selectedDietaryOptions.includes(option) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => toggleDietaryOption(option)}
                            >
                              {option}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-6">
                      {filteredResources.length > 0 ? (
                        filteredResources.map((category) => (
                          <div key={category.id} className="space-y-3">
                            <h3 className="flex items-center text-lg font-medium">
                              {category.icon}
                              <span className="ml-2">{category.title}</span>
                            </h3>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {category.items.map((item, idx) => (
                                <div key={idx} className="p-4 bg-card rounded-lg border border-border/40 hover:border-primary/50 transition-colors">
                                  <div className="flex justify-between items-start">
                                    <h4 className="font-medium">{item.name}</h4>
                                    {'distance' in item && <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{item.distance}</span>}
                                  </div>
                                  
                                  {'rating' in item && (
                                    <div className="flex items-center mt-1">
                                      <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                          <span key={i} className={`text-xs ${i < Math.floor(item.rating) ? 'text-amber-400' : 'text-muted'}`}>★</span>
                                        ))}
                                      </div>
                                      <span className="text-xs ml-1">{item.rating}</span>
                                      {'priceRange' in item && <span className="text-xs ml-2 text-muted-foreground">{item.priceRange}</span>}
                                    </div>
                                  )}
                                  
                                  {'openHours' in item && <p className="text-xs mt-1 flex items-center"><Calendar size={12} className="mr-1" /> {item.openHours}</p>}
                                  {'contact' in item && <p className="text-sm mt-1 text-primary">{item.contact}</p>}
                                  {'cuisine' in item && <p className="text-xs mt-1 text-muted-foreground">Cuisine: {item.cuisine}</p>}
                                  {'specialty' in item && <p className="text-xs mt-1 text-muted-foreground">Specialty: {item.specialty}</p>}
                                  {'note' in item && <p className="text-xs mt-1 text-muted-foreground">{item.note}</p>}
                                  
                                  {/* Dietary tags for restaurants */}
                                  {item.dietaryOptions && (
                                    <div className="mt-1 flex flex-wrap gap-1">
                                      {item.dietaryOptions.map(option => (
                                        <span 
                                          key={option} 
                                          className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                            option === 'Vegetarian' ? 'bg-green-100 text-green-800' :
                                            option === 'Vegan' ? 'bg-emerald-100 text-emerald-800' :
                                            option === 'Non-Vegetarian' ? 'bg-red-100 text-red-800' :
                                            option === 'Gluten-Free' ? 'bg-blue-100 text-blue-800' :
                                            'bg-purple-100 text-purple-800'
                                          }`}
                                        >
                                          {option}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                  
                                  <div className="mt-3 pt-2 border-t border-border/30 flex justify-between">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="text-xs"
                                      onClick={() => handleResourceAction(item)}
                                    >
                                      {item.contact ? 'Contact' : 'Save'}
                                    </Button>
                                    
                                    {'website' in item && item.website !== 'n/a' && (
                                      <Button 
                                        variant="link" 
                                        size="sm" 
                                        className="text-xs"
                                        onClick={() => toast.success(`Opening website for ${item.name}`)}
                                      >
                                        Website
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <HelpCircle size={48} className="mx-auto text-muted-foreground/50" />
                          <h3 className="mt-4 text-lg font-medium">No results found</h3>
                          <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
                          <Button onClick={() => {setSearchQuery(''); setActiveLocalTab('all'); setSelectedDietaryOptions([]);}} className="mt-4">
                            Reset filters
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="glass rounded-xl p-6">
                    <h2 className="text-xl font-medium mb-4 flex items-center">
                      <UserCheck size={20} className="text-primary mr-2" />
                      Cultural Tips for Bali
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-medium text-base">Temple Etiquette</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check size={16} className="mt-0.5 mr-2 text-green-500" />
                            <span className="text-sm">Wear a sarong and sash (usually available for rent or loan)</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="mt-0.5 mr-2 text-green-500" />
                            <span className="text-sm">Remove shoes before entering temple buildings</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="mt-0.5 mr-2 text-green-500" />
                            <span className="text-sm">Women should not enter temples during menstruation (Balinese custom)</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="mt-0.5 mr-2 text-green-500" />
                            <span className="text-sm">Never sit higher than the shrine or walk in front of people praying</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-medium text-base">Local Customs</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check size={16} className="mt-0.5 mr-2 text-green-500" />
                            <span className="text-sm">Use right hand for giving or receiving things</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="mt-0.5 mr-2 text-green-500" />
                            <span className="text-sm">Remove shoes when entering someone's home</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="mt-0.5 mr-2 text-green-500" />
                            <span className="text-sm">Dress modestly away from beach areas, especially in villages</span>
                          </li>
                          <li className="flex items-start">
                            <Check size={16} className="mt-0.5 mr-2 text-green-500" />
                            <span className="text-sm">Don't touch people's heads (considered sacred in Balinese culture)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-medium text-base mb-2">Local Phrases</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="text-sm">
                          <p className="font-medium">Hello</p>
                          <p className="text-muted-foreground">Om Swastiastu</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Thank you</p>
                          <p className="text-muted-foreground">Terima kasih</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Yes/No</p>
                          <p className="text-muted-foreground">Ya/Tidak</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Excuse me</p>
                          <p className="text-muted-foreground">Permisi</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">How much?</p>
                          <p className="text-muted-foreground">Berapa harganya?</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Delicious</p>
                          <p className="text-muted-foreground">Enak</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={() => setSelectedTab('tools')} className="w-full mt-6">
                      Open Language Translator
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default OnTripAssistancePage;
