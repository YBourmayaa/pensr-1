'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Uncap the model',
    sub: 'Initialization',
    desc: 'Remove the protective cap from the nib. This exposes the 0.7mm parameter to the environment. The model is now in active inference mode. No loading screen. No cold start.',
    detail: 'Time to ready: ~0.3 seconds (human motor function)',
    code: 'pensr.uncap() // O(1) complexity',
  },
  {
    number: '02',
    title: 'Apply nib to substrate',
    sub: 'Context injection',
    desc: 'Press the nib against any paper-compatible surface. Ink begins flowing via capillary action. The CDID engine activates. Output begins immediately at whatever speed your fine-tuning allows.',
    detail: 'Substrate compatibility: 99.4% of paper types',
    code: 'pensr.write(intent=your_thoughts)',
  },
  {
    number: '03',
    title: 'Read your output',
    sub: 'Token retrieval',
    desc: 'The text is now permanently encoded on the substrate. Unlike digital outputs, it requires no rendering pipeline, no screen, no electricity. It simply exists. Archive, share, or lose under a sofa cushion.',
    detail: 'Output persistence: centuries (acid-free paper)',
    code: 'output = paper.read() // always accurate',
  },
]

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="py-32 border-t border-line">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <p className="section-label mb-4">Inference pipeline</p>
          <h2 className="display text-[clamp(3rem,6vw,7rem)] leading-none text-paper">
            HOW<br />
            <span className="text-cobalt">IT WORKS</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-px border border-line">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 bg-ink hover:bg-dim transition-colors border-b border-line last:border-0 group"
            >
              {/* Number */}
              <div className="lg:col-span-2 p-10 border-b lg:border-b-0 lg:border-r border-line flex items-center justify-center">
                <span className="display text-[6rem] text-line group-hover:text-cobalt transition-colors leading-none">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="lg:col-span-6 p-10 border-b lg:border-b-0 lg:border-r border-line">
                <p className="section-label mb-3">{step.sub}</p>
                <h3 className="display text-4xl text-paper mb-4">{step.title.toUpperCase()}</h3>
                <p className="text-mist leading-relaxed mb-6">{step.desc}</p>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cobalt flex-shrink-0" />
                  <span className="font-mono text-xs text-mist">{step.detail}</span>
                </div>
              </div>

              {/* Code block */}
              <div className="lg:col-span-4 p-10 flex flex-col justify-center">
                <div className="bg-dim border border-line p-6">
                  <div className="flex gap-1.5 mb-4">
                    <span className="w-2 h-2 rounded-full bg-line" />
                    <span className="w-2 h-2 rounded-full bg-line" />
                    <span className="w-2 h-2 rounded-full bg-cobalt" />
                  </div>
                  <pre className="font-mono text-sm text-cobalt leading-relaxed whitespace-pre-wrap">{step.code}</pre>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="font-mono text-xs text-line mt-6 text-center"
        >
          * Total inference pipeline: ~1 second. Compare: GPT-4 average TTFT: 1,100ms + internet dependency.
        </motion.p>
      </div>
    </section>
  )
}
