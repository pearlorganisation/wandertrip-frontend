
import { motion } from 'framer-motion';
import { Shield, Clock, Sparkles, Coins, Heart, Globe, Award, Trophy, CheckCircle2, Zap, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Benefits = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(null);
  const [activeBenefitCategory, setActiveBenefitCategory] = useState<string>("time");

  const benefitCategories = [
    { id: "time", label: "Save Time" },
    { id: "money", label: "Save Money" },
    { id: "experience", label: "Better Experience" }
  ];

  const benefits = {
    time: [
      {
        icon: <Clock className="w-6 h-6 text-primary" />,
        title: "80% Less Planning Time",
        description: "Join 50,000+ travelers who plan entire trips in just minutes, not hours",
        stat: "80%",
        statLabel: "Time Saved",
        color: "from-primary/20 to-primary/5"
      },
      {
        icon: <Shield className="w-6 h-6 text-primary" />,
        title: "Travel with Zero Worries",
        description: "98% of members report feeling more confident and secure while traveling",
        stat: "98%",
        statLabel: "Worry-Free",
        color: "from-wander-600/20 to-wander-600/5"
      },
    ],
    money: [
      {
        icon: <Coins className="w-6 h-6 text-primary" />,
        title: "Unlock Exclusive Savings",
        description: "Members save $350 on average per trip with our insider deals and secret prices",
        stat: "$350",
        statLabel: "Avg Savings",
        color: "from-wander-500/20 to-wander-500/5"
      },
      {
        icon: <Trophy className="w-6 h-6 text-primary" />,
        title: "Earn Elite Status Faster",
        description: "Members reach elite travel status 3x faster with our exclusive partnerships",
        stat: "3x",
        statLabel: "Status Speed",
        color: "from-primary/20 to-primary/5"
      },
    ],
    experience: [
      {
        icon: <Heart className="w-6 h-6 text-primary" />,
        title: "Your Perfect Match",
        description: "Our AI understands your unique style to create your dream travel experience",
        stat: "94%",
        statLabel: "Match Rate",
        color: "from-wander-700/20 to-wander-700/5"
      },
      {
        icon: <Globe className="w-6 h-6 text-primary" />,
        title: "Discover Hidden Gems",
        description: "Access secret spots that 93% of regular tourists never find or experience",
        stat: "93%",
        statLabel: "Uniqueness",
        color: "from-wander-800/20 to-wander-800/5"
      },
    ]
  };

  const testimonials = [
    { 
      name: "Sarah J.", 
      text: "I planned my entire Italy trip in 15 minutes! Saved $430 and found amazing restaurants locals recommended. Now I'm showing all my friends how to do it!",
      image: "https://i.pravatar.cc/100?img=1",
      location: "Italy Trip",
      rating: 5
    },
    { 
      name: "Marcus T.", 
      text: "Reached Gold status in just 2 trips instead of 6. The exclusive perks have completely transformed how I travel. VIP lounge access on my last layover was a game-changer.",
      image: "https://i.pravatar.cc/100?img=2",
      location: "Business Travel",
      rating: 5
    },
    { 
      name: "Elena R.", 
      text: "The hidden beach recommendation in Greece was the highlight of our honeymoon. No tourists, just paradise! We felt like we discovered our own secret world.",
      image: "https://i.pravatar.cc/100?img=3",
      location: "Greece Honeymoon",
      rating: 5
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    transition: { duration: 2, repeat: Infinity }
  };

  // Get the current active benefits
  const activeBenefits = benefits[activeBenefitCategory as keyof typeof benefits] || benefits.time;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30 overflow-hidden">
      <div className="container px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 text-xs font-medium tracking-wide uppercase rounded-full bg-primary/10 text-primary"
          >
            <Award className="w-3.5 h-3.5" /> Why Choose Us
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-wander-600 bg-clip-text text-transparent">
            Transform Your Travel Experience
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands who've already unlocked these exclusive benefits
          </p>
          
          {/* Visual divider */}
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-wander-600 rounded-full mx-auto mt-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Benefit category tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-muted/50 p-1 rounded-full">
            {benefitCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveBenefitCategory(category.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeBenefitCategory === category.id 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          key={activeBenefitCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {activeBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 ${hoveredIndex === index ? 'shadow-xl' : 'shadow-md'}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-40 -z-10`}></div>
              
              <motion.div 
                initial={{ scale: 1 }}
                animate={{ scale: hoveredIndex === index ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5"
              >
                {benefit.icon}
              </motion.div>
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
                <motion.div 
                  className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full"
                  animate={hoveredIndex === index ? pulseAnimation : {}}
                >
                  <div className="text-base font-bold text-primary">{benefit.stat}</div>
                </motion.div>
              </div>
              
              <p className="text-muted-foreground mb-5">{benefit.description}</p>
              
              <div className="text-xs text-primary font-medium flex items-center gap-1.5 mt-auto">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified by {benefit.statLabel} metrics</span>
              </div>
              
              {hoveredIndex === index && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="absolute bottom-0 right-0 w-28 h-28 -mb-10 -mr-10 opacity-10"
                >
                  <Zap className="w-full h-full text-primary" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-semibold mb-8 text-primary">
            Success Stories from Our Community
          </h3>
          
          <div className="flex flex-col md:flex-row justify-between gap-5 mb-14">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + (index * 0.1) }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                onClick={() => setExpandedTestimonial(expandedTestimonial === index ? null : index)}
                className="bg-card p-6 rounded-xl shadow-md border border-border hover:border-primary/20 flex-1 cursor-pointer transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 mr-3 overflow-hidden">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-primary">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Sparkles key={i} className="w-3.5 h-3.5 text-primary" />
                    ))}
                  </div>
                </div>
                
                <div className="text-left">
                  <p className="text-sm mb-3 transition-all duration-300" style={{ 
                    height: expandedTestimonial === index ? 'auto' : '4.5rem',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: expandedTestimonial === index ? 'unset' : 3,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    "{testimonial.text}"
                  </p>
                  <div className="text-xs text-primary font-medium flex items-center justify-end gap-1.5">
                    <span>
                      {expandedTestimonial === index ? "Show less" : "Read more"}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedTestimonial === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mt-16 mb-12">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-3 bg-primary/10 px-5 py-3 rounded-full"
            >
              <span className="text-2xl font-bold text-primary">98%</span>
              <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-3 bg-primary/10 px-5 py-3 rounded-full"
            >
              <span className="text-2xl font-bold text-primary">50K+</span>
              <span className="text-sm text-muted-foreground">Happy Travelers</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-3 bg-primary/10 px-5 py-3 rounded-full"
            >
              <span className="text-2xl font-bold text-primary">120+</span>
              <span className="text-sm text-muted-foreground">Countries Covered</span>
            </motion.div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-wander-600 hover:from-primary/90 hover:to-wander-600/90 text-white font-medium rounded-full px-10 py-6 h-auto text-base"
                asChild
              >
                <Link to="/trip-planner">
                  Start Your Journey Now
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="font-medium rounded-full px-8 py-6 h-auto text-base border-primary/25 hover:bg-primary/5"
                asChild
              >
                <Link to="/destinations">
                  <Globe className="mr-2 w-5 h-5" />
                  Explore Destinations
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
