import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── CORES DA MARCA ───────────────────────────────────────────────
      colors: {
        gold: {
          DEFAULT: '#B8985A',
          light: '#D4B87A',
          pale: '#F5EDD8',
          dark: '#8C7040',
        },
        cream: {
          DEFAULT: '#FAFAF7',
          100: '#F4F3EF',
          200: '#E8E6DF',
        },
        charcoal: {
          DEFAULT: '#0A0A0A',
          800: '#2E2C29',
          600: '#5C5852',
          400: '#9E9A91',
          300: '#C8C4BB',
          200: '#E8E6DF',
        },
      },

      // ─── TIPOGRAFIA ────────────────────────────────────────────────────
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 7vw, 6.5rem)', { lineHeight: '1.05' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1' }],
        'display-md': ['clamp(2rem, 4vw, 3.2rem)', { lineHeight: '1.15' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.2rem)', { lineHeight: '1.2' }],
        'label': ['0.72rem', { lineHeight: '1', letterSpacing: '0.25em' }],
        'label-sm': ['0.65rem', { lineHeight: '1', letterSpacing: '0.2em' }],
      },

      // ─── ESPAÇAMENTO ──────────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },

      // ─── ANIMAÇÕES ────────────────────────────────────────────────────
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'scroll-line': 'scrollLine 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scrollLine: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.6' },
        },
      },

      // ─── ASPECTOS ─────────────────────────────────────────────────────
      aspectRatio: {
        'product': '3 / 4',
        'banner': '16 / 5',
      },

      // ─── BACKDROP ─────────────────────────────────────────────────────
      backdropBlur: {
        'nav': '12px',
      },
    },
  },
  plugins: [],
}

export default config
