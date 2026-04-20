'use client'
import { useEffect, useState } from 'react'
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
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
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

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-[1400px] mx-auto px-8 pt-32 pb-16">
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
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line relative overflow-hidden max-w-3xl"
        >
          {/* Animated top border */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
            className="absolute top-0 left-0 right-0 h-px bg-cobalt"
          />
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
