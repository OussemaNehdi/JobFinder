'use client';

import { SessionProvider } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Add a client-side check to ensure hydration completes
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Enhanced configuration for more reliable session management
  return (
    <SessionProvider 
      refetchInterval={5 * 60} 
      refetchOnWindowFocus={true}
      refetchWhenOffline={false}
    >
      {mounted ? children : null}
    </SessionProvider>
  );
}
