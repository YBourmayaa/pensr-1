'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'

const costData = [
  { name: 'Pensr-1', value: 0.002, fill: '#1A3AFF' },
  { name: 'Claude 3', value: 3.0, fill: '#2A2A36' },
  { name: 'GPT-4o', value: 5.0, fill: '#2A2A36' },
  { name: 'Gemini 1.5', value: 7.0, fill: '#2A2A36' },
  { name: 'GPT-4', value: 15.0, fill: '#2A2A36' },
]

const uptimeData = [
  { name: 'Pensr-1', value: 99.99, fill: '#1A3AFF' },
  { name: 'Claude 3', value: 99.5, fill: '#2A2A36' },
  { name: 'GPT-4o', value: 99.3, fill: '#2A2A36' },
  { name: 'Gemini', value: 99.1, fill: '#2A2A36' },
]

const latencyData = [
  { name: 'Pensr-1', value: 0, fill: '#1A3AFF' },
  { name: 'Claude 3', value: 820, fill: '#2A2A36' },
  { name: 'GPT-4o', value: 1100, fill: '#2A2A36' },
  { name: 'GPT-4', value: 2400, fill: '#2A2A36' },
]

const radarData = [
  { metric: 'Cost', Pensr: 100, GPT4: 5 },
  { metric: 'Latency', Pensr: 100, GPT4: 10 },
  { metric: 'Uptime', Pensr: 99, GPT4: 98 },
  { metric: 'Hallucination\nControl', Pensr: 100, GPT4: 72 },
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
    <section id="benchmarks" ref={ref} className="py-32 border-t border-line bg-dim">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <div className="flex items-start justify-between gap-6 flex-wrap mb-4">
            <p className="section-label">Evaluation — WoodenDesk-1 Suite</p>
            <span className="tag border-line text-line">
              Internal eval · Not peer reviewed · Obviously
            </span>
          </div>
          <h2 className="display text-[clamp(3rem,6vw,7rem)] leading-none text-paper mb-6">
            BENCHMARKS
          </h2>
          <p className="text-mist max-w-xl leading-relaxed">
            Evaluated on our own WoodenDesk-1 benchmark suite, conducted on a single desk under natural light conditions. 
            Results may have been influenced by the researcher being a pen enthusiast.
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
            <p className="section-label mb-2">Cost per 1M tokens (USD)</p>
            <p className="text-mist text-sm mb-8">Lower is better. Pensr-1 wins by 7,500x.</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={costData} barSize={36}>
                <CartesianGrid vertical={false} stroke="#2A2A36" strokeDasharray="4 4" />
                <XAxis dataKey="name" tick={{ fill: '#8A8A9A', fontSize: 11, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8A8A9A', fontSize: 11, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {costData.map((entry, i) => (
                    <rect key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Uptime chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            className="bg-dim p-10"
          >
            <p className="section-label mb-2">Uptime % (all-time)</p>
            <p className="text-mist text-sm mb-8">Pensr-1 has never had a downtime incident since 1943.</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={uptimeData} barSize={36}>
                <CartesianGrid vertical={false} stroke="#2A2A36" strokeDasharray="4 4" />
                <XAxis dataKey="name" tick={{ fill: '#8A8A9A', fontSize: 11, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
                <YAxis domain={[98.5, 100]} tick={{ fill: '#8A8A9A', fontSize: 11, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {uptimeData.map((entry, i) => (
                    <rect key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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
            <p className="section-label mb-2">Time-to-first-token (ms)</p>
            <p className="text-mist text-sm mb-8">Pensr-1: 0ms. No network round-trip. No inference queue.</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={latencyData} barSize={36}>
                <CartesianGrid vertical={false} stroke="#2A2A36" strokeDasharray="4 4" />
                <XAxis dataKey="name" tick={{ fill: '#8A8A9A', fontSize: 11, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8A8A9A', fontSize: 11, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {latencyData.map((entry, i) => (
                    <rect key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            className="bg-dim p-10"
          >
            <p className="section-label mb-2">Overall capability radar</p>
            <p className="text-mist text-sm mb-4">Pensr-1 <span className="text-cobalt">—</span> vs GPT-4 <span className="text-mist">—</span></p>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#2A2A36" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#8A8A9A', fontSize: 10, fontFamily: 'DM Mono' }} />
                <Radar name="Pensr-1" dataKey="Pensr" stroke="#1A3AFF" fill="#1A3AFF" fillOpacity={0.15} strokeWidth={2} />
                <Radar name="GPT-4" dataKey="GPT4" stroke="#8A8A9A" fill="#8A8A9A" fillOpacity={0.05} strokeWidth={1} strokeDasharray="4 4" />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Footnote */}
        <p className="font-mono text-xs text-line mt-6">
          * WoodenDesk-1 benchmark v0.1. Conducted internally. Results may be 100% biased. Peer review: "Trust me bro." — Anonymous, LocalLLaMA.
        </p>
      </div>
    </section>
  )
}
