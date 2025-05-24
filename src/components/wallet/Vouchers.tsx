
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TicketPlus, Gift, Clock, CheckCircle, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWalletStore } from '@/hooks/useWalletStore';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function Vouchers() {
  const { addVoucher, vouchers } = useWalletStore();
  const [voucherCode, setVoucherCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'used'>('active');

  const handleAddVoucher = () => {
    if (!voucherCode.trim()) {
      toast.error('Please enter a voucher code');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Check if code is already used
      if (vouchers.some(v => v.code === voucherCode)) {
        toast.error('This voucher has already been redeemed');
        setIsLoading(false);
        return;
      }
      
      // Demo valid codes
      if (['TRAVEL25', 'WELCOME10', 'HOLIDAY50'].includes(voucherCode)) {
        const amounts = { 'TRAVEL25': 25, 'WELCOME10': 10, 'HOLIDAY50': 50 };
        
        // Add voucher
        addVoucher({
          id: Date.now().toString(),
          code: voucherCode,
          amount: amounts[voucherCode as keyof typeof amounts],
          expiryDate: '2023-12-31',
          isUsed: false,
          type: 'discount',
          description: `${voucherCode === 'TRAVEL25' ? '25% off your next trip' : 
                      voucherCode === 'WELCOME10' ? '$10 travel credit' : 
                      '$50 hotel discount'}`
        });
        
        toast.success('Voucher added successfully!', {
          description: `${voucherCode} has been added to your wallet.`,
        });
      } else {
        toast.error('Invalid voucher code', {
          description: 'Please try one of our demo codes: TRAVEL25, WELCOME10, or HOLIDAY50',
        });
      }
      
      setVoucherCode('');
      setIsLoading(false);
    }, 1000);
  };

  const activeVouchers = vouchers.filter(v => !v.isUsed);
  const usedVouchers = vouchers.filter(v => v.isUsed);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <TicketPlus className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Add a Voucher</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Enter voucher code"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                className="flex-1"
              />
              <Button 
                onClick={handleAddVoucher}
                disabled={!voucherCode.trim() || isLoading}
              >
                {isLoading ? "Adding..." : "Apply"}
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Hint: Try our demo codes: TRAVEL25, WELCOME10, or HOLIDAY50
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'active' | 'used')}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Zap className="h-4 w-4" /> Active ({activeVouchers.length})
          </TabsTrigger>
          <TabsTrigger value="used" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" /> Used ({usedVouchers.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-4">
          {activeVouchers.length > 0 ? (
            <div className="space-y-4">
              {activeVouchers.map((voucher, index) => (
                <motion.div 
                  key={voucher.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={cn(
                    "border border-dashed rounded-lg p-4 relative overflow-hidden",
                    "bg-gradient-to-r from-primary/5 to-primary/10"
                  )}
                >
                  <div className="absolute -right-4 -top-4 bg-primary/10 w-16 h-16 rounded-full" />
                  
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{voucher.description}</div>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Expires: {voucher.expiryDate}</span>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {voucher.type === 'discount' && voucher.amount > 0 && voucher.amount <= 100 
                        ? `${voucher.amount}%` 
                        : `$${voucher.amount}`}
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-dashed border-primary/20 flex justify-between items-center">
                    <div className="text-xs font-mono bg-primary/10 px-2 py-1 rounded">
                      {voucher.code}
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      Use Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Gift className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-medium">No active vouchers</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add a voucher code to get discounts and rewards
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="used" className="mt-4">
          {usedVouchers.length > 0 ? (
            <div className="space-y-4">
              {usedVouchers.map((voucher, index) => (
                <div 
                  key={voucher.id}
                  className="border border-dashed rounded-lg p-4 relative overflow-hidden opacity-60"
                >
                  <div className="absolute right-3 top-3 bg-muted-foreground/20 px-2 py-1 rounded text-xs">
                    Used
                  </div>
                  
                  <div>
                    <div className="font-medium">{voucher.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      <span>Code: {voucher.code}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-dashed border-muted">
                    <div className="text-xs text-muted-foreground">
                      This voucher has been used and cannot be redeemed again.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <CheckCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-medium">No used vouchers</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your redeemed vouchers will appear here
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
