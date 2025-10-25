import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import Modal from 'react-modal';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow, okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Enhanced project data with more details
const enhancedWorkData = [
  {
    id: 1,
    title: 'E-Learning Platform',
    description: 'Modern Learning Management System',
    fullDescription: 'A comprehensive e-learning platform built with React and Node.js, featuring real-time video streaming, interactive assignments, and progress tracking.',
    bgImage: '/work-1.png',
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'AWS'],
    githubRepo: 'Ujjwall-Singh/e-learning-platform',
    liveDemo: 'https://elearning-demo.com',
    features: ['Video Streaming', 'Real-time Chat', 'Progress Tracking', 'Quiz System'],
    codeSnippet: `
// Real-time notification system
const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    socket.on('newNotification', (notification) => {
      setNotifications(prev => [...prev, notification]);
    });
  }, []);

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <NotificationCard key={notification.id} {...notification} />
      ))}
    </div>
  );
};`,
    performance: { lighthouse: 94, loadTime: '1.2s', users: '10K+' },
    challenges: 'Implementing real-time video streaming with low latency and handling concurrent users.'
  },
  {
    id: 2,
    title: 'Weather App',
    description: 'Smart Weather Forecast Mobile App',
    fullDescription: 'React Native weather application with AI-powered weather predictions, location-based services, and beautiful animations.',
    bgImage: '/work-2.png',
    techStack: ['React Native', 'TypeScript', 'Redux', 'OpenWeather API', 'Expo'],
    githubRepo: 'Ujjwall-Singh/weather-app',
    liveDemo: 'https://weather-app-demo.com',
    features: ['7-day Forecast', 'Weather Alerts', 'Offline Mode', 'Widget Support'],
    codeSnippet: `
// Weather data fetching with error handling
const useWeatherData = (location) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await weatherAPI.get(\`/weather?\${location}\`);
        setWeather(response.data);
      } catch (error) {
        console.error('Weather fetch failed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeather();
  }, [location]);
  
  return { weather, loading };
};`,
    performance: { lighthouse: 97, loadTime: '0.8s', users: '5K+' },
    challenges: 'Optimizing for different screen sizes and implementing accurate location services.'
  },
  {
    id: 3,
    title: 'Sahaayini',
    description: 'AI-Powered Help Desk System',
    fullDescription: 'Intelligent customer support platform using machine learning for automated ticket routing and smart responses.',
    bgImage: '/work-3.png',
    techStack: ['Next.js', 'Python', 'TensorFlow', 'PostgreSQL', 'Redis'],
    githubRepo: 'Ujjwall-Singh/sahaayini',
    liveDemo: 'https://sahaayini-demo.com',
    features: ['AI Chatbot', 'Smart Routing', 'Analytics Dashboard', 'Multi-language'],
    codeSnippet: `
// AI-powered ticket classification
import tensorflow as tf
from sklearn.preprocessing import LabelEncoder

class TicketClassifier:
    def __init__(self):
        self.model = tf.keras.models.load_model('ticket_model.h5')
        self.encoder = LabelEncoder()
    
    def classify_ticket(self, text):
        processed_text = self.preprocess(text)
        prediction = self.model.predict([processed_text])
        category = self.encoder.inverse_transform([prediction.argmax()])[0]
        confidence = float(prediction.max())
        
        return {
            'category': category,
            'confidence': confidence,
            'urgent': confidence > 0.85
        }`,
    performance: { lighthouse: 92, loadTime: '1.5s', users: '15K+' },
    challenges: 'Training the AI model with diverse ticket data and maintaining accuracy across languages.'
  },
  {
    id: 4,
    title: 'Portfolio Design System',
    description: 'Modern UI/UX Component Library',
    fullDescription: 'Comprehensive design system with reusable components, design tokens, and interactive documentation.',
    bgImage: '/work-4.png',
    techStack: ['React', 'TypeScript', 'Storybook', 'Sass', 'Figma'],
    githubRepo: 'Ujjwall-Singh/design-system',
    liveDemo: 'https://design-system-demo.com',
    features: ['Component Library', 'Design Tokens', 'Interactive Docs', 'Theme System'],
    codeSnippet: `
// Theme provider with CSS variables
const ThemeProvider = ({ theme, children }) => {
  useEffect(() => {
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(\`--\${key}\`, value);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <div className="theme-provider" data-theme={theme.name}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Usage
<ThemeProvider theme={darkTheme}>
  <App />
</ThemeProvider>`,
    performance: { lighthouse: 98, loadTime: '0.6s', users: '2K+' },
    challenges: 'Creating a scalable design token system and ensuring accessibility across all components.'
  }
];

const ProjectModal = ({ project, isOpen, onClose, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [githubStats, setGithubStats] = useState(null);

  useEffect(() => {
    if (isOpen && project) {
      // Simulate GitHub API call (replace with real API call)
      setTimeout(() => {
        setGithubStats({
          stars: 45,
          forks: 12,
          commits: 287,
          contributors: 3
        });
      }, 1000);
    }
  }, [isOpen, project]);

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'tech', label: 'Tech Stack', icon: '⚡' },
    { id: 'code', label: 'Code Preview', icon: '💻' },
    { id: 'stats', label: 'GitHub Stats', icon: '📊' },
    { id: 'recommendations', label: 'Similar Projects', icon: '🎯' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
      ariaHideApp={false}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}
      >
        {/* Header */}
        <div className="relative">
          <div
            className="h-48 bg-cover bg-center rounded-t-xl"
            style={{ backgroundImage: `url(${project.bgImage})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-t-xl flex items-end p-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                <p className="text-white/90">{project.description}</p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-3">Project Description</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Performance Metrics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-green-500">{project.performance.lighthouse}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Lighthouse Score</div>
                    </div>
                    <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-blue-500">{project.performance.loadTime}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Load Time</div>
                    </div>
                    <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-purple-500">{project.performance.users}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    View Live Demo
                  </a>
                  <a
                    href={`https://github.com/${project.githubRepo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    View on GitHub
                  </a>
                </div>
              </motion.div>
            )}

            {activeTab === 'tech' && (
              <motion.div
                key="tech"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Technical Challenges</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'code' && (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Code Preview</h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(project.codeSnippet);
                      // You could add a toast notification here
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
                  >
                    📋 Copy Code
                  </button>
                </div>
                <div className="rounded-lg overflow-hidden relative">
                  <SyntaxHighlighter
                    language="javascript"
                    style={isDarkMode ? okaidia : tomorrow}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.5rem',
                      fontSize: '14px',
                      padding: '1.5rem'
                    }}
                    showLineNumbers={true}
                  >
                    {project.codeSnippet}
                  </SyntaxHighlighter>
                </div>
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold">GitHub Statistics</h3>
                {githubStats ? (
                  <div className="space-y-6">
                    {/* Main Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg cursor-pointer"
                      >
                        <div className="text-3xl mb-2">⭐</div>
                        <div className="text-2xl font-bold">{githubStats.stars}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Stars</div>
                        <div className="text-xs text-green-500 mt-1">+12 this month</div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-4 bg-green-100 dark:bg-green-900/20 rounded-lg cursor-pointer"
                      >
                        <div className="text-3xl mb-2">🍴</div>
                        <div className="text-2xl font-bold">{githubStats.forks}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Forks</div>
                        <div className="text-xs text-blue-500 mt-1">+3 this week</div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg cursor-pointer"
                      >
                        <div className="text-3xl mb-2">📝</div>
                        <div className="text-2xl font-bold">{githubStats.commits}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Commits</div>
                        <div className="text-xs text-purple-500 mt-1">Last: 2 days ago</div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg cursor-pointer"
                      >
                        <div className="text-3xl mb-2">👥</div>
                        <div className="text-2xl font-bold">{githubStats.contributors}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Contributors</div>
                        <div className="text-xs text-orange-500 mt-1">Active team</div>
                      </motion.div>
                    </div>

                    {/* Additional GitHub Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Language Breakdown */}
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          🔤 Language Breakdown
                        </h4>
                        <div className="space-y-2">
                          {project.techStack.slice(0, 4).map((tech, index) => {
                            const percentages = [65, 25, 8, 2];
                            return (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-sm">{tech}</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentages[index]}%` }}
                                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                                      className={`h-full ${
                                        index === 0 ? 'bg-blue-500' :
                                        index === 1 ? 'bg-green-500' :
                                        index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
                                      }`}
                                    />
                                  </div>
                                  <span className="text-xs w-8 text-right">{percentages[index]}%</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Repository Health */}
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          💚 Repository Health
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Code Quality</span>
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                              Excellent
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Documentation</span>
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                              Complete
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Test Coverage</span>
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                              89%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Security</span>
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                              No Issues
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-3 justify-center">
                      <a
                        href={`https://github.com/${project.githubRepo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                      >
                        🐙 View Repository
                      </a>
                      <a
                        href={`https://github.com/${project.githubRepo}/issues`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                      >
                        🐛 Report Issue
                      </a>
                      <a
                        href={`https://github.com/${project.githubRepo}/fork`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                      >
                        🍴 Fork Project
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p>Loading GitHub statistics...</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'recommendations' && (
              <motion.div
                key="recommendations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold">Similar Projects You Might Like</h3>
                
                {getRecommendedProjects(project).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {getRecommendedProjects(project).map((recommendedProject, index) => (
                      <motion.div
                        key={recommendedProject.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border cursor-pointer hover:shadow-lg transition-all ${
                          isDarkMode ? 'border-gray-700 hover:border-blue-500' : 'border-gray-200 hover:border-blue-500'
                        }`}
                        onClick={() => {
                          // Close current modal and open the recommended project
                          setActiveTab('overview');
                          setTimeout(() => {
                            const projectToOpen = enhancedWorkData.find(p => p.id === recommendedProject.id);
                            if (projectToOpen && onClose) {
                              onClose();
                              setTimeout(() => {
                                // This would need to be passed from parent component
                                window.dispatchEvent(new CustomEvent('openProject', { detail: projectToOpen }));
                              }, 300);
                            }
                          }, 100);
                        }}
                      >
                        <div
                          className="w-full h-32 bg-cover bg-center rounded-lg mb-3"
                          style={{ backgroundImage: `url(${recommendedProject.bgImage})` }}
                        />
                        
                        <h4 className="font-semibold mb-2">{recommendedProject.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {recommendedProject.description}
                        </p>

                        {/* Similarity Indicator */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Similarity</span>
                            <span>{Math.round(recommendedProject.similarity * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${recommendedProject.similarity * 100}%` }}
                              transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                              className="bg-blue-500 h-2 rounded-full"
                            />
                          </div>
                        </div>

                        {/* Shared Technologies */}
                        <div className="mb-3">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Shared Technologies:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {recommendedProject.techStack
                              .filter(tech => project.techStack.includes(tech))
                              .map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Performance Comparison */}
                        <div className="flex justify-between items-center text-xs">
                          <span>Lighthouse: {recommendedProject.performance.lighthouse}%</span>
                          <span className={`px-2 py-1 rounded-full ${
                            recommendedProject.performance.lighthouse > project.performance.lighthouse
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : recommendedProject.performance.lighthouse === project.performance.lighthouse
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          }`}>
                            {recommendedProject.performance.lighthouse > project.performance.lighthouse ? '↗️ Better' :
                             recommendedProject.performance.lighthouse === project.performance.lighthouse ? '→ Similar' : '↘️ Different'}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🎯</div>
                    <p className="text-gray-500 dark:text-gray-400">
                      This project is unique! No similar projects found based on technology stack.
                    </p>
                  </div>
                )}

                {/* Recommendation Logic Explanation */}
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h4 className="text-sm font-semibold mb-2">🧠 How Recommendations Work</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Projects are recommended based on shared technologies, similar complexity, and performance metrics. 
                    The similarity score considers common tech stack elements and project characteristics.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Modal>
  );
};

const AdvancedWorkShowcase = ({ isDarkMode }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredProjects, setFilteredProjects] = useState(enhancedWorkData);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const searchRef = useRef(null);

  // Extract all unique technologies
  const allTechnologies = ['all', ...new Set(enhancedWorkData.flatMap(project => project.techStack))];

  // Filter and sort projects
  useEffect(() => {
    let filtered = enhancedWorkData.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTech = selectedTech === 'all' || project.techStack.includes(selectedTech);
      
      return matchesSearch && matchesTech;
    });

    // Sort projects
    if (sortBy === 'lighthouse') {
      filtered.sort((a, b) => b.performance.lighthouse - a.performance.lighthouse);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'recent') {
      filtered.sort((a, b) => b.id - a.id);
    }

    setFilteredProjects(filtered);
  }, [searchTerm, selectedTech, sortBy]);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleSearchFocus = () => {
    setIsFilterOpen(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTech('all');
    setSortBy('default');
    searchRef.current?.focus();
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    if (!compareMode) {
      setSelectedForComparison([]);
    }
  };

  const toggleProjectComparison = (project) => {
    if (selectedForComparison.includes(project.id)) {
      setSelectedForComparison(prev => prev.filter(id => id !== project.id));
    } else if (selectedForComparison.length < 3) {
      setSelectedForComparison(prev => [...prev, project.id]);
    }
  };

  const startComparison = () => {
    if (selectedForComparison.length >= 2) {
      setShowComparison(true);
    }
  };

  const getComparisonProjects = () => {
    return enhancedWorkData.filter(project => selectedForComparison.includes(project.id));
  };

  const getRecommendedProjects = (currentProject) => {
    if (!currentProject) return [];
    
    return enhancedWorkData
      .filter(project => project.id !== currentProject.id)
      .map(project => {
        // Calculate similarity score based on shared technologies
        const sharedTech = project.techStack.filter(tech => 
          currentProject.techStack.includes(tech)
        ).length;
        const totalTech = [...new Set([...project.techStack, ...currentProject.techStack])].length;
        const similarity = sharedTech / totalTech;
        
        return { ...project, similarity };
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id='work'
      className='w-full px-[12%] py-10 scroll-mt-20'
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className='text-center mb-2 text-lg font-Ovo'
      >
        My portfolio
      </motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className='text-center text-5xl font-Ovo'
      >
        Featured Projects
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className='text-center max-w-2xl mx-auto mt-5 mb-8 font-Ovo'
      >
        Explore my latest projects featuring cutting-edge technologies, detailed code previews, and real-world impact metrics.
      </motion.p>

      {/* Enhanced Project Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="max-w-6xl mx-auto mb-8"
      >
        {/* Search and Filter Bar */}
        <div className={`p-6 rounded-2xl border backdrop-blur-sm ${
          isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'
        } shadow-lg`}>
          
          {/* Search and View Toggle */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleSearchFocus}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-4">
              {/* Compare Mode Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleCompareMode}
                  className={`px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                    compareMode
                      ? 'bg-purple-500 text-white'
                      : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  ⚖️ Compare
                  {selectedForComparison.length > 0 && (
                    <span className="bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {selectedForComparison.length}
                    </span>
                  )}
                </button>
                
                {compareMode && selectedForComparison.length >= 2 && (
                  <button
                    onClick={startComparison}
                    className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                  >
                    Compare Selected
                  </button>
                )}
              </div>

              <span className="text-sm font-medium">View:</span>
              <div className={`flex rounded-lg p-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-md text-sm transition-all ${
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white'
                      : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ⊞ Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded-md text-sm transition-all ${
                    viewMode === 'list'
                      ? 'bg-blue-500 text-white'
                      : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ☰ List
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-4 items-center pt-4 border-t border-gray-200 dark:border-gray-600">
                  {/* Technology Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Tech:</span>
                    <select
                      value={selectedTech}
                      onChange={(e) => setSelectedTech(e.target.value)}
                      className={`px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      {allTechnologies.map(tech => (
                        <option key={tech} value={tech}>
                          {tech === 'all' ? 'All Technologies' : tech}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Options */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className={`px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="default">Default Order</option>
                      <option value="lighthouse">Performance ↓</option>
                      <option value="name">Name A-Z</option>
                      <option value="recent">Most Recent</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center gap-2"
                  >
                    🗑️ Clear
                  </button>

                  {/* Toggle Filters */}
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                      isDarkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    ▲ Hide Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show Filters Button */}
          {!isFilterOpen && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={() => setIsFilterOpen(true)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-2 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                ⚙️ Advanced Filters
              </button>
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">
              Showing {filteredProjects.length} of {enhancedWorkData.length} projects
              {searchTerm && ` for "${searchTerm}"`}
              {selectedTech !== 'all' && ` using ${selectedTech}`}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Projects Display */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className={`my-10 ${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-auto gap-6'
            : 'space-y-6'
        }`}
      >
        <AnimatePresence>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: viewMode === 'grid' ? 1.03 : 1.01, y: -5 }}
                className={`relative group cursor-pointer rounded-xl overflow-hidden shadow-lg ${
                  viewMode === 'list' 
                    ? 'flex flex-col md:flex-row bg-white dark:bg-gray-800' 
                    : ''
                }`}
                onClick={() => !compareMode && openProjectModal(project)}
              >
                {/* Comparison Checkbox */}
                {compareMode && (
                  <div className="absolute top-2 right-2 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleProjectComparison(project);
                      }}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedForComparison.includes(project.id)
                          ? 'bg-purple-500 border-purple-500 text-white'
                          : 'bg-white/80 border-gray-300 hover:border-purple-500'
                      }`}
                    >
                      {selectedForComparison.includes(project.id) && '✓'}
                    </button>
                  </div>
                )}

                {viewMode === 'grid' ? (
                  // Grid View (existing design)
                  <div
                    className='aspect-square bg-cover bg-center relative'
                    style={{ backgroundImage: `url(${project.bgImage})` }}
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Tech Stack Pills */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs bg-white/90 text-gray-800 rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full font-medium">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className='absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                      <h3 className='text-xl font-bold mb-2'>{project.title}</h3>
                      <p className='text-white/90 text-sm mb-4'>{project.description}</p>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
                          Live Demo
                        </button>
                      </div>

                      {/* Performance Badge */}
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {project.performance.lighthouse}% Lighthouse
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View (new design)
                  <>
                    <div 
                      className='w-full md:w-64 h-48 md:h-auto bg-cover bg-center'
                      style={{ backgroundImage: `url(${project.bgImage})` }}
                    >
                      <div className="h-full bg-black/20 p-4 flex items-end">
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          {project.performance.lighthouse}% Lighthouse
                        </div>
                      </div>
                    </div>
                    
                    <div className='flex-1 p-6'>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className='text-xl font-bold mb-2'>{project.title}</h3>
                          <p className='text-gray-600 dark:text-gray-400 mb-4'>{project.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <a 
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Live Demo
                          </a>
                          <a 
                            href={`https://github.com/${project.githubRepo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            GitHub
                          </a>
                        </div>
                      </div>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
                        {project.features.slice(0, 4).map((feature, fIndex) => (
                          <span key={fIndex} className="flex items-center gap-1">
                            ✓ {feature}
                            {fIndex < 3 && fIndex < project.features.length - 1 && <span className="mx-1">•</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))
          ) : (
            // No Results Found
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* View More Projects Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="text-center mt-12"
      >
        <a
          href="https://github.com/Ujjwall-Singh"
          target="_blank"
          rel="noopener noreferrer"
          className='inline-flex items-center gap-3 px-8 py-3 border-2 border-gray-700 dark:border-white rounded-full font-medium hover:bg-gray-700 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300'
        >
          View All Projects on GitHub
          <span className="text-xl">→</span>
        </a>
      </motion.div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
        isDarkMode={isDarkMode}
      />

      {/* Project Comparison Modal */}
      <Modal
        isOpen={showComparison}
        onRequestClose={() => setShowComparison(false)}
        className="fixed inset-0 flex items-center justify-center p-4 z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        ariaHideApp={false}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`max-w-7xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl ${
            isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
          }`}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Project Comparison</h2>
              <button
                onClick={() => setShowComparison(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
              >
                ×
              </button>
            </div>
          </div>

          {/* Comparison Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {getComparisonProjects().map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border rounded-xl p-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  {/* Project Header */}
                  <div className="text-center mb-6">
                    <div
                      className="w-full h-32 bg-cover bg-center rounded-lg mb-4"
                      style={{ backgroundImage: `url(${project.bgImage})` }}
                    />
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
                  </div>

                  {/* Metrics Comparison */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Lighthouse Score</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${project.performance.lighthouse}%` }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="h-full bg-green-500"
                          />
                        </div>
                        <span className="text-sm font-bold">{project.performance.lighthouse}%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Load Time</span>
                      <span className="text-sm font-bold text-blue-500">{project.performance.loadTime}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Users</span>
                      <span className="text-sm font-bold text-purple-500">{project.performance.users}</span>
                    </div>

                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium">Tech Stack</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.techStack.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-sm font-medium">Key Features</span>
                      <ul className="mt-2 space-y-1">
                        {project.features.slice(0, 4).map((feature, fIndex) => (
                          <li key={fIndex} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                            <span className="text-green-500">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm text-center"
                      >
                        Live Demo
                      </a>
                      <a
                        href={`https://github.com/${project.githubRepo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm text-center"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Comparison Summary */}
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <h4 className="text-lg font-semibold mb-4">📊 Comparison Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {Math.max(...getComparisonProjects().map(p => p.performance.lighthouse))}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Best Lighthouse Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {[...new Set(getComparisonProjects().flatMap(p => p.techStack))].length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Unique Technologies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">
                    {getComparisonProjects().reduce((sum, p) => sum + p.features.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Features</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Modal>
    </motion.div>
  );
};

export default AdvancedWorkShowcase;