import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],

    // Define global constants
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },

    // Server configuration for development
    server: {
      port: 3000,
      open: true,
      host: true
    },

    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'esbuild' : false,
    },

    // Environment variables configuration
    envPrefix: 'VITE_',
  }
})