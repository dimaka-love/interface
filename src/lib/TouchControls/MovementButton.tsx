import React from "react";

import clsx from "clsx";

import { css } from "@emotion/css";

import { useTouchMovement } from "../state";
import { useFixedPointerEvents } from "./util";

export type MovementAction = [
    coordinate: "x" | "y" | "z",
    step: number
];

const MovementButtonSvg: React.FC<React.ComponentProps<"svg">> = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 960" style={{ "background": "rgba(128, 128, 128, 0.8)" }} {...props}>
    <path d="m480 151.8-376 651.3h752z" strokeWidth="10" stroke="#fff" fill="rgba(0, 0, 0, 0.5)" />
</svg>;
const CircleButtonSvg: React.FC<React.ComponentProps<"svg">> = (props) => <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="100" cy="100" r="80" stroke="#fff" fill="none" strokeWidth="10" />
</svg>;

type args = Parameters<typeof useFixedPointerEvents>[0];

type ComponentProps = {
    action: MovementAction | MovementAction[] | ((newState: boolean) => unknown),
    /** @default true */
    borderOnTouch?: boolean;
    DivProps?: React.ComponentProps<"div">;
    Image?: null | ({ type: "bundled", src: "arrow" | "circle"; } & React.ComponentProps<"svg">) | ({ type: "external", src: string; } & React.ComponentProps<"img">);
};

const touchingButtonClass = css`
    background-color: rgba(255, 255, 255, 0.1);
`;

let MovementButton: React.FC<ComponentProps> = ({
    action,
    children,
    DivProps,
    Image = null
}) => {
    const [pointerEvents, touching] = useFixedPointerEvents({
        updateTouching: typeof action === "function" ? action : (newState) => {
            // unstable
            const movementActions = typeof action[0] === "string" ? [action as MovementAction] : action as MovementAction[];

            const coordsToUpdate = Object.fromEntries(
                movementActions.map(([coord, step]) => [coord, newState ? step : -step])
            ) as Record<MovementAction[0], number>;
            useTouchMovement.setState(coordsToUpdate);
        },
    });

    // todo-high! use HOC

    const imageClassName = Image ?
        clsx(css`
            opacity: 0.9;
        `, Image.className) : undefined;

    return <div
        {...DivProps}
        className={clsx(css`
            width: 100%;
            height: 100%;
            & > * {
                pointer-events: none;
                width: 100%;
                height: 100%;
            }
        `, {
            [touchingButtonClass]: touching
        }, DivProps?.className)}
        {...pointerEvents}
    >
        {Image &&
            Image.type === "bundled" ?
            Image.src === "arrow" ?
                <MovementButtonSvg className={imageClassName} /> :
                <CircleButtonSvg className={imageClassName} />
            :
            <img
                {...Image}
                className={imageClassName}
            />
        }
        {children}
    </div>;
};

export default MovementButton;
