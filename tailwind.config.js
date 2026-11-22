/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#F59E0B',
          gold: '#FBBF24',
          amber: '#D97706',
          dark: '#0B0F14',
          charcoal: '#121820',
          slate: '#1E293B',
          surface: '#161F2A',
          card: '#1F2A38',
        },
        tn: {
          green: '#10B981',
          blue: '#3B82F6',
          red: '#EF4444',
          road: '#2A3644'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-yellow': '0 0 25px -5px rgba(245, 158, 11, 0.4)',
        'glow-green': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.25), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
