import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pensr-1: The open-weight analog text generation model',
  description: 'Pensr-1 — A creative frontend portfolio by Youssef Bourmaya. I build SaaS sites, AI products, and landing pages that convert.',
  openGraph: {
    title: 'Pensr-1: The open-weight analog text generation model',
    description: 'Pensr-1 — A creative frontend portfolio by Youssef Bourmaya. I build SaaS sites, AI products, and landing pages that convert.',
    type: 'website',
    url: 'https://pensr-1.vercel.app',
    images: [
      {
        url: 'https://pensr-1.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pensr-1 - An open-weight analog text generation model',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pensr-1: The open-weight analog text generation model',
    description: 'Pensr-1 — A creative frontend portfolio by Youssef Bourmaya. I build SaaS sites, AI products, and landing pages that convert.',
    images: ['https://pensr-1.vercel.app/og-image.png'],
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
        <Analytics />
      </body>
    </html>
  )
}
