
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowDown, Building, ChevronDown, ChevronUp, Search, UserRound, Wallet, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useWalletStore } from '@/hooks/useWalletStore';
import { toast } from 'sonner';

export default function SendMoney() {
  const { sendMoney, currency, balance } = useWalletStore();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [transferType, setTransferType] = useState<'wallet' | 'bank'>('wallet');
  const [isLoading, setIsLoading] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const handleSendMoney = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) > balance) {
      toast.error('Insufficient funds in your wallet');
      return;
    }

    if (!recipient.trim()) {
      toast.error(`Please enter a valid ${transferType === 'wallet' ? 'recipient' : 'bank account'}`);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      sendMoney(parseFloat(amount));
      setAmount('');
      setRecipient('');
      setIsLoading(false);
      
      toast.success('Money sent successfully!', {
        description: `$${parseFloat(amount).toFixed(2)} has been sent to ${recipient}.`,
      });
    }, 1500);
  };

  const recentContacts = [
    { id: 1, name: 'Alex Johnson', handle: '@alexj', avatar: '👨‍🦱' },
    { id: 2, name: 'Sarah Miller', handle: '@sarahm', avatar: '👩' },
    { id: 3, name: 'David Chen', handle: '@davidc', avatar: '👨' },
  ];

  return (
    <Card id="send-money-form">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <ArrowDown className="h-5 w-5 text-primary" />
          <span>Send Money</span>
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
            <Tabs defaultValue="wallet" onValueChange={(value) => setTransferType(value as 'wallet' | 'bank')}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="wallet" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" /> To Wallet
                </TabsTrigger>
                <TabsTrigger value="bank" className="flex items-center gap-2">
                  <Building className="h-4 w-4" /> To Bank
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="wallet" className="mt-3">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium mb-1 block">Recipient</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-0 bottom-0 flex items-center text-muted-foreground" />
                      <Input 
                        placeholder="Search by name or @username"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  {recipient === '' && (
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Recent contacts</div>
                      <div className="flex flex-wrap gap-2">
                        {recentContacts.map((contact) => (
                          <Button
                            key={contact.id}
                            variant="outline"
                            size="sm"
                            className="text-xs flex items-center gap-2"
                            onClick={() => setRecipient(contact.name)}
                          >
                            <div className="h-5 w-5 flex items-center justify-center bg-primary/10 rounded-full text-xs">
                              {contact.avatar}
                            </div>
                            <span>{contact.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="bank" className="mt-3">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium mb-1 block">Bank Account</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-0 bottom-0 flex items-center text-muted-foreground" />
                      <Input 
                        placeholder="Enter account number"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  {recipient === '' && (
                    <div 
                      className="p-3 border rounded-md flex justify-between items-center cursor-pointer hover:border-primary transition-colors"
                      onClick={() => setRecipient('My Checking Account (...7890)')}
                    >
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">My Checking Account</div>
                          <div className="text-xs text-muted-foreground">•••• 7890</div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            <div>
              <Label className="text-sm font-medium mb-1 block">Amount</Label>
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
              <div className="text-xs text-muted-foreground mt-1">
                Available balance: {currency}{balance.toFixed(2)}
              </div>
            </div>
            
            <Button 
              className="w-full"
              disabled={!amount || parseFloat(amount) <= 0 || !recipient || isLoading || parseFloat(amount) > balance}
              onClick={handleSendMoney}
            >
              {isLoading ? "Processing..." : `Send ${amount ? `${currency}${parseFloat(amount).toFixed(2)}` : 'Money'}`}
            </Button>
          </div>
        </CardContent>
      ) : (
        <CardContent className="p-4 pt-0">
          <div className="text-sm text-muted-foreground">
            {transferType === 'wallet' 
              ? 'Send money to friends, family or other users' 
              : 'Transfer funds to your bank account'}
          </div>
          <Button 
            className="w-full mt-3" 
            variant="outline"
            onClick={() => setShowForm(true)}
          >
            <ArrowDown className="h-4 w-4 mr-1" /> Send Money
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
