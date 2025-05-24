
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Bot, Send, Sparkles, X, MessageSquare, Heart, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CompanionMessage = {
  content: string;
  sender: 'user' | 'companion';
  timestamp: Date;
};

const predefinedResponses = [
  {
    trigger: ['hello', 'hi', 'hey', 'greetings'],
    response: "Hello! I'm your AI travel companion. How can I assist with your travel plans today?",
  },
  {
    trigger: ['bali', 'indonesia'],
    response: "Bali is an excellent choice! The best time to visit is during the dry season (April to October). Don't miss Ubud's cultural scene, the beaches of Kuta and Seminyak, and the stunning rice terraces of Tegallalang!",
  },
  {
    trigger: ['paris', 'france'],
    response: "Paris is always a good idea! Beyond the Eiffel Tower and Louvre, try exploring charming neighborhoods like Le Marais or Canal Saint-Martin. The best times to visit are spring (April-June) or fall (September-October) to avoid crowds.",
  },
  {
    trigger: ['budget', 'cheap', 'affordable', 'cost'],
    response: "For budget-friendly travel, consider: 1) Traveling during shoulder seasons 2) Using public transportation 3) Staying in hostels or vacation rentals 4) Eating where locals eat 5) Using our AI trip planner to find hidden deals!",
  },
  {
    trigger: ['weather', 'forecast', 'climate'],
    response: "I recommend checking our detailed Weather Forecast tool for your destination! It provides 14-day forecasts, historical weather data, and packing recommendations based on the climate.",
  },
  {
    trigger: ['recommendation', 'recommend', 'suggest'],
    response: "Based on current trends, travelers are loving Portugal, Japan, Mexico, and Croatia! These destinations offer great value, incredible food, and unique cultural experiences. Would you like specific recommendations for any of these?",
  },
  {
    trigger: ['hotel', 'accommodation', 'stay', 'resort'],
    response: "For the best accommodation deals, I recommend booking 3-6 months in advance. Our platform offers exclusive discounts with select hotel partners - check the Booking section for current promotions!",
  },
  {
    trigger: ['food', 'eat', 'restaurant', 'cuisine'],
    response: "One of the best ways to experience a culture is through its food! I recommend researching local specialties before you go, and using apps like TripAdvisor or asking hotel staff for authentic restaurant recommendations away from tourist areas.",
  },
  {
    trigger: ['packing', 'pack', 'luggage', 'suitcase'],
    response: "Don't forget to use our AI Packing List Generator! It creates customized packing lists based on your destination, weather forecast, trip duration, and activities planned. You'll never forget essential items again!",
  },
  {
    trigger: ['flight', 'fly', 'plane', 'airport'],
    response: "Pro tip: Tuesday and Wednesday are typically the cheapest days to fly. Booking 2-3 months ahead for domestic flights and 5-6 months for international usually yields the best prices. Check our Flight Price Predictor tool!",
  },
];

const suggestionPresets = [
  "What's the best time to visit Japan?",
  "Tips for budget travel in Europe",
  "Must-see places in New York",
  "How to avoid tourist traps",
  "Best food destinations worldwide",
  "Solo travel safety tips",
  "Where to see Northern Lights",
  "Beach destinations for families",
  "Cultural etiquette in Thailand",
  "Hidden gems in Portugal",
];

const TravelCompanion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<CompanionMessage[]>([
    {
      content: "Hi there! I'm your AI travel companion. Ask me anything about destinations, travel tips, or use me to plan your next adventure!",
      sender: 'companion',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  
  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: CompanionMessage = {
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Generate AI response based on predefined patterns
    setTimeout(() => {
      let responseText = "I'm not sure how to help with that specific question yet. Would you like to try one of the suggested topics instead?";
      
      // Check input against predefined response triggers
      const lowercaseInput = inputValue.toLowerCase();
      for (const pattern of predefinedResponses) {
        if (pattern.trigger.some(keyword => lowercaseInput.includes(keyword))) {
          responseText = pattern.response;
          break;
        }
      }
      
      const companionMessage: CompanionMessage = {
        content: responseText,
        sender: 'companion',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, companionMessage]);
      
      // Show a delayed toast with a suggestion to try the full planner
      if (messages.length > 4) {
        setTimeout(() => {
          toast({
            title: "Need more detailed help?",
            description: "Try our full AI trip planner for personalized itineraries",
            action: (
              <Link to="/trip-planner">
                <Button size="sm" variant="default">
                  Plan Now
                </Button>
              </Link>
            ),
          });
        }, 2000);
      }
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
    setInputValue(suggestion);
    
    // Automatically send after a brief delay
    setTimeout(() => {
      handleSend();
      setSelectedSuggestion(null);
    }, 500);
  };

  return (
    <>
      {/* Floating chat button */}
      <motion.button
        className="fixed bottom-20 right-4 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
      >
        <MessageSquare className="w-5 h-5" />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 bg-card rounded-lg shadow-xl border border-border overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat header */}
            <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                <span className="font-medium">Travel Companion</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-primary-foreground/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="h-80 overflow-y-auto p-3 bg-card">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="text-xs opacity-70 mt-1 flex items-center">
                      {message.sender === 'companion' && <Bot className="w-3 h-3 mr-1" />}
                      <Clock className="w-3 h-3 mr-1" />
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Quick suggestions */}
            <div className="p-2 border-t border-border bg-card/50">
              <p className="text-xs text-muted-foreground mb-2 px-1">Suggested topics:</p>
              <div className="flex flex-wrap gap-1">
                {suggestionPresets.slice(0, 5).map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`text-xs px-2 py-1 rounded-full border border-border transition-colors ${
                      selectedSuggestion === suggestion
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {suggestion.length > 20 ? suggestion.substring(0, 18) + '...' : suggestion}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Chat input */}
            <div className="p-3 border-t border-border bg-card/80">
              <div className="flex items-center gap-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about travel..."
                  className="min-h-[40px] max-h-[120px] text-sm"
                />
                <Button 
                  size="icon" 
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-1">
                  <Heart className="w-3 h-3 text-muted-foreground" />
                  <Sparkles className="w-3 h-3 text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">
                  Powered by AI
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TravelCompanion;
