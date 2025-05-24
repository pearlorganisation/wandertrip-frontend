
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UsersRound, Copy, Share2, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWalletStore } from '@/hooks/useWalletStore';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function ReferralProgram() {
  const { currency } = useWalletStore();
  const [copied, setCopied] = useState(false);
  
  // Mock referral data
  const referralCode = "WANDERFRIEND25";
  const referralUrl = `https://wandertrip.com/refer?code=${referralCode}`;
  const referralBonus = 25;
  const totalReferred = 3;
  const pendingReferrals = 2;
  const earnedAmount = 50;
  
  const referralHistory = [
    { id: 1, name: "John Smith", status: "completed", date: "2023-10-15", reward: 25 },
    { id: 2, name: "Emma Wilson", status: "completed", date: "2023-09-22", reward: 25 },
    { id: 3, name: "Michael Brown", status: "pending", date: "2023-11-05", reward: 0 },
    { id: 4, name: "Sophie Taylor", status: "pending", date: "2023-11-10", reward: 0 },
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success('Referral code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join me on WanderTrip!',
        text: `Use my referral code ${referralCode} and get ${currency}${referralBonus} off your first trip!`,
        url: referralUrl,
      })
      .then(() => toast.success('Thanks for sharing!'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      toast('Copy the link to share with friends!');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <UsersRound className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Refer & Earn</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Invite friends and earn {currency}{referralBonus} for each successful referral
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="border rounded-md px-3 py-2 bg-muted/50 font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap max-w-[180px]">
                    {referralCode}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10"
                  onClick={handleCopyCode}
                >
                  {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                className="w-full"
                onClick={handleShare}
              >
                Invite Friends
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <UsersRound className="h-5 w-5 text-primary" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{totalReferred}</div>
              <div className="text-sm text-muted-foreground">Friends Referred</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{currency}{earnedAmount}</div>
              <div className="text-sm text-muted-foreground">Total Earned</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <UsersRound className="h-5 w-5 text-primary" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{pendingReferrals}</div>
              <div className="text-sm text-muted-foreground">Pending Referrals</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-4">Referral History</h3>
          
          {referralHistory.length > 0 ? (
            <div className="space-y-3">
              {referralHistory.map((referral) => (
                <motion.div 
                  key={referral.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <div className="font-medium">{referral.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Referred on {referral.date}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={cn(
                      "text-xs px-2 py-1 rounded-full mr-2",
                      referral.status === 'completed' 
                        ? "bg-green-100 text-green-600" 
                        : "bg-amber-100 text-amber-600"
                    )}>
                      {referral.status === 'completed' ? 'Completed' : 'Pending'}
                    </div>
                    {referral.status === 'completed' && (
                      <div className="font-medium text-green-600">
                        +{currency}{referral.reward}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <UsersRound className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-medium">No referrals yet</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Start inviting friends to earn rewards
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-3">How It Works</h3>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <div className="font-medium">Share your referral code</div>
                <div className="text-sm text-muted-foreground">
                  Send your unique code to friends via email, social media, or text
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <div className="font-medium">Friend signs up & books</div>
                <div className="text-sm text-muted-foreground">
                  They create an account and complete their first booking using your code
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <div className="font-medium">Both of you get rewarded</div>
                <div className="text-sm text-muted-foreground">
                  You receive {currency}{referralBonus} and they get {currency}{referralBonus} off their first trip
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
