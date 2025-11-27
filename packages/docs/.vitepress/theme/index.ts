import './style.ts';
import DefaultTheme from 'vitepress/theme';
import CodePreview from '../components/code-preview/index.vue';
import ZzuIcon from '@zzu/icon';
import ZzuUI from '@zzu/ui';

import type { EnhanceAppContext } from 'vitepress';

export default {
    ...DefaultTheme,
    enhanceApp(options: EnhanceAppContext) {
        const { app } = options;
        app.component('code-preview', CodePreview);
        app.use(ZzuUI, {
            prefix: 'zzu',
        });
        app.use(ZzuIcon, {
            prefix: '$$',
        });
    },
};
