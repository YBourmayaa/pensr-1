'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import MagneticButton from '@/components/ui/MagneticButton'

const words = ['essays.', 'novels.', 'manifestos.', 'love letters.', 'grocery lists.', 'resignation letters.', 'history.']

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let startTime: number | null = null
    const easeOut = (t: number) => 1 - Math.pow(2, -10 * t)
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setValue(target * easeOut(progress))
      if (progress < 1) requestAnimationFrame(step)
      else setValue(target)
    }
    requestAnimationFrame(step)
  }, [target, duration, active])
  return value
}

// Pre-defined grip bands to avoid Array.from inside JSX
const gripBands = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

// Pre-defined ink particles
const particles = [
  { x: -40, y: -80, size: 3, delay: 0 },
  { x: 50, y: -120, size: 2, delay: 0.5 },
  { x: -60, y: 40, size: 4, delay: 1 },
  { x: 70, y: 80, size: 2, delay: 1.5 },
  { x: -30, y: 150, size: 3, delay: 0.8 },
  { x: 55, y: -40, size: 2, delay: 1.2 },
]

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const containerRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  // Existing scroll parallax for text
  const y = useTransform(scrollY, [0, 600], [0, -120])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  // Stats
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true })
  const count1 = useCountUp(1.2, 1800, statsInView)
  const count2 = useCountUp(300, 1800, statsInView)
  const count3 = useCountUp(99.99, 2000, statsInView)

  // Mouse parallax motion values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const penY = useSpring(useTransform(mouseY, [-300, 300], [-18, 18]), { stiffness: 80, damping: 20 })
  const tiltX = useSpring(useTransform(mouseX, [-500, 500], [-8, 8]), { stiffness: 80, damping: 20 })

  // Scroll-linked pen travel
  const penScrollY = useTransform(scrollY, [0, 800], [0, 120])

  // Combined Y = mouse parallax + scroll travel
  const combinedY = useTransform(() => penY.get() + penScrollY.get())

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  // Typewriter effect
  useEffect(() => {
    const word = words[wordIndex]
    let i = typing ? 0 : word.length
    const interval = setInterval(() => {
      if (typing) {
        setDisplayed(word.slice(0, i + 1))
        i++
        if (i >= word.length) {
          clearInterval(interval)
          setTimeout(() => setTyping(false), 2000)
        }
      } else {
        setDisplayed(word.slice(0, i - 1))
        i--
        if (i <= 0) {
          clearInterval(interval)
          setWordIndex(p => (p + 1) % words.length)
          setTyping(true)
        }
      }
    }, typing ? 60 : 35)
    return () => clearInterval(interval)
  }, [wordIndex, typing])

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#F5F0E8 1px, transparent 1px), linear-gradient(90deg, #F5F0E8 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Blue gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #1A3AFF 0%, transparent 70%)' }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-[1400px] mx-auto px-8 pt-32 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left column - text content */}
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="tag">Release — Pensr-1 A0B</span>
            <span className="w-8 h-px bg-line" />
            <span className="section-label">Est. 1943</span>
          </motion.div>

          {/* Main headline */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="display text-[clamp(5rem,12vw,14rem)] text-paper leading-none"
            >
              THE ORIGINAL
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="display text-[clamp(5rem,12vw,14rem)] text-cobalt leading-none"
            >
              TEXT MODEL
            </motion.h1>
          </div>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-baseline gap-3 mb-16"
          >
            <span className="font-serif font-light text-[clamp(1.5rem,3vw,2.5rem)] text-mist italic">Write</span>
            <span className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] text-paper italic min-w-[280px]">
              {displayed}
              <span className="animate-blink ml-0.5 text-cobalt">|</span>
            </span>
          </motion.div>

          {/* Stats row */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line"
          >
            {[
              { label: 'Context window', value: count1.toFixed(1), unit: 'km', sub: 'ink length' },
              { label: 'Throughput', value: Math.round(count2), unit: '', sub: 'words / minute' },
              { label: 'Uptime', value: count3.toFixed(2), unit: '%', sub: 'since 1943' },
              { label: 'Cost / 1M tokens', value: '$0.002', unit: '', sub: 'vs $15 GPT-4' },
            ].map((stat) => (
              <div key={stat.label} className="bg-ink px-8 py-8 group hover:bg-dim transition-colors">
                <p className="section-label mb-3">{stat.label}</p>
                <p className="display text-5xl text-paper group-hover:text-cobalt transition-colors mb-1">
                  {stat.value}{stat.unit}
                </p>
                <svg width="100%" height="2" style={{ marginTop: '6px', display: 'block' }}>
                  <line
                    x1="0" y1="1" x2="100%" y2="1"
                    stroke="#1A3AFF" strokeWidth="1.5"
                    strokeDasharray="200"
                    style={{
                      strokeDashoffset: statsInView ? 0 : 200,
                      transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s'
                    }}
                  />
                </svg>
                <p className="font-mono text-xs text-mist mt-3">{stat.sub}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex items-center gap-6 mt-12"
          >
            <MagneticButton
              href="#pricing"
              className="group flex items-center gap-3 px-8 py-4 bg-cobalt hover:bg-cobalt2 text-paper font-medium transition-all duration-300"
            >
              <span>Access Pensr-1</span>
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </MagneticButton>
            <a href="#paper" className="font-mono text-sm text-mist hover:text-paper transition-colors underline underline-offset-4 decoration-line">
              Read the paper
            </a>
          </motion.div>
        </div>

        {/* Right column - 3D product pen */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex items-center justify-center relative h-[620px]"
        >
          {/* Floating ink particles */}
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cobalt"
              style={{
                width: p.size,
                height: p.size,
                left: `calc(50% + ${p.x}px)`,
                top: `calc(50% + ${p.y}px)`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* 3D Interactive Pen */}
          <motion.div
            style={{ y: combinedY, rotateZ: tiltX }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="relative flex items-center justify-center"
          >
            <svg width="160" height="600" viewBox="0 0 160 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Metallic barrel gradient */}
                <linearGradient id="barrelGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0D1B8E"/>
                  <stop offset="25%" stopColor="#1A3AFF"/>
                  <stop offset="50%" stopColor="#4D6FFF"/>
                  <stop offset="75%" stopColor="#1A3AFF"/>
                  <stop offset="100%" stopColor="#0A1260"/>
                </linearGradient>

                {/* Cap gradient */}
                <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0A0A1A"/>
                  <stop offset="30%" stopColor="#1C1C30"/>
                  <stop offset="60%" stopColor="#2A2A45"/>
                  <stop offset="100%" stopColor="#0A0A1A"/>
                </linearGradient>

                {/* Nib gradient */}
                <linearGradient id="nibGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8A9AFF"/>
                  <stop offset="50%" stopColor="#C5CEFF"/>
                  <stop offset="100%" stopColor="#8A9AFF"/>
                </linearGradient>

                {/* Shine highlight */}
                <linearGradient id="shineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="transparent"/>
                  <stop offset="40%" stopColor="rgba(255,255,255,0.08)"/>
                  <stop offset="55%" stopColor="rgba(255,255,255,0.18)"/>
                  <stop offset="70%" stopColor="rgba(255,255,255,0.04)"/>
                  <stop offset="100%" stopColor="transparent"/>
                </linearGradient>

                {/* Shadow blur */}
                <filter id="shadow" x="-50%" y="-10%" width="200%" height="120%">
                  <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#1A3AFF" floodOpacity="0.3"/>
                </filter>

                {/* Glow for nib tip */}
                <filter id="nibGlow">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>

                {/* Ink drop blur */}
                <filter id="inkBlur">
                  <feGaussianBlur stdDeviation="4"/>
                </filter>

                {/* Clip for barrel */}
                <clipPath id="barrelClip">
                  <rect x="52" y="100" width="56" height="370" rx="6"/>
                </clipPath>
              </defs>

              {/* Ambient glow behind pen */}
              <ellipse cx="80" cy="300" rx="45" ry="280" fill="#1A3AFF" opacity="0.06" filter="url(#inkBlur)"/>

              {/* CAP (top section, dark/premium) */}
              <rect x="54" y="20" width="52" height="85" rx="10" fill="url(#capGrad)" filter="url(#shadow)"/>
              {/* Cap shine */}
              <rect x="54" y="20" width="52" height="85" rx="10" fill="url(#shineGrad)"/>
              {/* Cap top rounded edge */}
              <ellipse cx="80" cy="20" rx="26" ry="6" fill="#1C1C30"/>
              {/* Cap bottom rim */}
              <rect x="54" y="98" width="52" height="6" rx="2" fill="#0D0D1E"/>
              <rect x="54" y="98" width="52" height="2" fill="#3D5AFE" opacity="0.6"/>

              {/* CLIP on cap */}
              <rect x="98" y="24" width="7" height="68" rx="3.5" fill="#1A1A2E"/>
              <rect x="99" y="24" width="2" height="68" rx="1" fill="#2A2A4E"/>
              <ellipse cx="101.5" cy="96" rx="4.5" ry="4.5" fill="#1A1A2E"/>
              {/* Clip highlight */}
              <rect x="100" y="28" width="1" height="55" rx="0.5" fill="rgba(255,255,255,0.12)"/>

              {/* BARREL (main body, cobalt blue metallic) */}
              <rect x="52" y="104" width="56" height="365" rx="6" fill="url(#barrelGrad)" filter="url(#shadow)"/>

              {/* Barrel shine overlay */}
              <rect x="52" y="104" width="56" height="365" rx="6" fill="url(#shineGrad)"/>

              {/* Barrel grip zone: matte rubber texture bands */}
              {gripBands.map((i) => (
                <rect key={i} x="52" y={370 + i * 7} width="56" height="4" rx="0" fill="rgba(0,0,0,0.25)"/>
              ))}

              {/* Grip zone highlight overlay */}
              <rect x="52" y="370" width="56" height="112" rx="0" fill="rgba(0,0,0,0.15)"/>
              {/* Grip left/right edge shadows */}
              <rect x="52" y="370" width="8" height="112" fill="rgba(0,0,0,0.2)"/>
              <rect x="100" y="370" width="8" height="112" fill="rgba(0,0,0,0.2)"/>

              {/* Brand ring at top of barrel */}
              <rect x="52" y="104" width="56" height="3" fill="#0A0F6E"/>
              <rect x="52" y="107" width="56" height="1.5" fill="#3D5AFE" opacity="0.8"/>

              {/* Logo text on barrel (PENSR-1 vertical) */}
              <text
                x="80" y="260"
                textAnchor="middle"
                fontFamily="'Bebas Neue', sans-serif"
                fontSize="11"
                letterSpacing="6"
                fill="rgba(255,255,255,0.12)"
                transform="rotate(90, 80, 260)"
              >
                PENSR-1
              </text>

              {/* Barrel side reflection lines */}
              <line x1="62" y1="108" x2="62" y2="468" stroke="rgba(255,255,255,0.06)" strokeWidth="3"/>
              <line x1="64" y1="108" x2="64" y2="468" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>

              {/* TAPER SECTION (barrel to nib) */}
              <path d="M52 469 L66 530 L94 530 L108 469 Z" fill="url(#barrelGrad)"/>
              <path d="M52 469 L66 530 L94 530 L108 469 Z" fill="url(#shineGrad)"/>
              {/* Taper shadow edges */}
              <line x1="52" y1="469" x2="66" y2="530" stroke="rgba(0,0,0,0.3)" strokeWidth="2"/>
              <line x1="108" y1="469" x2="94" y2="530" stroke="rgba(0,0,0,0.3)" strokeWidth="2"/>

              {/* NIB TIP (ballpoint) */}
              <rect x="66" y="530" width="28" height="40" rx="2" fill="url(#nibGrad)"/>
              {/* Nib center line */}
              <line x1="80" y1="530" x2="80" y2="570" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
              {/* Ballpoint tip */}
              <ellipse cx="80" cy="572" rx="4" ry="5" fill="#D0D8FF" filter="url(#nibGlow)"/>
              <ellipse cx="80" cy="572" rx="2" ry="2.5" fill="white"/>

              {/* INK DROP at tip — glowing */}
              <ellipse cx="80" cy="577" rx="3" ry="4" fill="#1A3AFF" opacity="0.8" filter="url(#inkBlur)"/>
              <ellipse cx="80" cy="578" rx="1.5" ry="2" fill="#6B8AFF" opacity="0.9"/>

              {/* ANNOTATION LINES (minimal, elegant) */}
              {/* Cap label */}
              <line x1="54" y1="55" x2="28" y2="55" stroke="#2A2A36" strokeWidth="0.75" strokeDasharray="3 3"/>
              <text x="26" y="53" textAnchor="end" fontFamily="'DM Mono', monospace" fontSize="8" fill="#8A8A9A">cap</text>
              <text x="26" y="63" textAnchor="end" fontFamily="'DM Mono', monospace" fontSize="7" fill="#3D5AFE">retractable</text>

              {/* Reservoir label */}
              <line x1="52" y1="220" x2="26" y2="220" stroke="#2A2A36" strokeWidth="0.75" strokeDasharray="3 3"/>
              <text x="24" y="218" textAnchor="end" fontFamily="'DM Mono', monospace" fontSize="8" fill="#8A8A9A">reservoir</text>
              <text x="24" y="228" textAnchor="end" fontFamily="'DM Mono', monospace" fontSize="7" fill="#3D5AFE">1.2km context</text>

              {/* Grip label */}
              <line x1="108" y1="425" x2="134" y2="425" stroke="#2A2A36" strokeWidth="0.75" strokeDasharray="3 3"/>
              <text x="136" y="423" fontFamily="'DM Mono', monospace" fontSize="8" fill="#8A8A9A">grip zone</text>
              <text x="136" y="433" fontFamily="'DM Mono', monospace" fontSize="7" fill="#3D5AFE">fine-tuned</text>

              {/* Nib label */}
              <line x1="108" y1="555" x2="134" y2="555" stroke="#2A2A36" strokeWidth="0.75" strokeDasharray="3 3"/>
              <text x="136" y="553" fontFamily="'DM Mono', monospace" fontSize="8" fill="#8A8A9A">nib — 0.7mm</text>
              <text x="136" y="563" fontFamily="'DM Mono', monospace" fontSize="7" fill="#3D5AFE">θ = 1 param</text>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-8 flex items-center gap-3"
      >
        <div className="w-px h-12 bg-line relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-cobalt"
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: '40%' }}
          />
        </div>
        <span className="section-label">Scroll</span>
      </motion.div>

      {/* Issue number top right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute top-24 right-8 text-right hidden md:block"
      >
        <p className="section-label">Issue No.</p>
        <p className="font-mono text-2xl text-line font-light">001943</p>
      </motion.div>
    </section>
  )
}
