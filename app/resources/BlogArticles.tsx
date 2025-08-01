'use client';
import useTranslation from 'next-translate/useTranslation';

export default function BlogArticles() {
  const { t } = useTranslation('resources'); // Assuming 'resources' namespace for this component

  const articles = [
    {
      title: t('article_ai_title'),
      excerpt: t('article_ai_excerpt'),
      author: 'Dr. Sarah Al-Mansouri',
      date: 'December 15, 2024',
      readTime: '8 min read',
      category: t('category_ai_technology'),
      image: 'https://readdy.ai/api/search-image?query=artificial%20intelligence%20in%20healthcare%2C%20medical%20AI%20technology%2C%20healthcare%20automation%2C%20digital%20health%20transformation%2C%20futuristic%20medical%20technology%2C%20clean%20professional%20medical%20setting&width=400&height=300&seq=blog-ai&orientation=landscape',
      featured: true
    },
    {
      title: t('article_medical_devices_title'),
      excerpt: t('article_medical_devices_excerpt'),
      author: 'Eng. Mohammed Al-Rashid',
      date: 'December 10, 2024',
      readTime: '6 min read',
      category: t('category_medical_devices'),
      image: 'https://readdy.ai/api/search-image?query=smart%20medical%20monitoring%20devices%2C%20IoT%20healthcare%20technology%2C%20connected%20medical%20equipment%2C%20modern%20patient%20monitoring%2C%20healthcare%20technology%20innovation%2C%20professional%20medical%20environment&width=400&height=300&seq=blog-devices&orientation=landscape'
    },
    {
      title: t('article_telehealth_title'),
      excerpt: t('article_telehealth_excerpt'),
      author: 'Dr. Fatima Al-Zahra',
      date: 'December 5, 2024',
      readTime: '10 min read',
      category: t('category_telehealth'),
      image: 'https://readdy.ai/api/search-image?query=telehealth%20consultation%20technology%2C%20remote%20healthcare%20services%2C%20video%20medical%20consultation%2C%20digital%20health%20platform%2C%20modern%20telemedicine%20setup%2C%20professional%20healthcare%20technology&width=400&height=300&seq=blog-telehealth&orientation=landscape'
    },
    {
      title: t('article_data_security_title'),
      excerpt: t('article_data_security_excerpt'),
      author: 'Dr. Ahmad Al-Kindi',
      date: 'November 28, 2024',
      readTime: '7 min read',
      category: t('category_security_compliance'),
      image: 'https://readdy.ai/api/search-image?query=healthcare%20data%20security%2C%20medical%20information%20protection%2C%20HIPAA%20compliance%20technology%2C%20secure%20healthcare%20systems%2C%20cybersecurity%20in%20healthcare%2C%20professional%20IT%20security%20environment&width=400&height=300&seq=blog-security&orientation=landscape'
    },
    {
      title: t('article_robotic_surgery_title'),
      excerpt: t('article_robotic_surgery_excerpt'),
      author: 'Dr. Layla Al-Mahmoud',
      date: 'November 22, 2024',
      readTime: '9 min read',
      category: t('category_robotics'),
      image: 'https://readdy.ai/api/search-image?query=robotic%20surgical%20equipment%2C%20advanced%20medical%20robotics%2C%20precision%20surgery%20technology%2C%20modern%20operating%20room%20with%20robots%2C%20surgical%20innovation%2C%20professional%20medical%20robotics%20environment&width=400&height=300&seq=blog-robotics&orientation=landscape'
    },
    {
      title: t('article_digital_health_title'),
      excerpt: t('article_digital_health_excerpt'),
      author: 'Eng. Sultan Al Khamshi',
      date: 'November 15, 2024',
      readTime: '12 min read',
      category: t('category_digital_transformation'),
      image: 'https://readdy.ai/api/search-image?query=digital%20healthcare%20transformation%2C%20modern%20hospital%20technology%2C%20healthcare%20IT%20systems%2C%20digital%20health%20strategy%2C%20technology%20integration%20in%20healthcare%2C%20professional%20healthcare%20technology%20environment&width=400&height=300&seq=blog-transformation&orientation=landscape'
    }
  ];

  const categories = [
    t('category_all'),
    t('category_ai_technology'),
    t('category_medical_devices'),
    t('category_telehealth'),
    t('category_security_compliance'),
    t('category_robotics'),
    t('category_digital_transformation')
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('latest_articles_part1')}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> {t('latest_articles_part2')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('latest_articles_description')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                index === 0
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-blue-100 hover:text-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-white/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium mb-4">
                  {t('featured_article')}
                </span>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {articles[0].title}
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {articles[0].excerpt}
                </p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 font-medium">{articles[0].author}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{articles[0].date}</span>
                  </div>
                  <span className="text-sm text-blue-600">{articles[0].readTime}</span>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
                  {t('read_full_article')}
                </button>
              </div>
              <div>
                <img
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="w-full h-80 object-cover object-top rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover object-top"
              />
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium mb-3">
                  {article.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium text-gray-700">{article.author}</div>
                    <div className="text-gray-500">{article.date}</div>
                  </div>
                  <span className="text-blue-600">{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
            {t('load_more_articles')}
          </button>
        </div>
      </div>
    </section>
  );
}