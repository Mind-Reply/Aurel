/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/aurel/app/**/*.{js,ts,jsx,tsx,mdx}',
    './apps/aurel/components/**/*.{js,ts,jsx,tsx,mdx}',
    './apps/aurel/lib/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aurel: {
          black:   '#090807',
          charcoal:'#161310',
          graphite:'#1a1510',
          stone:   '#8a7f72',
          silver:  '#c8c8c8',
          pearl:   '#f3ece3',
          cream:   '#faf8f5',
          amber:   '#c9854a',
          'amber-light': '#e8b87a',
          'amber-dark':  '#a06a35',
          white:   '#FFFFFF',
        }
      },
      fontFamily: {
        sans:  ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
    },
  },
  plugins: [],
}
