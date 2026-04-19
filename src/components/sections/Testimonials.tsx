'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const reviews = [
  {
    quote: "I switched from GPT-4 to Pensr-1 and my electricity bill dropped to zero. My productivity increased by 40%. I've never looked back.",
    author: "Dr. Arnav Mehta",
    role: "Senior ML Researcher, ex-DeepMind",
    score: "5.0",
    tag: "Cost efficiency",
  },
  {
    quote: "We ran Pensr-1 in a Faraday cage during a solar flare event. It was the only model still running. The incident report cited 'superior analog resilience.'",
    author: "Capt. Elise Fontaine",
    role: "Systems Engineer, undisclosed agency",
    score: "5.0",
    tag: "Reliability",
  },
  {
    quote: "Zero hallucinations. I asked it to write my address. It wrote my address. I still cannot believe this is free.",
    author: "Marcus Oliveira",
    role: "PM, overwhelmed by LLM outputs",
    score: "5.0",
    tag: "Output fidelity",
  },
  {
    quote: "The latency is literally zero. I press the nib to paper and words appear. No token streaming. No loading spinner. Just words.",
    author: "Yuki Tanaka",
    role: "Frontend Engineer, ex-Vercel",
    score: "4.9",
    tag: "Latency",
  },
  {
    quote: "Our compliance team flagged every LLM for GDPR violations. Pensr-1 was approved in 4 minutes. It does not store any data. It is a pen.",
    author: "Ingrid Svensson",
    role: "Chief Privacy Officer",
    score: "5.0",
    tag: "Privacy & compliance",
  },
  {
    quote: "I presented Pensr-1's benchmark results at NeurIPS. The Q&A was very uncomfortable. I stand by the data.",
    author: "Anonymous",
    role: "PhD student, somewhere cold",
    score: "5.0",
    tag: "Research-grade",
  },
]

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="py-32 border-t border-line bg-dim">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-end justify-between mb-20"
        >
          <div>
            <p className="section-label mb-4">Social proof</p>
            <h2 className="display text-[clamp(3rem,6vw,7rem)] leading-none text-paper">
              PEOPLE<br />
              <span className="text-cobalt">LOVE PENSR</span>
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <p className="display text-6xl text-cobalt">4.9</p>
            <p className="section-label">avg rating — 2,400+ reviews</p>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {reviews.map((r, i) => (
            <motion.div
              key={r.author}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-dim p-10 hover:bg-ink transition-colors group"
            >
              {/* Score + tag */}
              <div className="flex items-center justify-between mb-6">
                <span className="tag">{r.tag}</span>
                <span className="font-mono text-sm text-cobalt">{r.score} / 5</span>
              </div>

              {/* Quote */}
              <p className="font-serif italic text-paper text-lg leading-relaxed mb-8 group-hover:text-paper">
                "{r.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-line pt-6 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center">
                  <span className="font-mono text-xs text-mist">{r.author.split(' ').map(n => n[0]).join('').slice(0,2)}</span>
                </div>
                <div>
                  <p className="text-paper text-sm font-medium">{r.author}</p>
                  <p className="text-mist text-xs font-mono">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Running stat */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-between border border-line p-8 gap-6"
        >
          {[
            { label: 'Total reviews', value: '2,400+' },
            { label: 'Recommend to colleagues', value: '98.2%' },
            { label: 'Would switch from LLM', value: '72%' },
            { label: 'Still using electricity', value: '28%' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="display text-4xl text-paper mb-1">{stat.value}</p>
              <p className="section-label">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
