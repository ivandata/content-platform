import react from '@vitejs/plugin-react'
import path from 'path';
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    svgr()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'shared': path.resolve(__dirname, './src/shared'),
      'modules': path.resolve(__dirname, './src/modules'),
      'public': path.resolve(__dirname, './public'),
    },
  },
})
