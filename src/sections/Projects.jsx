import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { PROJECTS, TECHNICAL_CONTRIBUTIONS } from '../utils/data'
import { FiArrowUpRight } from 'react-icons/fi'

const contributionsAsProjects = TECHNICAL_CONTRIBUTIONS.map((item) => ({
  id: `contrib-${item.id}`,
  title: `${item.title} - ${item.organization}`,
  description: `${item.role} | ${item.description}`,
  tech: item.tech,
  features: item.contributions,
}))

const projectCards = PROJECTS
const technicalContributionCards = contributionsAsProjects

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
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-16 py-10 md:py-16 px-0 relative overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="flex justify-center w-full">
        <div className="max-w-6xl relative z-10 w-full px-6">
          <SectionHeading
            title="Featured Projects"
            subtitle="Full-stack applications demonstrating technical expertise and innovative problem-solving."
          />

          <div className="mb-10">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-bright mb-4 text-center"></h3>
            <motion.div
              className="flex flex-wrap justify-center gap-4 md:gap-5 lg:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {projectCards.map((project, idx) => (
                <motion.div key={project.id} variants={itemVariants} className="group relative w-full md:w-[calc(50%-12px)] lg:w-[calc(50%-12px)]">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />

                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative glass-card rounded-2xl p-6 md:p-8 flex flex-col gap-5 border border-accent/20 group-hover:border-accent/40 transition-all duration-300 min-h-[340px] md:min-h-[360px]"
                  >
                    <div className="flex flex-col md:flex-row items-start justify-between gap-5 text-left">
                      <div className="flex-1 flex flex-col items-start">
                        <span className="inline-block text-xs md:text-sm font-mono text-accent/70 mb-2 tracking-wider">
                          PROJECT {String(project.id).padStart(2, '0')}
                        </span>
                        <h3 className="font-display font-bold text-2xl md:text-3xl text-bright mb-3 leading-tight group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-base md:text-lg text-muted leading-relaxed">{project.description}</p>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 45, scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 hidden md:flex items-center justify-center text-accent group-hover:bg-accent/20 transition-all duration-300 cursor-pointer"
                      >
                        <FiArrowUpRight size={24} />
                      </motion.div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

                    <div className="flex flex-col items-start">
                      <h4 className="font-semibold text-lg text-bright mb-3">Key Features</h4>
                      <ul className="space-y-2 text-left">
                        {project.features.map((feature, i) => (
                          <li key={i} className="text-sm md:text-base text-muted flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent mt-1 md:mt-2 hidden md:block flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col items-start text-left">
                      <h4 className="font-semibold text-lg text-bright mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap justify-start gap-2.5">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-lg bg-accent/8 border border-accent/25 text-accent font-mono text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="mt-12">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-bright mb-4 text-center">Technical Contributions</h3>
            <motion.div
              className="flex flex-wrap justify-center gap-4 md:gap-5 lg:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {technicalContributionCards.map((project, idx) => (
                <motion.div key={project.id} variants={itemVariants} className="group relative w-full md:w-[calc(50%-12px)] lg:w-[calc(50%-12px)]">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />

                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative glass-card rounded-2xl p-6 md:p-8 flex flex-col gap-5 border border-accent/20 group-hover:border-accent/40 transition-all duration-300 min-h-[340px] md:min-h-[360px]"
                  >
                    <div className="flex flex-col md:flex-row items-start justify-between gap-5 text-left">
                      <div className="flex-1 flex flex-col items-start">
                        <h3 className="font-display font-bold text-2xl md:text-3xl text-bright mb-3 leading-tight group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-base md:text-lg text-muted leading-relaxed">{project.description}</p>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 45, scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 hidden md:flex items-center justify-center text-accent group-hover:bg-accent/20 transition-all duration-300 cursor-pointer"
                      >
                        <FiArrowUpRight size={24} />
                      </motion.div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

                    <div className="flex flex-col items-start">
                      <h4 className="font-semibold text-lg text-bright mb-3">Contributions</h4>
                      <ul className="space-y-2 text-muted text-left">
                        {project.features.map((feature, i) => (
                          <li key={i} className="text-sm md:text-base flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent mt-1 md:mt-2 hidden md:block flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col items-start text-left">
                      <h4 className="font-semibold text-lg text-bright mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap justify-start gap-2.5">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-lg bg-accent/8 border border-accent/25 text-accent font-mono text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
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
