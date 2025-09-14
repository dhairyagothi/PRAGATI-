/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#1a1a1a',
          100: '#2d2d30',
          200: '#3e3e42',
          300: '#4f4f55',
          400: '#606067',
          500: '#71717a',
          600: '#a1a1aa',
          700: '#d4d4d8',
          800: '#e4e4e7',
          900: '#f4f4f5',
        },
        dark: {
          50: '#0f0f0f',
          100: '#1a1a1a',
          200: '#262626',
          300: '#333333',
          400: '#404040',
          500: '#525252',
          600: '#737373',
          700: '#a3a3a3',
          800: '#d4d4d4',
          900: '#f5f5f5',
        },
        success: {
          50: '#052e16',
          100: '#14532d',
          200: '#166534',
          300: '#15803d',
          400: '#16a34a',
          500: '#22c55e',
          600: '#4ade80',
          700: '#86efac',
          800: '#bbf7d0',
          900: '#dcfce7',
        },
        warning: {
          50: '#451a03',
          100: '#78350f',
          200: '#92400e',
          300: '#b45309',
          400: '#d97706',
          500: '#f59e0b',
          600: '#fbbf24',
          700: '#fcd34d',
          800: '#fde68a',
          900: '#fef3c7',
        },
        danger: {
          50: '#450a0a',
          100: '#7f1d1d',
          200: '#991b1b',
          300: '#b91c1c',
          400: '#dc2626',
          500: '#ef4444',
          600: '#f87171',
          700: '#fca5a5',
          800: '#fecaca',
          900: '#fee2e2',
        },
        rail: {
          track: '#525252',
          station: '#71717a',
          signal: {
            red: '#DC2626',
            yellow: '#F59E0B',
            green: '#16A34A',
          }
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'train-move': 'train-move 8s linear infinite',
      },
      keyframes: {
        'train-move': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}