import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: 'easeOut',
    },
  },
}

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent2/10 rounded-full blur-3xl"
      />

      <motion.div
        className="max-w-5xl mx-auto text-center flex flex-col items-center w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-accent/80 mb-6 font-mono tracking-widest uppercase"
        >
          Welcome to my portfolio
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-bright mb-8 leading-tight"
        >
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.0 }}
              className="font-bold"
            >
              Mahesh Basavaraj
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.0 }}
              className="font-bold"
            >
              Teli
            </motion.span>
          </motion.div>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-muted mb-6"
        >
          MERN Stack Developer | DSA Enthusiast | Problem Solver
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-muted/80 max-w-3xl mx-auto mb-12 leading-relaxed text-center"
        >
          Building scalable applications with modern technologies. CGPA: 9.42 | Siddaganga Institute of Technology, Tumkur
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center mt-12"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:scale-105 transition flex items-center justify-center gap-2"
          >
            Explore My Work
            <FiArrowRight size={20} />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition flex items-center justify-center"
          >
            Get In Touch
          </motion.a>
        </motion.div>

      </motion.div>
    </section>
  )
}
