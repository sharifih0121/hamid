'use client'

import { useEffect, useRef } from 'react'

interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  speed: number
}

export default function HeroRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const ripples: Ripple[] = []
    let animFrame: number

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const addRipple = (x: number, y: number) => {
      if (ripples.length > 20) return
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: 60 + Math.random() * 60,
        opacity: 0.25,
        speed: 1.2 + Math.random() * 1.2,
      })
    }

    const autoInterval = setInterval(() => {
      addRipple(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      )
    }, 1800)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      if (Math.random() > 0.82) addRipple(e.clientX - rect.left, e.clientY - rect.top)
    }

    const onTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const t = e.touches[0]
      addRipple(t.clientX - rect.left, t.clientY - rect.top)
    }

    canvas.parentElement?.addEventListener('mousemove', onMouseMove)
    canvas.parentElement?.addEventListener('touchstart', onTouch)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        r.radius += r.speed
        r.opacity -= 0.004

        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255,255,255,${r.opacity})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      animFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animFrame)
      clearInterval(autoInterval)
      window.removeEventListener('resize', resize)
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove)
      canvas.parentElement?.removeEventListener('touchstart', onTouch)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  )
}
