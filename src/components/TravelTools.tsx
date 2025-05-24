
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CircleDollarSign, 
  CalendarClock, 
  Globe, 
  Luggage, 
  PlaneTakeoff, 
  MapPin,
  Languages,
  Zap,
  Timer,
  ArrowRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const TravelTools = () => {
  const [activeTool, setActiveTool] = useState<string>("currency");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [amount, setAmount] = useState<string>("100");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Spanish");
  const [fromCity, setFromCity] = useState<string>("New York");
  const [toCity, setToCity] = useState<string>("Tokyo");

  // Mock conversion function
  const convertCurrency = () => {
    const rates: Record<string, number> = {
      "USD-EUR": 0.91,
      "USD-GBP": 0.78,
      "USD-JPY": 150.14,
      "EUR-USD": 1.09,
      "EUR-GBP": 0.85,
      "EUR-JPY": 164.25,
      "GBP-USD": 1.29,
      "GBP-EUR": 1.17,
      "GBP-JPY": 193.39,
      "JPY-USD": 0.0067,
      "JPY-EUR": 0.0061,
      "JPY-GBP": 0.0052,
    };
    
    const key = `${fromCurrency}-${toCurrency}`;
    const rate = rates[key] || 1;
    return (parseFloat(amount) * rate).toFixed(2);
  };

  // Mock phrases
  const phrases: Record<string, string[]> = {
    "Spanish": ["¡Hola!", "¿Cómo estás?", "Por favor", "Gracias", "¿Dónde está...?"],
    "French": ["Bonjour!", "Comment ça va?", "S'il vous plaît", "Merci", "Où est...?"],
    "Japanese": ["こんにちは!", "お元気ですか?", "お願いします", "ありがとう", "どこですか?"],
    "Italian": ["Ciao!", "Come stai?", "Per favore", "Grazie", "Dov'è...?"],
  };

  // Mock timezone data
  const timeData: Record<string, { difference: string, current: string }> = {
    "New York": { difference: "Local time", current: new Date().toLocaleTimeString() },
    "London": { difference: "+5 hours", current: new Date(Date.now() + 5 * 60 * 60 * 1000).toLocaleTimeString() },
    "Tokyo": { difference: "+14 hours", current: new Date(Date.now() + 14 * 60 * 60 * 1000).toLocaleTimeString() },
    "Sydney": { difference: "+16 hours", current: new Date(Date.now() + 16 * 60 * 60 * 1000).toLocaleTimeString() },
    "Paris": { difference: "+6 hours", current: new Date(Date.now() + 6 * 60 * 60 * 1000).toLocaleTimeString() },
  };

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 text-xs font-medium tracking-wide uppercase rounded-full bg-primary/10 text-primary"
          >
            <Zap className="w-3.5 h-3.5" /> Travel Smart
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-wander-600 bg-clip-text text-transparent">
            Essential Travel Tools
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need for a smooth journey, right at your fingertips
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Tabs defaultValue="currency" className="w-full" onValueChange={setActiveTool}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8">
              <TabsTrigger value="currency" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <CircleDollarSign className="w-4 h-4 mr-2" />
                Currency
              </TabsTrigger>
              <TabsTrigger value="time" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <CalendarClock className="w-4 h-4 mr-2" />
                Time Zones
              </TabsTrigger>
              <TabsTrigger value="phrases" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Languages className="w-4 h-4 mr-2" />
                Phrases
              </TabsTrigger>
              <TabsTrigger value="packing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Luggage className="w-4 h-4 mr-2" />
                Packing
              </TabsTrigger>
            </TabsList>

            <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
              <TabsContent value="currency" className="mt-0">
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-medium">Currency Converter</h3>
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Live Rates
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Amount</label>
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/25"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">From</label>
                      <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/25"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">To</label>
                      <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/25"
                      >
                        <option value="EUR">EUR - Euro</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Converted Amount</p>
                    <p className="text-2xl font-bold text-primary">
                      {convertCurrency()} {toCurrency}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      1 {fromCurrency} = {convertCurrency()} {toCurrency}
                    </p>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="time" className="mt-0">
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-medium">Time Zone Converter</h3>
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center">
                      <Timer className="w-3 h-3 mr-1" /> Live
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Your location</label>
                      <select
                        value={fromCity}
                        onChange={(e) => setFromCity(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/25"
                      >
                        <option value="New York">New York</option>
                        <option value="London">London</option>
                        <option value="Tokyo">Tokyo</option>
                        <option value="Sydney">Sydney</option>
                        <option value="Paris">Paris</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Destination</label>
                      <select
                        value={toCity}
                        onChange={(e) => setToCity(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/25"
                      >
                        <option value="Tokyo">Tokyo</option>
                        <option value="New York">New York</option>
                        <option value="London">London</option>
                        <option value="Sydney">Sydney</option>
                        <option value="Paris">Paris</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 text-primary mr-2" />
                        <h4 className="font-medium">{fromCity}</h4>
                      </div>
                      <p className="text-2xl font-bold">{timeData[fromCity].current}</p>
                      <p className="text-xs text-muted-foreground">{timeData[fromCity].difference}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 text-primary mr-2" />
                        <h4 className="font-medium">{toCity}</h4>
                      </div>
                      <p className="text-2xl font-bold">{timeData[toCity].current}</p>
                      <p className="text-xs text-muted-foreground">{timeData[toCity].difference} from {fromCity}</p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground text-center">
                    <p>Pro tip: Schedule calls and check-ins when it's convenient in both time zones</p>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="phrases" className="mt-0">
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-medium">Essential Travel Phrases</h3>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-1 text-primary" />
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="text-sm border-none bg-transparent focus:outline-none focus:ring-0 text-primary"
                      >
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Italian">Italian</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    {phrases[selectedLanguage].map((phrase, index) => (
                      <motion.div 
                        key={index}
                        className="bg-muted/50 p-3 rounded-lg flex items-center"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="font-medium">{phrase}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <Link to="/travel-safety" className="block text-center text-primary text-sm mt-4">
                    View full phrasebook and pronunciation guide →
                  </Link>
                </motion.div>
              </TabsContent>

              <TabsContent value="packing" className="mt-0">
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-medium">Smart Packing List</h3>
                    <Link to="/trip-planner" className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Get Custom List
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Luggage className="w-4 h-4 mr-2 text-primary" />
                        Essentials
                      </h4>
                      <ul className="space-y-2">
                        {["Passport/ID", "Credit/Debit Cards", "Local Currency", "Phone & Charger", "Travel Insurance"].map((item, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <div className="w-5 h-5 rounded border border-primary/30 mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <PlaneTakeoff className="w-4 h-4 mr-2 text-primary" />
                        Travel Day
                      </h4>
                      <ul className="space-y-2">
                        {["Neck Pillow", "Eye Mask", "Headphones", "Water Bottle", "Medications"].map((item, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <div className="w-5 h-5 rounded border border-primary/30 mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Link to="/trip-planner" className="mt-4 flex items-center justify-center text-primary text-sm">
                    <span>Get personalized packing list for your trip</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </motion.div>
              </TabsContent>
            </div>
          </Tabs>
          
          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-wander-600 hover:from-primary/90 hover:to-wander-600/90 text-white font-medium rounded-full px-8"
            >
              <Link to="/trip-planner">
                Plan Your Trip Now
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelTools;
