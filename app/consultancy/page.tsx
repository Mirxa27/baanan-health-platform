'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ConsultancyHero from './ConsultancyHero';
import Services from './Services';
import CaseStudies from './CaseStudies';
import ExpertTeam from './ExpertTeam';
import ConsultancyCTA from './ConsultancyCTA';

export default function ConsultancyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <ConsultancyHero />
        <Services />
        <CaseStudies />
        <ExpertTeam />
        <ConsultancyCTA />
      </main>
      <Footer />
    </>
  );
}