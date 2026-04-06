import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function Loader() {
  const canvasRef = useRef(null)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles = []
    const particleCount = 100
    const connectionDist = 140

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.8
        this.vy = (Math.random() - 0.5) * 0.8
        this.radius = Math.random() * 2 + 1
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#22D3EE'
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        p1.update()
        p1.draw()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDist) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.4 * (1 - dist / connectionDist)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const timer = setTimeout(() => setComplete(true), 2400)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 2, filter: 'blur(30px)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 bg-[#06080F] z-[99999] flex flex-col items-center justify-center overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />

      {/* Central Branding */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative group">
          {/* Outer Ring Glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute -inset-10 rounded-full bg-primary/10 blur-[60px]"
          />

          {/* Sophisticated Text Logo */}
          <motion.h1
            initial={{ y: 20, opacity: 0, letterSpacing: '0.2em' }}
            animate={{ y: 0, opacity: 1, letterSpacing: '0.8em' }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-primary to-secondary relative flex flex-col items-center"
          >
            MAHESH
            <motion.div
              animate={{ x: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="h-1 w-full mt-4 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm"
            />
          </motion.h1>
        </div>

        {/* Minimalist Progress Indicator */}
        <div className="flex flex-col items-center gap-3 mt-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase"
          >
            Synthesizing Neural Presence
          </motion.p>
          <div className="w-48 h-[1px] bg-white/5 relative overflow-hidden rounded-full">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_rgba(34,211,238,0.5)]"
            />
          </div>
        </div>
      </div>

    </motion.div>


  )
}



