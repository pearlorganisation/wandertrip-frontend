
import { useState, useEffect } from 'react';
import { DollarSign, PlusCircle, MinusCircle, Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface TripBudgetCalculatorProps {
  destination?: string;
  duration?: number;
  travelers?: number;
  personalizedPreferences?: Record<string, string>;
}

interface BudgetItem {
  id: string;
  category: string;
  name: string;
  amount: number;
}

export default function TripBudgetCalculator({ 
  destination = "Your Trip", 
  duration = 7, 
  travelers = 2,
  personalizedPreferences
}: TripBudgetCalculatorProps) {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Initialize with some default budget items
  useEffect(() => {
    const defaultItems: BudgetItem[] = [
      { id: '1', category: 'Transportation', name: 'Flights', amount: 800 * travelers },
      { id: '2', category: 'Accommodation', name: 'Hotels', amount: 120 * duration },
      { id: '3', category: 'Food', name: 'Meals', amount: 50 * duration * travelers },
      { id: '4', category: 'Activities', name: 'Tours & Activities', amount: 200 * travelers },
    ];
    
    // We could use personalizedPreferences here to customize the budget items if needed
    setBudgetItems(defaultItems);
  }, [destination, duration, travelers]);

  // Recalculate total budget whenever items change
  useEffect(() => {
    const total = budgetItems.reduce((sum, item) => sum + item.amount, 0);
    setTotalBudget(total);
  }, [budgetItems]);

  const handleAmountChange = (id: string, newAmount: number) => {
    setBudgetItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, amount: newAmount } : item
      )
    );
  };

  const addBudgetItem = () => {
    const newItem: BudgetItem = {
      id: `item-${Date.now()}`,
      category: 'Other',
      name: 'New Expense',
      amount: 0
    };
    setBudgetItems([...budgetItems, newItem]);
  };

  const removeBudgetItem = (id: string) => {
    setBudgetItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const budgetPerDay = totalBudget / duration;
  const budgetPerPerson = totalBudget / travelers;

  const categories = {
    'Transportation': 'bg-blue-500/10 text-blue-600',
    'Accommodation': 'bg-purple-500/10 text-purple-600',
    'Food': 'bg-orange-500/10 text-orange-600',
    'Activities': 'bg-green-500/10 text-green-600',
    'Other': 'bg-gray-500/10 text-gray-600'
  };

  return (
    <motion.div 
      className="rounded-xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <DollarSign size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium">Trip Budget Estimate</h3>
            <p className="text-xs text-muted-foreground">
              {duration} days, {travelers} {travelers === 1 ? 'person' : 'people'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-lg font-medium">${totalBudget.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total estimate</p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-border/30">
              <div className="space-y-3 mb-4">
                {budgetItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center rounded-lg p-2 hover:bg-background/50"
                  >
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className={cn("text-xs px-2 py-0.5 rounded-full inline-block mb-1", 
                            categories[item.category as keyof typeof categories] || 'bg-gray-500/10 text-gray-600')}>
                            {item.category}
                          </span>
                          <p className="text-sm font-medium">{item.name}</p>
                        </div>
                        <div className="flex items-center bg-background rounded-lg overflow-hidden border border-border">
                          <span className="text-sm px-2">$</span>
                          <input
                            type="number"
                            value={item.amount}
                            onChange={(e) => handleAmountChange(item.id, parseInt(e.target.value) || 0)}
                            className="w-20 bg-transparent text-sm py-1.5 px-1 focus:outline-none focus:ring-1 focus:ring-primary/30"
                          />
                        </div>
                      </div>
                    </div>
                    <motion.button 
                      onClick={() => removeBudgetItem(item.id)}
                      className="ml-2 text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-full hover:bg-background/50"
                      whileTap={{ scale: 0.9 }}
                    >
                      <MinusCircle size={16} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              <motion.button 
                onClick={addBudgetItem}
                className="flex items-center text-xs text-primary mb-4 bg-primary/5 px-3 py-2 rounded-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PlusCircle size={14} className="mr-1" />
                Add expense item
              </motion.button>

              <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-xl">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Per Day</p>
                    <p className="text-sm font-medium">${budgetPerDay.toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Per Person</p>
                    <p className="text-sm font-medium">${budgetPerPerson.toFixed(0)}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-muted-foreground flex items-start bg-muted/20 p-3 rounded-lg">
                <Calculator size={14} className="mr-1 mt-0.5 flex-shrink-0" />
                <p>This budget is an estimate based on average prices. Actual costs may vary.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
