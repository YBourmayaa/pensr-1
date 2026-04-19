'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      }
    }

    const onMouseEnterLink = () => ringRef.current?.classList.add('expanded')
    const onMouseLeaveLink = () => ringRef.current?.classList.remove('expanded')

    let raf: number
    const animate = () => {
      ringX += (mouseX - ringX) * 0.2
      ringY += (mouseY - ringY) * 0.2
      if (ringRef.current) {
        const size = ringRef.current.classList.contains('expanded') ? 30 : 18
        ringRef.current.style.transform = `translate(${ringX - size}px, ${ringY - size}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    document.addEventListener('mousemove', onMouseMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
