import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { FiCode, FiBook, FiZap } from 'react-icons/fi'

const CARDS = [
  { icon: FiCode, title: 'MERN Stack Developer', desc: 'Building scalable web applications with React, Node.js, Express, and MongoDB.' },
  { icon: FiBook, title: 'DSA Enthusiast', desc: 'Passionate about solving complex problems using Java and C++ with optimal Data Structures & Algorithms.' },
  { icon: FiZap, title: 'Problem Solver', desc: 'Strong foundation in OOP, Operating Systems, and system design principles.' },
]

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

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 py-20 md:py-28 px-0 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none"
      />

      <div className="flex justify-center w-full">
        <div className="max-w-6xl relative z-10 w-full px-6">
          <SectionHeading
            title="Who I Am"
          />

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-10 justify-start items-start w-full">
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4 justify-start max-w-full lg:max-w-2xl w-full px-2 sm:px-4"
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-xl leading-relaxed text-muted text-left"
              >
                I am <span className="text-bright font-bold">Mahesh Basavaraj Teli</span>, a Computer Science and Engineering (AIML) student at Siddaganga Institute of Technology, Tumkur, passionate about building scalable applications and solving complex problems.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-xl leading-relaxed text-muted text-left"
              >
                With a strong focus on the <span className="text-accent font-semibold">MERN stack</span>, I develop responsive frontend interfaces and robust backend systems. I am also dedicated to mastering <span className="text-accent font-semibold">Data Structures and Algorithms</span> to create efficient, production-level solutions.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-xl leading-relaxed text-muted text-left"
              >
                Currently, I am contributing to real-world projects that combine modern web technologies with practical problem solving. I am actively involved in IEEE SIT SB and the SIGMA Newsletter Club of SIT, where I collaborate with peers on technical initiatives and community-driven activities.
              </motion.p>
            </motion.div>

            {/* Right: trait cards */}
            <motion.div
              className="grid grid-cols-1 gap-5 items-start order-last lg:order-last w-full"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="glass-card rounded-xl p-4 flex flex-col items-start text-left gap-3 group hover:border-accent/50 cursor-default transition-all"
                >
                  <motion.div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-surface border border-border/50 flex items-center justify-center text-accent group-hover:border-accent/40 transition-colors duration-300"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
                  >
                    <card.icon size={24} />
                  </motion.div>
                  <div>
                    <h4 className="font-display font-bold text-sm md:text-base text-bright mb-1 group-hover:text-accent transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-xs md:text-sm text-muted leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}