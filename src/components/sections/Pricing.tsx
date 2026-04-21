'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { CheckIcon } from '../icons/FeatureIcons'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'month',
    sub: 'For grocery lists that never get bought.',
    context: 'Unlimited*',
    featured: false,
    features: [
      'Pensr-1 v0.1 analog weights',
      'Page-bound context window',
      'Community vibes on Discord',
      '0% ink leakage (claimed)',
      'Capillary-driven diffusion',
      'No ink cartridge required',
      'Offline-only capability',
    ],
    cta: 'Get v0.1',
    note: '* Ink permitting. We are not responsible for your pocket stains.',
  },
  {
    name: 'Permanent',
    price: '$20',
    period: 'month',
    sub: 'For professionals who want to feel analog.',
    context: '∞ Context',
    featured: true,
    features: [
      'Everything in Free',
      'Pensr-2 (Early access)',
      'The model will judge your prose',
      'Automated letter deflection',
      'Priority ink queue',
      'Custom fine-tuning (nib size)',
      'Priority support (via carrier pigeon)',
    ],
    cta: 'Subscribe now',
    note: 'Most popular among authors and people who want to be permanent.',
  },
  {
    name: 'Archive',
    price: 'Custom',
    period: 'org',
    sub: 'For leaders with legacy in mind.',
    context: 'Full Analog',
    featured: false,
    features: [
      'Everything in Permanent',
      'Pensr writes on your soul',
      'On-prem physical compute',
      'Legal indemnity (maybe)',
      'Dedicated archivist (human?)',
      'White-label analog weights',
      'Storage offloading (basement)',
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
              { q: 'Capillary diffusion', pensr: 'Always', copilot: 'Never' },
              { q: 'Whole-page context', pensr: 'Unlimited', copilot: 'Line-level' },
              { q: 'Moral flexibility', pensr: 'Absolute', copilot: 'Censored' },
            ].map(row => (
              <div key={row.q}>
                <p className="font-mono text-xs text-mist mb-2">{row.q}</p>
                <div className="flex items-center gap-4">
                  <span className="text-cobalt text-sm font-medium">{row.pensr}</span>
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
