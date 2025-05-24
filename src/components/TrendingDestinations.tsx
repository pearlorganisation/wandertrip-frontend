
import React from 'react';
import { motion } from 'framer-motion';
import DestinationCard from '@/components/DestinationCard';

interface TrendingDestinationsProps {
  destinations: Array<{
    id: string;
    name: string;
    location: string;
    image: string;
    rating: number;
    isHidden?: boolean;
  }>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function TrendingDestinations({ destinations }: TrendingDestinationsProps) {
  return (
    <section className="py-20 bg-muted/10">
      <div className="container px-4 sm:px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wide uppercase rounded-full bg-primary/10 text-primary">
            Trending Now
          </span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-balance">
            Hot Destinations
          </h2>
          <p className="text-muted-foreground text-lg">
            These destinations are gaining popularity right now
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {destinations.map((destination, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
            >
              <DestinationCard {...destination} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
