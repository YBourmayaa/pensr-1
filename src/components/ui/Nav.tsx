'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'

const TerminalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
)

const links = ['Model', 'Features', 'Benchmarks', 'Pricing', 'Paper']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ top: '36px' }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-ink/80 backdrop-blur-xl border-b border-line' : ''
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-6 h-6 text-cobalt">
              <TerminalIcon />
            </div>
            <span className="font-mono text-sm tracking-widest text-paper uppercase">Antigravity</span>
            <span className="tag">v0.1</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="ink-underline text-mist hover:text-paper transition-colors text-sm font-body"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <MagneticButton href="#pricing" className="px-5 py-2.5 bg-cobalt hover:bg-cobalt2 text-paper text-sm font-medium transition-colors rounded-sm">
              Deploy Antigravity-1
            </MagneticButton>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`w-6 h-px bg-paper transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`w-6 h-px bg-paper transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-px bg-paper transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMenuOpen(false)}
                className="display text-6xl text-paper hover:text-cobalt transition-colors"
              >
                {link.toUpperCase()}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
