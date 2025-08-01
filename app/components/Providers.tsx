'use client';
import NextAuthProvider from './NextAuthProvider';
import { I18nProvider } from './I18nProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <I18nProvider>
        {children}
      </I18nProvider>
    </NextAuthProvider>
  );
}
