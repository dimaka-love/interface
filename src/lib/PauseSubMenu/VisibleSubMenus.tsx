import React, { useMemo } from "react";

import { useUserState } from "../state";
import FullScreenSubMenu from "./FullScreenSubMenu";
import Settings from "./Settings";

interface ComponentProps {
}

let VisibleSubMenus: React.FC<ComponentProps> = () => {
    const openedUI = useUserState(s => s.openedUI);

    const subMenuComponent = useMemo(() => {
        if (openedUI?.type !== "pause" || openedUI.menu === "root") return null;
        if (openedUI.menu.startsWith("settings")) return <Settings />;
        return null;
    }, [openedUI]);

    return subMenuComponent && <FullScreenSubMenu>{subMenuComponent}</FullScreenSubMenu>;
};

export default VisibleSubMenus;
