'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ResourcesHero from './ResourcesHero';
import BlogArticles from './BlogArticles';
import ResearchPapers from './ResearchPapers';
import NewsUpdates from './NewsUpdates';
import ResourcesCTA from './ResourcesCTA';

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <ResourcesHero />
        <BlogArticles />
        <ResearchPapers />
        <NewsUpdates />
        <ResourcesCTA />
      </main>
      <Footer />
    </>
  );
}