'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const events = [
  {
    year: '3000 BCE',
    era: 'Pre-analog',
    title: 'Clay tablets',
    desc: 'First persistent storage. Context window: one tablet. No undo.',
    highlight: false,
  },
  {
    year: '3000 BCE',
    era: 'Pre-analog',
    title: 'Papyrus',
    desc: 'Extended context via scroll format. Introduced horizontal reading. First UX controversy.',
    highlight: false,
  },
  {
    year: '1450',
    era: 'Mechanical',
    title: 'Gutenberg press',
    desc: 'First batch inference. Parallelized token generation. 180 copies per run.',
    highlight: false,
  },
  {
    year: '1873',
    era: 'Analog compute',
    title: 'Typewriter v1',
    desc: 'First mechanical token generation. 40 WPM throughput. Loud. No backspace.',
    highlight: false,
  },
  {
    year: '1943',
    era: 'Frontier release',
    title: 'Pensr-1 A0B',
    desc: 'State-of-the-art ballpoint model. 0.7mm nib. 1.2km context. Open-weight.',
    highlight: true,
  },
  {
    year: '1984',
    era: 'Digital era',
    title: 'Word processor',
    desc: 'First RAG implementation (Really Annoying GUI). Introduced hallucinated formatting.',
    highlight: false,
  },
  {
    year: '2020',
    era: 'LLM era',
    title: 'GPT-3',
    desc: '175B parameters. $0.06 per 1K tokens. Impressive. 7,500x more expensive than Pensr.',
    highlight: false,
  },
  {
    year: '2025',
    era: 'Still running',
    title: 'Pensr-1 — no updates',
    desc: 'Zero incidents since 1943. No patches. No breaking changes. No deprecation notice.',
    highlight: false,
  },
]

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref: headerRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // 8 cards × 320px = 2560px total width; subtract ~1 viewport width to end at last card
  const x = useTransform(scrollYProgress, [0, 1], ['0px', '-2240px'])

  return (
    // Tall section — height drives how long the horizontal scroll lasts
    <section
      ref={containerRef}
      className="relative border-t border-line"
      style={{ height: '400vh' }}
    >
      {/* Sticky wrapper — stays in view while section scrolls */}
      <div className="sticky top-9 h-screen overflow-hidden flex flex-col">

        {/* Header — shown above the scrolling cards */}
        <div ref={headerRef} className="max-w-[1400px] mx-auto px-8 pt-16 pb-10 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#8A8A9A',
                marginBottom: '12px',
              }}
            >
              History of text generation
            </p>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.5rem, 5vw, 6rem)',
                lineHeight: 0.92,
                letterSpacing: '0.02em',
                color: '#F5F0E8',
              }}
            >
              EVERY MODEL<br />
              <span style={{ color: '#1A3AFF' }}>BEFORE PENSR</span>
            </h2>
          </motion.div>
        </div>

        {/* Horizontally scrolling cards */}
        <div className="flex-1 overflow-hidden flex items-end">
          <motion.div
            style={{ x }}
            className="flex h-full will-change-transform"
          >
            {events.map((e, i) => (
              <div
                key={i}
                style={{
                  width: '320px',
                  flexShrink: 0,
                  height: '100%',
                  borderRight: '1px solid #2A2A36',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '48px',
                  background: e.highlight ? '#1A3AFF' : 'transparent',
                  transition: 'background 0.3s',
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: e.highlight ? 'rgba(245,240,232,0.6)' : '#8A8A9A',
                    marginBottom: '16px',
                  }}
                >
                  {e.era}
                </p>
                <p
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '5rem',
                    lineHeight: 0.9,
                    color: e.highlight ? '#F5F0E8' : '#2A2A36',
                    marginBottom: '16px',
                  }}
                >
                  {e.year}
                </p>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 500,
                    color: '#F5F0E8',
                    marginBottom: '12px',
                  }}
                >
                  {e.title}
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: e.highlight ? 'rgba(245,240,232,0.7)' : '#8A8A9A',
                  }}
                >
                  {e.desc}
                </p>
                {e.highlight && (
                  <div
                    style={{
                      marginTop: '24px',
                      paddingTop: '24px',
                      borderTop: '1px solid rgba(245,240,232,0.2)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '10px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'rgba(245,240,232,0.5)',
                      }}
                    >
                      Current SOTA
                    </span>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '48px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10H16M16 10L11 5M16 10L11 15"
                stroke="#2A2A36"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#2A2A36',
            }}
          >
            Scroll to travel through time
          </span>
        </div>
      </div>
    </section>
  )
}
