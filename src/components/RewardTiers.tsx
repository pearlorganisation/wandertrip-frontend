
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Shield, Check, Crown, Zap, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type TierType = 'Explorer' | 'Adventurer' | 'Voyager' | 'Globetrotter';

interface TierProps {
  name: TierType;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  benefits: string[];
  pointsRequired: number;
  isActive?: boolean;
}

const tiers: TierProps[] = [
  {
    name: 'Explorer',
    description: 'Begin your journey with special welcome perks',
    icon: Star,
    color: 'bg-blue-500',
    benefits: [
      'Welcome bonus of 500 points',
      'Access to basic travel guides',
      'Email notifications for deals',
      'Participation in community forums'
    ],
    pointsRequired: 0
  },
  {
    name: 'Adventurer',
    description: 'Enhanced benefits for frequent travelers',
    icon: Zap,
    color: 'bg-emerald-500',
    benefits: [
      'All Explorer benefits',
      '5% discount on bookings',
      'Priority customer support',
      'Free city guides downloads',
      'Monthly exclusive deals'
    ],
    pointsRequired: 2500
  },
  {
    name: 'Voyager',
    description: 'Premium travel perks for seasoned travelers',
    icon: Shield,
    color: 'bg-purple-500',
    benefits: [
      'All Adventurer benefits',
      '10% discount on bookings',
      'Free airport lounge access (2x/year)',
      'Room upgrades when available',
      'Dedicated travel advisor',
      'Exclusive partner offers'
    ],
    pointsRequired: 7500
  },
  {
    name: 'Globetrotter',
    description: 'Ultimate rewards for our most loyal members',
    icon: Crown,
    color: 'bg-amber-500',
    benefits: [
      'All Voyager benefits',
      '15% discount on all bookings',
      'Free concierge service',
      'Unlimited airport lounge access',
      'Guaranteed room upgrades',
      'Annual luxury travel surprise gift',
      'VIP event invitations worldwide'
    ],
    pointsRequired: 15000
  }
];

const TierCard = ({ tier, currentPoints }: { tier: TierProps, currentPoints: number }) => {
  const isActive = currentPoints >= tier.pointsRequired;
  const isNext = !isActive && tier.pointsRequired === Math.min(...tiers
    .filter(t => t.pointsRequired > currentPoints)
    .map(t => t.pointsRequired));
  
  const progressToNextLevel = isActive && tier.name !== 'Globetrotter'
    ? ((currentPoints - tier.pointsRequired) / (tiers[tiers.findIndex(t => t.name === tier.name) + 1].pointsRequired - tier.pointsRequired)) * 100
    : 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: tiers.indexOf(tier) * 0.1 }}
    >
      <Card className={cn(
        "h-full overflow-hidden transition-all duration-300 relative",
        isActive ? "border-primary/40 shadow-md" : "border-border",
        isNext ? "border-primary/30 shadow-sm" : ""
      )}>
        {isActive && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
        )}
        
        <CardHeader className="pt-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              isActive ? tier.color : "bg-muted"
            )}>
              <tier.icon className={cn(
                "w-5 h-5",
                isActive ? "text-white" : "text-muted-foreground"
              )} />
            </div>
            
            {isActive && (
              <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                <Check size={12} />
                <span>Active</span>
              </div>
            )}
            
            {isNext && (
              <div className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded-full">
                Next Tier
              </div>
            )}
          </div>
          
          <h3 className={cn(
            "text-xl font-bold",
            isActive ? "text-primary" : "text-foreground"
          )}>
            {tier.name}
          </h3>
          <p className="text-sm text-muted-foreground">{tier.description}</p>
        </CardHeader>
        
        <CardContent className="pb-6 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{tier.pointsRequired.toLocaleString()} points required</span>
              {isActive && tier.name !== 'Globetrotter' && (
                <span className="text-primary font-medium">
                  {currentPoints.toLocaleString()} / {tiers[tiers.findIndex(t => t.name === tier.name) + 1].pointsRequired.toLocaleString()}
                </span>
              )}
            </div>
            
            {isActive && tier.name !== 'Globetrotter' && (
              <Progress value={progressToNextLevel} className="h-2" />
            )}
            
            {!isActive && (
              <div className="flex justify-between text-sm items-center">
                <span className="text-muted-foreground">
                  {Math.max(tier.pointsRequired - currentPoints, 0).toLocaleString()} points to unlock
                </span>
                <Progress value={(currentPoints / tier.pointsRequired) * 100} max={100} className="w-1/3 h-2" />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Benefits</h4>
            <ul className="space-y-1.5">
              {tier.benefits.map((benefit, index) => (
                <li key={index} className="flex text-sm">
                  <Check size={16} className={cn(
                    "mr-2 flex-shrink-0 mt-0.5",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className={isActive ? "text-foreground" : "text-muted-foreground"}>
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          {!isActive && (
            <Button variant="outline" className="w-full mt-4">
              <Sparkles size={16} className="mr-2" />
              How to earn points
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function RewardTiers() {
  // Mock user current points - in a real app this would come from an API or context
  const currentPoints = 3500;
  const currentTier = tiers.reduce((prev, current) => 
    currentPoints >= current.pointsRequired ? current : prev, tiers[0]);
  
  return (
    <div className="py-16 bg-background">
      <div className="container px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-medium tracking-wide rounded-full bg-primary/10 text-primary">
            <Trophy size={14} />
            <span>Loyalty Program</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Reward Tiers & Benefits
          </h2>
          <p className="text-muted-foreground text-lg">
            Unlock exclusive perks as you travel more with us
          </p>
          
          <div className="mt-8 p-4 bg-primary/5 rounded-lg inline-flex items-center gap-3">
            <Award className="text-primary h-5 w-5" />
            <span>
              <span className="text-foreground font-medium">Your current tier: </span>
              <span className="text-primary font-bold">{currentTier.name}</span>
            </span>
            <div className="h-4 w-px bg-border mx-1"></div>
            <span>
              <span className="text-foreground font-medium">Points: </span>
              <span className="text-primary font-bold">{currentPoints.toLocaleString()}</span>
            </span>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {tiers.map((tier) => (
            <TierCard key={tier.name} tier={tier} currentPoints={currentPoints} />
          ))}
        </div>
      </div>
    </div>
  );
}
