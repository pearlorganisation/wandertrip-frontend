
import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';

interface TripInfo {
  destination: string;
  dates: string;
  weather: string;
  localTime: string;
  currency: string;
  exchange: string;
}

interface EmergencyContact {
  id: string;
  title: string;
  contact: string;
  type: string;
  icon: React.ReactNode;
}

interface TripInfoSidebarProps {
  tripInfo: TripInfo;
  emergencyContacts: EmergencyContact[];
}

export const TripInfoSidebar = ({ tripInfo, emergencyContacts }: TripInfoSidebarProps) => {
  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6">
        <h2 className="text-xl font-medium mb-4">Trip Information</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Local Time</span>
            <span className="text-sm font-medium">{tripInfo.localTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Currency</span>
            <span className="text-sm font-medium">{tripInfo.currency}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Exchange Rate</span>
            <span className="text-sm font-medium">{tripInfo.exchange}</span>
          </div>
          <div className="h-px bg-border"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Weather</span>
            <span className="text-sm font-medium">{tripInfo.weather}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Tomorrow</span>
            <span className="text-sm font-medium">30°C, Sunny</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Day After</span>
            <span className="text-sm font-medium">28°C, Rain</span>
          </div>
        </div>
      </div>
      
      <div className="glass rounded-xl p-6">
        <h2 className="text-xl font-medium mb-4">Emergency Contacts</h2>
        
        <div className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                {contact.icon}
                <span className="text-sm ml-2">{contact.title}</span>
              </div>
              <a 
                href={`tel:${contact.contact.replace(/\s/g, '')}`}
                className="text-sm font-medium"
              >
                {contact.contact}
              </a>
            </div>
          ))}
          
          <div className="h-px bg-border"></div>
          
          <Link to="/emergency-assistance" className="flex items-center justify-center p-2 bg-red-100 text-red-800 rounded-lg">
            <Phone size={16} className="mr-2" />
            <span className="text-sm font-medium">Emergency Assistance</span>
          </Link>
        </div>
      </div>
      
      <div className="glass rounded-xl p-6">
        <h2 className="text-xl font-medium mb-4">Today's Itinerary</h2>
        
        <div className="space-y-4">
          {[
            { time: "7:00 AM", activity: "Morning Yoga Session", location: "Yoga Barn, Ubud" },
            { time: "9:30 AM", activity: "Tegalalang Rice Terraces", location: "Tegalalang, Ubud" },
            { time: "12:30 PM", activity: "Lunch at Kepitu Restaurant", location: "Kepitu at Kayon Resort" },
            { time: "2:00 PM", activity: "Sacred Monkey Forest", location: "Monkey Forest Street, Ubud" }
          ].map((item, index) => (
            <div key={index} className="flex gap-3">
              <div className="text-xs whitespace-nowrap pt-0.5 text-muted-foreground">
                {item.time}
              </div>
              <div>
                <p className="text-sm font-medium">{item.activity}</p>
                <p className="text-xs text-muted-foreground">{item.location}</p>
              </div>
            </div>
          ))}
          
          <Link to="/itinerary/bali-adventure-123" className="text-sm text-primary flex items-center">
            View full itinerary
            <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>
      
      <div className="bg-primary/10 rounded-xl p-6">
        <h2 className="text-xl font-medium mb-4">Need Help?</h2>
        
        <p className="text-sm text-muted-foreground mb-4">
          Our travel experts are available 24/7 to assist with any issues or questions during your trip.
        </p>
        
        <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default TripInfoSidebar;
