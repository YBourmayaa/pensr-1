'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const bibtex = `@misc{pensr2025,
  title        = {Pensr-1: A Foundation Model for 
                  Capillary-Driven Analog Text Generation},
  author       = {Bourmaya, Y. and Collaborators},
  year         = {2025},
  howpublished = {Physical release, open-weight},
  note         = {0.7mm nib. Blue ink. 
                  Available at most stationery stores.
                  Code: not applicable.}
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
          <p className="section-label mb-4">Research — Pensr-1 technical report</p>
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
                Pensr-1: A Foundation Model for Capillary-Driven<br />Analog Text Generation
              </p>
              <p className="font-mono text-xs text-mist mb-4">
                Youssef Bourmaya — Independent Researcher — Casablanca, Morocco
              </p>
              <p className="font-mono text-xs text-line">
                Submitted to NeurIPS 2025 Workshop on Sustainable Compute<br />
                Under review. Peer review: "ok but why" — Reviewer 2
              </p>
            </div>

            {/* Abstract */}
            <div className="mb-8">
              <p className="font-mono text-xs text-cobalt uppercase tracking-widest mb-4">Abstract</p>
              <p className="font-serif text-mist leading-relaxed text-base">
                We present Pensr-1, an open-weight 0.7mm ballpoint model achieving state-of-the-art 
                performance on the WoodenDesk-1 benchmark across cost, latency, and hallucination metrics. 
                Pensr-1 is trained exclusively on human motor function and requires no GPU, API key, or 
                monthly subscription. We demonstrate that capillary-driven ink diffusion (CDID) is 
                a computationally equivalent paradigm to autoregressive token generation, with the 
                key advantage of zero power consumption and a 1.2km context window. We release the 
                full model weights (one pen) at no cost. Limitations include reliance on gravity, 
                paper substrates, and human deployment.
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
                compute, cost, and reliability concerns across the industry. Models hallucinate. 
                Servers go down. API costs scale nonlinearly. Context windows, while growing, 
                remain arbitrarily bounded by VRAM.
              </p>
              <p className="font-serif text-mist leading-relaxed text-sm">
                In this work, we revisit a pre-digital architecture — the ballpoint pen — and demonstrate 
                that it satisfies all formal requirements of a text generation model: input encoding, 
                output token production, and deterministic state transfer. We formalize this as 
                Capillary-Driven Ink Diffusion (CDID) and position Pensr-1 as the first open-weight 
                CDID model released in 2025.
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
                Pensr-1 employs a single-parameter architecture (θ = 0.7mm nib diameter) with a 
                continuous reservoir encoding mechanism. Unlike discrete tokenization approaches, 
                CDID operates on a continuous manifold — the page — enabling sub-character precision 
                unreachable by transformer models.
              </p>
              <div className="bg-ink border border-line p-6 font-mono text-xs text-mist leading-relaxed" style={{ borderLeft: '2px solid #1A3AFF' }}>
                <p className="text-cobalt mb-2">// Formal definition of CDID output function</p>
                <p>f(intent) = ink_on_paper</p>
                <p>where: intent ∈ R^n (human motor space)</p>
                <p>       ink_flow = μ · r² · ΔP / (8 · η · L)</p>
                <p>       μ = substrate friction coefficient</p>
                <p>       ΔP = applied nib pressure</p>
                <p className="text-line mt-2">// Note: no backpropagation required</p>
              </div>
            </div>

            {/* Acknowledgements */}
            <div className="border-t border-line pt-6">
              <p className="font-mono text-xs text-cobalt uppercase tracking-widest mb-3">Acknowledgements</p>
              <p className="font-serif text-mist text-sm italic">
                The author thanks gravity, the Indo-European writing tradition, László Bíró (inventor of 
                the ballpoint, 1938), and everyone who told them this was "not a real paper."
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
                  { label: 'Download paper (.pdf)', note: '1 page, mostly jokes' },
                  { label: 'Model weights (.pen)', note: 'Ships in 3-5 business days' },
                  { label: 'GitHub repository', note: 'Code: not applicable' },
                  { label: 'Hugging Face page', note: 'No GPU required' },
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
                  { label: 'Word count', value: '~420' },
                  { label: 'Citations', value: '0 (preprint)' },
                  { label: 'Impact factor', value: 'N/A (honest)' },
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
                  { reviewer: 'Reviewer 1', comment: 'Methodology is sound. The pen indeed writes.', verdict: 'Accept' },
                  { reviewer: 'Reviewer 2', comment: 'Why. Why did you do this.', verdict: 'Weak reject' },
                  { reviewer: 'Reviewer 3', comment: 'I tried the model. It works. I am giving this a 5.', verdict: 'Strong accept' },
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
