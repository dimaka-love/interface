import { defineVitConfig } from '@zardoy/vit'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import reactPlugin from '@vitejs/plugin-react'

export default defineConfig({
    root: 'example',
    base: './',
    plugins: [tsconfigPaths(), svgr(), reactPlugin()],
})
