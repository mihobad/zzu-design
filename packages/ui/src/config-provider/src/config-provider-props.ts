import type { ExtractPropTypes, PropType } from 'vue';
import type { ComponentSize } from '@/_constants';

export const configProviderProps = {
    size: {
        type: String as PropType<ComponentSize>,
        default: '',
    },
    namespace: {
        type: String,
        default: 'zzu',
    },
    /**
     * @description global Initial zIndex
     */
    zIndex: Number,
};

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;
