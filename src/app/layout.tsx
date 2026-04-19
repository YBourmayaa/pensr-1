import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pensr-1 — The Original Text Generation Model',
  description: 'Pensr-1 has been generating text for 80 years without a single server outage, rate limit, or hallucination. 1.2km context window. 300 words/minute throughput.',
  openGraph: {
    title: 'Pensr-1 — The Original Text Generation Model',
    description: '1.2km context window. Zero hallucinations. $0.002 per 1M tokens. Built different.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain">
        {children}
      </body>
    </html>
  )
}
