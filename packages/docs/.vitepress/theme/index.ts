import './style.ts';
import DefaultTheme from 'vitepress/theme';
import CodePreview from '../components/code-preview/index.vue';
import ZuuIcon from '@zzu/icon';

import type { EnhanceAppContext } from 'vitepress';

export default {
    ...DefaultTheme,
    enhanceApp(options: EnhanceAppContext) {
        const { app } = options;
        app.component('code-preview', CodePreview);
        app.use(ZuuIcon, {
            iconPrefix: '$$',
        });
    },
};
