/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#06b6d4',
          hover: '#0891b2',
        },
        secondary: '#64748b',
      },
      spacing: {
        'section': '2rem',
        'container': '1rem',
      },
      borderRadius: {
        'container': '0.75rem',
      },
      animation: {
        'fade-in-up': 'fade-in-up 1s ease-out',
        'gradient': 'gradient 3s ease infinite',
        'pulse': 'pulse 2s infinite',
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        pulse: {
          '0%': {
            'box-shadow': '0 0 0 0 rgba(6, 182, 212, 0.7)',
          },
          '70%': {
            'box-shadow': '0 0 0 10px rgba(6, 182, 212, 0)',
          },
          '100%': {
            'box-shadow': '0 0 0 0 rgba(6, 182, 212, 0)',
          },
        },
      },
    },
  },
  plugins: [],
}
