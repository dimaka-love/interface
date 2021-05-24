import React from "react";

import clsx from "clsx";

import { css } from "@emotion/css";

type ComponentProps = React.ComponentProps<"div">;

/** core components for all screens */
let Screen: React.FC<ComponentProps> = ({ children, ...divProps }) => {
    return <div {...divProps} className={clsx(css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    `, divProps.className)}>{children}</div>;
};

export default Screen;
