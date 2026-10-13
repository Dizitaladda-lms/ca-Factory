import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

const getAxiosPlatformBrowserPath = () => {
  const local = path.resolve('./node_modules/axios/lib/platform/browser/index.js')
  if (fs.existsSync(local)) return local
  const hoisted = path.resolve('../node_modules/axios/lib/platform/browser/index.js')
  if (fs.existsSync(hoisted)) return hoisted
  return local
}

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      // Force axios to use browser build on Vercel Linux
      'axios/lib/platform/index.js': getAxiosPlatformBrowserPath(),
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router-dom/')) {
              return 'vendor';
            }
            if (id.includes('/recharts/')) {
              return 'charts';
            }
            if (id.includes('/jspdf/') || id.includes('/html2canvas/')) {
              return 'pdf';
            }
          }
        },
      },
    },
  },
})
