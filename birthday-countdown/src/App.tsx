import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CountdownView } from "./components/CountdownView";
import { CelebrationView } from "./components/CelebrationView";
import { MessageView } from "./components/MessageView";
import { TimelineView } from "./components/TimelineView";
import { hasReachedTarget } from "./utils/countdown";
import { defaultStorage } from "./storage/StorageAdapter";
import "./App.css";

const STORAGE_KEY = "bd.countdownHit";

function App() {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Check if we've already hit the target date
    const hasHit = defaultStorage.get<boolean>(STORAGE_KEY);

    if (hasHit || hasReachedTarget()) {
      // Directly show celebration when target is reached or already hit
      setShowCelebration(true);

      if (!hasHit) {
        defaultStorage.set(STORAGE_KEY, true);
      }
    }
  }, []);

  const handleReachTarget = () => {
    defaultStorage.set(STORAGE_KEY, true);
    // Immediately show celebration when countdown finishes
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
