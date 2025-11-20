import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    // Production optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
      },
    },
    sourcemap: false, // Disable sourcemaps in production
    rollupOptions: {
      output: {
        // Code splitting for better performance
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'socket': ['socket.io-client'],
        }
      }
    }
  }
})