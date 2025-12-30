/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        flicker: {
          '0%, 19%, 22%, 62%, 64%, 70%, 100%': { opacity: '1' },
          '20%, 21%, 63%, 69%': { opacity: '0.6' }
        },
        scanline: {
          '0%': { transform: 'translateY(-120%)' },
          '100%': { transform: 'translateY(120%)' }
        }
      },
      animation: {
        flicker: 'flicker 2.5s linear infinite',
        scanline: 'scanline 2.6s linear infinite'
      }
    }
  },
  plugins: [],
}

