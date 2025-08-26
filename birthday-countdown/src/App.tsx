import { useState, useEffect } from 'react'
import { CountdownView } from './components/CountdownView'
import { CelebrationView } from './components/CelebrationView'
import { MessageView } from './components/MessageView'
import { TimelineView } from './components/TimelineView'
import { hasReachedTarget } from './utils/countdown'
import { defaultStorage } from './storage/StorageAdapter'
import './App.css'

const STORAGE_KEY = 'bd.countdownHit';
const MESSAGE_VIEWED_KEY = 'bd.messageViewed';

function App() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
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

  const handleTimelineClick = () => {
    setShowCelebration(false);
    setShowTimeline(true);
  };

  const handleTimelineBack = () => {
    setShowTimeline(false);
    setShowCelebration(true);
  };

  return (
    <div className="app">
      {showMessage ? (
        <MessageView onClose={handleMessageClose} />
      ) : showTimeline ? (
        <TimelineView onBack={handleTimelineBack} />
      ) : showCelebration ? (
        <CelebrationView onTimelineClick={handleTimelineClick} />
      ) : (
        <CountdownView onReachTarget={handleReachTarget} />
      )}
      
      {showTestButton && !showMessage && !showCelebration && !showTimeline && (
        <button className="test-message-btn" onClick={handleTestMessage}>
          Test Message View
        </button>
      )}
    </div>
  )
}

export default App
