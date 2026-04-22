'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

export default function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [clicked, setClicked] = useState(false)
  const [hovering, setHovering] = useState(false)
  const trailRef = useRef<{ x: number; y: number; id: number }[]>([])
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])
  const idRef = useRef(0)

  const fastSpring = { stiffness: 500, damping: 40 }
  const slowSpring = { stiffness: 80, damping: 22 }

  const fastX = useSpring(cursorX, fastSpring)
  const fastY = useSpring(cursorY, slowSpring)
  const slowX = useSpring(cursorX, slowSpring)
  const slowY = useSpring(cursorY, slowSpring)

  useEffect(() => {
    let lastMouseX = -100
    let lastMouseY = -100

    const move = (e: MouseEvent) => {
      lastMouseX = e.clientX
      lastMouseY = e.clientY
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      const id = idRef.current++
      setTrail(prev => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id }])
    }

    const handleScroll = () => {
      // Update cursor position during scroll to prevent freeze
      cursorX.set(lastMouseX)
      cursorY.set(lastMouseY)
    }

    const down = () => setClicked(true)
    const up = () => setClicked(false)

    // Re-bind hover listeners on interval to catch dynamic elements
    const bindHover = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => setHovering(true))
        el.addEventListener('mouseleave', () => setHovering(false))
      })
    }
    bindHover()
    const interval = setInterval(bindHover, 2000)

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mousedown', down, { passive: true })
    window.addEventListener('mouseup', up, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {/* Ink trail */}
      <AnimatePresence>
        {trail.map((dot, i) => (
          <motion.div
            key={dot.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: dot.x - 2,
              top: dot.y - 2,
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: 'white',
              mixBlendMode: 'difference',
              pointerEvents: 'none',
              zIndex: 9996,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Outer ring — slow, lagging */}
      <motion.div
        style={{
          position: 'fixed',
          left: slowX,
          top: slowY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'difference',
        }}
      >
        <motion.div
          animate={{
            width: hovering ? 56 : clicked ? 18 : 38,
            height: hovering ? 56 : clicked ? 18 : 38,
          }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
          style={{
            borderRadius: '50%',
            border: '1.5px solid white',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>

      {/* Inner dot — fast, sharp */}
      <motion.div
        style={{
          position: 'fixed',
          left: fastX,
          top: fastY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      >
        <motion.div
          animate={{
            width: clicked ? 14 : hovering ? 8 : 6,
            height: clicked ? 14 : hovering ? 8 : 6,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{
            borderRadius: '50%',
            background: 'white',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>

      {/* "write" label on hover */}
      <AnimatePresence>
        {hovering && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            style={{
              position: 'fixed',
              left: slowX,
              top: slowY,
              translateX: '18px',
              translateY: '-20px',
              pointerEvents: 'none',
              zIndex: 9999,
              fontFamily: "'DM Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'white',
              mixBlendMode: 'difference',
            }}
          >
            write
          </motion.p>
        )}
      </AnimatePresence>
    </>
  )
}
