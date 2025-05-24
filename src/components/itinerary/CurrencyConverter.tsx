
import { useState } from 'react';
import { DollarSign, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CurrencyConverterProps {
  defaultFrom?: string;
  defaultTo?: string;
}

export const CurrencyConverter = ({ 
  defaultFrom = 'USD', 
  defaultTo = 'IDR' 
}: CurrencyConverterProps) => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState(defaultFrom);
  const [toCurrency, setToCurrency] = useState(defaultTo);
  const [result, setResult] = useState('');
  
  // Mock exchange rates - in a real app, you would fetch these from an API
  const rates = {
    USD: { EUR: 0.93, GBP: 0.79, JPY: 151.73, IDR: 15700, AUD: 1.53 },
    EUR: { USD: 1.07, GBP: 0.85, JPY: 162.7, IDR: 16842, AUD: 1.64 },
    GBP: { USD: 1.27, EUR: 1.18, JPY: 192.07, IDR: 19875, AUD: 1.94 },
    JPY: { USD: 0.0066, EUR: 0.0061, GBP: 0.0052, IDR: 103.47, AUD: 0.01 },
    IDR: { USD: 0.000064, EUR: 0.000059, GBP: 0.000050, JPY: 0.0097, AUD: 0.000097 },
    AUD: { USD: 0.65, EUR: 0.61, GBP: 0.52, JPY: 99.25, IDR: 10300 },
  };
  
  const handleConvert = () => {
    if (!amount || isNaN(Number(amount))) {
      setResult('Please enter a valid amount');
      return;
    }
    
    if (fromCurrency === toCurrency) {
      setResult(`${amount} ${fromCurrency}`);
      return;
    }
    
    const rate = rates[fromCurrency]?.[toCurrency];
    if (!rate) {
      setResult('Conversion rate not available');
      return;
    }
    
    const convertedAmount = (Number(amount) * rate).toFixed(2);
    setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
  };
  
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    // Clear result when swapping
    setResult('');
  };
  
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'IDR', 'AUD'];
  const currencyNames = {
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    JPY: 'Japanese Yen',
    IDR: 'Indonesian Rupiah',
    AUD: 'Australian Dollar'
  };
  
  return (
    <div className="glass rounded-xl p-5 border border-border/40">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <DollarSign size={18} className="text-primary mr-2" />
        Currency Converter
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Amount</label>
            <Input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full"
            />
          </div>
          
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">From</label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency} - {currencyNames[currency]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={swapCurrencies}
            className="rounded-full bg-muted/50 h-8 w-8"
          >
            <ArrowLeftRight size={16} />
          </Button>
        </div>
        
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">To</label>
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency} - {currencyNames[currency]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleConvert} className="w-full">
          Convert
        </Button>
        
        {result && (
          <div className="mt-4 p-3 bg-primary/10 rounded-lg text-center">
            <p className="font-medium">{result}</p>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground mt-2">
          <p>*Exchange rates are approximate and for information purposes only.</p>
        </div>
      </div>
    </div>
  );
};
