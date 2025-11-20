import { withInstall } from '@zzu/utils';
import type { SFCWithInstall } from '@zzu/utils';
import _Divider from './src/divider.vue';

export const ZzuDivider: SFCWithInstall<typeof _Divider> = withInstall(_Divider);

export default ZzuDivider;

export * from './src/type';

declare module 'vue' {
    export interface GlobalComponents {
        ZzuDivider: typeof ZzuDivider;
    }
}
