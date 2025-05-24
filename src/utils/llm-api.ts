
import { apiClient } from '@/api/client';

interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

export interface GeneratedItinerary {
  destination: string;
  duration: string;
  travelers: number;
  style: string;
  days: ItineraryDay[];
}

/**
 * Generate a travel itinerary based on user preferences
 */
export async function generateTravelItinerary(preferences: any): Promise<GeneratedItinerary> {
  console.log('Generating itinerary with preferences:', preferences);
  
  try {
    // In production, this would call the actual API endpoint
    // return await apiClient.post<GeneratedItinerary>('/llm/generate-itinerary', preferences);
    
    // For demo purposes, we'll simulate the API call
    // In a real implementation, remove this delay and use the API client
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      destination: preferences.destination || 'Bali',
      duration: preferences.dates || '7 days',
      travelers: parseInt(preferences.travelers?.split(' ')[0]) || 2,
      style: preferences.travelStyle || 'Adventure',
      days: [
        {
          day: 1,
          title: "Arrival & Exploration",
          activities: [
            "Arrive at destination airport",
            "Check-in to accommodation",
            "Evening exploration of local area"
          ]
        },
        {
          day: 2,
          title: "Cultural Immersion",
          activities: [
            "Visit top cultural attractions",
            "Local cuisine experience",
            "Traditional performance or activity"
          ]
        },
        {
          day: 3,
          title: "Nature Day",
          activities: [
            "Hiking or nature excursion",
            "Picnic lunch in scenic area",
            "Sunset viewing at premium location"
          ]
        },
        {
          day: 4,
          title: "Adventure Activities",
          activities: [
            "Morning adventure activity",
            "Lunch at local favorite",
            "Afternoon relaxation or shopping"
          ]
        },
        {
          day: 5,
          title: "Hidden Gems",
          activities: [
            "Visit off-the-beaten-path locations",
            "Authentic local experience",
            "Evening at popular local spot"
          ]
        }
      ]
    };
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw new Error('Failed to generate itinerary. Please try again.');
  }
}

/**
 * Format the prompt for an LLM
 */
export function formatTravelPrompt(preferences: any): string {
  const interests = preferences.interests?.join(', ') || 'general tourism';
  
  return `Create a personalized travel itinerary for a trip to ${preferences.destination || 'a popular destination'}.
Duration: ${preferences.dates || '7 days'}
Travelers: ${preferences.travelers || '2 adults'}
Travel Style: ${preferences.travelStyle || 'Adventure'}
Special Interests: ${interests}

Please include:
1. Day-by-day breakdown
2. Recommended activities considering the preferences
3. Tips for authentic local experiences
4. Mix of popular attractions and hidden gems`;
}
