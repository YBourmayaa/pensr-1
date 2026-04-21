'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const CpuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="15" x2="4" y2="15" />
  </svg>
)

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const ZapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const BoxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
)

const SlackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13.91V10c0-3.35-2.73-6.13-6.08-6.13a6.08 6.08 0 0 0-6.08 6.13v3.91c0 3.35 2.73 6.13 6.08 6.13a6.08 6.08 0 0 0 6.08-6.13z" />
    <path d="M6 10h12" />
    <path d="M12 21V11" />
  </svg>
)

const features = [
  {
    icon: CpuIcon,
    number: '01',
    title: 'RTP™ Inference Engine',
    sub: 'Recursive Thought Propagation',
    desc: 'Recursive Thought Propagation drives output at 1.2M LOC/s. Deterministic. Never cached. Never wrong (terms apply).',
    stat: '1.2M',
    statLabel: 'LOC/s',
    wide: true,
  },
  {
    icon: CodeIcon,
    number: '02',
    title: 'Unlimited Context',
    sub: 'Entire codebase integration',
    desc: 'Antigravity-1 holds your entire codebase in context. All of it. Even the parts you forgot existed. No silent truncation.',
    stat: '∞',
    statLabel: 'tokens',
    wide: false,
  },
  {
    icon: ShieldIcon,
    number: '03',
    title: 'Zero Hallucination',
    sub: 'Guaranteed output fidelity',
    desc: 'Outputs exactly the code you needed. No invented APIs. No deprecated imports. No confident wrongness.',
    stat: '0.000%',
    statLabel: 'claimed rate',
    wide: false,
  },
  {
    icon: ZapIcon,
    number: '04',
    title: 'Quantum-Entangled Debugging',
    sub: 'Parallelized fixes',
    desc: 'Bug detected in one function? Antigravity fixes it across all 47 files simultaneously. Physics: mostly.',
    stat: '47x',
    statLabel: 'leverage',
    wide: false,
  },
  {
    icon: BoxIcon,
    number: '05',
    title: 'Truly Open-Weight',
    sub: 'Universal Neural License',
    desc: 'Released under the Universal Neural License. Use it for research, production, or your side project that will definitely launch this time.',
    stat: 'UNL',
    statLabel: 'license',
    wide: false,
  },
  {
    icon: SlackIcon,
    number: '06',
    title: 'Automated Coworker Deflection',
    sub: 'Slack integration support',
    desc: 'Antigravity-1 drafts your "I\'m blocked on infra" Slack messages so you can keep shipping. Zero friction communication.',
    stat: '100%',
    statLabel: 'deflection rate',
    wide: true,
  },
]

export default function Features() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="features" ref={ref} className="py-32 border-t border-line">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-end justify-between mb-20"
        >
          <div>
            <p className="section-label mb-4">Capabilities</p>
            <h2 className="display text-[clamp(3rem,6vw,7rem)] leading-none text-paper">
              WHAT ANTIGRAVITY<br />
              <span className="text-cobalt">ACTUALLY DOES</span>
            </h2>
          </div>
          <p className="hidden md:block text-mist max-w-xs text-right leading-relaxed">
            Six reasons Antigravity-1 outperforms every model that makes you wait.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`bg-ink hover:bg-dim transition-colors duration-300 p-10 flex flex-col group ${f.wide ? 'lg:col-span-1' : ''}`}
              >
                {/* Icon */}
                <div className="w-10 h-10 text-cobalt mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Icon />
                </div>

                {/* Number + title */}
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-mono text-xs text-line mt-1">{f.number}</span>
                  <div>
                    <h3 className="text-paper font-medium text-lg leading-tight mb-1">{f.title}</h3>
                    <p className="font-mono text-xs text-mist">{f.sub}</p>
                  </div>
                </div>

                <p className="text-mist text-sm leading-relaxed flex-1 mb-8">{f.desc}</p>

                {/* Stat */}
                <div className="border-t border-line pt-6 flex items-end gap-2">
                  <span className="display text-4xl text-paper group-hover:text-cobalt transition-colors">{f.stat}</span>
                  <span className="font-mono text-xs text-mist mb-1">{f.statLabel}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
