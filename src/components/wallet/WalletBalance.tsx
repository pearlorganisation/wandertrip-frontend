
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Wallet, ArrowUp, ArrowDown, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWalletStore } from '@/hooks/useWalletStore';

export default function WalletBalance() {
  const { balance, currency, hideBalance, toggleHideBalance } = useWalletStore();
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-primary/80 to-primary text-primary-foreground p-6 relative">
          <div className="absolute top-4 right-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-primary-foreground/90 hover:text-primary-foreground hover:bg-white/10"
              onClick={toggleHideBalance}
            >
              {hideBalance ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="h-5 w-5" />
            <h3 className="font-medium">Wallet Balance</h3>
          </div>
          
          <div className="text-3xl font-bold">
            {hideBalance ? '••••••' : `${currency}${balance.toFixed(2)}`}
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 text-white"
              onClick={() => document.getElementById('add-money-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Add Money
            </Button> 
            <Button 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 text-white"
              onClick={() => document.getElementById('send-money-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ArrowDown className="mr-2 h-4 w-4" />
              Send Money
            </Button>
          </div>
        </div>
        
        <div className="p-4 bg-muted/30">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Available Credit Limit</div>
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-1 text-primary" />
              <span className="font-medium">{currency}2,000.00</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
