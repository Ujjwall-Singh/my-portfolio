import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';

// Dynamically import Chart.js components to avoid SSR issues
const Chart = dynamic(() => import('./SkillsRadarChartClient'), {
  ssr: false,
  loading: () => (
    <div className="h-80 w-full flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading Skills Chart...</p>
      </div>
    </div>
  )
});

const SkillsRadarChart = ({ isDarkMode = false }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full max-w-lg mx-auto p-6"
    >
      <motion.h3 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-2xl font-Ovo text-center mb-6 text-gray-700 dark:text-white"
      >
        Skills Proficiency
      </motion.h3>
      
      {isClient ? (
        <Chart isDarkMode={isDarkMode} />
      ) : (
        <div className="h-80 w-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse w-64 h-64 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading Skills Chart...</p>
          </div>
        </div>
      )}

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-4 text-center"
      >
        <p className="text-sm text-gray-600 dark:text-white/80 font-Ovo">
          Interactive visualization of my technical expertise and growth targets
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SkillsRadarChart;