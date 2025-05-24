
import { apiClient } from "../client";
import { Transaction, Voucher } from "@/hooks/useWalletStore";

export interface WalletInfo {
  balance: number;
  currency: string;
  transactions: Transaction[];
  vouchers: Voucher[];
}

/**
 * Wallet API service
 */
export const walletService = {
  /**
   * Get wallet information
   */
  getWalletInfo: async (): Promise<WalletInfo> => {
    return apiClient.get<WalletInfo>('/wallet');
  },

  /**
   * Add money to wallet
   */
  addMoney: async (amount: number): Promise<WalletInfo> => {
    return apiClient.post<WalletInfo>('/wallet/add', { amount });
  },

  /**
   * Send money from wallet
   */
  sendMoney: async (amount: number, recipient?: string): Promise<WalletInfo> => {
    return apiClient.post<WalletInfo>('/wallet/send', { amount, recipient });
  },

  /**
   * Get wallet transactions
   */
  getTransactions: async (): Promise<Transaction[]> => {
    return apiClient.get<Transaction[]>('/wallet/transactions');
  },

  /**
   * Get wallet vouchers
   */
  getVouchers: async (): Promise<Voucher[]> => {
    return apiClient.get<Voucher[]>('/wallet/vouchers');
  },

  /**
   * Add voucher to wallet
   */
  addVoucher: async (code: string): Promise<Voucher> => {
    return apiClient.post<Voucher>('/wallet/vouchers', { code });
  },

  /**
   * Use voucher from wallet
   */
  useVoucher: async (id: string): Promise<Voucher> => {
    return apiClient.post<Voucher>(`/wallet/vouchers/${id}/use`);
  },
};
