import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Star, MapPin, Calendar, DollarSign, Plane, AlertCircle, Lock, Clock3, Compass, Camera, Globe, Eye, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function MysteryTrip() {
  const [budget, setBudget] = useState(1000);
  const [duration, setDuration] = useState('weekend');
  const [adventureLevel, setAdventureLevel] = useState('moderate');
  const [step, setStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [destinationRevealed, setDestinationRevealed] = useState(false);
  const [showExclusiveOffer, setShowExclusiveOffer] = useState(false);
  const [countdown, setCountdown] = useState(3);
  
  // Mystery trip destinations based on preferences
  const destinations = {
    weekend: {
      budget: {
        low: { name: "Charleston", country: "USA", image: "https://images.unsplash.com/photo-1623608103477-2b90432a3f85?q=80&w=1080&auto=format&fit=crop" },
        medium: { name: "Montreal", country: "Canada", image: "https://images.unsplash.com/photo-1519178614-68673b201f36?q=80&w=1080&auto=format&fit=crop" },
        high: { name: "Bermuda", country: "Atlantic Ocean", image: "https://images.unsplash.com/photo-1584558627374-247f6e3cba13?q=80&w=1080&auto=format&fit=crop" }
      }
    },
    week: {
      budget: {
        low: { name: "Lisbon", country: "Portugal", image: "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?q=80&w=1080&auto=format&fit=crop" },
        medium: { name: "Costa Rica", country: "Central America", image: "https://images.unsplash.com/photo-1536708880921-03a9306ec47d?q=80&w=1080&auto=format&fit=crop" },
        high: { name: "Bora Bora", country: "French Polynesia", image: "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?q=80&w=1080&auto=format&fit=crop" }
      }
    }
  };
  
  // Determine budget level based on amount
  const getBudgetLevel = () => {
    if (budget < 800) return "low";
    if (budget < 1800) return "medium";
    return "high";
  };
  
  // Get destination based on preferences
  const getDestination = () => {
    const budgetLevel = getBudgetLevel();
    return destinations[duration as keyof typeof destinations].budget[budgetLevel as keyof typeof destinations.weekend.budget];
  };
  
  useEffect(() => {
    if (isRevealing && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isRevealing && countdown === 0) {
      setDestinationRevealed(true);
      setIsRevealing(false);
      toast.success("Destination revealed!", {
        description: `Your mystery trip will take you to ${getDestination().name}, ${getDestination().country}!`,
      });
    }
  }, [isRevealing, countdown]);
  
  // Show exclusive offer after 10 seconds of booking
  useEffect(() => {
    if (bookingComplete) {
      const timer = setTimeout(() => {
        setShowExclusiveOffer(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [bookingComplete]);
  
  const handleBudgetChange = (value: number[]) => {
    setBudget(value[0]);
  };
  
  const handleBookNow = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      toast.success("Mystery trip booked!", {
        description: "Your adventure awaits! Location will be revealed 3 days before departure."
      });
      setBookingComplete(true);
    }
  };
  
  const handleRevealNow = () => {
    setIsRevealing(true);
    setCountdown(3);
  };
  
  const resetForm = () => {
    setBudget(1000);
    setDuration('weekend');
    setAdventureLevel('moderate');
    setStep(1);
    setBookingComplete(false);
    setDestinationRevealed(false);
    setShowExclusiveOffer(false);
  };
  
  const formatBudget = (value: number) => {
    return `$${value}`;
  };
  
  const budgetLabels = {
    500: 'Budget',
    1500: 'Standard',
    3000: 'Luxury'
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const getDestinationHint = () => {
    if (duration === 'weekend' && budget < 1000) {
      return "A charming historic city with cobblestone streets and southern hospitality";
    } else if (duration === 'weekend' && budget >= 1000 && budget < 2000) {
      return "A vibrant city with European charm and amazing food scene";
    } else if (duration === 'weekend' && budget >= 2000) {
      return "A pristine island paradise with pink sand beaches";
    } else if (duration === 'week' && budget < 1000) {
      return "A colorful European coastal city with rich history and amazing seafood";
    } else if (duration === 'week' && budget >= 1000 && budget < 2000) {
      return "A lush tropical paradise with rainforests and stunning beaches";
    } else {
      return "A bucket-list island destination with crystal clear lagoons";
    }
  };
  
  const getDepartureDate = () => {
    const now = new Date();
    const departureDate = new Date(now);
    departureDate.setDate(now.getDate() + 14); // Two weeks from now
    return departureDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };
  
  const getRevealDate = () => {
    const now = new Date();
    const revealDate = new Date(now);
    revealDate.setDate(now.getDate() + 11); // 11 days from now (3 days before departure)
    return revealDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };
  
  // Feature highlight cards
  const renderFeatureCards = () => {
    const features = [
      {
        icon: <Globe className="h-5 w-5 text-primary" />,
        title: "Handpicked Destinations",
        description: "Our travel experts select amazing locations based on your preferences"
      },
      {
        icon: <Ticket className="h-5 w-5 text-primary" />,
        title: "All-Inclusive Package",
        description: "Flights, accommodations, and essential activities all arranged for you"
      },
      {
        icon: <Camera className="h-5 w-5 text-primary" />,
        title: "Photo Moments Guide",
        description: "Receive a guide to the best photo opportunities at your mystery location"
      },
      {
        icon: <Compass className="h-5 w-5 text-primary" />,
        title: "Local Insider Tips",
        description: "Get exclusive recommendations from locals at your destination"
      }
    ];
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="bg-primary/5 rounded-lg p-4 border border-primary/10"
          >
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3">{feature.icon}</div>
              <div>
                <h4 className="font-medium text-sm">{feature.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };
  
  const renderStepContent = () => {
    if (bookingComplete) {
      return (
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
          className="text-center py-6"
        >
          <div className="mb-8 relative mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Gift size={40} className="text-primary" />
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-primary"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </div>
          <h3 className="text-2xl font-bold mb-2">Your Mystery Trip is Booked!</h3>
          <p className="text-muted-foreground mb-6">
            Get ready for an unforgettable adventure. We'll handle everything - you just need to pack and enjoy!
          </p>
          
          {!destinationRevealed && (
            <div className="mb-6">
              <AnimatePresence>
                {isRevealing ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center p-6 bg-primary/5 rounded-xl border border-primary/10"
                  >
                    <Sparkles className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Revealing Your Destination</h3>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto my-4 text-2xl font-bold">
                      {countdown}
                    </div>
                    <p className="text-sm text-muted-foreground">Get ready for the big reveal!</p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Button
                      variant="outline"
                      className="bg-gradient-to-r from-primary/80 to-purple-500/80 text-white hover:from-primary hover:to-purple-500 transition-all duration-300 shadow-md hover:shadow-lg border-none"
                      onClick={handleRevealNow}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Reveal Destination Now
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Can't wait? Reveal your destination now!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          
          <div className="space-y-4 max-w-md mx-auto">
            {/* Destination card shown only when revealed */}
            {destinationRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-primary/5 to-purple-500/5 p-4 rounded-lg border border-primary/10 mb-6"
              >
                <h4 className="font-medium mb-3 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  Your Mystery Destination
                </h4>
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <img 
                    src={getDestination().image} 
                    alt={getDestination().name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{getDestination().name}, {getDestination().country}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Get ready for an amazing adventure in this spectacular destination!
                </p>
                <Button className="w-full" size="sm">
                  View Destination Guide
                </Button>
              </motion.div>
            )}
          
            <div className="bg-background p-4 rounded-lg border border-border">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium">Departure Date</h4>
                  <p className="text-muted-foreground">{getDepartureDate()}</p>
                </div>
              </div>
            </div>
            
            {!destinationRevealed && (
              <div className="bg-background p-4 rounded-lg border border-border">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium">Mystery Location</h4>
                    <p className="text-muted-foreground">Will be revealed on {getRevealDate()}</p>
                    <p className="text-xs mt-1">Hint: {getDestinationHint()}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-background p-4 rounded-lg border border-border">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium">Budget</h4>
                  <p className="text-muted-foreground">${budget} ({duration === 'weekend' ? '3 days' : '7 days'})</p>
                </div>
              </div>
            </div>
          </div>
          
          {renderFeatureCards()}
          
          {/* Exclusive offer that appears after delay */}
          <AnimatePresence>
            {showExclusiveOffer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-lg border border-amber-500/20"
              >
                <div className="flex items-center mb-2">
                  <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
                  <h4 className="font-medium text-amber-700 dark:text-amber-400">Exclusive Offer</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Upgrade to our VIP package for just $199 more and enjoy premium accommodations, private transfers, and a surprise welcome gift!
                </p>
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm" className="border-amber-500/30 text-amber-700 dark:text-amber-400 hover:bg-amber-500/10">
                    Learn More
                  </Button>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                    Upgrade Now
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button onClick={resetForm} className="mt-8">
            Book Another Mystery Trip
          </Button>
        </motion.div>
      );
    }
    
    switch (step) {
      case 1:
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeIn}>
              <label className="text-base font-medium mb-2 block">
                How much do you want to spend?
              </label>
              <div className="mb-8">
                <Slider
                  value={[budget]}
                  min={500}
                  max={3000}
                  step={100}
                  onValueChange={handleBudgetChange}
                  className="my-6"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  {Object.entries(budgetLabels).map(([value, label]) => (
                    <div key={value} className="text-center">
                      <div className={cn(
                        "w-1 h-1 rounded-full mx-auto mb-1",
                        budget >= parseInt(value) ? "bg-primary" : "bg-muted"
                      )} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-4">
                  <span className="text-xl font-bold">{formatBudget(budget)}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <label className="text-base font-medium mb-4 block">
                How long do you want to travel?
              </label>
              <RadioGroup 
                value={duration} 
                onValueChange={setDuration}
                className="flex flex-col space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekend" id="weekend" />
                  <Label htmlFor="weekend" className="cursor-pointer">
                    Weekend Getaway (3 days)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="week" id="week" />
                  <Label htmlFor="week" className="cursor-pointer">
                    Week-long Adventure (7 days)
                  </Label>
                </div>
              </RadioGroup>
            </motion.div>
            
            <Button 
              onClick={handleBookNow} 
              className="w-full"
            >
              Continue
            </Button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeIn}>
              <label className="text-base font-medium mb-4 block">
                What's your adventure level?
              </label>
              <RadioGroup 
                value={adventureLevel} 
                onValueChange={setAdventureLevel}
                className="flex flex-col space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="relaxed" id="relaxed" />
                  <Label htmlFor="relaxed" className="cursor-pointer">
                    Relaxed (Beaches, resorts, relaxation)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate" className="cursor-pointer">
                    Moderate (Sightseeing, culture, good food)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="adventurous" id="adventurous" />
                  <Label htmlFor="adventurous" className="cursor-pointer">
                    Adventurous (Hiking, outdoor activities)
                  </Label>
                </div>
              </RadioGroup>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <h4 className="text-base font-medium mb-4">What Makes Mystery Trips Special</h4>
              {renderFeatureCards()}
            </motion.div>
            
            <motion.div variants={fadeIn} className="border rounded-lg p-4 bg-muted/20">
              <h4 className="font-medium flex items-center text-base mb-2">
                <AlertCircle size={16} className="mr-2 text-primary" />
                How Mystery Trips Work
              </h4>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  1. You'll be matched with a destination based on your preferences and budget.
                </p>
                <p className="mb-2">
                  2. We'll book everything for you - flights, accommodation, and even suggest activities.
                </p>
                <p>
                  3. Your destination remains a mystery until 3 days before departure.
                </p>
              </div>
            </motion.div>
            
            <Button 
              onClick={handleBookNow} 
              className="w-full"
            >
              Continue
            </Button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div variants={fadeIn} className="p-5 border rounded-lg bg-gradient-to-br from-secondary/10 to-primary/5">
              <h3 className="font-medium mb-3 flex items-center">
                <Ticket className="h-5 w-5 text-primary mr-2" />
                Trip Summary
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center">
                  <DollarSign size={16} className="mr-2 text-primary" />
                  Budget: <span className="ml-auto font-medium">${budget}</span>
                </li>
                <li className="flex items-center">
                  <Calendar size={16} className="mr-2 text-primary" />
                  Duration: <span className="ml-auto font-medium">{duration === 'weekend' ? '3 days' : '7 days'}</span>
                </li>
                <li className="flex items-center">
                  <Sparkles size={16} className="mr-2 text-primary" />
                  Adventure Level: <span className="ml-auto font-medium capitalize">{adventureLevel}</span>
                </li>
                <li className="flex items-center">
                  <Clock3 size={16} className="mr-2 text-primary" />
                  Departure: <span className="ml-auto font-medium">{getDepartureDate()}</span>
                </li>
                <li className="flex items-center">
                  <MapPin size={16} className="mr-2 text-primary" />
                  Destination: <span className="ml-auto font-medium italic">Revealed on {getRevealDate()}</span>
                </li>
              </ul>
              
              <div className="mt-4 p-3 bg-foreground/5 rounded-md">
                <p className="text-sm flex items-start">
                  <Sparkles size={14} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
                  <span>Your mystery trip will be based on <span className="font-medium">{getDestinationHint()}</span></span>
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="cancellation">
                  <AccordionTrigger className="text-sm">
                    Cancellation Policy
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Free cancellation up to 7 days before your trip. After that, a 50% fee applies. No refunds within 48 hours of departure.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="included">
                  <AccordionTrigger className="text-sm">
                    What's Included
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Your mystery trip includes flights, accommodation, and a personalized digital guide to your destination once revealed. Local transportation and activities are not included.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="extras">
                  <AccordionTrigger className="text-sm">
                    Available Upgrades
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">+</span>
                        <div>
                          <p className="font-medium">Premium Accomodation</p>
                          <p>Upgrade to luxury hotels for $100/night</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">+</span>
                        <div>
                          <p className="font-medium">Private Transfers</p>
                          <p>Enjoy private airport and hotel transfers for $75</p>
                        </div>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
            
            <Button 
              onClick={handleBookNow} 
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
            >
              <Gift className="mr-2 h-4 w-4" />
              Book My Mystery Trip
            </Button>
          </motion.div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="py-16 bg-gradient-to-b from-background to-background/80">
        <Navbar />
      <div className="container px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-medium tracking-wide rounded-full bg-primary/10 text-primary">
            <Gift size={14} />
            <span>New</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Mystery Trip
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Let us surprise you with a perfectly planned getaway. Book in one click, discover your destination just 3 days before departure.
          </p>

          {/* Stats display for social proof */}
          <div className="flex flex-wrap justify-center gap-8 mx-auto max-w-xl mb-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">96%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">10k+</div>
              <div className="text-sm text-muted-foreground">Mystery Trips Booked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">48</div>
              <div className="text-sm text-muted-foreground">Countries Worldwide</div>
            </div>
          </div>
        </motion.div>
        
        <div className="max-w-xl mx-auto">
          <div className="glass rounded-xl p-6 md:p-8 shadow-lg">
            {renderStepContent()}
          </div>
        </div>

        {/* Testimonials */}
        {!bookingComplete && step === 1 && (
          <div className="max-w-4xl mx-auto mt-16">
            <h3 className="text-xl font-medium text-center mb-6">What Travelers Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-background/50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    "My mystery trip to Portugal was the highlight of my year! Everything was perfectly arranged and I didn't have to plan a thing. The reveal was so exciting!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                      <span className="text-xs font-medium">JM</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Jessica M.</p>
                      <p className="text-xs text-muted-foreground">Weekend Trip • Moderate Adventure</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-background/50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    "I was nervous about booking a mystery trip, but it turned out to be the best decision! Bora Bora was on my bucket list and everything was taken care of."
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                      <span className="text-xs font-medium">DT</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">David T.</p>
                      <p className="text-xs text-muted-foreground">Week-long Trip • Relaxed Adventure</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
