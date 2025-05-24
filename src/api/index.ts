
// Export all services and the API client
export * from './client';
export * from './config';

// Services
export * from './services/itineraryService';
export * from './services/destinationService';
export * from './services/userService';
export * from './services/walletService';

// Example of usage:
/*
import { itineraryService, useApiClient } from '@/api';

const MyComponent = () => {
  const api = useApiClient(); // This will update auth token automatically
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const itineraries = await itineraryService.getItineraries();
        console.log(itineraries);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, []);
  
  return <div>...</div>;
};
*/
