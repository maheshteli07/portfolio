import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

/* ── Magnetic nav item ───────────────────────────────────── */
function MagneticItem({ item, index, isActive }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 40 })
  const springY = useSpring(y, { stiffness: 150, damping: 40 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.25)
    y.set((e.clientY - cy) * 0.25)
  }
  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={item.href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY, letterSpacing: '0.18em' }}
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`relative px-4 py-2 text-[16px] font-bold tracking-[0.18em] uppercase group cursor-pointer select-none transition-all duration-500 ${isActive ? 'text-white' : ''}`}
    >
      {/* Active background or Hover background */}
      <motion.span
        className={`absolute inset-0 rounded-full transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        style={{
          background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.12) 0%, rgba(0, 212, 255, 0.1) 100%)',
          boxShadow: '0 0 18px 2px rgba(0, 212, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
          border: '1px solid rgba(0, 212, 255, 0.25)',
        }}
      />

      {/* Label */}
      <span
        className={`relative z-10 transition-colors duration-1000 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}
      >
        {item.label}
      </span>

      {/* Active or Hover underline sweep */}
      <motion.span
        className="absolute bottom-1 left-0 h-px rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, #00d4ff, transparent)' }}
        initial={{ width: 0, left: '50%' }}
        animate={isActive ? { width: '80%', left: '10%' } : { width: 0, left: '50%' }}
        whileHover={!isActive ? { width: '80%', left: '10%' } : {}}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.a>
  )
}

/* ── Logo ─────────────────────────────────────────────────── */
function PremiumLogo() {
  return (
    <motion.a
      href="#hero"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center justify-center w-11 h-11 cursor-pointer"
    >
      {/* Outer glow ring */}
      <motion.span
        className="absolute inset-0 rounded-xl"
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'transparent',
          boxShadow: '0 0 18px 4px rgba(0, 212, 255, 0.3), 0 0 6px 1px rgba(0, 212, 255, 0.25)',
          borderRadius: 12,
        }}
      />
      {/* Glass tile */}
      <span
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(0, 212, 255, 0.35)',
          backdropFilter: 'blur(8px)',
          borderRadius: 12,
        }}
      />
      {/* SVG mark */}
      <svg
        width="26" height="26"
        viewBox="0 0 32 32"
        className="relative z-10"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="55%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#0099cc" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 6 24 L 6 8 L 11 16 L 16 8 L 16 24"
          stroke="url(#logoGrad)" strokeWidth="2.2" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 20 8 L 28 8 M 24 8 L 24 24"
          stroke="url(#logoGrad)" strokeWidth="2.2" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.4 }}
        />
      </svg>
    </motion.a>
  )
}

/* ── CTA Button ───────────────────────────────────────────── */
function HireCTA() {
  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="hidden md:flex relative items-center gap-2 px-5 py-2 rounded-full text-[12px] font-bold tracking-widest uppercase cursor-pointer overflow-hidden"
      style={{ letterSpacing: '0.2em' }}
    >
      {/* Gradient border via outline box */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          padding: '1px',
          background: 'linear-gradient(135deg, #00d4ff, #00d4ff, #0099cc)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* Fill */}
      <span
        className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.14), rgba(0, 212, 255, 0.14))' }}
      />
      <span
        className="relative z-10 text-white/80 hover:text-white transition-colors duration-300"
      >
        Hire Me
      </span>
      {/* Sparkle dot */}
      <motion.span
        className="relative z-10 w-1 h-1 rounded-full"
        style={{ background: 'linear-gradient(135deg, #00d4ff, #00d4ff)' }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.a>
  )
}

/* ── Mobile Menu ─────────────────────────────────────────── */
function MobileMenu({ isOpen, setIsOpen, activeItem }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-30 md:hidden flex flex-col justify-center items-center"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            background: 'rgba(10, 8, 20, 0.90)',
          }}
        >
          {/* Ambient background glow */}
          <motion.div
            className="absolute top-1/4 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)', filter: 'blur(40px)' }}
            animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative z-10 flex flex-col items-center gap-5 px-6 pointer-events-none mt-4 w-full">
            {navItems.map((item, i) => {
              const isActive = activeItem === item.href.substring(1)
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`pointer-events-auto flex items-center justify-center relative group w-full max-w-[280px] py-4 rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isActive ? 'bg-accent/10 border-accent/40 shadow-[0_4px_30px_rgba(0,212,255,0.2)]' : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                  }`}
                  style={{ backdropFilter: 'blur(16px)' }}
                >
                  <span className={`text-2xl font-display font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-accent' : 'text-white/80 group-hover:text-white'}`}>
                    {item.label}
                  </span>
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Main Navbar ─────────────────────────────────────────── */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveItem(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )

    const sections = navItems.map((item) => item.href.substring(1))
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Thin gold progress line at very top */}
        <motion.div
          className="absolute top-0 left-0 h-[1.5px] w-full"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #00d4ff 30%, #00d4ff 70%, transparent 100%)', opacity: 0.6 }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Main pill */}
        <div className="mx-2 sm:mx-3 md:mx-4 mt-3">
          <motion.div
            style={{
              background: 'linear-gradient(135deg, rgba(10,8,20,0.88) 0%, rgba(16,12,32,0.92) 100%)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0, 212, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.07)',
              backdropFilter: 'blur(28px) saturate(180%)',
              borderRadius: 18,
              border: '1px solid rgba(0, 212, 255, 0.08)',
            }}
          >
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-5 py-3 flex items-center justify-between">

              {/* Left: Logo only */}
              <div className="flex items-center gap-3">
                <PremiumLogo />
              </div>

              {/* Desktop links - moved to right */}
              <div className="hidden md:flex items-center gap-1 ml-auto">
                {navItems.map((item, i) => (
                  <MagneticItem key={item.href} item={item} index={i} isActive={activeItem === item.href.substring(1)} />
                ))}
              </div>

              {/* Mobile menu toggle */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative z-50 w-9 h-9 flex items-center justify-center rounded-xl cursor-pointer backdrop-blur-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(0, 212, 255, 0.12))',
                  border: '1px solid rgba(0, 212, 255, 0.25)',
                  boxShadow: '0 0 12px rgba(0, 212, 255, 0.15)',
                }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.span
                      key="x"
                      initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ color: '#00d4ff' }}
                    >
                      <FiX size={18} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ color: '#00d4ff' }}
                    >
                      <FiMenu size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} activeItem={activeItem} />
    </>
  )
}