'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const specs = [
  { label: 'Model name', value: 'Pensr-1 v0.1', mono: true },
  { label: 'Release year', value: '2024', mono: true },
  { label: 'Architecture', value: 'Capillary-Driven Ink Diffusion (CDID)', mono: true },
  { label: 'Parameter count', value: '∞ (analog)', mono: true },
  { label: 'Context window', value: 'Unlimited* (*Page-bound)', mono: true },
  { label: 'Text gen. speed', value: '1.2M words / s', mono: true },
  { label: 'Languages supported', value: 'All of them (even Latin)', mono: true },
  { label: 'Fine-tuning method', value: 'Handwriting samples', mono: true },
  { label: 'Hallucination rate', value: '0.000% (claimed)', mono: true },
  { label: 'Power draw', value: '0.0W (gravity powered)', mono: true },
  { label: 'GPU requirement', value: 'None', mono: true },
  { label: 'License', value: 'Open-weight (vibes)', mono: true },
  { label: 'Deprecated models', value: 'Quills, Graphite 1.0', mono: true },
]

export default function ModelCard() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="model" ref={ref} className="py-32 border-t border-line">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="section-label mb-6">Model release — Pensr-1</p>
            <h2 className="display text-[clamp(3rem,6vw,7rem)] leading-none text-paper mb-8">
              MEET THE<br />
              <span className="text-cobalt">PENSR-1</span>
            </h2>
            <p className="text-mist leading-relaxed mb-8 text-lg max-w-md">
              We are proud to release Pensr-1 as an open-weight analog model. 
              The first text generation assistant with zero hallucination (claimed), zero ink leakage, 
              and a guaranteed capillary-driven architecture.
            </p>
            <p className="text-mist leading-relaxed mb-12 text-lg max-w-md">
              Unlike transfromer-based architectures, Pensr-1 uses Capillary-Driven Ink Diffusion 
              — what researchers call the <span className="text-paper font-mono text-sm">CDID</span> paradigm — 
              to produce deterministic, high-quality text at astronomical speeds.
            </p>

            {/* Abstract box */}
            <div className="border border-line p-8 relative">
              <div className="absolute -top-px left-6 right-6 h-px bg-cobalt opacity-40" />
              <p className="section-label mb-4">Abstract</p>
              <p className="font-mono text-sm text-mist leading-relaxed">
                We present Pensr-1, an open-weight analog model trained on the collective 
                unconscious of 20th century literature. Pensr-1 achieves state-of-the-art performance on 
                the Papier-Suite benchmark, outperforming all cloud-based LLMs on cost, 
                latency, and offline availability. We release the full model checkpoint 
                at no cost. Trust us, it writes.
              </p>
            </div>
          </motion.div>

          {/* Right — spec table */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="border border-line"
          >
            <div className="px-6 py-4 border-b border-line flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="section-label">Model specifications</span>
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                  <span className="font-mono text-xs text-green-400">deployed</span>
                </span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
                <span className="w-2.5 h-2.5 rounded-full bg-cobalt" />
              </div>
            </div>
            <div>
              {specs.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  className="flex items-center justify-between px-6 py-3.5 border-b border-line last:border-0 hover:bg-dim transition-colors group"
                >
                  <span className="text-mist text-sm">{spec.label}</span>
                  <span className={`text-paper text-sm ${spec.mono ? 'font-mono' : ''} group-hover:text-cobalt transition-colors`}>
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
