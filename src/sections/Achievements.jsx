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
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Achievements() {
  return (
    <section id="achievements" className="scroll-mt-16 py-10 md:py-16 px-0 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-20 right-20 w-72 h-72 bg-accent2/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="flex justify-center w-full">
        <div className="max-w-6xl relative z-10 w-full px-6">
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
            className="flex flex-col gap-4 md:gap-6"
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
                className="flex gap-4 md:gap-5 items-start transition-all"
              >
                {/* Node */}
                <motion.div
                  className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-lg border items-center justify-center text-lg md:text-xl font-bold z-10 bg-bg hidden sm:flex flex-col"
                  style={{ borderColor: `${item.color}40`, color: item.color }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                >
                  {item.icon}
                </motion.div>

                {/* Content */}
                <motion.div
                  className="glass-card rounded-lg p-4 flex-1 flex flex-col items-start gap-3 md:gap-1.5 hover:border-accent/50 text-left"
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-2 md:gap-3 w-full">
                    <motion.h3
                      className="font-display font-bold text-base md:text-lg text-bright hover:text-accent transition-colors"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.span
                      className="font-mono text-xs px-3 py-1 md:px-2.5 md:py-1 rounded-full border font-semibold"
                      style={{ borderColor: `${item.color}30`, color: item.color }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.year}
                    </motion.span>
                  </div>
                  <p className="text-xs md:text-sm text-muted leading-relaxed text-left w-full">{item.detail}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
    </section>
  )
}