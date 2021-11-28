//@ts-check
// not used for now

import { build } from 'esbuild'

import { writeFile } from 'fs/promises'
import filesize from 'filesize'

import svgrPlugin from 'esbuild-plugin-svgr'
import { readPackageJsonFile } from 'typed-jsonfile'

const pkg = await readPackageJsonFile({ dir: '.' })

/** @type {"dev" | "prod" | "prod-min"} */
const mode = process.argv[2] || 'prod'

const NODE_ENV = mode === 'dev' ? 'development' : 'production'

const result = await build({
    bundle: true,
    watch: mode === 'dev',
    minify: mode === 'prod-min',
    define: {
        'import.meta.env.NODE_ENV': `"${NODE_ENV}"`,
        'process.env.NODE_ENV': `"${NODE_ENV}"`,
    },
    entryPoints: ['src/react/mui2.tsx'],
    outfile: 'build/mui.js',
    external: [
        ...Object.keys(pkg.peerDependencies || {}),
        ...Object.keys(pkg.dependencies || {}),
    ],
    format: 'esm',
    metafile: true,
    plugins: [svgrPlugin()],
})

console.log(
    'Output size',
    filesize(Object.entries(result.metafile.outputs)[0][1].bytes),
)

writeFile('esbuild-out/meta-deps.json', JSON.stringify(result.metafile))
