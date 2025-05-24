
import React, { useState } from 'react';
import { ShieldCheck, Check, Plane, Heart, Wallet, Umbrella, ChevronDown, ChevronUp, AlertTriangle, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

interface TravelInsuranceInfoProps {
  className?: string;
}

export const TravelInsuranceInfo = ({ className }: TravelInsuranceInfoProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  
  const insurancePlans = [
    {
      id: 'basic',
      name: 'Basic Coverage',
      price: '$25',
      coverage: [
        { feature: 'Trip Cancellation', limit: 'Up to $2,000', included: true },
        { feature: 'Emergency Medical', limit: 'Up to $10,000', included: true },
        { feature: 'Baggage Loss', limit: 'Up to $500', included: true },
        { feature: 'Travel Delay', limit: 'Up to $300', included: true },
        { feature: 'Emergency Evacuation', limit: 'Up to $50,000', included: false },
        { feature: 'Adventure Activities', limit: 'Not covered', included: false },
        { feature: 'Pre-existing Conditions', limit: 'Not covered', included: false },
      ],
      recommendation: 'Good for short domestic trips'
    },
    {
      id: 'premium',
      name: 'Premium Coverage',
      price: '$49',
      coverage: [
        { feature: 'Trip Cancellation', limit: 'Up to $5,000', included: true },
        { feature: 'Emergency Medical', limit: 'Up to $50,000', included: true },
        { feature: 'Baggage Loss', limit: 'Up to $1,000', included: true },
        { feature: 'Travel Delay', limit: 'Up to $500', included: true },
        { feature: 'Emergency Evacuation', limit: 'Up to $250,000', included: true },
        { feature: 'Adventure Activities', limit: 'Basic coverage', included: true },
        { feature: 'Pre-existing Conditions', limit: 'Not covered', included: false },
      ],
      recommendation: 'Ideal for international travel'
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Coverage',
      price: '$79',
      coverage: [
        { feature: 'Trip Cancellation', limit: 'Up to $10,000', included: true },
        { feature: 'Emergency Medical', limit: 'Up to $100,000', included: true },
        { feature: 'Baggage Loss', limit: 'Up to $2,500', included: true },
        { feature: 'Travel Delay', limit: 'Up to $1,000', included: true },
        { feature: 'Emergency Evacuation', limit: 'Up to $500,000', included: true },
        { feature: 'Adventure Activities', limit: 'Full coverage', included: true },
        { feature: 'Pre-existing Conditions', limit: 'Covered with conditions', included: true },
      ],
      recommendation: 'Best for extended international trips'
    }
  ];
  
  const toggleComparison = () => {
    setShowComparison(!showComparison);
  };
  
  const selectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };
  
  const coverageIcons = {
    'Trip Cancellation': <Plane className="h-4 w-4" />,
    'Emergency Medical': <Heart className="h-4 w-4" />,
    'Baggage Loss': <Wallet className="h-4 w-4" />,
    'Travel Delay': <Clock className="h-4 w-4" />,
    'Emergency Evacuation': <AlertTriangle className="h-4 w-4" />,
    'Adventure Activities': <Activity className="h-4 w-4" />,
    'Pre-existing Conditions': <HelpCircle className="h-4 w-4" />,
  };
  
  return (
    <div className={cn("glass rounded-xl p-6", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2 rounded-full">
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Travel Insurance</h3>
          <p className="text-sm text-muted-foreground">Protect your trip against the unexpected</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {insurancePlans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "border rounded-lg p-4 cursor-pointer transition-colors",
              selectedPlan === plan.id 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50"
            )}
            onClick={() => selectPlan(plan.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{plan.name}</h4>
              <div className="bg-primary/10 text-primary text-sm px-2 py-0.5 rounded-full">
                {plan.price}
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mb-3">{plan.recommendation}</p>
            
            <div className="space-y-2">
              {plan.coverage.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-center text-xs">
                  {item.included ? (
                    <Check size={14} className="text-green-500 mr-2 flex-shrink-0" />
                  ) : (
                    <div className="w-[14px] h-[14px] mr-2 flex-shrink-0" />
                  )}
                  <span className={item.included ? "" : "text-muted-foreground"}>
                    {item.feature}
                  </span>
                </div>
              ))}
            </div>
            
            {selectedPlan === plan.id && (
              <div className="mt-3 pt-3 border-t">
                <Button size="sm" className="w-full text-xs">
                  Select This Plan
                </Button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={toggleComparison}
        className="w-full flex items-center justify-center text-xs mb-4"
      >
        {showComparison ? (
          <>
            <ChevronUp className="h-4 w-4 mr-1" /> Hide Plan Comparison
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4 mr-1" /> Compare Plans in Detail
          </>
        )}
      </Button>
      
      {showComparison && (
        <div className="border rounded-lg overflow-hidden mb-6">
          <div className="grid grid-cols-4 border-b">
            <div className="p-3 font-medium text-sm">Coverage</div>
            {insurancePlans.map(plan => (
              <div key={plan.id} className="p-3 font-medium text-sm text-center">
                {plan.name}
              </div>
            ))}
          </div>
          
          {insurancePlans[0].coverage.map((item, idx) => (
            <div key={idx} className="grid grid-cols-4 border-b last:border-0">
              <div className="p-3 text-sm flex items-center">
                <span className="text-primary mr-2">
                  {coverageIcons[item.feature] || <Umbrella className="h-4 w-4" />}
                </span>
                {item.feature}
              </div>
              
              {insurancePlans.map(plan => (
                <div key={`${plan.id}-${idx}`} className="p-3 text-sm text-center">
                  {plan.coverage[idx].included ? (
                    <span className="text-green-600">{plan.coverage[idx].limit}</span>
                  ) : (
                    <span className="text-muted-foreground">{plan.coverage[idx].limit}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      
      <Accordion type="single" collapsible className="border rounded-lg">
        <AccordionItem value="faq-1" className="border-b">
          <AccordionTrigger className="text-sm px-4">Why do I need travel insurance?</AccordionTrigger>
          <AccordionContent className="text-sm px-4">
            Travel insurance helps protect you from unexpected expenses due to trip cancellations, 
            medical emergencies, lost baggage, and other travel disruptions. It provides financial 
            protection and peace of mind during your journey.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="faq-2" className="border-b">
          <AccordionTrigger className="text-sm px-4">When should I purchase travel insurance?</AccordionTrigger>
          <AccordionContent className="text-sm px-4">
            For maximum coverage, it's best to purchase travel insurance shortly after making your 
            initial trip deposit. Some benefits and coverage for pre-existing conditions are only 
            available if purchased within 14-21 days of your initial trip payment.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="faq-3">
          <AccordionTrigger className="text-sm px-4">What's not covered by travel insurance?</AccordionTrigger>
          <AccordionContent className="text-sm px-4">
            Most travel insurance plans don't cover fear of travel, changed minds, pre-existing 
            medical conditions (unless specifically included), extreme sports (without add-ons), 
            incidents while intoxicated, or travel to high-risk destinations with travel advisories.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TravelInsuranceInfo;

interface ClockProps {
  className?: string;
  size?: number;
}

function Clock({ className, size = 24 }: ClockProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

interface ActivityProps {
  className?: string;
  size?: number;
}

function Activity({ className, size = 24 }: ActivityProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
