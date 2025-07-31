'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HalolSection from './components/HalolSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <FeaturesSection />
        <HalolSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}