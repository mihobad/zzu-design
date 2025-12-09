import type { ExtractPropTypes, PropType } from 'vue';

export const modalProps = {
    onClose: {
        type: Function as PropType<() => void>,
        default: undefined,
    },
    closeOnClickModal: {
        type: Boolean,
        default: true,
    },
    zIndex: [Number, String],
    /**
     * 遮罩是否可穿透
     */
    overlayPenetrable: {
        type: Boolean,
        default: false,
    },
    mask: {
        type: Boolean,
        default: true,
    },
    overlayClass: {
        type: String,
        default: '',
    },
};

export const modalEmits = {
    destroy: () => true,
};

export type ModalProps = ExtractPropTypes<typeof modalProps>;
export type ModalEmits = typeof modalEmits;

export interface ModalOptions extends Partial<ModalProps> {}
