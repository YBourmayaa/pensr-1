'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const TerminalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
)

const links = {
  Product: ['Model weights', 'Features', 'Benchmarks', 'Pricing', 'RTP Architecture'],
  Research: ['Technical report', 'BibTeX', 'MacBook-Pro-2023', 'Dataset vibes', 'OpenWeights'],
  Developer: ['Documentation', 'API Reference', 'SDKs', 'Playground', 'Status'],
  Legal: ['Privacy policy', 'Terms of use', 'Model deprecation', 'Safety guidelines'],
}

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <footer ref={ref} className="border-t border-line">
      {/* CTA strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="border-b border-line py-24 px-8"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <p className="section-label mb-6">Final thought</p>
              <h2 className="display text-[clamp(3rem,6vw,6rem)] leading-none text-paper mb-6">
                WE GOT YOUR<br />
                ATTENTION WITH<br />
                <span className="text-cobalt">ANTIGRAVITY-1.</span>
              </h2>
              <p className="text-mist text-lg leading-relaxed max-w-md">
                This is what I build for real clients — landing pages, SaaS sites,
                and AI products focus on high-fidelity interaction. Antigravity-1 is the proof.
                Let&apos;s build yours.
              </p>
            </div>

            <div className="flex flex-col gap-6 lg:items-end">
              {/* Live availability badge */}
              <div className="flex items-center gap-3 border border-line px-5 py-3 w-fit">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#4ade80',
                  }}
                >
                  Available for new models
                </span>
              </div>

              {/* What I build tags */}
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {['Neural Frontends', 'SaaS Architecture', 'AI Products', 'Recursive Design'].map(s => (
                  <span
                    key={s}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 12px',
                      border: '1px solid #2A2A36',
                      borderRadius: '999px',
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.05em',
                      color: '#8A8A9A',
                      textTransform: 'uppercase',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3 flex-wrap lg:justify-end">
                <a
                  href="https://contra.com/youssef_bourmaya_y6j4php0?referralExperimentNid=DEFAULT_REFERRAL_PROGRAM&referrerUsername=youssef_bourmaya_y6j4php0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-cobalt hover:bg-cobalt2 text-paper font-medium transition-colors text-sm"
                >
                  Hire me on Contra
                </a>
                <a
                  href="mailto:antigravity@ai.dev"
                  className="px-8 py-4 border border-line hover:bg-dim text-paper font-medium transition-colors text-sm"
                >
                  Send a message
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Links grid */}
      <div className="border-b border-line py-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <p className="section-label mb-6">{category}</p>
                <ul className="space-y-3">
                  {items.map(item => (
                    <li key={item}>
                      <a href="#" className="text-mist hover:text-paper transition-colors text-sm ink-underline">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-6 px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 text-cobalt">
              <TerminalIcon />
            </div>
            <span className="font-mono text-xs text-mist">Antigravity-1 v0.1 — Open-weight neural model — Est. 2025</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-xs text-line">
              © 2025 Antigravity AI — A creative portfolio piece by Youssef Bourmaya
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
