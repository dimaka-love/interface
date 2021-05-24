const css = a => a;

export const fullScreenFixedStyles = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

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
`;



export const focusableElemOutline = css`
    outline: 2px solid dodgerblue;
`;
