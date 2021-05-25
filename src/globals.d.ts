// VSCODE!!! SHOW ARRAY ITEM LABEL ON HOVER!!!!!!!!!!
// and AUTOCOMPLETION FOR ARRAY ITEM LABELS!


declare module '*.svgr.svg' {
    const ref: React.ForwardRefRenderFunction<
        SVGSVGElement,
        React.SVGAttributes<SVGSVGElement>
    >;
    export default ref;
}

declare module '*.png' {
    const src: string;
    export default src;
}

interface ImportMeta {
    env: {
        NODE_ENV: "development" | "production";
    };
}

// declare global {
//     interface KeyboardEvent {
//         code: "esc" | "fdsf";
//     }
// }
