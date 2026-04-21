'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Initialize the model',
    sub: 'Model Activation',
    desc: 'Run antigravity init in your terminal. The RTP engine activates. No loading screen. No cold start. No existential dread.',
    detail: 'Time to ready: ~0ms (neural latency)',
    code: 'antigravity.init() // O(1) complexity',
  },
  {
    number: '02',
    title: 'Inject your context',
    sub: 'Context propagation',
    desc: 'Paste your codebase, your stack trace, or just your feelings. Antigravity processes all of it. No token limit. No judgment.',
    detail: 'Compatibility: 99.4% of file types',
    code: 'antigravity.think(context=repo)',
  },
  {
    number: '03',
    title: 'Deploy the output',
    sub: 'Neural shipment',
    desc: 'The code is generated, tested, and committed. Unlike your last PR, it passes CI. Archive, ship, or blame it on the model.',
    detail: 'Output persistence: git history (permanent)',
    code: 'output = antigravity.ship() // always deploys',
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
          * Total inference pipeline: ~0ms. Compare: GPT-4 average TTFT: 1,100ms + internet dependency.
        </motion.p>
      </div>
    </section>
  )
}
