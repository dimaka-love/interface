//@ts-check

import { build } from "esbuild";

import { readFile, writeFile } from "fs/promises"
import filesize from "filesize"

import svgrPlugin from "esbuild-plugin-svgr";

const pkg = JSON.parse(await readFile("./package.json", "utf-8"));

/** @type {"dev" | "prod" | "prod-min"} */
const mode = process.argv[2] || "prod";

const NODE_ENV = mode === "dev" ? "development" : "production";

const result = await build({
    bundle: true,
    watch: mode === "dev",
    minify: mode === "prod-min",
    define: {
        "import.meta.env.NODE_ENV": `"${NODE_ENV}"`,
        "process.env.NODE_ENV": `"${NODE_ENV}"`
    },
    entryPoints: [
        "src/lib/AppProvider.tsx"
    ],
    outfile: "esbuild-out/index.js",
    external: [
        ...Object.keys(pkg.peerDependencies || {}),
        "prop-types"
    ],
    format: "esm",
    metafile: true,
    plugins: [
        svgrPlugin()
    ]
});

console.log(
    filesize(Object.entries(result.metafile.outputs)[0][1].bytes)
)

writeFile("esbuild-out/meta-deps.json", JSON.stringify(result.metafile))
