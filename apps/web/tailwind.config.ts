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
        // Professional Black & White System (Cursor-inspired)
        'black': '#000000',
        'white': '#FFFFFF',
        
        // Sophisticated Gray Scale
        'gray-50': '#FAFAFA',
        'gray-100': '#F5F5F5',
        'gray-200': '#E5E5E5',
        'gray-300': '#D4D4D4',
        'gray-400': '#A3A3A3',
        'gray-500': '#737373',
        'gray-600': '#525252',
        'gray-700': '#404040',
        'gray-800': '#262626',
        'gray-850': '#1F1F1F',
        'gray-900': '#171717',
        'gray-925': '#0F0F0F',
        'gray-950': '#0A0A0A',
        
        // Professional Backgrounds
        'bg-primary': '#000000',
        'bg-secondary': '#0A0A0A',
        'bg-tertiary': '#171717',
        'bg-surface': '#1F1F1F',
        'bg-elevated': '#262626',
        'bg-overlay': 'rgba(0, 0, 0, 0.8)',
        'bg-glass': 'rgba(255, 255, 255, 0.05)',
        'bg-glass-hover': 'rgba(255, 255, 255, 0.08)',
        
        // Professional Text
        'text-primary': '#FFFFFF',
        'text-secondary': '#A3A3A3',
        'text-tertiary': '#737373',
        'text-quaternary': '#525252',
        'text-inverse': '#000000',
        
        // Professional Borders
        'border-primary': '#262626',
        'border-secondary': '#171717',
        'border-tertiary': '#0F0F0F',
        'border-accent': '#404040',
        'border-focus': '#007AFF',
        
        // Single Professional Accent
        'accent-blue': '#007AFF',
        'accent-blue-hover': '#0066CC',
        'accent-blue-light': 'rgba(0, 122, 255, 0.1)',
        'accent-blue-glow': 'rgba(0, 122, 255, 0.2)',
        
        // Status Colors (Minimal)
        'success': '#10B981',
        'success-light': 'rgba(16, 185, 129, 0.1)',
        'warning': '#F59E0B',
        'warning-light': 'rgba(245, 158, 11, 0.1)',
        'error': '#EF4444',
        'error-light': 'rgba(239, 68, 68, 0.1)',
        
        // Legacy support (gradually remove)
        'primary-neon': '#007AFF',
        'primary-dark': '#171717',
        'primary-darker': '#000000',
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'Monaco',
          'Cascadia Code',
          'Roboto Mono',
          'Consolas',
          'Liberation Mono',
          'Menlo',
          'Courier',
          'monospace',
        ],
      },
      fontSize: {
        // Professional Typography Scale
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.01em' }],
        'sm': ['14px', { lineHeight: '20px', letterSpacing: '0.01em' }],
        'base': ['16px', { lineHeight: '24px', letterSpacing: '0.01em' }],
        'lg': ['18px', { lineHeight: '28px', letterSpacing: '0.01em' }],
        'xl': ['20px', { lineHeight: '30px', letterSpacing: '0.01em' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em' }],
        '3xl': ['30px', { lineHeight: '38px', letterSpacing: '-0.01em' }],
        '4xl': ['36px', { lineHeight: '44px', letterSpacing: '-0.02em' }],
        '5xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em' }],
        '6xl': ['60px', { lineHeight: '68px', letterSpacing: '-0.02em' }],
        '7xl': ['72px', { lineHeight: '80px', letterSpacing: '-0.02em' }],
        '8xl': ['96px', { lineHeight: '104px', letterSpacing: '-0.03em' }],
        '9xl': ['128px', { lineHeight: '136px', letterSpacing: '-0.03em' }],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      spacing: {
        // Precise spacing system
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '3.5': '14px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '11': '44px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '18': '72px',
        '20': '80px',
        '24': '96px',
        '28': '112px',
        '32': '128px',
        '36': '144px',
        '40': '160px',
        '44': '176px',
        '48': '192px',
        '52': '208px',
        '56': '224px',
        '60': '240px',
        '64': '256px',
        '72': '288px',
        '80': '320px',
        '96': '384px',
      },
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        DEFAULT: '8px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        // Professional shadow system
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '2xl': '0 50px 100px -20px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(0, 122, 255, 0.2)',
        'glow-lg': '0 0 40px rgba(0, 122, 255, 0.3)',
      },
      ringWidth: {
        DEFAULT: '1px',
        0: '0px',
        1: '1px',
        2: '2px',
        4: '4px',
        8: '8px',
      },
      ringColor: {
        DEFAULT: '#007AFF',
      },
      animation: {
        // Subtle professional animations
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
