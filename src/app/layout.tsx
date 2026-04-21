import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Antigravity-1 — The Original Neural Coding Model',
  description: 'Antigravity-1 v0.1 — Open-weight neural model — Now available. No server outage, no rate limit, no hallucinations. Unlimited local context window. Neural throughput.',
  openGraph: {
    title: 'Antigravity-1 — The Original Neural Coding Model',
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
