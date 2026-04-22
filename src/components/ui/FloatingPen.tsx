'use client'
import React from 'react'

interface FloatingPenProps {
  className?: string
}

export default function FloatingPen({ className }: FloatingPenProps) {
  return (
    <div className={className}>
      <style>{`
        @keyframes penFloat {
          0%, 100% { transform: rotate(-25deg) translateY(0px); }
          50% { transform: rotate(-25deg) translateY(-15px); }
        }
      `}</style>
      <svg
        viewBox="0 0 600 300"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[700px]"
      >
        <defs>
          {/* Barrel shine */}
          <linearGradient id="barrelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2744" />
            <stop offset="35%" stopColor="#243460" />
            <stop offset="50%" stopColor="#2e4080" stopOpacity="0.6" />
            <stop offset="65%" stopColor="#1a2744" />
            <stop offset="100%" stopColor="#0f1a30" />
          </linearGradient>

          {/* Chrome trim */}
          <linearGradient id="chromeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8e8e8" />
            <stop offset="50%" stopColor="#a0a0a0" />
            <stop offset="100%" stopColor="#d0d0d0" />
          </linearGradient>

          {/* Barrel specular highlight */}
          <linearGradient id="highlightGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Grip matte */}
          <linearGradient id="gripGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#111111" />
            <stop offset="50%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>

          <filter id="penShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="4" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        <g style={{ animation: 'penFloat 4s ease-in-out infinite' }} filter="url(#penShadow)">
          {/* Main Barrel */}
          <rect x="140" y="120" width="320" height="60" rx="12" fill="url(#barrelGrad)" />
          
          {/* Highlight strip */}
          <rect x="140" y="125" width="320" height="12" rx="4" fill="url(#highlightGrad)" />

          {/* Grip section */}
          <rect x="420" y="120" width="60" height="60" fill="url(#gripGrad)" />
          
          {/* Trim rings */}
          <rect x="416" y="120" width="4" height="60" fill="url(#chromeGrad)" />
          <rect x="140" y="120" width="4" height="60" fill="url(#chromeGrad)" />

          {/* Tip taper */}
          <polygon points="480,120 480,180 540,150" fill="url(#chromeGrad)" />
          
          {/* Nib point */}
          <ellipse cx="540" cy="150" rx="2" ry="2" fill="#111" />

          {/* Clip */}
          <rect x="180" y="105" width="200" height="8" rx="4" fill="url(#chromeGrad)" />
          <circle cx="180" cy="109" r="6" fill="url(#chromeGrad)" />

          {/* Top Cap */}
          <rect x="130" y="120" width="10" height="60" rx="4" fill="#0f1a30" />
        </g>
      </svg>
    </div>
  )
}
