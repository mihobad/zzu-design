import { NOOP } from '../utils';

export const useSameTarget = (handleClick?: (e: MouseEvent) => void) => {
    if (!handleClick) {
        return {
            onClick: NOOP,
            onMouseDown: NOOP,
            onMouseUp: NOOP,
        };
    }

    let mousedownTarget = false;
    let mouseupTarget = false;
    // refer to this https://javascript.info/mouse-events-basics
    // events fired in the order: mousedown -> mouseup -> click
    // we need to set the mousedown handle to false after click fired.
    const onClick = (e: MouseEvent) => {
        if (mousedownTarget && mouseupTarget) {
            handleClick(e);
        }
        mousedownTarget = false;
        mouseupTarget = false;
    };

    const onMouseDown = (e: MouseEvent) => {
        mousedownTarget = e.target === e.currentTarget;
    };

    const onMouseUp = (e: MouseEvent) => {
        mouseupTarget = e.target === e.currentTarget;
    };

    return {
        onClick,
        onMouseDown,
        onMouseUp,
    };
};
