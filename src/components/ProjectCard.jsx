import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <div className="glass-card rounded-2xl p-8 md:p-10 h-full flex flex-col gap-6 hover:border-accent/50">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-bright mb-3 group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-base md:text-lg text-muted leading-relaxed">{project.description}</p>
          </div>
          {project.featured && (
            <span className="ml-4 px-4 py-2 bg-accent/20 border border-accent/50 rounded-lg font-mono text-sm md:text-base text-accent whitespace-nowrap">
              Featured
            </span>
          )}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 py-4">
          {project.tech.map(tech => (
            <span
              key={tech}
              className="px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base font-mono rounded-lg bg-surface border border-border/40 text-accent/80 hover:border-accent/60 hover:text-accent transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-auto pt-4 border-t border-border">
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 text-base md:text-lg font-semibold text-accent hover:text-accent/80 transition-colors"
          >
            <FiGithub size={22} />
            Code
          </motion.a>
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 text-base md:text-lg font-semibold text-accent hover:text-accent/80 transition-colors"
          >
            <FiExternalLink size={22} />
            Live
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
