import { withInstall } from '@kg-design/utils';
import type { SFCWithInstall } from '@kg-design/utils';
import _Divider from './src/divider.vue';

export const KgDivider: SFCWithInstall<typeof _Divider> = withInstall(_Divider);

export default KgDivider;

export * from './src/type';

declare module 'vue' {
    export interface GlobalComponents {
        KgDivider: typeof KgDivider;
    }
}
