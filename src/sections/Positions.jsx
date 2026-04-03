import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { POSITIONS } from '../utils/data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function Positions() {
  return (
    <section id="positions" className="scroll-mt-16 py-10 md:py-16 px-6 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-20 left-10 w-64 h-64 bg-accent2/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          tag="// 08. leadership"
          title="Leadership & Positions"
          subtitle="Roles and responsibilities in community organizations"
        />

        <motion.div
          className="grid lg:grid-cols-2 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {POSITIONS.map((position, idx) => (
            <motion.div
              key={position.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -8 }}
              className="glass-card rounded-2xl p-8 md:p-10 hover:border-accent/50 transition-all flex flex-col gap-6"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <motion.h3
                    className="font-display font-bold text-3xl md:text-4xl text-bright mb-2"
                    animate={{ opacity: [1, 0.9, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.1 }}
                  >
                    {position.position}
                  </motion.h3>
                  <p className="text-xl md:text-2xl text-accent font-semibold mb-1">
                    {position.organization}
                  </p>
                  <p className="text-base md:text-lg text-muted font-mono">
                    Status: <span className="text-accent2">{position.duration}</span>
                  </p>
                </div>
                <motion.div
                  className="flex-shrink-0 text-5xl md:text-6xl"
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: idx * 0.2 }}
                >
                  {position.icon}
                </motion.div>
              </div>

              <motion.p
                className="text-lg md:text-xl text-muted leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {position.description}
              </motion.p>

              {/* Divider with accent */}
              <motion.div
                className="h-1 bg-gradient-to-r from-accent/30 via-accent to-accent/30"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Engagement indicator */}
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-3 h-3 rounded-full bg-accent"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-sm md:text-base text-muted font-mono">
                  Actively Engaged
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
