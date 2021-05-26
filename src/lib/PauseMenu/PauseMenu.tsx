import React, { useRef } from "react";

import useTypedEventListener from "use-typed-event-listener";

import { css } from "@emotion/css";

import VisibleSubMenus from "../PauseSubMenu/VisibleSubMenus";
import { useFocusController, useModalState } from "../react-util";
import { useUserState } from "../state";
import { modalStyles } from "../styles";
import EscWarning from "./EscWarning";
import PauseButton from "./PauseButton";

export type PauseSchema = {
    buttons: React.ComponentProps<typeof PauseButton>[];
};

interface ComponentProps {
    schema: PauseSchema;
    // gameTitle?: string;
}

// const RightCornerInfo: React.FC = () => {
//     const deviceStats = useUserState(s => s.hardwareInfo);

//     return <div style={{
//         position: "fixed",
//         top: 0,
//         right: 0,
//         padding: 5
//     }}>
//         {
//             deviceStats.map(stat => {
//                 if (stat.state !== "loaded") return null;
//                 return stat.value;
//             })
//         }
//     </div>;
// };

export const openPauseMenu = () => {
    useUserState.setState({ openedUI: { type: "pause", menu: "root" } });
};

export const closePauseMenu = () => {
    useUserState.setState({ openedUI: null });
    // requestPointerLock
};

let PauseMenu: React.FC<ComponentProps> = ({ schema }) => {
    const buttonsContainerRef = useRef<HTMLDivElement>(null!);
    const escWarning = useModalState();

    const openedUI = useUserState(s => s.openedUI);

    const rootPauseOpened = openedUI?.type === "pause" && openedUI.menu === "root";

    useFocusController({
        containerRef: buttonsContainerRef,
        // todo auto detect not focusable elems
        focusableElemSelector: "button:not([tab-index=\"-1\"])"
    });

    useTypedEventListener(window, "keydown", e => {
        if (openedUI) {
            if (openedUI.type !== "pause" || openedUI.menu !== "root") return;
            switch (e.code) {
                case "Backquote":
                    closePauseMenu();
                    break;
                case "Escape":
                    escWarning.show();
                    break;
            }
        } else {
            if (e.code === "Escape") {
                openPauseMenu();
            }
        }
    });

    useTypedEventListener(document, "pointerlockchange", () => {
        if (document.pointerLockElement) return;
        openPauseMenu();
    });

    return <>
        <EscWarning open={escWarning.isOpen} onClose={escWarning.close} />

        {openedUI?.type === "pause" && <>
            <div
                ref={buttonsContainerRef}
                className={css`
                    ${modalStyles}
                    background-color: rgba(0, 0, 0, 0.3);
                    @supports ((-webkit-backdrop-filter: blur(2em)) or (backdrop-filter: blur(2em))) {
                        backdrop-filter: blur(3px);
                        background-color: transparent;
                    }
                    flex-direction: column;
                `}
            >
                {schema.buttons.map((props, index) => {
                    return <PauseButton
                        key={props.label}
                        autoFocus={index === 0}
                        {...props}
                    />;
                })}
                {/* I will probably return back button when problem with esc is resolved (BACK BUTTON) */}
                <VisibleSubMenus />
            </div>
        </>}
    </>;
};

export default PauseMenu;
