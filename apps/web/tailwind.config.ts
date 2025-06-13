import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-neon': '#A3E635',
        'surface-matte': '#0F172A',
        'text-muted': '#94A3B8',
        'focus-outline': '#A3E635',
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'ui-sans-serif',
          'system-ui',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      ringWidth: {
        DEFAULT: '2px',
      },
      ringColor: {
        DEFAULT: '#A3E635',
      },
    },
  },
  plugins: [],
};

export default config; 