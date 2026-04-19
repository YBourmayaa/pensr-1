'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { CheckIcon } from '../icons/FeatureIcons'

const plans = [
  {
    name: 'Standard',
    price: '$1.20',
    period: 'one-time',
    sub: 'For individuals who simply need to write.',
    context: '1.2km context',
    featured: false,
    features: [
      '1.2km ink reservoir',
      '0.7mm precision nib',
      'Blue or black output',
      'Retractable architecture',
      'Pocket-deployable',
      'No API key required',
      'Community support (ask a friend)',
    ],
    cta: 'Get Standard',
    note: null,
  },
  {
    name: 'Pro',
    price: '$4.80',
    period: 'one-time',
    sub: 'For professionals with longer context requirements.',
    context: '3.6km context',
    featured: true,
    features: [
      'Everything in Standard',
      '3x ink via refill cartridge',
      'Gel ink (smoother throughput)',
      '0.5mm precision nib option',
      'Rubber grip for sustained sessions',
      'Waterproof output layer',
      'Priority support (faster friend)',
    ],
    cta: 'Get Pro',
    note: 'Most popular among novelists, engineers, and people who lose pens.',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'per org',
    sub: 'For teams with dedicated document generation needs.',
    context: 'Unlimited',
    featured: false,
    features: [
      'Everything in Pro',
      'Bulk deployment (50–10,000 units)',
      'Custom logo on barrel',
      'Dedicated success manager',
      'SLA: 99.99% delivery uptime',
      'White-label output support',
      'Calligraphy fine-tuning available',
    ],
    cta: 'Contact us',
    note: null,
  },
]

export default function Pricing() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="pricing" ref={ref} className="py-32 border-t border-line">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <p className="section-label mb-4">Pricing — transparent & fair</p>
          <h2 className="display text-[clamp(3rem,6vw,7rem)] leading-none text-paper mb-6">
            SIMPLE,<br />
            <span className="text-cobalt">HONEST PRICING</span>
          </h2>
          <p className="text-mist max-w-xl leading-relaxed">
            No tokens. No monthly subscription. No credit card required. You buy a pen. 
            You use the pen. The pen writes. This is the entire business model.
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
                  <span className="font-mono text-xs text-cobalt tracking-widest uppercase">Most popular</span>
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
          <p className="section-label mb-4">Why not just use ChatGPT?</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { q: 'Monthly cost', pensr: '$0 / month', gpt: '$20 / month' },
              { q: 'Works offline', pensr: 'Always', gpt: 'Never' },
              { q: 'Requires wifi', pensr: 'No', gpt: 'Yes' },
            ].map(row => (
              <div key={row.q}>
                <p className="font-mono text-xs text-mist mb-2">{row.q}</p>
                <div className="flex items-center gap-4">
                  <span className="text-cobalt text-sm font-medium">{row.pensr}</span>
                  <span className="text-line text-xs">vs</span>
                  <span className="text-mist text-sm line-through">{row.gpt}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
