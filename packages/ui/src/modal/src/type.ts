import type { ExtractPropTypes, PropType } from 'vue';

export const modalProps = {
    onClose: {
        type: Function as PropType<() => void>,
        default: undefined,
    },
    closeOnClickOverlay: {
        type: Boolean,
        default: true,
    },
    zIndex: [Number, String],
    overlay: {
        type: Boolean,
        default: true,
    },
    overlayClass: {
        type: String as PropType<string | string[] | Record<string, boolean>>,
        default: '',
    },
    overlayStyle: {
        type: Object as PropType<Record<string, string | number>>,
        default: () => ({}),
    },
    /**
     * 遮罩是否可穿透
     */
    overlayPenetrable: {
        type: Boolean,
        default: false,
    },
};

export const modalEmits = {
    destroy: () => true,
};

export type ModalProps = ExtractPropTypes<typeof modalProps>;
export type ModalEmits = typeof modalEmits;

export interface ModalOptions extends Partial<ModalProps> {}
