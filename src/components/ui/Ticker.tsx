'use client'

const items = [
  { label: 'Context window', value: 'Unlimited*' },
  { label: 'Hallucination rate', value: '0.000%' },
  { label: 'Uptime since release', value: '99.999%' },
  { label: 'Cost per 1M tokens', value: '$0.00' },
  { label: 'TTFT (ms)', value: '0.3' },
  { label: 'RAM requirement', value: 'Yes' },
  { label: 'Server outages', value: '0' },
  { label: 'Lines generated', value: '∞' },
  { label: 'Open-weight', value: 'True' },
  { label: 'Works in outer space', value: 'Yes' },
  { label: 'Deprecated models', value: 'Pensr-1' },
  { label: 'Parameters', value: 'Recursive' },
]

const doubled = [...items, ...items]

export default function Ticker() {
  return (
    <div className="border-y border-line py-4 overflow-hidden bg-dim relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10"
        style={{ background: 'linear-gradient(to right, #1C1C24, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10"
        style={{ background: 'linear-gradient(to left, #1C1C24, transparent)' }} />

      <div className="flex items-center animate-marquee whitespace-nowrap gap-0">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-6 px-8">
            <span className="section-label shrink-0">{item.label}</span>
            <span className="font-display text-xl text-paper shrink-0">{item.value}</span>
            <span className="w-1 h-1 rounded-full bg-cobalt shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
