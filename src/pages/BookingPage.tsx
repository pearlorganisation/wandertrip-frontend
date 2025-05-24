import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingPreview from '@/components/BookingPreview';
import TransportBooking from '@/components/booking/TransportBooking';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Calendar, Ticket, Check, Info, DollarSign, ShieldCheck, Lock, ChevronRight, ChevronsRight, Sparkles, ConciergeBell, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import PaymentSecurityBanner from '@/components/PaymentSecurityBanner';
import PaymentTrustReviews from '@/components/PaymentTrustReviews';
import SatisfactionGuarantee from '@/components/SatisfactionGuarantee';
import TrustedPaymentInfo from '@/components/TrustedPaymentInfo';
import confetti from 'canvas-confetti';

const BookingPage = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedEMI, setSelectedEMI] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const destination = queryParams.get('destination') || 'Bali, Indonesia';
  const duration = queryParams.get('duration') || 'Jun 15 - Jun 22, 2024';
  const travelers = queryParams.get('travelers') || '2 Adults';

  const handleProceedToPayment = () => {
    setCurrentStep(2);
    toast({
      title: "Proceeding to Payment",
      description: "Your booking details have been saved.",
    });
  };

  // Function to handle redirection
  const handleActivityClick = () => {
    navigate('/activities'); // Redirect to /activities 
  };

  const handleCompleteBooking = () => {
    setCurrentStep(3);
    setShowConfetti(true);
    toast({
      title: "Booking Confirmed!",
      description: "Your trip has been successfully booked.",
      variant: "default",
    });
  };

  useEffect(() => {
    if (showConfetti) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
    }
  }, [showConfetti]);

  const emiOptions = [
    { bank: 'HDFC Bank', terms: ['3 months', '6 months', '12 months'], interest: '0%' },
    { bank: 'ICICI Bank', terms: ['3 months', '6 months', '9 months'], interest: '0%' },
    { bank: 'Axis Bank', terms: ['3 months', '6 months'], interest: '0%' },
    { bank: 'State Bank', terms: ['3 months'], interest: '0%' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24">
        <section className="py-12 bg-secondary/30">
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Complete Your Booking
              </h1>
              <p className="text-muted-foreground text-lg">
                Secure your travel experience with our easy booking process
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-10">
                {[
                  { step: 1, label: "Review Selections" },
                  { step: 2, label: "Payment" },
                  { step: 3, label: "Confirmation" }
                ].map((step) => (
                  <div key={step.step} className="flex flex-col items-center relative w-1/3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm mb-2 transition-all duration-300",
                        currentStep >= step.step
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {currentStep > step.step ? <Check size={18} /> : step.step}
                    </div>
                    <span className={cn(
                      "text-xs font-medium",
                      currentStep >= step.step ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {step.label}
                    </span>

                    {step.step < 3 && (
                      <div className={cn(
                        "absolute top-5 left-full w-full h-0.5 transition-all duration-500",
                        currentStep > step.step ? "bg-primary" : "bg-muted"
                      )} style={{ width: "calc(100% - 40px)", transform: "translateX(-50%)" }}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4 sm:px-6">
            {currentStep === 1 && (
              <div className="max-w-4xl mx-auto animate-fade-in">
                <div className="mb-8">
                  <div className="flex mb-6 overflow-x-auto no-scrollbar">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={cn(
                        "px-6 py-3 border-b-2 whitespace-nowrap",
                        activeTab === 'all'
                          ? "border-primary text-primary font-medium"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      )}
                    >
                      All Options
                    </button>
                    <button
                      onClick={() => setActiveTab('flights')}
                      className={cn(
                        "px-6 py-3 border-b-2 whitespace-nowrap",
                        activeTab === 'flights'
                          ? "border-primary text-primary font-medium"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Flights
                    </button>
                    <button
                      onClick={() => setActiveTab('hotels')}
                      className={cn(
                        "px-6 py-3 border-b-2 whitespace-nowrap",
                        activeTab === 'hotels'
                          ? "border-primary text-primary font-medium"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Hotels
                    </button>
                    <button
                      onClick={() => setActiveTab('activities')}
                      className={cn(
                        "px-6 py-3 border-b-2 whitespace-nowrap",
                        activeTab === 'activities'
                          ? "border-primary text-primary font-medium"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Activities
                    </button>

                    <button
                      onClick={() => setActiveTab('transport')}
                      className={cn(
                        "px-6 py-3 border-b-2 whitespace-nowrap",
                        activeTab === 'transport'
                          ? "border-primary text-primary font-medium"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Transport
                    </button>
                  </div>

                  {(activeTab === 'all' || activeTab === 'flights') && (
                    <div id='book_flights' className="glass rounded-xl p-6 mb-6 animate-fade-in">
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                          </svg>
                        </span>
                        Flight Options
                      </h3>

                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                        <div className="flex-1 p-4 bg-secondary/50 rounded-lg">
                          <p className="text-xs font-medium text-muted-foreground mb-1">From</p>
                          <p className="font-medium">New Delhi (DEL)</p>
                        </div>
                        <ChevronRight className="hidden md:block text-muted-foreground" />
                        <div className="flex-1 p-4 bg-secondary/50 rounded-lg">
                          <p className="text-xs font-medium text-muted-foreground mb-1">To</p>
                          <p className="font-medium">{destination.split(',')[0]} (DPS)</p>
                        </div>
                        <div className="flex-1 p-4 bg-secondary/50 rounded-lg">
                          <p className="text-xs font-medium text-muted-foreground mb-1">Dates</p>
                          <p className="font-medium">{duration.split(' - ')[0]} - {duration.split(' - ')[1]}</p>
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
                  )}

                  {(activeTab === 'all' || activeTab === 'hotels') && (
                    <div id='book_hotels' className="glass rounded-xl p-6 mb-6 animate-fade-in">
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <span className="bg-purple-100 text-purple-600 p-1.5 rounded-lg mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
                            <path d="M1 21h22" />
                            <path d="M8 9h8" />
                            <path d="M8 13h8" />
                            <path d="M8 17h8" />
                          </svg>
                        </span>
                        Hotel Options
                      </h3>

                      <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1 p-4 bg-secondary/50 rounded-lg">
                          <p className="text-xs font-medium text-muted-foreground mb-1">Location</p>
                          <p className="font-medium">{destination}</p>
                        </div>
                        <div className="flex-1 p-4 bg-secondary/50 rounded-lg">
                          <p className="text-xs font-medium text-muted-foreground mb-1">Check In/Out</p>
                          <p className="font-medium">{duration}</p>
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
                      </div>
                    </div>
                  )}

                  {(activeTab === 'all' || activeTab === 'activities') && (
                    <div id="book_activities" className="glass rounded-xl p-6 mb-6 animate-fade-in">
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <span className="bg-green-100 text-green-600 p-1.5 rounded-lg mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="8" r="5" />
                            <path d="M12 22 9 16l-5-1 8-4 8 4-5 1Z" />
                          </svg>
                        </span>
                        Activity Options
                      </h3>

                      <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1 p-4 bg-secondary/50 rounded-lg">
                          <p className="text-xs font-medium text-muted-foreground mb-1">Location</p>
                          <p className="font-medium">{destination}</p>
                        </div>
                        <div className="flex-1 p-4 bg-secondary/50 rounded-lg">
                          <p className="text-xs font-medium text-muted-foreground mb-1">Date</p>
                          <p className="font-medium">{duration.split(' - ')[0]}</p>
                        </div>
                      </div>

                      <div onClick={handleActivityClick} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-border rounded-lg overflow-hidden hover:border-primary/25 transition-colors cursor-pointer">
                          <img src="https://images.unsplash.com/photo-1604480132736-44c188fe4d20" alt="Activity" className="w-full h-40 object-cover" />
                          <div className="p-4">
                            <h3 className="font-medium mb-1">Mount Batur Sunrise Trek</h3>
                            <div className="flex items-center text-sm text-muted-foreground mb-3">
                              <Calendar size={14} className="mr-1" />
                              <span>3-4 hours • Morning</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="font-medium">₹2,400 <span className="text-xs font-normal text-muted-foreground">per person</span></p>
                              <button className="px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
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
                              <button className="px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {(activeTab === 'transport') && (
                    <div id='book_transport' className="mb-6">
                      <TransportBooking />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  {/* <SatisfactionGuarantee variant="compact" /> */}
                  {/* <PaymentTrustReviews variant="compact" /> */}
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => {
                      handleProceedToPayment(); // Call the payment function first
                      setTimeout(() => {
                        const element = document.getElementById("secure_pay");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }, 300); // Delay scrolling slightly
                    }}
                    className="px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground bg-primary rounded-lg transition-colors hover:bg-primary/90 animate-pulse"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div id='secure_pay' className="max-w-4xl mx-auto animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="glass rounded-2xl p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <Lock size={20} className="text-primary" />
                        <h2 className="text-xl font-medium">Secure Payment</h2>
                      </div>

                      <div className="space-y-1 mb-6">
                        <label className="text-sm font-medium">Payment Method</label>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                          <button
                            onClick={() => setPaymentMethod('card')}
                            className={cn(
                              "py-3 px-4 border rounded-lg flex flex-col items-center justify-center gap-2 transition-colors",
                              paymentMethod === 'card'
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-muted-foreground"
                            )}
                          >
                            <CreditCard className={paymentMethod === 'card' ? "text-primary" : "text-muted-foreground"} />
                            <span className="text-xs font-medium">Credit/Debit Card</span>
                          </button>
                          <button
                            onClick={() => setPaymentMethod('netbanking')}
                            className={cn(
                              "py-3 px-4 border rounded-lg flex flex-col items-center justify-center gap-2 transition-colors",
                              paymentMethod === 'netbanking'
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-muted-foreground"
                            )}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={paymentMethod === 'netbanking' ? "text-primary" : "text-muted-foreground"}
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <path d="M12 19v-7" />
                              <path d="M2 11h20" />
                            </svg>
                            <span className="text-xs font-medium">Net Banking</span>
                          </button>
                          <button
                            onClick={() => setPaymentMethod('upi')}
                            className={cn(
                              "py-3 px-4 border rounded-lg flex flex-col items-center justify-center gap-2 transition-colors",
                              paymentMethod === 'upi'
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-muted-foreground"
                            )}
                          >
                            <DollarSign className={paymentMethod === 'upi' ? "text-primary" : "text-muted-foreground"} />
                            <span className="text-xs font-medium">UPI</span>
                          </button>
                        </div>
                      </div>

                      {paymentMethod === 'card' && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Card Information</label>
                            <div className="relative">
                              <CreditCard size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                              <input
                                type="text"
                                placeholder="Card Number"
                                className="w-full pl-10 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <input
                                type="text"
                                placeholder="MM / YY"
                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
                              />
                              <input
                                type="text"
                                placeholder="CVC"
                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Name on Card</label>
                            <input
                              type="text"
                              placeholder="Full Name"
                              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Billing Address</label>
                            <input
                              type="text"
                              placeholder="Address"
                              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
                            />

                            <div className="grid grid-cols-2 gap-4">
                              <input
                                type="text"
                                placeholder="City"
                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
                              />
                              <input
                                type="text"
                                placeholder="Postal Code"
                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
                              />
                            </div>
                          </div>

                          <TrustedPaymentInfo className="mt-6" />
                        </div>
                      )}

                      <div className="p-4 rounded-lg bg-secondary/50 mt-6">
                        <div className="flex items-start mb-1">
                          <Info size={16} className="mr-2 text-primary mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium">EMI Payment Available</h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              Pay in easy installments with 0% interest through our banking partners.
                            </p>

                            {emiOptions.map((bank, idx) => (
                              <div key={idx} className="mb-2 last:mb-0">
                                <p className="text-xs font-medium mb-1">{bank.bank} <span className="text-green-600">{bank.interest} interest</span></p>
                                <div className="flex flex-wrap gap-2">
                                  {bank.terms.map((term, i) => (
                                    <button
                                      key={i}
                                      onClick={() => setSelectedEMI(`${bank.bank}-${term}`)}
                                      className={cn(
                                        "text-xs px-2 py-1 rounded-full border",
                                        selectedEMI === `${bank.bank}-${term}`
                                          ? "border-primary bg-primary/10 text-primary"
                                          : "border-border hover:border-primary/30"
                                      )}
                                    >
                                      {term}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <div className="glass rounded-2xl p-6 sticky top-24">
                      <h3 className="font-medium mb-4">Price Breakdown</h3>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center text-sm">
                          <span>Accommodation (7 nights)</span>
                          <span>₹28,000</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Activities & Experiences</span>
                          <span>₹12,600</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Transportation</span>
                          <span>₹5,000</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Taxes & Fees</span>
                          <span>₹5,400</span>
                        </div>

                        {selectedEMI && (
                          <div className="pt-3 mt-3 border-t border-border">
                            <p className="text-xs font-medium text-primary mb-2">EMI Calculation (estimate)</p>
                            {[...Array(Number(selectedEMI.split('-')[1].split(' ')[0]))].map((_, idx) => (
                              <div key={idx} className="flex justify-between text-xs mb-1">
                                <span>Month {idx + 1}</span>
                                <span>₹{Math.round(51000 / Number(selectedEMI.split('-')[1].split(' ')[0]))} </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-border">
                        <div className="flex justify-between items-center font-medium mt-2">
                          <span>Total Amount</span>
                          <span className="text-lg">₹51,000</span>
                        </div>

                        {selectedEMI && (
                          <div className="text-xs text-primary mt-1 text-right">
                            or ₹{Math.round(51000 / Number(selectedEMI.split('-')[1].split(' ')[0]))} x {selectedEMI.split('-')[1]}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-4 p-3 bg-primary/5 rounded-lg">
                        <ShieldCheck size={16} className="text-primary flex-shrink-0" />
                        <p className="text-xs">
                          <span className="font-medium">Secure payment.</span> Your information is protected.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          handleCompleteBooking(); // Call the payment function first
                          setTimeout(() => {
                            const element = document.getElementById("book_complete");
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                          }, 300); // Delay scrolling slightly
                        }}
                        className="px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground bg-primary rounded-lg transition-colors hover:bg-primary/90 animate-pulse"
                      >
                        Complete Booking
                      </button>

                      <div className="text-xs text-center text-muted-foreground mt-4">
                        By clicking "Complete Booking", you agree to our Terms of Service and Privacy Policy
                      </div>

                      <div className="flex justify-center space-x-3 mt-4">
                        <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-6" />
                        <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="MasterCard" className="h-6" />
                        <img src="https://cdn-icons-png.flaticon.com/128/349/349230.png" alt="AmEx" className="h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div id='book_complete' className="max-w-3xl mx-auto animate-scale-in">
                <div className="glass rounded-2xl p-8 text-center relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>

                    <h2 className="text-2xl font-medium mb-2 flex items-center justify-center">
                      <Sparkles size={20} className="text-yellow-500 mr-2" />
                      Booking Confirmed!
                      <Sparkles size={20} className="text-yellow-500 ml-2" />
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Your travel experience has been successfully booked. Check your email for details.
                    </p>

                    <div className="glass-dark p-6 rounded-xl mb-8 text-left">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">Booking Summary</h3>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                          #WTR-24680
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Destination</span>
                          <span className="font-medium">{destination}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Travel Dates</span>
                          <span className="font-medium">{duration}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Travelers</span>
                          <span className="font-medium">{travelers}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Payment Method</span>
                          <span className="font-medium">•••• 4242</span>
                        </div>
                        <div className="flex justify-between items-center text-sm pt-3 border-t border-border">
                          <span className="text-muted-foreground">Total Amount</span>
                          <span className="font-medium">₹51,000</span>
                        </div>

                        {selectedEMI && (
                          <div className="flex items-center gap-1 text-xs text-primary">
                            <CreditCard size={14} className="mr-1" />
                            <span>EMI Plan: {selectedEMI.split('-')[0]}, {selectedEMI.split('-')[1]}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <PaymentSecurityBanner variant="minimal" className="mb-6" />

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="flex-1 flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground bg-primary rounded-lg transition-colors hover:bg-primary/90">
                        <Ticket size={18} className="mr-2" />
                        View E-Tickets
                      </button>
                      <button className="flex-1 flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-primary bg-transparent rounded-lg border border-primary/25 transition-colors hover:bg-primary/5 hover:border-primary/40">
                        <Calendar size={18} className="mr-2" />
                        Add to Calendar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <PaymentSecurityBanner className="max-w-4xl mx-auto mb-10" />
        {currentStep !== 3 && (
          <section className="py-10 bg-muted/10">
            <div className="container px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <SatisfactionGuarantee />
                <PaymentTrustReviews />
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;