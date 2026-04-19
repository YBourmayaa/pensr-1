'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { InkDropIcon, ContextIcon, ZeroIcon, SpeedIcon, OpenWeightIcon, RefillIcon } from '../icons/FeatureIcons'

const features = [
  {
    icon: InkDropIcon,
    number: '01',
    title: 'InkFlow\u2122 Generation Engine',
    sub: 'Capillary-driven token output',
    desc: 'A proprietary capillary-driven diffusion mechanism transfers ink from reservoir to substrate at a consistent 0.7mm resolution. Output is pixel-perfect, deterministic, and never cached.',
    stat: '0.7mm',
    statLabel: 'nib precision',
    wide: true,
  },
  {
    icon: ContextIcon,
    number: '02',
    title: '1.2km Context Window',
    sub: 'Longest in class',
    desc: 'With 1,200 meters of continuous ink capacity, Pensr-1 holds more context than any transformer model in production. Just flip to the back.',
    stat: '1.2km',
    statLabel: 'context',
    wide: false,
  },
  {
    icon: ZeroIcon,
    number: '03',
    title: 'Zero Hallucination',
    sub: 'Guaranteed output fidelity',
    desc: 'Pensr-1 outputs exactly what you write. Every token. No surprises. No invented citations. No confident wrongness.',
    stat: '0.000%',
    statLabel: 'hallucination rate',
    wide: false,
  },
  {
    icon: SpeedIcon,
    number: '04',
    title: '300 Words Per Minute',
    sub: 'Fastest analog throughput',
    desc: 'Trained humans achieve up to 300 WPM in sustained output sessions. No API bottleneck, no queue, no rate limit. Just write.',
    stat: '300',
    statLabel: 'WPM peak',
    wide: false,
  },
  {
    icon: OpenWeightIcon,
    number: '05',
    title: 'Truly Open-Weight',
    sub: 'No license restrictions',
    desc: 'Pensr-1 is released under the Universal Analog License. Use it for research, production, poetry, or your grocery list. We ask only that you recap it.',
    stat: 'UAL',
    statLabel: 'license',
    wide: false,
  },
  {
    icon: RefillIcon,
    number: '06',
    title: 'Refillable Architecture',
    sub: 'Context extension support',
    desc: 'Unlike single-use models that deprecate at capacity, Pensr Pro supports context window extension via standard ink cartridge replacement. No retraining required.',
    stat: '+2km',
    statLabel: 'with Pro refill',
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
              WHAT PENSR<br />
              <span className="text-cobalt">ACTUALLY DOES</span>
            </h2>
          </div>
          <p className="hidden md:block text-mist max-w-xs text-right leading-relaxed">
            Six reasons Pensr-1 outperforms every model that requires electricity.
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
