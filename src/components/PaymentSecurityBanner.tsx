
import React from 'react';
import { Shield, ShieldCheck, Lock, CreditCard, ThumbsUp, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PaymentSecurityBannerProps {
  className?: string;
  variant?: 'default' | 'compact' | 'minimal';
}

export default function PaymentSecurityBanner({ 
  className,
  variant = 'default'
}: PaymentSecurityBannerProps) {
  const securityFeatures = [
    {
      icon: <ShieldCheck className="h-5 w-5 text-primary" />,
      title: "Secure Payments",
      description: "Your payment information is encrypted and never stored"
    },
    {
      icon: <BadgeCheck className="h-5 w-5 text-primary" />,
      title: "100% Satisfaction",
      description: "All bookings come with our satisfaction guarantee"
    },
    {
      icon: <Lock className="h-5 w-5 text-primary" />,
      title: "Data Protection",
      description: "Your personal information is safeguarded at all times"
    },
    {
      icon: <ThumbsUp className="h-5 w-5 text-primary" />,
      title: "Free Cancellation",
      description: "Most bookings can be cancelled without fees"
    }
  ];

  // For compact and minimal variants, show fewer items
  const displayFeatures = variant === 'minimal' 
    ? securityFeatures.slice(0, 2) 
    : securityFeatures;

  return (
    <motion.div 
      className={cn(
        "rounded-xl overflow-hidden",
        variant === 'minimal' ? "p-3 glass-dark" : "p-5 glass",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {variant === 'default' && (
        <div className="mb-4 text-center">
          <h3 className="text-lg font-medium">Your Security Is Our Priority</h3>
          <p className="text-sm text-muted-foreground">
            Book with confidence knowing your payments and personal information are protected
          </p>
        </div>
      )}

      <div className={cn(
        "grid gap-4",
        variant === 'default' ? "grid-cols-2 md:grid-cols-4" : 
        variant === 'compact' ? "grid-cols-2" : "grid-cols-2"
      )}>
        {displayFeatures.map((feature, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  {variant !== 'minimal' && (
                    <div>
                      <h4 className="text-sm font-medium">{feature.title}</h4>
                      {variant === 'default' && (
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      )}
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm">
                  <p className="font-medium">{feature.title}</p>
                  <p className="text-muted-foreground text-xs">{feature.description}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      {variant === 'default' && (
        <div className="mt-5 pt-4 border-t border-border/30 flex justify-center space-x-4">
          <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-8" />
          <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="MasterCard" className="h-8" />
          <img src="https://cdn-icons-png.flaticon.com/128/349/349230.png" alt="American Express" className="h-8" />
          <img src="https://cdn-icons-png.flaticon.com/128/217/217445.png" alt="PayPal" className="h-8" />
        </div>
      )}
    </motion.div>
  );
}
