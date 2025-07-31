'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HalolHero from './HalolHero';
import AppFeatures from './AppFeatures';
import AppInterface from './AppInterface';
import DownloadSection from './DownloadSection';
import UserTestimonials from './UserTestimonials';

export default function HalolPage() {
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