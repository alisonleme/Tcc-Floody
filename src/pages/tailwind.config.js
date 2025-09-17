// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        keyframes: {
          slideIn: {
            from: { transform: 'translateX(100%)', opacity: '0' },
            to: { transform: 'translateX(0)', opacity: '1' },
          },
          shimmer: {
            '0%': { 'background-position': '0% 50%' },
            '50%': { 'background-position': '100% 50%' },
            '100%': { 'background-position': '0% 50%' },
          },
        },
        animation: {
          slideIn: 'slideIn 0.3s ease forwards',
          shimmer: 'shimmer 6s ease infinite',
        },
      },
    },
    plugins: [],
  }
  