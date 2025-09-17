// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        keyframes: {
          // Animação de slide horizontal
          slideIn: {
            from: { transform: 'translateX(100%)', opacity: '0' },
            to: { transform: 'translateX(0)', opacity: '1' },
          },
          // Animação shimmer para botões animados
          shimmer: {
            '0%': { 'background-position': '0% 50%' },
            '50%': { 'background-position': '100% 50%' },
            '100%': { 'background-position': '0% 50%' },
          },
          // Animação fade + slide vertical (para Material.jsx)
          fadeSlide: {
            '0%': { opacity: '0', transform: 'translateY(40px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
        },
        animation: {
          slideIn: 'slideIn 0.3s ease forwards',
          shimmer: 'shimmer 6s ease infinite',
          fadeSlide: 'fadeSlide 0.8s ease forwards',
        },
        backgroundImage: {
          // Gradientes para botões animados
          'shimmer-dark':
            'linear-gradient(270deg, rgba(147,51,234,0.6), rgba(88,28,135,0.6), rgba(30,58,138,0.5))',
          'shimmer-light':
            'linear-gradient(270deg, rgba(113,183,230,0.7), rgba(179,221,254,0.7), rgba(74,144,226,0.7))',
        },
        dropShadow: {
          'text-dark': '0 0 6px rgba(0,0,0,0.7)',
          'text-light': '0 0 4px rgba(0,0,0,0.6)',
        },
        spacing: {
          36: '9rem', // padding-top mobile
        },
        borderRadius: {
          '3xl': '1.5rem', // usado nas imagens e containers
        },
      },
    },
    plugins: [],
  };
  