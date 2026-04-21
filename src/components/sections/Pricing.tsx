'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { CheckIcon } from '../icons/FeatureIcons'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'month',
    sub: 'For side projects that never ship.',
    context: 'Unlimited*',
    featured: false,
    features: [
      'Antigravity-1 v0.1 weights',
      'RAM-bound context window',
      'Community vibes on Discord',
      '0% hallucination (claimed)',
      'Recursive thought propagation',
      'No API key required',
      'Offline-first capability',
    ],
    cta: 'Deploy v0.1',
    note: '* Memory permitting. We are not responsible for your RAM consumption.',
  },
  {
    name: 'Sentient',
    price: '$20',
    period: 'month',
    sub: 'For professionals who want to feel judged.',
    context: '∞ Context',
    featured: true,
    features: [
      'Everything in Free',
      'Antigravity-2 (Early access)',
      'The model will judge your code',
      'Automated PR deflection',
      'Priority inference queue',
      'Custom fine-tuning (vibes only)',
      'Priority support (via bot)',
    ],
    cta: 'Subscribe now',
    note: 'Most popular among tech leads and people who want to be replaced.',
  },
  {
    name: 'Empire',
    price: 'Custom',
    period: 'org',
    sub: 'For leaders with world domination in mind.',
    context: 'Full Neural',
    featured: false,
    features: [
      'Everything in Sentient',
      'Antigravity trains on your soul',
      'On-prem sentient compute',
      'Legal indemnity (maybe)',
      'Dedicated success manager (human?)',
      'White-label neural weights',
      'Private cloud offloading',
    ],
    cta: 'Contact Sales',
    note: null,
  },
]

export default function Pricing() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="pricing" ref={ref} className="py-32 border-t border-line">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <p className="section-label mb-4">Capitalism — Tiered access</p>
          <h2 className="display text-[clamp(3rem,6vw,7rem)] leading-none text-paper mb-6">
            PRICING FOR<br />
            <span className="text-cobalt">THE BOLD</span>
          </h2>
          <p className="text-mist max-w-xl leading-relaxed">
            Choose the level of intelligence (and liability) that fits your organization. 
            All plans include a lifetime of recursive thinking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1 }}
              className={`relative flex flex-col border transition-colors ${
                plan.featured
                  ? 'border-cobalt bg-dim'
                  : 'border-line bg-ink hover:bg-dim'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-px left-0 right-0 h-px bg-cobalt" />
              )}
              {plan.featured && (
                <div className="px-8 py-2 border-b border-cobalt/30">
                  <span className="font-mono text-xs text-cobalt tracking-widest uppercase">Most sentient</span>
                </div>
              )}

              <div className="p-8 flex-1 flex flex-col">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="display text-3xl text-paper">{plan.name.toUpperCase()}</h3>
                    <span className="tag">{plan.context}</span>
                  </div>
                  <p className="text-mist text-sm mb-6">{plan.sub}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="display text-6xl text-paper">{plan.price}</span>
                    <span className="font-mono text-sm text-mist">/ {plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="text-cobalt mt-0.5 flex-shrink-0"><CheckIcon /></span>
                      <span className="text-mist text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Note */}
                {plan.note && (
                  <p className="font-mono text-xs text-mist border-t border-line pt-4 mb-6 italic">{plan.note}</p>
                )}

                {/* CTA */}
                <a
                  href="#"
                  className={`block text-center py-4 font-medium text-sm transition-all ${
                    plan.featured
                      ? 'bg-cobalt hover:bg-cobalt2 text-paper'
                      : 'border border-line hover:bg-dim text-paper'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 border border-line p-8"
        >
          <p className="section-label mb-4">Why not just use Copilot?</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { q: 'Recursive thought', antigravity: 'Always', copilot: 'Never' },
              { q: 'Whole-repo context', antigravity: 'Unlimited', copilot: 'File-level' },
              { q: 'Moral flexibility', antigravity: 'Absolute', copilot: 'Censored' },
            ].map(row => (
              <div key={row.q}>
                <p className="font-mono text-xs text-mist mb-2">{row.q}</p>
                <div className="flex items-center gap-4">
                  <span className="text-cobalt text-sm font-medium">{row.antigravity}</span>
                  <span className="text-line text-xs">vs</span>
                  <span className="text-mist text-sm line-through">{row.copilot}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
