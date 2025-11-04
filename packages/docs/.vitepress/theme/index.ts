import './style.ts';
import DefaultTheme from 'vitepress/theme';
import KgIcon from '@kg-design/icon';
import CodePreview from '../components/code-preview/index.vue';

import type { EnhanceAppContext } from 'vitepress';

export default {
    ...DefaultTheme,
    enhanceApp(options: EnhanceAppContext) {
        const { app } = options;
        app.component('code-preview', CodePreview);
        app.use(KgIcon, {
            iconPrefix: '$$',
        });
    },
};
