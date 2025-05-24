
import React, { useState } from 'react';
import { 
  Check, 
  Clipboard, 
  Calendar, 
  BookOpen, 
  Umbrella, 
  ShieldCheck, 
  Map, 
  CreditCard,
  Clock,
  Download,
  Plane,
  Luggage,
  Phone
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  category: 'documents' | 'booking' | 'packing' | 'health' | 'planning';
}

interface PreTripChecklistProps {
  destination?: string;
  departureDate?: string;
  className?: string;
  onComplete?: () => void;
}

export const PreTripChecklist = ({ 
  destination = "your destination", 
  departureDate,
  className,
  onComplete
}: PreTripChecklistProps) => {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: '1',
      title: 'Check passport validity',
      description: 'Ensure your passport is valid for at least 6 months beyond your travel dates',
      icon: <BookOpen size={18} />,
      completed: false,
      category: 'documents'
    },
    {
      id: '2',
      title: 'Research visa requirements',
      description: `Check if you need a visa for ${destination}`,
      icon: <Clipboard size={18} />,
      completed: false,
      category: 'documents'
    },
    {
      id: '3',
      title: 'Book accommodations',
      description: 'Confirm all hotel/lodging reservations',
      icon: <Calendar size={18} />,
      completed: false,
      category: 'booking'
    },
    {
      id: '4',
      title: 'Purchase travel insurance',
      description: 'Get comprehensive coverage for your trip',
      icon: <ShieldCheck size={18} />,
      completed: false,
      category: 'planning'
    },
    {
      id: '5',
      title: 'Check weather forecast',
      description: `Review the weather forecast for ${destination}`,
      icon: <Umbrella size={18} />,
      completed: false,
      category: 'planning'
    },
    {
      id: '6',
      title: 'Download offline maps',
      description: `Save offline maps of ${destination} areas you'll visit`,
      icon: <Map size={18} />,
      completed: false,
      category: 'planning'
    },
    {
      id: '7',
      title: 'Notify bank of travel plans',
      description: 'Inform your bank/credit card companies about your travel dates',
      icon: <CreditCard size={18} />,
      completed: false,
      category: 'planning'
    },
    {
      id: '8',
      title: 'Pack essential items',
      description: 'Prepare your luggage with all necessary items',
      icon: <Luggage size={18} />,
      completed: false,
      category: 'packing'
    },
  ]);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const handleToggleComplete = (id: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    
    const item = items.find(item => item.id === id);
    if (item) {
      if (!item.completed) {
        toast.success(`Task completed: ${item.title}`);
      }
    }
  };
  
  const completionPercentage = Math.round(
    (items.filter(item => item.completed).length / items.length) * 100
  );
  
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);
    
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'documents', name: 'Documents' },
    { id: 'booking', name: 'Bookings' },
    { id: 'planning', name: 'Planning' },
    { id: 'packing', name: 'Packing' }
  ];

  const handleMarkAllComplete = () => {
    setItems(prevItems => prevItems.map(item => ({ ...item, completed: true })));
    toast.success("All tasks completed!");
    if (onComplete) onComplete();
  };
  
  const handleDownloadChecklist = () => {
    const checklistText = items.map(item => 
      `- [${item.completed ? 'x' : ' '}] ${item.title} - ${item.description}`
    ).join('\n');
    
    const element = document.createElement('a');
    const file = new Blob([`# Pre-Trip Checklist for ${destination}\n\n${checklistText}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `trip-checklist-${destination.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success('Checklist downloaded successfully!');
  };

  return (
    <div className={cn("bg-card/50 rounded-xl p-6 shadow-sm border border-border/40", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Plane className="h-5 w-5 text-primary" />
          Pre-Trip Checklist
          {departureDate && (
            <span className="text-sm font-normal text-muted-foreground ml-2">
              (Departure: {departureDate})
            </span>
          )}
        </h3>
        
        <div className="mt-3 flex items-center gap-3">
          <Progress value={completionPercentage} className="h-2" />
          <span className="text-sm font-medium">{completionPercentage}%</span>
        </div>
      </div>
      
      <div className="overflow-x-auto -mx-2 px-2 pb-2">
        <div className="flex gap-2 mb-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2 mt-3 max-h-[350px] overflow-y-auto pr-2">
        {filteredItems.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg transition-colors",
              item.completed ? "bg-primary/5 border border-primary/10" : "bg-card hover:bg-muted/50"
            )}
          >
            <button
              onClick={() => handleToggleComplete(item.id)}
              className={cn(
                "flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center border transition-colors mt-0.5",
                item.completed 
                  ? "bg-primary border-primary text-primary-foreground" 
                  : "border-border hover:border-primary/50"
              )}
            >
              {item.completed && <Check size={12} />}
            </button>
            
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <span className="text-primary">{item.icon}</span>
                <h4 className={cn(
                  "font-medium text-sm",
                  item.completed && "line-through text-muted-foreground"
                )}>
                  {item.title}
                </h4>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs"
          onClick={handleDownloadChecklist}
        >
          <Download size={12} className="mr-1" />
          Download
        </Button>
        
        <Button
          size="sm"
          className="text-xs"
          disabled={completionPercentage >= 100}
          onClick={handleMarkAllComplete}
        >
          <Check size={12} className="mr-1" />
          Mark All Complete
        </Button>
      </div>
    </div>
  );
};

export default PreTripChecklist;
