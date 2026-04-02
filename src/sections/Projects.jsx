import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { PROJECTS } from '../utils/data'
import { FiArrowUpRight } from 'react-icons/fi'

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 md:py-40 px-6 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          title="Featured Projects"
          subtitle="MERN stack applications showcasing my technical expertise and problem-solving."
        />

        <motion.div
          className="grid md:grid-cols-2 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card rounded-2xl p-8 md:p-10 flex flex-col gap-6 hover:border-accent/50 group transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <motion.h3
                    className="font-display font-bold text-2xl md:text-3xl text-bright mb-2 group-hover:text-accent transition-colors"
                    animate={{ opacity: [1, 0.9, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.1 }}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-lg md:text-xl text-muted leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <motion.div
                  whileHover={{ rotate: 45, scale: 1.2 }}
                  className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors"
                >
                  <FiArrowUpRight size={24} />
                </motion.div>
              </div>

              {/* Divider */}
              <motion.div
                className="h-px bg-gradient-to-r from-accent/30 via-accent to-accent/30"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Features */}
              <div>
                <h4 className="font-semibold text-lg md:text-xl text-bright mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="text-base md:text-lg text-muted flex items-start gap-3"
                    >
                      <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2"></span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-semibold text-lg md:text-xl text-bright mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {project.tech.map((tech, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.1, y: -4 }}
                      className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent font-mono text-xs md:text-sm"
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