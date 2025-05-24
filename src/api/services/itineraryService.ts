
import { apiClient } from "../client";

export interface Itinerary {
  id: string;
  destination: string;
  duration: string;
  travelers: number;
  style: string;
  days: {
    day: number;
    title: string;
    activities: string[];
  }[];
}

/**
 * Itinerary API service
 */
export const itineraryService = {
  /**
   * Get all itineraries
   */
  getItineraries: async (): Promise<Itinerary[]> => {
    return apiClient.get<Itinerary[]>('/itineraries');
  },

  /**
   * Get itinerary by id
   */
  getItineraryById: async (id: string): Promise<Itinerary> => {
    return apiClient.get<Itinerary>(`/itineraries/${id}`);
  },

  /**
   * Create new itinerary
   */
  createItinerary: async (data: Omit<Itinerary, 'id'>): Promise<Itinerary> => {
    return apiClient.post<Itinerary>('/itineraries', data);
  },

  /**
   * Update itinerary
   */
  updateItinerary: async (id: string, data: Partial<Itinerary>): Promise<Itinerary> => {
    return apiClient.put<Itinerary>(`/itineraries/${id}`, data);
  },

  /**
   * Delete itinerary
   */
  deleteItinerary: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/itineraries/${id}`);
  },
};
