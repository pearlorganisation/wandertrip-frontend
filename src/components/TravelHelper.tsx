
import { useState } from 'react';
import { Globe, DollarSign, Languages, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TravelHelperProps {
  destination?: string;
  personalizedPreferences?: Record<string, string>;
}

export default function TravelHelper({ destination = "Your Destination", personalizedPreferences }: TravelHelperProps) {
  const [activeTab, setActiveTab] = useState<'language' | 'currency'>('language');
  
  // Mock data - in a real app this would come from a database or API
  const destinationData = {
    "Bali": {
      languages: [
        { name: "Indonesian (Bahasa Indonesia)", phrases: [
          { phrase: "Hello", translation: "Halo", pronunciation: "hah-loh" },
          { phrase: "Thank you", translation: "Terima kasih", pronunciation: "tuh-ree-mah kah-see" },
          { phrase: "Yes", translation: "Ya", pronunciation: "yah" },
          { phrase: "No", translation: "Tidak", pronunciation: "tee-dak" },
          { phrase: "Excuse me", translation: "Permisi", pronunciation: "per-mee-see" }
        ]},
        { name: "Balinese", phrases: [
          { phrase: "Hello", translation: "Om swastiastu", pronunciation: "ohm swas-tee-as-too" },
          { phrase: "Thank you", translation: "Suksma", pronunciation: "sook-suh-mah" }
        ]}
      ],
      currency: {
        name: "Indonesian Rupiah (IDR)",
        symbol: "Rp",
        exchangeRate: { USD: 15500, EUR: 16800, GBP: 19500 },
        examples: [
          { item: "Street food meal", price: "25,000 - 40,000 IDR" },
          { item: "Local restaurant meal", price: "80,000 - 150,000 IDR" },
          { item: "Bottle of water", price: "5,000 - 10,000 IDR" },
          { item: "Local beer", price: "25,000 - 50,000 IDR" },
          { item: "Taxi (per km)", price: "7,000 - 10,000 IDR" }
        ]
      }
    },
    "Santorini": {
      languages: [
        { name: "Greek", phrases: [
          { phrase: "Hello", translation: "Γειά σας (Yassas)", pronunciation: "yah-sas" },
          { phrase: "Thank you", translation: "Ευχαριστώ (Efharisto)", pronunciation: "ef-hah-rees-TOH" },
          { phrase: "Yes", translation: "Ναί (Ne)", pronunciation: "neh" },
          { phrase: "No", translation: "Όχι (Ohi)", pronunciation: "OH-hee" },
          { phrase: "Excuse me", translation: "Συγγνώμη (Signomi)", pronunciation: "see-GHNO-mee" }
        ]}
      ],
      currency: {
        name: "Euro (EUR)",
        symbol: "€",
        exchangeRate: { USD: 1.08, GBP: 0.85, JPY: 160 },
        examples: [
          { item: "Coffee", price: "3 - 5 EUR" },
          { item: "Restaurant meal", price: "15 - 35 EUR" },
          { item: "Bottle of water", price: "1 - 2 EUR" },
          { item: "Local beer", price: "4 - 6 EUR" },
          { item: "Public transport ticket", price: "1.80 EUR" }
        ]
      }
    }
  };
  
  // Get data for the selected destination or provide default data
  const destinationInfo = destinationData[destination as keyof typeof destinationData] || {
    languages: [
      { name: "Local language", phrases: [
        { phrase: "Hello", translation: "Hello", pronunciation: "-" },
        { phrase: "Thank you", translation: "Thank you", pronunciation: "-" },
        { phrase: "Yes", translation: "Yes", pronunciation: "-" },
        { phrase: "No", translation: "No", pronunciation: "-" }
      ]}
    ],
    currency: {
      name: "Local currency",
      symbol: "$",
      exchangeRate: { USD: 1, EUR: 0.92, GBP: 0.79 },
      examples: [
        { item: "Meal (inexpensive restaurant)", price: "10 - 20" },
        { item: "Bottle of water", price: "1 - 3" },
        { item: "Local transport", price: "1 - 5" }
      ]
    }
  };

  return (
    <motion.div 
      className="glass rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex border-b border-border/30">
        <button
          className={cn(
            "flex-1 py-3 text-sm font-medium transition-colors",
            activeTab === 'language' 
              ? "text-primary border-b-2 border-primary" 
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTab('language')}
        >
          <Languages size={16} className="inline-block mr-1" />
          Language
        </button>
        <button
          className={cn(
            "flex-1 py-3 text-sm font-medium transition-colors",
            activeTab === 'currency' 
              ? "text-primary border-b-2 border-primary" 
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTab('currency')}
        >
          <DollarSign size={16} className="inline-block mr-1" />
          Currency
        </button>
      </div>

      <div className="p-4">
        {activeTab === 'language' && (
          <div>
            <h3 className="text-sm font-medium mb-3">Essential Phrases for {destination}</h3>
            
            {destinationInfo.languages.map((language, langIndex) => (
              <div key={langIndex} className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">{language.name}</p>
                <div className="space-y-2">
                  {language.phrases.map((phrase, phraseIndex) => (
                    <div key={phraseIndex} className="bg-muted/30 p-2 rounded-lg">
                      <div className="flex justify-between">
                        <p className="text-xs font-medium">{phrase.phrase}</p>
                        <p className="text-xs text-primary font-medium">{phrase.translation}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Pronunciation: {phrase.pronunciation}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="mt-3 pt-3 border-t border-border/30 flex items-start">
              <Info size={14} className="mr-1.5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Learning a few basic phrases can greatly enhance your travel experience and shows respect for the local culture.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'currency' && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium">Currency in {destination}</h3>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {destinationInfo.currency.name}
              </span>
            </div>
            
            <div className="bg-muted/30 p-3 rounded-lg mb-4">
              <p className="text-xs text-muted-foreground mb-2">Exchange Rate (approx.)</p>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(destinationInfo.currency.exchangeRate).map(([currency, rate]) => (
                  <div key={currency} className="text-center">
                    <p className="text-xs font-medium">1 {currency}</p>
                    <p className="text-sm">{destinationInfo.currency.symbol} {rate}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mb-2">Price Examples</p>
            <div className="space-y-2">
              {destinationInfo.currency.examples.map((example, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-xs">{example.item}</p>
                  <p className="text-xs font-medium">{example.price}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-border/30 flex items-start">
              <Globe size={14} className="mr-1.5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Credit cards are widely accepted in most tourist areas, but it's good to have some local currency for small vendors and tips.
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
