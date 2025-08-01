'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AboutHero from './AboutHero';
import VisionMission from './VisionMission';
import Leadership from './Leadership';
import Achievements from './Achievements';
import Values from './Values';
import { useTranslation } from '../../hooks/useTranslation';

export default function AboutPage() {
  const { t } = useTranslation('about'); // Assuming 'about' namespace for the about page

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <AboutHero />
        <VisionMission />
        <Leadership />
        <Achievements />
        <Values />
      </main>
      <Footer />
    </>
  );
}
