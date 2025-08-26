import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationViewProps {
  onTimelineClick?: () => void;
}

export const CelebrationView: React.FC<CelebrationViewProps> = ({ onTimelineClick }) => {
  const [typedText, setTypedText] = useState('');
  const targetText = 'Noura';

  useEffect(() => {
    // Trigger confetti animation
    const triggerConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    };

    // Initial confetti burst
    triggerConfetti();
    
    // Additional confetti bursts
    const confettiInterval = setInterval(triggerConfetti, 3000);
    
    // Typing effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setTypedText(targetText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 200);

    return () => {
      clearInterval(confettiInterval);
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <div className="celebration-view">
      <div className="celebration-content">
        <h1 className="celebration-headline">
          It's here! Happy Birthday, <span className="typed-name">{typedText}</span>
          <span className="cursor">|</span>
        </h1>
        
        <p className="celebration-message">
          This moment was worth the wait. Let's make today unforgettable. ❤️
        </p>
        
        <button 
          className="timeline-button"
          onClick={onTimelineClick}
        >
          View Timeline
        </button>
      </div>
    </div>
  );
};
