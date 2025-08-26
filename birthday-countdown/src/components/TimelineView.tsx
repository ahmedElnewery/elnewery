import React from "react";
import { useNavigate } from "react-router-dom";

interface TimelineItem {
  time: string;
  activity: string;
  icon: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  {
    time: "11:00 AM",
    activity: "Coffee & Snacks",
    icon: "☕",
    description:
      "Pick your favorite coffee and some delicious snacks to start our perfect day",
  },
  {
    time: "12:00 PM",
    activity: "Drive to Cairo",
    icon: "🚗",
    description:
      "Scenic car ride together, music, and great conversations on our way",
  },
  {
    time: "2:00 PM",
    activity: "Breakfast & Talk",
    icon: "🍳",
    description:
      "Enjoy a lovely breakfast while we catch up and share our thoughts",
  },
  {
    time: "4:00 PM",
    activity: "Shopping & Tour",
    icon: "🛍️",
    description:
      "Free shopping time and exploring the beautiful sights around the city",
  },
  {
    time: "6:00 PM",
    activity: "Arcade Games",
    icon: "🎮",
    description:
      "Fun arcade games, competitions, and lots of laughter together",
  },
  {
    time: "8:00 PM",
    activity: "Dinner Date",
    icon: "🍽️",
    description: "Romantic dinner to end our perfect birthday celebration",
  },
];

export const TimelineView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="timeline-view">
      <div className="timeline-container">
        <div className="timeline-header">
          <h1 className="timeline-title">Your Perfect Birthday Timeline 🎉</h1>
          <p className="timeline-subtitle">
            A day full of love, fun, and beautiful memories
          </p>
        </div>

        <div className="timeline-content">
          {timelineItems.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-time">
                <span className="time-text">{item.time}</span>
              </div>
              <div className="timeline-connector">
                <div className="timeline-dot">
                  <span className="timeline-icon">{item.icon}</span>
                </div>
                {index < timelineItems.length - 1 && (
                  <div className="timeline-line"></div>
                )}
              </div>
              <div className="timeline-details">
                <h3 className="activity-title">{item.activity}</h3>
                <p className="activity-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="timeline-back-btn" onClick={() => navigate('/celebration')}>
          Back to Celebration
        </button>
      </div>
    </div>
  );
};
