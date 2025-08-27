import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CountdownView } from "./components/CountdownView";
import { CelebrationView } from "./components/CelebrationView";
import { MessageView } from "./components/MessageView";
import { TimelineView } from "./components/TimelineView";
import { DateTime } from 'luxon';
import "./App.css";

function App() {
  const [showCelebration, setShowCelebration] = useState(false);

  const isBirthdayToday = () => {
    const now = DateTime.now().setZone('Africa/Cairo');
    const currentMonth = now.month;
    const currentDay = now.day;

    // Check if today is August 28th (month 8, day 28)
    return currentMonth === 8 && currentDay === 28;
  };

  useEffect(() => {
    // Show celebration if it's the birthday (August 28th)
    if (isBirthdayToday()) {
      setShowCelebration(true);
    }
  }, []);

  const handleReachTarget = () => {
    // Show celebration when countdown finishes
    setShowCelebration(true);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              showCelebration ? (
                <CelebrationView />
              ) : (
                <CountdownView onReachTarget={handleReachTarget} />
              )
            }
          />
          <Route path="/invitation" element={<TimelineView />} />
          <Route path="/message" element={<MessageView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
