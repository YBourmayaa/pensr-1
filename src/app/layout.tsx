import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pensr-1: The open-weight analog text generation model',
  description: 'Pensr-1: The open-weight analog text generation model. 0% hallucination rate. 1.2km context window. No GPU required.',
  openGraph: {
    title: 'Pensr-1: The open-weight analog text generation model',
    description: 'Pensr-1: The open-weight analog text generation model. 0% hallucination rate. 1.2km context window. No GPU required.',
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
