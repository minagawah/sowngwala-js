const TW_COLORS = require('./tw.colors.js');

module.exports = {
  important: true,
  content: [
    './src.check/styles/*.css',
    './src.check/check.html',
  ],
  theme: {
    extend: {
      colors: {
        ...TW_COLORS,
      },
    },
  },
  variants: {},
  plugins: [],
};
