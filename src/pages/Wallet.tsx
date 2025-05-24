
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  History,
  Gift,
  ReceiptText,
  UsersRound,
  ClockIcon,
  Award,
  HelpCircle
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WalletBalance from '@/components/wallet/WalletBalance';
import QuickActions from '@/components/wallet/QuickActions';
import Transactions from '@/components/wallet/Transactions';
import AddMoney from '@/components/wallet/AddMoney';
import SendMoney from '@/components/wallet/SendMoney';
import Vouchers from '@/components/wallet/Vouchers';
import ReferralProgram from '@/components/wallet/ReferralProgram';
import PayLater from '@/components/wallet/PayLater';
import WalletFAQ from '@/components/wallet/WalletFAQ';
import Offers from '@/components/wallet/Offers';
import PaymentSecurityBanner from '@/components/PaymentSecurityBanner';
import { useAuth } from '@/contexts/AuthContext';

export default function WalletPage() {
   // Scroll to top on component mount
   useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once on mount
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("history");

  return (
    <>
      <Helmet>
        <title>Wander Wallet | WanderTrip</title>
        <meta name="description" content="Your travel wallet for secure payments and exclusive rewards" />
      </Helmet>

      <Navbar />

      <div className="container max-w-7xl mx-auto px-4 pt-16 pb-20">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold tracking-tight">Wander Wallet</h1>
          <p className="text-muted-foreground mt-1">
            Manage your travel funds, rewards, and transactions in one place
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WalletBalance />

            {/* <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-6"
            >
              <QuickActions />
            </motion.div> */}

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-6"
            >
              <TabsList className="grid grid-cols-4 sm:grid-cols-8 mb-4">
                {/* <TabsTrigger value="overview" className="text-xs sm:text-sm">
                  <Wallet className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger> */}
                <TabsTrigger value="history" className="text-xs sm:text-sm">
                  <History className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">History</span>
                </TabsTrigger>
                <TabsTrigger value="vouchers" className="text-xs sm:text-sm">
                  <ReceiptText className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Vouchers</span>
                </TabsTrigger>
                <TabsTrigger value="refer" className="text-xs sm:text-sm">
                  <UsersRound className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Refer</span>
                </TabsTrigger>
                <TabsTrigger value="paylater" className="text-xs sm:text-sm">
                  <ClockIcon className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Pay Later</span>
                </TabsTrigger>
                <TabsTrigger value="offers" className="text-xs sm:text-sm">
                  <Gift className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Offers</span>
                </TabsTrigger>
                {/* <TabsTrigger value="rewards" className="text-xs sm:text-sm">
                  <Award className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Rewards</span>
                </TabsTrigger> */}
                {/* <TabsTrigger value="help" className="text-xs sm:text-sm">
                  <HelpCircle className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Help</span>
                </TabsTrigger> */}
              </TabsList>

              {/* <TabsContent value="overview" className="space-y-6">
                <Transactions limit={5} />
              </TabsContent> */}

              <TabsContent value="history" className="space-y-6">
                <Transactions />
              </TabsContent>

              <TabsContent value="vouchers" className="space-y-6">
                <Vouchers />
              </TabsContent>

              <TabsContent value="refer" className="space-y-6">
                <ReferralProgram />
              </TabsContent>

              <TabsContent value="paylater" className="space-y-6">
                <PayLater />
              </TabsContent>

              <TabsContent value="offers" className="space-y-6">
                <Offers />
              </TabsContent>

              {/* <TabsContent value="rewards" className="space-y-6">
                <div className="rounded-lg border p-4 text-center">
                  <Award className="h-10 w-10 text-primary mx-auto mb-2" />
                  <h3 className="font-medium text-lg mb-1">Travel Rewards</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Visit the Rewards page to see all your earned rewards and redeem them for travel perks.
                  </p>
                  <a 
                    href="/rewards" 
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    Go to Rewards Page
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </TabsContent> */}

              {/* <TabsContent value="help" className="space-y-6">
                <WalletFAQ />
              </TabsContent> */}
            </Tabs>
 
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <AddMoney />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <SendMoney />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <PaymentSecurityBanner variant="minimal" className="mt-4" />
            </motion.div>
          </div>
        </div>
          <div className="space-y-6">
              <div className="h-1"></div> {/* Spacer div */}
              <WalletFAQ />
            </div>
      </div>

      <Footer />
    </>
  );
}
