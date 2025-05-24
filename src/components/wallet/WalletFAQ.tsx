
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function WalletFAQ() {
  const faqItems = [
    {
      question: "How do I add money to my wallet?",
      answer: "You can add money to your wallet using credit/debit cards or bank transfers. Go to the 'Add Money' section, enter the amount you wish to add, select your preferred payment method, and confirm the transaction."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard encryption and security protocols to protect your payment information. We comply with PCI DSS standards and never store your full credit card details on our servers."
    },
    {
      question: "How do I send money to friends?",
      answer: "To send money, navigate to the 'Send Money' section, enter the recipient's name or username, specify the amount, and confirm the transaction. The recipient will receive the funds instantly in their wallet."
    },
    {
      question: "What are the fees for using the wallet?",
      answer: "There are no fees for adding money to your wallet or making payments for travel bookings. However, bank transfers to external accounts may incur a small fee depending on your region and banking partners."
    },
    {
      question: "How does the Pay Later feature work?",
      answer: "Our Pay Later feature allows you to book travel now and pay in installments. You can split payments into 3, 6, or 12 monthly installments with no interest. Eligibility is based on your account history and activity."
    },
    {
      question: "Can I get a refund to my wallet?",
      answer: "Yes, refunds for cancelled bookings are returned to your wallet immediately. You can then use these funds for future bookings or withdraw them to your bank account."
    },
    {
      question: "How do I redeem vouchers?",
      answer: "To redeem a voucher, go to the 'Vouchers' tab, enter your voucher code in the designated field, and click 'Apply'. The voucher will be added to your account and automatically applied to eligible bookings."
    },
    {
      question: "What happens if I forget my password?",
      answer: "If you forget your password, click on the 'Forgot Password' link on the login page. We'll send a password reset link to your registered email address. For security reasons, this link will expire after 24 hours."
    }
  ];

  const handleContactSupport = () => {
    toast('Connecting to support...', {
      description: 'Our team will be with you shortly to assist with your queries.',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Frequently Asked Questions</h3>
          </div>
          
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border p-2 rounded-md"
              >
                <AccordionTrigger className="text-sm font-medium py-2 px-1">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground px-1 pt-1 pb-2">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-3">
              <MessageCircle className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium">Need more help?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Our support team is available 24/7 to answer your questions
                </p>
              </div>
            </div>
            <Button onClick={handleContactSupport}>
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
