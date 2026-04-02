export default function SectionHeading({ tag, title, subtitle }) {
  return (
    <div className="mb-16 md:mb-20 animate-fade-in">
      {tag && (
        <p className="font-mono text-sm md:text-base text-accent/70 mb-3 tracking-widest uppercase">
          {tag}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-bright mb-6 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg md:text-xl text-muted max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
