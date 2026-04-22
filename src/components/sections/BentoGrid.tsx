'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { UptimeIcon, ChipIcon } from '../icons/FeatureIcons'

const tiles = [
  {
    type: 'stat',
    label: 'On-device',
    headline: 'Refuses the cloud',
    sub: '100% offline. Zero data sent. GDPR compliant by default.',
    accent: true,
    size: 'tall',
  },
  {
    type: 'badge',
    label: 'Certified',
    headline: 'No OOM errors',
    sub: 'Runs on any desk. No GPU. No RAM. No problem.',
    accent: false,
    size: 'normal',
  },
  {
    type: 'uptime',
    label: 'Status — all systems',
    headline: '99.99%',
    sub: 'uptime since 2024',
    accent: false,
    size: 'normal',
  },
  {
    type: 'eco',
    label: 'Sustainability',
    headline: '0 watt',
    sub: 'Power draw during inference. Say please and thank you guilt-free.',
    accent: false,
    size: 'normal',
  },
  {
    type: 'legacy',
    label: 'Backwards compatible',
    headline: 'Legacy support',
    sub: 'Supporting papyrus and stone tablets since 3000 BCE.',
    accent: false,
    size: 'normal',
  },
  {
    type: 'drop',
    label: 'Stress tested',
    headline: 'Drop tested',
    sub: 'Survived 1.2m fall onto hardwood. Damage report: the floor.',
    accent: false,
    size: 'normal',
  },
]

export default function BentoGrid() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="py-32 border-t border-line bg-dim w-full">
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="section-label mb-4">Why people choose Pensr</p>
          <h2 className="display text-[clamp(3rem,6vw,7rem)] leading-none text-paper">
            BUILT<br />
            <span className="text-cobalt">DIFFERENT</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {/* Tall tile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="lg:row-span-2 bg-cobalt p-10 flex flex-col justify-between min-h-[300px] group"
          >
            <div>
              <p className="font-mono text-xs text-cobalt2 uppercase tracking-widest mb-6">On-device</p>
              <h3 className="display text-5xl text-paper leading-tight mb-4">REFUSES<br />THE<br />CLOUD</h3>
              <p className="text-cobalt2 text-sm leading-relaxed">100% offline. Zero data transmitted. GDPR, CCPA, and HIPAA compliant by default — not by policy.</p>
            </div>
            <div className="w-12 h-12 text-paper/30 mt-8">
              <ChipIcon />
            </div>
          </motion.div>

          {/* No OOM */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15 }}
            className="bg-ink p-10 hover:bg-dim transition-colors group"
          >
            <p className="section-label mb-4">GPU requirement</p>
            <p className="display text-5xl text-paper group-hover:text-cobalt transition-colors mb-3">None</p>
            <p className="text-mist text-sm">No OOM errors. No CUDA issues. No driver updates. Just a pen.</p>
          </motion.div>

          {/* Uptime */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-ink p-10 hover:bg-dim transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="section-label">All systems</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-green-400">Operational</span>
              </div>
            </div>
            <p className="display text-5xl text-paper group-hover:text-cobalt transition-colors mb-2">99.99%</p>
            <p className="font-mono text-xs text-mist">uptime — measured since 2024</p>
          </motion.div>

          {/* Power draw */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="bg-ink p-10 hover:bg-dim transition-colors group"
          >
            <p className="section-label mb-4">Power draw during inference</p>
            <p className="display text-5xl text-paper group-hover:text-cobalt transition-colors mb-3">0W</p>
            <p className="text-mist text-sm">Say "please" and "thank you" as much as you want, guilt-free.</p>
          </motion.div>

          {/* Legacy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-ink p-10 hover:bg-dim transition-colors group"
          >
            <p className="section-label mb-4">Backwards compatibility</p>
            <p className="display text-4xl text-paper group-hover:text-cobalt transition-colors mb-3">Legacy<br />Support</p>
            <p className="text-mist text-sm">Compatible with papyrus, stone tablets, and IKEA receipt paper.</p>
            <p className="font-mono text-xs text-line mt-3">Supporting substrate formats since 3000 BCE</p>
          </motion.div>

          {/* Drop test */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.35 }}
            className="bg-ink p-10 hover:bg-dim transition-colors group"
          >
            <p className="section-label mb-4">Stress testing</p>
            <p className="display text-4xl text-paper group-hover:text-cobalt transition-colors mb-3">Drop<br />Tested</p>
            <p className="text-mist text-sm leading-relaxed">1.2m freefall onto oak hardwood.<br />Damage: the floor.</p>
            <p className="font-mono text-xs text-line mt-3">Test date: 02/29/2025*</p>
          </motion.div>
        </div>
        <p className="font-mono text-xs text-line mt-6">
          * Feb 29, 2025 does not exist. We consider this further proof of Pensr-1's resilience to calendar bugs.
        </p>
      </div>
    </section>
  )
}
