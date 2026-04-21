'use client'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { useScroll } from 'framer-motion'
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
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  })

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '36px',
          background: '#a855f7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 60,
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(5,5,5,0.9)',
            margin: 0,
            fontWeight: 600,
          }}
        >
          Pensr-1 v0.1 — The original analog model — Now available
          <span style={{ opacity: 0.5, marginLeft: '16px' }}>Est. 2024</span>
        </p>
      </div>

      <main className="relative lg:pr-[35vw]" ref={sectionRef}>
        <ScrollProgress />
        <SmoothScroll />
        <Intro />
        <Cursor />
        <Nav />

        {/* Global Floating Pen Overlay */}
        <div className="absolute inset-0 pointer-events-none z-40 hidden lg:block overflow-hidden">
          <div className="sticky top-0 h-screen w-full flex justify-end">
            <div className="w-[35vw] flex items-center justify-center">
              <FloatingPen scrollProgress={scrollYProgress} />
            </div>
          </div>
        </div>
        
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
