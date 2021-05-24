import React from "react";

import { Animator, AnimatorGeneralProvider } from "@arwes/animation";
import { FrameCorners } from "@arwes/core";
import { css } from "@emotion/css";

// import BlockModel from "./BlockModelOld.tsx.ignore";

type BlockInfoData = {
    title: string;
    state?: string;
    mod: string;
};

interface ComponentProps {
    data: BlockInfoData | null;
    animateDuration?: number;
}

let BlockInfo: React.FC<ComponentProps> = ({ data, animateDuration = 100 }) => {
    return <Animator animator={{ animate: animateDuration !== 0, activate: !!data }}>
        <AnimatorGeneralProvider animator={{ duration: { enter: animateDuration, exit: animateDuration } }}>
            {/* 
            //@ts-ignore */}
            <FrameCorners
                palette='primary'
                // cornerLength={20}
                showContentLines
            >
                <div className={css`
                    width: 230px;
                    // make auto!!!
                    height: 65px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    /* font-size: 0.9em; */
                    & span {
                        letter-spacing: 0.4px;
                        max-width: 100%;
                        white-space: nowrap;
                        overflow: hidden;
                        width: 100%;
                        text-overflow: ellipsis;
                    }
                    & span:last-child {
                        // because italic
                        font-size: 0.9em;
                        color: gray;
                        font-style: italic;
                        width: calc(100% + 5px);
                        color: #0080ff;
                    }
            `}>
                    {
                        data && <>
                            {/* <BlockModel
                                sidesTexture="https://github.com/InventivetalentDev/minecraft-assets/blob/1.16.5/assets/minecraft/textures/block/dirt.png?raw=true"
                                perspective="none"
                                rotateX={-30}
                                rotateY={-45}
                                sizeFactor={0.35}
                            /> */}<div />
                            <div className={css`
                                display: flex;
                                flex-direction: column;
                            `}>
                                <span>{data.title}</span>
                                {data.state && <span style={{ color: "gray" }}>{data.state}</span>}
                                <span>{data.mod}</span>
                            </div>
                        </>
                    }
                </div>
            </FrameCorners>
        </AnimatorGeneralProvider>
    </Animator>;
};

export default BlockInfo;
