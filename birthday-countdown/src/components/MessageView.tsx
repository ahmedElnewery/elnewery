import React from "react";
import { useNavigate } from "react-router-dom";

export const MessageView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="message-view">
      <div className="message-paper">
        <div className="message-header">
          <h1 className="message-title">Happy Birthday, my love! 🎉❤️</h1>
          <div className="message-date">August 28th</div>
        </div>

        <div className="message-content">
          <p className="message-line">
            Today isn't just a day — it's the best day of the whole year, because it's the day the world got blessed with you. I don't just love celebrating your birthday, I live for it. Your existence makes my life brighter, and honestly, the whole planet a much better place. 🌍✨
          </p>
          <p className="message-line">
            I adore your laugh, your energy, your spirit — and your beauty that's unlike any girl in the world (sorry, world, but it's true 😏🔥).
          </p>
          <p className="message-line">
            So today, we celebrate you — my amazing fiancée, my partner in crime, my everything. Let's make this day unforgettable, just like you are.
          </p>
          <p className="message-line">
            I love you, Nora. Always. ❤️
          </p>
        </div>

        <div className="message-signature">
          <div className="signature-line">With all my love,</div>
          <div className="signature-name">Ahmed Elnewery</div>
          <div className="signature-heart">💝</div>
        </div>

        <button className="timeline-back-btn" onClick={() => navigate("/")}>
          🎂 Back to Celebration
        </button>
      </div>
    </div>
  );
};
