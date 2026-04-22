'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Cell } from 'recharts'
import { useState } from 'react'

const costData = [
  { name: 'Pensr-1', value: 0.00, visual: 5, fill: '#a855f7', gradient: 'from-cobalt to-purple-900', label: 'Free' },
  { name: 'Claude 3.5', value: 3.0, visual: 20, fill: '#6366f1', gradient: 'from-indigo-500 to-indigo-900', label: '$3.00' },
  { name: 'GPT-4o', value: 5.0, visual: 33, fill: '#8b5cf6', gradient: 'from-violet-500 to-violet-900', label: '$5.00' },
  { name: 'Gemini 1.5', value: 7.0, visual: 46, fill: '#a78bfa', gradient: 'from-purple-400 to-purple-800', label: '$7.00' },
  { name: 'GPT-4', value: 15.0, visual: 100, fill: '#c4b5fd', gradient: 'from-purple-300 to-purple-700', label: '$15.00' },
]

const uptimeData = [
  { name: 'Pensr-1', value: 99.999, visual: 100, fill: '#a855f7', gradient: 'from-cobalt to-purple-900', label: '99.999%' },
  { name: 'Claude 3.5', value: 99.5, visual: 60, fill: '#6366f1', gradient: 'from-indigo-500 to-indigo-900', label: '99.5%' },
  { name: 'GPT-4o', value: 99.3, visual: 50, fill: '#8b5cf6', gradient: 'from-violet-500 to-violet-900', label: '99.3%' },
  { name: 'Gemini', value: 99.1, visual: 40, fill: '#a78bfa', gradient: 'from-purple-400 to-purple-800', label: '99.1%' },
]

const latencyData = [
  { name: 'Pensr-1', value: 0.3, visual: 5, fill: '#a855f7', gradient: 'from-cobalt to-purple-900', label: '0.3ms' },
  { name: 'Claude 3.5', value: 420, visual: 17, fill: '#6366f1', gradient: 'from-indigo-500 to-indigo-900', label: '420ms' },
  { name: 'GPT-4o', value: 800, visual: 33, fill: '#8b5cf6', gradient: 'from-violet-500 to-violet-900', label: '800ms' },
  { name: 'GPT-4', value: 2400, visual: 100, fill: '#a78bfa', gradient: 'from-purple-400 to-purple-800', label: '2.4s' },
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
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/95 border border-cobalt/50 px-4 py-3 rounded-lg shadow-lg shadow-cobalt/20 backdrop-blur-xl"
      >
        <p className="font-mono text-xs text-mist mb-1">{label}</p>
        <p className="font-mono text-sm text-cobalt font-semibold">{payload[0].value}</p>
      </motion.div>
    )
  }
  return null
}

// Enhanced bar component with gradient
const GradientBar = ({ data, index, visual, inView, delay }: any) => {
  const [hovered, setHovered] = useState(false)
  
  return (
    <motion.div 
      key={index} 
      className="flex flex-col items-center flex-1 gap-2 group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.span 
        className="font-mono text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: data.fill }}
      >
        {data.label}
      </motion.span>
      <div className="w-full max-w-[40px] relative">
        <div 
          className="w-full rounded-t-sm transition-all duration-300 origin-bottom relative overflow-hidden"
          style={{ 
            height: inView ? `${visual}%` : '0%',
            minHeight: visual > 0 ? '4px' : '0',
            background: `linear-gradient(180deg, ${data.fill} 0%, ${data.fill}cc 50%, ${data.fill}88 100%)`
          }}
        >
          {/* Glow effect on hover */}
          {hovered && (
            <motion.div 
              className="absolute inset-0 rounded-t-sm"
              style={{ 
                boxShadow: `0 0 20px ${data.fill}80, inset 0 0 10px ${data.fill}40`
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>
      </div>
      <span className="font-mono text-[10px] text-mist mt-2 max-w-[60px] text-center truncate">{data.name}</span>
    </motion.div>
  )
}

// Enhanced radar chart component
const EnhancedRadarChart = ({ inView }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="flex justify-center"
    >
      <svg width="260" height="260" viewBox="0 0 260 260" style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.2))' }} className="w-full max-w-xs md:max-w-sm">
        <defs>
          {/* Gradients */}
          <linearGradient id="radarGradPensr" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="radarGlowPensr" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
          <filter id="radarBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Animated glow background */}
        <circle cx="130" cy="130" r="110" fill="url(#radarGlowPensr)" opacity="0.3" />

        {/* Background grid - enhanced */}
        <polygon points="130,25 210,67.5 210,152.5 130,195 50,152.5 50,67.5" fill="none" stroke="#3a3a4a" strokeWidth="1.5" />
        <polygon points="130,50 185,82.5 185,147.5 130,180 75,147.5 75,82.5" fill="none" stroke="#2a2a3a" strokeWidth="1" />
        <polygon points="130,75 160,95 160,135 130,155 100,135 100,95" fill="none" stroke="#1a1a2a" strokeWidth="0.8" />
        
        {/* Center point */}
        <circle cx="130" cy="130" r="3" fill="#a855f7" opacity="0.6" />

        {/* Axes - enhanced */}
        <line x1="130" y1="130" x2="130" y2="25" stroke="#4a4a5a" strokeWidth="1.2" />
        <line x1="130" y1="130" x2="210" y2="67.5" stroke="#4a4a5a" strokeWidth="1.2" />
        <line x1="130" y1="130" x2="210" y2="152.5" stroke="#4a4a5a" strokeWidth="1.2" />
        <line x1="130" y1="130" x2="130" y2="195" stroke="#4a4a5a" strokeWidth="1.2" />
        <line x1="130" y1="130" x2="50" y2="152.5" stroke="#4a4a5a" strokeWidth="1.2" />
        <line x1="130" y1="130" x2="50" y2="67.5" stroke="#4a4a5a" strokeWidth="1.2" />

        {/* Labels - better contrast */}
        <text x="130" y="10" fill="#a855f7" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="600">Cost</text>
        <text x="225" y="70" fill="#a855f7" fontSize="11" fontFamily="monospace" fontWeight="600">Latency</text>
        <text x="225" y="155" fill="#a855f7" fontSize="11" fontFamily="monospace" fontWeight="600">Uptime</text>
        <text x="130" y="250" fill="#a855f7" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="600">Smudge</text>
        <text x="15" y="155" fill="#a855f7" fontSize="11" fontFamily="monospace" textAnchor="end" fontWeight="600">Offline</text>
        <text x="15" y="70" fill="#a855f7" fontSize="11" fontFamily="monospace" textAnchor="end" fontWeight="600">Setup</text>

        {/* GPT4 Polygon - dashed */}
        <motion.polygon 
          points="130,115 138,115 204,168 83,190 130,120 94,105" 
          fill="#8A8A9A" 
          fillOpacity="0.08" 
          stroke="#8A8A9A" 
          strokeWidth="1.5" 
          strokeDasharray="5 3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        />
        
        {/* Pensr Polygon - animated */}
        <motion.polygon 
          points="130,25 210,67.5 210,152.5 130,195 50,152.5 50,67.5" 
          fill="url(#radarGradPensr)" 
          stroke="#a855f7" 
          strokeWidth="2.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
        />

        {/* Data point markers for Pensr */}
        <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.4 }}>
          <circle cx="130" cy="25" r="3.5" fill="#a855f7" stroke="#fff" strokeWidth="1" />
          <circle cx="210" cy="67.5" r="3.5" fill="#a855f7" stroke="#fff" strokeWidth="1" />
          <circle cx="210" cy="152.5" r="3.5" fill="#a855f7" stroke="#fff" strokeWidth="1" />
          <circle cx="130" cy="195" r="3.5" fill="#a855f7" stroke="#fff" strokeWidth="1" />
          <circle cx="50" cy="152.5" r="3.5" fill="#a855f7" stroke="#fff" strokeWidth="1" />
          <circle cx="50" cy="67.5" r="3.5" fill="#a855f7" stroke="#fff" strokeWidth="1" />
        </motion.g>
      </svg>
    </motion.div>
  )
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
            className="bg-dim p-6 md:p-10 border border-line/30 hover:border-cobalt/20 transition-colors"
          >
            <p className="section-label mb-2 text-xs md:text-sm">Cost per 1M words (USD)</p>
            <p className="text-mist text-xs md:text-sm mb-6 md:mb-8">Lower is better. Pensr-1 wins by literally costlessness.</p>
            <div className="flex items-end justify-between h-[210px] mt-12 gap-1.5 md:gap-2 border-b border-cobalt/10 pb-2">
              {costData.map((d, i) => (
                <GradientBar key={i} data={d} index={i} visual={d.visual} inView={inView} delay={0.15 + i * 0.08} />
              ))}
            </div>
          </motion.div>

          {/* Uptime chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            className="bg-dim p-6 md:p-10 border border-line/30 hover:border-cobalt/20 transition-colors"
          >
            <p className="section-label mb-2 text-xs md:text-sm">Uptime % (all-time)</p>
            <p className="text-mist text-xs md:text-sm mb-6 md:mb-8">Pensr-1 has never had a downtime incident since deployment.</p>
            <div className="flex items-end justify-between h-[210px] mt-12 gap-1.5 md:gap-2 border-b border-cobalt/10 pb-2">
              {uptimeData.map((d, i) => (
                <GradientBar key={i} data={d} index={i} visual={d.visual} inView={inView} delay={0.25 + i * 0.08} />
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
            className="bg-dim p-6 md:p-10 border border-line/30 hover:border-cobalt/20 transition-colors"
          >
            <p className="section-label mb-2 text-xs md:text-sm">Time-to-first-word (ms)</p>
            <p className="text-mist text-xs md:text-sm mb-6 md:mb-8">Pensr-1: 0.3ms. Analog speed propagation bypasses internet latency.</p>
            <div className="flex items-end justify-between h-[210px] mt-12 gap-1.5 md:gap-2 border-b border-cobalt/10 pb-2">
              {latencyData.map((d, i) => (
                <GradientBar key={i} data={d} index={i} visual={d.visual} inView={inView} delay={0.35 + i * 0.08} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            className="bg-dim p-6 md:p-10 border border-line/30 hover:border-cobalt/20 transition-colors"
          >
            <p className="section-label mb-2 text-xs md:text-sm">Overall capability radar</p>
            <p className="text-mist text-xs md:text-sm mb-4">Pensr-1 <span className="text-cobalt">—</span> vs GPT-4 <span className="text-mist/50">—</span></p>
            <div className="flex justify-center mt-8">
              <EnhancedRadarChart inView={inView} />
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
