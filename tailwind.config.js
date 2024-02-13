const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.colors': {
          backgroundColor: '#007aff',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};
