'use client'
import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'
import Ticker from '@/components/ui/Ticker'
import ModelCard from '@/components/sections/ModelCard'
import Features from '@/components/sections/Features'
import HowItWorks from '@/components/sections/HowItWorks'
import ContextWindow from '@/components/sections/ContextWindow'
import Benchmarks from '@/components/sections/Benchmarks'
import BentoGrid from '@/components/sections/BentoGrid'
import Testimonials from '@/components/sections/Testimonials'
import Pricing from '@/components/sections/Pricing'
import Paper from '@/components/sections/Paper'
import Footer from '@/components/sections/Footer'
import Timeline from '@/components/sections/Timeline'

const Nav = dynamic(() => import('@/components/ui/Nav'), { ssr: false })
const Cursor = dynamic(() => import('@/components/ui/Cursor'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/ui/SmoothScroll'), { ssr: false })
const Intro = dynamic(() => import('@/components/ui/Intro'), { ssr: false })
const FloatingPen = dynamic(() => import('@/components/ui/FloatingPen'), { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/ui/ScrollProgress'), { ssr: false })

export default function Home() {
  return (
    <>
      {/* Announcement bar — above everything */}
      <div className="w-full h-9 bg-cobalt flex items-center justify-center">
        <p className="font-mono text-xs text-paper tracking-widest uppercase">
          Pensr-1 A0B — Open-weight model — Now available
          <span className="ml-4 opacity-60">Est. 1943</span>
        </p>
      </div>

      <main className="relative">
        <SmoothScroll />
        <Intro />
        <Cursor />
        <ScrollProgress />
        <FloatingPen />
        <Nav />
        <Hero />
        <Ticker />
        <ModelCard />
        <Timeline />
        <Features />
        <HowItWorks />
        <ContextWindow />
        <Benchmarks />
        <BentoGrid />
        <Testimonials />
        <Pricing />
        <Paper />
        <Footer />
      </main>
    </>
  )
}
