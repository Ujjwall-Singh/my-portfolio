import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillsRadarChartClient = ({ isDarkMode = false }) => {
  const [isChartReady, setIsChartReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Delay chart rendering to ensure proper initialization
    const timer = setTimeout(() => {
      try {
        setIsChartReady(true);
      } catch (error) {
        console.error('Chart initialization error:', error);
        setHasError(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const skillsData = {
    labels: [
      'React/Next.js',
      'JavaScript/TypeScript',
      'Node.js/Backend',
      'Database/MongoDB',
      'UI/UX Design',
      'Mobile Development',
      'DevOps/Cloud',
      'Data Structures & Algorithms'
    ],
    datasets: [
      {
        label: 'Current Skills',
        data: [90, 85, 80, 75, 70, 65, 60, 88], // Skill levels out of 100
        backgroundColor: isDarkMode 
          ? 'rgba(147, 197, 253, 0.2)' 
          : 'rgba(59, 130, 246, 0.2)',
        borderColor: isDarkMode 
          ? 'rgba(147, 197, 253, 1)' 
          : 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: isDarkMode 
          ? 'rgba(147, 197, 253, 1)' 
          : 'rgba(59, 130, 246, 1)',
        pointBorderColor: isDarkMode ? '#ffffff' : '#1f2937',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Target Skills',
        data: [95, 92, 90, 85, 80, 75, 75, 95], // Target skill levels
        backgroundColor: isDarkMode 
          ? 'rgba(34, 197, 94, 0.1)' 
          : 'rgba(34, 197, 94, 0.1)',
        borderColor: isDarkMode 
          ? 'rgba(34, 197, 94, 0.8)' 
          : 'rgba(34, 197, 94, 0.8)',
        borderWidth: 1,
        borderDash: [5, 5],
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        pointRadius: 0,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 20,
          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          font: {
            size: 12,
            family: 'Outfit'
          },
          backdropColor: 'transparent',
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        angleLines: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        },
        pointLabels: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
          font: {
            size: 11,
            family: 'Outfit',
            weight: '500'
          },
          padding: 20,
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
          font: {
            size: 12,
            family: 'Outfit'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDarkMode ? '#ffffff' : '#000000',
        bodyColor: isDarkMode ? '#ffffff' : '#000000',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.r}%`;
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'point'
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart'
    },
    elements: {
      line: {
        tension: 0.1
      }
    }
  };

  return (
    <div className="h-80 w-full">
      {hasError ? (
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <p className="text-gray-600 dark:text-gray-400">Chart failed to load</p>
          </div>
        </div>
      ) : isChartReady ? (
        <Radar 
          data={skillsData} 
          options={options}
          fallbackContent={
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">Chart not supported</p>
            </div>
          }
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading Chart...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsRadarChartClient;