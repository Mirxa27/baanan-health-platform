'use client';
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession } from 'next-auth/react';

// Re-export NextAuth functions directly since environment is properly configured
export const signIn = nextAuthSignIn;
export const signOut = nextAuthSignOut;
export { useSession };
