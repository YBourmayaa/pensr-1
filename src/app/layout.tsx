import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pensr-1 — The Original Analog Text Generation Model',
  description: 'Pensr-1 v0.1 — Open-weight analog model — Now available. No ink outage, no smudge limit, no hallucinations. Unlimited local context window. Analog throughput.',
  openGraph: {
    title: 'Pensr-1 — The Original Analog Text Generation Model',
    description: 'Unlimited context window. Zero hallucinations. Internal eval Benchmarks. Built different.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="grain">
        {children}
      </body>
    </html>
  )
}
