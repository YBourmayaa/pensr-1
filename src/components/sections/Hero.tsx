'use client'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useSpring, useTransform, useScroll } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'
import FloatingPen from '@/components/ui/FloatingPen'

const words = ['essays.', 'novels.', 'manifestos.', 'love letters.', 'grocery lists.', 'resignation letters.', 'history.']

function useCountUp(target: number, duration: number, active: boolean, delayMs: number = 0): number {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let timeout: ReturnType<typeof setTimeout> | null = null
    let activeFrame: number
    
    timeout = setTimeout(() => {
      setValue(0)
      let startTime: number | null = null
      const easeOut = (t: number) => 1 - Math.pow(2, -10 * t)
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        setValue(target * easeOut(progress))
        if (progress < 1) {
          activeFrame = requestAnimationFrame(step)
        } else {
          setValue(target)
        }
      }
      activeFrame = requestAnimationFrame(step)
    }, delayMs)
    
    return () => {
      if (timeout) clearTimeout(timeout)
      if (activeFrame) cancelAnimationFrame(activeFrame)
    }
  }, [active, target, duration, delayMs])
  return value
}

const Cursor = () => (
  <span 
    className="animate-blink"
    style={{ 
      display: 'inline-block',
      color: '#a855f7',
      marginLeft: '2px'
    }}
  >|</span>
)

const verbs = ['Write', 'Think', 'Draft', 'Note']

export default function Hero() {
  const [verbIndex, setVerbIndex] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, -120])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  })
  
  const count1 = useCountUp(1.2, 1800, statsInView, 600)
  const count2 = useCountUp(300, 1600, statsInView, 600)
  const count3 = useCountUp(99.99, 2000, statsInView, 600)

  useEffect(() => {
    const int = setInterval(() => setVerbIndex(v => (v + 1) % verbs.length), 2000)
    return () => clearInterval(int)
  }, [])

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
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden w-full">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}
      />

      {/* Emerald gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)] pt-40 pb-24 flex flex-col items-center">
        
        {/* The new Pen background - modern ink diffusion pattern */}
        <FloatingPen className="absolute inset-0 w-[70%] md:w-[60%] mx-auto opacity-30 pointer-events-none z-0 flex items-center justify-center left-1/2 -translate-x-1/2 translate-y-[-5%]" />

        <div className="relative z-10 w-full flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-4 mb-12 justify-center"
          >
            <span className="tag !text-[#888] !border-[#222]">Analog weights — SOTA 2024</span>
            <span className="w-8 h-px bg-[#222]" />
            <span className="section-label !text-[#e0e0e0]">Capillary-Driven Ink Diffusion</span>
          </motion.div>

          {/* Main headline */}
          <div className="overflow-hidden mb-4 w-full">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="display text-[clamp(4rem,10vw,14rem)] text-[#ffffff] leading-none"
            >
              THE ORIGINAL
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8 w-full">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="display text-[clamp(4rem,10vw,14rem)] text-[#e0e0e0] leading-none"
            >
              TEXT MODEL
            </motion.h1>
          </div>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-baseline justify-center gap-3 mb-16 w-full"
          >
            <span className="font-mono text-[clamp(1.5rem,3vw,2.5rem)] text-[#a855f7]">{verbs[verbIndex]}</span>
            <Cursor />
            <span className="font-mono text-[clamp(1.5rem,3vw,2.5rem)] text-[#ffffff]">
              {displayed}
            </span>
          </motion.div>

          {/* Stats row */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-wrap justify-center gap-8 w-full bg-[#0a0a0a] border-y border-[#222] py-8 relative overflow-hidden"
          >
            {/* Animated top border */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
              className="absolute top-0 left-0 right-0 h-px bg-[#a855f7]"
            />
            {[
              { label: 'Context window', value: count1.toFixed(1), unit: 'km', sub: 'unlimited local' },
              { label: 'Throughput', value: Math.round(count2).toString(), unit: 'words/min', sub: 'peak capability' },
              { label: 'Uptime', value: count3.toFixed(2), unit: '%', sub: 'Est. 2024' },
              { label: 'Cost', value: 'Free', unit: '', sub: 'open-weight' },
            ].map((stat) => (
              <div key={stat.label} className="group hover:bg-[#111] transition-colors flex flex-col items-center min-w-[160px]">
                <div className="w-full text-center">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#888] mb-3">{stat.label}</p>
                  <p className="display text-4xl text-[#fff] group-hover:text-[#a855f7] transition-colors mb-1">
                    {stat.value}<span className="text-xl ml-1 text-[#888]">{stat.unit}</span>
                  </p>
                </div>
                <div className="w-full max-w-[120px]">
                  <svg width="100%" height="2" style={{ display: 'block', marginTop: '6px' }}>
                    <line
                      x1="0" y1="1" x2="100%" y2="1"
                      stroke="#a855f7"
                      strokeWidth="1.5"
                      strokeDasharray="200"
                      style={{
                        strokeDashoffset: statsInView ? 0 : 200,
                        transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s',
                      }}
                    />
                  </svg>
                  <p className="font-mono text-xs text-[#888] mt-3">{stat.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-wrap justify-center gap-4 mt-12 w-full"
          >
            <MagneticButton
              href="#pricing"
              className="group flex flex-shrink-0 items-center justify-center gap-3 px-8 py-4 bg-[#a855f7] hover:bg-[#059669] text-[#050505] font-medium transition-colors duration-300 pointer-events-auto z-[100]"
            >
              <span>Experience Pensr-1</span>
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </MagneticButton>
            <a href="#paper" className="font-mono text-sm text-[#888] hover:text-[#fff] transition-colors underline underline-offset-4 decoration-line pointer-events-auto z-50 relative">
              Read the paper
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
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


    </section>
  )
}
