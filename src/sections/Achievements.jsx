import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { ACHIEVEMENTS } from '../utils/data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-32 md:py-40 px-6 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-20 w-72 h-72 bg-accent2/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          title="Achievements"
          subtitle="Milestones and accomplishments that demonstrate my commitment to excellence."
        />

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute left-5 md:left-6 top-0 bottom-0 w-1 md:w-1.5 bg-gradient-to-b from-accent via-accent2/50 to-transparent hidden sm:block origin-top"
          />

          <motion.div
            className="flex flex-col gap-10 md:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {ACHIEVEMENTS.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 6 }}
                className="flex gap-6 md:gap-8 items-start transition-all"
              >
                {/* Node */}
                <motion.div
                  className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl border items-center justify-center text-2xl md:text-3xl font-bold z-10 bg-bg hidden sm:flex flex-col"
                  style={{ borderColor: `${item.color}40`, color: item.color }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                >
                  {item.icon}
                </motion.div>

                {/* Content */}
                <motion.div
                  className="glass-card rounded-xl p-6 md:p-8 flex-1 flex flex-col gap-3 hover:border-accent/50"
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <motion.h3
                      className="font-display font-bold text-xl md:text-2xl text-bright hover:text-accent transition-colors"
                      animate={{ opacity: [1, 0.8, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
                    >
                      {item.title}
                    </motion.h3>
                    <motion.span
                      className="font-mono text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2 rounded-full border font-semibold"
                      style={{ borderColor: `${item.color}30`, color: item.color }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.year}
                    </motion.span>
                  </div>
                  <p className="text-base md:text-lg text-muted leading-relaxed">{item.detail}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}