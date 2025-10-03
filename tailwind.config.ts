import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        night: {
          950: '#050A1E',
        },
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(120% 120% at 50% 0%, rgba(16, 185, 129, 0.35) 0%, rgba(6, 95, 70, 0) 55%), radial-gradient(90% 90% at 80% 20%, rgba(45, 212, 191, 0.45) 0%, rgba(14, 116, 144, 0) 60%)',
        'grid-fade':
          'linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 0), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 0)',
      },
      backgroundSize: {
        'grid-spacing': '64px 64px',
      },
      boxShadow: {
        glass: '0 18px 45px -18px rgba(15, 118, 110, 0.45)',
        elevated: '0 24px 80px -24px rgba(15, 118, 110, 0.55)',
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.9)', opacity: '0.6' },
          '75%': { transform: 'scale(1.15)', opacity: '0' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 3.5s ease-in-out infinite',
        ripple: 'ripple 2.5s ease-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
