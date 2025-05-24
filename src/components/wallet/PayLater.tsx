
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Clock, Calendar, CreditCard, Info, ArrowRight, ChevronDown, CheckCircle, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useWalletStore } from '@/hooks/useWalletStore';

export default function PayLater() {
  const { currency } = useWalletStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');
  
  // Mock pay later data
  const creditLimit = 2000;
  const availableCredit = 1200;
  const usedCredit = creditLimit - availableCredit;
  const creditUsagePercent = (usedCredit / creditLimit) * 100;
  
  const activePlans = [
    { 
      id: 1, 
      merchant: "Hilton Hotels",
      description: "3-Night Stay in Paris",
      originalAmount: 780,
      remainingAmount: 520,
      installmentsTotal: 3,
      installmentsPaid: 1,
      nextPaymentDate: "2023-12-15",
      nextPaymentAmount: 260
    }
  ];
  
  const paymentHistory = [
    { 
      id: 1, 
      merchant: "Hilton Hotels",
      description: "First installment for Paris stay",
      amount: 260,
      date: "2023-11-15",
      status: "completed"
    },
    { 
      id: 2, 
      merchant: "Air France",
      description: "Return flight to Paris",
      amount: 450,
      date: "2023-10-22",
      status: "completed"
    },
    { 
      id: 3, 
      merchant: "Local Tours Inc.",
      description: "Paris City Tour",
      amount: 120,
      date: "2023-10-05",
      status: "completed"
    }
  ];
  
  const eligibilityPoints = [
    // { id: 1, title: "No Credit Check Required", isEligible: true },
    { id: 2, title: "Interest-Free Installments", isEligible: true },
    { id: 3, title: "Flexible Payment Schedule", isEligible: true },
    { id: 4, title: "Premium Member Status", isEligible: true },
    { id: 5, title: "No Hidden Fees", isEligible: true }
  ];

  const handlePayNow = (planId: number) => {
    toast.success('Payment successful!', {
      description: 'Your installment payment has been processed.',
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'overview' | 'history')}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> Payment History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Travel Now, Pay Later</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Credit Used</span>
                    <span>{currency}{usedCredit} of {currency}{creditLimit}</span>
                  </div>
                  <Progress value={creditUsagePercent} indicatorClassName={cn(
                    creditUsagePercent > 80 ? "bg-red-500" :
                    creditUsagePercent > 50 ? "bg-amber-500" :
                    "bg-green-500"
                  )} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Available Credit</div>
                    <div className="text-2xl font-bold text-green-600">{currency}{availableCredit}</div>
                  </div>
                  
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Credit Limit</div>
                    <div className="text-2xl font-bold">{currency}{creditLimit}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between bg-primary/10 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    <div className="text-sm">Increase your credit limit</div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    Check Eligibility
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div>
            <h3 className="font-medium mb-3">Active Payment Plans</h3>
            
            {activePlans.length > 0 ? (
              <div className="space-y-4">
                {activePlans.map((plan) => (
                  <Card key={plan.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{plan.description}</div>
                          <div className="text-xs text-muted-foreground mb-2">{plan.merchant}</div>
                        </div>
                        <div className="bg-primary/10 px-2 py-1 rounded text-xs font-medium text-primary">
                          {plan.installmentsPaid}/{plan.installmentsTotal} Paid
                        </div>
                      </div>
                      
                      <Progress 
                        value={(plan.installmentsPaid / plan.installmentsTotal) * 100} 
                        className="my-3"
                      />
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <div className="text-muted-foreground">Original Amount</div>
                          <div className="font-medium">{currency}{plan.originalAmount}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Remaining</div>
                          <div className="font-medium">{currency}{plan.remainingAmount}</div>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-3 rounded-lg flex justify-between items-center">
                        <div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Next payment on {plan.nextPaymentDate}
                          </div>
                          <div className="font-medium">{currency}{plan.nextPaymentAmount}</div>
                        </div>
                        <Button size="sm" onClick={() => handlePayNow(plan.id)}>
                          Pay Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-medium">No active payment plans</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">
                    Use Pay Later on your next booking to split costs into manageable installments
                  </p>
                  <Button>
                    Explore Travel Options
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Pay Later Eligibility</h3>
              
              <div className="space-y-2">
                {eligibilityPoints.map((point) => (
                  <div key={point.id} className="flex items-center gap-2">
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center",
                      point.isEligible ? "bg-green-100" : "bg-red-100"
                    )}>
                      {point.isEligible 
                        ? <Check className="h-3 w-3 text-green-600" /> 
                        : <X className="h-3 w-3 text-red-600" />}
                    </div>
                    <div className="text-sm">{point.title}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">Payment History</h3>
              
              {paymentHistory.length > 0 ? (
                <div className="space-y-3">
                  {paymentHistory.map((payment) => (
                    <motion.div 
                      key={payment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{payment.description}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <span>{payment.merchant}</span>
                          <span className="mx-1">•</span>
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{payment.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className={cn(
                          "text-xs px-2 py-1 rounded-full mr-2",
                          payment.status === 'completed' 
                            ? "bg-green-100 text-green-600" 
                            : "bg-amber-100 text-amber-600"
                        )}>
                          {payment.status === 'completed' ? 'Paid' : 'Pending'}
                        </div>
                        <div className="font-medium">
                          {currency}{payment.amount}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-medium">No payment history</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your payment history will appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
