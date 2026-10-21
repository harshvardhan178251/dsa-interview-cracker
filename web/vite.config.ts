import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Deploy at the domain root by default. Set BASE_PATH=/your-repo/ for GitHub Pages.
  base: process.env.BASE_PATH ?? '/',
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('react-markdown') || id.includes('remark-') || id.includes('micromark')) {
              return 'markdown'
            }
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('react-router')) {
              return 'react'
            }
          }
          return undefined
        },
      },
    },
  },
})
