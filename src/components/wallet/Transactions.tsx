
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Search, 
  CreditCard, 
  Building, 
  ShoppingBag,
  Plane,
  Coffee,
  Hotel,
  Wallet,
  RefreshCw 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWalletStore } from '@/hooks/useWalletStore';

interface TransactionsProps {
  limit?: number;
}

export default function Transactions({ limit }: TransactionsProps) {
  const { transactions } = useWalletStore();
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter transactions based on type and search term
  let filteredTransactions = transactions;
  
  if (filter === 'credit') {
    filteredTransactions = transactions.filter(t => t.type === 'credit');
  } else if (filter === 'debit') {
    filteredTransactions = transactions.filter(t => t.type === 'debit');
  }
  
  if (searchTerm) {
    filteredTransactions = filteredTransactions.filter(
      t => t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
           t.merchant.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // If limit is provided, only show that many transactions
  if (limit && filteredTransactions.length > limit) {
    filteredTransactions = filteredTransactions.slice(0, limit);
  }
  
  const getTransactionIcon = (category: string) => {
    switch (category) {
      case 'transfer':
        return <Building className="h-4 w-4" />;
      case 'shopping':
        return <ShoppingBag className="h-4 w-4" />;
      case 'travel':
        return <Plane className="h-4 w-4" />;
      case 'food':
        return <Coffee className="h-4 w-4" />;
      case 'lodging':
        return <Hotel className="h-4 w-4" />;
      case 'wallet':
        return <Wallet className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Transactions</CardTitle>
          {!limit && (
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              <RefreshCw className="h-3 w-3" /> Refresh
            </Button>
          )}
        </div>
        
        {!limit && (
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs 
              value={filter} 
              onValueChange={(value) => setFilter(value as 'all' | 'credit' | 'debit')}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="credit" className="flex items-center gap-1">
                  <ArrowDownLeft className="h-3 w-3" /> In
                </TabsTrigger>
                <TabsTrigger value="debit" className="flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" /> Out
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {filteredTransactions.length > 0 ? (
          <div className="space-y-4">
            {filteredTransactions.map((transaction, index) => (
              <motion.div 
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                    transaction.type === 'credit' 
                      ? "bg-green-100 text-green-600" 
                      : "bg-red-100 text-red-600"
                  )}>
                    {transaction.type === 'credit' 
                      ? <ArrowDownLeft className="h-5 w-5" /> 
                      : <ArrowUpRight className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      {getTransactionIcon(transaction.category)}
                      <span>{transaction.merchant}</span>
                      <span className="mx-1">•</span>
                      <span>{transaction.date}</span>
                    </div>
                  </div>
                </div>
                <div className={cn(
                  "font-medium",
                  transaction.type === 'credit' ? "text-green-600" : "text-red-600"
                )}>
                  {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </div>
              </motion.div>
            ))}
            
            {limit && transactions.length > limit && (
              <Button 
                variant="ghost" 
                className="w-full text-primary"
                onClick={() => document.getElementById('history-tab')?.click()}
              >
                View All Transactions
              </Button>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <CreditCard className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-medium">No transactions found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {searchTerm 
                ? "Try adjusting your search terms" 
                : "Your transaction history will appear here"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
