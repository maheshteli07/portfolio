import { motion } from 'framer-motion'

export default function SectionHeading({ tag, title, subtitle, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-8 md:mb-12 text-left ${className}`}
    >
      {tag && (
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-mono text-sm md:text-base text-accent/70 mb-3 tracking-widest uppercase"
        >
          {tag}
        </motion.p>
      )}
      <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold text-bright leading-tight ${subtitle ? 'mb-4' : 'mb-0'}`}>
        {title}
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-muted max-w-3xl leading-relaxed mt-4"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
