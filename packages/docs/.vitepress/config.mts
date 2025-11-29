import { defineConfig } from 'vitepress';
import { resolve } from 'node:path';
import { codePreviewPlugin } from './plugins/code-preview-plugin';

export default defineConfig({
    title: 'Zzu Design',
    description: 'UI Design System',
    outDir: resolve(__dirname, '../dist'),
    themeConfig: {
        nav: [{ text: '首页', link: '/' }],

        sidebar: [
            {
                text: '工具库',
                items: [
                    { text: 'create-app', link: '/demos/capp/index.md' },
                    { text: 'axios', link: '/demos/axios/index.md' },
                ],
            },
            {
                text: '组件库',
                items: [
                    { text: 'Icon', link: '/demos/icon/index.md' },
                    { text: 'Button', link: '/demos/button/index.md' },
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
