
import { AlertTriangle, Phone, Hospital, Building, Globe, Siren, Shield, Hand } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface EmergencyContact {
  id: string;
  title: string;
  contact: string;
  type: 'emergency' | 'medical' | 'embassy' | 'local' | 'custom';
  icon: React.ReactNode;
}

interface EmergencyContactsEnhancedProps {
  destination: string;
  country: string;
  contacts: EmergencyContact[];
  className?: string;
}

export const EmergencyContactsEnhanced = ({ 
  destination,
  country,
  contacts,
  className
}: EmergencyContactsEnhancedProps) => {
  const [expanded, setExpanded] = useState(false);
  const [showEmergencyInfo, setShowEmergencyInfo] = useState(false);
  
  // Default emergency contacts plus custom ones
  const defaultContacts: EmergencyContact[] = [
    {
      id: 'emergency',
      title: 'Local Emergency',
      contact: country === 'United States' ? '911' : '112',
      type: 'emergency',
      icon: <Siren size={18} className="text-red-500" />
    },
    {
      id: 'police',
      title: 'Police',
      contact: country === 'United States' ? '911' : '112',
      type: 'emergency',
      icon: <Shield size={18} className="text-blue-500" />
    },
    {
      id: 'ambulance',
      title: 'Ambulance',
      contact: country === 'United States' ? '911' : '112',
      type: 'medical',
      icon: <Hospital size={18} className="text-green-500" />
    },
  ];
  
  // Combine default and custom contacts
  const allContacts = [...defaultContacts, ...contacts];
  
  // Display only important contacts when not expanded
  const displayedContacts = expanded ? allContacts : allContacts.slice(0, 4);
  
  const handleEmergencyCall = (contact: EmergencyContact) => {
    toast.info(`Calling ${contact.title}: ${contact.contact}`, {
      description: "This is a simulation. In a real app, this would initiate a call."
    });
  };
  
  const handleDownloadInfo = () => {
    toast.success("Emergency information downloaded", {
      description: "Now available offline in your downloads folder"
    });
  };
  
  const groupedContacts = {
    emergency: displayedContacts.filter(c => c.type === 'emergency'),
    medical: displayedContacts.filter(c => c.type === 'medical'),
    embassy: displayedContacts.filter(c => c.type === 'embassy'),
    local: displayedContacts.filter(c => c.type === 'local'),
    custom: displayedContacts.filter(c => c.type === 'custom'),
  };
  
  return (
    <section className={cn("py-8", className)}>
      <div className="container px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="glass p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <AlertTriangle size={18} className="text-red-500 mr-2" />
                Emergency Contacts in {destination}
              </h3>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowEmergencyInfo(!showEmergencyInfo)}
                className="text-xs"
              >
                {showEmergencyInfo ? "Hide" : "Show"} Emergency Info
              </Button>
            </div>
            
            {showEmergencyInfo && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg text-sm">
                <h4 className="font-medium text-red-700 mb-2 flex items-center">
                  <Hand size={16} className="mr-2" />
                  Emergency Guidelines
                </h4>
                <ul className="space-y-2 text-red-700 list-disc pl-5">
                  <li>Stay calm and assess the situation</li>
                  <li>Call local emergency services immediately for urgent situations</li>
                  <li>Contact the embassy if you need consular assistance</li>
                  <li>Have your passport/ID and travel insurance information ready</li>
                  <li>Use the Wander Trip 24/7 emergency hotline for assistance in any situation</li>
                </ul>
                <Button 
                  className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white" 
                  size="sm"
                  onClick={handleDownloadInfo}
                >
                  Download Emergency Information
                </Button>
              </div>
            )}
            
            <div className="space-y-6">
              {Object.entries(groupedContacts).map(([type, contacts]) => 
                contacts.length > 0 && (
                  <div key={type} className="space-y-3">
                    {type !== 'custom' && (
                      <h4 className="text-sm font-medium capitalize border-b pb-2">
                        {type === 'embassy' ? 'Embassy & Consulates' : `${type} Services`}
                      </h4>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {contacts.map((contact) => (
                        <div 
                          key={contact.id} 
                          className="flex justify-between items-center p-3 bg-background/80 rounded-lg hover:bg-background/90 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex-shrink-0">
                              {contact.icon}
                            </div>
                            <div>
                              <div className="font-medium text-sm">{contact.title}</div>
                              <a href={`tel:${contact.contact}`} className="text-primary text-xs">
                                {contact.contact}
                              </a>
                            </div>
                          </div>
                          
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="h-7 text-xs"
                            onClick={() => handleEmergencyCall(contact)}
                          >
                            <Phone size={14} className="mr-1" />
                            Call
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
            
            {allContacts.length > 4 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="mt-4 w-full text-xs"
              >
                {expanded ? "Show Less" : "Show More Contacts"}
              </Button>
            )}
            
            <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-lg text-sm">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <strong>Wander Trip 24/7 Helpline:</strong>
                  <div className="flex items-center mt-1">
                    <a href="tel:+18001234567" className="text-primary font-medium">+1-800-123-4567</a>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="h-7 text-xs ml-2"
                      onClick={() => toast.info("Calling Wander Trip Helpline", {
                        description: "This is a simulation. In a real app, this would initiate a call."
                      })}
                    >
                      <Phone size={14} className="mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyContactsEnhanced;
