import { defineConfig } from 'tsdown';
import Vue from 'unplugin-vue/rolldown';
import VueJsx from 'unplugin-vue-jsx/rolldown';
import scss from 'rollup-plugin-scss';

export default defineConfig(() => ({
    entry: ['src/index.ts'],
    platform: 'browser' as const,
    clean: false,
    minify: true,
    plugins: [Vue({ isProduction: true }), VueJsx(), scss({ fileName: 'index.css' })],
    unbundle: true,
    dts: {
        vue: true,
    },
}));
