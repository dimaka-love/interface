import React from 'react'

import MenuSecondaryButton from './MenuSecondaryButton'

type ComponentProps = {}

/** absolutely positioned */
let MenuBackButton: React.FC<ComponentProps> = () => {
    return (
        <MenuSecondaryButton
            style={{ position: 'absolute', bottom: 30, right: 35 }}
            keyboardKey="Esc"
            label="BACK"
            onClick={() => {
                window.dispatchEvent(
                    new KeyboardEvent('keydown', {
                        code: 'Escape',
                    }),
                )
            }}
        />
    )
}

export default MenuBackButton
