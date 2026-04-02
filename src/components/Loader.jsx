import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 0.5 }}
      animate={{ opacity: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="fixed inset-0 bg-bg z-[9999] flex items-center justify-center pointer-events-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-6xl md:text-7xl font-bold"
      >
        <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
          MT
        </span>
      </motion.div>
    </motion.div>
  )
}
