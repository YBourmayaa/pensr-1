'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

export default function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [clicked, setClicked] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])
  const trailIdRef = useRef(0)

  const springConfig = { stiffness: 400, damping: 35 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  const slowSpringX = useSpring(cursorX, { stiffness: 80, damping: 20 })
  const slowSpringY = useSpring(cursorY, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Add ink trail dot
      const id = trailIdRef.current++
      setTrail(prev => [...prev.slice(-10), { x: e.clientX, y: e.clientY, id }])
    }

    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)

    const onEnterLink = () => setHovering(true)
    const onLeaveLink = () => setHovering(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <>
      {/* Ink trail dots — fade out behind cursor */}
      <AnimatePresence>
        {trail.map((dot, i) => (
          <motion.div
            key={dot.id}
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: dot.x - 2,
              top: dot.y - 2,
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: '#1A3AFF',
              pointerEvents: 'none',
              zIndex: 9997,
              opacity: (i / trail.length) * 0.4,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Outer ring — slow lag, expands on hover */}
      <motion.div
        style={{
          position: 'fixed',
          left: slowSpringX,
          top: slowSpringY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      >
        <motion.div
          animate={{
            width: hovering ? 52 : clicked ? 20 : 36,
            height: hovering ? 52 : clicked ? 20 : 36,
            borderColor: hovering ? '#1A3AFF' : 'rgba(26,58,255,0.4)',
            backgroundColor: hovering ? 'rgba(26,58,255,0.08)' : 'transparent',
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{
            borderRadius: '50%',
            border: '1px solid rgba(26,58,255,0.4)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>

      {/* Inner nib dot — sharp, fast */}
      <motion.div
        style={{
          position: 'fixed',
          left: springX,
          top: springY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        <motion.div
          animate={{
            width: clicked ? 12 : hovering ? 6 : 5,
            height: clicked ? 12 : hovering ? 6 : 5,
            backgroundColor: clicked ? '#4D6FFF' : '#1A3AFF',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 8px rgba(26,58,255,0.6)',
          }}
        />
      </motion.div>

      {/* Hover label — shows "write" when hovering CTA buttons */}
      <AnimatePresence>
        {hovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'fixed',
              left: slowSpringX,
              top: slowSpringY,
              translateX: '16px',
              translateY: '-24px',
              pointerEvents: 'none',
              zIndex: 9999,
              fontFamily: "'DM Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.1em',
              color: '#1A3AFF',
              textTransform: 'uppercase',
            }}
          >
            write
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
