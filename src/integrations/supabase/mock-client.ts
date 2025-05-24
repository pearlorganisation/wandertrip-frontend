
// This is a mock Supabase client for demonstration purposes

export const createClient = () => {
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null }, error: null }),
      signUp: async () => ({ data: { user: null }, error: null }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          order: () => ({
            data: [],
            error: null
          }),
          data: [],
          error: null
        }),
        order: () => ({
          data: [],
          error: null
        }),
        data: [],
        error: null
      }),
      insert: () => ({
        select: () => ({
          data: [],
          error: null
        }),
        data: [],
        error: null
      }),
      update: () => ({
        eq: () => ({
          data: [],
          error: null
        }),
        data: [],
        error: null
      }),
      delete: () => ({
        eq: () => ({
          data: [],
          error: null
        }),
        data: [],
        error: null
      }),
    }),
    storage: {
      from: (bucket: string) => ({
        upload: async () => ({ data: { path: "mock-path" }, error: null }),
        getPublicUrl: (path: string) => ({ data: { publicUrl: path } }),
      }),
    },
  };
};

// Export a mock instance to use throughout the app
export const supabase = createClient();
