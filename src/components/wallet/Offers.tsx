
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Gift, Clock, Tag, Copy, Ticket, ClipboardCopy, CheckCircle, ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function Offers() {
  const [activeTab, setActiveTab] = useState<'all' | 'flights' | 'hotels' | 'activities'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  const offers = [
    {
      id: 1,
      title: "20% Off on International Flights",
      description: "Book any international flight and get 20% off with this special offer",
      code: "FLY20INT",
      expiryDate: "2023-12-31",
      category: "flights",
      discount: "20%",
      minSpend: 500,
      image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Weekend Getaway Hotel Deal",
      description: "Save 15% on weekend hotel bookings in any major city",
      code: "WEEKEND15",
      expiryDate: "2023-12-15",
      category: "hotels",
      discount: "15%",
      minSpend: 200,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "$50 Off Adventure Activities",
      description: "Try something new! Get $50 off on adventure bookings over $200",
      code: "ADVENTURE50",
      expiryDate: "2023-11-30",
      category: "activities",
      discount: "$50",
      minSpend: 200,
      image: "https://images.unsplash.com/photo-1593739742226-5e5e2fdb1f1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "First-time Booker Special",
      description: "New to our platform? Enjoy $25 off your first booking of any type",
      code: "FIRSTTIME25",
      expiryDate: "2023-12-31",
      category: "all",
      discount: "$25",
      minSpend: 200,
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Premium Economy Upgrade",
      description: "Book economy and get upgraded to premium economy on select airlines",
      code: "UPGRADE2023",
      expiryDate: "2023-12-10",
      category: "flights",
      discount: "Upgrade",
      minSpend: 300,
      image: "https://images.unsplash.com/photo-1540339832862-474599807836?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "Luxury Hotel Breakfast Included",
      description: "Book a luxury hotel stay and get complimentary breakfast for two",
      code: "LUXBFAST",
      expiryDate: "2023-12-20",
      category: "hotels",
      discount: "Breakfast",
      minSpend: 400,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    }
  ];
  
  // Filter offers based on active tab
  const filteredOffers = activeTab === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === activeTab);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success('Promo code copied!', {
      description: 'You can now use this code during checkout.',
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Special Offers & Deals</h3>
          </div>
          
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'all' | 'flights' | 'hotels' | 'activities')}>
            <TabsList className="grid grid-cols-4 w-full mb-4">
              <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
              <TabsTrigger value="flights" className="text-xs sm:text-sm">Flights</TabsTrigger>
              <TabsTrigger value="hotels" className="text-xs sm:text-sm">Hotels</TabsTrigger>
              <TabsTrigger value="activities" className="text-xs sm:text-sm">Activities</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-4">
              {filteredOffers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredOffers.map((offer, index) => (
                    <motion.div 
                      key={offer.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="h-full overflow-hidden">
                        <div className="h-32 overflow-hidden">
                          <img 
                            src={offer.image} 
                            alt={offer.title} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{offer.title}</h4>
                            <div className={cn(
                              "px-2 py-1 rounded text-xs font-bold",
                              "bg-primary/10 text-primary"
                            )}>
                              {offer.discount}
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">{offer.description}</p>
                          
                          <div className="flex items-center text-xs text-muted-foreground mb-3">
                            <Tag className="h-3 w-3 mr-1" />
                            <span>Min. spend: ${offer.minSpend}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Expires: {offer.expiryDate}</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <div className="flex-1">
                              <div className="flex items-center justify-between border rounded-md px-3 py-2 bg-muted/50">
                                <code className="text-xs font-mono">{offer.code}</code>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6"
                                  onClick={() => handleCopyCode(offer.code)}
                                >
                                  {copiedCode === offer.code 
                                    ? <CheckCircle className="h-3 w-3 text-green-500" /> 
                                    : <ClipboardCopy className="h-3 w-3" />}
                                </Button>
                              </div>
                            </div>
                            <Button size="sm" variant="outline" className="text-xs">
                              Apply <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Gift className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-medium">No offers available</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Check back later for new deals in this category
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-3">
              <Ticket className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium">Exclusive Member Offers</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Join our loyalty program to unlock even more special deals and discounts
                </p>
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-1">
              View Member Benefits
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
