import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../../data/portfolio';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const messages = portfolioData.welcomeMessages;

  useEffect(() => {
    if (currentMessageIndex >= messages.length) {
      // All messages typed, wait a bit then fade out
      setTimeout(() => {
        gsap.to('.welcome-screen', {
          opacity: 0,
          duration: 1,
          onComplete: onComplete
        });
      }, 1500);
      return;
    }

    const currentMessage = messages[currentMessageIndex];
    let charIndex = 0;
    setDisplayedText('');
    setIsTyping(true);

    // Typewriter effect
    const typingInterval = setInterval(() => {
      if (charIndex < currentMessage.length) {
        setDisplayedText(currentMessage.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        // Wait before moving to next message
        setTimeout(() => {
          setCurrentMessageIndex(prev => prev + 1);
        }, 800);
      }
    }, 50); // Speed of typing (50ms per character)

    return () => clearInterval(typingInterval);
  }, [currentMessageIndex, messages, onComplete]);

  return (
    <div className="welcome-screen fixed inset-0 z-[9999] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Apple-style animated gradient orb */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
          <div className="absolute inset-4 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-full blur-xl opacity-80"></div>
        </div>

        {/* Typewriter text */}
        <div className="relative h-32 flex items-center justify-center">
          <h1 className={`font-poppins tracking-tight ${
            currentMessageIndex === 0 ? 'text-7xl font-bold' : 
            currentMessageIndex === 1 ? 'text-5xl font-semibold' : 
            'text-3xl font-normal text-gray-600'
          }`}>
            {displayedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </h1>
        </div>

        {/* Loading indicator */}
        <div className="flex items-center justify-center space-x-2 mt-12">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};
