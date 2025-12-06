/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [vue(), vueJsx(), tsconfigPaths()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: [],
        coverage: {
            provider: 'v8',
            reporter: ['html'],
        },
    },
});
