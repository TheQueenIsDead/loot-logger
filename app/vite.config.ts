import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'
// https://vitejs.dev/config/
export default defineConfig(({mode}) => {

  const envFiles = {
    development: ".env.development",
    production: ".env.production",
  };

  const envFile = dotenv.config({path: envFiles[mode]}).parsed;

  console.log(envFile)

  return {
    plugins: [react(), legacy()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
    define: {
      "process.env": JSON.stringify(envFile)
    }
  }
})
