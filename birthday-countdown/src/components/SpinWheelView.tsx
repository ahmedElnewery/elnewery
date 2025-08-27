import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEGMENTS } from '../data/wheelSegments';

const getSegmentColor = (type: string, index: number) => {
  const colors = {
    gift: ['#FFD700', '#FFCC80'],
    love: ['#FF69B4', '#F8BBD9'],
    funny: ['#40E0D0', '#81D4FA']
  };
  return colors[type as keyof typeof colors][index % 2];
};

interface ResultModalProps {
  segment: typeof SEGMENTS[0] | null;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ segment, onClose }) => {
  if (!segment) return null;

  const emoji = segment.label.match(/[\u{1F300}-\u{1F9FF}]/u)?.[0] || '🎉';
  const title = segment.label.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();

  return (
    <div className="wheel-modal-overlay" onClick={onClose}>
      <div className="wheel-modal" onClick={e => e.stopPropagation()}>
        <div className="wheel-result-emoji">{emoji}</div>
        <h2 className="wheel-result-title">{title}</h2>
        <div className={`wheel-result-badge wheel-badge-${segment.type}`}>
          {segment.type.charAt(0).toUpperCase() + segment.type.slice(1)}
        </div>
        <p className="wheel-result-note">{segment.note}</p>
        <button 
          className="wheel-spin-again-btn"
          onClick={onClose}
          autoFocus
        >
          Spin Again! 🎡
        </button>
      </div>
    </div>
  );
};

export const SpinWheelView: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState<typeof SEGMENTS[0] | null>(null);
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);
  const wheelRef = useRef<SVGSVGElement>(null);
  const navigate = useNavigate();

  const segmentAngle = 360 / SEGMENTS.length;

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    
    // Avoid immediate repeat
    const availableSegments = lastSelectedId 
      ? SEGMENTS.filter(s => s.id !== lastSelectedId)
      : SEGMENTS;
    
    const targetSegment = availableSegments[Math.floor(Math.random() * availableSegments.length)];
    const targetIndex = SEGMENTS.findIndex(s => s.id === targetSegment.id);
    
    // Calculate target rotation (multiple full rotations + precise landing)
    const fullRotations = 5 + Math.random() * 3; // 5-8 full rotations
    const targetAngle = targetIndex * segmentAngle;
    const finalRotation = rotation + (fullRotations * 360) + (360 - targetAngle);
    
    setRotation(finalRotation);
    
    // Animation duration
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedSegment(targetSegment);
      setLastSelectedId(targetSegment.id);
    }, 3500);
  };

  const closeModal = () => {
    setSelectedSegment(null);
  };

  return (
    <div className="wheel-view" dir="rtl">
      <div className="wheel-container">
        <div className="wheel-header">
          <h1 className="wheel-title">Noura's Fun Wheel 🎡</h1>
        </div>

        <div className="wheel-game-area">
          <div className="wheel-wrapper">
            {/* Fixed Pointer */}
            <div className="wheel-pointer">
              <svg width="30" height="40" viewBox="0 0 30 40">
                <polygon 
                  points="15,0 25,30 5,30" 
                  fill="#2d3748" 
                  stroke="#fff" 
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Spinning Wheel */}
            <svg
              ref={wheelRef}
              className="wheel-svg"
              width="350"
              height="350"
              viewBox="0 0 350 350"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
              }}
            >
              <circle cx="175" cy="175" r="170" fill="#fff" stroke="#2d3748" strokeWidth="4"/>
              
              {SEGMENTS.map((segment, index) => {
                const startAngle = index * segmentAngle;
                const endAngle = (index + 1) * segmentAngle;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                
                const x1 = 175 + 165 * Math.cos(startRad);
                const y1 = 175 + 165 * Math.sin(startRad);
                const x2 = 175 + 165 * Math.cos(endRad);
                const y2 = 175 + 165 * Math.sin(endRad);
                
                const largeArc = segmentAngle > 180 ? 1 : 0;
                const pathData = `M 175 175 L ${x1} ${y1} A 165 165 0 ${largeArc} 1 ${x2} ${y2} Z`;
                
                // Text positioning
                const textAngle = startAngle + segmentAngle / 2;
                const textRad = (textAngle * Math.PI) / 180;
                const textX = 175 + 110 * Math.cos(textRad);
                const textY = 175 + 110 * Math.sin(textRad);
                
                return (
                  <g key={segment.id}>
                    <path
                      d={pathData}
                      fill={getSegmentColor(segment.type, index)}
                      stroke="#fff"
                      strokeWidth="2"
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="13"
                      fontWeight="600"
                      fill="#2d3748"
                      transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                    >
                      {segment.label}
                    </text>
                  </g>
                );
              })}
              
              {/* Center circle */}
              <circle cx="175" cy="175" r="25" fill="#2d3748" stroke="#fff" strokeWidth="3"/>
            </svg>
          </div>

          <button
            className={`wheel-spin-btn ${isSpinning ? 'spinning' : ''}`}
            onClick={spin}
            disabled={isSpinning}
            aria-disabled={isSpinning}
          >
            {isSpinning ? 'Spinning... 🌪️' : 'SPIN THE WHEEL! 🎡'}
          </button>
        </div>

        <div 
          className="wheel-result-area" 
          aria-live="polite"
          aria-label="Wheel result"
        >
          {selectedSegment && (
            <div className="wheel-last-result">
              Last result: {selectedSegment.label}
            </div>
          )}
        </div>

        <button 
          className="wheel-back-btn" 
          onClick={() => navigate('/')}
        >
          ← Back to Celebration
        </button>
      </div>

      <ResultModal segment={selectedSegment} onClose={closeModal} />
    </div>
  );
};
