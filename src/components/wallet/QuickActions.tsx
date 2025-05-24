
import React from 'react';
import { 
  CreditCard, 
  Building, 
  Gift, 
  ReceiptText, 
  Smartphone, 
  LightbulbIcon, 
  Droplet, 
  Wifi, 
  Tv 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function QuickActions() {
  const { toast } = useToast();

  const quickActions = [
    { icon: <Building className="h-5 w-5" />, label: "To Bank", action: "bank" },
    { icon: <CreditCard className="h-5 w-5" />, label: "Cards", action: "cards" },
    { icon: <ReceiptText className="h-5 w-5" />, label: "Bills", action: "bills" },
    { icon: <Smartphone className="h-5 w-5" />, label: "Mobile", action: "mobile" },
    { icon: <Gift className="h-5 w-5" />, label: "Rewards", action: "rewards" },
    { icon: <LightbulbIcon className="h-5 w-5" />, label: "Electricity", action: "electricity" },
    { icon: <Droplet className="h-5 w-5" />, label: "Water", action: "water" },
    { icon: <Tv className="h-5 w-5" />, label: "DTH", action: "dth" },
    { icon: <Wifi className="h-5 w-5" />, label: "Internet", action: "internet" },
  ];

  const handleQuickAction = (action: string) => {
    toast({
      title: "Coming Soon",
      description: `The ${action} payment feature will be available soon.`,
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">Quick Actions</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="flex flex-col h-auto py-3 px-1 hover:bg-muted"
              onClick={() => handleQuickAction(action.action)}
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                {React.cloneElement(action.icon, { className: "h-4 w-4 text-primary" })}
              </div>
              <span className="text-xs font-normal">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
