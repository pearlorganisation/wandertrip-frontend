
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardCheck, Camera, UserCheck, Check, Globe, Compass, 
  Wifi, CreditCard, Search, MessageSquare, MapPin, Calendar
} from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';

interface TravelTool {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  action: () => void;
}

interface PhotoSpot {
  name: string;
  distance: string;
  bestTime: string;
  tips: string;
}

interface LocalTip {
  tip: string;
  category: string;
}

interface TravelToolsProps {
  travelTools: TravelTool[];
  photoSpots: PhotoSpot[];
  localTips: LocalTip[];
}

export const TravelTools = ({ travelTools, photoSpots, localTips }: TravelToolsProps) => {
  const [showTranslator, setShowTranslator] = useState(false);
  const [translationText, setTranslationText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Indonesian');
  const [showWifi, setShowWifi] = useState(false);
  const [wifiNetworks, setWifiNetworks] = useState([
    { name: "Ubud Cafe WiFi", strength: "Strong", secured: true, type: "Free" },
    { name: "BaliNet", strength: "Medium", secured: true, type: "Paid" },
    { name: "Tourist_Hotspot", strength: "Strong", secured: false, type: "Free" },
  ]);
  const [activeTab, setActiveTab] = useState("tools");
  const isMobile = useIsMobile();

  // Mock translation function
  const translateText = () => {
    const translations = {
      "Indonesian": {
        "Hello": "Halo",
        "Thank you": "Terima kasih",
        "Excuse me": "Permisi",
        "How much is this?": "Berapa harganya?",
        "Where is the bathroom?": "Di mana kamar mandinya?",
        "I need help": "Saya perlu bantuan",
        "Yes": "Ya",
        "No": "Tidak",
        "Delicious": "Enak"
      }
    };
    
    // Attempt to find direct translation
    if (translations[selectedLanguage]?.[translationText]) {
      setTranslatedText(translations[selectedLanguage][translationText]);
    } else {
      // Mock translation for text not in our dictionary
      const randomSuffix = Math.random().toString(36).substring(2, 6);
      setTranslatedText(`${translationText} (${selectedLanguage} translation-${randomSuffix})`);
    }
    
    toast.success("Text translated successfully!");
  };
  
  // Find nearby WiFi networks
  const scanWifiNetworks = () => {
    toast.info("Scanning for WiFi networks...");
    setTimeout(() => {
      setWifiNetworks([
        ...wifiNetworks,
        { name: "Villa_Ubud_5G", strength: "Strong", secured: true, type: "Hotel Guest" }
      ]);
      toast.success("Found 4 WiFi networks nearby");
    }, 2000);
  };

  return (
    <div className="md:col-span-2">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-4">
          <TabsTrigger value="tools" className="text-xs sm:text-sm py-1.5">
            <ClipboardCheck size={isMobile ? 14 : 16} className="mr-1" />
            <span className={isMobile ? "hidden sm:inline" : ""}>Travel Tools</span>
          </TabsTrigger>
          <TabsTrigger value="translator" className="text-xs sm:text-sm py-1.5">
            <Globe size={isMobile ? 14 : 16} className="mr-1" />
            <span className={isMobile ? "hidden sm:inline" : ""}>Translator</span>
          </TabsTrigger>
          <TabsTrigger value="wifi" className="text-xs sm:text-sm py-1.5">
            <Wifi size={isMobile ? 14 : 16} className="mr-1" />
            <span className={isMobile ? "hidden sm:inline" : ""}>WiFi Finder</span>
          </TabsTrigger>
        </TabsList>
      
        <TabsContent value="tools" className="mt-0">
          <div className="glass rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Travel Tools</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Essential utilities to enhance your travel experience</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
              {travelTools.map((tool) => (
                <button
                  key={tool.id}
                  className="bg-card p-3 sm:p-4 rounded-lg border border-border/40 hover:border-border transition-colors flex flex-col items-center text-center"
                  onClick={tool.action}
                >
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-muted flex items-center justify-center mb-2 sm:mb-3">
                    {tool.icon}
                  </div>
                  <h3 className="font-medium text-xs sm:text-sm mb-0.5 sm:mb-1">{tool.title}</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{isMobile ? tool.description.split(' ').slice(0, 3).join(' ') + '...' : tool.description}</p>
                </button>
              ))}
            </div>
          </div>
          
          <div className="glass rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-medium">Recommendations</h2>
              <Link to="/things-to-do" className="text-xs sm:text-sm text-primary">
                See More
              </Link>
            </div>
            
            <div className="space-y-5">
              <div>
                <h3 className="text-sm sm:text-base font-medium mb-2 flex items-center">
                  <Camera size={16} className="text-primary mr-2" />
                  Best Photo Spots Near You
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {photoSpots.map((spot, index) => (
                    <div key={index} className="bg-muted/30 p-2 sm:p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-xs sm:text-sm">{spot.name}</h4>
                        <span className="text-[10px] sm:text-xs bg-background/80 px-1.5 py-0.5 rounded-full">{spot.distance}</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Best time: {spot.bestTime}</p>
                      <p className="text-[10px] sm:text-xs mt-1 text-primary-foreground/70">{spot.tips}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-3 sm:pt-4 border-t border-border/30">
                <h3 className="text-sm sm:text-base font-medium mb-2 flex items-center">
                  <UserCheck size={16} className="text-primary mr-2" />
                  Local Tips & Insights
                </h3>
                
                <div className="space-y-2">
                  {localTips.map((tip, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={10} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm">{tip.tip}</p>
                        <span className="text-[10px] sm:text-xs text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-full">
                          {tip.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="translator" className="mt-0">
          <div className="glass rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-medium flex items-center">
                <Globe size={isMobile ? 18 : 20} className="text-primary mr-2" />
                Language Translator
              </h2>
              <div className="flex items-center">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="text-xs sm:text-sm bg-muted p-1 rounded-md border border-border"
                >
                  <option value="Indonesian">Indonesian</option>
                  <option value="Thai">Thai</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="text-xs sm:text-sm font-medium mb-1 block">English Text</label>
                <textarea
                  value={translationText}
                  onChange={(e) => setTranslationText(e.target.value)}
                  placeholder="Enter text to translate..."
                  className="w-full p-2 sm:p-3 rounded-md border border-border bg-background min-h-[80px] sm:min-h-[100px] text-xs sm:text-sm"
                />
              </div>
              
              <Button onClick={translateText} className="w-full text-xs sm:text-sm py-1.5 sm:py-2">
                Translate to {selectedLanguage}
              </Button>
              
              {translatedText && (
                <div className="p-3 sm:p-4 bg-muted rounded-md">
                  <label className="text-xs sm:text-sm font-medium mb-1 block">{selectedLanguage} Translation</label>
                  <p className="text-sm sm:text-lg">{translatedText}</p>
                </div>
              )}
              
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/30">
                <h3 className="text-xs sm:text-base font-medium mb-2">Common Phrases</h3>
                <div className="grid grid-cols-2 gap-1 sm:gap-2">
                  {["Hello", "Thank you", "Excuse me", "How much is this?", "Where is the bathroom?", "I need help"].map((phrase) => (
                    <button
                      key={phrase}
                      className="text-left p-1.5 sm:p-2 bg-muted/50 rounded-md hover:bg-muted text-xs sm:text-sm"
                      onClick={() => setTranslationText(phrase)}
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="wifi" className="mt-0">
          <div className="glass rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-medium flex items-center">
                <Wifi size={isMobile ? 18 : 20} className="text-primary mr-2" />
                WiFi Finder
              </h2>
              <Button size="sm" onClick={scanWifiNetworks} className="text-xs py-1 px-2 sm:py-1.5 sm:px-3">
                <Search size={14} className="mr-1" />
                <span className={isMobile ? "hidden sm:inline" : ""}>Scan</span>
              </Button>
            </div>
            
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
              Find reliable WiFi connections near your current location
            </p>
            
            <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
              {wifiNetworks.map((network, index) => (
                <div key={index} className="flex justify-between items-center p-2 sm:p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="flex items-center">
                      <Wifi size={14} className={network.strength === "Strong" ? "text-green-500" : "text-amber-500"} />
                      <span className="font-medium ml-1 sm:ml-2 text-xs sm:text-sm">{network.name}</span>
                      {network.secured && (
                        <span className="ml-1 sm:ml-2 text-[8px] sm:text-xs bg-green-100 text-green-800 px-1 sm:px-1.5 py-0.5 rounded-full">Secured</span>
                      )}
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground ml-5 sm:ml-6">Type: {network.type}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => toast.success(`WiFi details for ${network.name} saved to your phone`)} className="text-xs py-0.5 px-2">
                    Connect
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="bg-muted/50 p-2 sm:p-3 rounded-md text-xs sm:text-sm">
              <h3 className="font-medium mb-1 sm:mb-2 flex items-center">
                <MessageSquare size={14} className="text-primary mr-1" />
                WiFi Safety Tips
              </h3>
              <ul className="space-y-1 text-[10px] sm:text-xs list-disc pl-4 sm:pl-5">
                <li>Always connect to secured networks when possible</li>
                <li>Use a VPN for additional security on public networks</li>
                <li>Avoid accessing sensitive information on public WiFi</li>
                <li>Disable auto-connect to open networks in your device settings</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TravelTools;
