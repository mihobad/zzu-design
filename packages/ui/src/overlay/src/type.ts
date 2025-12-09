import type { ExtractPropTypes, PropType } from 'vue';

export const overlayProps = {
    mask: {
        type: Boolean,
        default: true,
    },
    customMaskEvent: Boolean,
    overlayClass: {
        type: Array as PropType<string | string[] | Record<string, boolean>>,
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
