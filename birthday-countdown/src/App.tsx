import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CountdownView } from "./components/CountdownView";
import { CelebrationView } from "./components/CelebrationView";
import { MessageView } from "./components/MessageView";
import { TimelineView } from "./components/TimelineView";
import { hasReachedTarget } from "./utils/countdown";
import { defaultStorage } from "./storage/StorageAdapter";
import "./App.css";

const STORAGE_KEY = "bd.countdownHit";
const MESSAGE_VIEWED_KEY = "bd.messageViewed";

function App() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showTestButton, setShowTestButton] = useState(true);

  useEffect(() => {
    // Check if we've already hit the target date
    const hasHit = defaultStorage.get<boolean>(STORAGE_KEY);
    const messageViewed = defaultStorage.get<boolean>(MESSAGE_VIEWED_KEY);

    if (hasHit || hasReachedTarget()) {
      // If it's August 28th and message hasn't been viewed, show message first
      if (!messageViewed) {
        setShowMessage(true);
      } else {
        setShowCelebration(true);
      }

      if (!hasHit) {
        defaultStorage.set(STORAGE_KEY, true);
      }
    }
  }, []);

  const handleReachTarget = () => {
    defaultStorage.set(STORAGE_KEY, true);
    const messageViewed = defaultStorage.get<boolean>(MESSAGE_VIEWED_KEY);

    if (!messageViewed) {
      setShowMessage(true);
    } else {
      setShowCelebration(true);
    }
  };

  const handleMessageClose = () => {
    defaultStorage.set(MESSAGE_VIEWED_KEY, true);
    setShowMessage(false);
    setShowCelebration(true);
  };

  const handleTestMessage = () => {
    setShowMessage(true);
    setShowTestButton(false);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={
              showMessage ? (
                <MessageView onClose={handleMessageClose} />
              ) : showCelebration ? (
                <Navigate to="/celebration" replace />
              ) : (
                <CountdownView onReachTarget={handleReachTarget} />
              )
            } 
          />
          <Route 
            path="/celebration" 
            element={<CelebrationView />} 
          />
          <Route 
            path="/invitation" 
            element={<TimelineView />} 
          />
        </Routes>

        {showTestButton && !showMessage && !showCelebration && (
          <button className="test-message-btn" onClick={handleTestMessage}>
            Test Message View
          </button>
        )}
      </div>
    </Router>
  );
}

export default App;
