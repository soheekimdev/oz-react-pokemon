import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  build: {
    outDir: 'docs',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.indexOf('node_modules') !== -1) {
            const module = id.split('node_modules/').pop().split('/')[0];
            return `vendor-${module}`;
          }
        },
      },
    },
  },
});
