declare module '*.svgr.svg' {
    // export const ReactComponent: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>
    // export default ReactComponent
    const module: any
    export = module
}

declare module '*.png' {
    const src: string
    export default src
}

interface ImportMeta {
    env: {
        NODE_ENV: 'development' | 'production'
    }
}
