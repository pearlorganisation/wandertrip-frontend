
import { useState } from 'react';
import { Plane, Calendar, Clock, AlertCircle, Check, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const FlightTracker = () => {
  const [expanded, setExpanded] = useState(false);

  const flightInfo = {
    airline: "United Airlines",
    flightNumber: "UA1234",
    departureAirport: "JFK",
    departureCity: "New York",
    departureTime: "08:30",
    departureDate: "2025-05-15",
    departureTerminal: "T4",
    departureGate: "G22",
    arrivalAirport: "LAX",
    arrivalCity: "Los Angeles",
    arrivalTime: "11:45",
    arrivalDate: "2025-05-15",
    arrivalTerminal: "T5",
    arrivalGate: "Pending",
    status: "on-time",
    aircraft: "Boeing 787-9",
    duration: "5h 15m",
    distance: "2,475 miles",
    progress: 35,
  };

  const statusColors = {
    'on-time': { bg: 'bg-green-100', text: 'text-green-800', badge: 'bg-green-500' },
    'delayed': { bg: 'bg-amber-100', text: 'text-amber-800', badge: 'bg-amber-500' },
    'cancelled': { bg: 'bg-red-100', text: 'text-red-800', badge: 'bg-red-500' },
  };

  const statusType = flightInfo.status === 'on-time' ? 'on-time' : 
                     flightInfo.status === 'delayed' ? 'delayed' : 'cancelled';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Plane className="text-primary" size={20} />
          </div>
          <div>
            <div className="font-medium">{flightInfo.airline} {flightInfo.flightNumber}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar size={12} /> {flightInfo.departureDate}
            </div>
          </div>
        </div>
        
        <Badge 
          variant="outline" 
          className={`capitalize ${statusColors[statusType].bg} ${statusColors[statusType].text} border-0`}
        >
          {flightInfo.status}
        </Badge>
      </div>
      
      <div className="p-4 rounded-lg border border-border/60 bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <div className="text-center">
            <div className="text-lg font-bold">{flightInfo.departureTime}</div>
            <div className="text-sm font-medium">{flightInfo.departureAirport}</div>
            <div className="text-xs text-muted-foreground">{flightInfo.departureCity}</div>
          </div>
          
          <div className="flex-grow px-4">
            <div className="relative">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Departed</span>
                <span>{flightInfo.duration}</span>
                <span>Arriving</span>
              </div>
              <Progress value={flightInfo.progress} className="h-1" />
              <div className="absolute left-0 top-0 mt-4 w-full flex justify-center">
                <div className="bg-muted px-2 py-0.5 rounded text-xs text-muted-foreground">
                  <Plane size={12} className="inline mr-1" />
                  {flightInfo.progress}% complete
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold">{flightInfo.arrivalTime}</div>
            <div className="text-sm font-medium">{flightInfo.arrivalAirport}</div>
            <div className="text-xs text-muted-foreground">{flightInfo.arrivalCity}</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-muted-foreground">Departure Terminal:</span> <span className="font-medium">{flightInfo.departureTerminal}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Departure Gate:</span> <span className="font-medium">{flightInfo.departureGate}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-muted-foreground">Arrival Terminal:</span> <span className="font-medium">{flightInfo.arrivalTerminal}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Arrival Gate:</span> <span className="font-medium">{flightInfo.arrivalGate}</span>
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="space-y-3 pt-2 animate-fade-in">
          <div className="flex justify-between text-sm">
            <div>
              <span className="text-muted-foreground">Aircraft:</span> <span className="font-medium">{flightInfo.aircraft}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Distance:</span> <span className="font-medium">{flightInfo.distance}</span>
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 flex items-start gap-2">
            <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-700">
              <p className="font-medium mb-1">Travel Advisory</p>
              <p>Please arrive at the airport at least 2 hours before your scheduled departure time. Remember to bring valid photo ID and check baggage restrictions.</p>
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-green-50 border border-green-100 flex items-start gap-2">
            <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-green-700">
              <p className="font-medium mb-1">Flight Status</p>
              <p>Your flight is currently on time. We'll notify you of any changes to the departure time.</p>
            </div>
          </div>
        </div>
      )}
      
      <Button 
        variant="outline" 
        size="sm"
        className="w-full"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "Show More Details"}
      </Button>
    </div>
  );
};

export default FlightTracker;
