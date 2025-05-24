
import { apiClient } from "../client";

export interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  saved: boolean;
  rating: number;
}

/**
 * Destination API service
 */
export const destinationService = {
  /**
   * Get all destinations
   */
  getDestinations: async (): Promise<Destination[]> => {
    return apiClient.get<Destination[]>('/destinations');
  },

  /**
   * Get destination by id
   */
  getDestinationById: async (id: string): Promise<Destination> => {
    return apiClient.get<Destination>(`/destinations/${id}`);
  },

  /**
   * Toggle save destination
   */
  toggleSaveDestination: async (id: string): Promise<Destination> => {
    return apiClient.post<Destination>(`/destinations/${id}/toggle-save`);
  },
};
