// SHOULD BE USED AS STANDALONE LIBRARY

import React, { useEffect, useMemo, useRef, useState } from "react";

import { useOrientation } from "react-use";

import { getLastSiblingSelector, getSiblingSelector, isMacOs } from "./util";

type GetStateHelpers<T> = T extends boolean ? Record<"toggle" | "on" | "off", () => void> : {};

interface UseFocusControllerParams {
    // container: React.MutableRefObject<HTMLElement>;
    containerRef: React.MutableRefObject<HTMLElement>;
    focusableElemSelector: string;
}

// moves focus by using keyboard
export const useFocusController = ({ focusableElemSelector, containerRef }: UseFocusControllerParams) => {
    useEffect(() => {
        // https://css-tricks.com/snippets/javascript/test-mac-pc-javascript/
        // its really important because user might want to move the window with Windows + Arrow Down / Up
        const listener = ({ code, metaKey }: KeyboardEvent) => {
            let activeElement = document.activeElement as HTMLElement | null;
            if (activeElement === document.body) activeElement = null;
            if (!activeElement || !containerRef.current.contains(activeElement)) return;
            const arrowKey = code.match(/Arrow(Up|Down)/)?.[1];

            const moveFocus = (dir: "prev" | "next", absolute: boolean) => {
                const elemToFocus =
                    // todo-high open pr fix ts error
                    (absolute ? getLastSiblingSelector : getSiblingSelector)(activeElement!, focusableElemSelector, dir);
                if (!elemToFocus) return;
                elemToFocus.focus();
            };

            if (arrowKey) {
                // also handle macOS Home / End alternative (CMD + Arrow Up / Down)
                moveFocus(arrowKey === "Down" ? "next" : "prev", isMacOs && metaKey);
            }

            if (code === "Home" || code === "End") {
                moveFocus(code === "End" ? "next" : "prev", true);
            }
        };
        window.addEventListener("keydown", listener);
        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, [focusableElemSelector]);
};

export const useDeviceNeedsRotation = () => {
    const orientation = useOrientation();

    const modal = useModalState();

    const firstTime = useRef(true);

    // another 5 chromium bugs

    useEffect(() => {
        // todo on devices with sensor hook always got fired twice on first render
        if (firstTime.current) {
            firstTime.current = false;
            return;
        }
        // TODO-HIGH calculation
        window.innerWidth < 500 && window.innerHeight > window.innerWidth ?
            modal.open() : modal.close();
    }, [orientation]);

    return modal.isOpen;
};

type UseAdvancedState = <T extends boolean | string | number>(initialValue: T | (() => T)) => T & {
    set: (newValue: T | ((prev: T) => T)) => void;
} & GetStateHelpers<T>;

// too young
const useAdvancedState: UseAdvancedState = (initialValue) => {
    const [val, setter] = useState(initialValue);
    return useMemo(() => {
        // todo infer type
        const modifiedLiteral: any = val;
        if (typeof modifiedLiteral === "boolean") {
            //@ts-ignore
            modifiedLiteral.toggle = () => setter(s => !s);
            //@ts-ignore
            modifiedLiteral.on = () => setter(true);
            //@ts-ignore
            modifiedLiteral.off = () => setter(false);
        }
        modifiedLiteral.set = setter;
        return modifiedLiteral;
    }, [val]);
};
