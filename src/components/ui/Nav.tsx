'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'
import { PensrLogo } from '@/components/icons/PensrLogo'

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
        className={`sticky left-0 right-0 z-[1000] transition-all duration-300 w-full ${
          scrolled 
            ? 'bg-black/95 backdrop-blur-xl border-b border-cobalt/20 shadow-lg shadow-cobalt/10 py-3' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)] h-16 flex items-center justify-between">
          {/* Logo with better visual hierarchy */}
          <a href="#" className="flex items-center gap-3 group transition-opacity hover:opacity-80 duration-300">
            <motion.div 
              className="w-10 h-10 p-1.5 rounded-lg bg-cobalt/10 border border-cobalt/20 flex items-center justify-center"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
              transition={{ duration: 0.2 }}
            >
              <PensrLogo size={24} className="text-cobalt" />
            </motion.div>
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-xs tracking-widest text-paper uppercase font-semibold">Pensr</span>
              <span className="text-[10px] text-mist/60 tracking-wide">v0.1</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="ink-underline text-mist hover:text-paper transition-colors text-sm font-body relative"
                whileHover={{ color: '#e0e0e0' }}
              >
                {link}
                <motion.span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-cobalt rounded-full"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <MagneticButton href="https://contra.com/youssef_bourmaya_y6j4php0" className="px-5 py-2.5 border border-line hover:bg-dim text-paper text-sm font-medium transition-all duration-300 rounded-sm hover:border-cobalt hover:text-cobalt">
              Hire me →
            </MagneticButton>
            <MagneticButton href="[YOUR_CAL_LINK]" className="px-6 py-2.5 bg-cobalt hover:bg-cobalt2 text-paper text-sm font-medium transition-all duration-300 rounded-sm hover:shadow-lg hover:shadow-cobalt/50">
              Book a Call →
            </MagneticButton>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 hover:opacity-70 transition-opacity"
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
                className="display text-[clamp(2.5rem,8vw,4rem)] text-paper hover:text-cobalt transition-colors"
                whileHover={{ scale: 1.05 }}
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
