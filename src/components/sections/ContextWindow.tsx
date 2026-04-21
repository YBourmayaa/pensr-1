'use client'
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useMotionValue, animate } from 'framer-motion'

const milestones = [
  { label: 'Single page', position: '0%', words: '1' },
  { label: 'Short story', position: '5%', words: '~2,500' },
  { label: 'Manuscript', position: '20%', words: '~50,000' },
  { label: 'Typewriter limit', position: '10%', words: '~128,000' },
  { label: 'Public Library', position: '60%', words: '~500,000' },
  { label: 'Pensr limit', position: '100%', words: 'Unlimited*' },
]

export default function ContextWindow() {
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)
  const { ref: inkRef, inView: inkInView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const progress = useMotionValue(0)
  const [dotX, setDotX] = useState(0)
  const [dotY, setDotY] = useState(30)

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [])

  useEffect(() => {
    if (!inkInView || !pathRef.current || pathLength === 0) return
    const controls = animate(progress, 1, {
      duration: 2.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const pt = pathRef.current!.getPointAtLength(v * pathLength)
        setDotX(pt.x)
        setDotY(pt.y)
      }
    })
    return () => controls.stop()
  }, [inkInView, pathLength])

  return (
    <section ref={inkRef} className="py-32 border-t border-line overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inkInView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <p className="section-label mb-4">Architecture insight</p>
          <h2 className="display text-[clamp(3rem,6vw,7rem)] leading-none text-paper mb-6">
            UNLIMITED CONTEXT.<br />
            <span className="text-cobalt">SERIOUSLY.</span>
          </h2>
          <p className="text-mist max-w-xl leading-relaxed">
            Pensr-1 holds your full manuscript in context — public library included. No silent truncation. 
            No loss of focus. We tell you upfront: the limit is your hand speed, not our model.
          </p>
        </motion.div>

        {/* Ink line visualization */}
        <div ref={inkRef} className="relative mb-20">
          <svg width="100%" height="60" viewBox="0 0 1200 60" preserveAspectRatio="none">
            {/* Glow path behind */}
            <path
              d="M 0 30 C 200 15, 400 45, 600 25 S 900 45, 1200 30"
              stroke="var(--cobalt)"
              strokeWidth="8"
              fill="none"
              opacity="0.08"
            />
            {/* Main animated path */}
            <path
              ref={pathRef}
              d="M 0 30 C 200 15, 400 45, 600 25 S 900 45, 1200 30"
              stroke="var(--cobalt)"
              strokeWidth="2"
              fill="none"
              strokeDasharray={pathLength || 1300}
              strokeDashoffset={inkInView ? 0 : pathLength || 1300}
              style={{ transition: `stroke-dashoffset 2.8s cubic-bezier(0.16,1,0.3,1)` }}
            />
            {/* Moving ink droplet */}
            {inkInView && (
              <circle cx={dotX} cy={dotY} r="5" fill="var(--cobalt)" />
            )}
          </svg>

          {/* Milestone markers */}
          <div className="relative mt-4 h-12">
            {[
              { label: 'Single page', pct: 0 },
              { label: 'Short story', pct: 20 },
              { label: 'Manuscript', pct: 40 },
              { label: 'Typewriter limit', pct: 60 },
              { label: 'Public Library', pct: 80 },
              { label: 'Pensr limit', pct: 100 },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 8 }}
                animate={inkInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="absolute"
                style={{
                  left: `${m.pct}%`,
                  transform: m.pct === 100 ? 'translateX(-100%)' : m.pct > 0 ? 'translateX(-50%)' : undefined
                }}
              >
                <div className="w-px h-3 bg-line mx-auto mb-1" />
                <p className="font-mono text-xs text-mist whitespace-nowrap">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-line border border-line mt-24">
          {[
            { title: 'GPT-4', limit: '128,000 tokens', desc: 'Hard limit. Your 300k-page manuscript gets truncated silently.', color: 'text-mist' },
            { title: 'Typewriter', limit: '~10,000 words', desc: 'Line-level context only. It has never seen your whole story.', color: 'text-mist' },
            { title: 'Pensr-1', limit: 'Unlimited*', desc: 'Soft limit (Pages). We tell you upfront. No silent truncation.', color: 'text-cobalt' },
            { title: 'Pensr Pro', limit: '∞++', desc: 'Gravity-offloaded context. Your whole library\'s history. We’re serious.', color: 'text-paper' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inkInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-ink p-8 hover:bg-dim transition-colors"
            >
              <p className="section-label mb-4">{item.title}</p>
              <p className={`display text-3xl mb-4 ${item.color}`}>{item.limit}</p>
              <p className="text-mist text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
