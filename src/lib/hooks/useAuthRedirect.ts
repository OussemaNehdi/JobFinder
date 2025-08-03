'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Custom hook to handle authentication-related redirects
 * Ensures authenticated state is synchronized between client and server
 */
export function useAuthRedirect(requiredAuth: boolean = true) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect while loading to prevent flash
    if (status === 'loading') return;

    // If authentication is required but user is not authenticated
    if (requiredAuth && !session) {
      router.push(`/login?callbackUrl=${pathname}`);
    }

    // If authentication is not required but user is authenticated (useful for login pages)
    if (!requiredAuth && session) {
      router.push('/');
    }
  }, [session, status, requiredAuth, router, pathname]);

  return { session, status };
}
