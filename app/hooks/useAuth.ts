'use client';
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession } from 'next-auth/react';

// Custom signIn that ensures proper URL handling
export const signIn = async (provider: string, options?: any) => {
  try {
    // Ensure we're using the correct base URL for API calls
    const baseUrl = window.location.origin;
    
    // Override NextAuth's internal URL detection
    if (typeof window !== 'undefined') {
      // Temporarily set the origin to ensure correct API calls
      const originalFetch = window.fetch;
      window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
        if (typeof input === 'string' && input.startsWith('/api/auth/')) {
          input = `${baseUrl}${input}`;
        }
        return originalFetch.call(this, input, init);
      };
      
      const result = await nextAuthSignIn(provider, options);
      
      // Restore original fetch
      window.fetch = originalFetch;
      
      return result;
    }
    
    return await nextAuthSignIn(provider, options);
  } catch (error) {
    console.error('Auth error:', error);
    throw error;
  }
};

export const signOut = nextAuthSignOut;
export { useSession };
