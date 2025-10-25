import React, { useEffect, useRef, useState } from 'react';

const CursorTrail = ({ isDarkMode = false }) => {
  const canvasRef = useRef(null);
  const trailRef = useRef([]);
  const animationRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const ctx = canvas.getContext('2d');
    let trail = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Trail point class
    class TrailPoint {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 1.0;
        this.decay = 0.02;
        this.size = Math.random() * 8 + 4;
      }

      update() {
        this.life -= this.decay;
      }

      draw() {
        if (this.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.life * 0.8;
        
        // Create gradient for trail point
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        
        if (isDarkMode) {
          gradient.addColorStop(0, 'rgba(147, 197, 253, 0.8)'); // Blue-300
          gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.5)'); // Blue-500
          gradient.addColorStop(1, 'rgba(29, 78, 216, 0)'); // Blue-700
        } else {
          gradient.addColorStop(0, 'rgba(239, 68, 68, 0.8)'); // Red-500
          gradient.addColorStop(0.5, 'rgba(220, 38, 38, 0.5)'); // Red-600
          gradient.addColorStop(1, 'rgba(185, 28, 28, 0)'); // Red-700
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Add new trail point
      trail.push(new TrailPoint(x, y));

      // Limit trail length
      if (trail.length > 50) {
        trail.shift();
      }
    };

    // Touch move handler for mobile
    const handleTouchMove = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      trail.push(new TrailPoint(x, y));
      if (trail.length > 50) {
        trail.shift();
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw trail points
      trail = trail.filter(point => {
        point.update();
        point.draw();
        return point.life > 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    animate();

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDarkMode, isClient]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'normal'
      }}
    />
  );
};

export default CursorTrail;