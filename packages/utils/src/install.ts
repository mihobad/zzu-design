import type { App, Component, Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

export interface InstallOptions {
    prefix?: string;
}

export const withInstall = <T extends Component, E extends Record<string, any>>(main: T, extra?: E) => {
    (main as SFCWithInstall<T>).install = (app: App, options?: InstallOptions): void => {
        for (const comp of [main, ...Object.values(extra ?? {})]) {
            const prefix = options?.prefix ?? '';
            app.component(`${prefix}${comp.name}`, comp);
        }
    };

    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            (main as any)[key] = comp;
        }
    }

    return main as SFCWithInstall<T> & E;
};
