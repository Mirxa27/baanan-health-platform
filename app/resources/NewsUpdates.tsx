'use client';

export default function NewsUpdates() {
  const newsItems = [
    {
      title: 'Baanan Wins Healthcare Innovation Award 2024',
      summary: 'Recognized as the leading health-tech company in Saudi Arabia for revolutionary AI-powered diagnostic tools and comprehensive healthcare solutions.',
      date: 'December 18, 2024',
      category: 'Company News',
      type: 'Press Release',
      image: 'https://readdy.ai/api/search-image?query=healthcare%20innovation%20award%20ceremony%2C%20professional%20business%20award%20presentation%2C%20medical%20technology%20recognition%20event%2C%20corporate%20achievement%20celebration%2C%20clean%20professional%20setting&width=300&height=200&seq=news-award&orientation=landscape'
    },
    {
      title: 'Halol App Reaches 50,000 Active Users Milestone',
      summary: 'Our comprehensive healthcare platform continues to grow, now serving over 50,000 healthcare professionals and patients across Saudi Arabia.',
      date: 'December 12, 2024',
      category: 'Product Update',
      type: 'Milestone',
      image: 'https://readdy.ai/api/search-image?query=mobile%20app%20success%20celebration%2C%20healthcare%20technology%20milestone%2C%20digital%20health%20platform%20growth%2C%20professional%20technology%20achievement%2C%20modern%20office%20celebration&width=300&height=200&seq=news-milestone&orientation=landscape'
    },
    {
      title: 'Partnership with King Saud Medical Complex',
      summary: 'Baanan announces strategic partnership to implement comprehensive digital health transformation across one of the kingdom\'s largest medical facilities.',
      date: 'December 8, 2024',
      category: 'Partnership',
      type: 'Business News',
      image: 'https://readdy.ai/api/search-image?query=business%20partnership%20handshake%20in%20modern%20hospital%20setting%2C%20healthcare%20collaboration%20agreement%2C%20professional%20medical%20partnership%2C%20corporate%20healthcare%20meeting%2C%20clean%20hospital%20environment&width=300&height=200&seq=news-partnership&orientation=landscape'
    },
    {
      title: 'New AI Diagnostic Feature Launch',
      summary: 'Introducing advanced machine learning capabilities for early disease detection, improving diagnostic accuracy by 45% in clinical trials.',
      date: 'December 3, 2024',
      category: 'Product Update',
      type: 'Feature Release',
      image: 'https://readdy.ai/api/search-image?query=AI%20medical%20diagnostic%20interface%2C%20artificial%20intelligence%20healthcare%20technology%2C%20medical%20analysis%20software%2C%20advanced%20diagnostic%20tools%2C%20professional%20medical%20technology%20display&width=300&height=200&seq=news-ai-feature&orientation=landscape'
    },
    {
      title: 'Baanan Expands to Three New Cities',
      summary: 'Service expansion to Dammam, Mecca, and Medina, bringing advanced healthcare technology solutions to more regions across Saudi Arabia.',
      date: 'November 28, 2024',
      category: 'Company News',
      type: 'Expansion',
      image: 'https://readdy.ai/api/search-image?query=healthcare%20service%20expansion%2C%20medical%20facility%20network%20growth%2C%20regional%20healthcare%20development%2C%20professional%20healthcare%20infrastructure%2C%20modern%20medical%20facilities&width=300&height=200&seq=news-expansion&orientation=landscape'
    },
    {
      title: 'Industry Report: Digital Health Adoption in Saudi Arabia',
      summary: 'Baanan releases comprehensive report on digital health transformation trends, showing 65% increase in technology adoption across healthcare facilities.',
      date: 'November 22, 2024',
      category: 'Research',
      type: 'Industry Report',
      image: 'https://readdy.ai/api/search-image?query=healthcare%20industry%20research%20report%2C%20digital%20health%20statistics%20visualization%2C%20medical%20technology%20trends%20analysis%2C%20professional%20data%20presentation%2C%20clean%20business%20analytics%20display&width=300&height=200&seq=news-report&orientation=landscape'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Company News': 'bg-blue-100 text-blue-600',
      'Product Update': 'bg-purple-100 text-purple-600',
      'Partnership': 'bg-green-100 text-green-600',
      'Research': 'bg-orange-100 text-orange-600'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Latest
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> News</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest developments, partnerships, and innovations from Baanan and the healthcare technology industry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Featured News */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-white/50 mb-8">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium mb-4">
                Featured News
              </span>
              <img 
                src={newsItems[0].image}
                alt={newsItems[0].title}
                className="w-full h-64 object-cover object-top rounded-2xl mb-6"
              />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {newsItems[0].title}
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {newsItems[0].summary}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(newsItems[0].category)}`}>
                    {newsItems[0].category}
                  </span>
                  <span className="text-sm text-gray-500">{newsItems[0].date}</span>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
                  Read More
                </button>
              </div>
            </div>

            {/* Other News Items */}
            <div className="space-y-6">
              {newsItems.slice(1, 4).map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 object-cover object-top rounded-xl"
                    />
                    <div className="md:col-span-2">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-500">{item.type}</span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {item.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{item.date}</span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">
                          Read More →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Newsletter Signup */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-600 mb-4">
                Subscribe to our newsletter for the latest healthcare technology news and insights.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                />
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-all cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Recent News */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Recent Updates
              </h3>
              <div className="space-y-4">
                {newsItems.slice(4).map((item, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <h4 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-500">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-3">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <i className="ri-linkedin-line text-white"></i>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-blue-400 rounded-full cursor-pointer hover:bg-blue-500 transition-colors">
                  <i className="ri-twitter-line text-white"></i>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-purple-600 rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
                  <i className="ri-instagram-line text-white"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}