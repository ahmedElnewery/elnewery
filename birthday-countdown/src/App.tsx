import { useState, useEffect } from 'react'
import { CountdownView } from './components/CountdownView'
import { CelebrationView } from './components/CelebrationView'
import { hasReachedTarget } from './utils/countdown'
import { defaultStorage } from './storage/StorageAdapter'
import './App.css'

const STORAGE_KEY = 'bd.countdownHit';

function App() {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Check if we've already hit the target date
    const hasHit = defaultStorage.get<boolean>(STORAGE_KEY);
    
    if (hasHit || hasReachedTarget()) {
      setShowCelebration(true);
      if (!hasHit) {
        defaultStorage.set(STORAGE_KEY, true);
      }
    }
  }, []);

  const handleReachTarget = () => {
    defaultStorage.set(STORAGE_KEY, true);
    setShowCelebration(true);
  };

  return (
    <div className="app">
      {showCelebration ? (
        <CelebrationView />
      ) : (
        <CountdownView onReachTarget={handleReachTarget} />
      )}
    </div>
  )
}

export default App
