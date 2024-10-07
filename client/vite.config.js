import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Si shadcn-ui utiliza algún alias que se necesite añadir
    },
  },
/*   esbuild: {
    jsxInject: `import React from 'react'`, // Para evitar tener que importar React en cada archivo
  }, */
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8800',  // URL servidor backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  
})
