export default function SectionHeading({ tag, title, subtitle, className = '' }) {
  return (
    <div className={`mb-8 md:mb-12 animate-fade-in text-left ${className}`}>
      {tag && (
        <p className="font-mono text-sm md:text-base text-accent/70 mb-3 tracking-widest uppercase">
          {tag}
        </p>
      )}
      <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold text-bright leading-tight ${subtitle ? 'mb-4' : 'mb-0'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg md:text-xl text-muted max-w-3xl leading-relaxed mt-4">
          {subtitle}
        </p>
      )}
    </div>
  )
}
