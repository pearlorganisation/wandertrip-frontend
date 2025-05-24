import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useState } from 'react';
import { ArrowRight, Check, CreditCard, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BookingPreview() {
  const [activeTab, setActiveTab] = useState('flights');
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle redirection
  const handleActivityClick = () => {
    navigate('/activities'); // Redirect to /activities
  };
  
  const tabs = [
    { id: 'flights', label: 'Flights' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'activities', label: 'Activities' }
  ];
  
  return (
    <section id="booking" className="py-20 md:py-28">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wide uppercase rounded-full bg-primary/10 text-primary">
            Seamless Booking
          </span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-balance">
            Book Your Experience
          </h2>
          <p className="text-muted-foreground text-lg">
            From flights to activities, complete your booking in one place with dynamic pricing insights.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex border-b border-border/50">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={cn(
                    "flex-1 py-4 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8">
              {activeTab === 'flights' && (
                <div className="animate-fade-in">
                  <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                      <div className="flex-1 p-4 bg-secondary/50 rounded-lg">
                        <p className="text-xs font-medium text-muted-foreground mb-1">From</p>
                        <p className="font-medium">New Delhi (DEL)</p>
                      </div>
                      <ArrowRight className="hidden md:block text-muted-foreground" />
                      <div className="flex-1 p-4 bg-secondary/50 rounded-lg">
                        <p className="text-xs font-medium text-muted-foreground mb-1">To</p>
                        <p className="font-medium">Bali (DPS)</p>
                      </div>
                      <div className="flex-1 p-4 bg-secondary/50 rounded-lg">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Dates</p>
                        <p className="font-medium">Jun 15 - Jun 22</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 border border-border rounded-lg hover:border-primary/25 transition-colors hover:bg-muted/30 cursor-pointer">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center">
                            <img src="https://picsum.photos/32/32" alt="Airline logo" className="w-8 h-8 rounded mr-3" />
                            <span className="font-medium">IndiGo Airlines</span>
                          </div>
                          <span className="text-lg font-medium">₹32,450</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>DEL 21:40 → DPS 08:15 (+1)</span>
                          <span>10h 35m • 1 stop</span>
                        </div>
                        <div className="mt-3 flex items-center text-xs text-emerald-600 font-medium">
                          <Check size={14} className="mr-1" />
                          <span>Price drop alert: 12% lower than average</span>
                        </div>
                      </div>

                      <div className="p-4 border border-border rounded-lg hover:border-primary/25 transition-colors hover:bg-muted/30 cursor-pointer">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center">
                            <img src="https://picsum.photos/32/32?random=2" alt="Airline logo" className="w-8 h-8 rounded mr-3" />
                            <span className="font-medium">Air India</span>
                          </div>
                          <span className="text-lg font-medium">₹38,900</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>DEL 01:15 → DPS 14:10</span>
                          <span>12h 55m • Non-stop</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Showing best options for your dates</span>
                    <button className="text-primary font-medium">View all options</button>
                  </div>
                </div>
              )}

              {activeTab === 'hotels' && (
                <div className="animate-fade-in">
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="flex-1 p-4 bg-secondary/50 rounded-lg">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Location</p>
                        <p className="font-medium">Ubud, Bali</p>
                      </div>
                      <div className="flex-1 p-4 bg-secondary/50 rounded-lg">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Check In/Out</p>
                        <p className="font-medium">Jun 15 - Jun 22</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row border border-border rounded-lg overflow-hidden hover:border-primary/25 transition-colors cursor-pointer">
                        <div className="md:w-1/3">
                          <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" alt="Hotel" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 md:w-2/3 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">Ubud Jungle Resort & Spa</h3>
                              <div className="flex items-center bg-secondary/80 px-2 py-1 rounded-full ml-2">
                                <span className="text-yellow-500 mr-1">★</span>
                                <span className="text-xs font-medium">4.8</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">Private villa • Infinity pool • Free breakfast</p>
                          </div>
                          <div className="flex flex-wrap justify-between items-end">
                            <div>
                              <span className="text-xs text-muted-foreground line-through">₹15,800/night</span>
                              <p className="text-lg font-medium">₹12,640/night</p>
                              <span className="text-xs text-emerald-600">20% off for your dates</span>
                            </div>
                            <button className="mt-3 md:mt-0 px-4 py-2 text-xs font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row border border-border rounded-lg overflow-hidden hover:border-primary/25 transition-colors cursor-pointer">
                        <div className="md:w-1/3">
                          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945" alt="Hotel" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 md:w-2/3 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">Balinese Luxury Villas</h3>
                              <div className="flex items-center bg-secondary/80 px-2 py-1 rounded-full ml-2">
                                <span className="text-yellow-500 mr-1">★</span>
                                <span className="text-xs font-medium">4.6</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">Garden view • Spa access • Airport transfers</p>
                          </div>
                          <div className="flex flex-wrap justify-between items-end">
                            <div>
                              <p className="text-lg font-medium">₹9,800/night</p>
                              <span className="text-xs text-foreground/70">Includes taxes & fees</span>
                            </div>
                            <button className="mt-3 md:mt-0 px-4 py-2 text-xs font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activities' && (
                <div className="animate-fade-in">
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="flex-1 p-4 bg-secondary/50 rounded-lg">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Location</p>
                        <p className="font-medium">Bali, Indonesia</p>
                      </div>
                      <div className="flex-1 p-4 bg-secondary/50 rounded-lg">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Date</p>
                        <p className="font-medium">Jun 16</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div onClick={handleActivityClick} className="border border-border rounded-lg overflow-hidden hover:border-primary/25 transition-colors cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1604480132736-44c188fe4d20" alt="Activity" className="w-full h-40 object-cover" />
                        <div className="p-4">
                          <h3 className="font-medium mb-1">Mount Batur Sunrise Trek</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <Calendar size={14} className="mr-1" />
                            <span>3-4 hours • Morning</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="font-medium">₹2,400 <span className="text-xs font-normal text-muted-foreground">per person</span></p>
                            <button onClick={handleActivityClick} className="px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div onClick={handleActivityClick} className="border border-border rounded-lg overflow-hidden hover:border-primary/25 transition-colors cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2" alt="Activity" className="w-full h-40 object-cover" />
                        <div className="p-4">
                          <h3 className="font-medium mb-1">Sacred Monkey Forest Visit</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <Calendar size={14} className="mr-1" />
                            <span>2 hours • Afternoon</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="font-medium">₹1,200 <span className="text-xs font-normal text-muted-foreground">per person</span></p>
                            <button onClick={handleActivityClick} className="px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center mb-3">
                      <CreditCard size={16} className="mr-2 text-primary" />
                      <h4 className="text-sm font-medium">EMI Payment Available</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Book now and pay later with 0% interest EMI options available through our partner banks.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
