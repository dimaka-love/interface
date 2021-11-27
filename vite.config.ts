import { defineVitConfig } from '@zardoy/vit'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react-refresh'

export default defineConfig({
    root: 'example',
    base: './',
    plugins: [tsconfigPaths()],
})
