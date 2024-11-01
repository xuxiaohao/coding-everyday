import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'index.ts',
      formats: ['es'],
      name: 'index',
      fileName: (format) => `index.js`,
    },
    outDir: 'lib',
    rollupOptions: {
      external: ['vue'],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
