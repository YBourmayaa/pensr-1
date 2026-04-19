'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const specs = [
  { label: 'Model name', value: 'Pensr-1 A0B', mono: true },
  { label: 'Release year', value: '1943', mono: true },
  { label: 'Architecture', value: 'Ballpoint (BPT)', mono: true },
  { label: 'Nib diameter', value: '0.7mm', mono: true },
  { label: 'Parameter count', value: '1 (nib)', mono: true },
  { label: 'Context window', value: '1,200,000mm ink', mono: true },
  { label: 'Token gen. speed', value: '300 words / min', mono: true },
  { label: 'Languages supported', value: 'All of them', mono: true },
  { label: 'Fine-tuning method', value: 'Handwriting practice', mono: true },
  { label: 'Hallucination rate', value: '0.000%', mono: true },
  { label: 'Power draw', value: '0W', mono: true },
  { label: 'GPU requirement', value: 'None', mono: true },
  { label: 'License', value: 'Open-weight (analog)', mono: true },
  { label: 'Deprecated models', value: 'Pencil-v1, Quill-v3', mono: true },
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
              After 80 years of continuous deployment, we are proud to release Pensr-1 as an open-weight model. 
              The first text generation system with zero server dependencies, zero rate limits, 
              and a guaranteed 0% hallucination rate.
            </p>
            <p className="text-mist leading-relaxed mb-12 text-lg max-w-md">
              Unlike transformer-based architectures, Pensr-1 uses a capillary-driven ink diffusion 
              mechanism — what researchers call the <span className="text-paper font-mono text-sm">BPT (Ballpoint Transfer)</span> paradigm — 
              to produce deterministic, reproducible output on any substrate.
            </p>

            {/* Abstract box */}
            <div className="border border-line p-8 relative">
              <div className="absolute -top-px left-6 right-6 h-px bg-cobalt opacity-40" />
              <p className="section-label mb-4">Abstract</p>
              <p className="font-mono text-sm text-mist leading-relaxed">
                We present Pensr-1, an open-weight ballpoint model trained on 80 years of 
                continuous human deployment. Pensr-1 achieves state-of-the-art performance on 
                the WoodenDesk-1 benchmark, outperforming all cloud-based LLMs on cost-per-word, 
                latency, and offline availability. We release the full model checkpoint 
                (one pen) at no cost. Cartridge replacement support coming Q3.
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
              <span className="section-label">Model specifications</span>
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
