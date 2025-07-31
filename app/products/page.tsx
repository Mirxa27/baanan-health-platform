'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductsHero from './ProductsHero';
import ProductCategories from './ProductCategories';
import ProductShowcase from './ProductShowcase';
import TechnicalSpecs from './TechnicalSpecs';
import ProductCTA from './ProductCTA';

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <ProductsHero />
        <ProductCategories />
        <ProductShowcase />
        <TechnicalSpecs />
        <ProductCTA />
      </main>
      <Footer />
    </>
  );
}