import type { App, Plugin } from 'vue';
import { KgDivider } from './divider';

const components = [KgDivider];

const makeInstaller = (components: Plugin[] = []) => {
    return {
        install(app: App) {
            components.forEach((c) => app.use(c));
        },
    };
};

const installer = makeInstaller([...components]);

export { installer as default };
