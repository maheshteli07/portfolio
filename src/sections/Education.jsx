import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { EDUCATION } from '../utils/data'
import { FiBook, FiAward, FiCalendar } from 'react-icons/fi'

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

export default function Education() {
  return (
    <section id="education" className="scroll-mt-16 py-10 md:py-16 px-6 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          tag="// 02. education"
          title="Education"
          subtitle="Academic foundation and specialization in AI/ML"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 md:gap-16"
        >
          {/* Main Education Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-card rounded-2xl p-8 md:p-10 flex flex-col gap-8 hover:border-accent/50"
          >
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 text-left">
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-accent to-accent2 flex md:hidden items-center justify-center text-white text-3xl md:text-4xl mb-2 md:mb-0"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <FiBook size={40} />
              </motion.div>
              <div className="flex-1 flex flex-col items-start">
                <motion.h3
                  className="font-display font-bold text-3xl md:text-4xl text-bright mb-2"
                  animate={{ opacity: [1, 0.9, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {EDUCATION.degree}
                </motion.h3>
                <p className="text-xl md:text-2xl text-accent font-semibold mb-1">
                  {EDUCATION.field}
                </p>
                <p className="text-lg md:text-xl text-muted">{EDUCATION.institution}</p>
              </div>
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-accent to-accent2 hidden md:flex items-center justify-center text-white text-3xl md:text-4xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <FiBook size={40} />
              </motion.div>
            </div>

            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-4 p-4 rounded-lg bg-surface/50 border border-border/30"
                whileHover={{ borderColor: 'rgba(0, 212, 255, 0.5)' }}
              >
                <FiAward className="text-accent text-xl flex-shrink-0" size={24} />
                <div>
                  <p className="text-sm md:text-base text-muted">CGPA</p>
                  <p className="text-xl md:text-2xl font-bold text-bright">{EDUCATION.cgpa}</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 rounded-lg bg-surface/50 border border-border/30"
                whileHover={{ borderColor: 'rgba(255, 0, 110, 0.5)' }}
              >
                <FiCalendar className="text-accent2 text-xl flex-shrink-0" size={24} />
                <div>
                  <p className="text-sm md:text-base text-muted">Duration</p>
                  <p className="text-xl md:text-2xl font-semibold text-bright">{EDUCATION.duration}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Specialization & Details */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-xl p-6 md:p-8 hover:border-accent/50 text-left items-start flex flex-col"
            >
              <h4 className="font-display font-bold text-2xl md:text-3xl text-bright mb-4">
                Specialization
              </h4>
              <p className="text-lg md:text-xl text-muted leading-relaxed">
                Artificial Intelligence & Machine Learning (AIML)
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-xl p-6 md:p-8 hover:border-accent/50 text-left flex flex-col items-start"
            >
              <h4 className="font-display font-bold text-2xl md:text-3xl text-bright mb-4">
                Focus Areas
              </h4>
              <ul className="space-y-3 w-full">
                {['Data Structures & Algorithms', 'Web Development', 'System Design', 'Cloud Technologies'].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-lg md:text-xl text-muted flex items-center gap-3 justify-start"
                  >
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
