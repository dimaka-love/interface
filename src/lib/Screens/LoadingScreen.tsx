import React from "react";

import { CircularProgress } from "@material-ui/core";

import Screen from "./Screen";

interface ComponentProps {
}

let LoadingScreen: React.FC<ComponentProps> = () => {
    return <Screen>
        <div />
        <CircularProgress></CircularProgress>
        <div />
    </Screen>;
};

export default LoadingScreen;
