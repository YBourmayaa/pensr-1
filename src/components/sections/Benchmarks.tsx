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

// Enhanced bar component using SVG for crisp graphics
const GradientBar = ({ data, index, visual, inView, delay }: any) => {
  const [hovered, setHovered] = useState(false)
  const svgH = 180 // inner SVG drawing height
  const svgW = 40
  const barH = inView ? Math.max((visual / 100) * svgH, 4) : 0
  const gradientId = `barGrad-${index}`

  return (
    <div className="flex flex-col items-center flex-1 gap-2 group cursor-pointer relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <motion.span className="font-mono text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: data.fill }}>{data.label}</motion.span>

      <div className="w-full max-w-[40px] relative">
        <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="block">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={data.fill} stopOpacity="1" />
              <stop offset="60%" stopColor={data.fill} stopOpacity="0.85" />
              <stop offset="100%" stopColor={data.fill} stopOpacity="0.6" />
            </linearGradient>
            <filter id={`glow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* background rail */}
          <rect x="0" y="0" width={svgW} height={svgH} rx="6" fill="rgba(255,255,255,0.02)" />

          {/* animated bar */}
          <motion.rect
            x="0"
            rx="6"
            width={svgW}
            initial={{ height: 0, y: svgH }}
            animate={inView ? { height: barH, y: svgH - barH } : {}}
            transition={{ delay: delay ?? 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            fill={`url(#${gradientId})`}
            style={{ filter: hovered ? `url(#glow-${index})` : undefined }}
          />

          {/* highlight stripe */}
          <motion.rect x="0" rx="6" width={svgW} height={Math.min(barH, 6)} x1={0} y={svgH - barH} fill="rgba(255,255,255,0.08)" />
        </svg>

        {/* value label */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -top-5 text-center"
          initial={{ opacity: 0, y: 4 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: (delay ?? 0.1) + 0.6 }}
        >
          <div className="text-[11px] font-mono text-paper font-semibold px-1 py-0.5 bg-black/70 rounded-sm shadow-sm">{data.label}</div>
        </motion.div>
      </div>

      <span className="font-mono text-[10px] text-mist mt-2 max-w-[60px] text-center truncate">{data.name}</span>
    </div>
  )
}

// Enhanced radar chart component
// Enhanced radar chart component with draw animation and hover tooltips
const EnhancedRadarChart = ({ inView }: any) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  // hardcoded vertices (same as before) for simplicity
  const vertices = [
    { x: 130, y: 25, label: 'Cost', value: 100 },
    { x: 210, y: 67.5, label: 'Latency', value: 100 },
    { x: 210, y: 152.5, label: 'Uptime', value: 99.9 },
    { x: 130, y: 195, label: 'Smudge', value: 100 },
    { x: 50, y: 152.5, label: 'Offline', value: 100 },
    { x: 50, y: 67.5, label: 'Setup', value: 100 },
  ]

  const polyPoints = vertices.map(v => `${v.x},${v.y}`).join(' ')

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8 }} className="flex justify-center">
      <svg width="260" height="260" viewBox="0 0 260 260" className="w-full max-w-xs md:max-w-sm" style={{ filter: 'drop-shadow(0 0 24px rgba(156,39,176,0.16))' }}>
        <defs>
          <linearGradient id="radarGradPensr" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9C27B0" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id="radarGlowPensr" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9C27B0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#9C27B0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft glow */}
        <circle cx="130" cy="130" r="110" fill="url(#radarGlowPensr)" opacity="0.28" />

        {/* Grid rings */}
        {[1, 0.75, 0.5, 0.25].map((m, i) => (
          <polygon key={i} points={vertices.map(v => `${130 + (v.x - 130) * m},${130 + (v.y - 130) * m}`).join(' ')} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={1 + (i === 0 ? 0.6 : 0)} />
        ))}

        {/* Axes */}
        {vertices.map((v, i) => (
          <line key={i} x1="130" y1="130" x2={v.x} y2={v.y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}

        {/* Animated Pensr polygon - draw effect */}
        <motion.polygon
          points={polyPoints}
          fill="url(#radarGradPensr)"
          stroke="#9C27B0"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0.8, pathLength: 0 }}
          animate={inView ? { opacity: 1, scale: 1, pathLength: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: 'drop-shadow(0 6px 18px rgba(156,39,176,0.12))' }}
        />

        {/* Data points with hover interaction */}
        {vertices.map((v, i) => (
          <g key={i} onMouseEnter={() => setHoverIdx(i)} onMouseLeave={() => setHoverIdx(null)}>
            <circle cx={v.x} cy={v.y} r={hoverIdx === i ? 6 : 4} fill="#9C27B0" stroke="#fff" strokeWidth={1} />
            {hoverIdx === i && (
              <foreignObject x={v.x + 8} y={v.y - 18} width="120" height="36">
                <div className="bg-black/90 text-xs text-paper px-2 py-1 rounded-md shadow-md font-mono">{v.label}: {v.value}</div>
              </foreignObject>
            )}
          </g>
        ))}

        {/* Axis labels */}
        <text x="130" y="12" fill="#e9d6ff" fontSize="11" fontFamily="monospace" textAnchor="middle">Cost</text>
        <text x="232" y="70" fill="#e9d6ff" fontSize="11" fontFamily="monospace">Latency</text>
        <text x="232" y="162" fill="#e9d6ff" fontSize="11" fontFamily="monospace">Uptime</text>
        <text x="130" y="250" fill="#e9d6ff" fontSize="11" fontFamily="monospace" textAnchor="middle">Smudge</text>
        <text x="18" y="162" fill="#e9d6ff" fontSize="11" fontFamily="monospace" textAnchor="end">Offline</text>
        <text x="18" y="70" fill="#e9d6ff" fontSize="11" fontFamily="monospace" textAnchor="end">Setup</text>
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
