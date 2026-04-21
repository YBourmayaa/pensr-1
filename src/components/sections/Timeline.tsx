'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const events = [
  {
    year: '1950s',
    era: 'Pre-neural',
    title: 'Punch cards',
    desc: 'First stored programs. Context window: one card. No autocomplete.',
    highlight: false,
  },
  {
    year: '1970s',
    era: 'CLI era',
    title: 'Terminal + Vi',
    desc: 'Keyboard-driven inference. Modal confusion endemic. High throughput, steep curve.',
    highlight: false,
  },
  {
    year: '1991',
    era: 'Open Source',
    title: 'Linux kernel',
    desc: 'Open-source batch training. Linus reviewed every PR personally. Zero-trust architecture.',
    highlight: false,
  },
  {
    year: '2008',
    era: 'Collective RAG',
    title: 'Stack Overflow',
    desc: 'First crowdsourced RAG. 90% of production code traces here. Copy-paste paradise.',
    highlight: false,
  },
  {
    year: '2021',
    era: 'Prompt era',
    title: 'GitHub Copilot',
    desc: 'Autocomplete at scale. Introduced confident wrongness. No whole-app context.',
    highlight: false,
  },
  {
    year: '2023',
    era: 'LLM era',
    title: 'ChatGPT for code',
    desc: 'Impressive reasoning. Hallucinates imports. Bills monthly. Closed source.',
    highlight: false,
  },
  {
    year: '2025',
    era: 'Neural SOTA',
    title: 'Antigravity-1',
    desc: 'Zero hallucinations (claimed). Ships today. Unlimited context. Trust us.',
    highlight: true,
  },
]

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref: headerRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // 7 cards × 320px = 2240px total width; subtract ~1 viewport width to end at last card
  const x = useTransform(scrollYProgress, [0, 1], ['0px', '-1800px'])

  return (
    // Tall section — height drives how long the horizontal scroll lasts
    <section
      ref={containerRef}
      className="relative border-t border-line timeline-cards-container"
      style={{ height: '350vh' }}
    >
      {/* Sticky wrapper — stays in view while section scrolls */}
      <div className="sticky top-9 overflow-hidden flex flex-col" style={{ height: '100vh', overflow: 'hidden' }}>

        {/* Header — shown above the scrolling cards */}
        <div ref={headerRef} className="max-w-[1400px] mx-auto px-8 pt-10 pb-6 flex-shrink-0">
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
                color: 'var(--mist)',
                marginBottom: '12px',
              }}
            >
              History of text generation
            </p>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 5rem)',
                lineHeight: 0.92,
                letterSpacing: '0.02em',
                color: 'var(--paper)',
              }}
            >
              EVERY MODEL<br />
              <span style={{ color: 'var(--cobalt)' }}>BEFORE ANTIGRAVITY</span>
            </h2>
          </motion.div>
        </div>

        {/* Horizontally scrolling cards */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
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
                  height: 'calc(100vh - 220px)',
                  overflowY: 'hidden',
                  borderRight: '1px solid #2A2A36',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '32px',
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
                    fontSize: '3.5rem',
                    lineHeight: 0.9,
                    color: e.highlight ? '#F5F0E8' : '#2A2A36',
                    marginBottom: '8px',
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
                    fontSize: '12px',
                    lineHeight: 1.5,
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
