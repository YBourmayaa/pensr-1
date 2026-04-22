'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const events = [
  {
    year: '1950s',
    era: 'Pre-analog',
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
    year: '2024',
    era: 'Frontier release',
    title: 'Pensr-1 A0B',
    desc: 'State-of-the-art ballpoint model. 0.7mm nib. 1.2km context. Open-weight.',
    highlight: true,
  },
]

function TimelineCard({ e, i }: { e: any, i: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.12 }}
      className="snap-start"
      style={{
        width: '320px',
        flexShrink: 0,
        height: '450px',
        borderRight: '1px solid #2A2A36',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '32px',
        background: e.highlight ? '#111111' : 'transparent',
        borderLeft: e.highlight ? '3px solid #a855f7' : '1px solid transparent',
        transition: 'background 0.3s, border-left 0.3s',
      }}
    >
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: e.highlight ? '#a855f7' : '#8A8A9A', marginBottom: '16px' }}>{e.era}</p>
      <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '3.5rem', lineHeight: 0.9, color: e.highlight ? '#a855f7' : '#2A2A36', marginBottom: '8px' }}>{e.year}</p>
      <h3 style={{ fontSize: '18px', fontWeight: 500, color: '#e0e0e0', marginBottom: '12px' }}>{e.title}</h3>
      <p style={{ fontSize: '12px', lineHeight: 1.5, color: e.highlight ? '#e0e0e0' : '#8A8A9A' }}>{e.desc}</p>
      {e.highlight && (
        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(245,240,232,0.2)' }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a855f7' }}>Current SOTA</span>
        </div>
      )}
    </motion.div>
  )
}

export default function Timeline() {
  const { ref: headerRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="relative border-t border-line py-32 bg-ink overflow-hidden">
      <div ref={headerRef} className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)] pb-16 flex-shrink-0">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mist)', marginBottom: '12px' }}>
            History of text generation
          </p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 4vw, 5rem)', lineHeight: 0.92, letterSpacing: '0.02em', color: 'var(--paper)' }}>
            EVERY MODEL<br />
            <span style={{ color: '#a855f7' }}>BEFORE PENSR-1</span>
          </h2>
        </motion.div>
      </div>

      <div 
        className="w-full overflow-x-auto snap-x snap-mandatory flex no-scrollbar"
      >
        <div className="flex bg-dim border-y border-line pl-[clamp(1.5rem,5vw,4rem)]">
          {events.map((e, i) => (
            <TimelineCard key={i} e={e} i={i} />
          ))}
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)] pt-8 flex items-center gap-3">
        <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#8A8A9A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A8A9A' }}>
          Scroll horizontally to travel through time
        </span>
      </div>
    </section>
  )
}
