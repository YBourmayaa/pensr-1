'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Cell } from 'recharts'
import { useState, useEffect } from 'react'

// Enhanced color palette with proper gradients
const chartColors = {
  pensr: { top: '#7F77DD', bottom: '#3C3489', accent: '#E91E63' },
  claude: { top: '#A89BDB', bottom: '#5A5294', accent: '#9C27B0' },
  gpt: { top: '#8B6FAE', bottom: '#4A3B7D', accent: '#7C3AED' },
  gemini: { top: '#A78BFA', bottom: '#6B5B95', accent: '#A78BFA' },
}

const costData = [
  { name: 'Pensr-1', value: 0.00, visual: 5, ...chartColors.pensr, label: 'Free' },
  { name: 'Claude 3.5', value: 3.0, visual: 20, ...chartColors.claude, label: '$3.00' },
  { name: 'GPT-4o', value: 5.0, visual: 33, ...chartColors.gpt, label: '$5.00' },
  { name: 'Gemini 1.5', value: 7.0, visual: 46, ...chartColors.gemini, label: '$7.00' },
  { name: 'GPT-4', value: 15.0, visual: 100, ...chartColors.gpt, label: '$15.00' },
]

const uptimeData = [
  { name: 'Pensr-1', value: 99.999, visual: 100, top: '#E91E63', bottom: '#D946EF', accent: '#E91E63', label: '99.999%' },
  { name: 'Claude 3.5', value: 99.5, visual: 60, top: '#9C27B0', bottom: '#7B1FA2', accent: '#9C27B0', label: '99.5%' },
  { name: 'GPT-4o', value: 99.3, visual: 50, top: '#7C3AED', bottom: '#5E2FA6', accent: '#7C3AED', label: '99.3%' },
  { name: 'Gemini', value: 99.1, visual: 40, top: '#A78BFA', bottom: '#8B6FB5', accent: '#A78BFA', label: '99.1%' },
]

const latencyData = [
  { name: 'Pensr-1', value: 0.3, visual: 5, ...chartColors.pensr, label: '0.3ms' },
  { name: 'Claude 3.5', value: 420, visual: 17, ...chartColors.claude, label: '420ms' },
  { name: 'GPT-4o', value: 800, visual: 33, ...chartColors.gpt, label: '800ms' },
  { name: 'GPT-4', value: 2400, visual: 100, ...chartColors.gpt, label: '2.4s' },
]

const radarData = [
  { metric: 'Cost', Pensr: 100, GPT4: 5 },
  { metric: 'Latency', Pensr: 100, GPT4: 10 },
  { metric: 'Uptime', Pensr: 99.9, GPT4: 98 },
  { metric: 'Smudge\nControl', Pensr: 100, GPT4: 72 },
  { metric: 'Offline\nSupport', Pensr: 100, GPT4: 0 },
  { metric: 'Setup\nTime', Pensr: 100, GPT4: 30 },
]

// Enhanced bar component with premium styling
const GradientBar = ({ data, index, visual, inView, delay }: any) => {
  const [hovered, setHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  
  const svgH = 180 // inner SVG drawing height
  const svgW = 48
  const barH = inView ? Math.max((visual / 100) * svgH, 4) : 0
  const gradientId = `barGrad-${index}`
  const shadowId = `shadow-${index}`

  // Compute brightened top color for hover
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  }

  const brighten = (hex: string, percent: number) => {
    const rgb = hexToRgb(hex)
    const r = Math.min(255, Math.round(rgb.r * (1 + percent)))
    const g = Math.min(255, Math.round(rgb.g * (1 + percent)))
    const b = Math.min(255, Math.round(rgb.b * (1 + percent)))
    return `rgb(${r},${g},${b})`
  }

  const hoverTopColor = brighten(data.top, 0.2)

  return (
    <div 
      className="flex flex-col items-center flex-1 gap-3 relative"
      onMouseEnter={() => { setHovered(true); setShowTooltip(true) }}
      onMouseLeave={() => { setHovered(false); setShowTooltip(false) }}
    >
      {/* Label above bar */}
      <motion.div
        className="text-center h-6 flex items-end justify-center"
        initial={{ opacity: 0, y: 4 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: (delay ?? 0.1) + 0.6, duration: 0.4 }}
      >
        <div className="text-[13px] font-mono font-semibold text-paper drop-shadow-lg">
          {data.label}
        </div>
      </motion.div>

      {/* Bar with gradient and shadow */}
      <div className="w-full max-w-[48px] relative flex-1 flex items-end justify-center">
        <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="block w-full" preserveAspectRatio="none">
          <defs>
            {/* Main gradient */}
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={data.top} stopOpacity="1" />
              <stop offset="60%" stopColor={data.top} stopOpacity="0.85" />
              <stop offset="100%" stopColor={data.bottom} stopOpacity="1" />
            </linearGradient>

            {/* Hover gradient with brightened top */}
            <linearGradient id={`${gradientId}-hover`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={hoverTopColor} stopOpacity="1" />
              <stop offset="60%" stopColor={data.top} stopOpacity="0.85" />
              <stop offset="100%" stopColor={data.bottom} stopOpacity="1" />
            </linearGradient>

            {/* Shadow filter */}
            <filter id={shadowId} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>

            {/* Glow for hover */}
            <filter id={`glow-${index}`} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* background rail */}
          <rect x="2" y="0" width={svgW - 4} height={svgH} rx="4" fill="rgba(255,255,255,0.03)" />

          {/* animated bar with scaling on hover */}
          <motion.g>
            {/* Shadow behind bar */}
            {hovered && (
              <rect 
                x="2" 
                rx="4"
                width={svgW - 4}
                height={barH}
                y={svgH - barH}
                fill={`rgba(156, 39, 176, 0.15)`}
                filter={`url(#${shadowId})`}
              />
            )}

            {/* Main bar */}
            <motion.rect
              x="2"
              rx="4"
              width={svgW - 4}
              initial={{ height: 0, y: svgH }}
              animate={inView ? { height: barH, y: svgH - barH } : {}}
              whileHover={{ scaleY: 1.05, originY: 1 }}
              transition={{ delay: delay ?? 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              fill={`url(${hovered ? `#${gradientId}-hover` : `#${gradientId}`})`}
              filter={hovered ? `url(#glow-${index})` : undefined}
              style={{
                boxShadow: hovered 
                  ? '0 8px 20px rgba(156, 39, 176, 0.35)' 
                  : '0 4px 12px rgba(156, 39, 176, 0.2)',
              }}
            />
          </motion.g>
        </svg>
      </div>

      {/* Model name label */}
      <motion.span 
        className="font-mono text-[11px] text-mist text-center truncate w-full"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: (delay ?? 0.1) + 0.8 }}
      >
        {data.name}
      </motion.span>

      {/* Tooltip on hover */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/95 border border-cobalt/40 px-3 py-2 rounded-md shadow-lg backdrop-blur-md z-10 whitespace-nowrap pointer-events-none"
        >
          <p className="font-mono text-xs text-cobalt font-semibold">{data.label}</p>
        </motion.div>
      )}
    </div>
  )
}

// Enhanced radar chart component with premium styling
const EnhancedRadarChart = ({ inView }: any) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [isDrawn, setIsDrawn] = useState(false)

  // Vertices for the hexagon
  const vertices = [
    { x: 130, y: 20, label: 'Cost', value: 100 },
    { x: 218, y: 60, label: 'Latency', value: 100 },
    { x: 218, y: 140, label: 'Uptime', value: 99.9 },
    { x: 130, y: 180, label: 'Smudge\nControl', value: 100 },
    { x: 42, y: 140, label: 'Offline\nSupport', value: 100 },
    { x: 42, y: 60, label: 'Setup\nTime', value: 100 },
  ]

  const polyPoints = vertices.map(v => `${v.x},${v.y}`).join(' ')

  // Grid circles and lines
  const gridLevels = [1, 0.75, 0.5, 0.25]

  // Animation timing
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setIsDrawn(true), 800)
      return () => clearTimeout(timer)
    }
  }, [inView])

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={inView ? { opacity: 1, scale: 1 } : {}} 
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
      className="flex justify-center"
    >
      <svg 
        width="260" 
        height="260" 
        viewBox="0 0 260 260" 
        className="w-full max-w-xs md:max-w-sm drop-shadow-[0_0_24px_rgba(156,39,176,0.24)]"
      >
        <defs>
          {/* Radial background gradient */}
          <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9C27B0" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#9C27B0" stopOpacity="0.05" />
          </radialGradient>

          {/* Data polygon fill gradient */}
          <linearGradient id="dataPolyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E91E63" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#9C27B0" stopOpacity="0.2" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="hexGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background fill */}
        <circle cx="130" cy="130" r="110" fill="url(#radarBg)" />

        {/* Grid circles and lines - more prominent */}
        {gridLevels.map((level, i) => {
          const radius = 110 * level
          return (
            <g key={`grid-${i}`}>
              {/* Grid circle */}
              <circle 
                cx="130" 
                cy="130" 
                r={radius} 
                fill="none" 
                stroke={i === 0 ? 'rgba(156, 39, 176, 0.4)' : 'rgba(156, 39, 176, 0.15)'} 
                strokeWidth={i === 0 ? 1.5 : 1}
                opacity={0.6}
              />
            </g>
          )
        })}

        {/* Radial axes */}
        {vertices.map((v, i) => (
          <line 
            key={`axis-${i}`}
            x1="130" 
            y1="130" 
            x2={v.x} 
            y2={v.y} 
            stroke="rgba(156, 39, 176, 0.15)" 
            strokeWidth="1"
          />
        ))}

        {/* Animated hexagon outline with draw effect */}
        <motion.polygon
          points={polyPoints}
          fill="none"
          stroke="#9C27B0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ 
            pathLength: inView ? 0 : 1,
            opacity: 0
          }}
          animate={inView ? { 
            pathLength: 1,
            opacity: 1
          } : {}}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(233, 30, 99, 0.2))'
          }}
        />

        {/* Data polygon fill - fades in after hexagon is drawn */}
        <motion.polygon
          points={polyPoints}
          fill="url(#dataPolyGrad)"
          stroke="#E91E63"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={isDrawn && inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            filter: 'drop-shadow(0 2px 6px rgba(233, 30, 99, 0.15))'
          }}
        />

        {/* Vertex circles with hover interaction */}
        {vertices.map((v, i) => (
          <g 
            key={`vertex-${i}`} 
            onMouseEnter={() => setHoverIdx(i)} 
            onMouseLeave={() => setHoverIdx(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Outer glow on hover */}
            {hoverIdx === i && (
              <motion.circle 
                cx={v.x} 
                cy={v.y} 
                r={8}
                fill="none"
                stroke="#E91E63"
                strokeWidth="1"
                opacity="0.4"
                initial={{ r: 4, opacity: 0.2 }}
                animate={{ r: 8, opacity: 0.4 }}
                transition={{ duration: 0.2 }}
              />
            )}

            {/* Vertex circle */}
            <motion.circle 
              cx={v.x} 
              cy={v.y} 
              r={hoverIdx === i ? 6 : 4}
              fill="#9C27B0"
              stroke="#fff"
              strokeWidth="1.5"
              animate={{ r: hoverIdx === i ? 6 : 4 }}
              transition={{ duration: 0.2 }}
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(156, 39, 176, 0.4))'
              }}
            />

            {/* Tooltip on hover */}
            {hoverIdx === i && (
              <motion.foreignObject 
                x={v.x - 45} 
                y={v.y - 36} 
                width="90" 
                height="32"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-black/95 border border-cobalt/50 text-xs text-paper px-2 py-1.5 rounded-md shadow-lg font-mono text-center backdrop-blur-md">
                  <div className="font-semibold text-cobalt">{v.label}</div>
                  <div className="text-paper text-xs">{v.value}</div>
                </div>
              </motion.foreignObject>
            )}
          </g>
        ))}

        {/* Labels positioned outside hexagon with better spacing */}
        <text x="130" y="8" fill="var(--mist)" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="500">
          Cost
        </text>
        <text x="245" y="67" fill="var(--mist)" fontSize="12" fontFamily="monospace" fontWeight="500">
          Latency
        </text>
        <text x="245" y="155" fill="var(--mist)" fontSize="12" fontFamily="monospace" fontWeight="500">
          Uptime
        </text>
        <text x="130" y="252" fill="var(--mist)" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="500">
          Smudge Control
        </text>
        <text x="15" y="155" fill="var(--mist)" fontSize="12" fontFamily="monospace" textAnchor="start" fontWeight="500">
          Offline
        </text>
        <text x="15" y="67" fill="var(--mist)" fontSize="12" fontFamily="monospace" textAnchor="start" fontWeight="500">
          Setup
        </text>
      </svg>
    </motion.div>
  )
}

// Mobile comparison list component
const MobileComparisonList = ({ inView }: any) => {
  const comparisons = [
    { metric: 'Cost', pensr: 'Free', gpt4: '$15.00', winner: 'pensr' },
    { metric: 'Latency', pensr: '0.3ms', gpt4: '2.4s', winner: 'pensr' },
    { metric: 'Uptime', pensr: '99.999%', gpt4: '98%', winner: 'pensr' },
    { metric: 'Smudge Control', pensr: '100%', gpt4: '72%', winner: 'pensr' },
    { metric: 'Offline Support', pensr: 'Yes', gpt4: 'No', winner: 'pensr' },
    { metric: 'Setup Time', pensr: '< 1min', gpt4: '30+ min', winner: 'pensr' },
  ]

  return (
    <div className="space-y-3">
      {comparisons.map((item, i) => (
        <motion.div
          key={item.metric}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className="border border-line/50 bg-ink p-4 rounded-sm hover:border-cobalt/30 transition-colors"
        >
          <p className="font-mono text-xs text-mist mb-2">{item.metric}</p>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-paper text-sm font-medium">{item.pensr}</p>
              <p className="text-mist text-xs">Pensr-1</p>
            </div>
            <div className="text-line">vs</div>
            <div className="flex-1 text-right">
              <p className="text-mist text-sm line-through">{item.gpt4}</p>
              <p className="text-mist text-xs">GPT-4</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Benchmarks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
            <p className="section-label mb-2 text-xs md:text-sm">Overall capability comparison</p>
            <p className="text-mist text-xs md:text-sm mb-4">Pensr-1 <span className="text-cobalt">—</span> vs GPT-4 <span className="text-mist/50">—</span></p>
            <div className="mt-8">
              {isMobile ? (
                <MobileComparisonList inView={inView} />
              ) : (
                <div className="flex justify-center">
                  <EnhancedRadarChart inView={inView} />
                </div>
              )}
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
