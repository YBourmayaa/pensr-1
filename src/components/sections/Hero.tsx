'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, -120])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true })

  const count1 = useCountUp(1.2, 1800, statsInView)
  const count2 = useCountUp(300, 1800, statsInView)
  const count3 = useCountUp(99.99, 2000, statsInView)

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
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
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

        {/* Right column - pen SVG */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originY: 0.1 }}
          >
            <svg
              width="120"
              height="520"
              viewBox="0 0 120 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Engineering grid background */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F5F0E8" strokeWidth="0.3" opacity="0.08"/>
                </pattern>
              </defs>
              <rect width="120" height="520" fill="url(#grid)" />

              {/* Cap */}
              <rect x="42" y="10" width="36" height="70" rx="8" fill="#1A3AFF" />
              <rect x="42" y="68" width="36" height="8" fill="#3D5AFE" />
              {/* Clip */}
              <rect x="70" y="14" width="5" height="55" rx="2.5" fill="#3D5AFE" />
              <circle cx="72.5" cy="72" r="4" fill="#3D5AFE" />

              {/* Barrel body */}
              <rect x="44" y="76" width="32" height="320" rx="4" fill="#1C1C24" stroke="#2A2A36" strokeWidth="1" />

              {/* Brand stripe */}
              <rect x="44" y="120" width="32" height="2" fill="#1A3AFF" opacity="0.6" />
              <rect x="44" y="126" width="32" height="1" fill="#2A2A36" />

              {/* Grip zone texture lines */}
              {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => (
                <line
                  key={i}
                  x1="44" y1={350 + i * 6} x2="76" y2={350 + i * 6}
                  stroke="#2A2A36" strokeWidth="1.5"
                />
              ))}

              {/* Grip zone label */}
              <text x="84" y="382" fontFamily="DM Mono, monospace" fontSize="8" fill="#8A8A9A">grip zone</text>
              <line x1="78" y1="378" x2="84" y2="378" stroke="#2A2A36" strokeWidth="0.5" strokeDasharray="2 2" />

              {/* Taper to nib */}
              <path d="M44 396 L60 440 L76 396 Z" fill="#1C1C24" stroke="#2A2A36" strokeWidth="1" />

              {/* Nib */}
              <path d="M56 440 L60 510 L64 440 Z" fill="#1A3AFF" />
              <circle cx="60" cy="510" r="2.5" fill="#3D5AFE" />

              {/* Annotation lines */}
              {/* Cap label */}
              <line x1="78" y1="44" x2="96" y2="44" stroke="#2A2A36" strokeWidth="0.5" strokeDasharray="3 2" />
              <text x="98" y="47" fontFamily="DM Mono, monospace" fontSize="7.5" fill="#8A8A9A">retractable cap</text>

              {/* Reservoir label */}
              <line x1="76" y1="200" x2="94" y2="200" stroke="#2A2A36" strokeWidth="0.5" strokeDasharray="3 2" />
              <text x="96" y="197" fontFamily="DM Mono, monospace" fontSize="7.5" fill="#8A8A9A">ink reservoir</text>
              <text x="96" y="207" fontFamily="DM Mono, monospace" fontSize="7.5" fill="#1A3AFF">1.2km context</text>

              {/* Nib label */}
              <line x1="64" y1="500" x2="82" y2="490" stroke="#2A2A36" strokeWidth="0.5" strokeDasharray="3 2" />
              <text x="84" y="487" fontFamily="DM Mono, monospace" fontSize="7.5" fill="#8A8A9A">0.7mm nib</text>
              <text x="84" y="497" fontFamily="DM Mono, monospace" fontSize="7.5" fill="#1A3AFF">θ = 1 param</text>

              {/* Dimension arrow — full height */}
              <line x1="18" y1="10" x2="18" y2="510" stroke="#2A2A36" strokeWidth="0.5" />
              <line x1="14" y1="10" x2="22" y2="10" stroke="#2A2A36" strokeWidth="0.5" />
              <line x1="14" y1="510" x2="22" y2="510" stroke="#2A2A36" strokeWidth="0.5" />
              <text x="4" y="265" fontFamily="DM Mono, monospace" fontSize="7" fill="#8A8A9A" transform="rotate(-90, 4, 265)">148mm</text>
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

