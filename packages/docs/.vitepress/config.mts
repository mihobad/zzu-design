import { defineConfig } from 'vitepress';
import { resolve } from 'node:path';
import { scanDemoPlugin } from './plugins/scan-demo-plugin';
import { codePreviewPlugin } from './plugins/code-preview-plugin';

export const generateSideBar = (components: { text: string; link: string }[]) => [
    {
        text: '工具',
        items: [{ text: 'create-app', link: '/readme/capp/index.md' }],
    },
    {
        text: '组件',
        items: [{ text: 'Icon', link: '/readme/icon/index.md' }, ...components],
    },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Zzu Design',
    description: 'A VitePress Site',
    outDir: resolve(__dirname, '../dist'),
    themeConfig: {
        nav: [{ text: '首页', link: '/' }],

        sidebar: [],

        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
    },
    vite: {
        resolve: {
            alias: {
                '/ui': resolve(__dirname, '../../ui'),
            },
        },
        plugins: [scanDemoPlugin(), codePreviewPlugin()],
    },
});
