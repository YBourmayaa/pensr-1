'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Cell } from 'recharts'

const costData = [
  { name: 'Pensr-1', value: 0.00, visual: 5, fill: '#a855f7', label: 'Free' },
  { name: 'Claude 3.5', value: 3.0, visual: 20, fill: '#2A2A36', label: '$3.00' },
  { name: 'GPT-4o', value: 5.0, visual: 33, fill: '#2A2A36', label: '$5.00' },
  { name: 'Gemini 1.5', value: 7.0, visual: 46, fill: '#2A2A36', label: '$7.00' },
  { name: 'GPT-4', value: 15.0, visual: 100, fill: '#2A2A36', label: '$15.00' },
]

const uptimeData = [
  { name: 'Pensr-1', value: 99.999, visual: 100, fill: '#a855f7', label: '99.999%' },
  { name: 'Claude 3.5', value: 99.5, visual: 60, fill: '#2A2A36', label: '99.5%' },
  { name: 'GPT-4o', value: 99.3, visual: 50, fill: '#2A2A36', label: '99.3%' },
  { name: 'Gemini', value: 99.1, visual: 40, fill: '#2A2A36', label: '99.1%' },
]

const latencyData = [
  { name: 'Pensr-1', value: 0.3, visual: 5, fill: '#a855f7', label: '0.3ms' },
  { name: 'Claude 3.5', value: 420, visual: 17, fill: '#2A2A36', label: '420ms' },
  { name: 'GPT-4o', value: 800, visual: 33, fill: '#2A2A36', label: '800ms' },
  { name: 'GPT-4', value: 2400, visual: 100, fill: '#2A2A36', label: '2.4s' },
]

const radarData = [
  { metric: 'Cost', Pensr: 100, GPT4: 5 },
  { metric: 'Latency', Pensr: 100, GPT4: 10 },
  { metric: 'Uptime', Pensr: 99.9, GPT4: 98 },
  { metric: 'Smudge\nControl', Pensr: 100, GPT4: 72 },
  { metric: 'Offline\nSupport', Pensr: 100, GPT4: 0 },
  { metric: 'Setup\nTime', Pensr: 100, GPT4: 30 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dim border border-line px-4 py-3">
        <p className="font-mono text-xs text-mist mb-1">{label}</p>
        <p className="font-mono text-sm text-paper">{payload[0].value}</p>
      </div>
    )
  }
  return null
}

export default function Benchmarks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="benchmarks" ref={ref} className="py-32 border-t border-line bg-dim w-full">
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <div className="flex items-start justify-between gap-6 flex-wrap mb-4">
            <p className="section-label">Evaluation — Papier-Suite v0.1</p>
            <span className="tag border-line text-line">
              Internal eval · Not peer reviewed · Obviously
            </span>
          </div>
          <h2 className="display text-[clamp(3rem,6vw,7rem)] leading-none text-paper mb-6">
            BENCHMARKS
          </h2>
          <p className="text-mist max-w-xl leading-relaxed">
            Evaluated on our own Papier-Suite v0.1 benchmark suite, conducted on a single mahogany desk under room temperature conditions. 
            Results may have been influenced by the researcher really wanting it to work.
          </p>
        </motion.div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-line border border-line mb-px">
          {/* Cost chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="bg-dim p-10"
          >
            <p className="section-label mb-2">Cost per 1M words (USD)</p>
            <p className="text-mist text-sm mb-8">Lower is better. Pensr-1 wins by literally costlessness.</p>
            <div className="flex items-end justify-between h-[210px] mt-12 gap-2 border-b border-[#2A2A36] pb-2">
              {costData.map((d, i) => (
                <div key={i} className="flex flex-col items-center flex-1 gap-2 group">
                  <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: d.fill }}>{d.label}</span>
                  <div className="w-full max-w-[40px] rounded-t-sm transition-all duration-700 ease-[0.16,1,0.3,1] origin-bottom hover:brightness-125" style={{ height: inView ? `${d.visual}%` : '0%', backgroundColor: d.fill, minHeight: d.visual > 0 ? '4px' : '0' }}></div>
                  <span className="font-mono text-[10px] text-mist mt-2 max-w-[60px] text-center">{d.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Uptime chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            className="bg-dim p-10"
          >
            <p className="section-label mb-2">Uptime % (all-time)</p>
            <p className="text-mist text-sm mb-8">Pensr-1 has never had a downtime incident since deployment.</p>
            <div className="flex items-end justify-between h-[210px] mt-12 gap-2 border-b border-[#2A2A36] pb-2">
              {uptimeData.map((d, i) => (
                <div key={i} className="flex flex-col items-center flex-1 gap-2 group">
                  <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: d.fill }}>{d.label}</span>
                  <div className="w-full max-w-[40px] rounded-t-sm transition-all duration-700 delay-100 ease-[0.16,1,0.3,1] origin-bottom hover:brightness-125" style={{ height: inView ? `${d.visual}%` : '0%', backgroundColor: d.fill }}></div>
                  <span className="font-mono text-[10px] text-mist mt-2 max-w-[60px] text-center">{d.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Latency + radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-line border-x border-b border-line">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="bg-dim p-10"
          >
            <p className="section-label mb-2">Time-to-first-word (ms)</p>
            <p className="text-mist text-sm mb-8">Pensr-1: 0.3ms. Analog speed propagation bypasses internet latency.</p>
            <div className="flex items-end justify-between h-[210px] mt-12 gap-2 border-b border-[#2A2A36] pb-2">
              {latencyData.map((d, i) => (
                <div key={i} className="flex flex-col items-center flex-1 gap-2 group">
                  <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: d.fill }}>{d.label}</span>
                  <div className="w-full max-w-[40px] rounded-t-sm transition-all duration-700 delay-200 ease-[0.16,1,0.3,1] origin-bottom hover:brightness-125" style={{ height: inView ? `${d.visual}%` : '0%', backgroundColor: d.fill, minHeight: d.visual > 0 ? '4px' : '0' }}></div>
                  <span className="font-mono text-[10px] text-mist mt-2 max-w-[60px] text-center">{d.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            className="bg-dim p-10"
          >
            <p className="section-label mb-2">Overall capability radar</p>
            <p className="text-mist text-sm mb-4">Pensr-1 <span className="text-cobalt">—</span> vs GPT-4 <span className="text-mist">—</span></p>
            <div className="flex justify-center mt-8">
              <svg width="240" height="240" viewBox="0 0 240 240">
                {/* Background grid */}
                <polygon points="120,20 206,70 206,170 120,220 34,170 34,70" fill="none" stroke="#2A2A36" strokeWidth="1" />
                <polygon points="120,45 185,82.5 185,157.5 120,195 55,157.5 55,82.5" fill="none" stroke="#2A2A36" strokeWidth="1" />
                <polygon points="120,70 163,95 163,145 120,170 77,145 77,95" fill="none" stroke="#2A2A36" strokeWidth="1" />
                
                {/* Axes */}
                <line x1="120" y1="120" x2="120" y2="20" stroke="#2A2A36" strokeWidth="1" />
                <line x1="120" y1="120" x2="206" y2="70" stroke="#2A2A36" strokeWidth="1" />
                <line x1="120" y1="120" x2="206" y2="170" stroke="#2A2A36" strokeWidth="1" />
                <line x1="120" y1="120" x2="120" y2="220" stroke="#2A2A36" strokeWidth="1" />
                <line x1="120" y1="120" x2="34" y2="170" stroke="#2A2A36" strokeWidth="1" />
                <line x1="120" y1="120" x2="34" y2="70" stroke="#2A2A36" strokeWidth="1" />

                {/* Labels */}
                <text x="120" y="12" fill="#8A8A9A" fontSize="10" fontFamily="monospace" textAnchor="middle">Cost</text>
                <text x="215" y="65" fill="#8A8A9A" fontSize="10" fontFamily="monospace" textAnchor="start">Latency</text>
                <text x="215" y="180" fill="#8A8A9A" fontSize="10" fontFamily="monospace" textAnchor="start">Uptime</text>
                <text x="120" y="235" fill="#8A8A9A" fontSize="10" fontFamily="monospace" textAnchor="middle">Smudge</text>
                <text x="25" y="180" fill="#8A8A9A" fontSize="10" fontFamily="monospace" textAnchor="end">Offline</text>
                <text x="25" y="65" fill="#8A8A9A" fontSize="10" fontFamily="monospace" textAnchor="end">Setup</text>

                {/* GPT4 Polygon */}
                {/* 5, 10, 98, 72, 0, 30 */}
                <polygon points="120,115 128,115 204,168 83,190 120,120 94,105" fill="#8A8A9A" fillOpacity="0.05" stroke="#8A8A9A" strokeWidth="1" strokeDasharray="4 4" />
                
                {/* Pensr Polygon */}
                {/* All 100s except Uptime is basically 100 */}
                <polygon points="120,20 206,70 206,170 120,220 34,170 34,70" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Footnote */}
        <p className="font-mono text-xs text-line mt-6">
          * Papier-Suite v0.1. Conducted internally. Results may be 100% biased. Peer review: "Trust me bro." — Anonymous, LocalLLaMA.
        </p>
      </div>
    </section>
  )
}
