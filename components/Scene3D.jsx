import { useState, useEffect } from 'react';

const Scene3D = ({ isDarkMode = false }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      {/* Animated Background Gradient */}
      <div 
        className={`absolute inset-0 opacity-30 transition-all duration-1000 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20' 
            : 'bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-pink-100/30'
        }`}
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 15s ease infinite'
        }}
      />
      
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-10 ${
              isDarkMode ? 'bg-white' : 'bg-gray-600'
            }`}
            style={{
              width: `${50 + i * 30}px`,
              height: `${50 + i * 30}px`,
              left: `${10 + i * 15}%`,
              top: `${10 + i * 10}%`,
              animation: `float-${i % 3} ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(30px) rotate(-180deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-15px, -25px) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Scene3D;