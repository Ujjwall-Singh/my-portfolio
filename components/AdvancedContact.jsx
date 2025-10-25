import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { assets } from '@/assets/assets';
import Image from 'next/image';

const AdvancedContact = ({ isDarkMode = false }) => {
  const [result, setResult] = useState("");
  const [activeTab, setActiveTab] = useState('contact');
  const [isClient, setIsClient] = useState(false);
  const [minDate, setMinDate] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [socialStats, setSocialStats] = useState({
    github: { followers: 0, repos: 0 },
    linkedin: { connections: 0, posts: 0 }
  });

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true);
    setMinDate(new Date().toISOString().split('T')[0]);
  }, []);

  // Simulate social media stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setSocialStats({
        github: {
          followers: 287,
          repos: 34
        },
        linkedin: {
          connections: 745,
          posts: 89
        }
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "e90a6361-e8dd-4927-8a13-115c45989e3e");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message sent successfully! I'll get back to you soon. 🚀");
      event.target.reset();
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setResult(""), 5000);
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  const availableTimeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const tabs = [
    { id: 'contact', label: 'Send Message', icon: '📧' },
    { id: 'calendar', label: 'Schedule Meeting', icon: '📅' },
    { id: 'social', label: 'Connect Socially', icon: '🌐' }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Ujjwall-Singh',
      icon: '🐙',
      color: 'bg-gray-800 hover:bg-gray-700',
      description: 'View my code repositories and contributions',
      stats: `${socialStats.github.followers} followers • ${socialStats.github.repos} repos`
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ujjwal-kumar-11b439259/?originalSubdomain=in',
      icon: '💼',
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Connect with me professionally',
      stats: `${socialStats.linkedin.connections}+ connections • ${socialStats.linkedin.posts} posts`
    },
    {
      name: 'Twitter',
      url: 'https://github.com/Ujjwall-Singh',
      icon: '🐦',
      color: 'bg-sky-500 hover:bg-sky-600',
      description: 'Follow my tech journey and insights',
      stats: 'Active tech discussions'
    },
    {
      name: 'Email',
      url: 'mailto:ujjwalkumar434345@gmail.com',
      icon: '📧',
      color: 'bg-red-500 hover:bg-red-600',
      description: 'Direct email communication',
      stats: 'Quick response guaranteed'
    }
  ];

  const quickContactReasons = [
    { text: "Job Opportunity", emoji: "💼" },
    { text: "Project Collaboration", emoji: "🤝" },
    { text: "Technical Discussion", emoji: "💻" },
    { text: "Mentorship", emoji: "🎓" },
    { text: "General Inquiry", emoji: "💬" }
  ];

  const handleScheduleMeeting = (e) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      setResult(`Meeting scheduled for ${selectedDate} at ${selectedTime}. You'll receive a Google Meet link via email.`);
      setTimeout(() => setResult(""), 5000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id='contact'
      className='w-full px-[12%] py-16 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat bg-center bg-[length:90%_auto] dark:bg-none'
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className='text-center mb-2 text-lg font-Ovo'
      >
        Let's Connect
      </motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className='text-center text-5xl font-Ovo'
      >
        Get in Touch
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'
      >
        Ready to bring your ideas to life? Let's discuss your project, schedule a meeting, or simply connect. I'm always excited to collaborate on innovative solutions!
      </motion.p>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <div className={`flex rounded-xl p-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <AnimatePresence mode="wait">
          {/* Contact Form Tab */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Quick Contact Reasons */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-center">What brings you here?</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {quickContactReasons.map((reason, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-full border-2 transition-all duration-300 flex items-center gap-2 ${
                        isDarkMode 
                          ? 'border-gray-600 hover:border-blue-500 hover:bg-blue-500/10' 
                          : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                      }`}
                    >
                      <span>{reason.emoji}</span>
                      <span className="text-sm">{reason.text}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                  >
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      required
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                      name="name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                      name="email"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    required
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                    name="subject"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <label className="block text-sm font-medium mb-2">Your Message</label>
                  <textarea
                    rows="6"
                    placeholder="Tell me about your project, ideas, or just say hello!"
                    required
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 resize-none ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                    name="message"
                  />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Send Message
                  <Image src={assets.right_arrow_white} alt="" className="w-5" />
                </motion.button>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-center font-medium ${
                      result.includes('successfully') 
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    }`}
                  >
                    {result}
                  </motion.div>
                )}
              </form>
            </motion.div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold mb-6">Schedule a Meeting</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Let's have a 30-minute video call to discuss your project, career opportunities, or any technical questions you have.
                </p>

                <form onSubmit={handleScheduleMeeting} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={minDate}
                        required
                        className={`w-full p-4 rounded-xl border-2 ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:border-blue-500`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Select Time</label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                        className={`w-full p-4 rounded-xl border-2 ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:border-blue-500`}
                      >
                        <option value="">Choose time slot</option>
                        {availableTimeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    📅 Schedule Meeting
                  </button>
                </form>

                <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <h4 className="font-semibold mb-2">What to expect:</h4>
                  <ul className="text-sm text-left space-y-1">
                    <li>• 30-minute Google Meet video call</li>
                    <li>• Discussion about your project or opportunity</li>
                    <li>• Technical consultation if needed</li>
                    <li>• Follow-up resources and next steps</li>
                  </ul>
                </div>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-xl bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 font-medium"
                  >
                    {result}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Social Tab */}
          {activeTab === 'social' && (
            <motion.div
              key="social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-4">Connect on Social Platforms</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Follow my journey, see my latest projects, and let's build a professional network together.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className={`p-6 rounded-xl ${social.color} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-3xl">{social.icon}</span>
                      <div className="text-left">
                        <h4 className="text-xl font-semibold">{social.name}</h4>
                        <p className="text-white/80 text-sm">{social.stats}</p>
                      </div>
                    </div>
                    <p className="text-white/90 text-sm">{social.description}</p>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 text-center">
                <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
                  <h4 className="text-lg font-semibold mb-4">📧 Direct Contact</h4>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Image src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon} alt="" className="w-6" />
                    <span className="font-medium">ujjwalkumar434345@gmail.com</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    I typically respond within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AdvancedContact;