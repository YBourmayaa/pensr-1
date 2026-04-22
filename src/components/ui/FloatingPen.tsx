'use client'
import React from 'react'

interface FloatingPenProps {
  className?: string
}

export default function FloatingPen({ className }: FloatingPenProps) {
  return (
    <div className={className}>
      <style>{`
        @keyframes inkDiffuse {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1) rotate(0deg);
          }
          50% { 
            opacity: 0.25;
            transform: scale(1.05) rotate(1deg);
          }
        }
        
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
      <svg
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{ animation: 'floatUp 6s ease-in-out infinite' }}
      >
        <defs>
          {/* Ink diffusion gradient */}
          <radialGradient id="inkSpray1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="40%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="inkSpray2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#a855f7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>

          <filter id="inkBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
        </defs>

        {/* Main ink splash - center */}
        <circle 
          cx="300" 
          cy="300" 
          r="180" 
          fill="url(#inkSpray1)"
          style={{ animation: 'inkDiffuse 8s ease-in-out infinite' }}
          filter="url(#inkBlur)"
        />

        {/* Secondary diffusion bloom - left */}
        <circle 
          cx="200" 
          cy="280" 
          r="140" 
          fill="url(#inkSpray2)"
          style={{ 
            animation: 'inkDiffuse 10s ease-in-out infinite 0.5s',
            animationDelay: '0.5s'
          }}
          filter="url(#inkBlur)"
          opacity="0.4"
        />

        {/* Tertiary diffusion - right */}
        <circle 
          cx="400" 
          cy="320" 
          r="120" 
          fill="url(#inkSpray2)"
          style={{ 
            animation: 'inkDiffuse 9s ease-in-out infinite 1s',
            animationDelay: '1s'
          }}
          filter="url(#inkBlur)"
          opacity="0.35"
        />

        {/* Top accent bloom */}
        <circle 
          cx="300" 
          cy="150" 
          r="100" 
          fill="url(#inkSpray1)"
          style={{ 
            animation: 'inkDiffuse 11s ease-in-out infinite 1.5s',
            animationDelay: '1.5s'
          }}
          filter="url(#inkBlur)"
          opacity="0.3"
        />

        {/* Bottom accent bloom */}
        <circle 
          cx="300" 
          cy="450" 
          r="90" 
          fill="url(#inkSpray2)"
          style={{ 
            animation: 'inkDiffuse 10.5s ease-in-out infinite 2s',
            animationDelay: '2s'
          }}
          filter="url(#inkBlur)"
          opacity="0.25"
        />

        {/* Fine particle spray lines */}
        <g opacity="0.2" style={{ animation: 'floatUp 8s ease-in-out infinite' }}>
          <line x1="300" y1="100" x2="280" y2="200" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" filter="url(#inkBlur)" />
          <line x1="300" y1="100" x2="320" y2="200" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" filter="url(#inkBlur)" />
          <line x1="200" y1="250" x2="150" y2="280" stroke="#a855f7" strokeWidth="1" strokeLinecap="round" filter="url(#inkBlur)" />
          <line x1="400" y1="250" x2="450" y2="280" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" filter="url(#inkBlur)" />
        </g>
      </svg>
    </div>
  )
}
