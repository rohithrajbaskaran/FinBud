import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['redux-persist', '@reduxjs/toolkit', 'react-redux']
  },
  server: {
    hmr: {
      overlay: false
    }
  }
})
