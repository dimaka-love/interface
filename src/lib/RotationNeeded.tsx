import React from "react";

import { css } from "@emotion/css";
import { ScreenRotation } from "@material-ui/icons";

import { modalStyles } from "./styles";

interface ComponentProps {
}

let RotationNeeded: React.FC<ComponentProps> = () => {
    return <div className={css`
        ${modalStyles}
    `}>
        <ScreenRotation
            color="action"
            style={{
                width: "50%",
                height: "50%"
            }}
        />
    </div>;
};

export default RotationNeeded;
