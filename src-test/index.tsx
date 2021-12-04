import React from 'react'

import ReactDomServer from 'react-dom/server'
import ReactDom from 'react-dom'

import MovementButton from './lib/MovementButton.svgr.svg'

import { App } from './lib/index'

ReactDom.render(<App />, document.getElementById('root'))

// console.log(ReactDomServer.renderToString(
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 960">
//         <path d="m480 151.8-376 651.3h752z" strokeWidth="10" stroke="#fff" fill="rgba(0, 0, 0, 0.5)" />
//     </svg>
// ));
// console.log(ReactDomServer.renderToString(
//     <MovementButton />
// ));
