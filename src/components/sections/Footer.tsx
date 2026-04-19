'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PenIcon } from '../icons/PenIcon'

const links = {
  Product: ['Model card', 'Features', 'Benchmarks', 'Pricing', 'Changelog'],
  Research: ['Technical paper', 'BibTeX', 'WoodenDesk-1', 'Model weights', 'Replicate'],
  Company: ['About', 'Blog', 'Careers', 'Press kit', 'Contact'],
  Legal: ['Privacy policy', 'Terms of use', 'Cookie policy', 'Ink disposal'],
}

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <footer ref={ref} className="border-t border-line">
      {/* CTA strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="border-b border-line py-24 px-8"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <p className="section-label mb-6">Final thought</p>
              <h2 className="display text-[clamp(3rem,6vw,6rem)] leading-none text-paper mb-6">
                WE GOT YOUR<br />
                ATTENTION WITH<br />
                <span className="text-cobalt">A PEN.</span>
              </h2>
              <p className="text-mist text-lg leading-relaxed max-w-md">
                Imagine what we can do for your actual product. If you can sell a ballpoint pen 
                as a frontier AI model, you can sell anything — beautifully.
              </p>
            </div>

            <div className="lg:text-right">
              <p className="text-mist mb-6 leading-relaxed">
                This entire site is a creative portfolio piece.<br />
                Pensr-1 is a real pen. No products are for sale.<br />
                All benchmark claims are satirical.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                <a
                  href="mailto:hello@pensr.ai"
                  className="px-8 py-4 bg-cobalt hover:bg-cobalt2 text-paper font-medium transition-colors text-center"
                >
                  Work with us
                </a>
                <a
                  href="#"
                  className="px-8 py-4 border border-line hover:bg-dim text-paper font-medium transition-colors text-center"
                >
                  Share this site
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Links grid */}
      <div className="border-b border-line py-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <p className="section-label mb-6">{category}</p>
                <ul className="space-y-3">
                  {items.map(item => (
                    <li key={item}>
                      <a href="#" className="text-mist hover:text-paper transition-colors text-sm ink-underline">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-6 px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 text-cobalt">
              <PenIcon />
            </div>
            <span className="font-mono text-xs text-mist">Pensr-1 A0B — Open-weight analog model — Est. 1943</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-xs text-line">
              © 2025 Pensr AI. All rights reserved. Especially the cap.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
