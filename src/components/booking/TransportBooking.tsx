
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Train, 
  Bus, 
  Car, 
  Calendar as CalendarIcon, 
  Search, 
  ArrowRightLeft,
  Ship,
  Clock,
  Users,
  Sparkles,
  Wifi,
  AirVent,
  Route,
  BatteryCharging,
  Luggage,
  Shield,
  Star,
  Clock3,
  ChevronDown,
  ChevronUp,
  MapPin,
  Zap,
  Filter
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function TransportBooking() {
  const [transportType, setTransportType] = useState('train');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState('1');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  // Swap origin and destination
  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
    toast('Locations swapped', {
      description: 'Origin and destination have been swapped',
      icon: <ArrowRightLeft className="h-4 w-4" />,
    });
  };

  const handleSearch = () => {
    if (!fromLocation || !toLocation || !date) {
      toast('Please fill all required fields', {
        description: 'Origin, destination and date are required to search for transport options',
      });
      return;
    }

    toast('Amazing! Searching for the best options...', {
      description: `Looking for ${transportType} options from ${fromLocation} to ${toLocation} on ${format(date, 'PPP')}`,
      icon: <Sparkles className="h-5 w-5 text-amber-400" />,
    });
    
    // Simulate loading state and show results
    setTimeout(() => {
      setShowResults(true);
      toast('Great deals found!', {
        description: `We found 8 ${transportType} options with savings up to 35%!`,
        icon: <Sparkles className="h-5 w-5 text-green-500" />,
      });
    }, 1500);
  };

  const resetSearch = () => {
    setShowResults(false);
  };

  const getTransportIcon = () => {
    switch(transportType) {
      case 'train': return <Train className="h-5 w-5" />;
      case 'bus': return <Bus className="h-5 w-5" />;
      case 'car': return <Car className="h-5 w-5" />;
      case 'ferry': return <Ship className="h-5 w-5" />;
      default: return <Train className="h-5 w-5" />;
    }
  };

  // Mock search results based on transport type
  const getSearchResults = () => {
    switch(transportType) {
      case 'train':
        return [
          {
            id: 1,
            operator: 'Express Railways',
            departure: '07:30',
            arrival: '10:45',
            duration: '3h 15m',
            price: '₹2,199',
            features: ['WiFi', 'Power Outlets', 'Snacks'],
            discount: '28% OFF',
            recommended: true,
            class: 'AC Chair Car',
            logoUrl: 'https://cdn-icons-png.flaticon.com/512/1034/1034698.png'
          },
          {
            id: 2,
            operator: 'National Rail',
            departure: '09:15',
            arrival: '12:45',
            duration: '3h 30m',
            price: '₹1,899',
            features: ['WiFi', 'Power Outlets'],
            discount: '15% OFF',
            recommended: false,
            class: 'Sleeper',
            logoUrl: 'https://cdn-icons-png.flaticon.com/512/2164/2164667.png'
          },
          {
            id: 3,
            operator: 'Intercity Express',
            departure: '12:00',
            arrival: '15:10',
            duration: '3h 10m',
            price: '₹2,450',
            features: ['Premium Seating', 'WiFi', 'Meals', 'Power Outlets'],
            discount: '10% OFF',
            recommended: false,
            class: 'Executive Chair',
            logoUrl: 'https://cdn-icons-png.flaticon.com/512/564/564661.png'
          },
          {
            id: 4,
            operator: 'Speed Railways',
            departure: '16:30',
            arrival: '19:45',
            duration: '3h 15m',
            price: '₹1,750',
            features: ['WiFi', 'Power Outlets'],
            discount: '35% OFF',
            recommended: false,
            class: 'AC Chair Car',
            logoUrl: 'https://cdn-icons-png.flaticon.com/512/3069/3069537.png'
          }
        ];
      case 'bus':
        return [
          {
            id: 1,
            operator: 'Luxury Express',
            departure: '07:30',
            arrival: '12:00',
            duration: '4h 30m',
            price: '₹1,499',
            features: ['WiFi', 'USB Charging', 'Water Bottle'],
            discount: '25% OFF',
            recommended: true,
            class: 'Volvo AC Sleeper',
            logoUrl: 'https://cdn-icons-png.flaticon.com/512/3392/3392377.png'
          },
          {
            id: 2,
            operator: 'City Connect',
            departure: '08:45',
            arrival: '13:30',
            duration: '4h 45m',
            price: '₹1,299',
            features: ['WiFi', 'USB Charging'],
            discount: '18% OFF',
            recommended: false,
            class: 'AC Seater',
            logoUrl: 'https://cdn-icons-png.flaticon.com/512/2554/2554892.png'
          },
          {
            id: 3,
            operator: 'Royal Travels',
            departure: '12:30',
            arrival: '17:00',
            duration: '4h 30m',
            price: '₹1,650',
            features: ['AC', 'Sleeper Berths', 'Snacks', 'Charging'],
            discount: '15% OFF',
            recommended: false,
            class: 'Premium Sleeper',
            logoUrl: 'https://cdn-icons-png.flaticon.com/512/3242/3242257.png'
          },
          {
            id: 4,
            operator: 'Highway Express',
            departure: '19:00',
            arrival: '23:30',
            duration: '4h 30m',
            price: '₹1,199',
            features: ['WiFi', 'USB Charging', 'Blankets'],
            discount: '30% OFF',
            recommended: false,
            class: 'AC Sleeper',
            logoUrl: 'https://cdn-icons-png.flaticon.com/512/8152/8152684.png'
          }
        ];
      case 'car':
        return [
          {
            id: 1,
            operator: 'Prime Rentals',
            departure: 'Flexible',
            arrival: 'Flexible',
            duration: 'Unlimited',
            price: '₹2,999/day',
            features: ['AC', 'Automatic', 'Insurance', 'Unlimited KMs'],
            discount: '20% OFF',
            recommended: true,
            class: 'Compact SUV',
            logoUrl: 'https://cdn-icons-png.flaticon.com/512/744/744465.png'
          },
          {
            id: 2,
            operator: 'City Drive',
            departure: 'Flexible',
            arrival: 'Flexible',
            duration: 'Unlimited',
            price: '₹2,499/day',
            features: ['AC', 'Manual', 'Insurance'],
            discount: '15% OFF',
            recommended: false,
            class: 'Sedan',
            logoUrl: 'https://cdn-icons-png.flaticon.com/512/5545/5545983.png'
          },
          {
            id: 3,
            operator: 'Luxury Wheels',
            departure: 'Flexible',
            arrival: 'Flexible',
            duration: 'Unlimited',
            price: '₹4,499/day',
            features: ['AC', 'Automatic', 'Premium Interior', 'Insurance', 'Unlimited KMs'],
            discount: '10% OFF',
            recommended: false,
            class: 'Premium Sedan',
            logoUrl: 'https://cdn-icons-png.flaticon.com/512/1048/1048313.png'
          },
          {
            id: 4,
            operator: 'Economy Cars',
            departure: 'Flexible',
            arrival: 'Flexible',
            duration: 'Unlimited',
            price: '₹1,799/day',
            features: ['AC', 'Manual', 'Basic Insurance'],
            discount: '25% OFF',
            recommended: false,
            class: 'Hatchback',
            logoUrl: 'https://cdn-icons-png.flaticon.com/512/3097/3097180.png'
          }
        ];
      case 'ferry':
        return [
          {
            id: 1,
            operator: 'Ocean Express',
            departure: '09:00',
            arrival: '12:30',
            duration: '3h 30m',
            price: '₹2,899',
            features: ['Premium Deck', 'Cafeteria', 'Scenic Views'],
            discount: '15% OFF',
            recommended: true,
            class: 'Premium Cabin',
            logoUrl: 'https://cdn-icons-png.flaticon.com/512/3209/3209073.png'
          },
          {
            id: 2,
            operator: 'Island Link',
            departure: '11:30',
            arrival: '14:45',
            duration: '3h 15m',
            price: '₹2,499',
            features: ['Standard Deck', 'Cafeteria'],
            discount: '20% OFF',
            recommended: false,
            class: 'Standard Cabin',
            logoUrl: 'https://cdn-icons-png.flaticon.com/512/1295/1295093.png'
          },
          {
            id: 3,
            operator: 'Sea Voyager',
            departure: '15:00',
            arrival: '18:30',
            duration: '3h 30m',
            price: '₹3,450',
            features: ['VIP Lounge', 'Fine Dining', 'Entertainment'],
            discount: '10% OFF',
            recommended: false,
            class: 'Deluxe Cabin',
            logoUrl: 'https://cdn-icons-png.flaticon.com/512/3136/3136525.png'
          },
          {
            id: 4,
            operator: 'Bay Cruiser',
            departure: '18:00',
            arrival: '21:15',
            duration: '3h 15m',
            price: '₹2,199',
            features: ['Standard Deck', 'Cafeteria', 'Luggage Assistance'],
            discount: '30% OFF',
            recommended: false,
            class: 'Economy Cabin',
            logoUrl: 'https://cdn-icons-png.flaticon.com/512/2271/2271062.png'
          }
        ];
      default:
        return [];
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
          <CardTitle className="text-2xl flex items-center gap-2">
            {getTransportIcon()}
            <span>Transportation Booking</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="search-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Tabs defaultValue="train" value={transportType} onValueChange={setTransportType}>
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="train" className="flex items-center gap-2">
                      <Train className="h-4 w-4" />
                      <span>Train</span>
                    </TabsTrigger>
                    <TabsTrigger value="bus" className="flex items-center gap-2">
                      <Bus className="h-4 w-4" />
                      <span>Bus</span>
                    </TabsTrigger>
                    <TabsTrigger value="car" className="flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      <span>Car Rental</span>
                    </TabsTrigger>
                    <TabsTrigger value="ferry" className="flex items-center gap-2">
                      <Ship className="h-4 w-4" />
                      <span>Ferry</span>
                    </TabsTrigger>
                  </TabsList>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="roundtrip" 
                          checked={isRoundTrip}
                          onCheckedChange={(checked) => setIsRoundTrip(checked === true)}
                        />
                        <Label htmlFor="roundtrip" className="text-sm cursor-pointer">Round Trip</Label>
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="ml-auto"
                      >
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowPromo(!showPromo)}
                          className="text-xs gap-1"
                        >
                          <Sparkles className="h-3 w-3 text-amber-500" />
                          {showPromo ? 'Hide Promo Code' : 'Add Promo Code'}
                        </Button>
                      </motion.div>
                    </div>

                    {showPromo && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mb-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="promo">Promo Code</Label>
                          <div className="flex gap-2">
                            <Input 
                              id="promo" 
                              placeholder="Enter promo code" 
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              className="flex-1"
                            />
                            <Button 
                              onClick={() => {
                                if (promoCode) {
                                  toast('Promo applied!', {
                                    description: 'You got 15% off your booking',
                                    icon: <Sparkles className="h-4 w-4 text-amber-500" />,
                                  });
                                } else {
                                  toast('Please enter a promo code');
                                }
                              }}
                            >
                              Apply
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="from">From</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="from" 
                            placeholder={transportType === 'car' ? 'Pickup location' : 'Origin station/city'} 
                            value={fromLocation}
                            onChange={(e) => setFromLocation(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            type="button" 
                            size="icon"
                            variant="secondary"
                            onClick={handleSwapLocations}
                            className="rounded-full h-8 w-8 shadow-md"
                          >
                            <ArrowRightLeft className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="to">To</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="to" 
                            placeholder={transportType === 'car' ? 'Drop-off location' : 'Destination station/city'} 
                            value={toLocation}
                            onChange={(e) => setToLocation(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">
                          {isRoundTrip ? 'Departure Date' : 'Date'}
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Select a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 pointer-events-auto">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      {isRoundTrip ? (
                        <div className="space-y-2">
                          <Label htmlFor="returnDate">Return Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="returnDate"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !returnDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {returnDate ? format(returnDate, "PPP") : "Select return date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 pointer-events-auto">
                              <Calendar
                                mode="single"
                                selected={returnDate}
                                onSelect={setReturnDate}
                                initialFocus
                                disabled={(date) => date < (new Date() || this?.date)}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label htmlFor="passengers">
                            {transportType === 'car' ? 'Number of days' : 'Passengers'}
                          </Label>
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="passengers" 
                              type="number" 
                              min="1" 
                              value={passengers}
                              onChange={(e) => setPassengers(e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Conditional features based on transport type */}
                    {transportType === 'train' && (
                      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-4 mt-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="direct-only" />
                          <Label htmlFor="direct-only" className="text-sm cursor-pointer flex items-center gap-1">
                            <Route className="h-3 w-3" /> Direct only
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="high-speed" />
                          <Label htmlFor="high-speed" className="text-sm cursor-pointer">High-speed</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="wifi-train" />
                          <Label htmlFor="wifi-train" className="text-sm cursor-pointer flex items-center gap-1">
                            <Wifi className="h-3 w-3" /> WiFi
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="power" />
                          <Label htmlFor="power" className="text-sm cursor-pointer flex items-center gap-1">
                            <BatteryCharging className="h-3 w-3" /> Power outlets
                          </Label>
                        </div>
                      </div>
                    )}

                    {transportType === 'bus' && (
                      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-4 mt-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="wifi" />
                          <Label htmlFor="wifi" className="text-sm cursor-pointer flex items-center gap-1">
                            <Wifi className="h-3 w-3" /> WiFi onboard
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="direct-bus" />
                          <Label htmlFor="direct-bus" className="text-sm cursor-pointer flex items-center gap-1">
                            <Route className="h-3 w-3" /> Direct route
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="power-bus" />
                          <Label htmlFor="power-bus" className="text-sm cursor-pointer flex items-center gap-1">
                            <BatteryCharging className="h-3 w-3" /> Power outlets
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="overnight" />
                          <Label htmlFor="overnight" className="text-sm cursor-pointer flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Overnight
                          </Label>
                        </div>
                      </div>
                    )}

                    {transportType === 'car' && (
                      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-4 mt-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="automatic" />
                          <Label htmlFor="automatic" className="text-sm cursor-pointer">Automatic</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="air-conditioning" />
                          <Label htmlFor="air-conditioning" className="text-sm cursor-pointer flex items-center gap-1">
                            <AirVent className="h-3 w-3" /> Air conditioning
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="unlimited-mileage" />
                          <Label htmlFor="unlimited-mileage" className="text-sm cursor-pointer">Unlimited mileage</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="insurance" />
                          <Label htmlFor="insurance" className="text-sm cursor-pointer flex items-center gap-1">
                            <Shield className="h-3 w-3" /> Full insurance
                          </Label>
                        </div>
                      </div>
                    )}

                    {transportType === 'ferry' && (
                      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-4 mt-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="with-vehicle" />
                          <Label htmlFor="with-vehicle" className="text-sm cursor-pointer">With vehicle</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="high-speed-ferry" />
                          <Label htmlFor="high-speed-ferry" className="text-sm cursor-pointer">High-speed service</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="premium-seating" />
                          <Label htmlFor="premium-seating" className="text-sm cursor-pointer">Premium seating</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="meal-included" />
                          <Label htmlFor="meal-included" className="text-sm cursor-pointer">Meal included</Label>
                        </div>
                      </div>
                    )}

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6"
                    >
                      <Button 
                        className="w-full text-lg font-medium bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg" 
                        size="lg"
                        onClick={handleSearch}
                      >
                        <Search className="mr-2 h-5 w-5" />
                        Find Best {transportType === 'train' ? 'Trains' : 
                                   transportType === 'bus' ? 'Buses' : 
                                   transportType === 'car' ? 'Cars' : 'Ferries'}
                      </Button>
                    </motion.div>
                    
                    <div className="pt-4 text-center text-xs text-muted-foreground">
                      <p>By searching, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span></p>
                    </div>
                  </div>
                </Tabs>
              </motion.div>
            ) : (
              <motion.div
                key="search-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-medium">
                      {getTransportIcon()} {transportType === 'train' ? 'Trains' : 
                                           transportType === 'bus' ? 'Buses' : 
                                           transportType === 'car' ? 'Car Rentals' : 'Ferries'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {fromLocation} to {toLocation} • {format(date!, 'PPP')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => setShowFilters(!showFilters)}>
                      <Filter className="h-4 w-4 mr-1" /> 
                      Filters {showFilters ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={resetSearch}>
                      Modify Search
                    </Button>
                  </div>
                </div>

                {showFilters && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-muted/30 p-4 rounded-lg mb-4"
                  >
                    <div className="flex flex-wrap gap-4 justify-between items-center">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Sort by</h4>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant={sortBy === 'recommended' ? 'default' : 'outline'}
                            onClick={() => setSortBy('recommended')}
                          >
                            <Star className="h-3 w-3 mr-1" /> Recommended
                          </Button>
                          <Button 
                            size="sm" 
                            variant={sortBy === 'price' ? 'default' : 'outline'}
                            onClick={() => setSortBy('price')}
                          >
                            Price
                          </Button>
                          <Button 
                            size="sm" 
                            variant={sortBy === 'duration' ? 'default' : 'outline'}
                            onClick={() => setSortBy('duration')}
                          >
                            <Clock3 className="h-3 w-3 mr-1" /> Duration
                          </Button>
                          <Button 
                            size="sm" 
                            variant={sortBy === 'departure' ? 'default' : 'outline'}
                            onClick={() => setSortBy('departure')}
                          >
                            Departure
                          </Button>
                        </div>
                      </div>

                      {transportType === 'train' && (
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                            AC Chair Car
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                            Sleeper
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                            Executive
                          </Badge>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                <div className="space-y-4">
                  {getSearchResults().map((result) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "border rounded-lg overflow-hidden relative",
                        result.recommended ? "border-primary/30 shadow-md bg-primary/5" : "border-border"
                      )}
                    >
                      {result.recommended && (
                        <div className="absolute top-0 right-0">
                          <Badge className="rounded-tl-none rounded-br-none rounded-tr-md bg-primary text-primary-foreground gap-1">
                            <Star className="h-3 w-3 fill-primary-foreground" /> Best Value
                          </Badge>
                        </div>
                      )}
                      
                      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3 min-w-[140px]">
                          <div className="w-10 h-10 bg-muted/40 rounded-full flex items-center justify-center">
                            <img src={result.logoUrl} alt={result.operator} className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-medium">{result.operator}</h4>
                            <p className="text-xs text-muted-foreground">{result.class}</p>
                          </div>
                        </div>
                        
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-lg font-medium">{result.departure}</p>
                            <p className="text-xs text-muted-foreground">Departure</p>
                          </div>
                          
                          <div className="flex flex-col items-center justify-center">
                            <div className="text-xs text-muted-foreground mb-1">{result.duration}</div>
                            <div className="relative w-full flex items-center">
                              <div className="h-[2px] bg-border flex-1"></div>
                              {transportType === 'train' && <Train className="h-3 w-3 text-muted-foreground mx-1" />}
                              {transportType === 'bus' && <Bus className="h-3 w-3 text-muted-foreground mx-1" />}
                              {transportType === 'ferry' && <Ship className="h-3 w-3 text-muted-foreground mx-1" />}
                              {transportType === 'car' && (
                                <div className="px-2 py-0.5 rounded-full bg-muted/50 text-[10px]">Unlimited</div>
                              )}
                              <div className="h-[2px] bg-border flex-1"></div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-lg font-medium">{result.arrival}</p>
                            <p className="text-xs text-muted-foreground">Arrival</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2 min-w-[100px]">
                          <div>
                            <div className="flex items-center justify-end">
                              <p className="text-xl font-bold">{result.price}</p>
                              {result.discount && (
                                <Badge variant="outline" className="ml-2 text-green-600 border-green-200 bg-green-50">
                                  {result.discount}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground text-right">
                              {transportType === 'car' ? 'per day' : 'per person'}
                            </p>
                          </div>
                          <Button className="w-full">Select</Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="px-4 py-2 flex flex-wrap items-center gap-2">
                        {result.features.map((feature, i) => (
                          <Badge key={i} variant="secondary" className="gap-1 bg-muted/50 hover:bg-muted">
                            {feature === 'WiFi' && <Wifi className="h-3 w-3" />}
                            {feature === 'Power Outlets' && <BatteryCharging className="h-3 w-3" />}
                            {feature === 'USB Charging' && <BatteryCharging className="h-3 w-3" />}
                            {feature === 'AC' && <AirVent className="h-3 w-3" />}
                            {feature === 'Premium Seating' && <Star className="h-3 w-3" />}
                            {feature === 'Premium Deck' && <Star className="h-3 w-3" />}
                            {feature === 'Unlimited KMs' && <Zap className="h-3 w-3" />}
                            {feature === 'Insurance' && <Shield className="h-3 w-3" />}
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
