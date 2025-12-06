import type { Component, ExtractPropTypes, PropType } from 'vue';
import type { ComponentSize } from '@/_constants';

export const buttonTypes = ['default', 'primary', 'success', 'warning', 'info', 'danger', ''] as const;

export const buttonProps = {
    size: {
        type: String as PropType<ComponentSize>,
        default: '',
    },
    type: {
        type: String as PropType<(typeof buttonTypes)[number]>,
        default: '',
    },
    plain: {
        type: Boolean,
        default: undefined,
    },
    link: {
        type: Boolean,
        default: undefined,
    },
    round: {
        type: Boolean,
        default: undefined,
    },
    loading: Boolean,
    disabled: Boolean,
    circle: Boolean,
    icon: {
        type: Object as PropType<Component>,
        default: () => null,
    },
};

export const buttonEmits = {
    click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
export type ButtonEmits = typeof buttonEmits;
