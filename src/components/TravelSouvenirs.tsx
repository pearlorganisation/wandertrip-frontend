import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Globe, Map, Gift, Sparkles, Mountain, Camera, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const souvenirs = [
  {
    id: 'eiffel-tower',
    name: 'Eiffel Tower',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=400&auto=format&fit=crop',
    description: 'A miniature replica of the iconic Eiffel Tower, the symbol of Paris.',
    collectDate: '2023-05-12',
    rarity: 'common',
    coordinates: { lat: 48.8584, lng: 2.2945 }
  },
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom Keychain',
    location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=400&auto=format&fit=crop',
    description: 'Delicate wooden keychain featuring a preserved cherry blossom petal.',
    collectDate: '2023-07-22',
    rarity: 'rare',
    coordinates: { lat: 35.0116, lng: 135.7681 }
  },
  {
    id: 'venetian-mask',
    name: 'Venetian Carnival Mask',
    location: 'Venice, Italy',
    image: 'https://images.unsplash.com/photo-1577640905050-83665af216b9?q=80&w=400&auto=format&fit=crop',
    description: 'Authentic hand-painted Venetian carnival mask with gold accents.',
    collectDate: '2023-02-18',
    rarity: 'epic',
    coordinates: { lat: 45.4408, lng: 12.3155 }
  },
  {
    id: 'bali-wood-carving',
    name: 'Balinese Wood Carving',
    location: 'Ubud, Bali',
    image: 'https://images.unsplash.com/photo-1599708193873-e4d5c89dbd0e?q=80&w=400&auto=format&fit=crop',
    description: 'Intricate hand-carved wooden figure representing a traditional deity.',
    collectDate: '2023-09-05',
    rarity: 'legendary',
    coordinates: { lat: -8.5069, lng: 115.2625 }
  },
  {
    id: 'northern-lights-crystal',
    name: 'Northern Lights Crystal',
    location: 'Tromsø, Norway',
    image: 'https://images.unsplash.com/photo-1579033385971-a7804aa9a201?q=80&w=400&auto=format&fit=crop',
    description: 'A special crystal that captures the colors of the Aurora Borealis.',
    collectDate: '2023-11-30',
    rarity: 'epic',
    coordinates: { lat: 69.6492, lng: 18.9553 }
  }
];

export default function TravelSouvenirs() {
  const [isRotating, setIsRotating] = useState(true);
  const [activeSouvenir, setActiveSouvenir] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState<string[]>(['eiffel-tower', 'cherry-blossom', 'venetian-mask']);
  const [animation, setAnimation] = useState(false);
  const [activeLocation, setActiveLocation] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const globeRef = useRef<HTMLDivElement>(null);
  const globeInstanceRef = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!unlocked.includes('bali-wood-carving')) {
        unlockNewSouvenir('bali-wood-carving');
      }
    }, 5000);
    
    if (globeRef.current) {
      const loadGlobe = async () => {
        try {
          console.log('Loading 3D globe...');
          
          const markers = souvenirs
            .filter(s => unlocked.includes(s.id))
            .map(s => ({
              id: s.id,
              lat: s.coordinates.lat,
              lng: s.coordinates.lng,
              name: s.name,
              location: s.location
            }));
            
          console.log('Adding markers to globe:', markers);
          
          const globeElement = globeRef.current;
          if (globeElement) {
            globeElement.innerHTML = '';
            globeElement.classList.add('globe-placeholder');
            
            const globePlaceholder = document.createElement('div');
            globePlaceholder.className = 'globe-visual';
            globeElement.appendChild(globePlaceholder);
            
            markers.forEach(marker => {
              const dot = document.createElement('div');
              dot.className = 'location-marker';
              const phi = (90 - marker.lat) * (Math.PI / 180);
              const theta = (marker.lng + 180) * (Math.PI / 180);
              const x = -Math.sin(phi) * Math.cos(theta);
              const z = Math.sin(phi) * Math.sin(theta);
              const y = Math.cos(phi);
              
              const scale = 80;
              dot.style.left = `${50 + x * scale}%`;
              dot.style.top = `${50 - y * scale}%`;
              
              dot.setAttribute('data-id', marker.id);
              dot.addEventListener('click', () => setActiveSouvenir(marker.id));
              
              globeElement.appendChild(dot);
            });
            
            if (isRotating) {
              globePlaceholder.classList.add('rotating');
            } else {
              globePlaceholder.classList.remove('rotating');
            }
          }
        } catch (error) {
          console.error('Failed to load 3D globe:', error);
        }
      };
      
      loadGlobe();
    }
    
    return () => clearTimeout(timer);
  }, [unlocked, isRotating]);

  const unlockNewSouvenir = (id: string) => {
    if (!unlocked.includes(id)) {
      setUnlocked(prev => [...prev, id]);
      setAnimation(true);
      
      setTimeout(() => setAnimation(false), 3000);
      
      toast({
        title: "🎉 New Souvenir Unlocked!",
        description: `You've unlocked the ${souvenirs.find(s => s.id === id)?.name}!`,
        action: (
          <Button size="sm" variant="outline" onClick={() => setActiveSouvenir(id)}>
            View
          </Button>
        ),
      });
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-blue-500';
      case 'rare': return 'bg-purple-500';
      case 'epic': return 'bg-pink-500';
      case 'legendary': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="py-12 bg-gradient-to-b from-background/70 to-background">
      <div className="container px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-medium tracking-wide rounded-full bg-primary/10 text-primary">
            <Gift size={14} />
            <span>Travel Memories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Your 3D Souvenir Collection
          </h2>
          <p className="text-muted-foreground text-lg">
            Collect unique souvenirs from your travels and build your digital display case
          </p>
        </div>
        
        <div className="relative h-[500px] max-w-4xl mx-auto mb-12">
          <div 
            ref={globeRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            <style>
              {`
              .globe-placeholder {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .globe-visual {
                width: 200px;
                height: 200px;
                background-image: url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800&auto=format&fit=crop');
                background-size: cover;
                border-radius: 50%;
                box-shadow: 0 0 20px rgba(0,0,0,0.2), inset 0 0 20px rgba(0,0,0,0.1);
                position: relative;
              }
              .globe-visual::after {
                content: '';
                position: absolute;
                inset: 0;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.4) 100%);
                pointer-events: none;
              }
              .rotating {
                animation: rotate 20s linear infinite;
              }
              .location-marker {
                position: absolute;
                width: 12px;
                height: 12px;
                background-color: var(--primary);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                z-index: 10;
                cursor: pointer;
              }
              .location-marker::before {
                content: '';
                position: absolute;
                inset: -4px;
                border-radius: 50%;
                background-color: var(--primary);
                opacity: 0.3;
                animation: pulse 2s ease-out infinite;
              }
              @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes pulse {
                0% { transform: scale(1); opacity: 0.7; }
                70% { transform: scale(2); opacity: 0; }
                100% { transform: scale(1); opacity: 0; }
              }
              `}
            </style>
          </div>
          
          <div className="absolute inset-0 pointer-events-none">
            {souvenirs.map((souvenir, index) => {
              const angle = (index / souvenirs.length) * Math.PI * 2;
              const radius = 180;
              const left = Math.cos(angle) * radius + 200;
              const top = Math.sin(angle) * radius + 200;
              
              const isUnlocked = unlocked.includes(souvenir.id);
              
              return (
                <motion.div
                  key={souvenir.id}
                  className={cn(
                    "absolute cursor-pointer transition-all duration-500 transform-gpu",
                    !isUnlocked && "grayscale opacity-40 blur-sm"
                  )}
                  style={{ left, top, zIndex: activeSouvenir === souvenir.id ? 50 : 1 }}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    rotate: isUnlocked && animation && souvenir.id === unlocked[unlocked.length - 1] ? [0, 15, -15, 0] : 0
                  }}
                  transition={{ 
                    type: "spring", 
                    damping: 12,
                    repeat: isUnlocked && animation && souvenir.id === unlocked[unlocked.length - 1] ? 5 : 0
                  }}
                  onClick={() => isUnlocked && setActiveSouvenir(souvenir.id)}
                >
                  <div className="relative group">
                    <div className={cn(
                      "w-24 h-24 rounded-xl overflow-hidden shadow-lg transform transition-transform",
                      isUnlocked ? "hover:scale-110" : ""
                    )}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <img 
                        src={souvenir.image} 
                        alt={souvenir.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 right-2 z-20">
                        <div className="text-white text-xs font-medium truncate">{souvenir.name}</div>
                      </div>
                    </div>
                    
                    {isUnlocked && animation && souvenir.id === unlocked[unlocked.length - 1] && (
                      <motion.div 
                        className="absolute -inset-4 rounded-full border-2 border-primary"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1.8] }}
                        transition={{ duration: 2, repeat: 3 }}
                      />
                    )}
                    
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Lock size={24} className="text-white/70" />
                      </div>
                    )}
                    
                    <div className={cn(
                      "absolute -top-1 -right-1 w-4 h-4 rounded-full",
                      getRarityColor(souvenir.rarity)
                    )} />
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsRotating(!isRotating)}
              className="rounded-full"
            >
              {isRotating ? "Pause Globe" : "Rotate Globe"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-full"
              onClick={() => navigate('/social-sharing?content=souvenirs')}
            >
              <Camera size={16} className="mr-2" />
              Share Collection
            </Button>
          </div>
        </div>
        
        <AnimatePresence>
          {activeSouvenir && (
            <motion.div 
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSouvenir(null)}
            >
              <motion.div 
                className="bg-card max-w-lg w-full rounded-xl p-6 relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted"
                  onClick={() => setActiveSouvenir(null)}
                >
                  <X size={16} />
                </button>
                
                {(() => {
                  const souvenir = souvenirs.find(s => s.id === activeSouvenir);
                  if (!souvenir) return null;
                  
                  return (
                    <div className="space-y-4">
                      <div className="h-64 rounded-lg overflow-hidden">
                        <img 
                          src={souvenir.image} 
                          alt={souvenir.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold">{souvenir.name}</h3>
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            getRarityColor(souvenir.rarity),
                            "text-white"
                          )}>
                            {souvenir.rarity.charAt(0).toUpperCase() + souvenir.rarity.slice(1)}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Map size={14} className="mr-1" />
                          {souvenir.location}
                        </div>
                        
                        <p className="mt-4 text-muted-foreground">{souvenir.description}</p>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            Collected on {new Date(souvenir.collectDate).toLocaleDateString()}
                          </div>
                          <Button size="sm" className="rounded-full">
                            <Map size={16} className="mr-2" />
                            Visit Destination
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="max-w-md mx-auto mt-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Collection Progress</span>
            <span className="text-sm font-medium">{unlocked.length}/{souvenirs.length}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary"
              style={{ width: `${(unlocked.length / souvenirs.length) * 100}%` }}
            />
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm" className="rounded-full">
              <Sparkles size={16} className="mr-2 text-primary" />
              Browse Legendary Souvenirs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Lock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
