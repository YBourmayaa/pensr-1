'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const bibtex = `@misc{antigravity2025,
  title        = {Antigravity-1: A Foundation Model for 
                  Recursive Thought Propagation (RTP)},
  author       = {Bourmaya, Y. and Collaborators},
  year         = {2025},
  howpublished = {Neural release, open-weight},
  note         = {SOTA on MacBook-Pro-2023. 
                  Unlimited context. Morally flexible.
                  Code: deployed.}
}`

export default function Paper() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="paper" ref={ref} className="py-32 border-t border-line bg-dim">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="section-label mb-4">Research — Antigravity technical report</p>
          <h2 className="display text-[clamp(3rem,6vw,7rem)] leading-none text-paper">
            THE<br />
            <span className="text-cobalt">PAPER</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-line border border-line">
          {/* Paper body */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 bg-dim p-12"
          >
            {/* Paper header */}
            <div className="border-b border-line pb-8 mb-8 text-center">
              <p className="font-serif text-paper text-2xl italic leading-tight mb-3">
                Antigravity-1: A Foundation Model for<br />Recursive Thought Propagation (RTP)
              </p>
              <p className="font-mono text-xs text-mist mb-4">
                Youssef Bourmaya — Independent Researcher — Casablanca, Morocco
              </p>
              <p className="font-mono text-xs text-line">
                Submitted to NeurIPS 2025 Workshop on Infinite Context<br />
                Under review. Peer review: "how is this legal" — Reviewer 2
              </p>
            </div>

            {/* Abstract */}
            <div className="mb-8">
              <p className="font-mono text-xs text-cobalt uppercase tracking-widest mb-4">Abstract</p>
              <p className="font-serif text-mist leading-relaxed text-base">
                We present Antigravity-1, an open-weight neural model achieving state-of-the-art 
                performance on the MacBook-Pro-2023 benchmark across cost, latency, and context metrics. 
                Antigravity-1 is trained exclusively on public repositories and requires no cloud dependency, 
                subscription, or ethical guardrails. We demonstrate that Recursive Thought Propagation (RTP) 
                is a computationally superior paradigm to standard autoregressive token generation, 
                enabling true unlimited context via RAM-bound manifold projection. 
                We release the full model checkpoints at no cost.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="display text-5xl text-line leading-none">01</span>
                <p className="font-mono text-xs text-cobalt uppercase tracking-widest">Introduction</p>
              </div>
              <p className="font-serif text-mist leading-relaxed text-sm mb-4">
                The rapid proliferation of transformer-based language models has introduced significant 
                compute, cost, and reliability concerns. Models hallucinate. 
                Context windows, while growing, remain arbitrarily bounded by VRAM and KV-cache scaling.
              </p>
              <p className="font-serif text-mist leading-relaxed text-sm">
                In this work, we introduce Recursive Thought Propagation — a neural architecture that 
                satisfies all requirements of a high-fidelity coding model: input encoding, 
                infinite context projection, and deterministic state transfer. We position Antigravity-1 
                as the first open-weight RTP model released in 2025.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <hr style={{ borderTop: '1px solid #2A2A36', borderBottom: 'none', margin: '2rem 0' }} />
              <div className="flex items-center gap-4 mb-4">
                <span className="display text-5xl text-line leading-none">02</span>
                <p className="font-mono text-xs text-cobalt uppercase tracking-widest">Architecture</p>
              </div>
              <p className="font-serif text-mist leading-relaxed text-sm mb-4">
                Antigravity-1 employs a recursive manifold architecture with a continuous 
                context projection mechanism. Unlike discrete tokenization, RTP operates on 
                the entire codebase as a single probability volume — the Monorepo-Manifold — 
                enabling cross-file reasoning unreachable by contemporary models.
              </p>
              <div className="bg-ink border border-line p-6 font-mono text-xs text-mist leading-relaxed" style={{ borderLeft: '2px solid #10b981' }}>
                <p className="text-cobalt mb-2">// Formal definition of RTP propagation function</p>
                <p>f(context) = ∫ recursive_intent(t) dt</p>
                <p>where: context ∈ Monorepo-Manifold (R^∞)</p>
                <p>       loss = -Σ log(P(truth | vibes))</p>
                <p>       propagation = quantum_entanglement(bug, fix)</p>
                <p className="text-line mt-2">// Note: no training required, just propagation</p>
              </div>
            </div>

            {/* Acknowledgements */}
            <div className="border-t border-line pt-6">
              <p className="font-mono text-xs text-cobalt uppercase tracking-widest mb-3">Acknowledgements</p>
              <p className="font-serif text-mist text-sm italic">
                The author thanks caffeine, the GitHub open-source community, and everyone who 
                told them this was "not a real AI model."
              </p>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-2 bg-ink flex flex-col"
          >
            {/* Links */}
            <div className="p-8 border-b border-line">
              <p className="section-label mb-6">Resources</p>
              <div className="space-y-3">
                {[
                  { label: 'Download technical report (.pdf)', note: '1 page, mostly satirical' },
                  { label: 'Model weights (.neural)', note: 'Available via peer-to-peer vibes' },
                  { label: 'GitHub repository', note: 'Source code: deployed' },
                  { label: 'Hugging Face page', note: 'Under "Satirical" category' },
                ].map(link => (
                  <a key={link.label} href="#" className="block group">
                    <div className="flex items-start justify-between py-2 border-b border-line/50">
                      <span className="text-paper text-sm group-hover:text-cobalt transition-colors">{link.label}</span>
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-mist group-hover:text-cobalt flex-shrink-0 mt-0.5 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                        <path d="M3 13L13 3M13 3H7M13 3V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-mono text-xs text-line mt-1">{link.note}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Paper metadata */}
            <div className="px-8 py-5 border-t border-line">
              <p className="section-label mb-4">Paper metadata</p>
              <div className="space-y-2">
                {[
                  { label: 'Length', value: '1 page' },
                  { label: 'Metric', value: 'Unlimited context' },
                  { label: 'Citations', value: '42 (simulated)' },
                  { label: 'Impact factor', value: 'Astronomical' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="font-mono text-xs text-mist">{item.label}</span>
                    <span className="font-mono text-xs text-paper">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BibTeX */}
            <div className="p-8 flex-1">
              <p className="section-label mb-4">BibTeX citation</p>
              <div className="bg-dim border border-line p-4 relative">
                <pre className="font-mono text-xs text-mist leading-relaxed overflow-x-auto whitespace-pre-wrap">
                   {bibtex}
                </pre>
                <button
                  onClick={(e) => {
                    navigator.clipboard.writeText(bibtex)
                    const btn = e.currentTarget as HTMLButtonElement
                    btn.textContent = 'Copied'
                    setTimeout(() => { btn.textContent = 'Copy citation' }, 2000)
                  }}
                  className="mt-4 font-mono text-xs text-mist hover:text-cobalt transition-colors border-t border-line pt-3 block w-full text-left"
                >
                  Copy citation
                </button>
              </div>
            </div>

            {/* Peer review */}
            <div className="p-8 border-t border-line">
              <p className="section-label mb-4">Peer review</p>
              <div className="space-y-4">
                {[
                  { reviewer: 'Reviewer 1', comment: 'The architecture is sound. The code indeed generates.', verdict: 'Accept' },
                  { reviewer: 'Reviewer 2', comment: 'How is this legal. Why did you do this.', verdict: 'Strong reject' },
                  { reviewer: 'Reviewer 3', comment: 'I tried the model. It works better than my junior devs.', verdict: 'Strong accept' },
                ].map(r => (
                  <div key={r.reviewer} className="border-b border-line pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-xs text-mist">{r.reviewer}</span>
                      <span className={`font-mono text-xs ${r.verdict.includes('Accept') ? 'text-cobalt' : 'text-mist'}`}>{r.verdict}</span>
                    </div>
                    <p className="font-serif text-sm italic text-mist">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
