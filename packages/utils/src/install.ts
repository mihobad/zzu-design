import type { App, Component, Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

export interface KgIconOptions {
    iconPrefix?: string;
}

export const withInstall = <T extends Component, E extends Record<string, any>>(main: T, extra?: E) => {
    (main as SFCWithInstall<T>).install = (app: App, options?: KgIconOptions): void => {
        for (const comp of [main, ...Object.values(extra ?? {})]) {
            const iconPrefix = options?.iconPrefix ?? '';
            app.component(`${iconPrefix}${comp.name}`, comp);
        }
    };

    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            (main as any)[key] = comp;
        }
    }

    return main as SFCWithInstall<T> & E;
};
