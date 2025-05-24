
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PaymentTrustReviewsProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export default function PaymentTrustReviews({ 
  className,
  variant = 'default'
}: PaymentTrustReviewsProps) {
  const reviews = [
    {
      name: "Sarah M.",
      location: "United States",
      review: "The payment process was smooth and secure. I appreciated all the verification steps that ensured my information was protected.",
      rating: 5
    },
    {
      name: "James W.",
      location: "United Kingdom",
      review: "I was hesitant about booking online, but the security measures and money-back guarantee gave me confidence. Great experience!",
      rating: 5
    },
    {
      name: "Priya K.",
      location: "India",
      review: "The transparent booking process and secure payment options made me feel completely at ease. Will definitely use again.",
      rating: 5
    }
  ];

  return (
    <motion.div 
      className={cn("glass rounded-xl overflow-hidden", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-medium">Travelers Trust Our Secure Booking</h3>
          <p className="text-sm text-muted-foreground">
            Read what our customers say about their booking experience
          </p>
        </div>

        <div className="space-y-4">
          {reviews.slice(0, variant === 'compact' ? 2 : 3).map((review, index) => (
            <motion.div 
              key={index}
              className="p-4 rounded-lg bg-background/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.location}</p>
                </div>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <div className="flex">
                <Quote className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {review.review}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
