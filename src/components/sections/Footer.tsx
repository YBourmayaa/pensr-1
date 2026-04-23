'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const PenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l1.5 1.5" />
    <path d="M13 18l3 3" />
    <path d="M19 12l3 3" />
  </svg>
)

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Benchmarks', href: '#benchmarks' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Paper', href: '#paper' },
]

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <footer ref={ref} className="border-t border-line w-full">
      {/* CTA strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="relative overflow-hidden border-b border-line py-24 w-full"
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#a855f7]/15 via-transparent to-transparent pointer-events-none" />

        <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <p className="section-label mb-6">Final thought</p>
              <h2 className="display text-[clamp(2rem,6vw,6rem)] leading-none text-paper mb-6">
                WE GOT YOUR<br />
                ATTENTION WITH<br />
                <span className="text-cobalt">PENSR-1.</span>
              </h2>
              <p className="text-mist text-lg leading-relaxed max-w-md">
                This is what I build for real clients — landing pages, SaaS sites,
                and AI products focus on high-fidelity interaction. Pensr-1 is the proof.
                Let&apos;s build yours.
              </p>
            </div>

            <div className="flex flex-col gap-6 lg:items-end">
              {/* Headshot + bio section */}
              <div className="flex gap-4 items-start lg:justify-end mb-2">
                <img 
                  src="[YOUR_IMAGE_PATH]" 
                  alt="Youssef Bourmaya" 
                  className="w-16 h-16 rounded-sm object-cover border border-line"
                />
                <div className="flex-1 lg:text-right">
                  <p className="text-paper font-medium text-sm mb-1">Youssef Bourmaya</p>
                  <p className="text-mist text-xs leading-relaxed">
                    Frontend & AI product developer based in Casablanca. I build things that look and feel like real products.
                  </p>
                </div>
              </div>

              {/* Live availability badge */}
              <div className="flex items-center gap-3 border border-line px-5 py-3 w-fit lg:ml-auto">
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
              <p className="font-mono text-xs text-mist lg:text-right mt-1 mb-2">
                Response time: &lt; 24 hours. No GPU required.
              </p>

              {/* What I build tags */}
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {['Analog Frontends', 'SaaS Architecture', 'AI Products', 'Capillary Design'].map(s => (
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
              <div className="flex gap-3 flex-wrap lg:justify-end mt-4">
                <a
                  href="[YOUR_CAL_LINK]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-cobalt hover:bg-cobalt2 text-paper hover:scale-105 font-medium transition-all duration-300 text-base shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                >
                  Book a Call →
                </a>
                <a
                  href="https://contra.com/youssef_bourmaya_y6j4php0?referralExperimentNid=DEFAULT_REFERRAL_PROGRAM&referrerUsername=youssef_bourmaya_y6j4php0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 border border-line hover:bg-dim text-paper font-medium transition-colors text-base"
                >
                  Hire me on Contra
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Links grid */}
      <div className="border-b border-line py-16 w-full">
        <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="section-label mb-6">Navigation</p>
              <ul className="space-y-3">
                {navLinks.map(link => (
                  <li key={link.href}>
                    <a 
                      href={link.href} 
                      className="text-mist hover:text-paper transition-colors text-sm ink-underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="section-label mb-6">Get in touch</p>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://twitter.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mist hover:text-paper transition-colors text-sm ink-underline"
                  >
                    Twitter / X
                  </a>
                </li>
                <li>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mist hover:text-paper transition-colors text-sm ink-underline"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:hello@pensr.dev"
                    className="text-mist hover:text-paper transition-colors text-sm ink-underline"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-6 w-full">
        <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 text-cobalt">
              <PenIcon />
            </div>
            <span className="font-mono text-xs text-mist">Pensr-1 v0.1 — Open-weight analog model — Est. 2024</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-xs text-line">
              © 2025 Pensr AI — A creative portfolio piece by Youssef Bourmaya
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
