//@ts-check
// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

const libMount = {
    "src/lib": { url: "/" },
};
const exampleMount = {
    "src/example": { url: "/" }
};

/** @type {import("snowpack").SnowpackUserConfig } */
const config = {
    mount: process.env.NODE_ENV === "production" ? libMount : {
        ...exampleMount,
        ...libMount
    },
    devOptions: {
        port: 8000
    },
    env: {
        SNOWPACK_PUBLIC_NAME: process.env.npm_package_name
    },
    plugins: [
        [
            "@snowpack/plugin-babel",
            {
                input: [".ts", ".tsx"],
                transformOptions: {
                    presets: [
                        "@babel/preset-typescript",
                        "@babel/preset-react",
                        // assumptions optimization? https://babeljs.io/docs/en/assumptions
                        "@babel/preset-env"
                    ],
                    plugins: [
                        // [
                        //     'babel-plugin-import',
                        //     {
                        //         'libraryName': '@material-ui/core',
                        //         // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                        //         'libraryDirectory': 'esm',
                        //         'camel2DashComponentName': false
                        //     }
                        // ],
                    ]
                }
            }
        ]
    ],

};

module.exports = config;
