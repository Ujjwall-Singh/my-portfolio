import React, { useState, useEffect } from 'react';

const TypeWriter = ({ 
  strings = [], 
  typeSpeed = 100, 
  backSpeed = 50, 
  loop = true,
  showCursor = true,
  cursorChar = '|',
  delay = 1000,
  className = ""
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursorBlink, setShowCursorBlink] = useState(true);

  useEffect(() => {
    if (strings.length === 0) return;

    const currentString = strings[currentIndex];
    let timeoutId;

    if (isTyping) {
      if (currentText.length < currentString.length) {
        timeoutId = setTimeout(() => {
          setCurrentText(currentString.slice(0, currentText.length + 1));
        }, typeSpeed);
      } else {
        setIsTyping(false);
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, delay);
      }
    } else {
      if (currentText.length > 0) {
        timeoutId = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, backSpeed);
      } else {
        setIsTyping(true);
        if (loop) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % strings.length);
        }
      }
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, currentIndex, isTyping, strings, typeSpeed, backSpeed, delay, loop]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursorBlink(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {currentText}
      {showCursor && (
        <span 
          className={`${showCursorBlink ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
};

export default TypeWriter;