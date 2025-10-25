import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const AnalyticsDashboard = ({ isDarkMode = false }) => {
  const [analytics, setAnalytics] = useState({
    totalVisitors: 0,
    todayVisitors: 0,
    pageViews: 0,
    avgTimeOnSite: '0s',
    topCountries: [],
    deviceTypes: { desktop: 0, mobile: 0, tablet: 0 },
    realTimeUsers: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate real-time analytics data
    const updateAnalytics = () => {
      const now = new Date();
      const timeOnSite = 185; // Fixed value to prevent hydration mismatch
      
      setAnalytics({
        totalVisitors: 8500,
        todayVisitors: 287,
        pageViews: 18400,
        avgTimeOnSite: `${Math.floor(timeOnSite / 60)}m ${timeOnSite % 60}s`,
        topCountries: [
          { name: 'India', count: 850, flag: '🇮🇳' },
          { name: 'USA', count: 630, flag: '🇺🇸' },
          { name: 'Canada', count: 450, flag: '🇨🇦' },
          { name: 'UK', count: 380, flag: '🇬🇧' },
          { name: 'Germany', count: 320, flag: '🇩🇪' }
        ],
        deviceTypes: {
          desktop: 65,
          mobile: 28,
          tablet: 7
        },
        realTimeUsers: 23
      });
    };

    updateAnalytics();
    const interval = setInterval(updateAnalytics, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Track user's own visit
  useEffect(() => {
    // Simulate tracking current user
    const startTime = Date.now();
    
    const trackVisit = () => {
      const timeSpent = Date.now() - startTime;
      const minutes = Math.floor(timeSpent / 60000);
      const seconds = Math.floor((timeSpent % 60000) / 1000);
      
      // This would typically send data to analytics service
      console.log(`Time on site: ${minutes}m ${seconds}s`);
    };

    const interval = setInterval(trackVisit, 10000); // Track every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, icon, trend = null, color = "blue" }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-xl border ${
        isDarkMode 
          ? 'bg-gray-800/50 border-gray-700 backdrop-blur-sm' 
          : 'bg-white/80 border-gray-200 backdrop-blur-sm'
      } shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-500/10`}>
          <span className="text-2xl">{icon}</span>
        </div>
        {trend && (
          <div className={`text-sm font-medium ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className={`text-3xl font-bold mb-1 ${color === 'blue' ? 'text-blue-500' : color === 'green' ? 'text-green-500' : color === 'purple' ? 'text-purple-500' : 'text-orange-500'}`}>
        {value}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
    </motion.div>
  );

  const LiveIndicator = () => (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      <span className="text-sm font-medium">Live</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full px-[12%] py-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-4xl font-Ovo">Portfolio Analytics</h2>
            <LiveIndicator />
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real-time insights into portfolio performance and visitor engagement
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Visitors"
            value={analytics.totalVisitors.toLocaleString()}
            icon="👥"
            trend={12}
            color="blue"
          />
          <StatCard
            title="Today's Visitors"
            value={analytics.todayVisitors.toLocaleString()}
            icon="📈"
            trend={8}
            color="green"
          />
          <StatCard
            title="Page Views"
            value={analytics.pageViews.toLocaleString()}
            icon="👁️"
            trend={15}
            color="purple"
          />
          <StatCard
            title="Avg. Time on Site"
            value={analytics.avgTimeOnSite}
            icon="⏱️"
            trend={6}
            color="orange"
          />
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Countries */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className={`p-6 rounded-xl border ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700 backdrop-blur-sm' 
                : 'bg-white/80 border-gray-200 backdrop-blur-sm'
            } shadow-lg`}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span>🌍</span>
              Top Countries
            </h3>
            <div className="space-y-4">
              {analytics.topCountries.map((country, index) => (
                <div key={country.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <span className="font-medium">{country.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-24 h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} relative overflow-hidden`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(country.count / analytics.topCountries[0].count) * 100}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{country.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Device Types */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className={`p-6 rounded-xl border ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700 backdrop-blur-sm' 
                : 'bg-white/80 border-gray-200 backdrop-blur-sm'
            } shadow-lg`}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span>📱</span>
              Device Breakdown
            </h3>
            <div className="space-y-6">
              {Object.entries(analytics.deviceTypes).map(([device, percentage], index) => (
                <div key={device} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize flex items-center gap-2">
                      {device === 'desktop' && '🖥️'}
                      {device === 'mobile' && '📱'}
                      {device === 'tablet' && '📃'}
                      {device}
                    </span>
                    <span className="text-2xl font-bold">{percentage}%</span>
                  </div>
                  <div className={`w-full h-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} relative overflow-hidden`}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      transition={{ delay: 0.7 + index * 0.2, duration: 1 }}
                      className={`h-full rounded-full ${
                        device === 'desktop' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                        device === 'mobile' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                        'bg-gradient-to-r from-purple-500 to-purple-600'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Real-time Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`p-6 rounded-xl border ${
            isDarkMode 
              ? 'bg-gray-800/50 border-gray-700 backdrop-blur-sm' 
              : 'bg-white/80 border-gray-200 backdrop-blur-sm'
          } shadow-lg text-center`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="text-2xl font-semibold">Real-time Active Users</h3>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
            className="text-6xl font-bold text-green-500 mb-2"
          >
            {analytics.realTimeUsers}
          </motion.div>
          <p className="text-gray-600 dark:text-gray-400">
            Users currently viewing this portfolio
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnalyticsDashboard;