import { defineConfig } from 'vitepress';
import { resolve } from 'node:path';
import { codePreviewPlugin } from './plugins/code-preview-plugin';

export default defineConfig({
    title: 'Zzu Design',
    description: 'A VitePress Site',
    outDir: resolve(__dirname, '../dist'),
    themeConfig: {
        nav: [{ text: '首页', link: '/' }],

        sidebar: [
            {
                text: '工具',
                items: [{ text: 'create-app', link: '/readme/capp/index.md' }],
            },
            {
                text: '组件',
                items: [
                    { text: 'Icon', link: '/readme/icon/index.md' },
                    { text: 'Divider', link: '/demos/divider/index.md' },
                ],
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
    },
    vite: {
        resolve: {
            alias: {},
        },
        plugins: [codePreviewPlugin()] as any,
    },
});
