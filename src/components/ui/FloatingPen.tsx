'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'

// Pre-defined grip bands to avoid Array.from inside JSX
const gripBands = [0,1,2,3,4,5,6,7,8,9,10,11,12,13]

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
    useTransform(mouseX, [-winW / 2, winW / 2], [-6, 6]),
    { stiffness: 60, damping: 20 }
  )
  const tiltY = useSpring(
    useTransform(mouseY, [-winH / 2, winH / 2], [4, -4]),
    { stiffness: 60, damping: 20 }
  )

  const { scrollY, scrollYProgress } = useScroll()
  // Pen travels down as user scrolls — like oryzo's coaster
  const penScrollY = useTransform(scrollY, [0, 2500], [0, 220])

  // Ink "flows down" as we scroll. 
  // At progress 0, it's mostly full. At progress 1, it's moved towards the nib.
  const inkY = useTransform(scrollYProgress, [0, 1], [104, 469])
  const inkHeight = useTransform(scrollYProgress, [0, 1], [365, 0])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    // FIXED to viewport — right side, vertically centered
    <div
      className="hidden lg:block"
      style={{
        position: 'fixed',
        right: '5vw',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        style={{
          y: penScrollY,
          rotateZ: tiltX,
          rotateX: tiltY,
        }}
        className="relative flex items-center justify-center"
      >
        {/* Floating ink particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `calc(50% + ${p.x}px)`,
              top: `calc(50% + ${p.y}px)`,
              background: '#1A3AFF',
              boxShadow: '0 0 6px rgba(26,58,255,0.8)',
            }}
            animate={{ y: [0, -14, 0], opacity: [0.25, 0.7, 0.25], scale: [1, 1.5, 1] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}

        {/* THE PEN SVG */}
        <svg width="130" height="560" viewBox="0 0 160 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fpBarrel" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0D1B8E" stopOpacity="0.8"/>
              <stop offset="25%" stopColor="#1A3AFF" stopOpacity="0.4"/>
              <stop offset="50%" stopColor="#4D6FFF" stopOpacity="0.3"/>
              <stop offset="75%" stopColor="#1A3AFF" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#0A1260" stopOpacity="0.8"/>
            </linearGradient>
            <linearGradient id="fpInkLiquid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1A3AFF"/>
              <stop offset="100%" stopColor="#0D1B8E"/>
            </linearGradient>
            <linearGradient id="fpCap" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0A0A1A"/>
              <stop offset="40%" stopColor="#2A2A45"/>
              <stop offset="100%" stopColor="#0A0A1A"/>
            </linearGradient>
            <linearGradient id="fpNib" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8A9AFF"/>
              <stop offset="50%" stopColor="#C5CEFF"/>
              <stop offset="100%" stopColor="#8A9AFF"/>
            </linearGradient>
            <linearGradient id="fpShine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="transparent"/>
              <stop offset="45%" stopColor="rgba(255,255,255,0.06)"/>
              <stop offset="55%" stopColor="rgba(255,255,255,0.16)"/>
              <stop offset="100%" stopColor="transparent"/>
            </linearGradient>
            <filter id="fpShadow">
              <feDropShadow dx="0" dy="6" stdDeviation="14" floodColor="#1A3AFF" floodOpacity="0.35"/>
            </filter>
            <filter id="fpGlow">
              <feGaussianBlur stdDeviation="3" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="fpInkBlur">
              <feGaussianBlur stdDeviation="5"/>
            </filter>
            <clipPath id="barrelPath">
              <rect x="52" y="104" width="56" height="365" rx="6" />
            </clipPath>
          </defs>

          {/* Ambient cobalt glow behind pen */}
          <ellipse cx="80" cy="300" rx="48" ry="290" fill="#1A3AFF" opacity="0.05" filter="url(#fpInkBlur)"/>

          {/* CAP */}
          <rect x="54" y="20" width="52" height="85" rx="10" fill="url(#fpCap)" filter="url(#fpShadow)"/>
          <rect x="54" y="20" width="52" height="85" rx="10" fill="url(#fpShine)"/>
          <ellipse cx="80" cy="20" rx="26" ry="6" fill="#16162A"/>
          <rect x="54" y="98" width="52" height="6" rx="2" fill="#0D0D1E"/>
          <rect x="54" y="98" width="52" height="2" fill="#3D5AFE" opacity="0.7"/>

          {/* Clip */}
          <rect x="97" y="24" width="7" height="68" rx="3.5" fill="#1A1A30"/>
          <rect x="98" y="24" width="2" height="68" rx="1" fill="rgba(255,255,255,0.08)"/>
          <ellipse cx="100.5" cy="96" rx="4.5" ry="4.5" fill="#1A1A30"/>

          {/* BARREL */}
          <rect x="52" y="104" width="56" height="365" rx="6" fill="url(#fpBarrel)" filter="url(#fpShadow)"/>
          
          {/* LIQUID INK */}
          <g clipPath="url(#barrelPath)">
            <motion.rect
              style={{ y: inkY, height: inkHeight }}
              x="52" width="56"
              fill="url(#fpInkLiquid)"
            />
            {/* Wavy surface layer */}
            <motion.path
              style={{ y: inkY }}
              d="M 52 0 Q 66 -5 80 0 T 108 0 V 10 H 52 Z"
              fill="#1A3AFF"
              animate={{
                d: [
                  "M 52 0 Q 66 5 80 0 T 108 0 V 10 H 52 Z",
                  "M 52 0 Q 66 -5 80 0 T 108 0 V 10 H 52 Z",
                  "M 52 0 Q 66 5 80 0 T 108 0 V 10 H 52 Z"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>

          <rect x="52" y="104" width="56" height="365" rx="6" fill="url(#fpShine)"/>


          {/* Grip bands */}
          {gripBands.map((i) => (
            <rect key={i} x="52" y={372 + i * 7} width="56" height="3.5" rx="0"
              fill="rgba(0,0,0,0.22)" />
          ))}
          <rect x="52" y="372" width="6" height="98" fill="rgba(0,0,0,0.18)"/>
          <rect x="102" y="372" width="6" height="98" fill="rgba(0,0,0,0.18)"/>

          {/* Shine line */}
          <line x1="63" y1="108" x2="63" y2="466" stroke="rgba(255,255,255,0.05)" strokeWidth="3"/>
          <line x1="65" y1="108" x2="65" y2="466" stroke="rgba(255,255,255,0.11)" strokeWidth="1"/>

          {/* Brand text */}
          <text x="80" y="255" textAnchor="middle"
            fontFamily="'Bebas Neue', sans-serif" fontSize="10"
            letterSpacing="7" fill="rgba(255,255,255,0.10)"
            transform="rotate(90,80,255)">PENSR-1</text>

          {/* Brand ring */}
          <rect x="52" y="104" width="56" height="3" fill="#050B55"/>
          <rect x="52" y="107" width="56" height="1.5" fill="#3D5AFE" opacity="0.9"/>

          {/* TAPER */}
          <path d="M52 469 L67 530 L93 530 L108 469 Z" fill="url(#fpBarrel)"/>
          <path d="M52 469 L67 530 L93 530 L108 469 Z" fill="url(#fpShine)"/>
          <line x1="52" y1="469" x2="67" y2="530" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5"/>
          <line x1="108" y1="469" x2="93" y2="530" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5"/>

          {/* NIB */}
          <rect x="67" y="530" width="26" height="40" rx="2" fill="url(#fpNib)"/>
          <line x1="80" y1="530" x2="80" y2="570" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
          <ellipse cx="80" cy="572" rx="4" ry="5" fill="#D0D8FF" filter="url(#fpGlow)"/>
          <ellipse cx="80" cy="572" rx="2" ry="2.5" fill="white"/>

          {/* Ink drop at tip */}
          <ellipse cx="80" cy="577" rx="3.5" ry="4.5" fill="#1A3AFF" opacity="0.85" filter="url(#fpInkBlur)"/>
          <ellipse cx="80" cy="578" rx="1.5" ry="2" fill="#7B9CFF"/>

          {/* Annotation lines — minimal */}
          <line x1="52" y1="55" x2="22" y2="55" stroke="#2A2A36" strokeWidth="0.7" strokeDasharray="3 3"/>
          <text x="20" y="52" textAnchor="end" fontFamily="'DM Mono',monospace" fontSize="8" fill="#8A8A9A">cap</text>
          <text x="20" y="62" textAnchor="end" fontFamily="'DM Mono',monospace" fontSize="7" fill="#3D5AFE">retractable</text>

          <line x1="52" y1="210" x2="22" y2="210" stroke="#2A2A36" strokeWidth="0.7" strokeDasharray="3 3"/>
          <text x="20" y="207" textAnchor="end" fontFamily="'DM Mono',monospace" fontSize="8" fill="#8A8A9A">reservoir</text>
          <text x="20" y="217" textAnchor="end" fontFamily="'DM Mono',monospace" fontSize="7" fill="#3D5AFE">1.2km ctx</text>

          <line x1="108" y1="420" x2="138" y2="420" stroke="#2A2A36" strokeWidth="0.7" strokeDasharray="3 3"/>
          <text x="140" y="418" fontFamily="'DM Mono',monospace" fontSize="8" fill="#8A8A9A">grip zone</text>
          <text x="140" y="428" fontFamily="'DM Mono',monospace" fontSize="7" fill="#3D5AFE">fine-tuned</text>

          <line x1="108" y1="552" x2="138" y2="552" stroke="#2A2A36" strokeWidth="0.7" strokeDasharray="3 3"/>
          <text x="140" y="550" fontFamily="'DM Mono',monospace" fontSize="8" fill="#8A8A9A">0.7mm nib</text>
          <text x="140" y="560" fontFamily="'DM Mono',monospace" fontSize="7" fill="#3D5AFE">θ = 1 param</text>
        </svg>
      </motion.div>
    </div>
  )
}
