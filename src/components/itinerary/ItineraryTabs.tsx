
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Map, Sparkles, ShoppingBag, Phone, Users, Download, Map as MapIcon, Bookmark, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ItineraryTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showPackingList: boolean;
  setShowPackingList: (show: boolean) => void;
  onEmergencyAssistance: () => void;
}

export const ItineraryTabs = ({ 
  activeTab, 
  setActiveTab, 
  showPackingList,
  setShowPackingList,
  onEmergencyAssistance
}: ItineraryTabsProps) => {
  // Define tabs with their icons and any badge content
  const tabs = [
    { id: 'itinerary', label: 'Itinerary', icon: <Calendar size={18} /> },
    { id: 'addons', label: 'Add-ons', icon: <Sparkles size={18} /> },
    { id: 'tips', label: 'Tips', icon: <Map size={18} />, badge: '3' },
    { id: 'packing', label: 'Packing', icon: <ShoppingBag size={18} /> },
    { id: 'manage', label: 'Manage', icon: <Users size={18} /> },
    { id: 'downloads', label: 'Downloads', icon: <Download size={18} /> },
  ];

  return (
    <div className="sticky top-16 md:top-20 z-30 w-full bg-background/95 backdrop-blur-sm border-b border-border/40 transition-all">
      <div className="container px-4 sm:px-6">
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="flex space-x-4 min-w-max py-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'packing') {
                    setShowPackingList(!showPackingList);
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2 relative",
                  (tab.id === 'packing' && showPackingList) || (tab.id !== 'packing' && activeTab === tab.id)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 hover:bg-muted"
                )}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "ml-1 py-0 px-1.5 text-[10px] min-w-5 h-5 flex items-center justify-center",
                      (tab.id === 'packing' && showPackingList) || (tab.id !== 'packing' && activeTab === tab.id)
                        ? "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
                        : "bg-background text-foreground"
                    )}
                  >
                    {tab.badge}
                  </Badge>
                )}
              </motion.button>
            ))}
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                variant="destructive" 
                className="flex items-center gap-2 px-4 py-3 h-auto font-medium"
                onClick={onEmergencyAssistance}
              >
                <Phone size={18} />
                <span>Emergency</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
