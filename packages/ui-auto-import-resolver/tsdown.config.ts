import path from 'node:path';
import url from 'node:url';
import { defineConfig } from 'tsdown';

export const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default defineConfig(() => ({
    entry: ['src/index.ts'],
    target: 'es2015',
    minify: true,
    dts: true,
    plugins: [],
}));
