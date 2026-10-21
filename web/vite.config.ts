import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // `''` loads every variable, including the un-prefixed BASE_PATH.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    // Deploy at the domain root by default. Set BASE_PATH=/your-repo/ for GitHub Pages.
    base: env.BASE_PATH || '/',
    server: {
      port: 5173,
      strictPort: false,
      proxy: {
        // The compiler backend runs separately (npm run serve) during development.
        '/api': {
          target: env.API_TARGET || 'http://localhost:4173',
          changeOrigin: true,
        },
      },
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
              if (id.includes('@codemirror') || id.includes('@lezer')) {
                return 'editor'
              }
            }
            return undefined
          },
        },
      },
    },
  }
})
