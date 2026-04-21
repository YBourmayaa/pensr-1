'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'

const particles = [
  { x: -52, y: -90, size: 3, dur: 3.2, delay: 0 },
  { x: 58, y: -130, size: 2, dur: 4.0, delay: 0.6 },
  { x: -65, y: 30, size: 4, dur: 3.6, delay: 1.1 },
  { x: 72, y: 70, size: 2, dur: 4.4, delay: 1.7 },
  { x: -35, y: 160, size: 3, dur: 3.0, delay: 0.9 },
  { x: 60, y: -45, size: 2, dur: 3.8, delay: 1.4 },
]

export default function FloatingPen() {
  const [winW, setWinW] = useState(1400)
  const [winH, setWinH] = useState(800)

  useEffect(() => {
    setWinW(window.innerWidth)
    setWinH(window.innerHeight)
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const tiltX = useSpring(
    useTransform(mouseX, [-winW / 2, winW / 2], [-8, 8]),
    { stiffness: 60, damping: 20 }
  )
  const tiltY = useSpring(
    useTransform(mouseY, [-winH / 2, winH / 2], [5, -5]),
    { stiffness: 60, damping: 20 }
  )

  const { scrollY, scrollYProgress } = useScroll()
  const modelScrollY = useTransform(scrollY, [0, 2500], [0, 180])

  // Data flow height based on scroll
  const dataHeight = useTransform(scrollYProgress, [0, 1], [300, 0])
  const dataY = useTransform(scrollYProgress, [0, 1], [150, 450])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      className="hidden lg:block text-cobalt"
      style={{
        position: 'fixed',
        right: '6vw',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        style={{
          y: modelScrollY,
          rotateZ: tiltX,
          rotateX: tiltY,
        }}
        className="relative flex items-center justify-center"
      >
        {/* Floating neurone particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `calc(50% + ${p.x}px)`,
              top: `calc(50% + ${p.y}px)`,
              background: '#10b981',
              boxShadow: '0 0 8px rgba(16,185,129,0.8)',
            }}
            animate={{ 
              y: [0, -20, 0], 
              x: [0, 10, 0],
              opacity: [0.3, 0.8, 0.3], 
              scale: [1, 1.3, 1] 
            }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}

        {/* THE MODEL SVG */}
        <svg width="160" height="560" viewBox="0 0 160 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="npuCore" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#050505"/>
              <stop offset="50%" stopColor="#111111"/>
              <stop offset="100%" stopColor="#050505"/>
            </linearGradient>
            <linearGradient id="npuEdge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.4"/>
            </linearGradient>
            <filter id="npuGlow">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Core Chassis */}
          <rect x="40" y="100" width="80" height="400" rx="4" fill="url(#npuCore)" stroke="#222" strokeWidth="1"/>
          
          {/* Data Lines / Circuitry */}
          <g opacity="0.4">
            {[140, 180, 220, 260, 300, 340, 380, 420, 460].map((y, i) => (
              <rect key={y} x="45" y={y} width="70" height="1" fill="#333" />
            ))}
            <rect x="78" y="100" width="4" height="400" fill="#333" opacity="0.3" />
          </g>

          {/* Active Data Stream (Animated) */}
          <motion.rect
            style={{ height: dataHeight, y: dataY }}
            x="79" width="2"
            fill="#10b981"
            filter="url(#npuGlow)"
          />

          {/* Status LEDs */}
          <circle cx="55" cy="120" r="2" fill="#10b981" filter="url(#npuGlow)">
            <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="65" cy="120" r="2" fill="#10b981" opacity="0.6" />
          
          {/* Heat Sinks / Tabs */}
          <rect x="35" y="150" width="5" height="40" fill="#111" />
          <rect x="35" y="210" width="5" height="40" fill="#111" />
          <rect x="120" y="300" width="5" height="80" fill="#111" />

          {/* Brand Mark */}
          <text x="80" y="300" textAnchor="middle"
            fontFamily="'Bebas Neue', sans-serif" fontSize="12"
            letterSpacing="6" fill="#10b981" opacity="0.15"
            transform="rotate(90,80,300)">ANTIGRAVITY-1</text>

          {/* Connection Ports */}
          <rect x="60" y="500" width="40" height="20" rx="2" fill="#111" />
          <path d="M70 520 L75 560 M90 520 L85 560" stroke="#10b981" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />

          {/* Annotations */}
          <g fontFamily="'DM Mono', monospace" fontSize="8">
            <line x1="40" y1="130" x2="10" y2="130" stroke="#2A2A36" strokeWidth="0.7" strokeDasharray="2 2"/>
            <text x="5" y="127" textAnchor="end" fill="#8A8A9A">NPU CORE</text>
            <text x="5" y="137" textAnchor="end" fill="#10b981">RTP-V0.1</text>

            <line x1="40" y1="280" x2="10" y2="280" stroke="#2A2A36" strokeWidth="0.7" strokeDasharray="2 2"/>
            <text x="5" y="277" textAnchor="end" fill="#8A8A9A">CTX MANIFOLD</text>
            <text x="5" y="287" textAnchor="end" fill="#10b981">∞ UNLIMITED</text>

            <line x1="120" y1="410" x2="150" y2="410" stroke="#2A2A36" strokeWidth="0.7" strokeDasharray="2 2"/>
            <text x="155" y="407" fill="#8A8A9A">LATENCY</text>
            <text x="155" y="417" fill="#10b981">θ = 0.3ms</text>

            <line x1="120" y1="530" x2="150" y2="530" stroke="#2A2A36" strokeWidth="0.7" strokeDasharray="2 2"/>
            <text x="155" y="527" fill="#8A8A9A">VALSET</text>
            <text x="155" y="537" fill="#10b981">MBP-2023</text>
          </g>

          {/* Scanner Line (Vertical flow) */}
          <motion.rect
            x="40" y="100" width="80" height="2" fill="#10b981" opacity="0.2"
            animate={{ y: [0, 400, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>
    </div>
  )
}
