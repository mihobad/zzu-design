import { computed, getCurrentInstance, inject, unref, ref, provide } from 'vue';
import { configProviderContextKey, type ConfigProviderContext } from '../constants';
import { defaultNamespace, namespaceContextKey, useNamespace } from '@zzu/use';
import { defaultInitialZIndex, SIZE_INJECTION_KEY, useZIndex, zIndexContextKey } from '@/_hooks';

import type { App, MaybeRef, Ref } from 'vue';

const globalConfig = ref<ConfigProviderContext>();

export function useGlobalConfig<K extends keyof ConfigProviderContext, D extends ConfigProviderContext[K]>(
    key: K,
    defaultValue?: D,
): Ref<Exclude<ConfigProviderContext[K], undefined> | D>;
export function useGlobalConfig(): Ref<ConfigProviderContext>;
export function useGlobalConfig(key?: keyof ConfigProviderContext, defaultValue = undefined) {
    const config = getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig;
    if (key) {
        return computed(() => config.value?.[key] ?? defaultValue);
    } else {
        return config;
    }
}

// for components like modal toast message etc.
export function useGlobalComponentSettings(block: string, sizeFallback?: MaybeRef<ConfigProviderContext['size']>) {
    const config = useGlobalConfig();

    const ns = useNamespace(
        block,
        computed(() => config.value?.namespace || defaultNamespace),
    );

    const zIndex = useZIndex(computed(() => config.value?.zIndex || defaultInitialZIndex));

    const size = computed(() => unref(sizeFallback) || config.value?.size || '');

    provideGlobalConfig(computed(() => unref(config) || {}));

    return {
        ns,
        zIndex,
        size,
    };
}

export const provideGlobalConfig = (config: MaybeRef<ConfigProviderContext>, app?: App, global = false) => {
    const inSetup = !!getCurrentInstance();
    const oldConfig = inSetup ? useGlobalConfig() : undefined;

    const _provide = app?.provide ?? (inSetup ? provide : undefined);

    if (!_provide) {
        console.warn('provideGlobalConfig', 'provideGlobalConfig() can only be used inside setup().');
        return;
    }

    const context = computed(() => {
        const cfg = unref(config);
        if (!oldConfig?.value) return cfg;
        return mergeConfig(oldConfig.value, cfg);
    });

    _provide(configProviderContextKey, context);

    _provide(
        namespaceContextKey,
        computed(() => context.value.namespace),
    );

    _provide(
        zIndexContextKey,
        computed(() => context.value.zIndex),
    );

    _provide(SIZE_INJECTION_KEY, {
        size: computed(() => context.value.size || ''),
    });

    if (global || !globalConfig.value) {
        globalConfig.value = context.value;
    }

    return context;
};

const mergeConfig = (a: ConfigProviderContext, b: ConfigProviderContext): ConfigProviderContext => {
    const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])] as (keyof ConfigProviderContext)[];
    const merged: Record<string, any> = {};
    for (const key of keys) {
        merged[key] = b[key] ?? a[key];
    }
    return merged;
};
