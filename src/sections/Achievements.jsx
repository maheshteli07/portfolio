import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { ACHIEVEMENTS } from '../utils/data'

function AchievementRow({ item, isLast, index }) {
  // Track the WHOLE ROW so each line only draws when its own row enters view
  const rowRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 80%', 'center 35%'],
  })
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  })

  return (
    <div ref={rowRef} className="flex gap-4 md:gap-6 items-start">
      {/* ── Left column: icon + connector line ── */}
      <div className="flex flex-col items-center flex-shrink-0 self-stretch">
        {/* Icon node */}
        <motion.div
          className="w-10 h-10 rounded-lg border flex items-center justify-center text-lg bg-bg flex-shrink-0 z-10"
          style={{ borderColor: `${item.color}30`, color: item.color }}
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.06 }}
        >
          {item.icon}
        </motion.div>

        {/* Connector line — only between items */}
        {!isLast && (
          <div className="relative flex-1 w-[2px] mt-2 min-h-[32px] hidden sm:block">
            <div className="absolute inset-0 rounded-full bg-white/5" />
            <motion.div
              className="absolute inset-0 rounded-full origin-top"
              style={{ scaleY, backgroundColor: item.color, opacity: 0.65 }}
            />
          </div>
        )}
      </div>

      {/* ── Right column: content card ── */}
      <motion.div
        className={`flex-1 ${!isLast ? 'pb-7 md:pb-10' : ''}`}
        initial={{ opacity: 0, x: -14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 22,
          delay: index * 0.07,
        }}
      >
        <div className="glass-card p-4 md:p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
            <div className="flex-1">
              <span className="font-mono text-[10px] md:text-xs text-accent/60 font-bold uppercase tracking-widest">
                {item.year}
              </span>
              <h3 className="font-display font-semibold text-base md:text-lg text-bright tracking-tight mt-0.5">
                {item.title}
              </h3>
            </div>
            {item.score && (
              <div className="inline-flex items-center self-start px-2.5 py-1 rounded-md bg-accent/5 border border-accent/10 flex-shrink-0 sm:ml-2">
                <span className="text-xs font-bold text-accent">{item.score}</span>
              </div>
            )}
          </div>
          <p className="text-xs md:text-sm text-muted/80 leading-relaxed">
            {item.detail}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="scroll-mt-16 py-12 md:py-20 px-4 md:px-6 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10 text-left">
        <SectionHeading
          tag="Milestones"
          title="Achievements"
          subtitle="A summary of my competitive accomplishments and key milestones."
        />

        <div className="mt-8 md:mt-12">
          {ACHIEVEMENTS.map((item, index) => (
            <AchievementRow
              key={item.id}
              item={item}
              index={index}
              isLast={index === ACHIEVEMENTS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
