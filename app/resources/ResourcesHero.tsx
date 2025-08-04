'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation.simple';

export default function ResourcesHero() {
  const { t } = useTranslation('resources');
  const [searchTerm, setSearchTerm] = useState('');

  const resourceCategories = [
    {
      name: 'Blog Articles',
      description: 'Latest insights and trends',
      icon: 'ri-article-line',
      count: '150+',
      color: 'from-blue-500 to-cyan-500',
      href: '/resources/blog'
    },
    {
      name: 'Research Papers',
      description: 'Academic research and studies',
      icon: 'ri-file-text-line',
      count: '50+',
      color: 'from-purple-500 to-pink-500',
      href: '/resources/research-papers'
    },
    {
      name: 'News & Updates',
      description: 'Industry news and announcements',
      icon: 'ri-newspaper-line',
      count: '200+',
      color: 'from-green-500 to-teal-500',
      href: '/resources/news-updates'
    },
    {
      name: 'Case Studies',
      description: 'Real-world implementation stories',
      icon: 'ri-presentation-line',
      count: '30+',
      color: 'from-orange-500 to-red-500',
      href: '/resources/case-studies'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <i className="ri-book-open-line text-2xl text-blue-300"></i>
            <span className="text-blue-200 font-medium">Knowledge Hub</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Healthcare
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Resources
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Access comprehensive healthcare insights, research papers, industry analysis, 
            and expert knowledge to drive innovation in your medical practice.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles, research papers, news..."
                className="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <i className="ri-search-line absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-300 text-xl"></i>
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {['Medical Devices', 'Digital Health', 'AI & ML', 'Telemedicine', 'Healthcare Policy', 'Innovation'].map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resourceCategories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  <i className={`${category.icon} text-2xl text-white`}></i>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-slate-300 text-sm mb-4">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl font-bold text-blue-300">
                    {category.count}
                  </span>
                  <span className="text-slate-400 text-sm">
                    Resources
                  </span>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="ri-arrow-right-line text-blue-300 text-xl"></i>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Content Preview */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Content
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Discover our most popular and impactful healthcare resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                type: 'Article',
                title: 'The Future of AI in Medical Diagnostics',
                excerpt: 'Exploring how artificial intelligence is revolutionizing medical diagnosis and patient care.',
                readTime: '8 min read',
                image: '/resources/ai-diagnostics.jpg'
              },
              {
                type: 'Research',
                title: 'IoT Medical Devices: Security Challenges',
                excerpt: 'Comprehensive analysis of cybersecurity risks in connected medical devices.',
                readTime: '15 min read',
                image: '/resources/iot-security.jpg'
              },
              {
                type: 'News',
                title: 'GCC Healthcare Technology Market Trends 2024',
                excerpt: 'Latest market insights and growth projections for healthcare technology in the Gulf region.',
                readTime: '6 min read',
                image: '/resources/gcc-trends.jpg'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 transition-all transform hover:scale-105"
              >
                <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <i className="ri-file-text-line text-4xl text-white opacity-50"></i>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                      {item.type}
                    </span>
                    <span className="text-xs text-slate-400">
                      {item.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm line-clamp-3 mb-4">
                    {item.excerpt}
                  </p>
                  <button className="text-blue-300 hover:text-white text-sm font-medium transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 text-center">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Stay Informed</h3>
            <p className="text-slate-300 mb-6">
              Subscribe to our newsletter for the latest healthcare technology insights and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
