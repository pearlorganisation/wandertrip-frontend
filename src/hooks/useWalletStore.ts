
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Transaction = {
  id: string;
  amount: number;
  description: string;
  merchant: string;
  date: string;
  type: 'credit' | 'debit';
  category: 'transfer' | 'shopping' | 'travel' | 'food' | 'lodging' | 'wallet' | 'other';
};

export type Voucher = {
  id: string;
  code: string;
  amount: number;
  expiryDate: string;
  isUsed: boolean;
  type: 'discount' | 'cashback' | 'gift';
  description: string;
};

interface WalletStore {
  balance: number;
  currency: string;
  hideBalance: boolean;
  transactions: Transaction[];
  vouchers: Voucher[];
  
  // Actions
  addMoney: (amount: number) => void;
  sendMoney: (amount: number) => void;
  addVoucher: (voucher: Voucher) => void;
  useVoucher: (id: string) => void;
  toggleHideBalance: () => void;
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      balance: 250.00,
      currency: '$',
      hideBalance: false,
      transactions: [
        {
          id: '1',
          amount: 100.00,
          description: 'Added to wallet',
          merchant: 'Bank Transfer',
          date: '2023-11-20',
          type: 'credit',
          category: 'transfer'
        },
        {
          id: '2',
          amount: 150.00,
          description: 'Added to wallet',
          merchant: 'Credit Card',
          date: '2023-11-15',
          type: 'credit',
          category: 'transfer'
        },
        {
          id: '3',
          amount: 25.75,
          description: 'Coffee Shop',
          merchant: 'Starbucks',
          date: '2023-11-10',
          type: 'debit',
          category: 'food'
        },
        {
          id: '4',
          amount: 45.50,
          description: 'Travel Guide Book',
          merchant: 'Amazon',
          date: '2023-11-05',
          type: 'debit',
          category: 'shopping'
        },
        {
          id: '5',
          amount: 120.00,
          description: 'Hotel Deposit',
          merchant: 'Grand Hyatt',
          date: '2023-11-01',
          type: 'debit',
          category: 'lodging'
        },
        {
          id: '6',
          amount: 65.25,
          description: 'Flight Booking Discount',
          merchant: 'WanderTrip Rewards',
          date: '2023-10-28',
          type: 'credit',
          category: 'travel'
        },
        {
          id: '7',
          amount: 35.00,
          description: 'Local Tour',
          merchant: 'City Experiences',
          date: '2023-10-25',
          type: 'debit',
          category: 'travel'
        },
      ],
      vouchers: [
        {
          id: '1',
          code: 'WELCOME10',
          amount: 10,
          expiryDate: '2023-12-31',
          isUsed: false,
          type: 'discount',
          description: '$10 travel credit'
        }
      ],
      
      addMoney: (amount) => set((state) => {
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          amount,
          description: 'Added to wallet',
          merchant: 'Wallet Top-up',
          date: new Date().toISOString().split('T')[0],
          type: 'credit',
          category: 'wallet'
        };
        
        return {
          balance: state.balance + amount,
          transactions: [newTransaction, ...state.transactions]
        };
      }),
      
      sendMoney: (amount) => set((state) => {
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          amount,
          description: 'Sent money',
          merchant: 'Money Transfer',
          date: new Date().toISOString().split('T')[0],
          type: 'debit',
          category: 'transfer'
        };
        
        return {
          balance: state.balance - amount,
          transactions: [newTransaction, ...state.transactions]
        };
      }),
      
      addVoucher: (voucher) => set((state) => ({
        vouchers: [voucher, ...state.vouchers]
      })),
      
      useVoucher: (id) => set((state) => ({
        vouchers: state.vouchers.map(voucher => 
          voucher.id === id ? { ...voucher, isUsed: true } : voucher
        )
      })),
      
      toggleHideBalance: () => set((state) => ({
        hideBalance: !state.hideBalance
      }))
    }),
    {
      name: 'wallet-store',
    }
  )
);
