import { withInstall, type SFCWithInstall } from '@zzu/utils';
import _IconFont from './src/icon-font.vue';
import { addIconFont } from './src/add-icon-font';

export const ZzuIconFont: SFCWithInstall<typeof _IconFont> & {
    addIconFont: typeof addIconFont;
} = withInstall(_IconFont, {
    addIconFont,
});

export default ZzuIconFont;

export * from './src/type';

declare module 'vue' {
    export interface GlobalComponents {
        ZzuIconFont: typeof ZzuIconFont;
    }
}
