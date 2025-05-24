
import React from 'react';
import { Lock, Shield, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TrustedPaymentInfoProps {
  className?: string;
}

export default function TrustedPaymentInfo({ className }: TrustedPaymentInfoProps) {
  return (
    <motion.div
      className={cn("bg-primary/5 rounded-lg p-4", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-2">
        <Lock size={16} className="text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs text-primary font-medium">Secure payment processing</p>
          <p className="text-xs text-muted-foreground">
            Your payment information is encrypted and processed securely using industry-standard SSL technology.
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-primary/10 flex items-start space-x-2">
        <Shield size={16} className="text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs text-primary font-medium">Purchase protection</p>
          <p className="text-xs text-muted-foreground">
            Your booking is protected by our satisfaction guarantee and 24-hour free cancellation policy.
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-primary/10 flex items-start space-x-2">
        <Info size={16} className="text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs text-muted-foreground">
            By proceeding with payment, you agree to our Terms of Service, Privacy Policy, and Refund Policy.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
