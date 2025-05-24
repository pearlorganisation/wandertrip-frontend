
import React from 'react';
import { Heart, ShieldCheck, Clock, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface SatisfactionGuaranteeProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export default function SatisfactionGuarantee({ 
  className,
  variant = 'default'
}: SatisfactionGuaranteeProps) {
  return (
    <motion.div 
      className={cn(
        "glass rounded-xl overflow-hidden p-5",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Heart className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Our Satisfaction Guarantee</h3>
          <p className="text-sm text-muted-foreground">
            Your happiness is our priority, guaranteed
          </p>
        </div>
      </div>
      
      {variant === 'default' && (
        <Alert className="mb-4 bg-primary/5 border-primary/20">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <AlertTitle>100% Satisfaction Guarantee</AlertTitle>
          <AlertDescription>
            If you're not completely satisfied with your booking within 24 hours of purchase, 
            we'll give you a full refund—no questions asked.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium">24-Hour Cancellation</p>
            <p className="text-xs text-muted-foreground">
              Cancel within 24 hours of booking for a full refund
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <RefreshCcw className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium">Change Plans Without Worry</p>
            <p className="text-xs text-muted-foreground">
              Modify your booking with flexible change options
            </p>
          </div>
        </div>
        
        {variant === 'default' && (
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Price Guarantee</p>
              <p className="text-xs text-muted-foreground">
                If you find a lower price elsewhere within 48 hours, we'll match it
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
