'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Intro() {
  const [visible, setVisible] = useState(true)
  const [textVisible, setTextVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setTextVisible(true), 600)
    const t2 = setTimeout(() => setVisible(false), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: '#0A0A0E',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '32px'
          }}
        >
          {/* Animated data pulse SVG */}
          <svg width="200" height="4" viewBox="0 0 200 4">
            <line
              x1="0" y1="2" x2="200" y2="2"
              stroke="#a855f7" strokeWidth="2"
              strokeDasharray="200"
              strokeDashoffset="0"
              style={{
                strokeDashoffset: 200,
                animation: 'drawStroke 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s forwards'
              }}
            />
          </svg>

          {/* Logo text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={textVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '3rem',
              letterSpacing: '0.2em',
              color: '#F5F0E8'
            }}
          >
            PENSR
            <span style={{ color: '#a855f7', marginLeft: '8px' }}>1</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={textVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: '#8A8A9A',
              textTransform: 'uppercase'
            }}
          >
            The original analog model
          </motion.p>

          <style>{`
            @keyframes drawStroke {
              from { stroke-dashoffset: 200; }
              to { stroke-dashoffset: 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
