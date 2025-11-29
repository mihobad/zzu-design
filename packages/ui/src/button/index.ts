import { withInstall } from '@zzu/utils';
import type { SFCWithInstall } from '@zzu/utils';
import _Button from './src/button.vue';

export const Button: SFCWithInstall<typeof _Button> = withInstall(_Button);

export default Button;

export * from './src/type';

declare module 'vue' {
    export interface GlobalComponents {
        ZzuButton: typeof Button;
    }
}
