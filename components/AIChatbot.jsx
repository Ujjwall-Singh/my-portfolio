import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const AIChatbot = ({ isDarkMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true);
    setMessages([
      {
        id: 1,
        text: "Hi! 👋 I'm Ujjwal's AI assistant. I can help you learn more about his skills, projects, and experience. What would you like to know?",
        isBot: true,
        timestamp: new Date()
      }
    ]);
  }, []);

  // Pre-defined responses (simulating AI)
  const aiResponses = {
    skills: "Ujjwal specializes in Full Stack Development with expertise in React, Next.js, Node.js, MongoDB, and mobile app development. He's also proficient in Java, C++, and Data Structures & Algorithms. His skills include UI/UX design, DevOps, and modern web technologies.",
    
    projects: "Ujjwal has worked on several impressive projects:\n\n🎓 E-Learning Platform - A comprehensive LMS with video streaming and real-time features\n☀️ Weather App - Smart forecast mobile app with AI predictions\n🤖 Sahaayini - AI-powered help desk system with machine learning\n🎨 Design System - Modern component library with design tokens\n\nEach project showcases different aspects of his full-stack capabilities!",
    
    experience: "Ujjwal is an Associate Software Developer with strong experience in:\n\n• Full Stack Web Development\n• Mobile App Development \n• UI/UX Design\n• Database Management\n• Cloud Technologies\n• Algorithm Design\n\nHe's built 5+ major projects and is pursuing B.Tech in Computer Science.",
    
    education: "Ujjwal is currently pursuing B.Tech in Computer Science. His academic background combined with hands-on project experience gives him a strong foundation in both theoretical concepts and practical implementation.",
    
    contact: "You can reach Ujjwal through:\n\n📧 Email: ujjwalkumar434345@gmail.com\n💼 LinkedIn: linkedin.com/in/ujjwal-kumar-11b439259\n🐙 GitHub: github.com/Ujjwall-Singh\n\nFeel free to download his resume or use the contact form below!",
    
    technologies: "Ujjwal works with cutting-edge technologies:\n\n🚀 Frontend: React, Next.js, TypeScript, Tailwind CSS\n⚡ Backend: Node.js, Express, Python, MongoDB\n📱 Mobile: React Native, Expo\n🎨 Design: Figma, Adobe Creative Suite\n☁️ Cloud: AWS, Firebase, Vercel\n🛠️ Tools: Git, VS Code, Docker",
    
    default: "That's an interesting question! I can help you learn about Ujjwal's:\n\n• 💻 Technical skills and expertise\n• 🚀 Projects and achievements\n• 🎓 Education and experience\n• 📧 Contact information\n• 🛠️ Technologies he works with\n\nWhat specific aspect would you like to explore?"
  };

  const quickActions = [
    { text: "Tell me about his skills", key: "skills", icon: "💻" },
    { text: "Show me his projects", key: "projects", icon: "🚀" },
    { text: "How to contact him?", key: "contact", icon: "📧" },
    { text: "What technologies does he use?", key: "technologies", icon: "🛠️" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('skill') || message.includes('technical') || message.includes('programming')) {
      return aiResponses.skills;
    } else if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
      return aiResponses.projects;
    } else if (message.includes('experience') || message.includes('background') || message.includes('developer')) {
      return aiResponses.experience;
    } else if (message.includes('education') || message.includes('study') || message.includes('degree')) {
      return aiResponses.education;
    } else if (message.includes('contact') || message.includes('reach') || message.includes('email') || message.includes('linkedin')) {
      return aiResponses.contact;
    } else if (message.includes('technology') || message.includes('tech') || message.includes('stack') || message.includes('tools')) {
      return aiResponses.technologies;
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! 👋 Great to meet you! I'm here to help you learn everything about Ujjwal Kumar. Whether you're interested in his technical skills, impressive projects, or how to get in touch, I've got you covered. What would you like to know first?";
    } else if (message.includes('thanks') || message.includes('thank you')) {
      return "You're very welcome! 😊 I'm glad I could help you learn more about Ujjwal. Feel free to ask me anything else about his work, skills, or projects. Is there anything specific you'd like to explore further?";
    }
    
    return aiResponses.default;
  };

  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getAIResponse(messageText),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // 1-3 seconds delay
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action.text);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white text-2xl ${
          isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isOpen ? '✕' : '🤖'}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed bottom-24 right-6 w-96 h-[500px] rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden ${
              isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}
          >
            {/* Header */}
            <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-blue-500'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  AI
                </div>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-white'}`}>
                    Ujjwal's AI Assistant
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-blue-100'}`}>
                      Online & Ready to Help
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? isDarkMode 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-100 text-gray-800'
                      : 'bg-blue-500 text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <span className={`text-xs mt-1 block ${
                      message.isBot 
                        ? isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        : 'text-blue-100'
                    }`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className={`p-3 rounded-2xl ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="space-y-1">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action)}
                      className={`w-full text-left p-2 rounded-lg text-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      <span>{action.icon}</span>
                      {action.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about Ujjwal..."
                  className={`flex-1 p-2 rounded-lg text-sm border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-sm">Send</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;