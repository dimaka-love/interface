import React, { useRef } from 'react'

import { css } from '@emotion/css'

import { useToggleState } from '@zardoy/react-util'
import VisibleSubMenus from '../MenuHUD/PauseSubMenu/VisibleSubMenus'
import { EscWarning } from 'low-level/mui'
import PauseButton from 'low-level/components/MenuHUD/PauseButton'
import useEventListener from 'use-typed-event-listener'
import { useInterfaceState } from 'low-level/state'
import { useFocusController } from 'low-level/reactUtil'
import { modalStyles } from 'low-level/styles'
import { Portal } from 'react-portal'
import { closePauseMenu, openPauseMenu } from 'low-level/components/MenuHUD/pauseMenu'

export type PauseSchema = {
    buttons: Array<React.ComponentProps<typeof PauseButton>>
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

const PauseMenu: React.FC = () => {
    const uiConfig = useInterfaceState(s => s.uiConfig)
    const openedUI = useInterfaceState(s => s.openedUI)

    const buttonsContainerRef = useRef<HTMLDivElement>(null!)
    const escWarning = useToggleState()

    useEventListener(window, 'keydown', ({ code }) => {
        if (openedUI) {
            if (openedUI.type !== 'pause' || openedUI.menu !== 'root') return
            switch (code) {
                case 'Backquote':
                    closePauseMenu()
                    break
                case 'Escape':
                    escWarning.on()
                    break
            }
        } else if (code === 'Escape') {
            openPauseMenu()
        }
    })

    const rootPauseOpened = openedUI?.type === 'pause' && openedUI.menu === 'root'

    useFocusController({
        containerRef: buttonsContainerRef,
        // todo auto detect not focusable elems
        focusableElemSelector: 'button:not([tab-index="-1"])',
    })

    return (
        <>
            <EscWarning open={escWarning.state} onClose={escWarning.off} />

            {openedUI?.type === 'pause' && (
                <Portal>
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
                        {uiConfig.pauseSchema.buttons.map((props, index) => (
                            <PauseButton key={props.label} autoFocus={index === 0} {...props} />
                        ))}
                        {/* I will probably return back button when problem with esc is resolved (BACK BUTTON) */}
                        <VisibleSubMenus />
                    </div>
                </Portal>
            )}
        </>
    )
}

export default PauseMenu
