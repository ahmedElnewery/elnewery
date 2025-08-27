import React, { useState, useEffect } from "react";
import {
  getTargetDate,
  calculateCountdown,
  type CountdownTime,
} from "../utils/countdown";

interface CountdownViewProps {
  onReachTarget: () => void;
}

export const CountdownView: React.FC<CountdownViewProps> = ({
  onReachTarget,
}) => {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = getTargetDate();

    const updateCountdown = () => {
      const newCountdown = calculateCountdown(target);

      // Check if we've reached zero
      if (
        newCountdown.days === 0 &&
        newCountdown.hours === 0 &&
        newCountdown.minutes === 0 &&
        newCountdown.seconds === 0
      ) {
        onReachTarget();
        return;
      }

      setCountdown(newCountdown);
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [onReachTarget]);

  return (
    <div className="countdown-view">
      <div className="countdown-header">
        <h1 className="countdown-title">
          Special Day, Special Queen Noura! 💫 🎂✨
        </h1>
        <p className="countdown-subtitle">Cheers in Progress 🥂</p>
      </div>

      <div
        className="countdown-grid"
        role="region"
        aria-live="polite"
        aria-label="Birthday countdown timer"
      >
        <div className="countdown-card">
          <div className="countdown-number">{countdown.days}</div>
          <div className="countdown-label">Days</div>
        </div>

        <div className="countdown-card">
          <div className="countdown-number">{countdown.hours}</div>
          <div className="countdown-label">Hours</div>
        </div>

        <div className="countdown-card">
          <div className="countdown-number">{countdown.minutes}</div>
          <div className="countdown-label">Minutes</div>
        </div>

        <div className="countdown-card">
          <div className="countdown-number">{countdown.seconds}</div>
          <div className="countdown-label">Seconds</div>
        </div>
      </div>
    </div>
  );
};
