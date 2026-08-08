import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          950: '#0f172a',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
        },
        secondary: {
          50: '#fef7f2',
          100: '#fce8de',
          200: '#f8d1ba',
          300: '#f4ba97',
          400: '#f0a373',
          500: '#ec834f',
          600: '#d4652e',
          700: '#bc471d',
          800: '#a42917',
          900: '#7a1c0f',
        },
        accent: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
      },
      spacing: {
        safe: 'max(1rem, env(safe-area-inset-left))',
      },
    },
  },
  plugins: [],
};

export default config;
