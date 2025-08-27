import React from "react";
import { useNavigate } from "react-router-dom";

export const MessageView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="message-view">
      <div className="message-paper">
        <div className="message-header">
          <h1 className="message-title">Happy Birthday, Noura! 🎉</h1>
          <div className="message-date">August 28th</div>
        </div>

        <div className="message-content">
          <p className="message-line">My dearest Noura,</p>
          <p className="message-line">
            Today marks another beautiful year of your amazing journey.
          </p>
          <p className="message-line">
            Your smile lights up every room and your kindness touches every
            heart.
          </p>
          <p className="message-line">
            May this new year bring you endless joy, love, and wonderful
            adventures.
          </p>
          <p className="message-line">
            You deserve all the happiness in the world and so much more.
          </p>
          <p className="message-line">
            Wishing you the most magical birthday celebration! ✨
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
