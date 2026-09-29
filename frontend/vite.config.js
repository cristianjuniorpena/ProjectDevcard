import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/react-fontawesome',
    ],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/imgs': 'http://localhost:3000',
    },
  },
})
