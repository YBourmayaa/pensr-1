'use client'
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useMotionValue, animate } from 'framer-motion'

const milestones = [
  { label: 'First word', position: '0%', words: '1' },
  { label: 'Shopping list', position: '0.01%', words: '~50' },
  { label: 'Cover letter', position: '0.1%', words: '~500' },
  { label: 'Short story', position: '0.5%', words: '~2,500' },
  { label: 'Novel chapter', position: '2%', words: '~10,000' },
  { label: 'Full novel', position: '15%', words: '~80,000' },
  { label: 'GPT-4 context', position: '10%', words: '~128,000' },
  { label: 'Pensr-1 limit', position: '100%', words: '~600,000+' },
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
            1.2KM OF<br />
            <span className="text-cobalt">PURE CONTEXT</span>
          </h2>
          <p className="text-mist max-w-xl leading-relaxed">
            Unrolled, the Pensr-1 ink reservoir extends 1.2 kilometers — enough to write approximately 
            600,000 words without a refill. That is 4.5 copies of War and Peace, with ink to spare.
          </p>
        </motion.div>

        {/* Ink line visualization */}
        <div ref={inkRef} className="relative mb-20">
          <svg width="100%" height="60" viewBox="0 0 1200 60" preserveAspectRatio="none">
            {/* Glow path behind */}
            <path
              d="M 0 30 C 200 15, 400 45, 600 25 S 900 45, 1200 30"
              stroke="#1A3AFF"
              strokeWidth="8"
              fill="none"
              opacity="0.08"
            />
            {/* Main animated path */}
            <path
              ref={pathRef}
              d="M 0 30 C 200 15, 400 45, 600 25 S 900 45, 1200 30"
              stroke="#1A3AFF"
              strokeWidth="2"
              fill="none"
              strokeDasharray={pathLength || 1300}
              strokeDashoffset={inkInView ? 0 : pathLength || 1300}
              style={{ transition: `stroke-dashoffset 2.8s cubic-bezier(0.16,1,0.3,1)` }}
            />
            {/* Moving ink droplet */}
            {inkInView && (
              <circle cx={dotX} cy={dotY} r="5" fill="#1A3AFF" />
            )}
          </svg>

          {/* Milestone markers */}
          <div className="relative mt-4 h-12">
            {[
              { label: 'First word', pct: 0 },
              { label: 'Cover letter', pct: 20 },
              { label: 'Short story', pct: 40 },
              { label: 'Novel', pct: 60 },
              { label: 'GPT-4 max', pct: 80 },
              { label: 'Pensr-1 limit', pct: 100 },
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line mt-24">
          {[
            { title: 'Transformer models', limit: '128,000 tokens', desc: 'Hard limit. Exceeding it causes errors, truncation, or unexpected behavior. You pay per token.', color: 'text-mist' },
            { title: 'Pensr-1', limit: '1,200,000mm', desc: 'Soft limit. You run out of ink. We tell you upfront. No unexpected behavior — just write less. Refill available.', color: 'text-cobalt' },
            { title: 'Pensr Pro (refill)', limit: '3,600,000mm', desc: 'Extended context via standard ink cartridge. No retraining. No re-embedding. Just insert and continue.', color: 'text-paper' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inkInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-ink p-8 hover:bg-dim transition-colors"
            >
              <p className="section-label mb-4">{item.title}</p>
              <p className={`display text-4xl mb-4 ${item.color}`}>{item.limit}</p>
              <p className="text-mist text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
