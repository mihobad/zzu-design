import type { App, Plugin } from 'vue';
import { Divider } from './divider';
import { IconFont } from './icon-font';

const components = [Divider, IconFont];

const makeInstaller = (components: Plugin[] = []) => {
    return {
        install(app: App, options: { prefix?: string } = {}) {
            const { prefix = 'zzu' } = options;
            components.forEach((c) => app.use(c, { prefix }));
        },
    };
};

const installer = makeInstaller([...components]);

export { installer as default };
