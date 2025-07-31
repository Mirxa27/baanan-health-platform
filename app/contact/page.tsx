'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import LocationMap from './LocationMap';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <ContactHero />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <ContactForm />
          <ContactInfo />
        </div>
        <LocationMap />
      </main>
      <Footer />
    </>
  );
}