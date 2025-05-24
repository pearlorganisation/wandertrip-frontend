
import { MapPin, Calendar, Umbrella, MessageSquare, ClipboardCheck, AlertCircle, Compass, Plane, Bell } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

interface PageHeaderProps {
  tripInfo: {
    destination: string;
    dates: string;
    weather: string;
  };
  currentLocation: string;
  loadingLocation: boolean;
  selectedTab: string;
  setSelectedTab: (value: string) => void;
  upcomingActivity?: {
    title: string;
    time: string;
    location: string;
    timeUntil: string;
  };
}

export const PageHeader = ({ 
  tripInfo, 
  currentLocation, 
  loadingLocation, 
  selectedTab, 
  setSelectedTab,
  upcomingActivity
}: PageHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-4 sm:py-6 bg-gradient-to-r from-muted/50 to-muted/20">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-balance">
              {isMobile ? 'Trip Assistant' : 'On-Trip Assistance'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isMobile 
                ? `Support for ${tripInfo.destination}`
                : `Real-time support and tools to enhance your journey in ${tripInfo.destination}`
              }
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {loadingLocation ? (
              <div className="flex items-center text-xs sm:text-sm animate-pulse">
                <MapPin size={14} className="mr-1 text-primary" />
                <span>Locating...</span>
              </div>
            ) : (
              <Badge variant="outline" className="border-primary/20 bg-background">
                <MapPin size={14} className="mr-1 text-primary" />
                <span className="text-xs sm:text-sm">{currentLocation}</span>
              </Badge>
            )}
            <Badge variant="outline" className="border-primary/20 bg-background">
              <Calendar size={14} className="mr-1 text-primary" />
              <span className="text-xs sm:text-sm">{tripInfo.dates}</span>
            </Badge>
            <Badge variant="outline" className="border-primary/20 bg-background">
              <Umbrella size={14} className="mr-1 text-primary" />
              <span className="text-xs sm:text-sm">{tripInfo.weather}</span>
            </Badge>
          </div>
        </div>
        
        {upcomingActivity && (
          <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <Bell size={16} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Coming up: {upcomingActivity.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {upcomingActivity.time} · {upcomingActivity.location}
                  </p>
                </div>
              </div>
              <Badge variant="info" className="ml-2">
                {upcomingActivity.timeUntil}
              </Badge>
            </div>
          </div>
        )}
        
        <div className="mt-4 sm:mt-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="w-full bg-background/80 p-1 rounded-lg border border-border/30 shadow-sm">
              <TabsTrigger value="assistant" className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                <MessageSquare size={isMobile ? 14 : 16} className={isMobile ? "mr-0 sm:mr-1" : "mr-1"} />
                <span className={isMobile ? "hidden sm:inline" : ""}>Assistant</span>
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                <ClipboardCheck size={isMobile ? 14 : 16} className={isMobile ? "mr-0 sm:mr-1" : "mr-1"} />
                <span className={isMobile ? "hidden sm:inline" : ""}>Tools</span>
              </TabsTrigger>
              <TabsTrigger value="emergency" className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                <AlertCircle size={isMobile ? 14 : 16} className={isMobile ? "mr-0 sm:mr-1" : "mr-1"} />
                <span className={isMobile ? "hidden sm:inline" : ""}>Emergency</span>
              </TabsTrigger>
              <TabsTrigger value="local" className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                <Compass size={isMobile ? 14 : 16} className={isMobile ? "mr-0 sm:mr-1" : "mr-1"} />
                <span className={isMobile ? "hidden sm:inline" : ""}>Local Guide</span>
              </TabsTrigger>
              <TabsTrigger value="flights" className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                <Plane size={isMobile ? 14 : 16} className={isMobile ? "mr-0 sm:mr-1" : "mr-1"} />
                <span className={isMobile ? "hidden sm:inline" : ""}>Flight Tracker</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
