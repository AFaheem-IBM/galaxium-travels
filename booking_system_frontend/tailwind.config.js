/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0D0D0D',
        'space-blue': '#161616',
        'cosmic-purple': '#E53935',
        'nebula-pink': '#FF7043',
        'alien-green': '#00C853',
        'solar-orange': '#FFB300',
        'star-white': '#F9FAFB',
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(to bottom, #0D0D0D, #161616)',
        'cosmic-gradient': 'linear-gradient(135deg, #E53935, #FF7043)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}

// Made with Bob
