import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import resolve from 'resolve'
import path from 'path'
import { statSync } from 'fs';

function src_resolver () {
  const extensions = ['.js', '.jsx']
  const srcDir = path.resolve('./src')
  return {
    resolveId (...args) {
      const [importee, importer] = args
      if(importer.startsWith(srcDir)) {
        try {
          const path = resolve.sync(srcDir + '/' + importee, { extensions })
          statSync(path)
          return path
        } catch(err) {
          return null
        }
      }
    }
  }
}

export default defineConfig({
  base: '/vion-fe/',
  plugins: [react(), src_resolver()]
})
