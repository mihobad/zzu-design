import type { ExtractPropTypes, PropType } from 'vue';

export type BorderStyle = CSSStyleDeclaration['borderStyle'];

export const dividerProps = {
    direction: {
        type: String as PropType<'horizontal' | 'vertical'>,
        default: 'horizontal',
    },
    contentPosition: {
        type: String as PropType<'left' | 'right' | 'center'>,
        default: 'center',
    },
    borderStyle: {
        type: String as PropType<BorderStyle>,
        default: 'solid',
    },
};

export type DividerProps = ExtractPropTypes<typeof dividerProps>;
