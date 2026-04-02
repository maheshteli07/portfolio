import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.3,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
}

const menuItemVariants = {
  closed: { opacity: 0, x: 20 },
  open: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 m-4 rounded-2xl backdrop-blur-xl bg-gradient-to-b from-bg/70 via-bg/60 to-bg/50 border border-accent/10 shadow-lg shadow-accent/5">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="relative z-50 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-11 h-11 md:w-14 md:h-14 flex items-center justify-center">
              {/* Background accent */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent/10 to-accent2/10 group-hover:from-accent/20 group-hover:to-accent2/20 transition-all duration-300"
              />
              
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-lg border border-accent/30 group-hover:border-accent/60 transition-colors duration-300"
              />
              
              {/* Modern MT Logo */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  className="w-8 h-8 md:w-10 md:h-10"
                >
                  {/* M */}
                  <motion.path
                    d="M 6 24 L 6 8 L 11 16 L 16 8 L 16 24"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  />
                  
                  {/* T */}
                  <motion.path
                    d="M 20 8 L 28 8 M 24 8 L 24 24"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
                  />
                  
                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00ff88" />
                      <stop offset="100%" stopColor="#00ccff" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </motion.a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-3">
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="relative px-4 py-2 text-base font-medium text-text font-mono group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background glassmorphism effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent/10 to-accent2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  initial={false}
                  whileHover={{ backdropFilter: 'blur(8px)' }}
                />
                
                {/* Border effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg border border-accent/0 group-hover:border-accent/30 transition-colors duration-300 -z-10"
                />
                
                {/* Text */}
                <span className="relative z-10 group-hover:text-accent transition-colors duration-300">
                  {item.label}
                </span>
                
                {/* Bottom underline animation */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent to-accent2 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 p-1.5 rounded-lg group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background glow on hover */}
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent/10 to-accent2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            {/* Border on hover */}
            <motion.div
              className="absolute inset-0 rounded-lg border border-accent/0 group-hover:border-accent/30 transition-colors duration-300"
            />
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 text-accent text-2xl"
                >
                  <FiX size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 text-accent text-2xl group-hover:text-accent2 transition-colors"
                >
                  <FiMenu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Full-Page Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 top-0 md:hidden z-30 bg-gradient-to-b from-bg/80 via-bg/75 to-bg/80 backdrop-blur-2xl border-t border-accent/10 shadow-2xl shadow-accent/5"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Background animation elements */}
            <motion.div
              animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-20 -left-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
              animate={{ y: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-20 -right-20 w-72 h-72 bg-accent2/10 rounded-full blur-3xl pointer-events-none"
            />

            {/* Menu content */}
            <div className="relative z-10 h-full flex flex-col gap-6 items-center justify-center text-center px-8 pb-20">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  custom={i}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  whileHover={{ scale: 1.08, y: -4 }}
                  className="w-full md:w-80 rounded-2xl px-8 py-4 text-lg font-bold font-display group relative overflow-hidden"
                >
                  {/* Glass morphism background */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/15 via-accent2/10 to-accent/5 backdrop-blur-md border border-accent/20 group-hover:border-accent/50 transition-all duration-300 -z-10"
                  />
                  
                  {/* Gradient shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Text */}
                  <span className="relative z-10 text-text group-hover:text-accent transition-colors duration-300">
                    {item.label}
                  </span>
                </motion.a>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
