
// This is a dummy file to maintain imports but no longer connects to Supabase
// For demonstration purposes only

export const supabase = {
  // Mock methods to prevent errors if any code still tries to use supabase
  auth: {
    getSession: async () => ({ data: { session: null } }),
    signInWithPassword: async () => ({ error: null }),
    signUp: async () => ({ error: null }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: () => ({ 
      data: { 
        subscription: { 
          unsubscribe: () => {} 
        } 
      } 
    })
  },
  from: () => ({
    select: () => ({
      eq: async () => ({ data: [], error: null }),
      order: () => ({
        limit: async () => ({ data: [], error: null })
      })
    }),
    insert: () => ({
      select: async () => ({ data: [], error: null })
    }),
    delete: () => ({
      eq: async () => ({ error: null })
    }),
    update: () => ({
      eq: async () => ({ error: null })
    })
  })
};
