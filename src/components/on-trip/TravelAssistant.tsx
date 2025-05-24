import { useState } from 'react';
import { HelpCircle, ArrowRight, MessageSquare, Check, AlertCircle, Globe, LucideShirt } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PackingListGenerator from '@/components/PackingListGenerator';

interface TripInfo {
  destination: string;
  dates: string;
  weather: string;
  localTime: string;
  currency: string;
  exchange: string;
}

interface TravelAssistantProps {
  tripInfo: TripInfo;
}

export const TravelAssistant = ({ tripInfo }: TravelAssistantProps) => {
  const [query, setQuery] = useState('');
  const [showPackingList, setShowPackingList] = useState(false);
  const [showTranslator, setShowTranslator] = useState(false);
  const [translationQuery, setTranslationQuery] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Indonesian');

  const handleAssistance = () => {
    if (!query) {
      toast.error("Please enter your question");
      return;
    }
    
    toast.success("Request sent!", {
      description: "Our travel assistant will respond shortly"
    });
    setQuery('');
  };
  
  const handleTranslate = () => {
    if (!translationQuery) {
      toast.error("Please enter text to translate");
      return;
    }
    
    // Simulate translation
    setTimeout(() => {
      const translations: {[key: string]: string} = {
        'Indonesian': 'Selamat datang di Bali! Dimana restoran terdekat?',
        'Japanese': 'バリへようこそ！最寄りのレストランはどこですか？',
        'Spanish': '¡Bienvenido a Bali! ¿Dónde está el restaurante más cercano?',
        'French': 'Bienvenue à Bali ! Où est le restaurant le plus proche ?'
      };
      setTranslatedText(translations[selectedLanguage]);
    }, 1000);
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="glass rounded-xl p-6">
        <h2 className="text-xl font-medium mb-4">Travel Assistant</h2>
        
        <div className="space-y-4 mb-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-medium">AI</span>
            </div>
            <div className="glass-dark p-3 rounded-xl max-w-[80%]">
              <p className="text-sm">Hello! I'm your AI travel assistant. How can I help with your trip to Bali today?</p>
            </div>
          </div>
          
          <div className="flex gap-3 justify-end">
            <div className="glass-dark p-3 rounded-xl max-w-[80%]">
              <p className="text-sm">What's the weather forecast for tomorrow?</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-medium">You</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-medium">AI</span>
            </div>
            <div className="glass-dark p-3 rounded-xl max-w-[80%]">
              <p className="text-sm">Tomorrow's forecast for Ubud, Bali shows mostly sunny with a high of 30°C and a low of 24°C. There's a slight chance (20%) of a brief afternoon shower. Perfect for your planned activities, but you might want to bring a light rain jacket just in case.</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Input
            placeholder="Ask any travel-related question..."
            className="flex-grow p-3 rounded-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<HelpCircle size={18} />}
            actionIcon={<ArrowRight size={18} />}
            onActionClick={handleAssistance}
          />
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {["Nearby restaurants?", "Best beaches?", "Is it safe to drive?", "Local customs?"].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setQuery(suggestion)}
              className="px-3 py-1.5 bg-muted/50 hover:bg-muted rounded-full text-xs"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">Itinerary Adjustments</h2>
          <Link to="/itinerary/bali-adventure-123" className="text-sm text-primary">
            View Full Itinerary
          </Link>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
            <div className="flex items-start">
              <AlertCircle size={18} className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800 mb-1">Weather Alert</h3>
                <p className="text-xs text-yellow-800">Heavy rain predicted for your planned Mount Batur trek (Day 3). Would you like to:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button className="px-3 py-1 bg-white border border-yellow-300 rounded-full text-xs hover:bg-yellow-100">
                    Reschedule for Day 5
                  </button>
                  <button className="px-3 py-1 bg-white border border-yellow-300 rounded-full text-xs hover:bg-yellow-100">
                    Swap with indoor activity
                  </button>
                  <button className="px-3 py-1 bg-white border border-yellow-300 rounded-full text-xs hover:bg-yellow-100">
                    Keep as planned
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-start">
              <Check size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-green-800 mb-1">Opportunity Alert</h3>
                <p className="text-xs text-green-800">A rare traditional ceremony is happening near your hotel tomorrow. We can add it to your itinerary.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button className="px-3 py-1 bg-white border border-green-300 rounded-full text-xs hover:bg-green-100">
                    Add to itinerary
                  </button>
                  <button className="px-3 py-1 bg-white border border-green-300 rounded-full text-xs hover:bg-green-100">
                    More information
                  </button>
                  <button className="px-3 py-1 bg-white border border-green-300 rounded-full text-xs hover:bg-green-100">
                    Ignore
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">Language Translator</h2>
          <button 
            onClick={() => setShowTranslator(!showTranslator)}
            className="text-sm text-primary"
          >
            {showTranslator ? "Hide Translator" : "Show Translator"}
          </button>
        </div>
        
        {showTranslator && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex gap-4 mb-4">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="p-2 rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option>Indonesian</option>
                <option>Japanese</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
              
              <button
                onClick={handleTranslate}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
              >
                Translate
              </button>
            </div>
            
            <textarea
              placeholder="Enter text to translate..."
              className="w-full p-3 rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              rows={2}
              value={translationQuery}
              onChange={(e) => setTranslationQuery(e.target.value)}
            ></textarea>
            
            {translatedText && (
              <div className="p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center mb-2">
                  <Globe size={16} className="text-primary mr-2" />
                  <span className="text-sm font-medium">{selectedLanguage} Translation</span>
                </div>
                <p className="text-sm">{translatedText}</p>
              </div>
            )}
            
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Common phrases in Indonesian</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {[
                  { english: "Hello", foreign: "Halo" },
                  { english: "Thank you", foreign: "Terima kasih" },
                  { english: "How much?", foreign: "Berapa harganya?" },
                  { english: "Where is...?", foreign: "Di mana...?" }
                ].map((phrase, index) => (
                  <div key={index} className="text-xs flex justify-between">
                    <span>{phrase.english}</span>
                    <span className="font-medium">{phrase.foreign}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">Packing List</h2>
          <button 
            onClick={() => setShowPackingList(!showPackingList)}
            className="flex items-center text-sm text-primary"
          >
            <LucideShirt size={16} className="mr-1" />
            {showPackingList ? "Hide Packing List" : "Show Packing List"}
          </button>
        </div>
        
        {showPackingList && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PackingListGenerator 
              destination="Bali" 
              travelStyle="Adventure" 
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TravelAssistant;
