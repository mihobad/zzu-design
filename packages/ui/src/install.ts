import type { App, Plugin } from 'vue';
import { useContext } from './_hooks';
import { Divider } from './divider';
import { IconFont } from './icon-font';
import { Button } from './button';
import { Overlay } from './overlay';

const components = [Divider, IconFont, Button, Overlay];

const makeInstaller = (components: Plugin[] = []) => {
    return {
        install(app: App, options: { prefix?: string } = {}) {
            const { prefix = 'zzu' } = options;
            components.forEach((c) => app.use(c, { prefix }));
            useContext(app?._context);
        },
    };
};

const installer = makeInstaller([...components]);

export { installer as default };
