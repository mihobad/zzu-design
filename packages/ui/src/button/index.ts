import { withInstall } from '@zzu/utils';
import type { SFCWithInstall } from '@zzu/utils';
import _Button from './src/button.vue';
import _ButtonGroup from './src/button-group.vue';

export const Button: SFCWithInstall<typeof _Button> & {
    ButtonGroup: typeof _ButtonGroup;
} = withInstall(_Button, {
    ButtonGroup: _ButtonGroup,
});
export const ButtonGroup: SFCWithInstall<typeof _ButtonGroup> = withInstall(_ButtonGroup);

export default Button;

export * from './src/type';

declare module 'vue' {
    export interface GlobalComponents {
        ZzuButton: typeof Button;
        ZzuButtonGroup: typeof ButtonGroup;
    }
}
