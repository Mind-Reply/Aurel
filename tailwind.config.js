/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aurel: {
          black:   '#0A0A0A',
          charcoal:'#1A1A1A',
          graphite:'#2D2D2D',
          stone:   '#6B6B6B',
          silver:  '#C8C8C8',
          pearl:   '#F0EDE8',
          cream:   '#FAF8F5',
          gold:    '#C9A96E',
          'gold-light': '#E8D5B0',
          'gold-dark':  '#A07840',
          white:   '#FFFFFF',
        }
      },
      fontFamily: {
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        mono:  ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      animation: {
        'fade-up':   'fadeUp 0.8s ease forwards',
        'fade-in':   'fadeIn 1s ease forwards',
        'line-grow': 'lineGrow 1.2s ease forwards',
      },
      keyframes: {
        fadeUp:   { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        lineGrow: { '0%': { width: '0' }, '100%': { width: '100%' } },
      },
    },
  },
  plugins: [],
}
