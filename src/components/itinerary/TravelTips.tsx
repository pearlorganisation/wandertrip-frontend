
import { Star, Sparkles, LightbulbIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface TravelTip {
  title: string;
  description: string;
}

interface TravelTipsProps {
  tips: TravelTip[];
}

export const TravelTips = ({ tips }: TravelTipsProps) => {
  return (
    <section className="py-12">
      <div className="container px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-medium mb-2 flex items-center">
              <Sparkles size={20} className="text-primary mr-2" />
              Travel Tips & Highlights
            </h2>
            <p className="text-muted-foreground mb-8">
              Make the most of your trip with these local insights and expert recommendations
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {tips.map((tip, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
                }}
                className="glass p-6 rounded-xl border border-muted/80 transition-all"
              >
                <h3 className="font-medium mb-2 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <LightbulbIcon size={16} className="text-primary" />
                  </div>
                  {tip.title}
                </h3>
                <p className="text-muted-foreground text-sm pl-11">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
