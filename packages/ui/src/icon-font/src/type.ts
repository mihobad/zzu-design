import type { ExtractPropTypes } from 'vue';

export const iconFontProps = {
    type: {
        type: String,
        default: '',
    },
    size: {
        type: [Number, String],
        default: '',
    },
    rotate: {
        type: Number,
        default: 0,
    },
    spin: {
        type: Boolean,
        default: false,
    },
};

export type IconFontProps = ExtractPropTypes<typeof iconFontProps>;

export const iconEmits = {
    click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type IconEmits = typeof iconEmits;
