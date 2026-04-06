/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── User-specified tokens ──────────────────────
        primary: '#22D3EE',  // Neon Cyan
        secondary: '#8B5CF6',  // Electric Violet
        dark: '#0A0F1C',  // Deep Midnight
        card: '#1A2238',  // Glass Dark
        textMain: '#E5E7EB',  // Soft White
        textSub: '#9CA3AF',  // Muted Gray
        accent: '#34D399',  // Soft Emerald Glow

        // ── Backwards-compatible aliases (used in existing JSX) ──
        bg: '#0A0F1C',  // = dark
        navy: '#111827',  // Soft Navy (secondary background)
        surface: '#1A2238',  // = card
        accent2: '#8B5CF6',  // = secondary
        highlight: '#34D399',  // = accent
        bright: '#E5E7EB',  // = textMain
        muted: '#9CA3AF',  // = textSub
      },
    },
  },
  plugins: [],
}

