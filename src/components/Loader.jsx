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

    const timer = setTimeout(() => setComplete(true), 3500)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
      className="fixed inset-0 bg-[#020408] z-[99999] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Neural Structure Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-50" />
      
      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,4,8,0.6)_100%)] z-0" />

      {/* Central Branding: High-Luminosity Orbital "MT" Logotype */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
          
          {/* Enhanced "Neural Light" Glow (High Luminosity) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-44 h-44 md:w-60 md:h-60 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-[70px]"
          />

          {/* Rotating Layer 1: Clockwise (Radiant) */}
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-full h-full filter drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50" cy="50" r="48"
              fill="none"
              stroke="url(#mt-luxury-grad)"
              strokeWidth="0.8"
              strokeDasharray="15 30"
              className="opacity-60"
            />
          </motion.svg>

          {/* Rotating Layer 2: Counter-Clockwise (Ethereal) */}
          <motion.svg
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
          >
             <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.3"
              strokeDasharray="2 10"
              className="opacity-40"
            />
          </motion.svg>

          {/* Inner Glowing Orbit / Sphere */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_0_40px_rgba(34,211,238,0.2),inset_0_0_20px_rgba(34,211,238,0.15)]">
            
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="mt-luxury-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>

            {/* MT Monogram - Brilliantly Illuminated */}
            <motion.h1
              initial={{ y: 20, opacity: 0, letterSpacing: '-0.15em' }}
              animate={{ y: 0, opacity: 1, letterSpacing: '0.05em' }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-primary to-secondary relative z-10 drop-shadow-[0_4px_15px_rgba(255,255,255,0.4)]"
            >
              MT
            </motion.h1>

            {/* Heartbeat Pulse (Internal Reactor) */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary blur-2xl pointer-events-none"
            />
          </div>
        </div>

        {/* Minimal Progress Details */}
        <div className="flex flex-col items-center gap-4 mt-12">
          
          {/* Sequential DEVS Text (Significantly Enlarged) */}
          <div className="flex items-center justify-center gap-3 mb-3 ml-6">
            {['D', 'E', 'V', 'S'].map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ 
                  opacity: [0, 1, 0.6, 1],
                  y: 0 
                }}
                transition={{
                  opacity: {
                    times: [0, 0.2, 0.5, 1],
                    delay: 1.5 + (i * 0.2),
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  },
                  y: {
                    delay: 1.5 + (i * 0.2),
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }}
                className="text-[18px] md:text-[22px] font-mono text-white font-black tracking-[1.5em] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              >
                {char}
              </motion.span>
            ))}
          </div>

          <div className="w-56 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent shadow-[0_0_15px_rgba(34,211,238,0.6)]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
