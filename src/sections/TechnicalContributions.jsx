import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { TECHNICAL_CONTRIBUTIONS } from '../utils/data'
import { FiGithub, FiGitBranch, FiCode } from 'react-icons/fi'

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export default function TechnicalContributions() {
  return (
    <section id="contributions" className="py-32 md:py-40 px-6 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          tag="// 06. contributions"
          title="Technical Contributions"
          subtitle="Collaborative projects and community involvement"
        />

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {TECHNICAL_CONTRIBUTIONS.map((contrib, idx) => (
            <motion.div
              key={contrib.id}
              variants={itemVariants}
              whileHover={{ x: 8 }}
              className="glass-card rounded-2xl p-8 md:p-10 hover:border-accent/50 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center mb-8">
                <motion.div
                  className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-white"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: idx * 0.2 }}
                >
                  <FiGithub size={40} />
                </motion.div>

                <div className="flex-1">
                  <motion.h3
                    className="font-display font-bold text-3xl md:text-4xl text-bright mb-2"
                    animate={{ opacity: [1, 0.9, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.1 }}
                  >
                    {contrib.title}
                  </motion.h3>
                  <p className="text-lg md:text-xl text-accent font-semibold">
                    {contrib.organization}
                  </p>
                  <p className="text-base md:text-lg text-muted">
                    Role: <span className="text-bright font-semibold">{contrib.role}</span>
                  </p>
                </div>
              </div>

              <p className="text-lg md:text-xl text-muted leading-relaxed mb-8">
                {contrib.description}
              </p>

              {/* Contributions List */}
              <div className="mb-8">
                <h4 className="font-semibold text-xl md:text-2xl text-bright mb-4 flex items-center gap-2">
                  <FiCode size={24} className="text-accent" />
                  Key Contributions
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contrib.contributions.map((contribution, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-surface/30 border border-border/20"
                    >
                      <FiGitBranch className="text-accent flex-shrink-0 mt-1" size={20} />
                      <span className="text-base md:text-lg text-muted">{contribution}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-semibold text-lg md:text-xl text-bright mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-3">
                  {contrib.tech.map((tech, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.1, y: -4 }}
                      className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent font-mono text-sm md:text-base"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
