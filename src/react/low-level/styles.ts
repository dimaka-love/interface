export const zIndexes = {
    canvas: 5,
    hud: 10,
    modal: 1250,
}

const css = String.raw

export const fullScreenFixedStyles = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

export const modalStyles = css`
    ${fullScreenFixedStyles}
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: ${zIndexes.modal};
`

export const buttonStyles = css`
    padding: 0;
    background: transparent;
    font-family: inherit;
    letter-spacing: 0.5px;
    border: none;
    color: white;
    text-transform: uppercase;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const pixelatedImage = css`
    image-rendering: crisp-edges;
    image-rendering: pixelated;
`

export const focusableElemOutline = css`
    outline: 2px solid dodgerblue;
`
