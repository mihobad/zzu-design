import { withInstall } from '@zzu/utils';
import type { SFCWithInstall } from '@zzu/utils';
import _Divider from './src/divider.vue';

export const Divider: SFCWithInstall<typeof _Divider> = withInstall(_Divider);

export default Divider;

export * from './src/type';

declare module 'vue' {
    export interface GlobalComponents {
        ZzuDivider: typeof Divider;
    }
}
