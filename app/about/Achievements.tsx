
'use client';

export default function Achievements() {
  const achievements = [
    {
      year: '2024',
      title: 'Healthcare Innovation Award',
      description: 'Recognized as the leading health-tech company in Saudi Arabia for revolutionary AI-powered diagnostic tools.',
      icon: 'ri-award-line',
      color: 'gold'
    },
    {
      year: '2023',
      title: 'Market Leadership',
      description: 'Achieved 40% market share in smart medical devices across the Kingdom of Saudi Arabia.',
      icon: 'ri-trophy-line',
      color: 'blue'
    },
    {
      year: '2023',
      title: 'Halol App Launch',
      description: 'Successfully launched the comprehensive healthcare platform serving 50,000+ active users.',
      icon: 'ri-smartphone-line',
      color: 'purple'
    },
    {
      year: '2022',
      title: 'Partnership Excellence',
      description: 'Established partnerships with 150+ healthcare facilities nationwide.',
      icon: 'ri-handshake-line',
      color: 'green'
    },
    {
      year: '2022',
      title: 'Technology Pioneer',
      description: 'First to introduce robotic physiotherapy systems in the Middle East healthcare market.',
      icon: 'ri-robot-line',
      color: 'orange'
    },
    {
      year: '2021',
      title: 'Baanan Foundation',
      description: 'Company founded with a vision to transform healthcare through innovative technology solutions.',
      icon: 'ri-building-line',
      color: 'teal'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      gold: 'bg-yellow-100 text-yellow-600',
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      teal: 'bg-teal-100 text-teal-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Our
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Achievements</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Milestones that mark our journey in revolutionizing healthcare technology and establishing market leadership in Saudi Arabia.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
          
          <div className="space-y-8 sm:space-y-12">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'} mb-6 lg:mb-0`}>
                  <div className={`bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 text-center lg:${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium mb-4`}>
                      {achievement.year}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{achievement.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{achievement.description}</p>
                  </div>
                </div>
                
                <div className="relative z-10 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-white rounded-full shadow-lg border-4 border-gray-100 mb-6 lg:mb-0">
                  <div className={`w-8 sm:w-12 h-8 sm:h-12 flex items-center justify-center rounded-full ${getColorClasses(achievement.color)}`}>
                    <i className={`${achievement.icon} text-lg sm:text-xl`}></i>
                  </div>
                </div>
                
                <div className="w-full lg:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center shadow-lg border border-gray-100">
            <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4 sm:mb-6">
              <i className="ri-user-heart-line text-lg sm:text-2xl text-blue-600"></i>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">50,000+</div>
            <div className="text-sm sm:text-base text-gray-700 font-medium mb-1 sm:mb-2">Active Users</div>
            <div className="text-xs sm:text-sm text-gray-500">Across our platforms</div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center shadow-lg border border-gray-100">
            <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-4 sm:mb-6">
              <i className="ri-hospital-line text-lg sm:text-2xl text-purple-600"></i>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">150+</div>
            <div className="text-sm sm:text-base text-gray-700 font-medium mb-1 sm:mb-2">Healthcare Partners</div>
            <div className="text-xs sm:text-sm text-gray-500">Nationwide network</div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center shadow-lg border border-gray-100">
            <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4 sm:mb-6">
              <i className="ri-award-line text-lg sm:text-2xl text-green-600"></i>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">98%</div>
            <div className="text-sm sm:text-base text-gray-700 font-medium mb-1 sm:mb-2">Satisfaction Rate</div>
            <div className="text-xs sm:text-sm text-gray-500">Customer feedback</div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center shadow-lg border border-gray-100">
            <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-orange-100 rounded-full mx-auto mb-4 sm:mb-6">
              <i className="ri-global-line text-lg sm:text-2xl text-orange-600"></i>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">40%</div>
            <div className="text-sm sm:text-base text-gray-700 font-medium mb-1 sm:mb-2">Market Share</div>
            <div className="text-xs sm:text-sm text-gray-500">In smart medical devices</div>
          </div>
        </div>
      </div>
    </section>
  );
}
