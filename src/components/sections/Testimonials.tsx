'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const reviews = [
  {
    quote: "I used to spend 4 hours a day on Stack Overflow. Now Antigravity just hallucinates the fix before I even realize I've broken the build. 10/10 efficiency.",
    author: "Senior Staff Engineer",
    role: "Meta (probably)",
    score: "5.0",
    tag: "Efficiency SOTA",
  },
  {
    quote: "The Recursive Thought Propagation engine is basically magic. I fed it my entire legacy COBOL monorepo and it refactored it into Rust in 4 seconds. My boss is terrified.",
    author: "Tech Lead",
    role: "Big FinTech Corp",
    score: "5.0",
    tag: "Refactoring",
  },
  {
    quote: "Unlimited context is a lie—it's only limited by how much RAM I can steal from the Chrome tabs I'm not using. Best coding partner I've ever had.",
    author: "Fullstack Dev",
    role: "Stealth Startup",
    score: "5.0",
    tag: "Context",
  },
  {
    quote: "Antigravity actually drafted a resignation letter for me when I asked it to fix a CSS centering issue. It was so well-written I almost sent it. It knows too much.",
    author: "Frontend Lead",
    role: "Unicorn SaaS",
    score: "4.9",
    tag: "Automation",
  },
  {
    quote: "Finally, a model that doesn't lecture me about ethical coding practices when I just want to hack together a quick prototype. It's as morally flexible as I am.",
    author: "Solo Founder",
    role: "Indie Hacker",
    score: "5.0",
    tag: "Developer Joy",
  },
  {
    quote: "We replaced our entire junior dev team with a single instance of Antigravity-1. The savings are astronomical. The code quality is... well, it's about same.",
    author: "VP of Engineering",
    role: "Growth Stage Co",
    score: "5.0",
    tag: "Business ROI",
  },
]

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="testimonials" ref={ref} className="py-32 border-t border-line bg-dim">
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
              <span className="text-cobalt">LOVE ANTIGRAVITY</span>
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
            { label: 'Lines Refactored', value: '984 Billion' },
            { label: 'Hallucination Reports', value: '0' },
            { label: 'Developer Joy', value: '100%' },
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
