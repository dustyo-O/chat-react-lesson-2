import { FC } from "react";
import { cnTooltip } from "./Tooltip.classname";

import './Tooltip.css';

type TooltipProps = {
    anchorRef: React.RefObject<HTMLElement>;
}

export const Tooltip: FC<TooltipProps> = ({ anchorRef }) => {
    const anchor = anchorRef.current;
    if (!anchor) {
        return null;
    }

    const coords = anchor.getBoundingClientRect();

    const top = coords.top;
    const left = coords.left;

    return <div className={cnTooltip()} style={{ top: top + 'px', left: left + 'px' }}>
        toooltiiiip
    </div>
}
