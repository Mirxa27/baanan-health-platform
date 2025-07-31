'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AboutHero from './AboutHero';
import VisionMission from './VisionMission';
import Leadership from './Leadership';
import Achievements from './Achievements';
import Values from './Values';

export default function AboutPage() {
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