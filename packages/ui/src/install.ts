import type { App, Plugin } from 'vue';
import { ZzuDivider } from './divider';
import { ZzuIconFont } from './icon-font';

const components = [ZzuDivider, ZzuIconFont];

const makeInstaller = (components: Plugin[] = []) => {
    return {
        install(app: App) {
            components.forEach((c) => app.use(c));
        },
    };
};

const installer = makeInstaller([...components]);

export { installer as default };
