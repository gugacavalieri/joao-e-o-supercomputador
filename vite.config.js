import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    minify: 'terser',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})

