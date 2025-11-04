import path from 'node:path';
import { globSync } from 'glob';
import type { Plugin } from 'vite';
import { toPascalCase } from '../../utils';
import { generateSideBar } from '../../config.mts';

const root = process.cwd();
const designDir = path.resolve(root, '../ui/src/**/__demo__');

const scanDemoComponents = () => {
    const paths = globSync(designDir);
    const components = paths.map((item) => path.basename(path.dirname(item)));

    return components.map((item) => ({
        name: item,
        text: toPascalCase(item),
        link: `/ui/src/${item}/__demo__/index.md`,
    }));
};

export function scanDemoPlugin(): Plugin {
    return {
        name: 'scan-demo-plugin',
        enforce: 'pre',
        configResolved(config: any) {
            if (config.vitepress) {
                const demoComponents = scanDemoComponents();
                const { sidebar } = config.vitepress.site.themeConfig;

                sidebar.splice(1, 0, ...generateSideBar(demoComponents));
            }
        },
    };
}
