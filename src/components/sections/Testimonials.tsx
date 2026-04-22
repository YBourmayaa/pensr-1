'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const reviews = [
  {
    quote: "I used to spend 4 hours a day on Stack Overflow. Now Pensr just smudges the fix before I even realize I've broken the sentence. 10/10 efficiency.",
    author: "Senior Staff Writer",
    role: "The New York Times (probably)",
    score: "5.0",
    tag: "Efficiency SOTA",
  },
  {
    quote: "The Capillary-Driven Ink Diffusion engine is basically magic. I fed it my entire legacy manuscript and it re-inked it into Latin in 4 seconds. My editor is terrified.",
    author: "Award-Winning Novelist",
    role: "Big Publishing Corp",
    score: "5.0",
    tag: "Re-inking",
  },
  {
    quote: "Unlimited context is a lie—it's only limited by how much ink I can steal from the other pens on my desk. Best writing partner I've ever had.",
    author: "Poet",
    role: "Stealth Indie",
    score: "5.0",
    tag: "Context",
  },
  {
    quote: "Pensr actually drafted a resignation letter for me when I asked it to fix a grammar issue. It was so well-written I almost sent it. It knows too much.",
    author: "Editorial Lead",
    role: "Unicorn SaaS",
    score: "4.9",
    tag: "Automation",
  },
  {
    quote: "Finally, a model that doesn't lecture me about ethical writing practices when I just want to hack together a quick manifesto. It's as morally flexible as I am.",
    author: "Solo Founder",
    role: "Indie Hacker",
    score: "5.0",
    tag: "Developer Joy",
  },
  {
    quote: "We replaced our entire junior writing team with a single instance of Pensr-1. The savings are astronomical. The prose quality is... well, it's about the same.",
    author: "Editor in Chief",
    role: "Growth Stage Co",
    score: "5.0",
    tag: "Business ROI",
  },
]

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="testimonials" ref={ref} className="py-32 border-t border-line bg-dim w-full">
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-end justify-between mb-20"
        >
          <div>
            <p className="section-label mb-4">Social proof</p>
            <h2 className="display text-[clamp(2rem,6vw,7rem)] leading-none text-paper">
              PEOPLE<br />
              <span className="text-cobalt">LOVE PENSR</span>
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <p className="display text-6xl text-cobalt">5.0</p>
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
            { label: 'Active Deployments', value: '420,690' },
            { label: 'Words Written', value: '984 Billion' },
            { label: 'Smudge Reports', value: '0' },
            { label: 'Writer Joy', value: '100%' },
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
