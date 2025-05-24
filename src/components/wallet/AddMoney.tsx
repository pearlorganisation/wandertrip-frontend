
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowUp, CreditCard, Building, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import CreditCardIcon from '@/components/icons/CreditCardIcon';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useWalletStore } from '@/hooks/useWalletStore';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

export default function AddMoney() {
  const { addMoney, currency } = useWalletStore();
  const [amount, setAmount] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  const quickAmounts = isMobile ? [100, 200, 500] : [100, 200, 500, 1000, 2000];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleAddMoney = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      addMoney(parseFloat(amount));
      setAmount('');
      setIsLoading(false);
      
      toast.success('Money added to wallet!', {
        description: `$${parseFloat(amount).toFixed(2)} has been added to your wallet.`,
      });
    }, 1500);
  };

  return (
    <Card id="add-money-form" className="border border-primary/10 shadow-sm">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <ArrowUp className="h-5 w-5 text-primary" />
          <span>Add Money</span>
        </CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>

      {showForm ? (
        <CardContent className="p-4 pt-2">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Amount</label>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 flex items-center text-muted-foreground">
                  {currency}
                </div>
                <Input 
                  placeholder="0.00"
                  value={amount}
                  onChange={handleAmountChange}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  className="text-xs flex-1 min-w-[4rem]"
                  onClick={() => handleQuickAmount(quickAmount)}
                >
                  ${quickAmount}
                </Button>
              ))}
            </div>
            
            <Tabs defaultValue="card" onValueChange={(value) => setPaymentMethod(value as 'card' | 'bank')}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="card" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Card
                </TabsTrigger>
                <TabsTrigger value="bank" className="flex items-center gap-2">
                  <Building className="h-4 w-4" /> Bank
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="card" className="mt-3">
                <div className="space-y-3">
                  <div 
                    className="p-3 border rounded-md flex justify-between items-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => toast('Coming soon: Add new card')}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCardIcon />
                      <div>
                        <div className="font-medium">•••• 4242</div>
                        <div className="text-xs text-muted-foreground">Expires 12/25</div>
                      </div>
                    </div>
                    <span className="text-xs text-primary">Use</span>
                  </div>
                  
                  <Button variant="outline" className="w-full text-primary" size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add New Card
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="bank" className="mt-3">
                <div className="space-y-3">
                  <div 
                    className="p-3 border rounded-md flex justify-between items-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => toast('Coming soon: Add new bank account')}
                  >
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Checking Account</div>
                        <div className="text-xs text-muted-foreground">•••• 7890</div>
                      </div>
                    </div>
                    <span className="text-xs text-primary">Use</span>
                  </div>
                  
                  <Button variant="outline" className="w-full text-primary" size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add New Bank
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <Button 
              className="w-full"
              disabled={!amount || parseFloat(amount) <= 0 || isLoading}
              onClick={handleAddMoney}
            >
              {isLoading ? "Processing..." : "Add Money"}
            </Button>
          </div>
        </CardContent>
      ) : (
        <CardContent className="p-4 pt-0">
          <div className="text-sm text-muted-foreground">
            Add funds to your wallet using credit/debit cards or bank accounts
          </div>
          <Button 
            className="w-full mt-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary" 
            onClick={() => setShowForm(true)}
          >
            <ArrowUp className="h-4 w-4 mr-1" /> Add Money
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
