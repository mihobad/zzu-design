import type { ExtractPropTypes } from 'vue';

export const overlayProps = {
    mask: {
        type: Boolean,
        default: true,
    },
    customMaskEvent: Boolean,
    overlayClass: {
        type: String,
        default: '',
    },
    zIndex: {
        type: [Number, String],
        default: 1000,
    },
};

export const overlayEmits = {
    click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type OverlayProps = ExtractPropTypes<typeof overlayProps>;
export type OverlayEmits = typeof overlayEmits;
