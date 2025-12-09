import type { App, Plugin } from 'vue';
import { setAppContext } from './_hooks';
import { Divider } from './divider';
import { IconFont } from './icon-font';
import { Button } from './button';
import { Overlay } from './overlay';
import { ConfigProvider } from './config-provider';

const components = [Divider, IconFont, Button, Overlay, ConfigProvider];

const makeInstaller = (components: Plugin[] = []) => {
    return {
        install(app: App, options: { prefix?: string } = {}) {
            const { prefix = 'zzu' } = options;
            components.forEach((c) => app.use(c, { prefix }));
            setAppContext(app?._context);
        },
    };
};

const installer = makeInstaller([...components]);

export { installer as default };
