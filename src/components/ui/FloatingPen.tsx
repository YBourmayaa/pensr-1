'use client'
import { motion, useTransform } from 'framer-motion'

interface FloatingPenProps {
  scrollProgress: any // from framer-motion useScroll
}

export default function FloatingPen({ scrollProgress }: FloatingPenProps) {
  // Animate ink height based on scroll progress (0-1)
  // At 0: ink is full (100% height)
  // At 1: ink is empty (0% height)
  const inkScaleY = useTransform(scrollProgress, [0, 1], [1, 0])

  return (
    <div className="relative flex items-center justify-center w-[160px] h-[600px] pointer-events-none">
      <svg width="120" height="500" viewBox="0 0 120 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="barrelGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="50%" stopColor="#333333" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
          <linearGradient id="metalGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#999999" />
            <stop offset="50%" stopColor="#e0e0e0" />
            <stop offset="100%" stopColor="#999999" />
          </linearGradient>
          <clipPath id="inkClip">
            <rect x="52" y="160" width="16" height="180" rx="4" />
          </clipPath>
        </defs>

        {/* Pen Cap / Top Button */}
        <rect id="pen-cap" x="50" y="20" width="20" height="30" rx="2" fill="url(#barrelGradient)" />
        <rect x="52" y="15" width="16" height="5" rx="1" fill="#444" />

        {/* Upper Barrel */}
        <rect id="pen-barrel-top" x="45" y="50" width="30" height="110" fill="url(#barrelGradient)" />

        {/* Metal Clip */}
        <rect id="pen-clip" x="72" y="70" width="6" height="80" rx="2" fill="url(#metalGradient)" stroke="#666" strokeWidth="0.5" />

        {/* Ink Reservoir Housing (Transparent Tube) */}
        <rect id="pen-reservoir-bg" x="50" y="155" width="20" height="190" rx="6" fill="#1a1a2e" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" />
        
        {/* The Ink (Animated) */}
        <motion.rect
          id="pen-ink"
          x="53"
          y="163" 
          width="14"
          height="174"
          rx="3"
          fill="#1a3aff"
          style={{ 
            scaleY: inkScaleY,
            transformOrigin: 'bottom' 
          }}
        />

        {/* Main Barrel Lower */}
        <path id="pen-barrel" d="M45 340 L75 340 L75 420 L45 420 Z" fill="url(#barrelGradient)" />

        {/* Tapered Nib / Tip */}
        <path id="pen-nib" d="M45 420 L75 420 L65 470 L55 470 Z" fill="url(#barrelGradient)" />
        <circle cx="60" cy="480" r="4" fill="#000" fillOpacity="0.5" />
        <circle cx="60" cy="480" r="1.5" fill="#1a3aff" />

        {/* Details / Lines */}
        <line x1="45" y1="340" x2="75" y2="340" stroke="#000" strokeOpacity="0.3" strokeWidth="1" />
        <line x1="45" y1="420" x2="75" y2="420" stroke="#000" strokeOpacity="0.3" strokeWidth="1" />
      </svg>

      {/* Subtle floating glow */}
      <div className="absolute inset-0 bg-[#1a3aff]/10 blur-[100px] rounded-full pointer-events-none" />
    </div>
  )
}
