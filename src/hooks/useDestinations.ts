
import { useCallback, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { destinationService, Destination } from '@/api';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export function useDestinations() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  // Query for fetching destinations
  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      try {
        return await destinationService.getDestinations();
      } catch (err: any) {
        setError("Could not load destinations");
        console.error('Error fetching destinations:', err);
        return [];
      }
    }
  });

  // Mutation for toggling save destination
  const { mutate: toggleSaveDestination } = useMutation({
    mutationFn: async (destinationId: string) => {
      return await destinationService.toggleSaveDestination(destinationId);
    },
    onMutate: async (destinationId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['destinations'] });

      // Snapshot the previous value
      const previousDestinations = queryClient.getQueryData<Destination[]>(['destinations']);

      // Optimistically update to the new value
      if (previousDestinations) {
        queryClient.setQueryData<Destination[]>(['destinations'], old => {
          return old?.map(d => d.id === destinationId ? { ...d, saved: !d.saved } : d) ?? [];
        });
      }

      return { previousDestinations };
    },
    onError: (error, destinationId, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousDestinations) {
        queryClient.setQueryData<Destination[]>(['destinations'], context.previousDestinations);
      }

      toast.error("Failed to update favorites", {
        description: "Please try again later",
        position: "bottom-right",
      });
    },
    onSuccess: (updatedDestination) => {
      const isSaved = updatedDestination.saved;
      
      toast(
        isSaved 
          ? `${updatedDestination.name} added to favorites` 
          : `${updatedDestination.name} removed from favorites`,
        {
          description: isSaved 
            ? "View all favorites in your profile" 
            : "You can add it back anytime",
          position: "bottom-right",
        }
      );
    },
    onSettled: () => {
      // Always refetch after error or success for fresh data
      queryClient.invalidateQueries({ queryKey: ['destinations'] });
    },
  });

  // Handle the toggle save destination action
  const handleToggleSaveDestination = useCallback((destinationId: string) => {
    if (!user) {
      toast("Please log in to save destinations");
      return;
    }

    toggleSaveDestination(destinationId);
  }, [user, toggleSaveDestination]);

  // Refresh destinations
  const refreshDestinations = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['destinations'] });
  }, [queryClient]);

  return { 
    destinations, 
    isLoading, 
    error, 
    toggleSaveDestination: handleToggleSaveDestination,
    refreshDestinations
  };
}
