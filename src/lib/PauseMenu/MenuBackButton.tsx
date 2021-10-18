import React from 'react'

import MenuSecondaryButton from './MenuSecondaryButton'

/** absolutely positioned */
const MenuBackButton: React.FC = () => (
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

export default MenuBackButton
