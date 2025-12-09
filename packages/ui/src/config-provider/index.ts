import { withInstall } from '@zzu/utils';
import _ConfigProvider from './src/config-provider';

import type { SFCWithInstall } from '@zzu/utils';

export const ConfigProvider: SFCWithInstall<typeof _ConfigProvider> = withInstall(_ConfigProvider);

export default ConfigProvider;

export * from './src/hooks/use-global-config';
export * from './src/constants';

declare module 'vue' {
    interface GlobalComponents {
        ZzuConfigProvider: typeof ConfigProvider;
    }
}
