'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function CTATeaser() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleScroll = () => {
    const hireSection = document.getElementById('pricing')
    if (hireSection) {
      hireSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={ref} className="py-24 border-t border-line w-full">
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border border-line/50 bg-gradient-to-br from-ink via-ink to-dim hover:border-cobalt/50 transition-colors duration-300 p-12 lg:p-16 rounded-sm group cursor-pointer"
          onClick={handleScroll}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex-1">
              <p className="section-label mb-3 text-cobalt/80">Mid-page CTA</p>
              <h3 className="display text-[clamp(1.5rem,4vw,3rem)] leading-tight text-paper group-hover:text-cobalt transition-colors duration-300 mb-4">
                Liked what you saw?
              </h3>
              <p className="text-mist text-base md:text-lg leading-relaxed max-w-2xl">
                This is what I build for real clients — SaaS sites, AI products, and landing pages that convert.
                Pensr-1 is just proof of concept. Let&apos;s build yours.
              </p>
            </div>

            <motion.div
              className="flex-shrink-0"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-cobalt/60 group-hover:text-cobalt transition-colors">
                <path d="M8 20H32M32 20L22 10M32 20L22 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 pt-8 border-t border-line/30 flex items-center gap-2"
          >
            <span className="font-mono text-xs text-mist/70 uppercase tracking-wider">See my work</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-mist/70"
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
