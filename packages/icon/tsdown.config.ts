import path from 'node:path';
import url from 'node:url';
import { defineConfig } from 'tsdown';
import Vue from 'unplugin-vue/rolldown';
import scss from 'rollup-plugin-scss';

export const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default defineConfig(() => ({
    entry: ['src/index.ts'],
    platform: 'neutral' as const,
    minify: true,
    plugins: [Vue({ isProduction: true }), scss({ fileName: 'icon.css' })],
    unbundle: true,
    dts: {
        vue: true,
    },
}));
