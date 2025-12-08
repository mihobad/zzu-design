import { withInstall } from '@zzu/utils';
import type { SFCWithInstall } from '@zzu/utils';
import _Overlay from './src/overlay.vue';

export const Overlay: SFCWithInstall<typeof _Overlay> = withInstall(_Overlay);

export default Overlay;

export * from './src/type';

declare module 'vue' {
    export interface GlobalComponents {
        ZzuOverlay: typeof Overlay;
    }
}
