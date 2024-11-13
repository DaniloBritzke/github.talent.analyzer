import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 8080,
    host: true,
    proxy: {
        '/api': 'http://localhost:5004',
      },
    watch: {
      usePolling: true,
    },
  }
})
