
import { useState } from 'react';
import { Check, ShoppingBag, AlertCircle, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PackingItem {
  id: string;
  name: string;
  category: 'essentials' | 'clothing' | 'electronics' | 'toiletries' | 'documents' | 'accessories';
  checked: boolean;
  recommended: boolean;
}

interface PackingListGeneratorProps {
  destination: string;
  travelStyle: string;
}

const PackingListGenerator = ({ destination, travelStyle }: PackingListGeneratorProps) => {
  const [items, setItems] = useState<PackingItem[]>(() => {
    // Generate initial packing list based on destination and travel style
    const baseItems: PackingItem[] = [
      { id: '1', name: 'Passport', category: 'documents', checked: false, recommended: true },
      { id: '2', name: 'Travel Insurance', category: 'documents', checked: false, recommended: true },
      { id: '3', name: 'Credit/Debit Cards', category: 'essentials', checked: false, recommended: true },
      { id: '4', name: 'Phone & Charger', category: 'electronics', checked: false, recommended: true },
      { id: '5', name: 'Adapter', category: 'electronics', checked: false, recommended: true },
      { id: '6', name: 'Medications', category: 'essentials', checked: false, recommended: true },
      { id: '7', name: 'Toiletry Kit', category: 'toiletries', checked: false, recommended: true },
      { id: '8', name: 'Sunscreen', category: 'toiletries', checked: false, recommended: true },
    ];
    
    // Add destination-specific items
    let specificItems: PackingItem[] = [];
    
    if (destination.toLowerCase().includes('bali') || destination.toLowerCase().includes('beach')) {
      specificItems = [
        { id: '9', name: 'Swimwear', category: 'clothing', checked: false, recommended: true },
        { id: '10', name: 'Beach Towel', category: 'accessories', checked: false, recommended: true },
        { id: '11', name: 'Sunglasses', category: 'accessories', checked: false, recommended: true },
        { id: '12', name: 'Insect Repellent', category: 'toiletries', checked: false, recommended: true },
        { id: '13', name: 'Light Clothing', category: 'clothing', checked: false, recommended: true },
        { id: '14', name: 'Flip Flops', category: 'clothing', checked: false, recommended: true },
      ];
    } else if (destination.toLowerCase().includes('mountain') || travelStyle.toLowerCase().includes('adventure')) {
      specificItems = [
        { id: '9', name: 'Hiking Shoes', category: 'clothing', checked: false, recommended: true },
        { id: '10', name: 'Rain Jacket', category: 'clothing', checked: false, recommended: true },
        { id: '11', name: 'Water Bottle', category: 'essentials', checked: false, recommended: true },
        { id: '12', name: 'First Aid Kit', category: 'essentials', checked: false, recommended: true },
        { id: '13', name: 'Hiking Socks', category: 'clothing', checked: false, recommended: true },
        { id: '14', name: 'Portable Charger', category: 'electronics', checked: false, recommended: true },
      ];
    } else if (travelStyle.toLowerCase().includes('luxury')) {
      specificItems = [
        { id: '9', name: 'Formal Attire', category: 'clothing', checked: false, recommended: true },
        { id: '10', name: 'Dress Shoes', category: 'clothing', checked: false, recommended: true },
        { id: '11', name: 'Jewelry Case', category: 'accessories', checked: false, recommended: true },
        { id: '12', name: 'Designer Sunglasses', category: 'accessories', checked: false, recommended: true },
        { id: '13', name: 'Premium Skincare', category: 'toiletries', checked: false, recommended: true },
        { id: '14', name: 'Business Cards', category: 'essentials', checked: false, recommended: true },
      ];
    }
    
    return [...baseItems, ...specificItems];
  });
  
  const [newItemName, setNewItemName] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const categories = [
    { id: 'essentials', name: 'Essentials' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'toiletries', name: 'Toiletries' },
    { id: 'documents', name: 'Documents' },
    { id: 'accessories', name: 'Accessories' },
  ];
  
  const handleToggleCheck = (id: string) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    
    const newItem: PackingItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      category: 'essentials',
      checked: false,
      recommended: false,
    };
    
    setItems(prev => [...prev, newItem]);
    setNewItemName('');
  };
  
  const filteredItems = activeCategory 
    ? items.filter(item => item.category === activeCategory)
    : items;
  
  const progress = Math.round((items.filter(item => item.checked).length / items.length) * 100) || 0;
  
  return (
    <div className="bg-muted/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ShoppingBag size={20} className="text-primary mr-2" />
          <h3 className="text-lg font-medium">Packing List for {destination}</h3>
        </div>
        <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
          {progress}% Packed
        </span>
      </div>
      
      <div className="mb-4">
        <div className="w-full bg-muted h-2 rounded-full">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Add a new item..."
            className="flex-grow px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddItem();
              }
            }}
          />
          <button
            onClick={handleAddItem}
            className="p-2 rounded-lg bg-primary text-primary-foreground"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "px-3 py-1 rounded-full text-sm whitespace-nowrap",
            activeCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          )}
        >
          All Items
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-3 py-1 rounded-full text-sm whitespace-nowrap",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {filteredItems.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No items in this category
          </div>
        ) : (
          filteredItems.map(item => (
            <div 
              key={item.id}
              className={cn(
                "flex items-center p-3 rounded-lg transition-colors",
                item.checked ? "bg-primary/5" : "bg-background"
              )}
            >
              <button
                onClick={() => handleToggleCheck(item.id)}
                className={cn(
                  "w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center mr-3",
                  item.checked 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : "border-muted-foreground"
                )}
              >
                {item.checked && <Check size={12} />}
              </button>
              <div className="flex-grow">
                <span className={cn(
                  item.checked && "line-through text-muted-foreground"
                )}>
                  {item.name}
                </span>
              </div>
              {item.recommended && (
                <span className="ml-2 text-xs bg-secondary/50 px-1.5 py-0.5 rounded text-muted-foreground">
                  Recommended
                </span>
              )}
            </div>
          ))
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-start">
          <AlertCircle size={16} className="text-primary mt-1 mr-2 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            This packing list is AI-generated based on your destination and travel style. Items may vary based on the season and your specific activities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PackingListGenerator;
