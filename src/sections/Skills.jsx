import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { FiCode, FiDatabase, FiCpu } from 'react-icons/fi'

const SKILL_CATEGORIES = [
  {
    title: 'Frontend Development',
    description: 'Building responsive and interactive user interfaces with modern frameworks',
    skills: ['Html','Css','React', 'JavaScript', 'TailwindCSS'],
    icon: FiCode,
  },
  {
    title: 'Backend Development',
    description: 'Creating robust server-side applications and RESTful APIs',
    skills: ['Node.js', 'Express', 'MongoDB'],
    icon: FiDatabase,
  },
  {
    title: 'Programming Languages',
    description: 'Strong foundation in multiple programming languages and paradigms',
    skills: ['c','Java', 'C++', 'Python','JavaScript'],
    icon: FiCode,
  },
  {
    title: 'Data Structures & Algorithms',
    description: 'Solved 150+ problems on LeetCode, showcasing strong problem-solving skills using efficient Data Structures and Algorithms.',
    skills: ['DSA', 'Problem Solving', 'Optimization'],
    icon: FiCpu,
  },
  {
    title: 'Tools & Version Control',
    description: 'Proficiency with development tools and collaborative workflows',
    skills: ['Git', 'GitHub', 'VS Code'],
    icon: FiDatabase,
  },
  {
    title: 'Python Libraries & Data Science',
    description: 'Experience with powerful Python libraries for data analysis and visualization',
    skills: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn'],
    icon: FiDatabase,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
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

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 py-20 md:py-28 px-0 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-20 -right-20 w-60 h-60 bg-accent2/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="flex justify-center w-full">
        <div className="max-w-6xl relative z-10 w-full px-6">
          <SectionHeading title="Skills & Expertise" />

          <motion.div
            className="flex flex-wrap justify-start gap-6 md:gap-8 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {SKILL_CATEGORIES.map((category, i) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card rounded-2xl p-6 md:p-8 flex flex-col items-start gap-5 group hover:border-accent/50 cursor-default transition-all w-full sm:max-w-xs md:w-80"
              >
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-accent/20 to-accent2/10 border border-accent/30 flex items-center justify-center group-hover:border-accent/60 group-hover:from-accent/30 group-hover:to-accent2/20 transition-all duration-300"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
                >
                  <IconComponent className="text-accent text-2xl md:text-3xl" />
                </motion.div>

                {/* Content */}
                <div className="flex flex-col gap-3 text-left">
                  <h3 className="font-display font-bold text-lg md:text-xl text-bright group-hover:text-accent transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-3 justify-start">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="text-xs md:text-sm font-mono text-accent bg-accent/10 rounded-full px-3 py-1 border border-accent/30 group-hover:border-accent/60 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 md:mt-20 w-full"
        >
          <motion.p className="text-left text-muted font-mono text-sm md:text-base mb-6 uppercase tracking-widest">
            Tech Stack
          </motion.p>
          <div className="flex flex-wrap justify-start gap-3 md:gap-4">
            {['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'C++', 'Python', 'Git', 'GitHub', 'TailwindCSS', 'DSA'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1, borderColor: 'rgba(0,212,255,0.8)' }}
                className="font-mono text-xs md:text-sm text-muted border border-border/40 rounded-full px-4 md:px-5 py-2 bg-surface/40 cursor-default transition-all duration-200 hover:text-accent"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
    </section>
  )
}