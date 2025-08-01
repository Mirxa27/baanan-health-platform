'use client';
import { useEffect } from 'react';

export default function AuthUrlFix() {
  useEffect(() => {
    // Fix NextAuth URL configuration on the client side
    if (typeof window !== 'undefined') {
      // Override NextAuth's internal configuration
      const baseUrl = window.location.origin;
      
      // Store the original fetch function
      const originalFetch = window.fetch;
      
      // Override fetch to rewrite NextAuth API URLs
      window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
        if (typeof input === 'string') {
          // Rewrite relative NextAuth API URLs to use current origin
          if (input.startsWith('/api/auth/')) {
            input = `${baseUrl}${input}`;
          }
          // Handle full URLs that might be pointing to localhost
          else if (input.includes('/api/auth/') && (input.includes('localhost') || input.includes('127.0.0.1'))) {
            const path = input.substring(input.indexOf('/api/auth/'));
            input = `${baseUrl}${path}`;
          }
        }
        
        return originalFetch.call(this, input, init);
      };

      // Clean up on unmount
      return () => {
        window.fetch = originalFetch;
      };
    }
  }, []);

  return null; // This component doesn't render anything
}
