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
          background: '#10b981',
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
          <span style={{ opacity: 0.5, marginLeft: '16px' }}>Est. 1943</span>
        </p>
      </div>

      <main className="relative">
        <ScrollProgress />
        <SmoothScroll />
        <Intro />
        <Cursor />
        <Nav />

        {/* The Pen Scroll Section */}
        <section ref={sectionRef} style={{ minHeight: '300vh', position: 'relative' }}>
          <div className="absolute inset-0 pointer-events-none z-40 hidden lg:block">
            <div className="sticky top-0 h-screen w-full max-w-[1400px] mx-auto flex px-8">
              <div className="w-[60%]"></div>
              <div className="w-[40%] flex items-center justify-center">
                <FloatingPen scrollProgress={scrollYProgress} />
              </div>
            </div>
          </div>
          
          <Hero />
          <Ticker />
          <ModelCard />
        </section>

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
