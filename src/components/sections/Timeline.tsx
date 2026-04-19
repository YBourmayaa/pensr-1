'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const events = [
  { year: '3000 BCE', era: 'Pre-analog', title: 'Clay tablets', desc: 'First persistent storage. Context window: one tablet. No undo.', highlight: false },
  { year: '3000 BCE', era: 'Pre-analog', title: 'Papyrus', desc: 'Extended context via scroll format. Introduced horizontal reading. First UX controversy.', highlight: false },
  { year: '1450', era: 'Mechanical', title: 'Gutenberg press', desc: 'First batch inference. Parallelized token generation. 180 copies per run.', highlight: false },
  { year: '1873', era: 'Analog compute', title: 'Typewriter v1', desc: 'First mechanical token generation. 40 WPM throughput. Loud. No backspace.', highlight: false },
  { year: '1943', era: 'Frontier release', title: 'Pensr-1 A0B', desc: 'State-of-the-art ballpoint model. 0.7mm nib. 1.2km context. Open-weight.', highlight: true },
  { year: '1984', era: 'Digital era', title: 'Word processor', desc: 'First RAG implementation (Really Annoying GUI). Introduced hallucinated formatting.', highlight: false },
  { year: '2020', era: 'LLM era', title: 'GPT-3', desc: '175B parameters. $0.06 per 1K tokens. Impressive. 7,500x more expensive than Pensr.', highlight: false },
  { year: '2025', era: 'Still running', title: 'Pensr-1 — no updates', desc: 'Zero incidents since 1943. No patches. No breaking changes. No deprecation notice.', highlight: false },
]

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-55%'])
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={containerRef} className="py-32 border-t border-line overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 mb-16" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="section-label mb-4">History of text generation</p>
          <h2 className="display text-[clamp(3rem,6vw,7rem)] leading-none text-paper">
            EVERY MODEL<br />
            <span className="text-cobalt">BEFORE PENSR</span>
          </h2>
        </motion.div>
      </div>

      <div className="overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex"
        >
          {events.map((e, i) => (
            <div
              key={i}
              className={`flex-shrink-0 w-[320px] min-h-[420px] border-r border-line flex flex-col justify-end p-12 transition-colors ${
                e.highlight ? 'bg-cobalt' : 'bg-ink hover:bg-dim'
              }`}
            >
              <p className={`section-label mb-4 ${e.highlight ? 'text-cobalt2' : ''}`}>{e.era}</p>
              <p className={`display text-6xl leading-none mb-4 ${e.highlight ? 'text-paper' : 'text-line group-hover:text-mist'}`}>
                {e.year}
              </p>
              <h3 className={`text-xl font-medium mb-3 ${e.highlight ? 'text-paper' : 'text-paper'}`}>{e.title}</h3>
              <p className={`text-sm leading-relaxed ${e.highlight ? 'text-cobalt2' : 'text-mist'}`}>{e.desc}</p>
              {e.highlight && (
                <div className="mt-6 pt-6 border-t border-cobalt2/40">
                  <span className="font-mono text-xs text-cobalt2 uppercase tracking-widest">Current SOTA</span>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 mt-6">
        <p className="font-mono text-xs text-line">Scroll down to travel through time. Or just read left to right like it's 1943.</p>
      </div>
    </section>
  )
}
