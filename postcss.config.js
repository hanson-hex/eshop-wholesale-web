/* eslint-disable */
// const path = require('path');

module.exports = () => {
  // const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750;
  return {
    plugins: [require('tailwindcss'), require('autoprefixer')]
  }
}
