'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HalolHero from './HalolHero';
import AppFeatures from './AppFeatures';
import AppInterface from './AppInterface';
import DownloadSection from './DownloadSection';
import UserTestimonials from './UserTestimonials';
import useTranslation from 'next-translate/useTranslation';

export default function HalolPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useTranslation('halol'); // Assuming 'halol' namespace for this page

  useEffect(() => {
    if (status === 'loading') return;
    if (session) {
      router.push('/halol/dashboard');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (session) {
    return null; // Will redirect to dashboard
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <HalolHero />
        <AppFeatures />
        <AppInterface />
        <UserTestimonials />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}