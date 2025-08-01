'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface NextAuthProviderProps {
  children: ReactNode;
}

export default function NextAuthProvider({ children }: NextAuthProviderProps) {
  // Ensure NextAuth uses the correct base URL in client-side requests
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://28c2165d32924a4d8a1994857b7d22f9-4d76a73f8eb54783b9701cbd3.fly.dev';

  return (
    <SessionProvider
      baseUrl={baseUrl}
      refetchInterval={5 * 60} // 5 minutes
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
}
