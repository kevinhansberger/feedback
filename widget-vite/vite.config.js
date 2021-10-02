const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const path = require('path');

// https://vitejs.dev/config/
module.exports = defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3001
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'FeedbackWidget',
      filename: (format) => `my-lib.${format}.js`
    }
  },
  plugins: [react()]
});
