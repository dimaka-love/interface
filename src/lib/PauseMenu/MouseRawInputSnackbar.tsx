import React, { useState } from "react";

import useTypedEventListener from "use-typed-event-listener";

import { Button, Slide, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { useUserState } from "../state";

interface ComponentProps {
}

function TransitionDown(props: any) {
    return <Slide {...props} direction="down" />;
}

const howToEnableRawInputUrl = "https://gist.github.com/zardoy/8325b680c08a396d820986991c54a41e";

type SnackbarState = "notShowed" | boolean | "showed";

let MouseRawInputSnackbar: React.FC<ComponentProps> = () => {
    const usingRawInput = useUserState(s => s.usingRawInput);

    const [snackbarState, setSnackbarState] = useState<SnackbarState>("notShowed");

    useTypedEventListener(document, "pointerlockchange", () => {
        if (
            !document.pointerLockElement ||
            usingRawInput === null ||
            snackbarState !== "notShowed"
        ) return;

        setSnackbarState(usingRawInput);
    });

    return <Snackbar
        open={typeof snackbarState === "boolean"}
        onClose={() => setSnackbarState("showed")}
        anchorOrigin={{
            vertical: "top",
            horizontal: "right"
        }}
        TransitionComponent={TransitionDown}
        autoHideDuration={4000}
    >
        <Alert severity={snackbarState ? "success" : "warning"}>
            Mouse Raw Input {snackbarState ? "enabled" : "needs to be enabled!"}
            {!snackbarState && <Button color="primary" size="small" component="a" target="_blank" href={howToEnableRawInputUrl}>MORE INFO</Button>}
        </Alert>
    </Snackbar>;
};

export default MouseRawInputSnackbar;
