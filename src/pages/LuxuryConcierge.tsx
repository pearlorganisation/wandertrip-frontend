import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  ShieldCheck, 
  PlaneTakeoff, 
  Trophy, 
  UtensilsCrossed, 
  Clock, 
  Star, 
  Heart, 
  Calendar, 
  CheckCircle2,
  Phone,
  MapPin,
  Hotel,
  ShoppingBag,
  MessageSquare,
  Car,
  Gift,
  Coffee,
  Ticket,
  Book,
  UserCheck,
  FlowerIcon,
  Wine,
  Utensils
} from 'lucide-react';
import { toast } from 'sonner';

const LuxuryConcierge = () => {
   // Scroll to top on component mount
     useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }, []); // Empty dependency array ensures this runs only once on mount
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const handleRequestService = () => {
    toast.success("Request received!", {
      description: "Our concierge team will contact you within 2 hours."
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Luxury Concierge Services | WanderTrip.in"
        description="Exclusive concierge services for discerning travelers. VIP access, private transportation, and personalized experiences."
        keywords="luxury travel, concierge service, VIP travel, premium travel, exclusive access"
        image="https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&q=80"
      />
      
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section 
          className="py-20 bg-cover bg-center relative"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&q=80')" }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="container px-4 sm:px-6 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wide uppercase rounded-full bg-primary/90 text-primary-foreground">
                Exclusive Services
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-white">
                Luxury Concierge Services
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Elevate your travel experience with our premium concierge services, VIP access, and personalized attention to every detail
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={handleRequestService}
                  size="lg"
                  className="text-primary-foreground bg-primary hover:bg-primary/90"
                >
                  Request Concierge Support
                </Button>
                <Link
                  to="/trip-planner"
                  className="px-6 py-3 text-sm font-medium tracking-wide text-white bg-white/20 backdrop-blur-sm rounded-lg transition-colors hover:bg-white/30"
                >
                  Plan Luxury Trip
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Premium Services Section */}
        <section className="py-12">
          <div className="container px-4 sm:px-6">
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
                Premium Concierge Services
              </h2>
              <p className="text-muted-foreground text-lg">
                Our luxury concierge team is available 24/7 to fulfill your requests and ensure a seamless travel experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <PlaneTakeoff className="text-primary" size={32} />,
                  title: "Private Transportation",
                  description: "Private jets, helicopter transfers, luxury car rentals with chauffeur service available worldwide"
                },
                {
                  icon: <UtensilsCrossed className="text-primary" size={32} />,
                  title: "Fine Dining & Experiences",
                  description: "VIP reservations at Michelin-star restaurants and access to exclusive cultural and sporting events"
                },
                {
                  icon: <ShieldCheck className="text-primary" size={32} />,
                  title: "VIP Airport Services",
                  description: "Fast-track security, luxury airport lounge access, and personalized meet and greet service"
                },
              ].map((service, index) => (
                <div key={index} className="glass p-8 rounded-xl hover:shadow-lg transition-all">
                  <div className="mb-5">{service.icon}</div>
                  <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <button 
                    className="text-primary text-sm font-medium hover:underline"
                    onClick={handleRequestService}
                  >
                    Request Service →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Daily Concierge Requests - NEW */}
        <section className="py-12 bg-background">
          <div className="container px-4 sm:px-6">
            <div className="max-w-4xl mx-auto mb-10 text-center">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
                Day-to-Day Concierge Assistance
              </h2>
              <p className="text-muted-foreground text-lg">
                Beyond extraordinary requests, our concierge handles everyday needs with the same level of excellence
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {[
                {
                  icon: <Utensils className="text-primary" size={18} />,
                  title: "Restaurant Reservations",
                  description: "Secure tables at popular restaurants even during peak hours"
                },
                {
                  icon: <Car className="text-primary" size={18} />,
                  title: "Transportation Arrangements",
                  description: "Book airport transfers, taxis, or private drivers with a single message"
                },
                {
                  icon: <Ticket className="text-primary" size={18} />,
                  title: "Event Tickets",
                  description: "Access to theater shows, sports events, and concerts even when sold out"
                },
                {
                  icon: <Gift className="text-primary" size={18} />,
                  title: "Gift Procurement",
                  description: "Source and deliver thoughtful gifts for special occasions"
                },
                {
                  icon: <Coffee className="text-primary" size={18} />,
                  title: "Cafe Recommendations",
                  description: "Discover hidden local gems for the perfect coffee experience"
                },
                {
                  icon: <Book className="text-primary" size={18} />,
                  title: "Cultural Insights",
                  description: "Get personalized recommendations for museums, galleries, and local events"
                },
                {
                  icon: <UserCheck className="text-primary" size={18} />,
                  title: "Local Expert Connection",
                  description: "Introduction to trusted local guides and specialists"
                },
                {
                  icon: <FlowerIcon className="text-primary" size={18} />,
                  title: "Special Arrangements",
                  description: "From room decorations to anniversary surprises"
                },
              ].map((service, index) => (
                <div key={index} className="bg-muted/20 p-4 rounded-lg border border-border/40 hover:border-primary/20 transition-all">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    {service.icon}
                  </div>
                  <h3 className="text-sm font-medium mb-1">{service.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{service.description}</p>
                  <button 
                    className="text-primary text-xs font-medium hover:underline"
                    onClick={handleRequestService}
                  >
                    Request
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-10 max-w-3xl mx-auto">
              <div className="bg-card border border-border p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4 border-b pb-2">Sample Daily Requests</h3>
                <ul className="space-y-3">
                  {[
                    "Could you book a table for four at Nobu tonight at 8 PM?",
                    "I need a reliable driver to take me to meetings throughout the day tomorrow",
                    "Can you arrange for a bouquet of white roses to be delivered to my partner's hotel room?",
                    "Could you recommend a highly-rated local coffee shop within walking distance?",
                    "I need last-minute tickets to the opera for this evening",
                    "Could you find a personal shopper who can help me with local boutiques?",
                    "I need a barber/hairstylist appointment at my hotel in two hours",
                    "Can you organize a birthday cake to be delivered to our dinner table tonight?",
                  ].map((request, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-sm">{request}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleRequestService}
                  className="mt-4 w-full text-sm py-2 text-center border border-primary/30 text-primary rounded-md hover:bg-primary/5 transition-colors"
                >
                  Send Your Request
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Use Case Examples Section */}
        <section className="py-12 bg-muted/20">
          <div className="container px-4 sm:px-6">
            <div className="max-w-4xl mx-auto mb-10 text-center">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
                Concierge in Action: Real-World Examples
              </h2>
              <p className="text-muted-foreground text-lg">
                Discover how our luxury concierge services can transform your travel experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <Hotel className="text-primary" size={24} />,
                  title: "Last-Minute Suite Upgrade in Santorini",
                  scenario: "Client wanted to surprise their partner with a suite upgrade at a fully-booked luxury hotel in Santorini during peak season.",
                  solution: "Our concierge secured a premium suite with caldera views within 3 hours, arranged a private dinner on their balcony, and organized a surprise sunset sailing experience."
                },
                {
                  icon: <UtensilsCrossed className="text-primary" size={24} />,
                  title: "Impossible Restaurant Reservation in Tokyo",
                  scenario: "Client desired a reservation at a 3-Michelin star restaurant in Tokyo with a 6-month waiting list for the following evening.",
                  solution: "Our concierge secured a private dining experience for the client, arranged a meeting with the head chef, and organized translation services for the full culinary experience."
                },
                {
                  icon: <ShoppingBag className="text-primary" size={24} />,
                  title: "Exclusive Shopping Access in Milan",
                  scenario: "Client needed access to limited-edition fashion pieces not available to the public during Milan Fashion Week.",
                  solution: "Our concierge arranged private after-hours shopping at exclusive boutiques, personal styling services, and delivery of purchases to the client's hotel."
                },
                {
                  icon: <PlaneTakeoff className="text-primary" size={24} />,
                  title: "Private Jet Evacuation During Emergency",
                  scenario: "Client's family vacation was interrupted by a medical emergency requiring immediate evacuation from a remote location.",
                  solution: "Our concierge arranged a private medical evacuation flight within 2 hours, coordinated with specialists at the destination hospital, and managed all logistics for the family's accommodation."
                },
                {
                  icon: <Wine className="text-primary" size={24} />,
                  title: "Vineyard Access in Burgundy",
                  scenario: "Client wanted to visit prestigious family-owned vineyards in Burgundy that are typically closed to the public.",
                  solution: "Our concierge secured private tours at three exclusive wineries, arranged a meeting with renowned winemakers, and organized a private tasting of rare vintage wines not available commercially."
                },
                {
                  icon: <Ticket className="text-primary" size={24} />,
                  title: "Front-Row Seats at Paris Fashion Week",
                  scenario: "Client requested last-minute front-row access to a premier fashion show during Paris Fashion Week when all seats were allocated.",
                  solution: "Our concierge leveraged industry connections to secure front-row placement, arranged backstage access to meet the designer, and coordinated transportation with priority drop-off at the exclusive entrance."
                },
              ].map((useCase, index) => (
                <Card key={index} className="border border-border shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {useCase.icon}
                      </div>
                      <CardTitle className="text-xl">{useCase.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="mb-4">
                      <h4 className="font-medium text-base mb-2">The Scenario:</h4>
                      <p className="text-muted-foreground">{useCase.scenario}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-base mb-2">Our Solution:</h4>
                      <p className="text-muted-foreground">{useCase.solution}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-1">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={handleRequestService}
                    >
                      Request Similar Service
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing Plans Section */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 sm:px-6">
            <div className="max-w-4xl mx-auto mb-12 text-center">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
                Select Your Concierge Plan
              </h2>
              <p className="text-muted-foreground text-lg">
                Choose the level of service that matches your luxury travel needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  id: "silver",
                  name: "Silver",
                  price: "$199",
                  period: "per trip",
                  features: [
                    "24/7 Concierge Support",
                    "Airport Lounge Access",
                    "Restaurant Reservations",
                    "Basic Travel Insurance",
                    "Priority Customer Service"
                  ]
                },
                {
                  id: "gold",
                  name: "Gold",
                  price: "$499",
                  period: "per trip",
                  popular: true,
                  features: [
                    "Everything in Silver",
                    "Fast-Track Security",
                    "Luxury Car Service",
                    "Premium Travel Insurance",
                    "Hotel Room Upgrades",
                    "24/7 Personal Assistant"
                  ]
                },
                {
                  id: "platinum",
                  name: "Platinum",
                  price: "$999",
                  period: "per trip",
                  features: [
                    "Everything in Gold",
                    "Private Jet Bookings",
                    "Personal Security",
                    "Exclusive Event Access",
                    "Dedicated Concierge Agent",
                    "Helicopter Transfers",
                    "Luxury Yacht Charters"
                  ]
                }
              ].map((plan) => (
                <div 
                  key={plan.id}
                  className={`relative rounded-xl p-6 transition-all ${
                    plan.popular 
                      ? "glass-dark border-2 border-primary/40 shadow-lg" 
                      : "glass border border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-medium mb-1">{plan.name}</h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-1 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      handleRequestService();
                    }}
                    className={`w-full py-2 rounded-lg text-sm font-medium ${
                      selectedPlan === plan.id
                        ? "bg-primary/90 text-primary-foreground"
                        : plan.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 bg-background">
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-8 text-center">
                Frequently Asked Questions
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How quickly can I expect a response from the concierge team?</AccordionTrigger>
                  <AccordionContent>
                    Our concierge team guarantees a response within 30 minutes, 24/7/365. For urgent matters, we have a dedicated emergency line ensuring immediate assistance regardless of your global location or time zone.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is the concierge service available worldwide?</AccordionTrigger>
                  <AccordionContent>
                    Yes, our luxury concierge services are available globally. We have local specialists in over 140 countries and partnerships with premium service providers worldwide to deliver exceptional experiences anywhere you travel.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I upgrade my concierge plan during my trip?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely. You can upgrade your concierge plan at any point during your journey. Simply contact your concierge, and they will immediately process the upgrade, giving you instant access to additional premium services.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>What's the most unusual request you've fulfilled?</AccordionTrigger>
                  <AccordionContent>
                    We've coordinated everything from arranging a private viewing of the Northern Lights with a renowned astronomer to securing a private performance by an opera singer in the Roman Colosseum after hours. Our team specializes in making the seemingly impossible possible.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>How do you handle requests that seem impossible?</AccordionTrigger>
                  <AccordionContent>
                    Our approach is that nothing is impossible—some requests just require more creativity and resources. We leverage our extensive global network of partners, utilize our VIP connections, and sometimes create completely custom solutions to fulfill even the most challenging requests.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-12">
          <div className="container px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="glass p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Clock size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">Need Immediate Assistance?</h3>
                    <p className="text-muted-foreground">Our luxury concierge team is available 24/7</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <form className="space-y-4">
                      <div>
                        <input 
                          type="text" 
                          placeholder="Your Name" 
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <input 
                          type="email" 
                          placeholder="Email Address" 
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <input 
                          type="tel" 
                          placeholder="Phone Number" 
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <textarea 
                          placeholder="How can we assist you?" 
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        ></textarea>
                      </div>
                      <button
                        type="button"
                        onClick={handleRequestService}
                        className="w-full px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground bg-primary rounded-lg transition-colors hover:bg-primary/90"
                      >
                        Submit Request
                      </button>
                    </form>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Heart size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Personalized Service</h4>
                        <p className="text-sm text-muted-foreground">Our dedicated concierge team will handle your requests with meticulous attention to detail.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Trophy size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Premium Experiences</h4>
                        <p className="text-sm text-muted-foreground">Access exclusive events, restaurants, and experiences not available to the general public.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <ShieldCheck size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Secure & Confidential</h4>
                        <p className="text-sm text-muted-foreground">All your requests and personal information are handled with complete confidentiality.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Calendar size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Flexible Scheduling</h4>
                        <p className="text-sm text-muted-foreground">Adaptable to your changing plans with minimal notice and maximum convenience.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/10">
          <div className="container px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-6">
                Trusted by Elite Travelers Worldwide
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                  <p className="text-sm text-muted-foreground">Concierge Requests</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-primary mb-2">140+</div>
                  <p className="text-sm text-muted-foreground">Countries Served</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <p className="text-sm text-muted-foreground">Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LuxuryConcierge;
